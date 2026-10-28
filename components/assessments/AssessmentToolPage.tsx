import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_NAME, SITE_URL } from '@/lib/config';
import { getAssessment } from '@/lib/assessments/registry';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FaqSchema } from '@/components/seo/SchemaMarkup';
import { AssessmentExperience } from '@/components/assessments/AssessmentExperience';

export function assessmentMetadata(slug: string): Metadata {
  const def = getAssessment(slug);
  if (!def) return {};
  const title = `${def.title}, Discover Your ${def.shortTitle}`;
  const fullTitle = `${title} | Rizz Assist`;
  const description = def.description;
  const url = `${SITE_URL}/${def.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}

export function AssessmentToolPage({ slug }: { slug: string }) {
  const def = getAssessment(slug);
  if (!def) notFound();

  return (
    <>
      <Navbar />
      <FaqSchema items={def.faqs} />
      <main id="main-content" className="bg-cream-50 dark:bg-ink-800">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
          <Breadcrumbs
            crumbs={[
              { name: 'Home', href: '/' },
              { name: 'Tools', href: '/tools' },
              { name: def.title, href: `/${def.slug}` },
            ]}
          />
          <div className="mt-6">
            <AssessmentExperience definition={def} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
