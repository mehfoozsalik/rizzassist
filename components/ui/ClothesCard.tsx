'use client';

import { motion } from 'framer-motion';
import { Palette, Shirt } from 'lucide-react';
import type { ClothingColor } from '@/lib/types';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export function ClothesCard({
  colors,
  suggestions,
}: {
  colors: ClothingColor[];
  suggestions: string[];
}) {
  if (!colors?.length && !suggestions?.length) return null;

  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-ink-700/50 bg-ink-900"
    >
      <div className="border-b border-white/5 px-5 py-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-white">
          <Shirt className="h-4 w-4 text-brand-400" aria-hidden="true" />
          Clothes &amp; Color Suggestions
        </h3>
        <p className="mt-0.5 text-xs text-white/40">
          Wear these colors and pieces to match your face and build.
        </p>
      </div>

      {colors?.length > 0 && (
        <div className="border-b border-white/5 px-5 py-5">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/45">
            <Palette className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" />
            Best clothing colors
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {colors.map((color) => (
              <li
                key={`${color.name}-${color.hex}`}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-ink-800/80 p-3"
              >
                <span
                  className="mt-0.5 h-10 w-10 shrink-0 rounded-lg border border-white/15 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                  title={color.hex}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {color.name}{' '}
                    <span className="font-mono text-[11px] font-normal text-white/35">
                      {color.hex}
                    </span>
                  </p>
                  {color.why && (
                    <p className="mt-1 text-xs leading-relaxed text-white/55">{color.why}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestions?.length > 0 && (
        <div className="px-5 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/45">
            Clothes to wear
          </p>
          <ul className="space-y-2.5">
            {suggestions.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-white/75">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600/20 text-[10px] font-bold text-brand-400">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
