'use client';

import { useState } from 'react';
import {
  classifyFaceShape,
  getFaceShapeProfile,
  type FaceShape,
} from '@/lib/faceShape';

const QUESTIONS = [
  {
    id: 'length',
    q: 'How does face length compare to width?',
    options: [
      { label: 'Noticeably longer than wide', score: { faceLengthRatio: 1.6 } },
      { label: 'Slightly longer (~1.5×)', score: { faceLengthRatio: 1.35 } },
      { label: 'About equal', score: { faceLengthRatio: 1.05 } },
    ],
  },
  {
    id: 'widest',
    q: 'Which area looks widest?',
    options: [
      { label: 'Forehead / temples', score: { foreheadToJawRatio: 1.3, jawToCheekRatio: 0.78 } },
      { label: 'Cheekbones', score: { foreheadToJawRatio: 1.0, jawToCheekRatio: 0.8, cheekToJawDiff: 0.15 } },
      { label: 'Jawline', score: { foreheadToJawRatio: 0.8, jawToCheekRatio: 1.05 } },
      { label: 'Balanced / similar', score: { foreheadToJawRatio: 1.0, jawToCheekRatio: 0.9 } },
    ],
  },
  {
    id: 'jaw',
    q: 'How would you describe your jaw?',
    options: [
      { label: 'Soft and rounded', score: { jawToCheekRatio: 0.82 } },
      { label: 'Angular and defined', score: { jawToCheekRatio: 0.95 } },
      { label: 'Narrow or pointed chin', score: { jawToCheekRatio: 0.75 } },
    ],
  },
] as const;

export function FaceShapeQuiz() {
  const [step, setStep] = useState(0);
  const [acc, setAcc] = useState({
    faceLengthRatio: 1.3,
    jawToCheekRatio: 0.85,
    foreheadToJawRatio: 1,
    cheekToJawDiff: 0.05,
  });
  const [shape, setShape] = useState<FaceShape | null>(null);

  const pick = (score: Partial<typeof acc>) => {
    const next = { ...acc, ...score };
    setAcc(next);
    if (step + 1 >= QUESTIONS.length) {
      setShape(classifyFaceShape(next));
    } else {
      setStep(step + 1);
    }
  };

  const profile = shape ? getFaceShapeProfile(shape) : null;
  const current = QUESTIONS[step];

  if (profile && shape) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-white p-6 text-center dark:border-brand-600/30 dark:bg-ink-800">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Quiz result</p>
        <h3 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">{shape}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-white/60">{profile.tagline}</p>
        <p className="mt-4 text-sm text-gray-500 dark:text-white/50">{profile.personalityPresence[0]}</p>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setShape(null);
          }}
          className="mt-6 text-sm font-medium text-brand-600 underline"
        >
          Retake quiz
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-ink-800">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        Question {step + 1} of {QUESTIONS.length}
      </p>
      <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{current.q}</h3>
      <ul className="mt-5 space-y-2">
        {current.options.map((opt) => (
          <li key={opt.label}>
            <button
              type="button"
              onClick={() => pick(opt.score)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-800 transition hover:border-brand-300 hover:bg-brand-50/40 dark:border-white/10 dark:text-white/80 dark:hover:border-brand-600/40"
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
