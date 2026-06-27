'use client';

import { useCallback, useRef, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Camera,
  Check,
  Info,
  Keyboard,
  Loader2,
  Target,
  Users,
  X,
  XCircle,
} from 'lucide-react';
import type { BodyShape, BodyShapeAdvice } from '@/lib/types';
import { calculateBodyShape, getBodyShapeProfile } from '@/lib/bodyShape';
import { fetchGeminiJson, GeminiNetworkError } from '@/lib/geminiClient';
import { ShapeSilhouette } from './ShapeSilhouette';
import { LoadingSteps } from '@/components/ui/LoadingSteps';

const ALL_SHAPES: BodyShape[] = ['Hourglass', 'Pear', 'Apple', 'Rectangle', 'Inverted Triangle'];
const ASSUMED_SHOULDER_CM = 40;
const PHOTO_STEPS = ['Loading AI models…', 'Analyzing photo…', 'Getting styling advice…'];

type Mode = 'manual' | 'photo';

function geminiPrompt(shape: BodyShape, bust: number, waist: number, hip: number) {
  return `You are a professional fashion stylist. The user has a ${shape} body shape with measurements: Bust ${bust}cm, Waist ${waist}cm, Hips ${hip}cm.
Respond ONLY in this exact JSON with no extra text:
{
  "bodyShape": "${shape}",
  "description": "What defines this body shape in 2 sentences",
  "keyFeature": "One sentence highlight of their best feature",
  "whatToWear": ["item1", "item2", "item3", "item4", "item5"],
  "whatToAvoid": ["item1", "item2", "item3"],
  "dressingGoal": "One sentence styling goal",
  "bestNecklines": ["neckline1", "neckline2", "neckline3"],
  "bestBottoms": ["bottom1", "bottom2", "bottom3"],
  "celebrities": ["celeb1", "celeb2", "celeb3"],
  "outfitIdeas": ["idea1", "idea2", "idea3"]
}`;
}

