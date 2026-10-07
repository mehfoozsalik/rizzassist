export type AssessmentCategory =
  | 'personality'
  | 'confidence'
  | 'social'
  | 'dating'
  | 'appearance';

export type DimensionId =
  | 'confidence'
  | 'communication'
  | 'charisma'
  | 'socialAwareness'
  | 'emotionalIntelligence'
  | 'authenticity'
  | 'conversation'
  | 'datingConfidence'
  | 'listening'
  | 'selfAwareness';

export const DIMENSION_LABELS: Record<DimensionId, string> = {
  confidence: 'Confidence',
  communication: 'Communication',
  charisma: 'Charisma',
  socialAwareness: 'Social Awareness',
  emotionalIntelligence: 'Emotional Intelligence',
  authenticity: 'Authenticity',
  conversation: 'Conversation Skills',
  datingConfidence: 'Dating Confidence',
  listening: 'Listening',
  selfAwareness: 'Self-Awareness',
};

export type LikertOption = {
  label: string;
  value: number; // 1-5
};

export type AssessmentQuestion = {
  id: string;
  text: string;
  dimension: DimensionId;
  /** If true, high agreement lowers the dimension score */
  reverse?: boolean;
};

export type AssessmentDefinition = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: AssessmentCategory;
  description: string;
  whatItMeasures: string;
  minutes: number;
  questionCountLabel?: string;
  questions: AssessmentQuestion[];
  relatedSlugs: string[];
  faqs: { question: string; answer: string }[];
};

export type DimensionScore = {
  id: DimensionId;
  label: string;
  score: number;
};

export type AssessmentResult = {
  assessmentId: string;
  slug: string;
  title: string;
  completedAt: string;
  overall: number;
  dimensions: DimensionScore[];
  answers: Record<string, number>;
  strength: DimensionScore;
  growth: DimensionScore;
  recommendations: string[];
};

export type CatalogTool = {
  slug: string;
  href: string;
  title: string;
  description: string;
  category: AssessmentCategory;
  kind: 'assessment' | 'appearance' | 'report' | 'utility';
  minutes?: number;
  freeLabel: 'Free';
  cta: string;
  icon: string; // lucide icon name key
};
