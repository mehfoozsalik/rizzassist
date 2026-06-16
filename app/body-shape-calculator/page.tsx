import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { SkipToContent } from '@/components/seo/SkipToContent';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolWebAppSchema, FaqSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';
import { BodyShapeCalculator } from '@/components/calculators/BodyShapeCalculator';
import { ShapeSilhouette } from '@/components/calculators/ShapeSilhouette';
import { BODY_SHAPE_PROFILES } from '@/lib/bodyShape';

const PAGE_URL = `${SITE_URL}/body-shape-calculator`;

export const metadata: Metadata = {
  title: 'Body Shape Calculator | Hourglass, Pear, Apple, Rectangle or Inverted Triangle',
  description:
    'Discover your body shape in seconds. Enter bust, waist, and hip measurements to get personalized fashion and styling recommendations.',
  keywords: [
    'body shape calculator',
    'hourglass body shape',
    'pear shape body',
    'apple body shape',
    'body shape test',
    'what is my body shape',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Body Shape Calculator | Hourglass, Pear, Apple, Rectangle or Inverted Triangle',
    description:
      'Enter bust, waist, and hip measurements to get personalized fashion and styling recommendations.',
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Shape Calculator | Hourglass, Pear, Apple, Rectangle or Inverted Triangle',
    description:
      'Enter bust, waist, and hip measurements to get personalized fashion and styling recommendations.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Can my shape change?',
    answer:
      'Body shape is largely determined by skeletal structure and fat distribution patterns, which can shift somewhat with significant weight change, but the underlying proportions tend to stay fairly consistent.',
  },
  {
    question: 'How do I dress for my shape?',
    answer:
      'The goal is balance — add visual volume where your frame is narrower and streamline where it is wider. Each shape profile below includes specific wear and avoid recommendations.',
  },
  {
    question: 'Is one shape better?',
    answer:
      'No — every body shape can look great with the right styling. This tool is about understanding your proportions so you can dress to highlight what you love, not about ranking shapes.',
  },
];

export default function BodyShapeCalculatorPage() {
  return (
    <>
      <ToolWebAppSchema
        name="Body Shape Calculator"
        description="Free calculator that determines your body shape — Hourglass, Pear, Apple, Rectangle, or Inverted Triangle — based on bust, waist, and hip measurements."
        url={PAGE_URL}
        featureList={[
          'Bust, waist, hip ratio analysis',
          'Five body shape classifications',
          'Visual silhouette illustrations',
          'Personalized fashion tips',
          'Celebrity examples per shape',
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
                { name: 'Body Shape Calculator', href: '/body-shape-calculator' },
              ]}
            />
          </div>
        </div>

        <section className="bg-ink-900 px-4 py-12 text-center sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Body Shape Calculator
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/65">
                Enter your bust, waist, and hip measurements to discover your
                body shape — Hourglass, Pear, Apple, Rectangle, or Inverted
                Triangle — with fashion tips made for your proportions.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream-50 px-4 py-12 sm:py-16">
          <BodyShapeCalculator />
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-2xl font-bold text-gray-900">What Is a Body Shape?</h2>
              <p className="mt-3 text-gray-600">
                Body shape describes the silhouette created by your bust,
                waist, and hip proportions — Hourglass, Pear, Apple,
                Rectangle, or Inverted Triangle. Unlike body type (which
                relates to metabolism and muscle gain), body shape is purely
                about proportion, and it&apos;s the single most useful thing to
                know when choosing flattering cuts, necklines, and silhouettes.
              </p>
            </Reveal>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {BODY_SHAPE_PROFILES.map((profile, i) => (
                <Reveal key={profile.shape} delay={i * 0.05}>
                  <div className="flex h-full gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="shrink-0 rounded-xl bg-ink-900 p-3">
                      <ShapeSilhouette shape={profile.shape} active size={48} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{profile.shape}</h3>
                      <p className="mt-1.5 text-sm text-gray-600">{profile.unique}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Why Dressing for Your Shape Matters
              </h2>
              <ul className="mt-4 space-y-2.5 text-gray-600">
                {[
                  'Balance proportions — add visual volume where your frame is narrower and streamline where it is wider',
                  'Shop with confidence — know which necklines, waistlines, and cuts to look for before you buy',
                  'Skip the trial and error — stop guessing why certain styles never seem to fit right',
                  'Style for any shape — every body shape can look great with the right approach',
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
                Want styling tips for every shape?{' '}
                <Link
                  href="/features/body-shape-calculator"
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
