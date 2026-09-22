'use client';

import { useEffect, useRef, useState } from 'react';

export interface NormalizedPoint {
  x: number;
  y: number;
}

/** Displays an image with detected landmarks overlaid as dots, scaled to the rendered image size. */
export function MediaPipeCanvas({
  imageUrl,
  points,
  alt,
  highlightColor = '#f43f5e',
}: {
  imageUrl: string;
  points: NormalizedPoint[];
  alt: string;
  highlightColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.width === 0) return;
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, size.width, size.height);
    ctx.fillStyle = highlightColor;
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x * size.width, p.y * size.height, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [points, size, highlightColor]);

  return (
    <div ref={containerRef} className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
