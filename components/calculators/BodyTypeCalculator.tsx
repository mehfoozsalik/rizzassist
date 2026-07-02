'use client';

import { useState } from 'react';
import {
  Apple,
  Calendar,
  Dumbbell,
  Flame,
  Salad,
  Shirt,
  Sparkles,
  Users,
} from 'lucide-react';
import type { ActivityLevel, BodyTypeMeasurements } from '@/lib/types';
import { BODY_TYPE_PROFILES, bmiCategory, calculateBodyType } from '@/lib/bodyType';
import { BMIGauge } from './BMIGauge';

const FIELDS: { key: keyof Omit<BodyTypeMeasurements, 'unit' | 'gender' | 'activityLevel'>; label: string }[] = [
  { key: 'height', label: 'Height' },
  { key: 'weight', label: 'Weight' },
  { key: 'shoulder', label: 'Shoulder width' },
  { key: 'chest', label: 'Chest' },
  { key: 'waist', label: 'Waist' },
  { key: 'hip', label: 'Hip' },
  { key: 'wrist', label: 'Wrist circumference' },
];

const ACTIVITY_LEVELS: ActivityLevel[] = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'];
const TABS = ['Fitness', 'Diet', 'Style', 'Weekly Plan'] as const;
type Tab = (typeof TABS)[number];

const WEEKLY_PLANS: Record<string, { cardio: string; strength: string; rest: string }> = {
  Ectomorph: { cardio: '2x per week', strength: '4x per week', rest: '1 day' },
  Mesomorph: { cardio: '3x per week', strength: '4x per week', rest: '1 day' },
  Endomorph: { cardio: '4x per week', strength: '3x per week', rest: '1 day' },
};

