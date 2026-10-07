'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { trackAssessment } from '@/lib/assessments/analytics';
import {
  aggregateProfile,
  clearAssessmentData,
  getHistoryForSlug,
} from '@/lib/assessments/storage';
import type { AssessmentResult } from '@/lib/assessments/types';

export default function ProfilePage() {
  const [overall, setOverall] = useState(0);
  const [dimensions, setDimensions] = useState<{ id: string; label: string; score: number }[]>(
    []
  );
  const [latest, setLatest] = useState<AssessmentResult[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = () => {
    const agg = aggregateProfile();
    setOverall(agg.overall);
    setDimensions(agg.dimensions);
    setLatest(agg.latest);
    setReady(true);
  };

  useEffect(() => {
    refresh();
    trackAssessment('profile_viewed');
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-[70vh] bg-cream-50 dark:bg-ink-800">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-extrabold text-ink-900 dark:text-white">
            My RizzAssist Profile
          </h1>
          <p className="mt-2 text-sm text-ink-600 dark:text-white/55">
            Saved on this device. Complete assessments to build your personality profile and track
            progress over time.
          </p>

          {!ready ? (
            <p className="mt-8 text-sm text-ink-500">Loading profile…</p>
          ) : latest.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-ink-900">
              <p className="text-sm text-ink-600 dark:text-white/60">
                No assessments yet. Start with the Personality Test or Confidence Test.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Link
                  href="/personality-test"
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Personality Test
                </Link>
                <Link
                  href="/tools"
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold dark:border-white/10"
                >
                  Browse tools
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                  Personality score
                </p>
                <p className="mt-2 text-4xl font-extrabold text-ink-900 dark:text-white">
                  {overall}
                  <span className="text-lg font-medium text-ink-400"> / 100</span>
                </p>
                <p className="mt-1 text-xs text-ink-500">
                  Averaged from {latest.length} completed assessment
                  {latest.length === 1 ? '' : 's'}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {dimensions.map((d) => (
                    <li key={d.id} className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-ink-700 dark:text-white/80">{d.label}</span>
                        <span className="font-semibold tabular-nums">{d.score}</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-ink-100 dark:bg-white/10">
                        <div
                          className="h-full rounded-full bg-brand-600"
                          style={{ width: `${d.score}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
                <h2 className="text-lg font-bold text-ink-900 dark:text-white">
                  Completed assessments
                </h2>
                <ul className="mt-4 space-y-4">
                  {latest.map((r) => {
                    const history = getHistoryForSlug(r.slug);
                    const older = history[1];
                    return (
                      <li
                        key={r.slug}
                        className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-50 pb-3 last:border-0 dark:border-white/5"
                      >
                        <div>
                          <Link
                            href={`/${r.slug}`}
                            className="text-sm font-semibold text-ink-900 hover:text-brand-600 dark:text-white"
                          >
                            {r.title}
                          </Link>
                          <p className="text-xs text-ink-500">
                            {new Date(r.completedAt).toLocaleDateString()} · Score {r.overall}
                            {older && (
                              <span>
                                {' '}
                                ({older.overall} → {r.overall})
                              </span>
                            )}
                          </p>
                        </div>
                        <Link
                          href={`/${r.slug}`}
                          className="text-xs font-semibold text-brand-600"
                        >
                          Retake
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <Link
                href="/report"
                className="inline-flex rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-500"
              >
                View improvement report
              </Link>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Clear all saved assessment data on this device?')) {
                    clearAssessmentData();
                    refresh();
                  }
                }}
                className="block text-xs text-ink-400 underline hover:text-red-600"
              >
                Clear saved data
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
