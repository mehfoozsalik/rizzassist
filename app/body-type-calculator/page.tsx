import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { SkipToContent } from '@/components/seo/SkipToContent';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolWebAppSchema, FaqSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';
import { BodyTypeCalculator } from '@/components/calculators/BodyTypeCalculator';
import { BODY_TYPE_PROFILES } from '@/lib/bodyType';

const PAGE_URL = `${SITE_URL}/body-type-calculator`;

export const metadata: Metadata = {
  title: 'Body Type Calculator for Men and Women | Rizz Assist',
  description:
    "Free body type calculator for men and women. Find out if you're an ectomorph, mesomorph, or endomorph and get fitness, diet, and style tips tailored to your build.",
  keywords: [
    'body type calculator',
    'body type calculator female',
    'body shape type calculator',
    'body type calculator for women',
    'body types calculator',
    'body type calculator male',
    'body type calculator men',
    'kibbe body type calculator',
    'body type calculator women',
    'ectomorph mesomorph endomorph',
    'somatotype calculator',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Body Type Calculator for Men and Women | Rizz Assist',
    description:
      "Free body type calculator for men and women. Find out if you're an ectomorph, mesomorph, or endomorph and get fitness, diet, and style tips tailored to your build.",
    url: PAGE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rizz Assist Body Type Calculator for men and women showing ectomorph, mesomorph, and endomorph results',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Type Calculator for Men and Women | Rizz Assist',
    description:
      "Free body type calculator for men and women. Find out if you're an ectomorph, mesomorph, or endomorph and get fitness, diet, and style tips tailored to your build.",
    images: ['/twitter-image.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is my body type calculator?',
    answer:
      "This is a free tool that classifies you as an Ectomorph, Mesomorph, or Endomorph based on your measurements. Enter your height, weight, and key proportions, and the calculator returns your body type with personalized fitness and style tips instantly.",
  },
  {
    question: 'How do I calculate my body type?',
    answer:
      'Enter your height, weight, shoulder width, chest, waist, and hip measurements into the form above. The calculator scores your BMI alongside your shoulder-to-hip ratio and returns your somatotype with tips tailored to your build.',
  },
  {
    question: 'How is body type calculated for women vs men?',
    answer:
      'The three somatotypes (Ectomorph, Mesomorph, Endomorph) apply to all bodies, but typical proportions differ by sex. Women tend to carry more fat around the hips, which affects the hip-to-waist comparison. The calculator accounts for this when you select your sex in the form, so results are relevant for both men and women.',
  },
  {
    question: 'Can body type change?',
    answer:
      'Your underlying skeletal frame stays fairly fixed, but body composition (muscle and fat distribution) can shift significantly with training and diet. Many people show traits of more than one type.',
  },
  {
    question: 'Is BMI accurate?',
    answer:
      "BMI is a useful starting point but doesn't account for muscle mass, bone density, or fat distribution. This calculator combines BMI with shoulder-to-hip proportions for a more complete picture.",
  },
  {
    question: 'What workouts suit each type?',
    answer:
      'Ectomorphs benefit from heavy compound lifts with longer rest; mesomorphs thrive on varied strength + cardio mixes; endomorphs see the best results from combining strength training with frequent cardio.',
  },
];

export default function BodyTypeCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', item: SITE_URL },
          { name: 'Body Type Calculator', item: PAGE_URL },
        ]}
      />
      <ToolWebAppSchema
        name="Body Type Calculator"
        description="Free calculator that determines whether you're an ectomorph, mesomorph, or endomorph based on your measurements."
        url={PAGE_URL}
        featureList={[
          'BMI-based body type detection',
          'Ectomorph, Mesomorph, Endomorph classification',
          'Personalized fitness recommendations',
          'Personalized diet suggestions',
          'Clothing and style tips',
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
                { name: 'Body Type Calculator', href: '/body-type-calculator' },
              ]}
            />
          </div>
        </div>

        <section className="bg-ink-900 px-4 py-12 text-center sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Body Type Calculator
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/65">
                Enter your measurements to find out if you&apos;re an Ectomorph,
                Mesomorph, or Endomorph. Works for men and women, with fitness,
                diet, and style tips tailored to your build.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream-50 px-4 py-12 sm:py-16">
          <BodyTypeCalculator />
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-2xl font-bold text-gray-900">What Are Body Types?</h2>
              <p className="mt-3 text-gray-600">
                Body type theory groups people into three broad somatotypes:
                Ectomorph, Mesomorph, and Endomorph, based on skeletal frame,
                metabolism, and how the body tends to build muscle and store
                fat. Knowing yours helps you choose training and nutrition
                approaches that actually fit your build, instead of following
                generic advice.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Looking for proportion-based or Kibbe-style results? The{' '}
                <Link
                  href="/body-shape-calculator"
                  className="font-medium text-brand-600 underline hover:no-underline"
                >
                  Body Shape Calculator
                </Link>
                {' '}covers bust, waist, and hip ratios, which overlaps with how Kibbe body types assess silhouette and frame.
              </p>
            </Reveal>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {BODY_TYPE_PROFILES.map((profile, i) => (
                <Reveal key={profile.type} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-gray-200 bg-white p-5">
                    <h3 className="font-semibold text-gray-900">{profile.type}</h3>
                    <p className="mt-1.5 text-sm text-gray-600">{profile.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                Why Knowing Your Body Type Helps
              </h2>
              <ul className="mt-4 space-y-2.5 text-gray-600">
                {[
                  'Train smarter: the right rep ranges, volume, and rest periods differ by body type',
                  'Eat with purpose: calorie and macro needs vary significantly between types',
                  'Dress to your build: certain cuts and fabrics flatter different frames',
                  'Set realistic expectations: your genetics influence how fast you gain or lose weight',
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
                Want the full breakdown of each type?{' '}
                <Link
                  href="/features/body-type-calculator"
                  className="font-medium text-brand-600 underline hover:no-underline"
                >
                  Read the full guide
                </Link>
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-6 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
                Also try:{' '}
                <Link href="/body-shape-calculator" className="font-medium text-brand-600 underline hover:no-underline">
                  Body Shape Calculator
                </Link>
                {' · '}
                <Link href="/eye-shape-detector" className="font-medium text-brand-600 underline hover:no-underline">
                  Eye Shape Detector
                </Link>
                {' · '}
                <Link href="/" className="font-medium text-brand-600 underline hover:no-underline">
                  AI Look Analyzer
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
