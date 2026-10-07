import {
  DIMENSION_LABELS,
  type AssessmentDefinition,
  type AssessmentResult,
  type DimensionId,
  type DimensionScore,
} from './types';

export const LIKERT_OPTIONS = [
  { label: 'Strongly disagree', value: 1 },
  { label: 'Disagree', value: 2 },
  { label: 'Neutral', value: 3 },
  { label: 'Agree', value: 4 },
  { label: 'Strongly agree', value: 5 },
] as const;

const REC_BANK: Partial<Record<DimensionId, string[]>> = {
  confidence: [
    'Practice speaking 10% slower in your next three conversations — calm pacing often reads as confidence.',
    'Before social events, prepare two open questions you can ask anyone; preparation reduces freeze.',
    'Stand with both feet planted and shoulders open for 30 seconds before introductions.',
  ],
  communication: [
    'Replace yes/no questions with “what / how / tell me about…” prompts this week.',
    'After you share a story, ask a follow-up about their experience before adding another of yours.',
    'Summarize what you heard in one sentence before giving advice.',
  ],
  charisma: [
    'Lead with genuine curiosity — one specific compliment or observation beats rehearsed lines.',
    'Use people’s names once in conversation; it raises engagement without feeling forced.',
    'Match energy lightly: if they are calm, don’t over-hype; if animated, smile and lean in.',
  ],
  socialAwareness: [
    'Watch for exit cues (short answers, looking away) and offer a graceful pause or topic change.',
    'Notice volume and proximity — dial both down slightly in quiet settings.',
    'In groups, invite quieter people in with a direct, low-pressure question.',
  ],
  emotionalIntelligence: [
    'Name your feeling privately before reacting (“I’m annoyed”) — naming reduces overreaction.',
    'Ask “Do you want ideas or just someone to listen?” before problem-solving.',
    'Journal one social interaction daily: what you felt, what they might have felt.',
  ],
  authenticity: [
    'Share one real preference this week instead of defaulting to “I’m fine with anything.”',
    'Drop one performative habit (forced laugh, fake interest) and replace it with a honest pause.',
    'Align your photos and bio with how you actually show up day-to-day.',
  ],
  conversation: [
    'Use the 70/30 rule in new chats: listen more early, share more once rapport exists.',
    'Keep a mental “thread”: reference something they said two minutes ago.',
    'Practice 60-second stories with a clear beginning, spark, and exit question.',
  ],
  datingConfidence: [
    'Send one low-stakes message that shows curiosity, not performance, today.',
    'Plan date ideas you’d enjoy even if chemistry is average — authenticity reduces pressure.',
    'After a rejection or silence, write one learning note, then move on within 24 hours.',
  ],
  listening: [
    'Silence your phone and keep it face-down for your next one-on-one chat.',
    'Ask one clarifying question before you respond with your own story.',
    'Reflect emotion (“that sounds frustrating”) before content.',
  ],
  selfAwareness: [
    'Rate your energy 1–10 before social plans and choose environments that fit.',
    'Ask a trusted friend for one strength and one blind spot — write both down.',
    'After tough talks, note your default reaction pattern without judging it.',
  ],
};

function clampScore(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function toScore(rawAvg: number) {
  // Likert 1-5 → 0-100
  return clampScore(((rawAvg - 1) / 4) * 100);
}

export function scoreAssessment(
  def: AssessmentDefinition,
  answers: Record<string, number>
): Omit<AssessmentResult, 'completedAt'> {
  const buckets: Partial<Record<DimensionId, number[]>> = {};

  for (const q of def.questions) {
    const raw = answers[q.id];
    if (raw == null) continue;
    const v = q.reverse ? 6 - raw : raw;
    if (!buckets[q.dimension]) buckets[q.dimension] = [];
    buckets[q.dimension]!.push(v);
  }

  const dimensions: DimensionScore[] = Object.entries(buckets).map(([id, vals]) => {
    const dim = id as DimensionId;
    const avg = vals!.reduce((a, b) => a + b, 0) / vals!.length;
    return { id: dim, label: DIMENSION_LABELS[dim], score: toScore(avg) };
  });

  dimensions.sort((a, b) => b.score - a.score);
  const overall =
    dimensions.length === 0
      ? 0
      : clampScore(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length);

  const strength = dimensions[0] ?? {
    id: 'authenticity' as DimensionId,
    label: 'Authenticity',
    score: overall,
  };
  const growth = [...dimensions].sort((a, b) => a.score - b.score)[0] ?? strength;

  const recommendations = buildRecommendations(dimensions);

  return {
    assessmentId: def.id,
    slug: def.slug,
    title: def.title,
    overall,
    dimensions,
    answers,
    strength,
    growth,
    recommendations,
  };
}

export function buildRecommendations(dimensions: DimensionScore[], limit = 6): string[] {
  const sorted = [...dimensions].sort((a, b) => a.score - b.score);
  const picks: string[] = [];
  for (const d of sorted) {
    const bank = REC_BANK[d.id] ?? [];
    for (const line of bank) {
      if (picks.length >= limit) break;
      if (!picks.includes(line)) picks.push(line);
    }
    if (picks.length >= limit) break;
  }
  // Always include a strength-based tip
  const top = [...dimensions].sort((a, b) => b.score - a.score)[0];
  if (top && top.score >= 75) {
    picks.unshift(
      `Lean into your ${top.label.toLowerCase()} (${top.score}/100) — it’s already a social advantage; use it deliberately this week.`
    );
  }
  return picks.slice(0, limit);
}

export function interpretationFor(score: number): string {
  if (score >= 85) return 'a clear strength in your current profile';
  if (score >= 70) return 'a solid area with room to refine under pressure';
  if (score >= 55) return 'a developing area that improves quickly with deliberate practice';
  return 'an opportunity area — small weekly habits can move this noticeably';
}
