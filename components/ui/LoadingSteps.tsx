'use client';

import { Check, Loader2 } from 'lucide-react';

export function LoadingSteps({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <ul className="space-y-3">
        {steps.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <li key={step} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  done
                    ? 'bg-green-500 text-white'
                    : active
                      ? 'bg-ink-900 text-white'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : active ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                ) : (
                  <span className="text-[10px] font-semibold">{i + 1}</span>
                )}
              </span>
              <span
                className={`text-sm ${
                  active ? 'font-semibold text-gray-900' : done ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
