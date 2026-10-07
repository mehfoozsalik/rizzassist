import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config';
import { BLOG_POSTS } from '@/lib/blog/posts';
import { ASSESSMENTS, APPEARANCE_TOOLS } from '@/lib/assessments/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/report`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/face-shape-detector`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/face-shape-calculator`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/face-shape-quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/face-symmetry`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/try-on`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/try-on/hairstyle`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/try-on/glasses`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/color-analysis`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/professionals`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/body-type-calculator`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/body-shape-calculator`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/eye-shape-detector`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/features/body-type-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${SITE_URL}/features/body-shape-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${SITE_URL}/features/eye-shape-detector`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    // Discovery files for AI / answer engines (AEO + GEO)
    { url: `${SITE_URL}/llms.txt`, lastModified: now, changeFrequency: 'weekly', priority: 0.4 },
    { url: `${SITE_URL}/llms-full.txt`, lastModified: now, changeFrequency: 'weekly', priority: 0.35 },
    { url: `${SITE_URL}/ai.txt`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/aeo.txt`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/geo.txt`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const appearanceExtra = APPEARANCE_TOOLS.filter(
    (t) => !staticRoutes.some((r) => r.url === `${SITE_URL}${t.href}`)
  ).map((t) => ({
    url: `${SITE_URL}${t.href}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const assessments = ASSESSMENTS.map((a) => ({
    url: `${SITE_URL}/${a.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const posts = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...appearanceExtra, ...assessments, ...posts];
}
