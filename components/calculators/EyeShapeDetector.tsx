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
import { EYE_SHAPE_GUIDE } from '@/lib/eyeShapes';
import { LoadingSteps } from '@/components/ui/LoadingSteps';
import { MediaPipeCanvas, type NormalizedPoint } from '@/components/ui/MediaPipeCanvas';
import { GeminiResultCard } from '@/components/ui/GeminiResultCard';
import { DownloadPdfButton } from '@/components/ui/DownloadPdfButton';
import { toastUploadGuide } from '@/lib/toast';

const MAX_SIZE = 5 * 1024 * 1024;
const MIN_SIZE = 10 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const STEPS = ['Loading AI models...', 'Analyzing your eyes...'];

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

const EYE_EXTRA_ADVICE: Record<string, {
  eyelinerStyles: string[];
  eyeshadowTechniques: string[];
  famousExamples: string[];
  colorRecommendations: string[];
  avoidThese: string[];
}> = {
  Almond: {
    eyelinerStyles: ['Classic winged liner', 'Tightlining the upper lash', 'Smudged kohl on the lower lash'],
    eyeshadowTechniques: ['Cut crease for definition', 'Halo eye with a shimmery center', 'Gradient blend from lash line upward'],
    famousExamples: ['Mila Kunis', 'Penelope Cruz'],
    colorRecommendations: ['Warm terracotta', 'Deep plum', 'Bronze shimmer'],
    avoidThese: ['Heavy liner closing the eye all the way around', 'Thick lower lash line that shrinks the eye'],
  },
  Round: {
    eyelinerStyles: ['Elongating wing extending past the outer corner', 'Lower liner on the outer third only', 'Thin upper lash line'],
    eyeshadowTechniques: ['Outer V in a deeper shade', 'Horizontal gradient blended outward', 'Inner corner highlight'],
    famousExamples: ['Katy Perry', 'Zooey Deschanel'],
    colorRecommendations: ['Taupe and warm brown', 'Forest green', 'Warm rust'],
    avoidThese: ['All-around tight liner', 'Pale shimmer across the entire lid'],
  },
  Monolid: {
    eyelinerStyles: ['Thicker upper lash wing', 'Double-wing liner', 'Graphic liner'],
    eyeshadowTechniques: ['Gradient from dark at the lash line to lighter shades above', 'Bold cut crease drawn higher', 'Tight tightlining of the upper lash'],
    famousExamples: ['Lucy Liu', 'Sandara Park'],
    colorRecommendations: ['Deep navy', 'Rich forest green', 'Matte burgundy'],
    avoidThese: ['Crease-focused blending that disappears on the lid', 'Frosty shimmer all over'],
  },
  Hooded: {
    eyelinerStyles: ['Flick upward at the outer corner', 'Thin liner applied with eyes open', 'Invisible liner at the lash base'],
    eyeshadowTechniques: ['Apply shadow with eyes open so the placement stays visible', 'Focus color above the crease line', 'Matte transition shades that blend cleanly'],
    famousExamples: ['Blake Lively', 'Jennifer Lawrence'],
    colorRecommendations: ['Matte browns and taupes', 'Burnt orange', 'Slate grey'],
    avoidThese: ['Shimmer-heavy lids that settle into the crease', 'Heavy lower lash liner'],
  },
  Upturned: {
    eyelinerStyles: ['Classic cat-eye wing following the natural angle', 'Feline flick', 'Lower liner on the outer half only'],
    eyeshadowTechniques: ['Classic smoky eye', 'Drama concentrated at the outer V', 'Halo technique centered on the lid'],
    famousExamples: ['Kendall Jenner', 'Bella Hadid'],
    colorRecommendations: ['Smoky charcoal', 'Warm bronze', 'Burnt sienna'],
    avoidThese: ['Heavy downward-pointing liner that fights the natural lift', 'Lower lid liner that drags the corner down'],
  },
  Downturned: {
    eyelinerStyles: ['Upward flick at the outer corner', 'Liner along the upper lash only', 'Avoid lower outer lash liner'],
    eyeshadowTechniques: ['Concentrate color mid-lid to outer corner angled upward', 'Bright inner corner highlight', 'Avoid shadow drooping at corners'],
    famousExamples: ['Anne Hathaway', 'Camilla Belle'],
    colorRecommendations: ['Warm peach', 'Copper shimmer', 'Champagne highlight'],
    avoidThese: ['Lower lash liner at outer corners', 'Downward-dragging smoky effects'],
  },
  'Wide-set': {
    eyelinerStyles: ['Tightline the inner corner', 'Define inner corner with a dark pencil', 'Bring liner closer to the inner edge'],
    eyeshadowTechniques: ['Darker shade toward the inner corner', 'Inner corner definition', 'Keep outer corner relatively light'],
    famousExamples: ['Solange Knowles', 'Dakota Fanning'],
    colorRecommendations: ['Deep eggplant at the inner corner', 'Soft rose', 'Taupe transition shade'],
    avoidThese: ['Outer corner focus only', 'Pale or bright inner corners that push eyes further apart'],
  },
  'Close-set': {
    eyelinerStyles: ['Wing starting from center extending outward', 'Light and bright inner corner', 'Extend liner past the outer corner'],
    eyeshadowTechniques: ['Focus darker shades outward', 'Shimmer or highlight on the inner corner', 'Blend outward and upward'],
    famousExamples: ['Meryl Streep', 'Jennifer Aniston'],
    colorRecommendations: ['Warm gold for the inner corner', 'Deep plum at the outer corner', 'Neutral mid-lid'],
    avoidThese: ['Starting liner at the inner corner', 'Heavy inner corner definition'],
  },
};

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

