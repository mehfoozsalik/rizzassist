import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/lib/blog/posts';

export const metadata: Metadata = {
  title: 'Grooming & Personality Style Blog | Rizz Assist',
  description:
    'Guides on face shape grooming, hairstyles, eyebrows, body style, and photo setup — for personality improvement, not vanity scores.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Rizz Assist Blog — Personality Grooming Guides',
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="bg-ink-900 px-4 py-14 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Personality Grooming Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            Practical guides for hair, face shape, body style, and presence —
            so you show up as your best intentional self.
          </p>
        </section>
        <section className="bg-cream-50 px-4 py-14 dark:bg-ink-800">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-ink-900"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                  {post.category} · {post.readMinutes} min
                </p>
                <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm text-gray-500 dark:text-white/50">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 text-sm font-semibold text-brand-600 underline"
                >
                  Read guide
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
