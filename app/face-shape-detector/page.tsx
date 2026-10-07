import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolWebAppSchema, FaqSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';
import { FaceShapeDetector } from '@/components/calculators/FaceShapeDetector';
import { AppearanceCrossSell } from '@/components/assessments/AppearanceCrossSell';
import { FACE_SHAPE_PROFILES } from '@/lib/faceShape';

const PAGE_URL = `${SITE_URL}/face-shape-detector`;

export const metadata: Metadata = {
  title: 'Face Shape Detector: Free AI Face Shape Finder for Grooming',
  description:
    'Free AI face shape detector for personality grooming. Upload a selfie to find oval, round, square, heart, diamond, oblong, or triangle — plus hairstyle, glasses, and presence tips. Private. No login.',
  keywords: [
    'face shape detector',
    'what is my face shape',
    'AI face shape finder',
    'face shape hairstyles',
    'face shape glasses',
    'face shape grooming',
    'personality grooming',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Face Shape Detector: Free AI Face Shape Finder | Rizz Assist',
    description:
      'Detect your face shape in seconds and get hairstyle, glasses, and personality-presence grooming tips. Runs privately in your browser.',
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is my face shape?',
    answer:
      'Your face shape comes from forehead, cheekbone, and jaw widths plus face length. Rizz Assist detects oval, round, square, heart, diamond, oblong, and triangle — then maps grooming tips that improve how you present yourself.',
  },
  {
    question: 'Is this for personality grooming or vanity scoring?',
    answer:
      'Strictly personality improvement and grooming. We recommend hair, glasses, beard, and presence tips so you look intentional — we do not sell attractiveness scores.',
  },
  {
    question: 'Is my photo uploaded?',
    answer:
      'No. Face landmarks are processed on your device with MediaPipe. Your photo is not stored on our servers for detection.',
  },
];

export default function FaceShapeDetectorPage() {
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', item: SITE_URL },
          { name: 'Face Shape Detector', item: PAGE_URL },
        ]}
      />
      <ToolWebAppSchema
        name="AI Face Shape Detector"
        description="Free on-device face shape detector with hairstyle, glasses, and personality grooming recommendations."
        url={PAGE_URL}
        featureList={[
          'AI face shape detection',
          'Hairstyle recommendations',
          'Glasses frame tips',
          'Personality presence coaching',
          'Camera or upload',
          'No login required',
        ]}
      />
      <FaqSchema items={FAQ_ITEMS} />
      <Navbar />
      <main id="main-content">
        <div className="border-b border-gray-100 bg-white px-4 py-3 dark:border-white/5 dark:bg-ink-900">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              crumbs={[
                { name: 'Home', href: '/' },
                { name: 'Face Shape Detector', href: '/face-shape-detector' },
              ]}
            />
          </div>
        </div>

        <section className="bg-ink-900 px-4 py-12 text-center sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Free Face Shape Detector for Personality Grooming
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/65">
                Upload a selfie or use your camera. On-device AI finds your face
                shape and gives hairstyle, glasses, and presence tips — so you
                present yourself with intention.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream-50 px-4 py-12 sm:py-16 dark:bg-ink-800">
          <FaceShapeDetector />
        </section>

        <section className="bg-white px-4 py-14 dark:bg-ink-900">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                The 7 face shapes for smarter grooming
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-white/50">
                Each shape suggests different hair, frames, and presence habits.
                Detection is the shortcut — grooming is the real upgrade.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FACE_SHAPE_PROFILES.map((p) => (
                <article
                  key={p.shape}
                  className="rounded-2xl border border-gray-100 bg-cream-50 p-5 dark:border-white/5 dark:bg-ink-800"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{p.shape}</h3>
                  <p className="mt-1 text-xs font-medium text-brand-600">{p.tagline}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-white/60">{p.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-sm">
              <Link href="/tools" className="font-medium text-brand-600 underline">
                Browse all tools
              </Link>
              {' · '}
              <Link href="/personality-test" className="font-medium text-brand-600 underline">
                Personality test
              </Link>
              {' · '}
              <Link href="/try-on" className="font-medium text-brand-600 underline">
                Style try-on
              </Link>
            </p>
            <AppearanceCrossSell
              relatedSlugs={[
                'eye-shape-detector',
                'style-assessment',
                'grooming-assessment',
                'first-impression-test',
                'confidence-test',
              ]}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
