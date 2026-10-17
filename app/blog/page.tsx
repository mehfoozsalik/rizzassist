import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { BlogIndexSchema } from '@/components/seo/SchemaMarkup';
import { getAllPosts } from '@/lib/blog/posts';

export const metadata: Metadata = {
  title: {
    absolute: 'Rizz Assist Blog — Style, Confidence, Pickup Lines & Grooming Guides',
  },
  description:
    'Free guides on pickup lines, style upgrades, social confidence, face shape grooming, dating communication, and photo setup — from the Rizz Assist AI coach.',
  keywords: [
    'rizz tips',
    'pickup line guide',
    'style tips',
    'social confidence',
    'face shape grooming',
    'dating communication',
    'rizz assist blog',
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Rizz Assist Blog — Style, Confidence & Grooming Guides',
    description:
      'Practical guides on pickup lines, style, confidence, face shape, and dating communication.',
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Rizz Assist Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rizz Assist Blog — Style, Confidence & Grooming Guides',
    description:
      'Practical guides on pickup lines, style, confidence, face shape, and dating communication.',
    images: ['/twitter-image.png'],
  },
};

export const dynamic = 'force-dynamic';

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <BlogIndexSchema
        posts={posts.map((p) => ({
          title: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          date: p.date,
          excerpt: p.excerpt,
        }))}
      />
      <Navbar />
      <main id="main-content">
        <section className="bg-ink-900 px-4 py-14 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Rizz Assist Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            Practical guides for style, confidence, pickup lines, face shape
            grooming, and dating communication — so you show up with intention.
          </p>
        </section>
        <section className="bg-cream-50 px-4 py-14 dark:bg-ink-800" aria-label="Blog posts">
          <div className="mx-auto mb-8 max-w-5xl">
            <Breadcrumbs
              crumbs={[
                { name: 'Home', href: '/' },
                { name: 'Blog', href: '/blog' },
              ]}
            />
          </div>
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-white/5 dark:bg-ink-900"
              >
                {post.coverImage ? (
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] w-full bg-gray-100 dark:bg-ink-800">
                    <Image
                      src={post.coverImage}
                      alt={`Cover image for ${post.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </Link>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                    <time dateTime={post.date}>{post.date}</time>
                    {' · '}
                    {post.category} · {post.readMinutes} min
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-600">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-gray-500 dark:text-white/50">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 text-sm font-semibold text-brand-600 underline"
                  >
                    Read guide
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-5xl text-center text-sm text-gray-500 dark:text-white/45">
            Ready for personalized tips?{' '}
            <Link href="/#upload" className="font-medium text-brand-600 underline hover:no-underline">
              Get your free Rizz Report
            </Link>
            {' · '}
            <Link href="/tools" className="font-medium text-brand-600 underline hover:no-underline">
              Browse all tools
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
