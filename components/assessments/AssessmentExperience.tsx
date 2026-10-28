'use client';

import { useEffect, useMemo, useState } from 'react';
import { Clock, Lock, Shield, Sparkles, User } from 'lucide-react';
import { scoreAssessment } from '@/lib/assessments/engine';
import { getRelatedTools } from '@/lib/assessments/registry';
import { saveResult } from '@/lib/assessments/storage';
import { trackAssessment } from '@/lib/assessments/analytics';
import type { AssessmentDefinition, AssessmentResult } from '@/lib/assessments/types';
import { AssessmentRunner } from './AssessmentRunner';
import { AssessmentResults } from './AssessmentResults';
import { RelatedTools } from './RelatedTools';

type Phase = 'landing' | 'quiz' | 'results';

export function AssessmentExperience({ definition }: { definition: AssessmentDefinition }) {
  const [phase, setPhase] = useState<Phase>('landing');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const related = useMemo(
    () => getRelatedTools(definition.relatedSlugs),
    [definition.relatedSlugs]
  );

  useEffect(() => {
    trackAssessment('tool_viewed', { tool: definition.slug });
  }, [definition.slug]);

  const start = () => setPhase('quiz');

  const complete = (answers: Record<string, number>) => {
    const scored = scoreAssessment(definition, answers);
    const full: AssessmentResult = {
      ...scored,
      completedAt: new Date().toISOString(),
    };
    saveResult(full);
    trackAssessment('tool_completed', {
      tool: definition.slug,
      overall: full.overall,
    });
    setResult(full);
    setPhase('results');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (phase === 'quiz') {
    return (
      <AssessmentRunner
        definition={definition}
        onComplete={complete}
        onCancel={() => setPhase('landing')}
      />
    );
  }

  if (phase === 'results' && result) {
    return (
      <AssessmentResults
        result={result}
        related={related}
        onRetake={() => {
          setResult(null);
          setPhase('quiz');
        }}
      />
    );
  }

  return (
    <div className="space-y-10">
      <section className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
          Free assessment
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-ink-900 dark:text-white sm:text-4xl">
          {definition.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-ink-600 dark:text-white/60">
          {definition.description}
        </p>
        <button
          type="button"
          onClick={start}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-500"
        >
          <Sparkles className="h-4 w-4" aria-hidden />
          Start Free Assessment
        </button>
        <ul className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-500 dark:text-white/45">
          <li className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" aria-hidden /> Free to start
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden /> Takes {definition.minutes} minutes
          </li>
          <li className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" aria-hidden /> Personalized results
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" aria-hidden /> Private
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900 sm:p-8">
        <h2 className="text-xl font-bold text-ink-900 dark:text-white">What is this test?</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-white/60">
          {definition.whatItMeasures}
        </p>
      </section>

      <section>
        <h2 className="text-center text-xl font-bold text-ink-900 dark:text-white">How it works</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              step: '1',
              title: 'Answer',
              text: 'Answer a series of statements about your behavior and preferences, one at a time.',
            },
            {
              step: '2',
              title: 'Analyze',
              text: 'RizzAssist scores your responses across relevant dimensions with a consistent rules engine.',
            },
            {
              step: '3',
              title: 'Improve',
              text: 'Receive personalized recommendations based on your actual strengths and growth areas.',
            },
          ].map((s) => (
            <li
              key={s.step}
              className="rounded-2xl border border-gray-100 bg-white p-5 text-center dark:border-white/5 dark:bg-ink-900"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {s.step}
              </span>
              <h3 className="mt-3 font-semibold text-ink-900 dark:text-white">{s.title}</h3>
              <p className="mt-2 text-xs text-ink-600 dark:text-white/50">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={start}
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500"
          >
            Begin {definition.shortTitle}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
        <h2 className="text-lg font-bold text-ink-900 dark:text-white">Benefits</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-600 dark:text-white/60">
          <li>Clear scores across meaningful social dimensions</li>
          <li>Strength and growth interpretation in plain language</li>
          <li>Actionable recommendations tied to your answers</li>
          <li>Combined improvement report from all your assessments</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
        <h2 className="text-lg font-bold text-ink-900 dark:text-white">FAQ</h2>
        <dl className="mt-4 space-y-4">
          {definition.faqs.map((f) => (
            <div key={f.question}>
              <dt className="text-sm font-semibold text-ink-900 dark:text-white">{f.question}</dt>
              <dd className="mt-1 text-sm text-ink-600 dark:text-white/55">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <RelatedTools tools={related} title="Related tools" subtitle="Build a fuller self-improvement profile" />
    </div>
  );
}
