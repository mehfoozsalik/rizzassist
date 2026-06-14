import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-900 shadow-lg shadow-black/20">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Rizz Assist home"
        >
          <Image
            src="/assets/logo.svg"
            alt="Rizz Assist logo"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
          <span className="text-lg font-semibold tracking-wide text-white">
            Rizz<span className="text-brand-400">Assist</span>
          </span>
        </Link>

        <ul className="flex items-center gap-1 text-sm font-medium">
          <li>
            <Link
              href="/how-it-works"
              className="rounded-lg px-3 py-1.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="rounded-lg px-3 py-1.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              FAQ
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link
              href="/privacy"
              className="rounded-lg px-3 py-1.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link
              href="/#upload"
              className="ml-2 rounded-lg bg-brand-600 px-4 py-1.5 font-semibold text-white transition-colors hover:bg-brand-500"
            >
              Get Report
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
