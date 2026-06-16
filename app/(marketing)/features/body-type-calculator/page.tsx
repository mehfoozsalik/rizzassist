import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FaqSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';
import { BODY_TYPE_PROFILES } from '@/lib/bodyType';

const PAGE_URL = `${SITE_URL}/features/body-type-calculator`;

export const metadata: Metadata = {
  title: 'Body Types Explained: Ectomorph, Mesomorph & Endomorph',
  description:
    'Learn what body types are, how the body type calculator works, and answers to common questions about ectomorph, mesomorph, and endomorph builds.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Body Types Explained: Ectomorph, Mesomorph & Endomorph',
    description:
      'Learn what body types are and how the body type calculator works.',
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Types Explained: Ectomorph, Mesomorph & Endomorph',
    description:
      'Learn what body types are and how the body type calculator works.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Can body type change?',
    answer:
      'Your underlying skeletal frame stays fairly fixed, but body composition (muscle and fat distribution) can shift significantly with training and diet. Many people show traits of more than one type.',
  },
  {
    question: 'Is BMI accurate?',
    answer:
      "BMI is a useful starting point but doesn't account for muscle mass, bone density, or fat distribution. Our calculator combines BMI with shoulder-to-hip proportions for a more complete picture.",
  },
  {
    question: 'What workouts suit each type?',
    answer:
      'Ectomorphs benefit from heavy compound lifts with longer rest between sets. Mesomorphs thrive on varied strength and cardio mixes. Endomorphs see the best results from combining strength training with frequent cardio sessions.',
  },
];

export default function BodyTypeFeaturePage() {
  return (
    <article>
      <FaqSchema items={FAQ_ITEMS} />
      <Breadcrumbs
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'About Body Types', href: '/features/body-type-calculator' },
        ]}
      />
      <Reveal>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Body Types Explained: Ectomorph, Mesomorph &amp; Endomorph
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Body type theory groups people into three broad somatotypes based on
          skeletal frame, metabolism, and how the body tends to store fat and
          build muscle. Understanding yours helps you train and eat smarter.
        </p>
      </Reveal>

      <div className="mt-10 space-y-6">
        {BODY_TYPE_PROFILES.map((profile, i) => (
          <Reveal key={profile.type} delay={i * 0.06}>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">{profile.type}</h2>
              <p className="mt-2 text-gray-600">{profile.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <section aria-labelledby="how-it-works" className="mt-12">
          <h2 id="how-it-works" className="text-2xl font-bold text-gray-900">
            How the calculator works
          </h2>
          <p className="mt-3 text-gray-600">
            Enter your height, weight, shoulder width, chest, waist, and hip
            measurements. We calculate your BMI (weight in kg divided by
            height in meters squared) and compare your shoulder-to-hip
            proportions:
          </p>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              <span>BMI under 18.5 with a narrow frame typically indicates an Ectomorph</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              <span>BMI between 18.5–24.9 with shoulders at or wider than hips typically indicates a Mesomorph</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              <span>BMI over 25 with a wider hip-to-waist ratio typically indicates an Endomorph</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-600">
            Everything runs in your browser. No photo or measurement data is
            ever sent to a server.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="faq" className="mt-12">
          <h2 id="faq" className="text-2xl font-bold text-gray-900">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-5">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-gray-900">{item.question}</h3>
                <p className="mt-1.5 text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-600 to-pink-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Find your body type now</h2>
          <p className="mt-2 text-white/90">
            Free, instant, and runs entirely in your browser.
          </p>
          <Link
            href="/body-type-calculator"
            className="mt-5 inline-block rounded-lg bg-white px-6 py-2.5 font-semibold text-brand-700 transition-colors hover:bg-gray-100"
          >
            Try the Calculator &rarr;
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
