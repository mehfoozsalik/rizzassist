import { personalityTest, communicationStyleTest, selfAwarenessTest, emotionalIntelligenceTest } from './defs/personality';
import { confidenceTest, socialConfidenceTest, datingConfidenceTest, firstImpressionTest } from './defs/confidence';
import {
  charismaTest,
  socialSkillsTest,
  conversationSkillsTest,
  socialAwarenessTest,
  listeningSkillsTest,
} from './defs/social';
import {
  rizzTest,
  datingPersonalityTest,
  flirtingStyleTest,
  conversationAnalyzer,
  firstMessageAnalyzer,
} from './defs/dating';
import { styleAssessment, groomingAssessment } from './defs/appearance';
import type { AssessmentDefinition, AssessmentCategory, CatalogTool } from './types';

export const ASSESSMENTS: AssessmentDefinition[] = [
  personalityTest,
  communicationStyleTest,
  selfAwarenessTest,
  emotionalIntelligenceTest,
  confidenceTest,
  socialConfidenceTest,
  datingConfidenceTest,
  firstImpressionTest,
  charismaTest,
  socialSkillsTest,
  conversationSkillsTest,
  socialAwarenessTest,
  listeningSkillsTest,
  rizzTest,
  datingPersonalityTest,
  flirtingStyleTest,
  conversationAnalyzer,
  firstMessageAnalyzer,
  styleAssessment,
  groomingAssessment,
];

export const ASSESSMENT_BY_SLUG: Record<string, AssessmentDefinition> = Object.fromEntries(
  ASSESSMENTS.map((a) => [a.slug, a])
);

export function getAssessment(slug: string): AssessmentDefinition | undefined {
  return ASSESSMENT_BY_SLUG[slug];
}

/** Appearance + utility tools that already exist as routes */
export const APPEARANCE_TOOLS: CatalogTool[] = [
  {
    slug: 'face-shape-detector',
    href: '/face-shape-detector',
    title: 'Face Shape Detector',
    description: 'Upload a photo to detect your face shape and get style-aware tips.',
    category: 'appearance',
    kind: 'appearance',
    minutes: 1,
    freeLabel: 'Free',
    cta: 'Detect My Face Shape',
    icon: 'scan',
  },
  {
    slug: 'eye-shape-detector',
    href: '/eye-shape-detector',
    title: 'Eye Shape Detector',
    description: 'Identify your eye shape for makeup, brows, and framing ideas.',
    category: 'appearance',
    kind: 'appearance',
    minutes: 1,
    freeLabel: 'Free',
    cta: 'Detect My Eye Shape',
    icon: 'eye',
  },
  {
    slug: 'body-shape-calculator',
    href: '/body-shape-calculator',
    title: 'Body Shape Calculator',
    description: 'Find your body shape from simple measurements.',
    category: 'appearance',
    kind: 'appearance',
    minutes: 2,
    freeLabel: 'Free',
    cta: 'Calculate Body Shape',
    icon: 'ruler',
  },
  {
    slug: 'body-type-calculator',
    href: '/body-type-calculator',
    title: 'Body Type Calculator',
    description: 'Estimate somatotype tendencies from measurements.',
    category: 'appearance',
    kind: 'appearance',
    minutes: 2,
    freeLabel: 'Free',
    cta: 'Calculate Body Type',
    icon: 'activity',
  },
];

export const CATEGORY_META: Record<
  AssessmentCategory,
  { label: string; blurb: string }
> = {
  personality: {
    label: 'Personality',
    blurb: 'Understand how you think, communicate, and show up.',
  },
  confidence: {
    label: 'Confidence',
    blurb: 'Measure social presence and self-trust under pressure.',
  },
  social: {
    label: 'Social Skills',
    blurb: 'Charisma, conversation, listening, and awareness.',
  },
  dating: {
    label: 'Rizz & Dating',
    blurb: 'Flirting, dating personality, and conversation chemistry.',
  },
  appearance: {
    label: 'Appearance',
    blurb: 'Face, eyes, body shape, style, and grooming.',
  },
};

export function assessmentsToCatalog(): CatalogTool[] {
  return ASSESSMENTS.map((a) => ({
    slug: a.slug,
    href: `/${a.slug}`,
    title: a.title,
    description: a.description,
    category: a.category,
    kind: 'assessment' as const,
    minutes: a.minutes,
    freeLabel: 'Free' as const,
    cta:
      a.category === 'appearance'
        ? `Assess My ${a.shortTitle}`
        : a.category === 'dating'
          ? `Start ${a.shortTitle}`
          : `Analyze My ${a.shortTitle}`,
    icon: 'clipboard',
  }));
}

export function getAllCatalogTools(): CatalogTool[] {
  const report: CatalogTool = {
    slug: 'personality-report',
    href: '/report',
    title: 'Personality Improvement Report',
    description:
      'Combine your assessments into one actionable personality, confidence, and social improvement plan.',
    category: 'personality',
    kind: 'report',
    minutes: 10,
    freeLabel: 'Free',
    cta: 'View My Report',
    icon: 'file',
  };
  return [...assessmentsToCatalog(), ...APPEARANCE_TOOLS, report];
}

export function getRelatedTools(slugs: string[]): CatalogTool[] {
  const all = getAllCatalogTools();
  return slugs
    .map((s) => all.find((t) => t.slug === s || t.href === `/${s}` || t.href === s))
    .filter(Boolean) as CatalogTool[];
}
