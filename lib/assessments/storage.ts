import type { AssessmentResult } from './types';

const RESULTS_KEY = 'rizzassist_assessment_results_v1';

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadResults(): AssessmentResult[] {
  if (typeof window === 'undefined') return [];
  return safeParse<AssessmentResult[]>(localStorage.getItem(RESULTS_KEY), []);
}

export function saveResult(result: AssessmentResult) {
  if (typeof window === 'undefined') return;
  const prev = loadResults().filter(
    (r) => !(r.slug === result.slug && r.completedAt === result.completedAt)
  );
  const next = [result, ...prev].slice(0, 100);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(next));
}

export function getLatestBySlug(slug: string): AssessmentResult | undefined {
  return loadResults().find((r) => r.slug === slug);
}

export function getHistoryForSlug(slug: string): AssessmentResult[] {
  return loadResults()
    .filter((r) => r.slug === slug)
    .sort((a, b) => +new Date(b.completedAt) - +new Date(a.completedAt));
}

export function clearAssessmentData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(RESULTS_KEY);
  localStorage.removeItem('rizzassist_premium_unlocked_v1');
}

/** Aggregate latest scores across assessments for profile / report */
export function aggregateProfile() {
  const results = loadResults();
  const latestBySlug = new Map<string, AssessmentResult>();
  for (const r of results) {
    if (!latestBySlug.has(r.slug)) latestBySlug.set(r.slug, r);
  }
  const latest = [...latestBySlug.values()];
  const dimMap = new Map<string, { label: string; scores: number[] }>();
  for (const r of latest) {
    for (const d of r.dimensions) {
      const cur = dimMap.get(d.id) ?? { label: d.label, scores: [] };
      cur.scores.push(d.score);
      dimMap.set(d.id, cur);
    }
  }
  const dimensions = [...dimMap.entries()].map(([id, v]) => ({
    id,
    label: v.label,
    score: Math.round(v.scores.reduce((a, b) => a + b, 0) / v.scores.length),
  }));
  dimensions.sort((a, b) => b.score - a.score);
  const overall =
    latest.length === 0
      ? 0
      : Math.round(latest.reduce((s, r) => s + r.overall, 0) / latest.length);
  return { latest, dimensions, overall, count: latest.length };
}
