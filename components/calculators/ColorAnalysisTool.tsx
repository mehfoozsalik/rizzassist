'use client';

import { useState } from 'react';

const SEASONS = {
  Spring: {
    colors: ['#F4A261', '#E76F51', '#2A9D8F', '#E9C46A', '#264653'],
    tip: 'Warm, clear colors lift your presence. Coral, warm greens, and creamy neutrals photograph friendly.',
  },
  Summer: {
    colors: ['#90A8C3', '#C9B1BD', '#7EB09B', '#F2E9E4', '#5C6B73'],
    tip: 'Cool soft tones read polished. Dusty blue, rose, and muted greys support calm confidence.',
  },
  Autumn: {
    colors: ['#BC6C25', '#DDA15E', '#606C38', '#283618', '#FEFAE0'],
    tip: 'Earthy warmth feels grounded. Olive, rust, and camel signal approachable strength.',
  },
  Winter: {
    colors: ['#000000', '#FFFFFF', '#9B2226', '#005F73', '#3D348B'],
    tip: 'High-contrast cool colors project clarity. True black/white and jewel tones sharpen presence.',
  },
} as const;

type Season = keyof typeof SEASONS;

export function ColorAnalysisTool() {
  const [undertone, setUndertone] = useState<'warm' | 'cool' | null>(null);
  const [season, setSeason] = useState<Season | null>(null);

  const finish = (u: 'warm' | 'cool', c: 'soft' | 'clear') => {
    setUndertone(u);
    if (u === 'warm' && c === 'clear') setSeason('Spring');
    else if (u === 'cool' && c === 'soft') setSeason('Summer');
    else if (u === 'warm' && c === 'soft') setSeason('Autumn');
    else setSeason('Winter');
  };

  const result = season ? SEASONS[season] : null;

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-ink-800">
      <p className="text-sm text-gray-500 dark:text-white/50">
        Soft color-season check for clothing presence — helps you pick colors that
        support personality grooming in outfits and photos.
      </p>

      {!season && !undertone && (
        <div className="mt-5 space-y-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Vein / jewelry feel?</p>
          <button type="button" onClick={() => setUndertone('warm')} className="w-full rounded-xl border px-4 py-3 text-left text-sm dark:border-white/10">
            Warm — gold jewelry / greenish veins feel natural
          </button>
          <button type="button" onClick={() => setUndertone('cool')} className="w-full rounded-xl border px-4 py-3 text-left text-sm dark:border-white/10">
            Cool — silver jewelry / bluish veins feel natural
          </button>
        </div>
      )}

      {undertone && !season && (
        <div className="mt-5 space-y-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Hair / eye contrast?</p>
          <button type="button" onClick={() => finish(undertone, 'clear')} className="w-full rounded-xl border px-4 py-3 text-left text-sm dark:border-white/10">
            Clear / higher contrast
          </button>
          <button type="button" onClick={() => finish(undertone, 'soft')} className="w-full rounded-xl border px-4 py-3 text-left text-sm dark:border-white/10">
            Soft / blended contrast
          </button>
        </div>
      )}

      {result && season && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Your season</p>
          <h3 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">{season}</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-white/60">{result.tip}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {result.colors.map((hex) => (
              <span
                key={hex}
                className="h-10 w-10 rounded-lg border border-black/10 shadow-inner"
                style={{ backgroundColor: hex }}
                title={hex}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setUndertone(null);
              setSeason(null);
            }}
            className="mt-5 text-sm text-brand-600 underline"
          >
            Retake
          </button>
        </div>
      )}
    </div>
  );
}
