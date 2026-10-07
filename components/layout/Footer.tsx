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
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Return to Rizz Assist homepage">
              <Image
                src="/assets/logo.svg"
                alt="Rizz Assist logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-base font-semibold text-ink-900 dark:text-white">
                Home
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600 dark:text-white/50">
              AI self-improvement platform: personality, confidence, social skills,
              dating tools, and appearance analyzers. Free to start. No photo vault.
            </p>
          </div>

          <nav aria-label="Tools navigation">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Tools
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/tools" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  All tools
                </Link>
              </li>
              <li>
                <Link href="/personality-test" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Personality test
                </Link>
              </li>
              <li>
                <Link href="/confidence-test" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Confidence test
                </Link>
              </li>
              <li>
                <Link href="/face-shape-detector" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Face shape detector
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Features info navigation">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Improve
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/report" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Personality report
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  My profile
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Guides &amp; articles
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  How it works
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Help
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/faq" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Common questions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Data &amp; privacy
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Resources
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/sitemap.xml" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  Sitemap
                </Link>
              </li>
              <li>
                <a href="/llms.txt" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  LLMs.txt
                </a>
              </li>
              <li>
                <a href="/ai.txt" className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400">
                  AI policy
                </a>
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Somatotype_and_constitutional_psychology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  Somatotype research
                </a>
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
