'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { interpretationFor } from '@/lib/assessments/engine';
import { trackAssessment } from '@/lib/assessments/analytics';
import type { AssessmentResult } from '@/lib/assessments/types';
import type { CatalogTool } from '@/lib/assessments/types';
import { RelatedTools } from './RelatedTools';

type Props = {
  result: AssessmentResult;
  related: CatalogTool[];
  onRetake: () => void;
};

export function AssessmentResults({ result, related, onRetake }: Props) {
  useEffect(() => {
    trackAssessment('result_viewed', {
      tool: result.slug,
      overall: result.overall,
    });
  }, [result]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
          Your RizzAssist profile
        </p>
        <h2 className="mt-1 text-2xl font-bold text-ink-900 dark:text-white">
          {result.title} results
        </h2>
        <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-brand-500 bg-brand-50 dark:bg-brand-500/10">
            <span className="text-3xl font-extrabold text-brand-700 dark:text-brand-300">
              {result.overall}
            </span>
            <span className="text-[10px] font-medium uppercase text-ink-500">/ 100</span>
          </div>
          <div>
            <p className="text-sm text-ink-600 dark:text-white/60">
              Your responses suggest an overall score of{' '}
              <strong className="text-ink-900 dark:text-white">{result.overall}/100</strong>. This
              reflects current patterns, not a fixed identity.
            </p>
            <p className="mt-2 text-xs text-ink-500 dark:text-white/40">
              Completed {new Date(result.completedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
        <h3 className="text-lg font-bold text-ink-900 dark:text-white">Dimension breakdown</h3>
        <ul className="mt-4 space-y-3">
          {result.dimensions.map((d) => (
            <li key={d.id}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-ink-800 dark:text-white/90">{d.label}</span>
                <span className="tabular-nums text-ink-600 dark:text-white/50">{d.score}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-600"
                  style={{ width: `${d.score}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            Your strength
          </p>
          <h3 className="mt-1 text-lg font-bold text-ink-900 dark:text-white">
            {result.strength.label}
          </h3>
          <p className="mt-1 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
            {result.strength.score}/100
          </p>
          <p className="mt-2 text-sm text-ink-600 dark:text-white/60">
            Your responses suggest {result.strength.label.toLowerCase()} is{' '}
            {interpretationFor(result.strength.score)}. Lean into this deliberately in your next
            conversations.
          </p>
        </article>
        <article className="rounded-2xl border border-amber-200/60 bg-amber-50/50 p-5 dark:border-amber-500/20 dark:bg-amber-500/10">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            Area to improve
          </p>
          <h3 className="mt-1 text-lg font-bold text-ink-900 dark:text-white">
            {result.growth.label}
          </h3>
          <p className="mt-1 text-sm font-semibold text-amber-800 dark:text-amber-200">
            {result.growth.score}/100
          </p>
          <p className="mt-2 text-sm text-ink-600 dark:text-white/60">
            {result.growth.label} is one of the areas with the most room for improvement.
            Strengthening this skill could make your interactions feel more natural.
          </p>
        </article>
      </div>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
        <h3 className="text-lg font-bold text-ink-900 dark:text-white">How you can improve</h3>
        <p className="mt-1 text-sm text-ink-600 dark:text-white/50">
          Recommendations based on your weakest and strongest dimensions, not generic tips.
        </p>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-ink-700 dark:text-white/70">
          {result.recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
        <h3 className="text-lg font-bold text-ink-900 dark:text-white">
          Personalized action highlights
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-ink-700 dark:text-white/70">
          <li>
            • This week: one deliberate practice for{' '}
            <strong>{result.growth.label.toLowerCase()}</strong>.
          </li>
          <li>
            • Use your <strong>{result.strength.label.toLowerCase()}</strong> as the bridge into
            harder conversations.
          </li>
          <li>
            • Retake this assessment in 2-4 weeks and compare scores in{' '}
            <Link href="/profile" className="font-semibold text-brand-600">
              My Profile
            </Link>
            .
          </li>
        </ul>
        <Link
          href="/report"
          className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline"
        >
          View your combined improvement report →
        </Link>
      </section>

      <RelatedTools tools={related} />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            trackAssessment('assessment_retaken', { tool: result.slug });
            onRetake();
          }}
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50 dark:border-white/10 dark:text-white/80"
        >
          Retake assessment
        </button>
        <Link
          href="/tools"
          className="rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900"
        >
          Explore all tools
        </Link>
        <Link
          href="/profile"
          className="rounded-lg px-4 py-2.5 text-sm font-semibold text-brand-600 hover:underline"
        >
          My profile
        </Link>
      </div>
    </div>
  );
}
