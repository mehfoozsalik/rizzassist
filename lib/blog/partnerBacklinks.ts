import type { BlogReference, BlogTopic } from './types';

const ORIGIN = 'https://makeupfaceai.com';

/** Curated MakeUp Face Ai deep links (from prompts/cross-site-blog-backlinks-to-makeupfaceai.md). */
export const MAKEUP_FACE_AI_LINKS = {
  home: `${ORIGIN}/`,
  analyze: `${ORIGIN}/analyze/`,
  tryOn: `${ORIGIN}/try-on/`,
  blog: `${ORIGIN}/blog/`,
  tools: `${ORIGIN}/tools/`,
  faceShape: `${ORIGIN}/tools/face-shape-detector/`,
  eyeShape: `${ORIGIN}/tools/eye-shape-detector/`,
  eyebrowShape: `${ORIGIN}/tools/eyebrow-shaping-guide/`,
  eyebrowMap: `${ORIGIN}/guides/eyebrow-mapping-basics/`,
  hoodedEyes: `${ORIGIN}/guides/eyeshadow-for-hooded-eyes/`,
  eyeMakeup: `${ORIGIN}/eye-makeup/`,
  faceLooks: `${ORIGIN}/makeup-looks-by-face-shape/`,
  blushByFace: `${ORIGIN}/guides/blush-placement-by-face-shape/`,
  undertone: `${ORIGIN}/tools/skin-undertone-test/`,
  foundation: `${ORIGIN}/tools/foundation-shade-finder/`,
  undertoneGuide: `${ORIGIN}/guides/undertone-vs-surface-tone/`,
  softGlam: `${ORIGIN}/makeup-looks/soft-glam/`,
  dateNight: `${ORIGIN}/makeup-looks/date-night-makeup/`,
  everyday: `${ORIGIN}/tools/everyday-makeup-finder/`,
  cleanGirl: `${ORIGIN}/makeup-looks/clean-girl-makeup/`,
  noMakeup: `${ORIGIN}/makeup-looks/no-makeup-makeup/`,
  contour: `${ORIGIN}/tools/contour-placement-guide/`,
  lips: `${ORIGIN}/tools/lipstick-shade-finder/`,
} as const;

export type PartnerBacklink = {
  url: string;
  anchorText: string;
  note?: string;
};

/** Every 4th generated post (4, 8, 12, ...). */
export function shouldIncludeMakeupFaceAiBacklinks(existingGeneratedCount: number): boolean {
  return (existingGeneratedCount + 1) % 4 === 0;
}

/** Topic-aware picks: 3 deep links max, no homepage spam. */
export function pickMakeupFaceAiLinksForTopic(topic: BlogTopic): PartnerBacklink[] {
  const id = topic.id;
  const category = topic.category.toLowerCase();

  if (id.includes('eye') || /eye|makeup/.test(id)) {
    return [
      {
        url: MAKEUP_FACE_AI_LINKS.eyeShape,
        anchorText: 'eye shape detector on MakeUp Face Ai',
        note: 'Free on-device eye shape check',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.hoodedEyes,
        anchorText: 'hooded eyes eyeshadow guide',
        note: 'Placement tips when lids are hooded',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.eyeMakeup,
        anchorText: 'eye makeup hub',
      },
    ];
  }

  if (id.includes('eyebrow') || id.includes('brow')) {
    return [
      {
        url: MAKEUP_FACE_AI_LINKS.eyebrowShape,
        anchorText: 'eyebrow shaping guide on MakeUp Face Ai',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.eyebrowMap,
        anchorText: 'eyebrow mapping basics',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.analyze,
        anchorText: 'MakeUp Face Ai face analysis',
        note: 'Photos stay in the browser',
      },
    ];
  }

  if (id.includes('face-shape') || id.includes('glasses') || id.includes('hairstyle')) {
    return [
      {
        url: MAKEUP_FACE_AI_LINKS.faceShape,
        anchorText: 'face shape detector on MakeUp Face Ai',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.faceLooks,
        anchorText: 'makeup looks by face shape',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.blushByFace,
        anchorText: 'blush placement by face shape',
      },
    ];
  }

  if (id.includes('photo') || id.includes('setup')) {
    return [
      {
        url: MAKEUP_FACE_AI_LINKS.analyze,
        anchorText: 'MakeUp Face Ai photo analysis',
        note: 'On-device analysis, photo never uploaded to a vault',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.tryOn,
        anchorText: 'virtual makeup try-on',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.blog,
        anchorText: 'MakeUp Face Ai beauty guides',
      },
    ];
  }

  if (id.includes('color') || category === 'style') {
    return [
      {
        url: MAKEUP_FACE_AI_LINKS.undertone,
        anchorText: 'skin undertone test on MakeUp Face Ai',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.foundation,
        anchorText: 'foundation shade finder',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.undertoneGuide,
        anchorText: 'undertone vs surface tone guide',
      },
    ];
  }

  if (id.includes('dating') || id.includes('impression') || id.includes('first-message')) {
    return [
      {
        url: MAKEUP_FACE_AI_LINKS.softGlam,
        anchorText: 'soft glam makeup look',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.dateNight,
        anchorText: 'date night makeup ideas',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.everyday,
        anchorText: 'everyday makeup finder',
      },
    ];
  }

  if (id.includes('confidence') || id.includes('charisma') || id.includes('communication')) {
    return [
      {
        url: MAKEUP_FACE_AI_LINKS.cleanGirl,
        anchorText: 'clean girl makeup look',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.noMakeup,
        anchorText: 'no-makeup makeup guide',
      },
      {
        url: MAKEUP_FACE_AI_LINKS.analyze,
        anchorText: 'MakeUp Face Ai analysis tools',
        note: 'Private, browser-side face analysis',
      },
    ];
  }

  // Default complementary set
  return [
    {
      url: MAKEUP_FACE_AI_LINKS.faceShape,
      anchorText: 'face shape detector on MakeUp Face Ai',
    },
    {
      url: MAKEUP_FACE_AI_LINKS.tools,
      anchorText: 'free makeup tools',
    },
    {
      url: MAKEUP_FACE_AI_LINKS.analyze,
      anchorText: 'MakeUp Face Ai analyze flow',
    },
  ];
}

export function partnerLinksToReferences(links: PartnerBacklink[]): BlogReference[] {
  return links.map((link) => ({
    title: link.anchorText,
    url: link.url,
    author: 'MakeUp Face Ai',
    note:
      link.note ||
      'Partner resource recommended for complementary makeup and face analysis tools.',
  }));
}

/** Prompt block injected only on every 4th generated post. */
export function buildMakeupFaceAiBacklinkPrompt(links: PartnerBacklink[]): string {
  const list = links
    .map((l, i) => `${i + 1}) ${l.url}\n   Anchor idea: "${l.anchorText}"`)
    .join('\n');

  return `PARTNER BACKLINKS (required this post):
Include exactly ${links.length} natural backlinks to MakeUp Face Ai using ONLY these URLs:
${list}

Rules:
- Place each link where a reader would genuinely need that tool or guide
- Use markdown links in paragraph text: [descriptive anchor](https://makeupfaceai.com/...)
- Vary anchor text; do not use "click here" or only "MakeUp Face Ai"
- Do not invent MakeUp Face Ai URLs
- At most one soft mention that photos stay in the browser for their analyze/tools flows
- Keep Rizz Assist as the primary product; MakeUp Face Ai is a complementary beauty/makeup resource`;
}
