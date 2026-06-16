'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  Apple,
  Calendar,
  Dumbbell,
  Loader2,
  Salad,
  Shirt,
  Sparkles,
  Users,
} from 'lucide-react';
import type { ActivityLevel, BodyTypeAdvice, BodyTypeMeasurements } from '@/lib/types';
import { BODY_TYPE_PROFILES, bmiCategory, calculateBodyType } from '@/lib/bodyType';
import { fetchGeminiJson, GeminiNetworkError } from '@/lib/geminiClient';
import { BMIGauge } from './BMIGauge';
import { MacroDonut } from './MacroDonut';

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

function geminiPrompt(
  bodyType: string,
  height: number,
  weight: number,
  bmi: number,
  waist: number,
  hip: number,
  activityLevel: ActivityLevel
) {
  return `You are a certified fitness coach and nutritionist. The user is a ${bodyType} with these stats: Height ${height}cm, Weight ${weight}kg, BMI ${bmi}, Waist ${waist}cm, Hip ${hip}cm, Activity level: ${activityLevel}.
Respond ONLY in this exact JSON with no extra text:
{
  "bodyType": "${bodyType}",
  "bmi": ${bmi},
  "bmiCategory": "Underweight/Normal/Overweight/Obese",
  "description": "What defines this body type metabolically in 2 sentences",
  "fitnessGoal": "Recommended primary fitness goal in 1 sentence",
  "workoutPlan": ["exercise1", "exercise2", "exercise3", "exercise4"],
  "workoutsToAvoid": ["avoid1", "avoid2"],
  "dietTips": ["tip1", "tip2", "tip3", "tip4"],
  "macroSplit": { "protein": "30%", "carbs": "40%", "fats": "30%" },
  "styleTips": ["tip1", "tip2", "tip3"],
  "celebrities": ["celeb1", "celeb2"],
  "weeklyPlan": { "cardio": "3x per week", "strength": "4x per week", "rest": "1 day" }
}`;
}

export function BodyTypeCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('Moderately Active');
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReturnType<typeof calculateBodyType> | null>(null);
  const [advice, setAdvice] = useState<BodyTypeAdvice | null>(null);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('Fitness');

  const lengthUnit = unit === 'metric' ? 'cm' : 'in';
  const weightUnit = unit === 'metric' ? 'kg' : 'lb';

  const onSubmit = async (e: React.FormEvent) => {
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
    const calc = calculateBodyType(measurements);
    setResult(calc);
    setAdvice(null);
    setAiUnavailable(false);
    setLoading(true);

    const heightCm = unit === 'imperial' ? parsed.height * 2.54 : parsed.height;
    const weightKg = unit === 'imperial' ? parsed.weight * 0.45359237 : parsed.weight;
    const waistCm = unit === 'imperial' ? parsed.waist * 2.54 : parsed.waist;
    const hipCm = unit === 'imperial' ? parsed.hip * 2.54 : parsed.hip;

    try {
      const result = await fetchGeminiJson<BodyTypeAdvice>(
        geminiPrompt(
          calc.type,
          Math.round(heightCm),
          Math.round(weightKg),
          calc.bmi,
          Math.round(waistCm),
          Math.round(hipCm),
          activityLevel
        )
      );
      setAdvice(result);
    } catch (err) {
      if (err instanceof GeminiNetworkError) {
        setAiUnavailable(true);
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fallbackProfile = result ? BODY_TYPE_PROFILES.find((p) => p.type === result.type) : null;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form onSubmit={onSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Your measurements</h2>
          <div className="inline-flex rounded-lg border border-gray-200 p-0.5 text-sm">
            {(['metric', 'imperial'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                aria-pressed={unit === u}
                className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                  unit === u ? 'bg-ink-900 text-white' : 'text-gray-500 hover:text-gray-900'
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
                <label htmlFor={`bt-${f.key}`} className="block text-sm font-medium text-gray-700">
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
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
                <p id={`bt-${f.key}-help`} className="mt-1 text-xs text-gray-400">
                  Enter your {f.label.toLowerCase()} in {u}
                </p>
              </div>
            );
          })}

          <div>
            <label htmlFor="bt-gender" className="block text-sm font-medium text-gray-700">
              Gender (for frame size){' '}
              <span className="text-gray-400">(optional)</span>
            </label>
            <select
              id="bt-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="bt-activity" className="block text-sm font-medium text-gray-700">
              Activity level
            </label>
            <select
              id="bt-activity"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
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
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Calculate My Body Type
        </button>

        <p className="mt-4 text-xs text-gray-400">
          Body type is an estimate based on your measurements. Consult a fitness
          professional for a precise assessment.
        </p>
      </form>

      {result && (
        <div role="alert" aria-live="polite" className="mt-8 space-y-6">
          {aiUnavailable && (
            <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Could not connect to AI. Showing basic results only.
            </div>
          )}

          <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:justify-center">
            <BMIGauge bmi={advice?.bmi ?? result.bmi} />
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500">
                BMI Category: <strong className="text-gray-900">{advice?.bmiCategory ?? bmiCategory(result.bmi)}</strong>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Frame size: <strong className="text-gray-900 capitalize">{result.frameSize}</strong>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Shoulder/Hip ratio: <strong className="text-gray-900">{result.shoulderHipRatio}</strong>
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
                      : 'border-gray-200 bg-white text-gray-900'
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
                  <p className={`mt-2 text-sm leading-relaxed ${isMatch ? 'text-white/70' : 'text-gray-600'}`}>
                    {isMatch && advice ? advice.description : profile.description}
                  </p>
                </div>
              );
            })}
          </div>

          {fallbackProfile && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              {advice?.fitnessGoal && (
                <p className="mb-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">
                  <Apple className="mr-1.5 inline h-4 w-4" aria-hidden="true" />
                  {advice.fitnessGoal}
                </p>
              )}

              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Body type advice categories">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === tab ? 'bg-ink-900 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-5">
                {activeTab === 'Fitness' && (
                  <div className="space-y-4">
                    <Section icon={<Dumbbell className="h-3.5 w-3.5" />} title="Workout Plan" items={advice?.workoutPlan ?? fallbackProfile.fitness} />
                    {advice?.workoutsToAvoid && advice.workoutsToAvoid.length > 0 && (
                      <Section icon={<AlertTriangle className="h-3.5 w-3.5" />} title="Avoid" items={advice.workoutsToAvoid} tone="avoid" />
                    )}
                  </div>
                )}
                {activeTab === 'Diet' && (
                  <div className="space-y-5">
                    <Section icon={<Salad className="h-3.5 w-3.5" />} title="Diet Tips" items={advice?.dietTips ?? fallbackProfile.diet} />
                    {advice?.macroSplit && <MacroDonut macroSplit={advice.macroSplit} />}
                  </div>
                )}
                {activeTab === 'Style' && (
                  <Section icon={<Shirt className="h-3.5 w-3.5" />} title="Style Tips" items={advice?.styleTips ?? fallbackProfile.style} />
                )}
                {activeTab === 'Weekly Plan' && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: 'Cardio', value: advice?.weeklyPlan?.cardio ?? 'N/A' },
                      { label: 'Strength', value: advice?.weeklyPlan?.strength ?? 'N/A' },
                      { label: 'Rest', value: advice?.weeklyPlan?.rest ?? 'N/A' },
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
                {(advice?.celebrities ?? fallbackProfile.famous).join(' · ')}
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
