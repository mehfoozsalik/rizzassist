import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StyleTryOn } from '@/components/tryon/StyleTryOn';

export const metadata: Metadata = {
  title: 'AI Hairstyle Try-On: Preview Cuts for Your Face Shape',
  description:
    'Free hairstyle try-on on your photo. Detect face shape and preview grooming cuts privately in-browser — no sign-up.',
  alternates: { canonical: `${SITE_URL}/try-on/hairstyle` },
};

export default function HairstyleTryOnPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream-50 dark:bg-ink-900">
        <section className="bg-ink-900 px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-white">AI Hairstyle Try-On</h1>
          <p className="mx-auto mt-3 max-w-lg text-white/65">
            See how cuts sit on your face before the barber — illustration overlays, fully private.
          </p>
        </section>
        <section className="px-4 py-12">
          <StyleTryOn mode="hairstyle" />
        </section>
      </main>
      <Footer />
    </>
  );
}
