import { readGeneratedIndex } from './storage';
import type { BlogPost } from './types';

export type { BlogPost, BlogBlock, BlogReference } from './types';

export const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-become-more-confident-socially',
    title: 'How to Become More Confident Socially',
    excerpt:
      'Practical habits for social confidence, then measure your baseline with the free Social Confidence Test on Rizz Assist.',
    category: 'Confidence',
    date: '2026-10-05',
    readMinutes: 5,
    author: 'Rizz Assist',
    content: [],
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Social confidence is a practice, not a personality transplant',
      },
      {
        type: 'paragraph',
        text: 'Start with low-stakes reps: greet a barista by name, ask one open question in a group, and leave before you spiral into overthinking. Small wins stack faster than waiting to “feel ready.”',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Habits that raise your social baseline',
      },
      {
        type: 'paragraph',
        text: 'Prepare two curiosity questions before events. Speak 10% slower. Recover from awkward moments with a smile and a topic shift instead of an apology loop.',
      },
      {
        type: 'list',
        items: [
          'One micro-rep daily (greeting, compliment, or follow-up question)',
          'Two prepared openers for the next social setting',
          'One recovery phrase you actually like using',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Measure progress with Rizz Assist',
      },
      {
        type: 'paragraph',
        text: 'When you want a baseline, take the Rizz Assist Social Confidence Test and Confidence Test, then retest in a few weeks to see what improved.',
      },
    ],
    relatedToolHref: '/social-confidence-test',
    relatedToolLabel: 'Test Your Social Confidence',
  },
  {
    slug: 'communication-styles-self-awareness',
    title: 'Communication Styles and Self-Awareness',
    excerpt:
      'How clarity, listening, and authenticity shape first impressions, plus free tools on Rizz Assist to map your style.',
    category: 'Personality',
    date: '2026-10-04',
    readMinutes: 5,
    author: 'Rizz Assist',
    content: [],
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Chemistry is often just communication',
      },
      {
        type: 'paragraph',
        text: 'People often judge “chemistry” by communication: Do you listen? Do you over-explain? Do you match energy without losing yourself?',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Self-awareness upgrades the pattern',
      },
      {
        type: 'paragraph',
        text: 'Self-awareness helps you notice when you interview someone, dominate airtime, or avoid conflict. Naming the pattern is the first upgrade.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Map your style on Rizz Assist',
      },
      {
        type: 'paragraph',
        text: 'Try the Communication Style Test and Self-Awareness Assessment on Rizz Assist, then see related recommendations in your Personality Improvement Report.',
      },
    ],
    relatedToolHref: '/personality-test',
    relatedToolLabel: 'Take the Personality Test',
  },
  {
    slug: 'how-to-start-conversations',
    title: 'How to Start Conversations That Feel Natural',
    excerpt:
      'Openers, follow-ups, and exits that create real connection, without forced pickup lines. Practice with free Rizz Assist tools.',
    category: 'Social Skills',
    date: '2026-10-03',
    readMinutes: 4,
    author: 'Rizz Assist',
    content: [],
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Use specific, easy-to-answer openers',
      },
      {
        type: 'paragraph',
        text: 'Strong openers are specific and easy to answer. Reference a shared context, ask about a preference, then follow the thread they give you.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Aim for exchange, not interrogation',
      },
      {
        type: 'paragraph',
        text: 'Share a short story, then return a question. Leave with a clear next step when it matters. Forced pickup lines fail when they ignore the room.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Practice with Rizz Assist',
      },
      {
        type: 'paragraph',
        text: 'Practice with the Conversation Skills Assessment and Charisma Test, or analyze dating openers with the First Message Analyzer.',
      },
    ],
    relatedToolHref: '/conversation-skills-test',
    relatedToolLabel: 'Assess Conversation Skills',
  },
  {
    slug: 'dating-communication-first-impressions',
    title: 'Dating Communication and First Impressions',
    excerpt:
      'Show interest without intensity. Build first-date presence with clarity, curiosity, and calm, then check your patterns on Rizz Assist.',
    category: 'Dating',
    date: '2026-10-02',
    readMinutes: 5,
    author: 'Rizz Assist',
    content: [],
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Clarity beats cleverness when nerves run high',
      },
      {
        type: 'paragraph',
        text: 'Dating confidence shows up in how you text, suggest plans, and recover from silence. Clarity beats cleverness when nerves run high.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Warmth and listening outperform rehearsed lines',
      },
      {
        type: 'paragraph',
        text: 'On a first meeting, warmth and listening outperform rehearsed lines. Match energy lightly and leave people curious to continue.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Map your dating patterns',
      },
      {
        type: 'paragraph',
        text: 'Map your patterns with the Dating Personality Test, Rizz Test, and First Impression Assessment on Rizz Assist.',
      },
    ],
    relatedToolHref: '/rizz-test',
    relatedToolLabel: 'Take the Rizz Test',
  },
  {
    slug: 'face-shape-grooming-guide',
    title: 'Face Shape Grooming Guide: Present Yourself with Intention',
    excerpt:
      'How oval, round, square, heart, diamond, oblong, and triangle faces guide hair, glasses, and presence, with Rizz Assist face tools.',
    category: 'Grooming',
    date: '2026-10-01',
    readMinutes: 6,
    author: 'Rizz Assist',
    content: [],
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Start with proportions, not a vanity score',
      },
      {
        type: 'paragraph',
        text: 'Personality grooming starts with understanding your proportions, not chasing a score. Your face shape tells you which hair lines, frames, and expressions make you look intentional.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Quick face shape cues',
      },
      {
        type: 'paragraph',
        text: 'Oval faces are versatile: pick styles that match your energy. Round faces gain polish from vertical volume. Square faces soften with texture. Heart and diamond shapes benefit from balance at the chin. Oblong faces need horizontal width; triangle shapes need crown volume.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Preview changes privately on Rizz Assist',
      },
      {
        type: 'paragraph',
        text: 'Use Rizz Assist’s face shape detector or try-on tools to preview changes privately, then bring a clear brief to your barber or stylist.',
      },
    ],
    relatedToolHref: '/face-shape-detector',
    relatedToolLabel: 'Detect Your Face Shape',
  },
  {
    slug: 'mens-eyebrow-grooming-presence',
    title: 'Men’s Eyebrow Grooming for Confident Presence',
    excerpt:
      'Thickness norms, stray hairs, and how to talk to a barber, framed as presence and grooming, not trends.',
    category: "Men's Guide",
    date: '2026-09-20',
    readMinutes: 5,
    author: 'Rizz Assist',
    content: [],
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Brows frame eye contact and presence',
      },
      {
        type: 'paragraph',
        text: 'Brows frame eye contact, and that is one of the fastest signals of presence. Keep them natural: clean the unibrow area, trim long strays, and avoid over-plucking into thin arches unless that matches your personal style.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What to tell your barber',
      },
      {
        type: 'paragraph',
        text: 'Tell your barber: “Clean the middle, keep thickness, light tidy on the edges.” Bring a selfie in natural light so they see your true brow line.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Pair brows with face shape tips',
      },
      {
        type: 'paragraph',
        text: 'Pair brow care with face shape tips. Soft arches help square faces; fuller brows support heart and diamond mid-faces. Try the Rizz Assist Grooming Assessment for a fuller checklist.',
      },
    ],
    relatedToolHref: '/grooming-assessment',
    relatedToolLabel: 'Grooming Assessment',
  },
  {
    slug: 'body-shape-vs-body-type-confidence',
    title: 'Body Shape vs Body Type: Dress for Confidence',
    excerpt:
      'Silhouette ratios vs somatotypes, how both Rizz Assist calculators help you choose clothes that support confidence.',
    category: 'Style',
    date: '2026-09-10',
    readMinutes: 5,
    author: 'Rizz Assist',
    content: [],
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Shape is proportions; type leans training',
      },
      {
        type: 'paragraph',
        text: 'Body shape (hourglass, pear, rectangle…) is about proportions. Body type (ecto/meso/endo) leans metabolic and training. Together they guide fits that feel like you.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Clothes that skim correctly raise presence',
      },
      {
        type: 'paragraph',
        text: 'When clothes skim your shape correctly, posture and confidence follow, that is personality improvement through grooming and style.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Start with Rizz Assist calculators',
      },
      {
        type: 'paragraph',
        text: 'Start with Rizz Assist body calculators, then apply dress colors from your Rizz Report.',
      },
    ],
    relatedToolHref: '/style-assessment',
    relatedToolLabel: 'Start Style Assessment',
  },
  {
    slug: 'first-photo-setup-face-tools',
    title: 'Photo Setup Guide for Face & Eye Tools',
    excerpt:
      'Lighting, angle, and hair tips so Rizz Assist face shape, eye shape, and try-on tools give cleaner grooming advice.',
    category: 'How-to',
    date: '2026-08-28',
    readMinutes: 4,
    author: 'Rizz Assist',
    content: [],
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Lighting and framing that work',
      },
      {
        type: 'paragraph',
        text: 'Face the camera straight on. Soft daylight from the front beats overhead shadows. Pull hair off the forehead and remove sunglasses.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Expression and resolution tips',
      },
      {
        type: 'paragraph',
        text: 'Neutral expression helps landmark detection. One face in frame. High resolution helps try-on alignment.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'If detection fails, retake',
      },
      {
        type: 'paragraph',
        text: 'If detection fails, retake, don’t force a blurry crop. Good input = better grooming output from Rizz Assist tools.',
      },
    ],
    relatedToolHref: '/tools',
    relatedToolLabel: 'Explore All Tools',
  },
];

/** @deprecated Prefer getAllPosts(), kept for modules that import the static list synchronously. */
export const BLOG_POSTS = STATIC_BLOG_POSTS;

function mergePosts(generated: BlogPost[]): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();
  for (const post of STATIC_BLOG_POSTS) bySlug.set(post.slug, post);
  for (const post of generated) bySlug.set(post.slug, post);
  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const index = await readGeneratedIndex();
  return mergePosts(index.posts);
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

/** Sync lookup for static posts only (build-time helpers). */
export function getStaticPost(slug: string): BlogPost | undefined {
  return STATIC_BLOG_POSTS.find((p) => p.slug === slug);
}
