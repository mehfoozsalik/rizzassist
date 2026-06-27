'use client';

import { useCallback, useRef, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Eye,
  Palette,
  PenLine,
  RotateCcw,
  Sparkles,
  Users,
  X,
  XCircle,
} from 'lucide-react';
import type { EyeRatios, EyeShapeResult } from '@/lib/types';
import { fetchGeminiJson, GeminiNetworkError } from '@/lib/geminiClient';
import { LoadingSteps } from '@/components/ui/LoadingSteps';
import { MediaPipeCanvas, type NormalizedPoint } from '@/components/ui/MediaPipeCanvas';
import { GeminiResultCard } from '@/components/ui/GeminiResultCard';

const MAX_SIZE = 5 * 1024 * 1024;
const MIN_SIZE = 10 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const STEPS = ['Loading AI models…', 'Analyzing photo…', 'Getting advice from Gemini…'];

const TABS = ['Makeup Tips', 'Eyeliner', 'Eyeshadow', 'Colors'] as const;
type Tab = (typeof TABS)[number];

type Status = 'idle' | 'preview' | 'loading' | 'done' | 'error';

const EYE_LANDMARKS = {
  leftOuter: 33,
  leftInner: 133,
  leftTopLid: 159,
  leftBottomLid: 145,
  leftTopCrease: 158,
  leftBottomCrease: 153,
  rightOuter: 362,
  rightInner: 263,
  rightTopLid: 386,
  rightBottomLid: 374,
  rightTopCrease: 385,
  rightBottomCrease: 380,
  faceLeftEdge: 234,
  faceRightEdge: 454,
};

