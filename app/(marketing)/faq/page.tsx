import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { FAQ_GROUPS, ALL_FAQS } from '@/lib/faq';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FaqSchema } from '@/components/seo/SchemaMarkup';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: {
    absolute: 'FAQ — Rizz Assist | AI Pickup Lines, Style Tips & Photo Analysis',
  },
  description:
    'Got questions about Rizz Assist? Find out how the AI generates pickup lines, analyzes your style, recommends shades, and what happens to your photo after analysis.',
  openGraph: {
    title: 'FAQ — Rizz Assist | AI Pickup Lines, Style Tips & Photo Analysis',
    description:
      'Got questions about Rizz Assist? Find out how the AI generates pickup lines, analyzes your style, recommends shades, and what happens to your photo after analysis.',
    url: `${SITE_URL}/faq`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Rizz Assist | AI Pickup Lines, Style Tips & Photo Analysis',
    description:
      'Got questions about Rizz Assist? Find out how the AI generates pickup lines, analyzes your style, and what happens to your photo.',
  },
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function FaqPage() {
  return (
    <article>
      <Breadcrumbs
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'FAQ', href: '/faq' },
        ]}
      />
      <FaqSchema items={ALL_FAQS} />
      <Reveal>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-white/60">
          Everything you need to know about how Rizz Assist works, what it can do,
          and how we protect your privacy.
        </p>
      </Reveal>

      <div className="mt-10 space-y-10">
        {FAQ_GROUPS.map((group) => (
          <Reveal key={group.category}>
            <section aria-label={group.category}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                {group.category}
              </h2>
              <dl className="mt-4 space-y-4">
                {group.items.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-ink-800"
                  >
                    <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-gray-600 dark:text-white/60">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-center text-gray-600 dark:text-white/60">
        <Link href="/" className="font-medium text-brand-600 underline hover:no-underline">
          Try it free, no login needed &rarr;
        </Link>
      </p>
    </article>
  );
}
