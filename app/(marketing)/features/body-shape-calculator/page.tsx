import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FaqSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';
import { ShapeSilhouette } from '@/components/calculators/ShapeSilhouette';
import { BODY_SHAPE_PROFILES } from '@/lib/bodyShape';

const PAGE_URL = `${SITE_URL}/features/body-shape-calculator`;

export const metadata: Metadata = {
  title: 'Body Shapes Explained: Hourglass, Pear, Apple, Rectangle & Inverted Triangle',
  description:
    'A visual guide to the 5 body shapes, how the body shape calculator works, and the difference between body shape and body type.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Body Shapes Explained: Hourglass, Pear, Apple, Rectangle & Inverted Triangle',
    description: 'A visual guide to the 5 body shapes and how the calculator works.',
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Shapes Explained: Hourglass, Pear, Apple, Rectangle & Inverted Triangle',
    description: 'A visual guide to the 5 body shapes and how the calculator works.',
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
      'The goal is balance: add visual volume where your frame is narrower and streamline where it is wider. Each shape profile includes specific wear and avoid recommendations tailored to your proportions.',
  },
  {
    question: 'Is one shape better?',
    answer:
      'No, every body shape can look great with the right styling. This tool is about understanding your proportions so you can dress to highlight what you love, not about ranking shapes.',
  },
];

export default function BodyShapeFeaturePage() {
  return (
    <article>
      <FaqSchema items={FAQ_ITEMS} />
      <Breadcrumbs
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'About Body Shapes', href: '/features/body-shape-calculator' },
        ]}
      />
      <Reveal>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Body Shapes Explained: A Visual Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-white/60">
          Body shape describes the silhouette created by your bust, waist,
          and hip proportions. Unlike body type (which relates to
          metabolism), body shape is about styling and proportion.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {BODY_SHAPE_PROFILES.map((profile, i) => (
          <Reveal key={profile.shape} delay={i * 0.05}>
            <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-ink-800">
              <div className="shrink-0 rounded-xl bg-ink-900 p-3 dark:bg-ink-700">
                <ShapeSilhouette shape={profile.shape} active size={56} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{profile.shape}</h2>
                <p className="mt-1.5 text-sm text-gray-600 dark:text-white/60">{profile.unique}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <section aria-labelledby="type-vs-shape" className="mt-12">
          <h2 id="type-vs-shape" className="text-2xl font-bold text-gray-900 dark:text-white">
            Body shape vs. body type
          </h2>
          <p className="mt-3 text-gray-600 dark:text-white/60">
            Body <strong>type</strong> (ectomorph, mesomorph, endomorph)
            describes your metabolism and how easily you gain or lose weight
            and muscle. Body <strong>shape</strong> (hourglass, pear, apple,
            rectangle, inverted triangle) describes the silhouette created by
            your bust, waist, and hip measurements, useful for styling and
            fashion regardless of your body type.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="how-it-works" className="mt-12">
          <h2 id="how-it-works" className="text-2xl font-bold text-gray-900 dark:text-white">
            How the calculator works
          </h2>
          <p className="mt-3 text-gray-600 dark:text-white/60">
            Enter your bust/chest, waist, and hip measurements. We compare
            the ratios between them (how close your bust and hips are in
            width, and how much smaller your waist is) to classify your
            shape into one of five categories. Everything runs in your
            browser; no data is sent to a server.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="faq" className="mt-12">
          <h2 id="faq" className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-5">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.question}</h3>
                <p className="mt-1.5 text-gray-600 dark:text-white/60">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-600 to-pink-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Find your body shape now</h2>
          <p className="mt-2 text-white/90">
            Free, instant, and runs entirely in your browser.
          </p>
          <Link
            href="/body-shape-calculator"
            className="mt-5 inline-block rounded-lg bg-white px-6 py-2.5 font-semibold text-brand-700 transition-colors hover:bg-gray-100"
          >
            Try the Calculator &rarr;
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
