'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { TOOL_GROUPS } from './ToolsMegaMenu';

export interface NavLink {
  href: string;
  label: string;
}

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const close = () => {
    setOpen(false);
    setToolsOpen(false);
  };

  return (
    <div className="flex items-center gap-1 lg:hidden">
      <ThemeToggle />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="cursor-pointer rounded-lg p-2.5 text-ink-700 transition-colors duration-200 hover:bg-ink-100 hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white"
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full max-h-[min(80vh,32rem)] overflow-y-auto border-b border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-white/5 dark:bg-ink-900 dark:shadow-black/30"
        >
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {links.map((link) =>
              link.label === 'Tools' ? (
                <li key={link.href}>
                  <button
                    type="button"
                    aria-expanded={toolsOpen}
                    onClick={() => setToolsOpen((v) => !v)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-left text-ink-700 transition-colors duration-200 hover:bg-ink-100 dark:text-white/80 dark:hover:bg-white/5"
                  >
                    Tools
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                        toolsOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </button>
                  {toolsOpen && (
                    <div className="mb-2 ml-2 space-y-3 border-l-2 border-brand-200 pl-3 dark:border-brand-500/30">
                      {TOOL_GROUPS.map((group) => (
                        <div key={group.title}>
                          <p className="px-1 text-[10px] font-semibold uppercase tracking-widest text-brand-600">
                            {group.title}
                          </p>
                          <ul className="mt-1 space-y-0.5">
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={close}
                                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2.5 text-ink-600 transition-colors duration-200 hover:bg-brand-50 hover:text-ink-900 dark:text-white/70 dark:hover:bg-brand-500/10 dark:hover:text-white"
                                >
                                  <item.icon className="h-4 w-4 shrink-0 text-brand-500" aria-hidden />
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link
                        href="/tools"
                        onClick={close}
                        className="block cursor-pointer rounded-lg px-2 py-2.5 font-semibold text-brand-600 transition-colors duration-200 hover:bg-brand-50 dark:hover:bg-brand-500/10"
                      >
                        Explore all tools →
                      </Link>
                    </div>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block cursor-pointer rounded-lg px-3 py-3 text-ink-600 transition-colors duration-200 hover:bg-ink-100 hover:text-ink-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
            <li className="mt-1">
              <Link
                href="/report"
                onClick={close}
                className="block cursor-pointer rounded-lg bg-brand-600 px-3 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-brand-500"
              >
                My report
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
