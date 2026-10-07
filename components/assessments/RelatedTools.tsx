'use client';

import Link from 'next/link';
import { trackAssessment } from '@/lib/assessments/analytics';
import type { CatalogTool } from '@/lib/assessments/types';
import { CATEGORY_META } from '@/lib/assessments/registry';

export function RelatedTools({
  tools,
  title = 'Related tools',
  subtitle = 'You may also like',
}: {
  tools: CatalogTool[];
  title?: string;
  subtitle?: string;
}) {
  if (!tools.length) return null;
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900">
      <h2 className="text-lg font-bold text-ink-900 dark:text-white">{title}</h2>
      <p className="mt-1 text-sm text-ink-600 dark:text-white/50">{subtitle}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={t.href}
            onClick={() =>
              trackAssessment('related_tool_clicked', { tool: t.slug })
            }
            className="rounded-xl border border-gray-100 p-4 transition hover:border-brand-200 hover:shadow-sm dark:border-white/5 dark:hover:border-brand-500/30"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">
              {CATEGORY_META[t.category].label}
            </span>
            <h3 className="mt-1 text-sm font-semibold text-ink-900 dark:text-white">
              {t.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs text-ink-600 dark:text-white/50">
              {t.description}
            </p>
            <span className="mt-2 inline-block text-xs font-semibold text-brand-600">
              {t.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
