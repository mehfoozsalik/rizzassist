'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RelatedTools } from '@/components/assessments/RelatedTools';
import { buildRecommendations } from '@/lib/assessments/engine';
import { trackAssessment } from '@/lib/assessments/analytics';
import { getRelatedTools } from '@/lib/assessments/registry';
import { aggregateProfile } from '@/lib/assessments/storage';
import type { DimensionScore } from '@/lib/assessments/types';

export default function ReportPage() {
  const [overall, setOverall] = useState(0);
  const [dimensions, setDimensions] = useState<DimensionScore[]>([]);
  const [count, setCount] = useState(0);
  const [recs, setRecs] = useState<string[]>([]);
  const related = getRelatedTools([
    'personality-test',
    'confidence-test',
    'charisma-test',
    'rizz-test',
  ]);

  useEffect(() => {
    const agg = aggregateProfile();
    setOverall(agg.overall);
    setDimensions(agg.dimensions as DimensionScore[]);
    setCount(agg.count);
    setRecs(buildRecommendations(agg.dimensions as DimensionScore[], 8));
    trackAssessment('report_viewed');
  }, []);

  const strength = dimensions[0];
  const growth = [...dimensions].sort((a, b) => a.score - b.score)[0];

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream-50 dark:bg-ink-800">
        <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Free report
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-ink-900 dark:text-white sm:text-4xl">
              Your Personality Improvement Report
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-600 dark:text-white/55">
              Combine assessments into one overview of personality, confidence, communication,
              social skills, and dating strengths — plus a practical improvement plan.
            </p>
          </header>

          {count === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-ink-900">
              <p className="text-sm text-ink-600 dark:text-white/60">
                Take at least one assessment to generate your report. We recommend starting with the
                Personality Test.
              </p>
              <Link
                href="/personality-test"
                className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Start Personality Test
              </Link>
            </div>
          ) : (
            <>
              <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
                <h2 className="text-lg font-bold text-ink-900 dark:text-white">
                  Personality overview
                </h2>
                <p className="mt-2 text-4xl font-extrabold text-brand-600">{overall}/100</p>
                <p className="mt-1 text-xs text-ink-500">
                  Based on {count} assessment{count === 1 ? '' : 's'} saved on this device
                </p>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
                <h2 className="text-lg font-bold text-ink-900 dark:text-white">
                  Dimension profile
                </h2>
                <ul className="mt-4 space-y-3">
                  {dimensions.map((d) => (
                    <li key={d.id}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>{d.label}</span>
                        <span className="tabular-nums font-semibold">{d.score}</span>
                      </div>
                      <div className="h-2 rounded-full bg-ink-100 dark:bg-white/10">
                        <div
                          className="h-full rounded-full bg-brand-600"
                          style={{ width: `${d.score}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {strength && growth && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <article className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                    <h2 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                      Strengths
                    </h2>
                    <p className="mt-2 text-lg font-bold text-ink-900 dark:text-white">
                      {strength.label} ({strength.score})
                    </p>
                    <p className="mt-2 text-sm text-ink-600 dark:text-white/60">
                      Your current profile indicates {strength.label.toLowerCase()} is a relative
                      advantage. Use it deliberately when meeting new people.
                    </p>
                  </article>
                  <article className="rounded-2xl border border-amber-200/60 bg-amber-50/50 p-5 dark:border-amber-500/20 dark:bg-amber-500/10">
                    <h2 className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                      Improvement opportunities
                    </h2>
                    <p className="mt-2 text-lg font-bold text-ink-900 dark:text-white">
                      {growth.label} ({growth.score})
                    </p>
                    <p className="mt-2 text-sm text-ink-600 dark:text-white/60">
                      You may benefit from focused practice here. Small weekly habits move this
                      score faster than one-off effort.
                    </p>
                  </article>
                </div>
              )}

              <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
                <h2 className="text-lg font-bold text-ink-900 dark:text-white">
                  Personalized action plan
                </h2>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-ink-700 dark:text-white/70">
                  {recs.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ol>
              </section>
              <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
                <h2 className="text-lg font-bold text-ink-900 dark:text-white">
                  30-day improvement program
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-ink-700 dark:text-white/70">
                  <li>
                    <strong>Days 1–7:</strong> One low-stakes social rep daily (greeting, question,
                    or compliment). Log how it felt.
                  </li>
                  <li>
                    <strong>Days 8–14:</strong> Practice open questions and active listening in
                    every conversation over 5 minutes.
                  </li>
                  <li>
                    <strong>Days 15–21:</strong> Focus on your growth dimension (
                    {growth?.label ?? 'awareness'}) with one deliberate drill from your recs.
                  </li>
                  <li>
                    <strong>Days 22–30:</strong> Retake 2–3 assessments and compare scores in{' '}
                    <Link href="/profile" className="text-brand-600 underline">
                      My Profile
                    </Link>
                    .
                  </li>
                </ul>
              </section>
            </>
          )}

          <RelatedTools tools={related} title="Keep building your profile" />
        </div>
      </main>
      <Footer />
    </>
  );
}
