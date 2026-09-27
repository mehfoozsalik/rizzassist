import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolWebAppSchema, FaqSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';
import { BodyShapeCalculator } from '@/components/calculators/BodyShapeCalculator';
import { ShapeSilhouette } from '@/components/calculators/ShapeSilhouette';
import { BODY_SHAPE_PROFILES } from '@/lib/bodyShape';

const PAGE_URL = `${SITE_URL}/body-shape-calculator`;

export const metadata: Metadata = {
  title: 'Body Shape Calculator for Men & Women | Free Body Figure Calculator',
  description:
    'Free body shape calculator for men and women. Enter chest/bust, waist, and hip measurements to find your body figure — hourglass, pear, apple, rectangle, or inverted triangle — with style tips.',
  keywords: [
    'body shape calculator',
    'body shape calculator male',
    'body shape calculator men',
    'body shape calculator for male',
    'body shape calculator for men',
    'body shape male calculator',
    'body shape calculator for women',
    'body figure calculator',
    'body calculator',
    'body shape type calculator',
    'body proportions calculator',
    'body shape visualizer',
    'what is my body shape',
    'am I hourglass or pear',
    'hourglass body shape',
    'pear shape body',
    'apple body shape',
    'body shape test',
    'inverted triangle body shape',
    'rectangle body shape',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Body Shape Calculator for Men & Women | Free Body Figure Calculator | Rizz Assist',
    description:
      'Free body shape calculator for men and women. Enter chest/bust, waist, and hip measurements to find your body figure — hourglass, pear, apple, rectangle, or inverted triangle — with style tips.',
    url: PAGE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rizz Assist body shape calculator for men and women showing hourglass, pear, apple, and rectangle figure results',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Shape Calculator for Men & Women | Free Body Figure Calculator | Rizz Assist',
    description:
      'Free body shape calculator for men and women. Enter chest/bust, waist, and hip measurements to find your body figure — hourglass, pear, apple, rectangle, or inverted triangle — with style tips.',
    images: ['/twitter-image.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: 'Does this body shape calculator work for men?',
    answer:
      'Yes. Men use the same chest, waist, and hip ratios — enter chest instead of bust. Common male results include inverted triangle, rectangle, and oval/apple proportions, with style tips that fit menswear cuts.',
  },
  {
    question: 'What is a body figure calculator?',
    answer:
      'A body figure calculator (also called a body shape calculator) maps your measurements to a silhouette like hourglass, pear, apple, rectangle, or inverted triangle so you can dress for your proportions.',
  },
  {
    question: 'Am I an hourglass or pear?',
    answer:
      'Hourglass has a defined waist with bust and hips roughly balanced. Pear (triangle) has hips noticeably wider than the bust/chest. Enter your three measurements above for an instant answer.',
  },
  {
    question: 'Can my shape change?',
    answer:
      'Body shape is largely determined by skeletal structure and fat distribution patterns, which can shift somewhat with significant weight change, but the underlying proportions tend to stay fairly consistent.',
  },
  {
    question: 'How do I dress for my shape?',
    answer:
      'The goal is balance: add visual volume where your frame is narrower and streamline where it is wider. Each shape profile below includes specific wear and avoid recommendations.',
  },
  {
    question: 'Is one shape better?',
    answer:
      'No, every body shape can look great with the right styling. This tool is about understanding your proportions so you can dress to highlight what you love, not about ranking shapes.',
  },
];

export default function BodyShapeCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', item: SITE_URL },
          { name: 'Body Shape Calculator', item: PAGE_URL },
        ]}
      />
      <ToolWebAppSchema
        name="Body Shape Calculator for Men and Women"
        description="Free body shape and body figure calculator for men and women. Determines Hourglass, Pear, Apple, Rectangle, or Inverted Triangle from chest/bust, waist, and hip measurements."
        url={PAGE_URL}
        featureList={[
          'Body shape calculator for men and women',
          'Chest/bust, waist, hip ratio analysis',
          'Body figure and proportions results',
          'Five body shape classifications',
          'Visual silhouette illustrations',
          'Personalized fashion tips',
          'Celebrity examples per shape',
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
                { name: 'Body Shape Calculator', href: '/body-shape-calculator' },
              ]}
            />
          </div>
        </div>

        <section className="bg-ink-900 px-4 py-12 text-center sm:py-16 dark:bg-ink-900">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Body Shape Calculator for Men &amp; Women
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/65">
                Free body figure calculator: enter chest or bust, waist, and hip
                measurements to find your body shape (Hourglass, Pear, Apple,
                Rectangle, or Inverted Triangle) with fashion tips for your
                proportions.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream-50 px-4 py-12 sm:py-16 dark:bg-ink-800">
          <BodyShapeCalculator />
        </section>

        <section className="bg-white px-4 py-12 sm:py-16 dark:bg-ink-900">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Is a Body Shape Calculator?</h2>
              <p className="mt-3 text-gray-600 dark:text-white/60">
                A body shape calculator (or body figure calculator) maps your
                chest/bust, waist, and hip proportions to a silhouette:
                Hourglass, Pear, Apple, Rectangle, or Inverted Triangle. It
                works for men and women — men typically enter chest instead of
                bust. Unlike body type (metabolism and muscle gain), body shape
                is about proportion, and it&apos;s the most useful signal when
                choosing flattering cuts, necklines, and silhouettes.
              </p>
            </Reveal>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {BODY_SHAPE_PROFILES.map((profile, i) => (
                <Reveal key={profile.shape} delay={i * 0.05}>
                  <div className="flex h-full gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/5 dark:bg-ink-800">
                    <div className="shrink-0 rounded-xl bg-ink-900 p-3 dark:bg-ink-700">
                      <ShapeSilhouette shape={profile.shape} active size={48} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{profile.shape}</h3>
                      <p className="mt-1.5 text-sm text-gray-600 dark:text-white/60">{profile.unique}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
                Why Dressing for Your Shape Matters
              </h2>
              <ul className="mt-4 space-y-2.5 text-gray-600 dark:text-white/60">
                {[
                  'Balance proportions: add visual volume where your frame is narrower and streamline where it is wider',
                  'Shop with confidence: know which necklines, waistlines, and cuts to look for before you buy',
                  'Skip the trial and error: stop guessing why certain styles never seem to fit right',
                  'Style for any shape: every body shape can look great with the right approach',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <div className="mt-4 space-y-5">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question}>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.question}</h3>
                    <p className="mt-1.5 text-gray-600 dark:text-white/60">{item.answer}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <p className="mt-10 text-center text-sm text-gray-500 dark:text-white/40">
                Want styling tips for every shape?{' '}
                <Link
                  href="/features/body-shape-calculator"
                  className="font-medium text-brand-600 underline hover:no-underline"
                >
                  Read the body shape guide
                </Link>
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-6 border-t border-gray-100 pt-6 text-center text-sm text-gray-500 dark:border-white/5 dark:text-white/40">
                Also try:{' '}
                <Link href="/body-type-calculator" className="font-medium text-brand-600 underline hover:no-underline">
                  Somatotype checker
                </Link>
                {' · '}
                <Link href="/eye-shape-detector" className="font-medium text-brand-600 underline hover:no-underline">
                  Eye matching tool
                </Link>
                {' · '}
                <Link href="/" className="font-medium text-brand-600 underline hover:no-underline">
                  Photo rizz report
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
