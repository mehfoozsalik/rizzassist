'use client';

import { useMemo, useState, type ComponentType } from 'react';
import Link from 'next/link';
import {
  Activity,
  ClipboardList,
  Eye,
  FileText,
  Ruler,
  ScanFace,
  Search,
  Shirt,
  Sparkles,
} from 'lucide-react';
import {
  CATEGORY_META,
  getAllCatalogTools,
} from '@/lib/assessments/registry';
import type { AssessmentCategory, CatalogTool } from '@/lib/assessments/types';

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  scan: ScanFace,
  eye: Eye,
  ruler: Ruler,
  activity: Activity,
  shirt: Shirt,
  sparkles: Sparkles,
  clipboard: ClipboardList,
  file: FileText,
};

const CATEGORIES: (AssessmentCategory | 'all')[] = [
  'all',
  'personality',
  'confidence',
  'social',
  'dating',
  'appearance',
];

function ToolCard({ tool }: { tool: CatalogTool }) {
  const Icon = ICONS[tool.icon] ?? ClipboardList;
  return (
    <Link
      href={tool.href}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-brand-200 hover:shadow-md dark:border-white/5 dark:bg-ink-900 dark:hover:border-brand-500/30"
    >
      <div className="flex items-start justify-between gap-2">
        <Icon className="h-5 w-5 text-brand-500" aria-hidden />
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          Free
        </span>
      </div>
      <span className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
        {CATEGORY_META[tool.category].label}
      </span>
      <h3 className="mt-1 text-sm font-semibold text-ink-900 group-hover:text-brand-700 dark:text-white">
        {tool.title}
      </h3>
      <p className="mt-1 flex-1 text-xs leading-relaxed text-ink-600 dark:text-white/50">
        {tool.description}
      </p>
      <div className="mt-3 flex items-center justify-between text-xs">
        {tool.minutes != null && (
          <span className="text-ink-400">{tool.minutes} min</span>
        )}
        <span className="font-semibold text-brand-600">{tool.cta} →</span>
      </div>
    </Link>
  );
}

export function ToolsHub() {
  const all = useMemo(() => getAllCatalogTools(), []);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        CATEGORY_META[t.category].label.toLowerCase().includes(q)
      );
    });
  }, [all, query, category]);

  const grouped = useMemo(() => {
    const order: AssessmentCategory[] = [
      'personality',
      'confidence',
      'social',
      'dating',
      'appearance',
    ];
    return order
      .map((cat) => ({
        cat,
        tools: filtered.filter((t) => t.category === cat),
      }))
      .filter((g) => g.tools.length > 0);
  }, [filtered]);

  const popular = all.filter((t) =>
    ['personality-test', 'confidence-test', 'charisma-test', 'rizz-test', 'face-shape-detector'].includes(
      t.slug
    )
  );

  return (
    <div className="space-y-10">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
          aria-hidden
        />
        <label htmlFor="tool-search" className="sr-only">
          Search for a tool
        </label>
        <input
          id="tool-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a tool..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-ink-900 outline-none ring-brand-500 focus:ring-2 dark:border-white/10 dark:bg-ink-900 dark:text-white"
        />
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Tool categories"
      >
        {CATEGORIES.map((c) => {
          const active = category === c;
          const label = c === 'all' ? 'All' : CATEGORY_META[c].label;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-ink-600 hover:bg-ink-100 dark:bg-ink-900 dark:text-white/70 dark:hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {!query && category === 'all' && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Popular tools
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}

      {grouped.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-ink-500 dark:border-white/10">
          No tools match “{query}”. Try another keyword or{' '}
          <button
            type="button"
            className="font-semibold text-brand-600"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
          >
            clear filters
          </button>
          .
        </p>
      ) : (
        grouped.map(({ cat, tools }) => (
          <section key={cat}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              {CATEGORY_META[cat].label}
            </h2>
            <p className="mt-1 text-sm text-ink-500 dark:text-white/45">
              {CATEGORY_META[cat].blurb}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
