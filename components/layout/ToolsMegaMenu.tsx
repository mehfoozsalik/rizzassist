'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ChevronDown,
  ClipboardList,
  Eye,
  Flame,
  Heart,
  MessageCircle,
  Ruler,
  ScanFace,
  Sparkles,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ToolItem = {
  href: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
};

type ToolGroup = {
  title: string;
  items: ToolItem[];
};

const TOOL_GROUPS: ToolGroup[] = [
  {
    title: 'Personality',
    items: [
      {
        href: '/personality-test',
        label: 'Personality Test',
        blurb: 'Traits & social strengths',
        icon: ClipboardList,
      },
      {
        href: '/communication-style-test',
        label: 'Communication Style',
        blurb: 'How you express yourself',
        icon: MessageCircle,
      },
      {
        href: '/emotional-intelligence-test',
        label: 'Emotional Intelligence',
        blurb: 'Read & respond to emotion',
        icon: Heart,
      },
    ],
  },
  {
    title: 'Confidence & Social',
    items: [
      {
        href: '/confidence-test',
        label: 'Confidence Test',
        blurb: 'Social self-trust',
        icon: Sparkles,
      },
      {
        href: '/charisma-test',
        label: 'Charisma Test',
        blurb: 'Presence & magnetism',
        icon: Flame,
      },
      {
        href: '/social-skills-test',
        label: 'Social Skills',
        blurb: 'Group & cue reading',
        icon: Users,
      },
    ],
  },
  {
    title: 'Dating & Appearance',
    items: [
      {
        href: '/rizz-test',
        label: 'Rizz Test',
        blurb: 'Dating conversation skill',
        icon: Flame,
      },
      {
        href: '/face-shape-detector',
        label: 'Face Shape Detector',
        blurb: 'Photo + grooming tips',
        icon: ScanFace,
      },
      {
        href: '/eye-shape-detector',
        label: 'Eye Shape Detector',
        blurb: 'Eyes & framing tips',
        icon: Eye,
      },
      {
        href: '/body-shape-calculator',
        label: 'Body Shape',
        blurb: 'Silhouette calculator',
        icon: Ruler,
      },
      {
        href: '/body-type-calculator',
        label: 'Body Type',
        blurb: 'Ecto / meso / endo',
        icon: Activity,
      },
    ],
  },
];

export function ToolsMegaMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  const openMenu = () => {
    clearClose();
    setOpen(true);
  };

  const closeMenu = useCallback(() => {
    clearClose();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [open, closeMenu]);

  useEffect(() => () => clearClose(), []);

  return (
    <li
      ref={rootRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        onFocus={openMenu}
        className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-ink-600 transition-colors duration-200 hover:bg-ink-100 hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white ${
          open ? 'bg-ink-100 text-ink-900 dark:bg-white/5 dark:text-white' : ''
        }`}
      >
        Tools
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 motion-reduce:transition-none ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        role="menu"
        aria-label="RizzAssist tools"
        aria-hidden={!open}
        className={`absolute left-1/2 top-full z-50 w-[min(92vw,40rem)] -translate-x-1/2 pt-2 transition-all duration-200 motion-reduce:transition-none ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-ink-900/10 dark:border-white/10 dark:bg-ink-900 dark:shadow-black/40">
          <div className="grid gap-0 sm:grid-cols-3">
            {TOOL_GROUPS.map((group) => (
              <div
                key={group.title}
                className="border-b border-gray-100 p-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 dark:border-white/5"
              >
                <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-brand-600">
                  {group.title}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.href} role="none">
                      <Link
                        href={item.href}
                        role="menuitem"
                        onClick={closeMenu}
                        className="group flex cursor-pointer items-start gap-2.5 rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-brand-50 focus-visible:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500 dark:hover:bg-brand-500/10 dark:focus-visible:bg-brand-500/10"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-brand-600 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white dark:bg-white/10">
                          <item.icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink-900 dark:text-white">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-ink-500 dark:text-white/45">
                            {item.blurb}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 bg-cream-50 px-4 py-3 dark:border-white/5 dark:bg-ink-800">
            <p className="text-xs text-ink-500 dark:text-white/45">
              20+ assessments &amp; appearance tools
            </p>
            <Link
              href="/tools"
              onClick={closeMenu}
              className="cursor-pointer rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              Explore all tools →
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export { TOOL_GROUPS };
