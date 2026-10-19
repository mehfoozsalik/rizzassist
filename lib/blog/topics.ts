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
    imageQueries: [
      'woman applying eyeshadow close up',
      'eyeliner brush on eyelid',
      'beauty mirror eye makeup',
      'almond eye makeup tutorial',
    ],
  },
  {
    id: 'face-shape-hairstyles',
    titleHint: 'Face Shape Hairstyles That Look Intentional (Not Trendy for Trend’s Sake)',
    category: 'Grooming',
    angle:
      'Map oval, round, square, heart, diamond, oblong, and triangle faces to hair length, volume placement, and barber talking points.',
    relatedToolHref: '/face-shape-detector',
    relatedToolLabel: 'Detect Your Face Shape',
    imageQueries: [
      'barber cutting mens hair salon',
      'man looking in haircut mirror',
      'stylist combing client hair',
      'mens fade haircut close up',
    ],
  },
  {
    id: 'body-shape-vs-type',
    titleHint: 'Body Shape vs Body Type: How to Dress With Confidence',
    category: 'Style',
    angle:
      'Explain silhouette ratios vs somatotypes, then give outfit formulas that support posture and presence.',
    relatedToolHref: '/body-shape-calculator',
    relatedToolLabel: 'Calculate Your Body Shape',
    imageQueries: [
      'person trying on tailored jacket',
      'clothing rack organized wardrobe',
      'mannequin outfit styling studio',
      'full length mirror outfit check',
    ],
  },
  {
    id: 'social-confidence-habits',
    titleHint: 'Social Confidence Habits You Can Practice This Week',
    category: 'Confidence',
    angle:
      'Actionable micro-reps, recovery scripts after awkward moments, and how to measure progress without fake bravado.',
    relatedToolHref: '/social-confidence-test',
    relatedToolLabel: 'Take the Social Confidence Test',
    imageQueries: [
      'friends talking laughing cafe',
      'person greeting coworker hallway',
      'small group conversation outdoors',
      'confident handshake meeting',
    ],
  },
  {
    id: 'first-message-dating',
    titleHint: 'First Messages That Feel Natural (And Why Clever Often Fails)',
    category: 'Dating',
    angle:
      'Break down opener structure, specificity, follow-ups, and when to suggest a plan — with examples and anti-patterns.',
    relatedToolHref: '/first-message-analyzer',
    relatedToolLabel: 'Analyze a First Message',
    imageQueries: [
      'hands typing phone dating app',
      'smartphone text messages screen',
      'couple chatting cafe table',
      'person smiling reading phone',
    ],
  },
  {
    id: 'communication-styles',
    titleHint: 'Communication Styles and the Self-Awareness Gap',
    category: 'Personality',
    angle:
      'How clarity, listening, and authenticity show up in first impressions; diagnose over-explaining, interviewing, and conflict avoidance.',
    relatedToolHref: '/communication-style-test',
    relatedToolLabel: 'Map Your Communication Style',
    imageQueries: [
      'two people deep conversation cafe',
      'active listening interview meeting',
      'team discussion around table',
      'friends talking on park bench',
    ],
  },
  {
    id: 'eyebrow-grooming-presence',
    titleHint: 'Eyebrow Grooming for Presence: A Practical Guide',
    category: "Men's Guide",
    angle:
      'Natural thickness norms, stray cleanup, what to tell a barber, and how brows frame eye contact.',
    relatedToolHref: '/grooming-assessment',
    relatedToolLabel: 'Start Grooming Assessment',
    imageQueries: [
      'barber trimming eyebrows man',
      'mens eyebrow grooming close up',
      'tweezers brow grooming mirror',
      'man skincare face grooming',
    ],
  },
  {
    id: 'photo-setup-face-tools',
    titleHint: 'The Photo Setup Guide for Face & Eye AI Tools',
    category: 'How-to',
    angle:
      'Lighting, angle, hair, expression, and resolution tips so detectors and try-ons produce cleaner advice.',
    relatedToolHref: '/face-shape-detector',
    relatedToolLabel: 'Try Face Shape Detection',
    imageQueries: [
      'front facing portrait window light',
      'ring light selfie phone tripod',
      'neutral expression headshot daylight',
      'person taking mirror selfie clean',
    ],
  },
  {
    id: 'charisma-conversation',
    titleHint: 'Charisma Is a Conversation Skill (Not a Personality Trait)',
    category: 'Social Skills',
    angle:
      'Warmth + competence signals, storytelling beats, exits, and how to practice without performing.',
    relatedToolHref: '/charisma-test',
    relatedToolLabel: 'Take the Charisma Test',
    imageQueries: [
      'person storytelling friends dinner',
      'speaker engaging small audience',
      'group laughing conversation party',
      'warm smile eye contact portrait',
    ],
  },
  {
    id: 'color-analysis-wardrobe',
    titleHint: 'Personal Color Analysis: Build a Wardrobe That Matches Your Presence',
    category: 'Style',
    angle:
      'Seasonal color ideas explained simply, how undertones affect shirts and jackets, and linking colors to confidence.',
    relatedToolHref: '/color-analysis',
    relatedToolLabel: 'Run Color Analysis',
    imageQueries: [
      'fabric color swatches palette',
      'person holding color drapes face',
      'coordinated wardrobe shirts hangers',
      'fashion color matching clothes',
    ],
  },
  {
    id: 'dating-first-impressions',
    titleHint: 'First Impressions on Dates: Calm Interest Beats Intensity',
    category: 'Dating',
    angle:
      'Body language, pacing, curiosity questions, and recovering from silence without over-apologizing.',
    relatedToolHref: '/first-impression-test',
    relatedToolLabel: 'Assess First Impressions',
    imageQueries: [
      'couple first date cafe conversation',
      'two people smiling restaurant table',
      'eye contact conversation outdoor',
      'casual date walking city street',
    ],
  },
  {
    id: 'glasses-for-face-shape',
    titleHint: 'Glasses Frames by Face Shape: A Clear Fitting Guide',
    category: 'Grooming',
    angle:
      'Match frame geometry to face proportions; include try-on mindset and common mistakes.',
    relatedToolHref: '/try-on/glasses',
    relatedToolLabel: 'Try Glasses Virtually',
    imageQueries: [
      'person trying on eyeglasses store',
      'eyeglasses frames display shelf',
      'portrait wearing stylish glasses',
      'optical shop frames close up',
    ],
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
