import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: {
    absolute:
      'How Rizz Assist Works: AI Pickup Lines, Style & Look Analysis Explained',
  },
  description:
    "Learn how Rizz Assist's AI analyzes your photo to generate pickup lines, style tips, shade recommendations, and face orientation feedback in seconds. No login required.",
  openGraph: {
    title: 'How Rizz Assist Works: AI Pickup Lines, Style & Look Analysis Explained',
    description:
      "Learn how Rizz Assist's AI analyzes your photo to generate pickup lines, style tips, shade recommendations, and face orientation feedback in seconds. No login required.",
    url: `${SITE_URL}/how-it-works`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Rizz Assist Works: AI Pickup Lines, Style & Look Analysis Explained',
    description:
      "Learn how Rizz Assist's AI analyzes your photo to generate pickup lines, style tips, shade recommendations, and face orientation feedback in seconds.",
  },
  alternates: { canonical: `${SITE_URL}/how-it-works` },
};

const STEPS = [
  {
    title: 'Step 1: Upload Your Photo',
    text: 'Use a recent, well-lit photo where your face and outfit are visible. Selfies, half-body, or full-body shots all work. Drag and drop or browse to upload. Accepted: JPG, PNG, WebP up to 5MB.',
  },
  {
    title: 'Step 2: AI Analyzes Your Look',
    text: "Our vision model scans facial structure, grooming, expression, clothing colors, fit, and overall presentation. It identifies face shape for shades matching, detects style signals, and reads the confidence level you're projecting.",
  },
];

const REPORT_ITEMS = [
  ['Rizz Score', 'an overall impression rating'],
  ['Style & Outfit Tips', 'specific suggestions for your clothing'],
  ['Shades Recommendations', 'frame styles matched to your face shape'],
  ['Face Orientation Tips', 'angles and expressions that work best for you'],
  ['Pickup Lines', 'original lines generated for your vibe'],
  ['Confidence Tips', 'actionable grooming and mindset upgrades'],
];

export default function HowItWorksPage() {
  return (
    <article>
      <Breadcrumbs
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'How It Works', href: '/how-it-works' },
        ]}
      />
      <Reveal>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          How Rizz Assist Analyzes Your Look
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-white/60">
          Rizz Assist turns a single photo into a full Rizz Report, covering
          your style, grooming, best angles, shades that suit your face shape,
          personalized pickup lines, and the vibe you project. Here&apos;s exactly
          how it works.
        </p>
      </Reveal>

      <div className="mt-10 space-y-6">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.06}>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-ink-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h2>
              <p className="mt-2 text-gray-600 dark:text-white/60">{step.text}</p>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-ink-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Step 3: Your Rizz Report Is Generated
            </h2>
            <p className="mt-2 text-gray-600 dark:text-white/60">You receive:</p>
            <ul className="mt-3 space-y-2 text-gray-600 dark:text-white/60">
              {REPORT_ITEMS.map(([label, desc]) => (
                <li key={label} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-white">{label}</strong>
                    : {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-ink-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Step 4: Apply &amp; Level Up
            </h2>
            <p className="mt-2 text-gray-600 dark:text-white/60">
              Use the tips, try the lines, experiment with the looks. Come back
              anytime: your photo is never stored, so every session is fresh.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <section aria-labelledby="privacy-note" className="mt-12">
          <h2 id="privacy-note" className="text-2xl font-bold text-gray-900 dark:text-white">
            Your privacy comes first
          </h2>
          <p className="mt-3 text-gray-600 dark:text-white/60">
            Your photo is processed in memory only and never written to a
            database or shared. See our{' '}
            <Link href="/privacy" className="font-medium text-brand-600 underline hover:no-underline">
              Privacy Policy
            </Link>{' '}
            for full details.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-600 to-orange-500 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Ready? Upload your photo now</h2>
          <p className="mt-2 text-white/90">
            Get your Rizz Report in seconds: free, no login.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-white px-6 py-2.5 font-semibold text-brand-700 transition-colors hover:bg-gray-100"
          >
            Get Your Rizz Report &rarr;
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
