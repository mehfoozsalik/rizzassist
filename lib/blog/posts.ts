export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-become-more-confident-socially',
    title: 'How to Become More Confident Socially',
    excerpt:
      'Practical habits for social confidence — then measure your baseline with the Social Confidence Test.',
    category: 'Confidence',
    date: '2026-10-05',
    readMinutes: 5,
    content: [
      'Social confidence is a practice, not a personality transplant. Start with low-stakes reps: greet a barista by name, ask one open question in a group, and leave before you spiral into overthinking.',
      'Prepare two curiosity questions before events. Speak 10% slower. Recover from awkward moments with a smile and a topic shift instead of an apology loop.',
      'When you want a baseline, take the RizzAssist Social Confidence Test and Confidence Test — then retest in a few weeks to see what improved.',
    ],
  },
  {
    slug: 'communication-styles-self-awareness',
    title: 'Communication Styles and Self-Awareness',
    excerpt:
      'How clarity, listening, and authenticity shape how others experience you — plus tools to map your style.',
    category: 'Personality',
    date: '2026-10-04',
    readMinutes: 5,
    content: [
      'People often judge “chemistry” by communication: Do you listen? Do you over-explain? Do you match energy without losing yourself?',
      'Self-awareness helps you notice when you interview someone, dominate airtime, or avoid conflict. Naming the pattern is the first upgrade.',
      'Try the Communication Style Test and Self-Awareness Assessment on RizzAssist, then see related recommendations in your Personality Improvement Report.',
    ],
  },
  {
    slug: 'how-to-start-conversations',
    title: 'How to Start Conversations That Feel Natural',
    excerpt:
      'Openers, follow-ups, and exits that create real connection — without forced pickup lines.',
    category: 'Social Skills',
    date: '2026-10-03',
    readMinutes: 4,
    content: [
      'Strong openers are specific and easy to answer. Reference a shared context, ask about a preference, then follow the thread they give you.',
      'Aim for exchange, not interrogation. Share a short story, then return a question. Leave with a clear next step when it matters.',
      'Practice with the Conversation Skills Assessment and Charisma Test — or analyze dating openers with the First Message Analyzer.',
    ],
  },
  {
    slug: 'dating-communication-first-impressions',
    title: 'Dating Communication and First Impressions',
    excerpt:
      'Show interest without intensity. Build first-date presence with clarity, curiosity, and calm.',
    category: 'Dating',
    date: '2026-10-02',
    readMinutes: 5,
    content: [
      'Dating confidence shows up in how you text, suggest plans, and recover from silence. Clarity beats cleverness when nerves run high.',
      'On a first meeting, warmth and listening outperform rehearsed lines. Match energy lightly and leave people curious to continue.',
      'Map your patterns with the Dating Personality Test, Rizz Test, and First Impression Assessment on RizzAssist.',
    ],
  },
  {
    slug: 'face-shape-grooming-guide',
    title: 'Face Shape Grooming Guide: Present Yourself with Intention',
    excerpt:
      'How oval, round, square, heart, diamond, oblong, and triangle faces guide hair, glasses, and presence — without vanity scoring.',
    category: 'Grooming',
    date: '2026-10-01',
    readMinutes: 6,
    content: [
      'Personality grooming starts with understanding your proportions — not chasing a score. Your face shape tells you which hair lines, frames, and expressions make you look intentional.',
      'Oval faces are versatile: pick styles that match your energy. Round faces gain polish from vertical volume. Square faces soften with texture. Heart and diamond shapes benefit from balance at the chin. Oblong faces need horizontal width; triangle shapes need crown volume.',
      'Use Rizz Assist’s face shape detector or try-on tools to preview changes privately, then bring a clear brief to your barber or stylist.',
    ],
  },
  {
    slug: 'mens-eyebrow-grooming-presence',
    title: 'Men’s Eyebrow Grooming for Confident Presence',
    excerpt:
      'Thickness norms, stray hairs, and how to talk to a barber — framed as personality presence, not trends.',
    category: "Men's Guide",
    date: '2026-09-20',
    readMinutes: 5,
    content: [
      'Brows frame eye contact — one of the fastest signals of presence. Keep them natural: clean the unibrow area, trim long strays, and avoid over-plucking into thin arches unless that matches your personal style.',
      'Tell your barber: “Clean the middle, keep thickness, light tidy on the edges.” Bring a selfie in natural light so they see your true brow line.',
      'Pair brow care with face shape tips — soft arches help square faces; fuller brows support heart and diamond mid-faces.',
    ],
  },
  {
    slug: 'body-shape-vs-body-type-confidence',
    title: 'Body Shape vs Body Type: Dress for Confidence',
    excerpt:
      'Silhouette ratios vs somatotypes — how both tools help you choose clothes that support personality, not insecurity.',
    category: 'Style',
    date: '2026-09-10',
    readMinutes: 5,
    content: [
      'Body shape (hourglass, pear, rectangle…) is about proportions. Body type (ecto/meso/endo) leans metabolic and training. Together they guide fits that feel like you.',
      'When clothes skim your shape correctly, posture and confidence follow — that is personality improvement through grooming and style.',
      'Start with Rizz Assist body calculators, then apply dress colors from your Rizz Report.',
    ],
  },
  {
    slug: 'first-photo-setup-face-tools',
    title: 'Photo Setup Guide for Face & Eye Tools',
    excerpt:
      'Lighting, angle, and hair tips so face shape, eye shape, and try-on tools give cleaner grooming advice.',
    category: 'How-to',
    date: '2026-08-28',
    readMinutes: 4,
    content: [
      'Face the camera straight on. Soft daylight from the front beats overhead shadows. Pull hair off the forehead and remove sunglasses.',
      'Neutral expression helps landmark detection. One face in frame. High resolution helps try-on alignment.',
      'If detection fails, retake — don’t force a blurry crop. Good input = better grooming output.',
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
