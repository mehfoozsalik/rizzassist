import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolsHub } from '@/components/assessments/ToolsHub';

export const metadata: Metadata = {
  title: 'Explore All Tools — Personality, Confidence & Appearance',
  description:
    'Browse RizzAssist tools: personality tests, confidence assessments, social skills, rizz & dating quizzes, face shape, eye shape, and body calculators.',
  alternates: { canonical: `${SITE_URL}/tools` },
  openGraph: {
    title: 'Explore All Tools | Rizz Assist',
    description:
      'Personality, confidence, social skills, dating, and appearance tools in one self-improvement platform.',
    url: `${SITE_URL}/tools`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="bg-ink-900 px-4 py-14 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Explore RizzAssist Tools
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            Understand yourself. Improve your personality. Build confidence. Browse
            free assessments and appearance tools with full results and recommendations.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/personality-test"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
            >
              Start Personality Test
            </Link>
            <Link
              href="/report"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5"
            >
              Personality Report
            </Link>
            <Link
              href="/profile"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5"
            >
              My Profile
            </Link>
          </div>
        </section>
        <section className="bg-cream-50 px-4 py-14 dark:bg-ink-800">
          <div className="mx-auto max-w-5xl">
            <ToolsHub />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