export function BodyTypeCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('Moderately Active');
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReturnType<typeof calculateBodyType> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('Fitness');

  const lengthUnit = unit === 'metric' ? 'cm' : 'in';
  const weightUnit = unit === 'metric' ? 'kg' : 'lb';

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed: Record<string, number> = {};
    for (const f of FIELDS) {
      const n = Number(values[f.key]);
      if (!values[f.key] || Number.isNaN(n) || n <= 0) {
        setError(`Please enter a valid ${f.label.toLowerCase()}.`);
        setResult(null);
        return;
      }
      parsed[f.key] = n;
    }
    setError(null);
    const measurements: BodyTypeMeasurements = {
      height: parsed.height,
      weight: parsed.weight,
      shoulder: parsed.shoulder,
      chest: parsed.chest,
      waist: parsed.waist,
      hip: parsed.hip,
      wrist: parsed.wrist,
      gender,
      activityLevel,
      unit,
    };
    setResult(calculateBodyType(measurements));
  };

  const fallbackProfile = result ? BODY_TYPE_PROFILES.find((p) => p.type === result.type) : null;
  const weeklyPlan = result ? WEEKLY_PLANS[result.type] : null;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form onSubmit={onSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/5 dark:bg-ink-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your measurements</h2>
          <div className="inline-flex rounded-lg border border-gray-200 p-0.5 text-sm dark:border-white/10">
            {(['metric', 'imperial'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                aria-pressed={unit === u}
                className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                  unit === u ? 'bg-ink-900 text-white dark:bg-ink-700' : 'text-gray-500 hover:text-gray-900 dark:text-white/50 dark:hover:text-white'
                }`}
              >
                {u === 'metric' ? 'cm / kg' : 'in / lb'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FIELDS.map((f) => {
            const isWeight = f.key === 'weight';
            const u = isWeight ? weightUnit : lengthUnit;
            return (
              <div key={f.key}>
                <label htmlFor={`bt-${f.key}`} className="block text-sm font-medium text-gray-700 dark:text-white/70">
                  {f.label} ({u})
                </label>
                <input
                  id={`bt-${f.key}`}
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  aria-describedby={`bt-${f.key}-help`}
                  value={values[f.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-ink-700 dark:text-white dark:focus:ring-brand-600/20"
                />
                <p id={`bt-${f.key}-help`} className="mt-1 text-xs text-gray-400 dark:text-white/30">
                  Enter your {f.label.toLowerCase()} in {u}
                </p>
              </div>
            );
          })}

          <div>
            <label htmlFor="bt-gender" className="block text-sm font-medium text-gray-700 dark:text-white/70">
              Gender (for frame size){' '}
              <span className="text-gray-400 dark:text-white/30">(optional)</span>
            </label>
            <select
              id="bt-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-ink-700 dark:text-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="bt-activity" className="block text-sm font-medium text-gray-700 dark:text-white/70">
              Activity level
            </label>
            <select
              id="bt-activity"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-ink-700 dark:text-white"
            >
              {ACTIVITY_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-ink-800 sm:w-auto"
        >
          Calculate My Body Type
        </button>

        <p className="mt-4 text-xs text-gray-400 dark:text-white/30">
          Body type is an estimate based on your measurements. Consult a fitness
          professional for a precise assessment.
        </p>
      </form>

      {result && (
        <div role="alert" aria-live="polite" className="mt-8 space-y-6">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:justify-center dark:border-white/5 dark:bg-ink-800">
            <BMIGauge bmi={result.bmi} />
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500 dark:text-white/50">
                BMI Category: <strong className="text-gray-900 dark:text-white">{bmiCategory(result.bmi)}</strong>
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
                Frame size: <strong className="text-gray-900 capitalize dark:text-white">{result.frameSize}</strong>
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
                Shoulder/Hip ratio: <strong className="text-gray-900 dark:text-white">{result.shoulderHipRatio}</strong>
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {BODY_TYPE_PROFILES.map((profile) => {
              const isMatch = profile.type === result.type;
              return (
                <div
                  key={profile.type}
                  className={`rounded-2xl border p-5 transition-all ${
                    isMatch
                      ? 'border-brand-400 bg-ink-900 text-white shadow-xl ring-2 ring-brand-400'
                      : 'border-gray-200 bg-white text-gray-900 dark:border-white/5 dark:bg-ink-800 dark:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold">{profile.type}</h3>
                    {isMatch && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/20 px-2.5 py-1 text-[11px] font-semibold text-brand-300">
                        <Sparkles className="h-3 w-3" aria-hidden="true" />
                        Your Type
                      </span>
                    )}
                  </div>
                  <p className={`mt-2 text-sm leading-relaxed ${isMatch ? 'text-white/70' : 'text-gray-600 dark:text-white/60'}`}>
                    {profile.description}
                  </p>
                </div>
              );
            })}
          </div>

          {fallbackProfile && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/5 dark:bg-ink-800">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Body type advice categories">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === tab ? 'bg-ink-900 text-white dark:bg-ink-700' : 'border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-5">
                {activeTab === 'Fitness' && (
                  <Section icon={<Dumbbell className="h-3.5 w-3.5" />} title="Workout Plan" items={fallbackProfile.fitness} />
                )}
                {activeTab === 'Diet' && (
                  <Section icon={<Salad className="h-3.5 w-3.5" />} title="Diet Tips" items={fallbackProfile.diet} />
                )}
                {activeTab === 'Style' && (
                  <Section icon={<Shirt className="h-3.5 w-3.5" />} title="Style Tips" items={fallbackProfile.style} />
                )}
                {activeTab === 'Weekly Plan' && weeklyPlan && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: 'Cardio', value: weeklyPlan.cardio },
                      { label: 'Strength', value: weeklyPlan.strength },
                      { label: 'Rest', value: weeklyPlan.rest },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl border border-gray-100 bg-cream-50 p-4 text-center">
                        <Calendar className="mx-auto h-4 w-4 text-brand-600" aria-hidden="true" />
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{item.label}</p>
                        <p className="mt-1 text-sm font-bold text-gray-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                <Users className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                {fallbackProfile.famous.join(' · ')}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Section({
  icon,
  title,
  items,
  tone = 'default',
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  tone?: 'default' | 'avoid';
}) {
  if (!items?.length) return null;
  return (
    <div>
      <h4
        className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${
          tone === 'avoid' ? 'text-red-600' : 'text-brand-600'
        }`}
      >
        {icon}
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tone === 'avoid' ? 'bg-red-400' : 'bg-brand-500'}`}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
