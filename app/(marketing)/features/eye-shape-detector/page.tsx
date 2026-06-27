import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FaqSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';
import { EyeShapeGuide } from '@/components/calculators/EyeShapeGuide';

const PAGE_URL = `${SITE_URL}/features/eye-shape-detector`;

export const metadata: Metadata = {
  title: 'Eye Shapes Explained: Visual Guide to All 10 Eye Shapes',
  description:
    'A visual guide to the 10 eye shapes, how AI detects eye shape from a photo, and makeup tips for each shape.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Eye Shapes Explained: Visual Guide to All 10 Eye Shapes',
    description: 'A visual guide to the 10 eye shapes and how the AI detector works.',
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eye Shapes Explained: Visual Guide to All 10 Eye Shapes',
    description: 'A visual guide to the 10 eye shapes and how the AI detector works.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Can I change my eye shape?',
    answer:
      'Your underlying eye shape is anatomical and stays fixed, but makeup techniques, like eyeliner placement and eyeshadow blending, can visually enhance or soften how your eye shape appears.',
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

export default function EyeShapeFeaturePage() {
  return (
    <article>
      <FaqSchema items={FAQ_ITEMS} />
      <Breadcrumbs
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'About Eye Shapes', href: '/features/eye-shape-detector' },
        ]}
      />
      <Reveal>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Eye Shapes Explained: A Visual Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-white/60">
          Eye shape is determined by lid structure, tilt, and spacing.
          Knowing yours helps you pick eyeliner styles and eyeshadow
          techniques that genuinely flatter your eyes. Tap any shape below
          for tailored makeup tips.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <EyeShapeGuide />
        </div>
      </Reveal>

      <Reveal>
        <section aria-labelledby="how-it-works" className="mt-12">
          <h2 id="how-it-works" className="text-2xl font-bold text-gray-900 dark:text-white">
            How the AI detects eye shape
          </h2>
          <p className="mt-3 text-gray-600 dark:text-white/60">
            Upload a clear, well-lit close-up of your eyes or face. Our AI
            vision model analyzes lid structure, crease visibility, corner
            tilt, and spacing to match your eyes against the 10 shape
            categories above, then generates a confidence level and
            personalized makeup recommendations.
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
          <h2 className="text-2xl font-bold">Detect your eye shape now</h2>
          <p className="mt-2 text-white/90">
            Upload a photo and get AI-powered makeup tips in seconds.
          </p>
          <Link
            href="/eye-shape-detector"
            className="mt-5 inline-block rounded-lg bg-white px-6 py-2.5 font-semibold text-brand-700 transition-colors hover:bg-gray-100"
          >
            Try the Detector &rarr;
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
