'use client';

import { useRef, useState } from 'react';
import { Download, Loader2, ImagePlus, RotateCcw } from 'lucide-react';
import {
  detectFaceShapeFromLandmarks,
  getFaceShapeProfile,
  type FaceShape,
} from '@/lib/faceShape';
import { landmarkDistance } from '@/lib/mediapipe';
import { toastUploadGuide, toastSuccess } from '@/lib/toast';

type Mode = 'hairstyle' | 'glasses';

const HAIR_STYLES = [
  { id: 'crop', label: 'Textured crop', color: '#2a2118' },
  { id: 'wave', label: 'Soft waves', color: '#3d2b1f' },
  { id: 'fringe', label: 'Curtain fringe', color: '#1f1814' },
  { id: 'fade', label: 'Clean fade top', color: '#2c241c' },
];

const GLASS_STYLES = [
  { id: 'wayfarer', label: 'Wayfarer', rx: 38, ry: 22 },
  { id: 'round', label: 'Round', rx: 28, ry: 28 },
  { id: 'aviator', label: 'Aviator', rx: 42, ry: 26 },
  { id: 'rect', label: 'Rectangular', rx: 40, ry: 18 },
];

export function StyleTryOn({ mode }: { mode: Mode }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [shape, setShape] = useState<FaceShape | null>(null);
  const [busy, setBusy] = useState(false);
  const [styleId, setStyleId] = useState(
    mode === 'hairstyle' ? HAIR_STYLES[0].id : GLASS_STYLES[0].id
  );
  const [landmarks, setLandmarks] = useState<Array<{ x: number; y: number }> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async (file: File) => {
    setBusy(true);
    try {
      const { getFaceLandmarker, loadImage } = await import('@/lib/mediapipe');
      const landmarker = await getFaceLandmarker();
      const img = await loadImage(file);
      imgRef.current = img;
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      const det = landmarker.detect(img);
      const lm = det.faceLandmarks?.[0];
      if (!lm?.length) {
        toastUploadGuide('face');
        setLandmarks(null);
        setShape(null);
        return;
      }
      const { shape: s } = detectFaceShapeFromLandmarks(
        lm,
        img.naturalWidth,
        img.naturalHeight,
        landmarkDistance
      );
      setShape(s);
      setLandmarks(lm.map((p) => ({ x: p.x, y: p.y })));
      requestAnimationFrame(() => draw(img, lm, styleId, mode));
    } catch (e) {
      toastUploadGuide('face', e instanceof Error ? e.message : 'Try-on failed');
    } finally {
      setBusy(false);
    }
  };

  const draw = (
    img: HTMLImageElement,
    lm: Array<{ x: number; y: number }>,
    sid: string,
    m: Mode
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = 480;
    const h = Math.round((img.naturalHeight / img.naturalWidth) * w);
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    const px = (i: number) => lm[i].x * w;
    const py = (i: number) => lm[i].y * h;
    const leftCheek = px(234);
    const rightCheek = px(454);
    const forehead = py(10);
    const chin = py(152);
    const faceW = Math.abs(rightCheek - leftCheek);
    const midX = (leftCheek + rightCheek) / 2;

    if (m === 'hairstyle') {
      const style = HAIR_STYLES.find((s) => s.id === sid) ?? HAIR_STYLES[0];
      ctx.fillStyle = style.color;
      ctx.globalAlpha = 0.72;
      ctx.beginPath();
      const top = forehead - faceW * 0.35;
      ctx.moveTo(midX - faceW * 0.55, chin * 0.35);
      ctx.quadraticCurveTo(midX - faceW * 0.7, top, midX, top - faceW * 0.08);
      ctx.quadraticCurveTo(midX + faceW * 0.7, top, midX + faceW * 0.55, chin * 0.35);
      if (sid === 'fringe') {
        ctx.quadraticCurveTo(midX, forehead + faceW * 0.12, midX - faceW * 0.55, chin * 0.35);
      } else {
        ctx.quadraticCurveTo(midX, forehead - faceW * 0.02, midX - faceW * 0.55, chin * 0.35);
      }
      ctx.fill();
      ctx.globalAlpha = 1;
    } else {
      const style = GLASS_STYLES.find((s) => s.id === sid) ?? GLASS_STYLES[0];
      const leftEye = { x: (px(33) + px(133)) / 2, y: (py(159) + py(145)) / 2 };
      const rightEye = { x: (px(362) + px(263)) / 2, y: (py(386) + py(374)) / 2 };
      const scale = faceW / 180;
      ctx.strokeStyle = '#1a1a1a';
      ctx.fillStyle = 'rgba(20,20,20,0.25)';
      ctx.lineWidth = 3;
      const drawLens = (cx: number, cy: number) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, style.rx * scale, style.ry * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      };
      drawLens(leftEye.x, leftEye.y);
      drawLens(rightEye.x, rightEye.y);
      ctx.beginPath();
      ctx.moveTo(leftEye.x + style.rx * scale, leftEye.y);
      ctx.lineTo(rightEye.x - style.rx * scale, rightEye.y);
      ctx.stroke();
    }
  };

  const onStyleChange = (id: string) => {
    setStyleId(id);
    if (imgRef.current && landmarks) {
      draw(imgRef.current, landmarks, id, mode);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `rizzassist-${mode}-try-on.png`;
    a.click();
    toastSuccess('Saved', 'Try-on image downloaded.');
  };

  const profile = shape ? getFaceShapeProfile(shape) : null;
  const options = mode === 'hairstyle' ? HAIR_STYLES : GLASS_STYLES;

  return (
    <div className="mx-auto max-w-3xl">
      {!previewUrl && (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-10 text-center dark:border-white/10 dark:bg-ink-800">
          <ImagePlus className="mx-auto h-8 w-8 text-brand-400" />
          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            Upload a selfie to preview {mode === 'hairstyle' ? 'hairstyles' : 'glasses'}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Illustration overlay aligned to your face — private, on-device, free.
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-5 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white"
          >
            Choose photo
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void run(f);
            }}
          />
        </div>
      )}

      {busy && (
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Detecting face & aligning overlay…
        </p>
      )}

      {previewUrl && (
        <div className="space-y-5">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-ink-900 p-4 dark:border-white/5">
            <canvas ref={canvasRef} className="mx-auto max-h-[520px] w-full object-contain" />
          </div>
          {shape && profile && (
            <p className="text-center text-sm text-gray-600 dark:text-white/60">
              Detected <strong className="text-brand-600">{shape}</strong> — {profile.tagline}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-2">
            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => onStyleChange(o.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  styleId === o.id
                    ? 'bg-brand-600 text-white'
                    : 'border border-gray-200 text-gray-700 dark:border-white/10 dark:text-white/70'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={download}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" /> Download
            </button>
            <button
              type="button"
              onClick={() => {
                setPreviewUrl(null);
                setLandmarks(null);
                setShape(null);
                imgRef.current = null;
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm dark:border-white/10"
            >
              <RotateCcw className="h-4 w-4" /> New photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
