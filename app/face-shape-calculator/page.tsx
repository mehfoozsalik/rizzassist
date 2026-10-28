import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaceShapeCalculator } from '@/components/calculators/FaceShapeCalculator';

const PAGE_URL = `${SITE_URL}/face-shape-calculator`;

export const metadata: Metadata = {
  title: 'Face Shape Calculator: Measure Your Face for Grooming Tips',
  description:
    'Free face shape calculator from forehead, cheekbone, jaw, and length measurements. Get personality grooming tips for hair and glasses, no photo required.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Face Shape Calculator | Rizz Assist',
    description: 'Calculate your face shape from four measurements for smarter grooming.',
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function FaceShapeCalculatorPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream-50 dark:bg-ink-900">
        <section className="bg-ink-900 px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Face Shape Calculator</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/65">
            Prefer a tape measure? Enter four measurements for a face shape result and grooming direction.
          </p>
        </section>
        <section className="px-4 py-12">
          <FaceShapeCalculator />
          <p className="mt-8 text-center text-sm">
            <Link href="/face-shape-detector" className="text-brand-600 underline">
              Or detect from a photo
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
