import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaceSymmetryTool } from '@/components/calculators/FaceSymmetryTool';

export const metadata: Metadata = {
  title: 'Face Balance Check: Grooming Symmetry (Not Attractiveness)',
  description:
    'Private face balance check for personality grooming, lighting, brows, and parting tips. Not an attractiveness test.',
  alternates: { canonical: `${SITE_URL}/face-symmetry` },
};

export default function FaceSymmetryPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream-50 dark:bg-ink-900">
        <section className="bg-ink-900 px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-white">Face Balance Check</h1>
          <p className="mx-auto mt-3 max-w-lg text-white/65">
            Measure facial balance to guide grooming, never sold as a beauty score.
          </p>
        </section>
        <section className="px-4 py-12">
          <FaceSymmetryTool />
        </section>
      </main>
      <Footer />
    </>
  );
}
