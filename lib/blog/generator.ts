import { callDeepSeek } from '@/lib/deepseekServer';
import {
  fetchBlogImagesFromBriefs,
  toImageCredits,
  type ImageBrief,
} from './images';
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
    .replace(/\u2014/g, ', ')
    .replace(/\u2013/g, ', ')
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

function normalizeHeading(h: string): string {
  return h.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function buildBlocks(payload: GeneratedPayload, images: BlogImage[]): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const cover = images.find((i) => i.role === 'cover') || images[0];
  const inline = images.filter((i) => i !== cover);
  const usedInline = new Set<number>();

  const findInlineForHeading = (heading: string): BlogImage | undefined => {
    const target = normalizeHeading(heading);
    const byHeading = inline.findIndex(
      (img, idx) =>
        !usedInline.has(idx) &&
        img.afterHeading &&
        normalizeHeading(img.afterHeading) === target
    );
    if (byHeading >= 0) {
      usedInline.add(byHeading);
      return inline[byHeading];
    }
    return undefined;
  };

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

    let img = section.heading ? findInlineForHeading(section.heading) : undefined;
    // Spread remaining images across odd sections if no heading match
    if (!img && sectionIndex % 2 === 1) {
      const nextIdx = inline.findIndex((_, idx) => !usedInline.has(idx));
      if (nextIdx >= 0) {
        usedInline.add(nextIdx);
        img = inline[nextIdx];
      }
    }

    if (img) {
      blocks.push({
        type: 'image',
        src: img.src,
        alt: img.alt,
        caption: img.photographer
          ? `Photo by ${img.photographer} on Unsplash`
          : img.alt,
        photographer: img.photographer,
        photographerUrl: img.photographerUrl,
        photoUrl: img.photoUrl,
      });
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

/**
 * Ask DeepSeek for Unsplash-ready visual search briefs from the finished outline.
 * These drive relevant stock photos instead of vague topic keywords alone.
 */
async function requestImageBriefs(
  topic: BlogTopic,
  payload: GeneratedPayload
): Promise<ImageBrief[]> {
  const headings = payload.sections.map((s) => s.heading).filter(Boolean);
  const system = `You plan stock photo searches for a blog on Unsplash.
Return ONLY JSON. Queries must be concrete visual scenes a photographer would shoot.
Never abstract (no "confidence", "growth", "journey"). Prefer people, objects, places, close-ups.
No em dashes.`;

  const user = `Article title: ${payload.title}
Category: ${topic.category}
Fallback topic queries: ${topic.imageQueries.join(', ')}
Section headings:
${headings.map((h, i) => `${i + 1}. ${h}`).join('\n')}

Create exactly 4 image briefs:
1) role "cover" (hero image for the whole article)
2-4) role "inline" (each tied to a different section)

Rules for each query:
- 3 to 6 concrete words (example: "woman window natural light portrait", "barber trimming men's haircut", "eyeglasses on wooden table")
- visual: one sentence describing what must appear in the frame
- afterHeading: copy an exact section heading from the list for inline images (omit for cover)
- Prefer editorial / lifestyle photography that matches the section topic

JSON shape:
{
  "images": [
    { "role": "cover", "query": string, "visual": string },
    { "role": "inline", "query": string, "visual": string, "afterHeading": string }
  ]
}`;

  try {
    const raw = await callDeepSeek(
      [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      { temperature: 0.4, maxTokens: 1024, jsonMode: true, timeoutMs: 45_000 }
    );
    const parsed = JSON.parse(raw) as { images?: ImageBrief[] };
    const images = Array.isArray(parsed.images) ? parsed.images : [];
    const cleaned = images
      .filter((img) => img?.query && img?.visual)
      .slice(0, 4)
      .map((img, i) => ({
        query: humanizeText(String(img.query)).slice(0, 80),
        visual: humanizeText(String(img.visual)).slice(0, 160),
        role: (img.role === 'cover' || i === 0 ? 'cover' : 'inline') as 'cover' | 'inline',
        afterHeading: img.afterHeading
          ? humanizeText(String(img.afterHeading))
          : undefined,
      }));

    if (cleaned.length >= 2) {
      // Ensure exactly one cover
      const coverIdx = cleaned.findIndex((c) => c.role === 'cover');
      cleaned.forEach((c, i) => {
        c.role = i === (coverIdx >= 0 ? coverIdx : 0) ? 'cover' : 'inline';
      });
      return cleaned;
    }
  } catch (err) {
    console.warn('Image brief generation failed, using topic queries:', err);
  }

  return topic.imageQueries.slice(0, 4).map((query, i) => ({
    query,
    visual: query,
    role: (i === 0 ? 'cover' : 'inline') as 'cover' | 'inline',
    afterHeading: i > 0 ? headings[Math.min(i * 2 - 1, headings.length - 1)] : undefined,
  }));
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
  const briefs = await requestImageBriefs(topic, payload);
  const images = await fetchBlogImagesFromBriefs(briefs, topic.imageQueries);
  const blocks = buildBlocks(payload, images);
  const { author, references } = resolveAuthor(topic, payload.usedInspiration);
  const imageCredits = toImageCredits(images);
  const cover = images.find((i) => i.role === 'cover') || images[0];

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
    coverImage: cover?.src,
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
