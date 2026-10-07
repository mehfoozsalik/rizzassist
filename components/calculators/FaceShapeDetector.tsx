'use client';

import { useCallback, useRef, useState } from 'react';
import {
  AlertCircle,
  Camera,
  Glasses,
  ImagePlus,
  Loader2,
  RotateCcw,
  Scissors,
  Sparkles,
  X,
} from 'lucide-react';
import Link from 'next/link';
import {
  detectFaceShapeFromLandmarks,
  getFaceShapeProfile,
  type FaceShape,
} from '@/lib/faceShape';
import { landmarkDistance } from '@/lib/mediapipe';
import { toastUploadGuide } from '@/lib/toast';
import { CameraCapture } from '@/components/ui/CameraCapture';
import { DownloadPdfButton } from '@/components/ui/DownloadPdfButton';
import { LoadingSteps } from '@/components/ui/LoadingSteps';

const MAX_SIZE = 5 * 1024 * 1024;
const MIN_SIZE = 10 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const STEPS = ['Loading AI models...', 'Mapping facial landmarks...', 'Matching grooming profile...'];

type Status = 'idle' | 'preview' | 'loading' | 'done' | 'error';

export function FaceShapeDetector() {
  const [status, setStatus] = useState<Status>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [shape, setShape] = useState<FaceShape | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setStatus('idle');
    setPreviewUrl(null);
    setFile(null);
    setShape(null);
    setError(null);
    setLoadingStep(0);
    if (inputRef.current) inputRef.current.value = '';
  }, [previewUrl]);

  const handleFile = useCallback((f: File) => {
    setError(null);
    if (!ACCEPTED.includes(f.type)) {
      setStatus('error');
      setError('Please upload a JPG, PNG, or WebP image.');
      toastUploadGuide('face', 'Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (f.size > MAX_SIZE) {
      setStatus('error');
      setError('Image is too large. Maximum size is 5MB.');
      toastUploadGuide('face', 'Image is too large (max 5MB).');
      return;
    }
    if (f.size < MIN_SIZE) {
      setStatus('error');
      setError('Image is too small or corrupted.');
      toastUploadGuide('face', 'Image is too small or corrupted.');
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setStatus('preview');
    setCameraOpen(false);
  }, [previewUrl]);

  const analyze = async () => {
    if (!file) return;
    setStatus('loading');
    setError(null);
    try {
      setLoadingStep(0);
      const { getFaceLandmarker, loadImage } = await import('@/lib/mediapipe');
      const faceLandmarker = await getFaceLandmarker();
      setLoadingStep(1);
      const img = await loadImage(file);
      const detection = faceLandmarker.detect(img);
      const landmarks = detection.faceLandmarks?.[0];
      if (!landmarks?.length) {
        const message =
          'No face detected. Upload a clear, front-facing photo with even light — hair off the forehead, no sunglasses.';
        setStatus('error');
        setError(message);
        toastUploadGuide('face');
        return;
      }
      setLoadingStep(2);
      const { shape: detected } = detectFaceShapeFromLandmarks(
        landmarks,
        img.naturalWidth,
        img.naturalHeight,
        landmarkDistance
      );
      setShape(detected);
      setStatus('done');
    } catch (err) {
      setStatus('error');
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setError(message);
      toastUploadGuide('face', message);
    }
  };

  const profile = shape ? getFaceShapeProfile(shape) : null;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {cameraOpen && (
        <CameraCapture
          onCapture={handleFile}
          onClose={() => setCameraOpen(false)}
        />
      )}

      {status === 'idle' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          className={`rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
            dragging
              ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-600/10'
              : 'border-gray-200 bg-white dark:border-white/10 dark:bg-ink-800'
          }`}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-900 dark:bg-ink-700">
            <ImagePlus className="h-7 w-7 text-brand-400" aria-hidden="true" />
          </div>
          <p className="mt-5 text-base font-semibold text-gray-900 dark:text-white">
            Find your face shape for better grooming
          </p>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-white/50">
            Clear front-facing selfie · JPG, PNG or WebP · private on-device AI
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-xl bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-ink-800 dark:bg-ink-700"
            >
              Upload photo
            </button>
            <button
              type="button"
              onClick={() => setCameraOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              Use camera
            </button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <p className="mt-4 text-xs text-gray-400 dark:text-white/30">
            Prefer measuring?{' '}
            <Link href="/face-shape-calculator" className="text-brand-600 underline">
              Manual calculator
            </Link>{' '}
            or{' '}
            <Link href="/face-shape-quiz" className="text-brand-600 underline">
              quick quiz
            </Link>
          </p>
        </div>
      )}

      {(status === 'preview' || status === 'loading') && previewUrl && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-white/5 dark:bg-ink-800">
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden bg-gray-100 dark:bg-ink-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Photo for face shape analysis" className="h-full w-full object-cover" />
            {status === 'preview' && (
              <button
                type="button"
                onClick={reset}
                className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white"
                aria-label="Remove photo"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="border-t border-gray-100 px-5 py-4 dark:border-white/5">
            {status === 'loading' ? (
              <LoadingSteps steps={STEPS} currentStep={loadingStep} />
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={analyze}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-7 py-3 font-semibold text-white dark:bg-ink-700"
                >
                  Detect face shape
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm dark:border-white/10"
                >
                  <RotateCcw className="h-4 w-4" /> Start over
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div role="alert" className="mt-4 flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p>{error}</p>
            <button type="button" onClick={reset} className="mt-2 font-semibold underline">
              Try another photo
            </button>
          </div>
        </div>
      )}

      {status === 'done' && shape && profile && (
        <div className="mt-8 space-y-5" role="region" aria-label="Face shape results">
          <div className="overflow-hidden rounded-3xl bg-ink-900 p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Your face shape
            </p>
            <h3 className="mt-2 text-3xl font-extrabold">{shape}</h3>
            <p className="mt-2 text-sm text-brand-300">{profile.tagline}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
              {profile.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.traits.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end">
            <DownloadPdfButton
              title={`Face Shape Grooming Report: ${shape}`}
              subtitle={profile.tagline}
              filename={`face-shape-${shape}`}
              sections={[
                { title: 'Hairstyles', lines: profile.hairstyles },
                { title: 'Glasses', lines: profile.glasses },
                { title: 'Grooming', lines: profile.grooming },
                { title: 'Personality presence', lines: profile.personalityPresence },
                { title: 'Avoid', lines: profile.avoid },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdviceCard title="Hairstyles" icon={<Scissors className="h-4 w-4" />} items={profile.hairstyles} />
            <AdviceCard title="Glasses" icon={<Glasses className="h-4 w-4" />} items={profile.glasses} />
            <AdviceCard title="Grooming" icon={<Sparkles className="h-4 w-4" />} items={profile.grooming} />
            <AdviceCard
              title="Personality presence"
              icon={<Sparkles className="h-4 w-4" />}
              items={profile.personalityPresence}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link
              href="/try-on/hairstyle"
              className="rounded-xl bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-500"
            >
              Try hairstyles on your photo
            </Link>
            <Link
              href="/try-on/glasses"
              className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white/80"
            >
              Try glasses frames
            </Link>
            <button type="button" onClick={reset} className="rounded-xl px-4 py-2 text-gray-500 underline">
              Analyze another photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdviceCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-ink-800">
      <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
        <span className="text-brand-600">{icon}</span>
        {title}
      </h4>
      <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-white/60">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
