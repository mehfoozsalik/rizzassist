import Link from "next/link";
import Image from "next/image";
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-white/5 dark:bg-ink-900">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="Return to Rizz Assist homepage"
            >
              <Image
                src="/assets/logo.svg"
                alt="Rizz Assist logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-base font-semibold text-ink-900 dark:text-white">
                Rizz Assist
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600 dark:text-white/50">
              AI self-improvement platform: personality, confidence, social
              skills, dating tools, and appearance analyzers. Free to start. No
              photo vault.
            </p>
          </div>

          <nav aria-label="Tools navigation">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Tools
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/tools"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  Browse the toolkit
                </Link>
              </li>
              <li>
                <Link
                  href="/personality-test"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  Take a personality quiz
                </Link>
              </li>
              <li>
                <Link
                  href="/confidence-test"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  Rate your confidence
                </Link>
              </li>
              <li>
                <Link
                  href="/face-shape-detector"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  Find your face shape
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Features info navigation">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Improve
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/report"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  View improvement report
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  Open saved profile
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  Read guides &amp; articles
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  See the process
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Help
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  Common questions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  Data &amp; privacy
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Resources">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 dark:text-white/40">
              Resources
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  Sitemap
                </Link>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
                  LLMs.txt
                </a>
              </li>
              <li>
                <a
                  href="/ai.txt"
                  className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
                >
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

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-7 sm:flex-row dark:border-white/5">
          <p className="text-xs text-ink-400 dark:text-white/30">
            &copy; {year} Rizz Assist. For entertainment and self-improvement
            only.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-4">
            <a
              href="https://submitaitools.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Submit AI Tools"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://submitaitools.org/static_submitaitools/images/submitaitools.png"
                alt="Submit AI Tools"
                width={200}
                height={60}
                loading="lazy"
                decoding="async"
                className="h-auto w-[140px] rounded-[10px] object-contain"
              />
            </a>
            <a
              href="https://liftoapp.com/product/rizz-assist"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Featured on Lifto"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://liftoapp.com/badges/featured-light.svg"
                alt="Featured on Lifto"
                width={200}
                height={54}
                loading="lazy"
                decoding="async"
                className="h-auto w-[140px] object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
