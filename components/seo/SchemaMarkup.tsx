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
            'AI-powered rizz coach that analyzes your photo to generate pickup lines, style tips, shades recommendations, and confidence advice.',
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
            "Upload your photo and let Rizz Assist's AI analyze your look, suggest outfit upgrades, recommend shades, generate personalized pickup lines, and help you radiate confidence.",
          potentialAction: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/#upload`,
            name: 'Upload a photo for your Rizz Report',
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: SITE_NAME,
          description:
            'AI-powered rizz coach that analyzes your photo to generate pickup lines, style tips, shades recommendations, and confidence advice.',
          url: SITE_URL,
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          featureList: [
            'Personalized pickup lines',
            'Outfit and style upgrades',
            'Shades and accessories matching face shape',
            'Face orientation and grooming tips',
            'AI photo analysis',
            'Face shape detector',
            'Body shape and body type calculators',
            'Personality and confidence assessments',
            'No login required',
            'Photos never stored',
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

export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  image,
  keywords,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  image?: string;
  keywords?: string[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          '@type': 'Person',
          name: authorName,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/assets/logo.svg`,
          },
        },
        ...(image
          ? { image: [{ '@type': 'ImageObject', url: image.startsWith('http') ? image : `${SITE_URL}${image}` }] }
          : {}),
        ...(keywords?.length ? { keywords: keywords.join(', ') } : {}),
        isPartOf: {
          '@type': 'Blog',
          name: `${SITE_NAME} Blog`,
          url: `${SITE_URL}/blog`,
        },
      }}
    />
  );
}

export function BlogIndexSchema({
  posts,
}: {
  posts: { title: string; url: string; date: string; excerpt: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `${SITE_NAME} Blog`,
        description:
          'Guides on pickup lines, style, confidence, face shape grooming, and dating communication from Rizz Assist.',
        url: `${SITE_URL}/blog`,
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: p.url,
          datePublished: p.date,
          description: p.excerpt,
        })),
      }}
    />
  );
}
