import Link from 'next/link';
import Image from 'next/image';
import { CookieSettingsButton } from './CookieSettingsButton';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-white/5 dark:bg-ink-900">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Rizz Assist home">
              <Image
                src="/assets/logo.svg"
                alt="Rizz Assist logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-base font-semibold text-ink-900 dark:text-white">
                Rizz<span className="text-brand-600 dark:text-brand-400">Assist</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600 dark:text-white/50">
              Your AI rizz coach: pickup lines, style upgrades, shade recs,
              and confidence tips. No login. No photo storage.
            </p>
          </div>

          <nav aria-label="Tools navigation">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Tools
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  AI Look Analyzer
                </Link>
              </li>
              <li>
                <Link href="/body-type-calculator" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Body Type Calculator
                </Link>
              </li>
              <li>
                <Link href="/body-shape-calculator" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Body Shape Calculator
                </Link>
              </li>
              <li>
                <Link href="/eye-shape-detector" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Eye Shape Detector
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Features info navigation">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Features Info
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/features/body-type-calculator" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  About Body Types
                </Link>
              </li>
              <li>
                <Link href="/features/body-shape-calculator" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  About Body Shapes
                </Link>
              </li>
              <li>
                <Link href="/features/eye-shape-detector" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  About Eye Shapes
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  How It Works
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/faq" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-7 sm:flex-row dark:border-white/5">
          <p className="text-xs text-ink-400 dark:text-white/30">
            &copy; {year} Rizz Assist. For entertainment and self-improvement only.
          </p>
          <p className="text-xs text-ink-300 dark:text-white/20">
            Built with AI &middot; Zero data stored
          </p>
        </div>
      </div>
    </footer>
  );
}
