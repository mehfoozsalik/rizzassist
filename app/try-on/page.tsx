import type { Metadata } from 'next';
import Link from 'next/link';
import { Glasses, Scissors } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const PAGE_URL = `${SITE_URL}/try-on`;

export const metadata: Metadata = {
  title: 'Style Try-On: Hairstyles & Glasses on Your Photo',
  description:
    'Free private try-on for hairstyles and glasses. Preview grooming looks on your selfie — on-device AI, no login. Built for personality improvement.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Style Try-On | Rizz Assist',
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function TryOnHubPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="bg-ink-900 px-4 py-14 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Style Try-On</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Preview hairstyles and glasses on your own photo before you commit —
            private, free, and focused on how you present yourself.
          </p>
        </section>
        <section className="bg-cream-50 px-4 py-14 dark:bg-ink-800">
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            <Link
              href="/try-on/hairstyle"
              className="group rounded-2xl border border-gray-100 bg-white p-8 transition hover:border-brand-200 hover:shadow-md dark:border-white/5 dark:bg-ink-900"
            >
              <Scissors className="h-8 w-8 text-brand-500" />
              <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Hairstyle try-on</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-white/50">
                Detect face shape, then overlay stylized cuts aligned to your landmarks.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-600 group-hover:underline">
                Open hairstyle try-on
              </span>
            </Link>
            <Link
              href="/try-on/glasses"
              className="group rounded-2xl border border-gray-100 bg-white p-8 transition hover:border-brand-200 hover:shadow-md dark:border-white/5 dark:bg-ink-900"
            >
              <Glasses className="h-8 w-8 text-brand-500" />
              <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Glasses try-on</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-white/50">
                Preview frame shapes on your selfie to match your face proportions.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-600 group-hover:underline">
                Open glasses try-on
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
