import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ColorAnalysisTool } from '@/components/calculators/ColorAnalysisTool';

export const metadata: Metadata = {
  title: 'Color Analysis for Clothing Presence | Rizz Assist',
  description:
    'Soft color season check for outfit colors that support personality grooming and photo presence.',
  alternates: { canonical: `${SITE_URL}/color-analysis` },
};

export default function ColorAnalysisPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream-50 dark:bg-ink-900">
        <section className="bg-ink-900 px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-white">Color Analysis</h1>
          <p className="mx-auto mt-3 max-w-lg text-white/65">
            Find clothing colors that help you present with clarity and confidence.
          </p>
        </section>
        <section className="px-4 py-12">
          <ColorAnalysisTool />
        </section>
      </main>
      <Footer />
    </>
  );
}
