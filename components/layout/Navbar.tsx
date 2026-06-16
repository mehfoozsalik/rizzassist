import Link from 'next/link';
import Image from 'next/image';
import { MobileMenu, type NavLink } from './MobileMenu';

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Check Rizz' },
  { href: '/body-type-calculator', label: 'Body Type' },
  { href: '/body-shape-calculator', label: 'Body Shape' },
  { href: '/eye-shape-detector', label: 'Eye Shape' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/faq', label: 'FAQ' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-900 shadow-lg shadow-black/20">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
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

        {/* Desktop nav: full link list. Tablet/mobile use the hamburger menu instead */}
        <ul className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-3 py-1.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#upload"
              className="ml-2 rounded-lg bg-brand-600 px-4 py-1.5 font-semibold text-white transition-colors hover:bg-brand-500"
            >
              Get Report
            </Link>
          </li>
        </ul>

        <MobileMenu links={NAV_LINKS} />
      </nav>
    </header>
  );
}
