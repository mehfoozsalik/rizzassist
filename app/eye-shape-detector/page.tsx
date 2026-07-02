import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { SkipToContent } from '@/components/seo/SkipToContent';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ToolWebAppSchema, FaqSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';
import { EyeShapeDetector } from '@/components/calculators/EyeShapeDetector';
import { EYE_SHAPE_GUIDE } from '@/lib/eyeShapes';

const PAGE_URL = `${SITE_URL}/eye-shape-detector`;

export const metadata: Metadata = {
  title: 'Eye Shape Chart and Detector: Find Your Eye Shape Free | Rizz Assist',
  description:
    'Use our free eye shape chart to identify your eye shapes and finally answer "what\'s my eye shape?" Upload a photo for instant AI detection, plus expert makeup tips for every eye type.',
  keywords: [
    'eye shape chart',
    'eye shapes',
    "what's my eye shape",
    'eye type chart',
    'eye shape detector',
    'find eye shape',
    'different eye styles',
    'eyeball shapes',
    'eye shape analyzer',
    'almond eye shape',
    'hooded eyes makeup',
    'monolid makeup tips',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Eye Shape Chart and Detector: Find Your Eye Shape Free | Rizz Assist',
    description:
      'Use our free eye shape chart to identify your eye shapes and finally answer "what\'s my eye shape?" Upload a photo for instant AI detection, plus expert makeup tips for every eye type.',
    url: PAGE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rizz Assist Eye Shape Chart and Detector showing AI-powered eye shape analysis and makeup tips',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eye Shape Chart and Detector: Find Your Eye Shape Free | Rizz Assist',
    description:
      'Use our free eye shape chart to identify your eye shapes and finally answer "what\'s my eye shape?" Upload a photo for instant AI detection, plus expert makeup tips for every eye type.',
    images: ['/twitter-image.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: "What's my eye shape?",
    answer:
      "Your eye shape is determined by how your eyelid, crease, and corner are structured. Upload a close-up photo above and our AI will identify it for you instantly, matching it against the eye shape chart. Common results include almond, round, hooded, monolid, upturned, and downturned.",
  },
  {
    question: 'What type of eyes do I have?',
    answer:
      'There are six main eyes types people identify with: almond, round, monolid, hooded, upturned, and downturned. Spacing also plays a role, so you might be wide-set or close-set on top of your primary shape. The detector above analyzes all of these factors from your photo.',
  },
  {
    question: 'How do I find my eye shape?',
    answer:
      'The easiest way to find your eye shape is to upload a clear, well-lit face photo to the detector above. Alternatively, look straight into a mirror and check whether the outer corners point up or down, whether you have a visible crease, and how much white shows above and below your iris.',
  },
  {
    question: 'Can I change my eye shape?',
    answer:
      'Your underlying eye shape is anatomical and stays fixed, but makeup techniques like eyeliner placement and eyeshadow blending can visually enhance or soften how the look of your eyes appears.',
  },
  {
    question: "What's the most common eye shape?",
    answer:
      'Almond eyes are generally considered the most common eye shape, though most people have a unique combination of traits like hooding, tilt, and spacing.',
  },
  {
    question: 'Does eye shape affect makeup?',
    answer:
      'Yes, the techniques that make eyeliner and eyeshadow look best vary significantly by eye shape. What enhances hooded eyes can look very different from what works for round or upturned eyes.',
  },
];

export default function EyeShapeDetectorPage() {
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', item: SITE_URL },
          { name: 'Eye Shape Detector', item: PAGE_URL },
        ]}
      />
      <ToolWebAppSchema
        name="Eye Shape Detector"
        description="AI-powered tool that analyzes a photo to identify eye shape and provide tailored makeup recommendations, with a complete eye shape chart."
        url={PAGE_URL}
        featureList={[
          'AI vision-based eye shape detection',
          'Complete eye shape chart with 10 categories',
          'Personalized makeup tips per shape',
          'Eyeliner and eyeshadow technique recommendations',
          'Famous examples per eye shape',
          'No login required',
        ]}
      />
      <FaqSchema items={FAQ_ITEMS} />
      <SkipToContent />
      <Navbar />

      <main id="main-content">
        <div className="border-b border-gray-100 bg-white px-4 py-3 dark:border-white/5 dark:bg-ink-900">
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
                Eye Shape Detector and Chart
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/65">
                Upload a close-up photo and our AI will identify your eye
                shape from the full eye type chart, almond, round, hooded, monolid,
                and more, with expert makeup tips made for your eyes.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream-50 px-4 py-12 sm:py-16 dark:bg-ink-800">
          <EyeShapeDetector />
        </section>

        <section className="bg-white px-4 py-12 sm:py-16 dark:bg-ink-900">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                What Is Eye Shape Detection?
              </h2>
              <p className="mt-3 text-gray-600 dark:text-white/60">
                Eye shape is determined by lid structure, crease depth, corner
                tilt, and spacing, and it is one of the biggest factors in
                whether a makeup look actually suits you. Our AI analyzes
                your photo against the full eye type chart with 10 recognized
                categories and returns tailored eyeliner, eyeshadow, and color
                recommendations. Whether you want to find your eye shape from a
                photo or just understand different eye styles, the results are
                matched to your specific eyes.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
                Eye Shape Chart: All Eye Types Explained
              </h2>
              <p className="mt-3 text-gray-600 dark:text-white/60">
                Use this eye shape chart as a reference before or after running the detector.
                Each entry describes the defining characteristics of that eye shape, which
                you can compare to the look of your eyes in a mirror or photo.
              </p>
            </Reveal>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {EYE_SHAPE_GUIDE.map((entry, i) => (
                <Reveal key={entry.name} delay={i * 0.03}>
                  <div className="h-full rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/5 dark:bg-ink-800">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{entry.name}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-white/60">{entry.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
                Why Knowing Your Eye Shape Matters for Makeup
              </h2>
              <p className="mt-3 text-gray-600 dark:text-white/60">
                Different eye styles call for different approaches. What flatters almond eyes
                may close off round eyes, and techniques designed for monolids often look
                heavy on hooded lids. Knowing your shape is the starting point for makeup
                that actually works with the natural look of your eyes, not against them.
              </p>
              <ul className="mt-4 space-y-2.5 text-gray-600 dark:text-white/60">
                {[
                  'Apply eyeliner where it actually enhances your shape, instead of guessing',
                  'Choose eyeshadow placement and blending techniques suited to your lid space',
                  'Avoid techniques that work for eye models but not your specific eye shape',
                  'Get a starting point, then adjust the tips to your personal style',
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
                Want makeup tips for every eye shape?{' '}
                <Link
                  href="/features/eye-shape-detector"
                  className="font-medium text-brand-600 underline hover:no-underline"
                >
                  Read the full guide
                </Link>
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-6 border-t border-gray-100 pt-6 text-center text-sm text-gray-500 dark:border-white/5 dark:text-white/40">
                Also try:{' '}
                <Link href="/body-type-calculator" className="font-medium text-brand-600 underline hover:no-underline">
                  Body Type Calculator
                </Link>
                {' · '}
                <Link href="/body-shape-calculator" className="font-medium text-brand-600 underline hover:no-underline">
                  Body Shape Calculator
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
