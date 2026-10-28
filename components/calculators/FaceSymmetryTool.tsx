'use client';

import { useRef, useState } from 'react';
import { AlertCircle, ImagePlus, Loader2 } from 'lucide-react';
import { landmarkDistance } from '@/lib/mediapipe';
import { toastUploadGuide } from '@/lib/toast';

export function FaceSymmetryTool() {
  const [score, setScore] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const analyze = async (file: File) => {
    setBusy(true);
    setError(null);
    setScore(null);
    setPreview(URL.createObjectURL(file));
    try {
      const { getFaceLandmarker, loadImage } = await import('@/lib/mediapipe');
      const lm = await getFaceLandmarker();
      const img = await loadImage(file);
      const det = lm.detect(img);
      const points = det.faceLandmarks?.[0];
      if (!points?.length) {
        toastUploadGuide('face');
        setError('No face detected. Use a clear front-facing photo.');
        return;
      }
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const leftEye = landmarkDistance(points[33], points[133], w, h);
      const rightEye = landmarkDistance(points[362], points[263], w, h);
      const leftBrow = landmarkDistance(points[70], points[105], w, h);
      const rightBrow = landmarkDistance(points[300], points[334], w, h);
      const mouthL = landmarkDistance(points[61], points[291], w, h);
      const mid = points[1];
      const leftCheek = Math.abs(points[234].x - mid.x);
      const rightCheek = Math.abs(points[454].x - mid.x);
      const diffs = [
        Math.abs(leftEye - rightEye) / Math.max(leftEye, rightEye),
        Math.abs(leftBrow - rightBrow) / Math.max(leftBrow, rightBrow),
        Math.abs(leftCheek - rightCheek) / Math.max(leftCheek, rightCheek, 0.001),
        Math.abs(points[61].y - points[291].y),
      ];
      const asymmetry = diffs.reduce((a, b) => a + b, 0) / diffs.length;
      const balance = Math.max(0, Math.min(100, Math.round((1 - asymmetry * 2.2) * 100)));
      setScore(balance);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analysis failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-ink-800">
        <p className="text-sm text-gray-500 dark:text-white/50">
          This is a <strong>balance check for grooming</strong>, not an attractiveness
          score. Use it to notice lighting, brow tidy-up, or hair parting that
          improves how balanced you look in photos.
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          <ImagePlus className="h-4 w-4" /> Upload selfie
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void analyze(f);
          }}
        />
        {busy && (
          <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Measuring balance…
          </p>
        )}
        {error && (
          <p className="mt-4 flex gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" /> {error}
          </p>
        )}
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Symmetry analysis preview" className="mt-4 max-h-64 w-full rounded-xl object-cover" />
        )}
        {score !== null && (
          <div className="mt-5 rounded-xl bg-ink-900 p-5 text-center text-white">
            <p className="text-xs uppercase tracking-widest text-white/40">Balance score</p>
            <p className="mt-1 text-4xl font-extrabold text-brand-300">{score}</p>
            <p className="mt-3 text-sm text-white/65">
              {score >= 80
                ? 'Strong balance, keep grooming even (brows, sideburns, parting).'
                : score >= 60
                  ? 'Good balance. Soft lighting and even brows usually lift photo presence.'
                  : 'Try retaking with straight head posture and even light, then tidy brows/hair parting.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
