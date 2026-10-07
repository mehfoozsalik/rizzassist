'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LIKERT_OPTIONS } from '@/lib/assessments/engine';
import { trackAssessment } from '@/lib/assessments/analytics';
import type { AssessmentDefinition } from '@/lib/assessments/types';

type Props = {
  definition: AssessmentDefinition;
  onComplete: (answers: Record<string, number>) => void;
  onCancel?: () => void;
};

export function AssessmentRunner({ definition, onComplete, onCancel }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const total = definition.questions.length;
  const question = definition.questions[index];
  const progress = Math.round(((index + (answers[question?.id] != null ? 1 : 0)) / total) * 100);
  const selected = question ? answers[question.id] : undefined;

  useEffect(() => {
    trackAssessment('tool_started', { tool: definition.slug });
  }, [definition.slug]);

  const select = useCallback(
    (value: number) => {
      if (!question) return;
      setAnswers((prev) => ({ ...prev, [question.id]: value }));
      trackAssessment('question_answered', {
        tool: definition.slug,
        question: question.id,
        value,
      });
    },
    [question, definition.slug]
  );

  const goNext = () => {
    if (selected == null) return;
    if (index >= total - 1) {
      const finalAnswers = { ...answers, [question.id]: selected };
      onComplete(finalAnswers);
      return;
    }
    setIndex((i) => i + 1);
  };

  const goBack = () => {
    if (index === 0) {
      onCancel?.();
      return;
    }
    setIndex((i) => i - 1);
  };

  if (!question) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
        Something went wrong loading questions.{' '}
        <button type="button" className="underline" onClick={onCancel}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-ink-900 sm:p-8">
      <div className="sticky top-16 z-10 -mx-1 mb-6 rounded-xl bg-white/95 px-1 py-2 backdrop-blur dark:bg-ink-900/95">
        <div className="flex items-center justify-between text-xs font-medium text-ink-600 dark:text-white/50">
          <span>
            Question {index + 1} of {total}
          </span>
          <span aria-live="polite">{progress}%</span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Assessment progress"
        >
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold leading-snug text-ink-900 dark:text-white sm:text-xl">
        {question.text}
      </h2>
      <p className="mt-2 text-xs text-ink-500 dark:text-white/40">
        How much does this sound like you?
      </p>

      <fieldset className="mt-6 space-y-2">
        <legend className="sr-only">Choose how much you agree</legend>
        {LIKERT_OPTIONS.map((opt) => {
          const active = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => select(opt.value)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                active
                  ? 'border-brand-500 bg-brand-50 font-semibold text-brand-800 dark:border-brand-400 dark:bg-brand-500/15 dark:text-brand-200'
                  : 'border-gray-150 border-gray-200 text-ink-700 hover:border-brand-200 dark:border-white/10 dark:text-white/80 dark:hover:border-brand-500/40'
              }`}
              aria-pressed={active}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  active
                    ? 'bg-brand-600 text-white'
                    : 'bg-ink-100 text-ink-600 dark:bg-white/10 dark:text-white/60'
                }`}
              >
                {opt.value}
              </span>
              {opt.label}
            </button>
          );
        })}
      </fieldset>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-100 dark:text-white/60 dark:hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={selected == null}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {index >= total - 1 ? 'See results' : 'Continue'}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
