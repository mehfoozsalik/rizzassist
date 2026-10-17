import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleSchema } from '@/components/seo/SchemaMarkup';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { getAllPosts, getPost, STATIC_BLOG_POSTS } from '@/lib/blog/posts';

type Props = { params: { slug: string } };

const CTA_BY_CATEGORY: Record<string, { href: string; label: string }> = {
  Confidence: { href: '/social-confidence-test', label: 'Test Your Social Confidence' },
  Personality: { href: '/personality-test', label: 'Take the Personality Test' },
  'Social Skills': { href: '/conversation-skills-test', label: 'Assess Conversation Skills' },
  Dating: { href: '/rizz-test', label: 'Take the Rizz Test' },
  Grooming: { href: '/face-shape-detector', label: 'Detect Your Face Shape' },
  Style: { href: '/style-assessment', label: 'Start Style Assessment' },
  "Men's Guide": { href: '/grooming-assessment', label: 'Grooming Assessment' },
  'How-to': { href: '/tools', label: 'Explore All Tools' },
};

function truncateMeta(text: string, max = 158): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export async function generateStaticParams() {
  const all = await getAllPosts().catch(() => STATIC_BLOG_POSTS);
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Guide not found' };

  const description = truncateMeta(post.excerpt);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.coverImage || '/og-image.png';

  return {
    title: { absolute: `${post.title} | Rizz Assist` },
    description,
    authors: [{ name: post.author }],
    keywords: [
      post.category.toLowerCase(),
      'rizz assist',
      'style tips',
      'confidence',
      post.title.toLowerCase(),
    ],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: ogImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const cta = post.relatedToolHref
    ? { href: post.relatedToolHref, label: post.relatedToolLabel || 'Explore Rizz Assist Tools' }
    : CTA_BY_CATEGORY[post.category] ?? {
        href: '/tools',
        label: 'Explore Rizz Assist Tools',
      };

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        url={url}
        datePublished={post.date}
        authorName={post.author}
        image={post.coverImage}
        keywords={[post.category, 'Rizz Assist', 'style', 'confidence']}
      />
      <Navbar />
      <main id="main-content" className="bg-cream-50 dark:bg-ink-900">
        <article className="mx-auto max-w-3xl px-4 py-14" itemScope itemType="https://schema.org/Article">
          <Breadcrumbs
            crumbs={[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: '/blog' },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-600">
            {post.category} ·{' '}
            <time dateTime={post.date} itemProp="datePublished">
              {post.date}
            </time>{' '}
            · {post.readMinutes} min read
          </p>
          <h1
            className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            itemProp="headline"
          >
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-white/50">
            By <span itemProp="author">{post.author}</span>
            {post.generated ? ' · AI-assisted' : ''}
          </p>

          {post.coverImage ? (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-ink-800">
              <Image
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          ) : null}

          <div itemProp="articleBody">
            <BlogPostContent post={post} />
          </div>

          {post.references && post.references.length > 0 ? (
            <aside className="mt-12 rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-ink-800">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-600">
                References
              </h2>
              <ul className="mt-3 space-y-3 text-sm text-gray-600 dark:text-white/60">
                {post.references.map((ref) => (
                  <li key={ref.url}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-600 underline"
                    >
                      {ref.title}
                    </a>
                    {ref.author ? ` — ${ref.author}` : ''}
                    {ref.note ? (
                      <p className="mt-1 text-xs text-gray-500 dark:text-white/40">{ref.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 dark:border-brand-500/20 dark:bg-brand-500/10">
            <p className="text-sm font-semibold text-ink-900 dark:text-white">
              Put this into practice
            </p>
            <Link
              href={cta.href}
              className="mt-3 inline-flex rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-500"
            >
              {cta.label}
            </Link>
            <p className="mt-3 text-xs text-gray-500 dark:text-white/45">
              Or{' '}
              <Link href="/#upload" className="font-medium text-brand-600 underline">
                upload a photo for your free Rizz Report
              </Link>
              .
            </p>
          </div>
          <p className="mt-10 text-sm">
            <Link href="/tools" className="font-medium text-brand-600 underline">
              All tools
            </Link>
            {' · '}
            <Link href="/blog" className="font-medium text-brand-600 underline">
              All guides
            </Link>
            {' · '}
            <Link href="/faq" className="font-medium text-brand-600 underline">
              FAQ
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
