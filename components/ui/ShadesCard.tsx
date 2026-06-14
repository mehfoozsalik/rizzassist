"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ShadeItem } from "@/lib/types";

/* Map API style name → public asset path */
const SHADE_FILE_MAP: Record<string, string> = {
  aviator: "/assets/shades/aviator.svg",
  wayfarer: "/assets/shades/wayfarer.svg",
  round: "/assets/shades/round.svg",
  "cat-eye": "/assets/shades/cat-eye.svg",
  clubmaster: "/assets/shades/clubmaster.svg",
  square: "/assets/shades/square.svg",
  rectangular: "/assets/shades/rectangular.svg",
  oval: "/assets/shades/oval.svg",
  geometric: "/assets/shades/geometric.svg",
  butterfly: "/assets/shades/butterfly.svg",
};

function getShadeFile(style: string): string {
  return SHADE_FILE_MAP[style.toLowerCase().trim()] ?? SHADE_FILE_MAP.wayfarer;
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export function ShadesCard({ shades }: { shades: ShadeItem[] }) {
  if (!shades?.length) return null;

  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-ink-700/50 bg-ink-900"
    >
      {/* Header */}
      <div className="border-b border-white/5 px-5 py-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-white">
          {/* Glasses icon */}
          <svg
            viewBox="0 0 20 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-10 text-brand-400"
            aria-hidden="true"
          >
            <rect
              x="0.75"
              y="0.75"
              width="7.5"
              height="8.5"
              rx="2.5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <rect
              x="11.75"
              y="0.75"
              width="7.5"
              height="8.5"
              rx="2.5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M8.25 5 Q10 3 11.75 5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          Shades for Your Face Shape
        </h3>
        {shades[0]?.faceShape && (
          <p className="mt-0.5 text-xs text-white/40">
            Detected face shape:{" "}
            <span className="font-medium capitalize text-brand-400">
              {shades[0].faceShape}
            </span>
          </p>
        )}
      </div>

      {/* Shade cards grid */}
      <div className="grid gap-px bg-white/5 sm:grid-cols-2">
        {shades.map((item, i) => (
          <div key={i} className="flex flex-col gap-4 bg-ink-900 p-5">
            {/* SVG illustration */}
            <div className="flex items-center justify-center rounded-xl border border-white/5 bg-ink-800 py-2">
              {/* brightness(0) → black; invert(1) → white. SVG opacity layers
                  preserved, giving lens-vs-frame depth on the dark background. */}
              <Image
                src={getShadeFile(item.style)}
                alt={`${item.style} sunglasses frame`}
                width={300}
                height={100}
                unoptimized
                className="w-full max-w-[280px] h-36 select-none"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.92 }}
                draggable={false}
              />
            </div>

            {/* Info */}
            <div>
              <span className="inline-block rounded-full bg-brand-600/15 px-2.5 py-0.5 text-xs font-semibold text-brand-400">
                {item.style}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
