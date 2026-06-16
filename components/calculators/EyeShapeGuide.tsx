'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { EYE_SHAPE_GUIDE, type EyeShapeGuideEntry } from '@/lib/eyeShapes';

function EyeIcon({ entry }: { entry: EyeShapeGuideEntry }) {
  const w = 50 * entry.widthRatio;
  const h = 50 * entry.heightRatio;
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden="true">
      <g transform={`translate(32 20) rotate(${entry.tilt})`}>
        <path
          d={`M ${-w} 0 Q ${-w * 0.4} ${-h} 0 ${-h * 0.85} Q ${w * 0.4} ${-h} ${w} 0 Q ${w * 0.4} ${h} 0 ${h * 0.85} Q ${-w * 0.4} ${h} ${-w} 0 Z`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-brand-600"
        />
        {entry.crease && (
          <path
            d={`M ${-w * 0.85} ${-h * 0.6} Q 0 ${-h * 1.6} ${w * 0.85} ${-h * 0.6}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-300"
          />
        )}
        <circle cx="0" cy="0" r={Math.min(h * 0.6, 8)} className="fill-ink-900" />
      </g>
    </svg>
  );
}

export function EyeShapeGuide() {
  const [open, setOpen] = useState<string | null>(EYE_SHAPE_GUIDE[0].name);

  return (
    <div className="space-y-3">
      {EYE_SHAPE_GUIDE.map((entry) => {
        const isOpen = open === entry.name;
        return (
          <div
            key={entry.name}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : entry.name)}
              aria-expanded={isOpen}
              aria-controls={`eye-shape-${entry.name}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-center gap-4">
                <EyeIcon entry={entry} />
                <span className="font-semibold text-gray-900">{entry.name}</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div id={`eye-shape-${entry.name}`} className="border-t border-gray-100 px-5 py-4">
                <p className="text-sm text-gray-600">{entry.description}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
                  {entry.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                        aria-hidden="true"
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
