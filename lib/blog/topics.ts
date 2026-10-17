import type { BlogTopic } from './types';

/**
 * Rotating topic pool for daily automation.
 * Inspiration links are references only — posts must be original AI writing.
 */
export const BLOG_TOPICS: BlogTopic[] = [
  {
    id: 'eye-shape-makeup-101',
    titleHint: 'Eye Makeup 101: Find Your Eye Shape and What Flatters It',
    category: 'Grooming',
    angle:
      'Long educational guide covering almond, round, monolid, hooded, deep-set, and upturned/downturned eyes with practical makeup and grooming tips. Include a clear “how to check in a selfie” section and combinations of tilt, depth, and spacing — similar depth to a Medium 101 guide, but original to Rizz Assist.',
    relatedToolHref: '/eye-shape-detector',
    relatedToolLabel: 'Detect Your Eye Shape',
    inspiration: {
      title: 'Eye-Makeup 101: What is your eye shape? — 32 combinations',
      url: 'https://novaviibeauty.medium.com/eye-makeup-101-what-is-your-eye-shape-32-combinations-which-one-are-you-28b95371c0e0',
      author: 'Novavii',
      note: 'Topic inspiration for structure and educational depth only',
    },
    imageQueries: ['eye makeup', 'eyeliner close up', 'beauty portrait eyes'],
  },
  {
    id: 'face-shape-hairstyles',
    titleHint: 'Face Shape Hairstyles That Look Intentional (Not Trendy for Trend’s Sake)',
    category: 'Grooming',
    angle:
      'Map oval, round, square, heart, diamond, oblong, and triangle faces to hair length, volume placement, and barber talking points.',
    relatedToolHref: '/face-shape-detector',
    relatedToolLabel: 'Detect Your Face Shape',
    imageQueries: ['mens haircut salon', 'hairstyle mirror', 'barber styling'],
  },
  {
    id: 'body-shape-vs-type',
    titleHint: 'Body Shape vs Body Type: How to Dress With Confidence',
    category: 'Style',
    angle:
      'Explain silhouette ratios vs somatotypes, then give outfit formulas that support posture and presence.',
    relatedToolHref: '/body-shape-calculator',
    relatedToolLabel: 'Calculate Your Body Shape',
    imageQueries: ['fashion outfit styling', 'wardrobe clothes rack', 'tailored jacket'],
  },
  {
    id: 'social-confidence-habits',
    titleHint: 'Social Confidence Habits You Can Practice This Week',
    category: 'Confidence',
    angle:
      'Actionable micro-reps, recovery scripts after awkward moments, and how to measure progress without fake bravado.',
    relatedToolHref: '/social-confidence-test',
    relatedToolLabel: 'Take the Social Confidence Test',
    imageQueries: ['friends conversation cafe', 'confident smile social', 'networking event'],
  },
  {
    id: 'first-message-dating',
    titleHint: 'First Messages That Feel Natural (And Why Clever Often Fails)',
    category: 'Dating',
    angle:
      'Break down opener structure, specificity, follow-ups, and when to suggest a plan — with examples and anti-patterns.',
    relatedToolHref: '/first-message-analyzer',
    relatedToolLabel: 'Analyze a First Message',
    imageQueries: ['phone texting coffee', 'dating conversation', 'smartphone messaging'],
  },
  {
    id: 'communication-styles',
    titleHint: 'Communication Styles and the Self-Awareness Gap',
    category: 'Personality',
    angle:
      'How clarity, listening, and authenticity show up in first impressions; diagnose over-explaining, interviewing, and conflict avoidance.',
    relatedToolHref: '/communication-style-test',
    relatedToolLabel: 'Map Your Communication Style',
    imageQueries: ['people talking meeting', 'active listening', 'conversation duo'],
  },
  {
    id: 'eyebrow-grooming-presence',
    titleHint: 'Eyebrow Grooming for Presence: A Practical Guide',
    category: "Men's Guide",
    angle:
      'Natural thickness norms, stray cleanup, what to tell a barber, and how brows frame eye contact.',
    relatedToolHref: '/grooming-assessment',
    relatedToolLabel: 'Start Grooming Assessment',
    imageQueries: ['eyebrow grooming', 'mens grooming face', 'barber brow trim'],
  },
  {
    id: 'photo-setup-face-tools',
    titleHint: 'The Photo Setup Guide for Face & Eye AI Tools',
    category: 'How-to',
    angle:
      'Lighting, angle, hair, expression, and resolution tips so detectors and try-ons produce cleaner advice.',
    relatedToolHref: '/face-shape-detector',
    relatedToolLabel: 'Try Face Shape Detection',
    imageQueries: ['natural light selfie', 'portrait photography window', 'phone camera portrait'],
  },
  {
    id: 'charisma-conversation',
    titleHint: 'Charisma Is a Conversation Skill (Not a Personality Trait)',
    category: 'Social Skills',
    angle:
      'Warmth + competence signals, storytelling beats, exits, and how to practice without performing.',
    relatedToolHref: '/charisma-test',
    relatedToolLabel: 'Take the Charisma Test',
    imageQueries: ['charismatic speaker', 'group laughing conversation', 'storytelling friends'],
  },
  {
    id: 'color-analysis-wardrobe',
    titleHint: 'Personal Color Analysis: Build a Wardrobe That Matches Your Presence',
    category: 'Style',
    angle:
      'Seasonal color ideas explained simply, how undertones affect shirts and jackets, and linking colors to confidence.',
    relatedToolHref: '/color-analysis',
    relatedToolLabel: 'Run Color Analysis',
    imageQueries: ['color swatches fabric', 'wardrobe color coordinated', 'fashion color palette'],
  },
  {
    id: 'dating-first-impressions',
    titleHint: 'First Impressions on Dates: Calm Interest Beats Intensity',
    category: 'Dating',
    angle:
      'Body language, pacing, curiosity questions, and recovering from silence without over-apologizing.',
    relatedToolHref: '/first-impression-test',
    relatedToolLabel: 'Assess First Impressions',
    imageQueries: ['cafe date conversation', 'first date restaurant', 'smiling eye contact'],
  },
  {
    id: 'glasses-for-face-shape',
    titleHint: 'Glasses Frames by Face Shape: A Clear Fitting Guide',
    category: 'Grooming',
    angle:
      'Match frame geometry to face proportions; include try-on mindset and common mistakes.',
    relatedToolHref: '/try-on/glasses',
    relatedToolLabel: 'Try Glasses Virtually',
    imageQueries: ['eyeglasses frames display', 'person wearing glasses', 'optical shop'],
  },
];

/** Pick a topic that hasn’t been used recently; fall back to day-of-year rotation. */
export function pickDailyTopic(usedIds: string[], date = new Date()): BlogTopic {
  const unused = BLOG_TOPICS.filter((t) => !usedIds.includes(t.id));
  const pool = unused.length > 0 ? unused : BLOG_TOPICS;
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return pool[dayOfYear % pool.length];
}
