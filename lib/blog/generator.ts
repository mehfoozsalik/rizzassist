import { callDeepSeek } from '@/lib/deepseekServer';
import { pickBlogImages } from './images';
import { pickDailyTopic } from './topics';
import {
  appendGeneratedPost,
  commitGeneratedIndexToGitHub,
  readGeneratedIndex,
  todayKey,
  type GeneratedBlogIndex,
} from './storage';
import type { BlogBlock, BlogPost, BlogReference, BlogTopic } from './types';

type GeneratedPayload = {
  title: string;
  excerpt: string;
  slug: string;
  readMinutes: number;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    quote?: string;
  }[];
  usedInspiration: boolean;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function estimateReadMinutes(blocks: BlogBlock[]): number {
  const words = blocks
    .map((b) => {
      if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote') return b.text;
      if (b.type === 'list') return b.items.join(' ');
      return '';
    })
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(8, Math.round(words / 200));
}

function buildBlocks(
  payload: GeneratedPayload,
  images: { src: string; alt: string }[]
): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  let imageIdx = 1; // 0 reserved for cover

  payload.sections.forEach((section, sectionIndex) => {
    if (section.heading) {
      blocks.push({ type: 'heading', level: 2, text: section.heading });
    }
    for (const para of section.paragraphs || []) {
      if (para?.trim()) blocks.push({ type: 'paragraph', text: para.trim() });
    }
    if (section.bullets?.length) {
      blocks.push({ type: 'list', items: section.bullets.map((i) => i.trim()).filter(Boolean) });
    }
    if (section.quote?.trim()) {
      blocks.push({ type: 'quote', text: section.quote.trim() });
    }
    // Insert an image after every other section
    if (sectionIndex % 2 === 1 && images[imageIdx]) {
      const img = images[imageIdx];
      blocks.push({
        type: 'image',
        src: img.src,
        alt: img.alt,
        caption: img.alt,
      });
      imageIdx += 1;
    }
  });

  return blocks;
}

function resolveAuthor(
  topic: BlogTopic,
  usedInspiration: boolean
): { author: string; references: BlogReference[] } {
  // Referenced/adapted from an external guide → credit that author + link.
  // Fully original automation → Author Rizz Assistant.
  if (usedInspiration && topic.inspiration?.author) {
    return {
      author: topic.inspiration.author,
      references: [
        {
          ...topic.inspiration,
          note:
            topic.inspiration.note ||
            'Referenced for educational structure and topic framing. Article body is original AI writing for Rizz Assist.',
        },
      ],
    };
  }
  return {
    author: 'Rizz Assist',
    references:
      usedInspiration && topic.inspiration
        ? [
            {
              ...topic.inspiration,
              note:
                topic.inspiration.note ||
                'Referenced for educational structure and topic framing. Article body is original AI writing for Rizz Assist.',
            },
          ]
        : [],
  };
}

