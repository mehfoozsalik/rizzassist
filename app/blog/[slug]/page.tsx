import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BLOG_POSTS, getPost } from '@/lib/blog/posts';

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

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: 'Guide not found' };
  return {
    title: `${post.title} | Rizz Assist`,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      type: 'article',
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const cta = CTA_BY_CATEGORY[post.category] ?? {
    href: '/tools',
    label: 'Explore RizzAssist Tools',
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream-50 dark:bg-ink-900">
        <article className="mx-auto max-w-3xl px-4 py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            {post.category} · {post.date} · {post.readMinutes} min read
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-gray-700 dark:text-white/70">
            {post.content.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
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
          </div>
          <p className="mt-10 text-sm">
            <Link href="/tools" className="font-medium text-brand-600 underline">
              All tools
            </Link>
            {' · '}
            <Link href="/blog" className="font-medium text-brand-600 underline">
              All guides
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
