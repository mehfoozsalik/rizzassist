import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center"
      >
        <p className="text-6xl font-extrabold text-brand-600">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 max-w-md text-gray-600 dark:text-white/60">
          The page you were looking for may have moved or never existed. Let&apos;s
          get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Get Your Rizz Report
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Browse FAQ
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
