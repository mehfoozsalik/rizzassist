import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Privacy Policy: Rizz Assist | No Photo Storage, No Data Selling',
  description:
    'Rizz Assist never stores your photos. Learn exactly how your data is handled: processed in memory, discarded instantly, never shared or sold.',
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const SECTIONS = [
  {
    heading: 'What We Collect',
    body: 'Rizz Assist requires no account, email, or personal information. The only data involved is the photo you voluntarily upload for a single analysis session.',
  },
  {
    heading: 'How Your Photo Is Processed',
    body: 'Your photo is transmitted securely to our AI analysis endpoint, processed in memory to generate your Rizz Report, and discarded immediately after the response is returned. We do not write your image to any database, file storage, or log system.',
  },
  {
    heading: 'Pickup Lines & Generated Content',
    body: 'The pickup lines and style tips Rizz Assist generates are based solely on the visual signals in your photo. We do not retain, log, or associate generated content with any user identity.',
  },
  {
    heading: 'Third-Party AI Processing',
    body: 'Visual analysis is performed via a third-party AI provider. Your image is transmitted to that provider exclusively to generate your results and is governed by their data processing terms for the duration of that request only.',
  },
  {
    heading: 'Analytics',
    body: 'We may use privacy-respecting, aggregate analytics to understand overall site usage. These analytics never include your uploaded photos or generated results.',
  },
  {
    heading: 'Your Control',
    body: 'You decide what to upload and when. Closing the tab removes the preview from your browser. No server-side deletion is necessary because nothing is ever saved.',
  },
];

export default function PrivacyPage() {
  return (
    <article>
      <Breadcrumbs
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Privacy', href: '/privacy' },
        ]}
      />
      <Reveal>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your privacy is the foundation of Rizz Assist. Here is a plain-language
          explanation of how we handle your data.
        </p>
      </Reveal>

      <div className="mt-10 space-y-8">
        {SECTIONS.map((section, i) => (
          <Reveal key={section.heading} delay={(i % 3) * 0.05}>
            <section aria-label={section.heading}>
              <h2 className="text-xl font-semibold text-gray-900">
                {section.heading}
              </h2>
              <p className="mt-2 text-gray-600">{section.body}</p>
            </section>
          </Reveal>
        ))}
      </div>

      <p className="mt-12 text-sm text-gray-500">
        Rizz Assist provides feedback for entertainment and self-improvement
        purposes only and does not constitute professional advice.
      </p>

      <p className="mt-6">
        <Link href="/" className="font-medium text-brand-600 underline hover:no-underline">
          &larr; Back to Rizz Assist
        </Link>
      </p>
    </article>
  );
}
