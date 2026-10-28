'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Check,
  Copy,
  Flame,
  Palette,
  ScanFace,
  Sparkles,
  TrendingUp,
  Zap,
  Crown,
  Scissors,
} from 'lucide-react';
import type { AnalysisResult } from '@/lib/types';
import { ShadesCard } from './ShadesCard';
import { ClothesCard } from './ClothesCard';
import { DownloadPdfButton } from './DownloadPdfButton';

function rizzTier(score: number) {
  if (score >= 90) return { label: 'Legendary Rizz', color: 'text-yellow-400' };
  if (score >= 75) return { label: 'Certified Rizzler', color: 'text-green-400' };
  if (score >= 60) return { label: 'Strong Rizz', color: 'text-brand-400' };
  if (score >= 45) return { label: 'Rising Rizz', color: 'text-blue-400' };
  if (score >= 30) return { label: 'Rizz in Training', color: 'text-orange-400' };
  return { label: 'Rizz Rookie', color: 'text-white/60' };
}

function scoreColor(score: number) {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#f43f5e';
  if (score >= 40) return '#f59e0b';
  return '#f43f5e';
}

function CircularScore({
  score,
  size = 88,
  stroke = 8,
  showSuffix = false,
  dark = false,
}: {
  score: number;
  size?: number;
  stroke?: number;
  showSuffix?: boolean;
  dark?: boolean;
}) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'}
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={scoreColor(clamped)}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center font-bold ${dark ? 'text-white' : 'text-gray-900'}`}
        style={{ fontSize: size * 0.26 }}
      >
        {clamped}
        {showSuffix && (
          <span className={`text-sm ${dark ? 'text-white/40' : 'text-gray-400'}`}>/100</span>
        )}
      </span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function PickupLines({ lines }: { lines: string[] }) {
  const [copied, setCopied] = useState<number | null>(null);
  if (!lines?.length) return null;

  const copy = async (text: string, i: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-ink-700/50 bg-ink-900"
    >
      <div className="border-b border-white/5 px-5 py-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-white">
          <Flame className="h-4 w-4 text-brand-400" aria-hidden="true" />
          Your Pickup Lines
        </h3>
        <p className="mt-0.5 text-xs text-white/40">Tap to copy. Make them yours.</p>
      </div>
      <ul className="divide-y divide-white/5">
        {lines.map((line, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => copy(line, i)}
              className="group flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-white/3"
              aria-label={`Copy pickup line: ${line}`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600/20 text-[10px] font-bold text-brand-400">
                {i + 1}
              </span>
              <span className="flex-1 text-sm leading-relaxed text-white/80">
                &ldquo;{line}&rdquo;
              </span>
              <span className="shrink-0 text-white/20 transition-colors group-hover:text-brand-400">
                {copied === i ? (
                  <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function TipCard({
  title,
  icon,
  tips,
}: {
  title: string;
  icon: React.ReactNode;
  tips: string[];
}) {
  if (!tips?.length) return null;
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-ink-800"
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
        <span className="text-brand-600 dark:text-brand-400" aria-hidden="true">{icon}</span>
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-white/60">
        {tips.map((tip, i) => (
          <li key={i} className="flex gap-2">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
              aria-hidden="true"
            />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ScoreLabelIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  if (l.includes('style')) return <Palette className="h-3.5 w-3.5" aria-hidden="true" />;
  if (l.includes('alpha')) return <Crown className="h-3.5 w-3.5" aria-hidden="true" />;
  if (l.includes('edge')) return <Zap className="h-3.5 w-3.5" aria-hidden="true" />;
  if (l.includes('groom')) return <ScanFace className="h-3.5 w-3.5" aria-hidden="true" />;
  return <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />;
}

function buildPdfSections(content: AnalysisResult) {
  return [
    {
      title: `Rizz Score: ${content.rizzScore}/100`,
      lines: [content.overallImpression],
    },
    {
      title: 'Score Breakdown',
      lines: (content.scores ?? []).map((s) => `${s.label}: ${s.score}/100, ${s.note}`),
    },
    { title: 'Best Clothing Colors', lines: (content.clothingColors ?? []).map((c) => `${c.name} (${c.hex}): ${c.why}`) },
    { title: 'Clothes to Wear', lines: content.clothesSuggestions ?? [] },
    { title: 'Dress Colors', lines: content.dressColors ?? [] },
    { title: 'Dress & Outfit Styles', lines: content.dressStyles ?? [] },
    { title: 'Haircut Styles', lines: content.haircutStyles ?? [] },
    { title: 'Style & Outfit Tips', lines: content.styleTips ?? [] },
    {
      title: 'Recommended Shades',
      lines: (content.shades ?? []).map((s) => `${s.style}: ${s.description}`),
    },
    { title: 'Best Angles & Expression', lines: content.faceOrientation ?? [] },
    { title: 'Pickup Lines', lines: content.pickupLines ?? [] },
    { title: 'Confidence Boosters', lines: content.confidenceTips ?? [] },
  ];
}

export function AnalysisCard({
  content,
  imageUrl,
}: {
  content: AnalysisResult;
  imageUrl?: string | null;
}) {
  const tier = rizzTier(content.rizzScore);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.09 } } }}
      className="space-y-5"
    >
      <motion.div
        variants={fadeUp}
        className="overflow-hidden rounded-3xl bg-ink-900 p-6 shadow-xl sm:p-8"
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
          {imageUrl && (
            <figure className="shrink-0">
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-white/10 shadow-lg sm:h-32 sm:w-32">
                <Image
                  src={imageUrl}
                  alt="The photo you submitted for your Rizz Report"
                  fill
                  sizes="128px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <figcaption className="mt-1.5 text-center text-[11px] text-white/30">
                Your photo
              </figcaption>
            </figure>
          )}

          <div className="flex flex-1 flex-col items-center gap-5 sm:flex-row">
            <div className="rounded-full border border-white/10 bg-ink-800 p-2.5 shadow-inner">
              <CircularScore
                score={content.rizzScore}
                size={120}
                stroke={11}
                showSuffix
                dark
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Your Rizz Score
              </p>
              <p className={`mt-1.5 text-2xl font-extrabold sm:text-3xl ${tier.color}`}>
                {tier.label}
              </p>
              <p className="mt-2.5 max-w-md text-sm leading-relaxed text-white/65">
                {content.overallImpression}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex justify-center sm:justify-end">
        <DownloadPdfButton
          title="Your Rizz Report"
          subtitle={content.overallImpression}
          filename={`rizz-report-${content.rizzScore}`}
          sections={buildPdfSections(content)}
        />
      </motion.div>

      {content.scores?.length > 0 && (
        <motion.div variants={fadeUp}>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40">
            Rizz Breakdown
          </h3>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {content.scores.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col items-center rounded-2xl border border-ink-700/50 bg-ink-900 p-4 text-center"
              >
                <dt className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                  <ScoreLabelIcon label={item.label} />
                  {item.label}
                </dt>
                <dd className="mt-3">
                  <CircularScore score={item.score} size={72} stroke={7} dark />
                </dd>
                {item.note && (
                  <p className="mt-2.5 text-[11px] leading-snug text-white/35">{item.note}</p>
                )}
              </motion.div>
            ))}
          </dl>
        </motion.div>
      )}

      <PickupLines lines={content.pickupLines} />

      <ClothesCard
        colors={content.clothingColors ?? []}
        suggestions={content.clothesSuggestions ?? []}
      />

      <ShadesCard shades={content.shades} />

      <div className="grid gap-4 sm:grid-cols-2">
        <TipCard
          title="Haircut Styles"
          icon={<Scissors className="h-4 w-4" />}
          tips={content.haircutStyles ?? []}
        />
        <TipCard
          title="Style Tips"
          icon={<Palette className="h-4 w-4" />}
          tips={content.styleTips}
        />
        <TipCard
          title="Best Angles & Expression"
          icon={<ScanFace className="h-4 w-4" />}
          tips={content.faceOrientation}
        />
        <TipCard
          title="Confidence Boosters"
          icon={<TrendingUp className="h-4 w-4" />}
          tips={content.confidenceTips}
        />
      </div>

      <motion.p
        variants={fadeUp}
        className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-400 dark:text-white/30"
      >
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        Generated by Rizz Assist for fun &amp; self-improvement. Go get &apos;em.
      </motion.p>
    </motion.div>
  );
}
