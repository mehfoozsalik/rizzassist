'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { AlertCircle, Camera, ImagePlus, Loader2, RotateCcw, X } from 'lucide-react';
import type { AnalysisResult } from '@/lib/types';
import { AnalysisCard } from './AnalysisCard';
import { getFaceLandmarker, getPoseLandmarker, landmarkDistance } from '@/lib/mediapipe';
import { toastUploadGuide } from '@/lib/toast';
import { CameraCapture } from '@/components/ui/CameraCapture';

const MAX_SIZE = 5 * 1024 * 1024;
const MIN_SIZE = 10 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

type Status = 'idle' | 'preview' | 'loading' | 'done' | 'error';

interface FaceData {
  detected: boolean;
  faceShape: string;
  faceLengthRatio: number;
  jawToCheekRatio: number;
  foreheadToJawRatio: number;
  symmetryScore: number;
  eyeShape: string;
  eyeAspectRatio: number;
  cornerTilt: string;
}

interface BodyData {
  detected: boolean;
  shoulderHipRatio: number;
  bodyTendency: string;
}

function loadImgFromDataUrl(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const el = new window.Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('Could not load image for analysis.'));
    el.src = src;
  });
}

function extractFaceData(
  landmarks: Array<{ x: number; y: number; z: number }>,
  w: number,
  h: number
): FaceData {
  const lm = landmarks;

  const faceHeight = landmarkDistance(lm[10], lm[152], w, h);
  const cheekboneWidth = landmarkDistance(lm[234], lm[454], w, h);
  const jawWidth = landmarkDistance(lm[172], lm[397], w, h);
  const foreheadWidth = landmarkDistance(lm[54], lm[284], w, h);

  const faceLengthRatio = faceHeight / cheekboneWidth;
  const jawToCheekRatio = jawWidth / cheekboneWidth;
  const foreheadToJawRatio = foreheadWidth / jawWidth;

  let faceShape = 'Oval';
  if (faceLengthRatio > 1.55) faceShape = 'Oblong';
  else if (faceLengthRatio < 1.1) faceShape = 'Round';
  else if (foreheadToJawRatio > 1.25 && jawToCheekRatio < 0.82) faceShape = 'Heart';
  else if (foreheadWidth < cheekboneWidth * 0.85 && jawWidth < cheekboneWidth * 0.85) faceShape = 'Diamond';
  else if (jawToCheekRatio > 0.88 && faceLengthRatio < 1.35) faceShape = 'Square';

  // Eye measurements (viewer perspective: lm[33] = viewer's left outer = person's right eye outer)
  const leftEyeWidth = landmarkDistance(lm[33], lm[133], w, h);
  const leftEyeHeight = landmarkDistance(lm[159], lm[145], w, h);
  const rightEyeWidth = landmarkDistance(lm[362], lm[263], w, h);
  const rightEyeHeight = landmarkDistance(lm[386], lm[374], w, h);

  const eyeAspectRatio = (leftEyeHeight / leftEyeWidth + rightEyeHeight / rightEyeWidth) / 2;

  // In normalized y-down coordinates: outer.y < inner.y means outer is higher = upturned (negative)
  const avgTilt = ((lm[33].y - lm[133].y) + (lm[362].y - lm[263].y)) / 2;
  const cornerTilt = avgTilt < -0.02 ? 'upturned' : avgTilt > 0.02 ? 'downturned' : 'neutral';

  const widthDiff = Math.abs(leftEyeWidth - rightEyeWidth) / Math.max(leftEyeWidth, rightEyeWidth);
  const symmetryScore = Math.max(0, 1 - widthDiff);

  let eyeShape = 'Almond';
  if (eyeAspectRatio < 0.22) eyeShape = 'Monolid';
  else if (eyeAspectRatio < 0.28 && cornerTilt === 'neutral') eyeShape = 'Hooded';
  else if (eyeAspectRatio > 0.40) eyeShape = 'Round';
  else if (cornerTilt === 'upturned') eyeShape = 'Upturned';
  else if (cornerTilt === 'downturned') eyeShape = 'Downturned';

  return {
    detected: true,
    faceShape,
    faceLengthRatio,
    jawToCheekRatio,
    foreheadToJawRatio,
    symmetryScore,
    eyeShape,
    eyeAspectRatio,
    cornerTilt,
  };
}

function extractBodyData(
  landmarks: Array<{ x: number; y: number; z: number }>,
  w: number,
  h: number
): BodyData {
  const shoulderWidth = landmarkDistance(landmarks[11], landmarks[12], w, h);
  const hipWidth = landmarkDistance(landmarks[23], landmarks[24], w, h);
  const shoulderHipRatio = shoulderWidth / hipWidth;

  let bodyTendency = 'Balanced / Rectangle (Mesomorph)';
  if (shoulderHipRatio > 1.25) bodyTendency = 'Athletic / Inverted Triangle (V-taper)';
  else if (shoulderHipRatio < 0.85) bodyTendency = 'Pear / Endomorph tendency (wider hips)';

  return { detected: true, shoulderHipRatio, bodyTendency };
}

