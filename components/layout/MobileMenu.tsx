'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export interface NavLink {
  href: string;
  label: string;
}

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-1 lg:hidden">
      <ThemeToggle />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="rounded-lg p-2 text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white"
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full border-b border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-white/5 dark:bg-ink-900 dark:shadow-black/30"
        >
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-1">
              <Link
                href="/#upload"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-brand-600 px-3 py-2.5 text-center font-semibold text-white transition-colors hover:bg-brand-500"
              >
                Get Report
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
