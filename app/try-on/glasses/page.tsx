import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StyleTryOn } from '@/components/tryon/StyleTryOn';

export const metadata: Metadata = {
  title: 'Glasses Try-On: Preview Frames on Your Face',
  description:
    'Free glasses try-on for personality grooming. Overlay frames on your selfie with on-device face detection.',
  alternates: { canonical: `${SITE_URL}/try-on/glasses` },
};

export default function GlassesTryOnPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream-50 dark:bg-ink-900">
        <section className="bg-ink-900 px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-white">Glasses Try-On</h1>
          <p className="mx-auto mt-3 max-w-lg text-white/65">
            Preview frames that complement your face proportions before you buy.
          </p>
        </section>
        <section className="px-4 py-12">
          <StyleTryOn mode="glasses" />
        </section>
      </main>
      <Footer />
    </>
  );
}