function buildEyeShapeResult(shape: string): EyeShapeResult {
  const guide = EYE_SHAPE_GUIDE.find((e) => e.name === shape);
  const extra = EYE_EXTRA_ADVICE[shape] ?? EYE_EXTRA_ADVICE['Almond'];
  return {
    eyeShape: shape,
    description: guide?.description ?? `Your eyes have been identified as ${shape} based on landmark analysis.`,
    makeupTips: guide?.tips ?? [],
    ...extra,
  };
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
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [previewUrl]);

  const handleFile = useCallback((f: File) => {
    setError(null);
    if (!ACCEPTED.includes(f.type)) {
      setStatus('error');
      setError('Please upload a JPG, PNG, or WebP image.');
      toastUploadGuide('eye', 'Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (f.size > MAX_SIZE) {
      setStatus('error');
      setError('Image is too large. Maximum size is 5MB.');
      toastUploadGuide('eye', 'Image is too large (max 5MB).');
      return;
    }
    if (f.size < MIN_SIZE) {
      setStatus('error');
      setError('Image is too small or corrupted. Please try another photo.');
      toastUploadGuide('eye', 'Image is too small or corrupted.');
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

    try {
      setLoadingStep(0);
      const [{ getFaceLandmarker, loadImage, landmarkDistance }] =
        await Promise.all([import('@/lib/mediapipe')]);
      const faceLandmarker = await getFaceLandmarker();
      const img = await loadImage(file);

      setLoadingStep(1);
      const detection = faceLandmarker.detect(img);
      const landmarks = detection.faceLandmarks?.[0];
      if (!landmarks || landmarks.length === 0) {
        setStatus('error');
        setError(
          'No face or eyes detected. Upload a clear close-up of your face or eyes facing the camera — avoid sunglasses, dark photos, and extreme angles.'
        );
        toastUploadGuide('eye');
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

      setResult(buildEyeShapeResult(shape));
      setStatus('done');
    } catch (err) {
      setStatus('error');
      const message = err instanceof Error ? err.message : 'Something went wrong. Try again.';
      setError(message);
      toastUploadGuide('eye', message);
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

              <div className="flex justify-center sm:justify-end">
                <DownloadPdfButton
                  title={`Eye Shape Report: ${eyeShape}`}
                  subtitle={result.description}
                  filename={`eye-shape-${eyeShape}`}
                  sections={[
                    { title: 'Makeup Tips', lines: result.makeupTips },
                    { title: 'Eyeliner Styles', lines: result.eyelinerStyles },
                    { title: 'Eyeshadow Techniques', lines: result.eyeshadowTechniques },
                    { title: 'Color Recommendations', lines: result.colorRecommendations },
                    { title: 'What to Avoid', lines: result.avoidThese },
                    { title: 'Famous Examples', lines: result.famousExamples },
                  ]}
                />
              </div>
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