async function requestLongFormPost(topic: BlogTopic): Promise<GeneratedPayload> {
  const inspirationBlock = topic.inspiration
    ? `Optional inspiration (do NOT copy wording or unique examples):
- Title: ${topic.inspiration.title}
- URL: ${topic.inspiration.url}
- Author: ${topic.inspiration.author || 'unknown'}
If you lean on this inspiration for structure/ideas, set usedInspiration=true. Otherwise false.`
    : 'No external inspiration for this topic. Set usedInspiration=false.';

  const system = `You are the editorial AI for Rizz Assist (rizzassistgo.com) — AI rizz coach for style, pickup lines, confidence, dating communication, and appearance tools.
Write long-form educational blog posts similar in depth to a thorough Medium guide (not a 3-paragraph tip list).
Tone: warm, practical, specific, non-judgmental, Gen-Z friendly. No medical claims. No vanity scoring. No plagiarism.
Always original wording. Mention "Rizz Assist" (two words) when naming the product — never "RizzAssist" as one word.
Internally link ideas to Rizz Assist tools when natural.
Return ONLY valid JSON.`;

  const user = `Write one long blog post optimized for SEO and helpful search results.

Topic id: ${topic.id}
Title hint: ${topic.titleHint}
Category: ${topic.category}
Angle: ${topic.angle}
Related tool: ${topic.relatedToolLabel || 'none'} (${topic.relatedToolHref || 'n/a'})

${inspirationBlock}

Requirements:
- 1,400–2,200 words worth of content across sections (aim for 8–12 min read)
- 6–9 sections with clear H2 headings that include natural keywords (not stuffed)
- Each section: 2–4 meaty paragraphs; add bullets or a short quote where helpful
- Include a concrete “how to check yourself” or step-by-step practice section
- Include common mistakes + fixes
- End with a practical action plan and a soft CTA to the related tool
- title: 50–65 characters when possible; primary keyword near the front; no clickbait
- excerpt: 140–160 characters, include primary benefit + keyword; written as a meta description
- slug: kebab-case, unique, no dates, keyword-rich
- readMinutes: integer estimate
- usedInspiration: boolean
- First section should answer the reader’s core question quickly (featured-snippet friendly)

JSON shape:
{
  "title": string,
  "excerpt": string,
  "slug": string,
  "readMinutes": number,
  "usedInspiration": boolean,
  "sections": [
    {
      "heading": string,
      "paragraphs": string[],
      "bullets": string[] | optional,
      "quote": string | optional
    }
  ]
}`;

  const raw = await callDeepSeek(
    [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    { temperature: 0.85, maxTokens: 8192, jsonMode: true, timeoutMs: 120_000 }
  );

  const parsed = JSON.parse(raw) as GeneratedPayload;
  if (!parsed?.title || !Array.isArray(parsed.sections) || parsed.sections.length < 4) {
    throw new Error('DeepSeek returned an incomplete blog payload.');
  }
  parsed.slug = slugify(parsed.slug || parsed.title);
  parsed.usedInspiration = Boolean(parsed.usedInspiration);
  return parsed;
}

export type GenerateBlogResult = {
  created: boolean;
  skipped?: boolean;
  reason?: string;
  post?: BlogPost;
  index: GeneratedBlogIndex;
  github?: { committed: boolean; reason?: string };
};

export async function generateDailyBlog(options?: {
  force?: boolean;
  date?: Date;
}): Promise<GenerateBlogResult> {
  const date = options?.date ?? new Date();
  const dateKey = todayKey(date);
  const index = await readGeneratedIndex();

  if (!options?.force && index.lastGeneratedDate === dateKey) {
    return {
      created: false,
      skipped: true,
      reason: `Already generated a post for ${dateKey}`,
      index,
      post: index.posts[0],
    };
  }

  const topic = pickDailyTopic(index.topicHistory, date);
  const payload = await requestLongFormPost(topic);
  const images = pickBlogImages(topic.imageQueries, 4, date.getDate());
  const blocks = buildBlocks(payload, images);
  const { author, references } = resolveAuthor(topic, payload.usedInspiration);

  const content = blocks
    .filter((b): b is Extract<BlogBlock, { type: 'paragraph' }> => b.type === 'paragraph')
    .map((b) => b.text);

  const post: BlogPost = {
    slug: payload.slug || slugify(payload.title),
    title: payload.title,
    excerpt: payload.excerpt,
    category: topic.category,
    date: dateKey,
    readMinutes: payload.readMinutes || estimateReadMinutes(blocks),
    content: content.length ? content : [payload.excerpt],
    author,
    coverImage: images[0]?.src,
    blocks,
    references,
    generated: true,
    relatedToolHref: topic.relatedToolHref,
    relatedToolLabel: topic.relatedToolLabel,
  };

  // Local / writable filesystem persist
  let nextIndex: GeneratedBlogIndex;
  try {
    nextIndex = await appendGeneratedPost(post, topic.id, dateKey, {
      force: options?.force,
    });
  } catch {
    // Read-only FS (e.g. some serverless hosts): keep in-memory merge for GitHub commit
    const prior = options?.force
      ? index.posts.filter((p) => p.date !== dateKey && p.slug !== post.slug)
      : index.posts.filter((p) => p.slug !== post.slug);
    nextIndex = {
      posts: [post, ...prior],
      topicHistory: [topic.id, ...index.topicHistory.filter((id) => id !== topic.id)].slice(0, 48),
      lastGeneratedDate: dateKey,
    };
  }

  const github = await commitGeneratedIndexToGitHub(nextIndex);

  return {
    created: true,
    post,
    index: nextIndex,
    github,
  };
}