export function ImageUploader() {
  const [status, setStatus] = useState<Status>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setStatus('idle');
    setPreviewUrl(null);
    setDataUrl(null);
    setResult(null);
    setError(null);
    setLoadingStep('');
    if (inputRef.current) inputRef.current.value = '';
  }, [previewUrl]);

  const handleFile = useCallback((file: File) => {
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setStatus('error');
      setError('Please upload a JPG, PNG, or WebP image.');
      toastUploadGuide('face', 'Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_SIZE) {
      setStatus('error');
      setError('Image is too large. Maximum size is 5MB.');
      toastUploadGuide('face', 'Image is too large (max 5MB).');
      return;
    }
    if (file.size < MIN_SIZE) {
      setStatus('error');
      setError('Image is too small or corrupted. Please try another photo.');
      toastUploadGuide('face', 'Image is too small or corrupted.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    const reader = new FileReader();
    reader.onload = () => {
      setDataUrl(reader.result as string);
      setStatus('preview');
    };
    reader.onerror = () => {
      setStatus('error');
      setError('Could not read the image file. Please try again.');
    };
    reader.readAsDataURL(file);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const analyze = async () => {
    if (!dataUrl) return;
    setStatus('loading');
    setError(null);

    try {
      const img = await loadImgFromDataUrl(dataUrl);
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      setLoadingStep('Loading AI models...');
      const [faceLandmarker, poseLandmarker] = await Promise.all([
        getFaceLandmarker(),
        getPoseLandmarker(),
      ]);

      setLoadingStep('Analyzing your face and body...');
      const faceResults = faceLandmarker.detect(img);
      const poseResults = poseLandmarker.detect(img);

      const hasFace = !!(faceResults.faceLandmarks && faceResults.faceLandmarks.length > 0);
      const hasBody = !!(poseResults.landmarks && poseResults.landmarks.length > 0);

      if (!hasFace) {
        const message =
          'No face detected. Upload a clear, well-lit photo of your face looking at the camera — avoid sunglasses, blur, group shots, or cropped images.';
        toastUploadGuide('face');
        setStatus('error');
        setError(message);
        return;
      }

      const faceData: FaceData = extractFaceData(faceResults.faceLandmarks![0], w, h);

      const bodyData: BodyData = hasBody
        ? extractBodyData(poseResults.landmarks![0], w, h)
        : { detected: false, shoulderHipRatio: 0, bodyTendency: 'Unknown' };

      setLoadingStep('Generating your Rizz Report...');

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faceData, bodyData }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json?.code === 'NO_FACE') toastUploadGuide('face');
        throw new Error(json?.error || 'Analysis failed. Please try again.');
      }
      setResult(json.feedback as AnalysisResult);
      setStatus('done');
    } catch (err) {
      setStatus('error');
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Try again.';
      setError(message);
      if (/face|photo|upload/i.test(message)) toastUploadGuide('face', message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {cameraOpen && (
        <CameraCapture
          onCapture={(f) => {
            setCameraOpen(false);
            handleFile(f);
          }}
          onClose={() => setCameraOpen(false)}
        />
      )}
      {status === 'idle' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
            dragging
              ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-600/10'
              : 'border-gray-200 bg-white hover:border-brand-400 hover:bg-brand-50/30 dark:border-white/10 dark:bg-ink-800 dark:hover:border-brand-500 dark:hover:bg-ink-700/50'
          }`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-900 shadow-lg dark:bg-ink-700">
            <ImagePlus className="h-7 w-7 text-brand-400" aria-hidden="true" />
          </div>

          <p className="mt-5 text-base font-semibold text-gray-900 dark:text-white">
            Drop your photo here
          </p>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-white/50">
            Clear face photo looking at the camera &middot; JPG, PNG or WebP &middot; up to 5MB
          </p>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-6 rounded-xl bg-ink-900 px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ink-800 dark:bg-ink-700 dark:hover:bg-ink-600"
            aria-label="Choose a photo to upload"
          >
            Choose Photo
          </button>
          <button
            type="button"
            onClick={() => setCameraOpen(true)}
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5"
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
            Use camera
          </button>

          <p className="mt-3 text-xs text-gray-400 dark:text-white/30">
            or drag &amp; drop
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onInputChange}
            className="sr-only"
            aria-label="Upload photo"
          />
        </div>
      )}

      {(status === 'preview' || status === 'loading') && previewUrl && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-white/5 dark:bg-ink-800">
          <figure className="relative mx-auto w-full max-w-sm p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 dark:bg-ink-700">
              <Image
                src={previewUrl}
                alt="Your uploaded photo preview for your Rizz Report"
                fill
                sizes="(max-width: 640px) 100vw, 384px"
                className="object-cover"
                unoptimized
              />
              {status === 'preview' && (
                <button
                  type="button"
                  onClick={reset}
                  className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                  aria-label="Remove photo"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <figcaption className="mt-2 text-center text-xs text-gray-400 dark:text-white/30">
              Your photo stays on your device. Only derived measurements are sent for analysis.
            </figcaption>
          </figure>

          <div className="border-t border-gray-100 px-5 py-4 dark:border-white/5">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={analyze}
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-ink-700 dark:hover:bg-ink-600"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    {loadingStep || 'Analyzing...'}
                  </>
                ) : (
                  'Get My Rizz Report'
                )}
              </button>
              {status === 'preview' && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Start Over
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <p>{error}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 font-semibold text-red-800 underline hover:no-underline dark:text-red-300"
            >
              Try another photo
            </button>
          </div>
        </div>
      )}

      <div role="region" aria-live="polite" aria-label="Analysis feedback" className="mt-8">
        {status === 'done' && result && (
          <>
            <AnalysisCard content={result} imageUrl={previewUrl} />
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
