import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { SkipToContent } from '@/components/seo/SkipToContent';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolWebAppSchema, FaqSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';
import { EyeShapeDetector } from '@/components/calculators/EyeShapeDetector';
import { EYE_SHAPE_GUIDE } from '@/lib/eyeShapes';

const PAGE_URL = `${SITE_URL}/eye-shape-detector`;

export const metadata: Metadata = {
  title: 'Eye Shape Detector | AI-Powered Eye Shape Analysis & Makeup Tips',
  description:
    'Upload a photo and let AI identify your eye shape — almond, round, hooded, monolid, and more — with expert makeup tips tailored to your eyes.',
  keywords: [
    'eye shape detector',
    'what is my eye shape',
    'eye shape analyzer',
    'hooded eyes makeup',
    'almond eye shape',
    'monolid makeup tips',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Eye Shape Detector | AI-Powered Eye Shape Analysis & Makeup Tips',
    description:
      'Upload a photo and let AI identify your eye shape with expert makeup tips tailored to your eyes.',
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eye Shape Detector | AI-Powered Eye Shape Analysis & Makeup Tips',
    description:
      'Upload a photo and let AI identify your eye shape with expert makeup tips tailored to your eyes.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Can I change my eye shape?',
    answer:
      'Your underlying eye shape is anatomical and stays fixed, but makeup techniques — like eyeliner placement and eyeshadow blending — can visually enhance or soften how your eye shape appears.',
  },
  {
    question: "What's the most common eye shape?",
    answer:
      'Almond eyes are generally considered the most common eye shape, though most people have a unique combination of traits like hooding, tilt, and spacing.',
  },
  {
    question: 'Does eye shape affect makeup?',
    answer:
      'Yes — the techniques that make eyeliner and eyeshadow look best vary significantly by eye shape. What enhances hooded eyes can look very different from what works for round or upturned eyes.',
  },
];

export default function EyeShapeDetectorPage() {
  return (
    <>
      <ToolWebAppSchema
        name="Eye Shape Detector"
        description="AI-powered tool that analyzes a photo to identify eye shape and provide tailored makeup recommendations."
        url={PAGE_URL}
        featureList={[
          'AI vision-based eye shape detection',
          '10 eye shape categories',
          'Personalized makeup tips',
          'Eyeliner and eyeshadow technique recommendations',
          'Famous examples per eye shape',
          'No login required',
        ]}
      />
      <FaqSchema items={FAQ_ITEMS} />
      <SkipToContent />
      <Navbar />

      <main id="main-content">
        <div className="border-b border-gray-100 bg-white px-4 py-3">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              crumbs={[
                { name: 'Home', href: '/' },
                { name: 'Eye Shape Detector', href: '/eye-shape-detector' },
              ]}
            />
          </div>
        </div>

        <section className="bg-ink-900 px-4 py-12 text-center sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Eye Shape Detector
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/65">
                Upload a close-up photo and our AI will identify your eye
                shape — almond, round, hooded, monolid, and more — with
                expert makeup tips made for your eyes.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream-50 px-4 py-12 sm:py-16">
          <EyeShapeDetector />
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-2xl font-bold text-gray-900">
                What Is Eye Shape Detection?
              </h2>
              <p className="mt-3 text-gray-600">
                Eye shape is determined by lid structure, crease depth, corner
                tilt, and spacing — and it&apos;s one of the biggest factors in
                whether a makeup look actually suits you. Our AI analyzes
                your photo against 10 recognized eye shape categories and
                returns tailored eyeliner, eyeshadow, and color
                recommendations for your specific eyes.
              </p>
            </Reveal>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {EYE_SHAPE_GUIDE.map((entry, i) => (
                <Reveal key={entry.name} delay={i * 0.03}>
                  <div className="h-full rounded-2xl border border-gray-200 bg-white p-4">
                    <h3 className="font-semibold text-gray-900">{entry.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{entry.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Why Your Eye Shape Matters for Makeup
              </h2>
              <ul className="mt-4 space-y-2.5 text-gray-600">
                {[
                  'Apply eyeliner where it actually enhances your shape, instead of guessing',
                  'Choose eyeshadow placement and blending techniques suited to your lid space',
                  'Avoid techniques that work for influencers but not your specific eye shape',
                  'Get a starting point — then adjust the tips to your personal style',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="mt-4 space-y-5">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question}>
                    <h3 className="font-semibold text-gray-900">{item.question}</h3>
                    <p className="mt-1.5 text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <p className="mt-10 text-center text-sm text-gray-500">
                Want makeup tips for every eye shape?{' '}
                <Link
                  href="/features/eye-shape-detector"
                  className="font-medium text-brand-600 underline hover:no-underline"
                >
                  Read the full guide
                </Link>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
