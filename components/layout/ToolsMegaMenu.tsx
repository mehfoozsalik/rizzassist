'use client';

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
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

type ToolsMegaMenuProps = {
  onOpenChange?: (open: boolean) => void;
};

type PanelPos = { top: number; right: number; width: number };

export function ToolsMegaMenu({ onOpenChange }: ToolsMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<PanelPos>({ top: 0, right: 16, width: 640 });
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  const setOpenState = useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpenState(false), 180);
  };

  const openMenu = () => {
    clearClose();
    setOpenState(true);
  };

  const closeMenu = useCallback(() => {
    clearClose();
    setOpenState(false);
  }, [setOpenState]);

  const updatePos = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = Math.min(window.innerWidth - 24, 640);
    const right = Math.max(12, window.innerWidth - rect.right);
    setPos({
      top: rect.bottom + 8,
      right,
      width,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePos();
    window.addEventListener('resize', updatePos);
    window.addEventListener('scroll', updatePos, true);
    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos, true);
    };
  }, [open, updatePos]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      closeMenu();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [open, closeMenu]);

  useEffect(() => () => clearClose(), []);

  const panel =
    mounted &&
    open &&
    createPortal(
      <div
        ref={panelRef}
        id={panelId}
        role="menu"
        aria-label="Rizz Assist tools"
        className="tools-frost"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        style={{
          position: 'fixed',
          top: pos.top,
          right: pos.right,
          width: pos.width,
          zIndex: 80,
        }}
      >
          <div className="grid gap-0 sm:grid-cols-3">
            {TOOL_GROUPS.map((group) => (
              <div
                key={group.title}
                className="border-b border-black/5 p-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 dark:border-white/10"
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
                        className="group flex cursor-pointer items-start gap-2.5 rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-white/45 focus-visible:bg-white/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500 dark:hover:bg-white/10 dark:focus-visible:bg-white/10"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/55 text-brand-600 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white dark:bg-white/10">
                          <item.icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink-900 dark:text-white">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-ink-600 dark:text-white/55">
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
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/5 bg-white/15 px-4 py-3 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs text-ink-600 dark:text-white/50">
              20+ assessments &amp; appearance tools
            </p>
            <Link
              href="/tools"
              onClick={closeMenu}
              className="cursor-pointer rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              See full tool list →
            </Link>
          </div>
      </div>,
      document.body
    );

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
        onClick={() => (open ? closeMenu() : openMenu())}
        onFocus={openMenu}
        className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-ink-600 transition-colors duration-200 hover:bg-white/50 hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white ${
          open ? 'bg-white/60 text-ink-900 dark:bg-white/10 dark:text-white' : ''
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
      {panel}
    </li>
  );
}

export { TOOL_GROUPS };
