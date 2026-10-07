'use client';

import { useState } from 'react';
import {
  classifyFromManualMeasurements,
  getFaceShapeProfile,
  type FaceShape,
} from '@/lib/faceShape';

const FIELDS = [
  { key: 'forehead', label: 'Forehead width' },
  { key: 'cheekbones', label: 'Cheekbone width' },
  { key: 'jaw', label: 'Jaw width' },
  { key: 'faceLength', label: 'Face length (hairline to chin)' },
] as const;

export function FaceShapeCalculator() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [shape, setShape] = useState<FaceShape | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nums = {
      forehead: Number(values.forehead),
      cheekbones: Number(values.cheekbones),
      jaw: Number(values.jaw),
      faceLength: Number(values.faceLength),
    };
    if (Object.values(nums).some((n) => !n || n <= 0)) {
      setError('Enter all four measurements as positive numbers (same unit).');
      setShape(null);
      return;
    }
    setError(null);
    setShape(classifyFromManualMeasurements(nums));
  };

  const profile = shape ? getFaceShapeProfile(shape) : null;

  return (
    <div className="mx-auto max-w-xl">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-ink-800"
      >
        <p className="text-sm text-gray-500 dark:text-white/50">
          Measure with a soft tape or string. Use the same unit for all four —
          only ratios matter for personality grooming recommendations.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <label key={f.key} className="block text-sm">
              <span className="font-medium text-gray-900 dark:text-white">{f.label}</span>
              <input
                type="number"
                step="0.1"
                min="0"
                value={values[f.key] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-ink-900 dark:text-white"
              />
            </label>
          ))}
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="mt-5 w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-500"
        >
          Calculate face shape
        </button>
      </form>

      {profile && shape && (
        <div className="mt-6 rounded-2xl border border-brand-200 bg-white p-6 dark:border-brand-600/30 dark:bg-ink-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Result</p>
          <h3 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">{shape}</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-white/60">{profile.tagline}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-gray-600 dark:text-white/60">
            {profile.hairstyles.slice(0, 3).map((h) => (
              <li key={h}>• {h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