function dist(a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function detectEyeShape(ratios: EyeRatios): string {
  const { widthHeightRatio, creaseDepth, cornerTilt, eyeSpacing } = ratios;
  if (creaseDepth < 0.15) return 'Monolid';
  if (creaseDepth < 0.25) return 'Hooded';
  if (cornerTilt < -0.015) return 'Upturned';
  if (cornerTilt > 0.015) return 'Downturned';
  if (widthHeightRatio > 3.2) return 'Almond';
  if (widthHeightRatio < 2.5) return 'Round';
  if (eyeSpacing > 0.5) return 'Wide-set';
  if (eyeSpacing < 0.38) return 'Close-set';
  return 'Almond';
}

export function EyeShapeDetector() {
  const [status, setStatus] = useState<Status>('idle');
  const [loadingStep, setLoadingStep] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [eyeShape, setEyeShape] = useState<string | null>(null);
  const [points, setPoints] = useState<NormalizedPoint[]>([]);
  const [result, setResult] = useState<EyeShapeResult | null>(null);
  const [lowConfidence, setLowConfidence] = useState(false);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('Makeup Tips');
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setStatus('idle');
    setLoadingStep(0);
    setPreviewUrl(null);
    setFile(null);
    setEyeShape(null);
    setPoints([]);
    setResult(null);
    setLowConfidence(false);
    setAiUnavailable(false);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [previewUrl]);

  const handleFile = useCallback((f: File) => {
    setError(null);
    if (!ACCEPTED.includes(f.type)) {
      setStatus('error');
      setError('Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (f.size > MAX_SIZE) {
      setStatus('error');
      setError('Image is too large. Maximum size is 5MB.');
      return;
    }
    if (f.size < MIN_SIZE) {
      setStatus('error');
      setError('Image is too small or corrupted. Please try another photo.');
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setStatus('preview');
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

  const analyze = async () => {
    if (!file) return;
    setStatus('loading');
    setError(null);
    setAiUnavailable(false);

    try {
      setLoadingStep(0);
      const [{ getFaceLandmarker, loadImage, imageElementToBase64, landmarkDistance }] =
        await Promise.all([import('@/lib/mediapipe')]);
      const faceLandmarker = await getFaceLandmarker();
      const img = await loadImage(file);

      setLoadingStep(1);
      const detection = faceLandmarker.detect(img);
      const landmarks = detection.faceLandmarks?.[0];
      if (!landmarks || landmarks.length === 0) {
        setStatus('error');
        setError('No face detected. Please upload a clear, well-lit photo facing the camera.');
        return;
      }
      setLowConfidence(landmarks.length < 400);

      const L = EYE_LANDMARKS;
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      const leftWidth = landmarkDistance(landmarks[L.leftOuter], landmarks[L.leftInner], w, h);
      const rightWidth = landmarkDistance(landmarks[L.rightOuter], landmarks[L.rightInner], w, h);
      const leftHeight = landmarkDistance(landmarks[L.leftTopLid], landmarks[L.leftBottomLid], w, h);
      const rightHeight = landmarkDistance(landmarks[L.rightTopLid], landmarks[L.rightBottomLid], w, h);
      const leftCrease = landmarkDistance(landmarks[L.leftTopLid], landmarks[L.leftTopCrease], w, h);
      const rightCrease = landmarkDistance(landmarks[L.rightTopLid], landmarks[L.rightTopCrease], w, h);
      const faceWidth = landmarkDistance(landmarks[L.faceLeftEdge], landmarks[L.faceRightEdge], w, h);
      const eyeSpacingPx = landmarkDistance(landmarks[L.leftInner], landmarks[L.rightInner], w, h);

      const eyeWidth = (leftWidth + rightWidth) / 2;
      const eyeHeight = (leftHeight + rightHeight) / 2;
      const ratios: EyeRatios = {
        widthHeightRatio: eyeHeight > 0 ? eyeWidth / eyeHeight : 0,
        creaseDepth: eyeHeight > 0 ? (leftCrease + rightCrease) / 2 / eyeHeight : 0,
        cornerTilt:
          (landmarks[L.leftOuter].y - landmarks[L.leftInner].y +
            (landmarks[L.rightOuter].y - landmarks[L.rightInner].y)) /
          2,
        eyeSpacing: faceWidth > 0 ? eyeSpacingPx / faceWidth : 0,
      };

      const shape = detectEyeShape(ratios);
      setEyeShape(shape);
      setPoints(
        Object.values(L)
          .filter((idx) => idx !== L.faceLeftEdge && idx !== L.faceRightEdge)
          .map((idx) => ({ x: landmarks[idx].x, y: landmarks[idx].y }))
      );

      setLoadingStep(2);
      const { base64 } = imageElementToBase64(img);
      const prompt = `You are a professional makeup artist. The user has ${shape} shaped eyes. Analyze their eye photo and give personalized advice. Respond ONLY in this exact JSON format with no extra text or markdown:
{
  "eyeShape": "${shape}",
  "description": "What makes their eyes this shape in 2 sentences",
  "makeupTips": ["tip1", "tip2", "tip3", "tip4"],
  "eyelinerStyles": ["style1", "style2", "style3"],
  "eyeshadowTechniques": ["technique1", "technique2", "technique3"],
  "famousExamples": ["celebrity1", "celebrity2"],
  "colorRecommendations": ["color1", "color2", "color3"],
  "avoidThese": ["avoid1", "avoid2"]
}`;

      try {
        const advice = await fetchGeminiJson<EyeShapeResult>(prompt, {
          imageBase64: base64,
          mimeType: 'image/jpeg',
        });
        setResult(advice);
      } catch (err) {
        if (err instanceof GeminiNetworkError) {
          setAiUnavailable(true);
          setResult({
            eyeShape: shape,
            description: `Your eyes were detected as ${shape} based on landmark analysis.`,
            makeupTips: [],
            eyelinerStyles: [],
            eyeshadowTechniques: [],
            famousExamples: [],
            colorRecommendations: [],
            avoidThese: [],
          });
        } else {
          throw err;
        }
      }

      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {status === 'idle' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
            dragging
              ? 'border-brand-500 bg-brand-50/60 shadow-inner dark:bg-brand-600/10'
              : 'border-gray-200 bg-white hover:border-brand-400 hover:bg-brand-50/30 dark:border-white/10 dark:bg-ink-800 dark:hover:border-brand-500'
          }`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-900 shadow-lg dark:bg-ink-700">
            <Eye className="h-7 w-7 text-brand-400" aria-hidden="true" />
          </div>
          <p className="mt-5 text-base font-semibold text-gray-900 dark:text-white">
            Upload a close-up of your eyes
          </p>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-white/50">
            A clear, well-lit close-up or face photo works best &middot; JPG, PNG or WebP &middot; up to 5MB
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-6 rounded-xl bg-ink-900 px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ink-800 dark:bg-ink-700 dark:hover:bg-ink-600"
            aria-label="Choose a photo to upload"
          >
            Choose Photo
          </button>
          <p className="mt-3 text-xs text-gray-400 dark:text-white/30">or drag &amp; drop</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onInputChange}
            className="sr-only"
            aria-label="Upload photo of your eyes"
          />
        </div>
      )}

      {status === 'preview' && previewUrl && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-white/5 dark:bg-ink-800">
          <figure className="relative mx-auto w-full max-w-sm p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 dark:bg-ink-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Your uploaded photo for eye shape analysis" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={reset}
                className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                aria-label="Remove photo"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <figcaption className="mt-2 text-center text-xs text-gray-400 dark:text-white/30">
              Preview: your photo stays on your device until you analyze.
            </figcaption>
          </figure>
          <div className="border-t border-gray-100 px-5 py-4 dark:border-white/5">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={analyze}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-ink-800 dark:bg-ink-700 dark:hover:bg-ink-600"
              >
                Detect My Eye Shape
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className="py-4">
          <LoadingSteps steps={STEPS} currentStep={loadingStep} />
        </div>
      )}

      {error && (
        <div role="alert" className="mt-4 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <p>{error}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 font-semibold text-red-800 underline hover:no-underline"
            >
              Try another photo
            </button>
          </div>
        </div>
      )}

      <div role="region" aria-live="polite" aria-label="Eye shape analysis result" className="mt-8">
        {status === 'done' && result && eyeShape && previewUrl && (
          <>
            <div role="alert" className="space-y-5">
              {lowConfidence && (
                <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Landmark confidence was low. For best accuracy, use a brighter, more direct photo.
                </div>
              )}
              {aiUnavailable && (
                <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Could not connect to AI. Showing basic results only.
                </div>
              )}

              <div className="overflow-hidden rounded-3xl bg-ink-900 p-6 shadow-xl sm:p-8">
                <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                  <figure className="w-40 shrink-0">
                    <MediaPipeCanvas
                      imageUrl={previewUrl}
                      points={points}
                      alt="Detected eye landmarks"
                    />
                  </figure>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                      Your Eye Shape
                    </p>
                    <h3 className="mt-1.5 text-2xl font-extrabold text-white sm:text-3xl">
                      {eyeShape}
                    </h3>
                    <p className="mt-2.5 max-w-md text-sm leading-relaxed text-white/65">
                      {result.description}
                    </p>
                  </div>
                </div>
              </div>

              {(result.makeupTips.length > 0 ||
                result.eyelinerStyles.length > 0 ||
                result.eyeshadowTechniques.length > 0 ||
                result.colorRecommendations.length > 0) && (
                <div>
                  <div className="flex flex-wrap gap-2" role="tablist" aria-label="Eye shape advice categories">
                    {TABS.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                          activeTab === tab
                            ? 'bg-ink-900 text-white'
                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    {activeTab === 'Makeup Tips' && (
                      <GeminiResultCard title="Makeup Tips" icon={<Sparkles className="h-4 w-4" />} items={result.makeupTips} />
                    )}
                    {activeTab === 'Eyeliner' && (
                      <GeminiResultCard title="Eyeliner Styles" icon={<PenLine className="h-4 w-4" />} items={result.eyelinerStyles} />
                    )}
                    {activeTab === 'Eyeshadow' && (
                      <GeminiResultCard title="Eyeshadow Techniques" icon={<Eye className="h-4 w-4" />} items={result.eyeshadowTechniques} />
                    )}
                    {activeTab === 'Colors' && (
                      <GeminiResultCard title="Color Recommendations" icon={<Palette className="h-4 w-4" />} items={result.colorRecommendations} />
                    )}
                  </div>
                </div>
              )}

              {result.avoidThese.length > 0 && (
                <GeminiResultCard title="What to Avoid" icon={<XCircle className="h-4 w-4" />} items={result.avoidThese} tone="avoid" />
              )}

              {result.famousExamples.length > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm dark:border-white/5 dark:bg-ink-800">
                  <h4 className="flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                    <Users className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                    Famous people with this eye shape
                  </h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-white/60">{result.famousExamples.join(' · ')}</p>
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Try Another Photo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
