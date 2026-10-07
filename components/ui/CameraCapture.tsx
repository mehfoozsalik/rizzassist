'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, SwitchCamera, X } from 'lucide-react';

type CameraCaptureProps = {
  onCapture: (file: File) => void;
  onClose: () => void;
};

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [ready, setReady] = useState(false);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setReady(false);
    stop();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setReady(true);
      }
    } catch {
      setError(
        'Camera access denied or unavailable. Allow camera permission, or upload a photo instead.'
      );
    }
  }, [facingMode, stop]);

  useEffect(() => {
    void start();
    return () => stop();
  }, [start, stop]);

  const capture = () => {
    const video = videoRef.current;
    if (!video || !ready) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `camera-${Date.now()}.jpg`, {
          type: 'image/jpeg',
        });
        stop();
        onCapture(file);
      },
      'image/jpeg',
      0.92
    );
  };

  return (
    <div
      role="dialog"
      aria-label="Camera capture"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-ink-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm font-semibold text-white">Take a photo</p>
          <button
            type="button"
            onClick={() => {
              stop();
              onClose();
            }}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Close camera"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative aspect-[4/5] bg-black">
          <video
            ref={videoRef}
            playsInline
            muted
            className="h-full w-full object-cover"
            style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : undefined }}
          />
          {!ready && !error && (
            <p className="absolute inset-0 flex items-center justify-center text-sm text-white/60">
              Starting camera…
            </p>
          )}
        </div>

        {error && (
          <p role="alert" className="px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 px-4 py-4">
          <button
            type="button"
            onClick={() =>
              setFacingMode((m) => (m === 'user' ? 'environment' : 'user'))
            }
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            <SwitchCamera className="h-4 w-4" aria-hidden="true" />
            Flip
          </button>
          <button
            type="button"
            onClick={capture}
            disabled={!ready}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-50"
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
            Capture
          </button>
        </div>
        <p className="px-4 pb-4 text-center text-xs text-white/40">
          Face the camera, even light, hair off the forehead for best grooming analysis.
        </p>
      </div>
    </div>
  );
}
