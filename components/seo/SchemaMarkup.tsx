import { SITE_URL, SITE_NAME } from '@/lib/config';

interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebAppSchema() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/assets/logo.svg`,
          description:
            'Free AI self-improvement platform for personality, confidence, social skills, dating, and appearance tools.',
          sameAs: [],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          description:
            'Free personality tests, confidence tools, and AI look analyzers to understand yourself and enhance your personality.',
          potentialAction: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/tools`,
            name: 'Browse self-improvement tools',
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: SITE_NAME,
          description:
            'AI-powered self-improvement platform with personality tests, confidence assessments, social skills tools, rizz quizzes, face shape detector, and body calculators.',
          url: SITE_URL,
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          featureList: [
            'Personality and confidence assessments',
            'Social skills and charisma tests',
            'Rizz and dating personality tools',
            'Personality improvement report',
            'AI photo analysis',
            'Face shape detector',
            'Body shape calculator for men and women',
            'Body type calculator',
            'AI eye shape analyzer',
            'No login required',
          ],
          screenshot: `${SITE_URL}/og-image.png`,
          author: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
          },
        }}
      />
    </>
  );
}

export function ToolWebAppSchema({
  name,
  description,
  url,
  featureList,
}: {
  name: string;
  description: string;
  url: string;
  featureList: string[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name,
        description,
        url,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
        },
      }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }}
    />
  );
}

interface Crumb {
  name: string;
  item: string;
}

export function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      }}
    />
  );
}
