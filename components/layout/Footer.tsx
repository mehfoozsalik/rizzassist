import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-ink-900">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="Rizz Assist home">
              <Image
                src="/assets/logo.svg"
                alt="Rizz Assist logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-base font-semibold text-white">
                Rizz<span className="text-brand-400">Assist</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Your AI rizz coach — pickup lines, style upgrades, shade recs,
              and confidence tips. No login. No photo storage.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-white/60 transition-colors hover:text-brand-400">
                  Get Your Rizz Report
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-white/60 transition-colors hover:text-brand-400">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/60 transition-colors hover:text-brand-400">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal navigation">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Legal
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-white/60 transition-colors hover:text-brand-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-7 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; {year} Rizz Assist. For entertainment and self-improvement only.
          </p>
          <p className="text-xs text-white/20">
            Built with AI &middot; Zero data stored
          </p>
        </div>
      </div>
    </footer>
  );
}
