import { callDeepSeek } from '@/lib/deepseekServer';
import { fetchBlogImages, toImageCredits } from './images';
import { pickDailyTopic } from './topics';
import {
  appendGeneratedPost,
  commitGeneratedIndexToGitHub,
  readGeneratedIndex,
  todayKey,
  type GeneratedBlogIndex,
} from './storage';
import type {
  BlogBlock,
  BlogImage,
  BlogPost,
  BlogReference,
  BlogTopic,
} from './types';

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

/** Strip em/en dashes and other AI-ish punctuation quirks. */
export function humanizeText(input: string): string {
  return input
    .replace(/\u2014/g, ', ') // em dash —
    .replace(/\u2013/g, ', ') // en dash –
    .replace(/--+/g, ', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function humanizePayload(payload: GeneratedPayload): GeneratedPayload {
  return {
    ...payload,
    title: humanizeText(payload.title),
    excerpt: humanizeText(payload.excerpt),
    sections: payload.sections.map((section) => ({
      heading: humanizeText(section.heading),
      paragraphs: (section.paragraphs || []).map(humanizeText),
      bullets: section.bullets?.map(humanizeText),
      quote: section.quote ? humanizeText(section.quote) : undefined,
    })),
  };
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

function buildBlocks(payload: GeneratedPayload, images: BlogImage[]): BlogBlock[] {
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
      blocks.push({
        type: 'list',
        items: section.bullets.map((i) => i.trim()).filter(Boolean),
      });
    }
    if (section.quote?.trim()) {
      blocks.push({ type: 'quote', text: section.quote.trim() });
    }
    if (sectionIndex % 2 === 1 && images[imageIdx]) {
      const img = images[imageIdx];
      const credit = img.photographer
        ? `Photo by ${img.photographer} on Unsplash`
        : img.alt;
      blocks.push({
        type: 'image',
        src: img.src,
        alt: img.alt,
        caption: credit,
        photographer: img.photographer,
        photographerUrl: img.photographerUrl,
        photoUrl: img.photoUrl,
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
  if (usedInspiration && topic.inspiration?.author) {
    return {
      author: topic.inspiration.author,
      references: [
        {
          ...topic.inspiration,
          note:
            topic.inspiration.note ||
            'Referenced for educational structure and topic framing. Article body is original writing for Rizz Assist.',
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
                'Referenced for educational structure and topic framing. Article body is original writing for Rizz Assist.',
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
If you lean on this inspiration for structure or ideas, set usedInspiration=true. Otherwise false.`
    : 'No external inspiration for this topic. Set usedInspiration=false.';

  const system = `You write long blog posts for Rizz Assist (rizzassistgo.com), an AI rizz coach for style, confidence, dating communication, and appearance tools.

Voice:
- Sound like a sharp, warm friend who has coached people through this in real life.
- Natural, spoken English. Contractions are fine (you'll, don't, it's).
- Mix short punchy lines with longer explanatory ones.
- Use concrete scenes and small examples people can picture.
- Be specific and practical. Skip fluff.

Hard bans:
- Never use em dashes (—) or en dashes (–). Use commas, periods, colons, or parentheses instead.
- Avoid AI tells: "delve", "landscape", "robust", "in today's world", "it's important to note", "unlock your potential", "game-changer", "navigate the complexities".
- No medical claims. No vanity scoring. No plagiarism.
- Always original wording.
- Say "Rizz Assist" (two words), never "RizzAssist".

Return ONLY valid JSON.`;

  const user = `Write one long, human-feeling blog post. Depth like a thorough Medium guide, not a tip list.

Topic id: ${topic.id}
Title hint: ${topic.titleHint}
Category: ${topic.category}
Angle: ${topic.angle}
Related tool: ${topic.relatedToolLabel || 'none'} (${topic.relatedToolHref || 'n/a'})

${inspirationBlock}

Requirements:
- About 1,400 to 2,200 words across sections (aim for an 8 to 12 minute read)
- 6 to 9 sections with clear H2 headings and natural keywords (not stuffed)
- Each section: 2 to 4 solid paragraphs; add bullets or one short quote where it helps
- Include a concrete "how to check yourself" or step-by-step practice section
- Include common mistakes and fixes
- End with a practical action plan and a soft CTA to the related tool
- First section should answer the reader's main question quickly
- title: roughly 50 to 65 characters when possible; primary keyword near the front; no clickbait
- excerpt: 140 to 160 characters; benefit + keyword; usable as a meta description
- slug: kebab-case, unique, no dates, keyword-rich
- readMinutes: integer estimate
- usedInspiration: boolean
- Absolutely no em dashes or en dashes anywhere in the JSON strings

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
    { temperature: 0.9, maxTokens: 8192, jsonMode: true, timeoutMs: 120_000 }
  );

  const parsed = JSON.parse(raw) as GeneratedPayload;
  if (!parsed?.title || !Array.isArray(parsed.sections) || parsed.sections.length < 4) {
    throw new Error('DeepSeek returned an incomplete blog payload.');
  }
  const cleaned = humanizePayload(parsed);
  cleaned.slug = slugify(cleaned.slug || cleaned.title);
  cleaned.usedInspiration = Boolean(cleaned.usedInspiration);
  return cleaned;
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
  const images = await fetchBlogImages(topic.imageQueries, 4, date.getDate());
  const blocks = buildBlocks(payload, images);
  const { author, references } = resolveAuthor(topic, payload.usedInspiration);
  const imageCredits = toImageCredits(images);

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
    imageCredits,
    generated: true,
    relatedToolHref: topic.relatedToolHref,
    relatedToolLabel: topic.relatedToolLabel,
  };

  let nextIndex: GeneratedBlogIndex;
  try {
    nextIndex = await appendGeneratedPost(post, topic.id, dateKey, {
      force: options?.force,
    });
  } catch {
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
