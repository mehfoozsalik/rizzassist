import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaceShapeQuiz } from '@/components/calculators/FaceShapeQuiz';

const PAGE_URL = `${SITE_URL}/face-shape-quiz`;

export const metadata: Metadata = {
  title: 'Face Shape Quiz: Find Your Shape for Personality Grooming',
  description:
    'Quick 3-question face shape quiz for hairstyle and presence tips. No photo needed — built for personality improvement and grooming.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Face Shape Quiz | Rizz Assist',
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function FaceShapeQuizPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream-50 dark:bg-ink-900">
        <section className="bg-ink-900 px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-white">Face Shape Quiz</h1>
          <p className="mx-auto mt-3 max-w-lg text-white/65">
            Three quick questions — get a grooming-focused face shape estimate.
          </p>
        </section>
        <section className="mx-auto max-w-lg px-4 py-12">
          <FaceShapeQuiz />
          <p className="mt-8 text-center text-sm">
            Want higher accuracy?{' '}
            <Link href="/face-shape-detector" className="text-brand-600 underline">
              Use the AI detector
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