export function BodyShapeCalculator() {
  const [mode, setMode] = useState<Mode>('manual');

  // Manual mode
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [values, setValues] = useState<Record<string, string>>({});

  // Shared result state
  const [shape, setShape] = useState<BodyShape | null>(null);
  const [advice, setAdvice] = useState<BodyShapeAdvice | null>(null);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const [poseEstimated, setPoseEstimated] = useState(false);
  const [lowConfidence, setLowConfidence] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Photo mode
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const lengthUnit = unit === 'metric' ? 'cm' : 'in';

  const fetchAdvice = async (detectedShape: BodyShape, bust: number, waist: number, hip: number) => {
    try {
      const result = await fetchGeminiJson<BodyShapeAdvice>(
        geminiPrompt(detectedShape, Math.round(bust), Math.round(waist), Math.round(hip))
      );
      setAdvice(result);
      setAiUnavailable(false);
    } catch (err) {
      if (err instanceof GeminiNetworkError) {
        setAiUnavailable(true);
        setAdvice(null);
      } else {
        throw err;
      }
    }
  };

  const onManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const FIELDS = ['bust', 'waist', 'hip'] as const;
    const parsed: Record<string, number> = {};
    for (const key of FIELDS) {
      const n = Number(values[key]);
      if (!values[key] || Number.isNaN(n) || n <= 0) {
        setError(`Please enter a valid ${key} measurement.`);
        setShape(null);
        return;
      }
      parsed[key] = n;
    }
    setError(null);
    setPoseEstimated(false);
    setLowConfidence(false);
    const detected = calculateBodyShape({ bust: parsed.bust, waist: parsed.waist, hip: parsed.hip, unit });
    setShape(detected);
    setAdvice(null);
    setLoading(true);
    try {
      await fetchAdvice(detected, parsed.bust, parsed.waist, parsed.hip);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFile = useCallback((f: File) => {
    setError(null);
    const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
    if (!ACCEPTED.includes(f.type)) {
      setError('Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError('Image is too large. Maximum size is 5MB.');
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setShape(null);
    setAdvice(null);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const analyzePhoto = async () => {
    if (!file) return;
    setError(null);
    setLoading(true);
    setLoadingStep(0);
    try {
      const { getPoseLandmarker, loadImage, landmarkDistance } = await import('@/lib/mediapipe');
      const poseLandmarker = await getPoseLandmarker();
      const img = await loadImage(file);

      setLoadingStep(1);
      const detection = poseLandmarker.detect(img);
      const landmarks = detection.landmarks?.[0];
      if (!landmarks || landmarks.length === 0) {
        setError('Could not detect body. Please upload a full-body photo with good lighting.');
        setLoading(false);
        return;
      }
      setLowConfidence(landmarks.length < 33);

      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const shoulderWidthPx = landmarkDistance(landmarks[11], landmarks[12], w, h);
      const hipWidthPx = landmarkDistance(landmarks[23], landmarks[24], w, h);
      const waistWidthPx = 0.75 * Math.min(shoulderWidthPx, hipWidthPx);

      const scale = ASSUMED_SHOULDER_CM / shoulderWidthPx;
      const bustCm = shoulderWidthPx * scale;
      const waistCm = waistWidthPx * scale;
      const hipCm = hipWidthPx * scale;

      setPoseEstimated(true);
      const detected = calculateBodyShape({ bust: bustCm, waist: waistCm, hip: hipCm, unit: 'metric' });
      setShape(detected);

      setLoadingStep(2);
      await fetchAdvice(detected, bustCm, waistCm, hipCm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPhoto = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFile(null);
    setShape(null);
    setAdvice(null);
    setError(null);
    setPoseEstimated(false);
    setLowConfidence(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  const fallbackProfile = shape ? getBodyShapeProfile(shape) : null;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 inline-flex rounded-lg border border-gray-200 bg-white p-0.5 text-sm dark:border-white/10 dark:bg-ink-800">
        <button
          type="button"
          onClick={() => setMode('manual')}
          aria-pressed={mode === 'manual'}
          className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 font-medium transition-colors ${
            mode === 'manual' ? 'bg-ink-900 text-white dark:bg-ink-700' : 'text-gray-500 hover:text-gray-900 dark:text-white/50 dark:hover:text-white'
          }`}
        >
          <Keyboard className="h-4 w-4" aria-hidden="true" />
          Manual Input
        </button>
        <button
          type="button"
          onClick={() => setMode('photo')}
          aria-pressed={mode === 'photo'}
          className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 font-medium transition-colors ${
            mode === 'photo' ? 'bg-ink-900 text-white dark:bg-ink-700' : 'text-gray-500 hover:text-gray-900 dark:text-white/50 dark:hover:text-white'
          }`}
        >
          <Camera className="h-4 w-4" aria-hidden="true" />
          Photo Detection
        </button>
      </div>

      {mode === 'manual' && (
        <form onSubmit={onManualSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/5 dark:bg-ink-800">
          <div className="flex items-center justify-between gap-4">
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
                  {u === 'metric' ? 'cm' : 'in'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {(['bust', 'waist', 'hip'] as const).map((key) => (
              <div key={key}>
                <label htmlFor={`bs-${key}`} className="block text-sm font-medium capitalize text-gray-700 dark:text-white/70">
                  {key === 'bust' ? 'Bust / Chest' : key} ({lengthUnit})
                </label>
                <input
                  id={`bs-${key}`}
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  aria-describedby={`bs-${key}-help`}
                  value={values[key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-ink-700 dark:text-white dark:placeholder-white/30 dark:focus:ring-brand-600/20"
                />
                <p id={`bs-${key}-help`} className="mt-1 text-xs text-gray-400 dark:text-white/30">
                  Measure around the fullest part, in {lengthUnit}
                </p>
              </div>
            ))}
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
            Calculate My Body Shape
          </button>
        </form>
      )}

      {mode === 'photo' && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/5 dark:bg-ink-800">
          <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Waist is estimated from pose. For best accuracy, enter measurements manually.
          </div>

          {!previewUrl && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                dragging ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-600/10' : 'border-gray-200 hover:border-brand-400 dark:border-white/10 dark:hover:border-brand-500'
              }`}
            >
              <Camera className="h-8 w-8 text-gray-400 dark:text-white/30" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">Upload a full-body photo</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-white/50">Standing straight, facing the camera, good lighting</p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-4 rounded-xl bg-ink-900 px-6 py-2 text-sm font-semibold text-white hover:bg-ink-800"
              >
                Choose Photo
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={onInputChange}
                className="sr-only"
                aria-label="Upload full-body photo"
              />
            </div>
          )}

          {previewUrl && (
            <div className="mt-4">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Uploaded full-body photo" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={resetPhoto}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white"
                  aria-label="Remove photo"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={analyzePhoto}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-ink-800 disabled:opacity-60"
                >
                  Detect My Body Shape
                </button>
              </div>
            </div>
          )}

          {loading && mode === 'photo' && (
            <div className="mt-4">
              <LoadingSteps steps={PHOTO_STEPS} currentStep={loadingStep} />
            </div>
          )}

          {error && (
            <p role="alert" className="mt-4 flex items-center gap-2 text-sm font-medium text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4 sm:gap-6">
        {ALL_SHAPES.map((s) => (
          <div key={s} className="flex flex-col items-center gap-1.5">
            <ShapeSilhouette shape={s} active={s === shape} size={48} />
            <span className={`text-[11px] font-medium ${s === shape ? 'text-brand-600' : 'text-gray-400 dark:text-white/30'}`}>{s}</span>
          </div>
        ))}
      </div>

      {shape && fallbackProfile && (
        <div role="alert" aria-live="polite" className="mt-8 rounded-2xl border border-brand-300 bg-white p-6 shadow-sm sm:p-8 dark:border-brand-600/30 dark:bg-ink-800">
          {poseEstimated && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {lowConfidence
                ? 'Pose detection confidence was low, so measurements are a rough estimate.'
                : 'Measurements estimated from photo pose. Waist is approximated, not directly measured.'}
            </div>
          )}
          {aiUnavailable && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Could not connect to AI. Showing basic results only.
            </div>
          )}

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="shrink-0 rounded-2xl bg-ink-900 p-4">
              <ShapeSilhouette shape={shape} active size={72} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Your Body Shape</p>
              <h3 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">{shape}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/60">
                {advice?.description ?? fallbackProfile.unique}
              </p>
              {advice?.keyFeature && (
                <p className="mt-2 text-sm font-medium text-brand-700 dark:text-brand-400">{advice.keyFeature}</p>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-green-700">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                What to Wear
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-gray-600 dark:text-white/60">
                {(advice?.whatToWear ?? fallbackProfile.wear).map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-red-600">
                <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                What to Avoid
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-gray-600 dark:text-white/60">
                {(advice?.whatToAvoid ?? fallbackProfile.avoid).map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {advice && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-600">Best Necklines</h4>
                <p className="mt-2 text-sm text-gray-600">{advice.bestNecklines.join(' · ')}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-600">Best Bottoms</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-white/60">{advice.bestBottoms.join(' · ')}</p>
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600">
                <Target className="h-3.5 w-3.5" aria-hidden="true" />
                Styling Goal
              </h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
                {advice?.dressingGoal ?? fallbackProfile.goals.join(' ')}
              </p>
            </div>
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-white/40">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Celebrity Examples
              </h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
                {(advice?.celebrities ?? fallbackProfile.famous).join(' · ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
