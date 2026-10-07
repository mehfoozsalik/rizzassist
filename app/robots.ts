import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config';

/**
 * SEO + AI crawler policy.
 * Companion discovery files (AEO / GEO / LLMs):
 *   /llms.txt  /llms-full.txt  /ai.txt  /aeo.txt  /geo.txt
 */
export default function robots(): MetadataRoute.Robots {
  const aiAgents = [
    'GPTBot',
    'ChatGPT-User',
    'Google-Extended',
    'GoogleOther',
    'ClaudeBot',
    'anthropic-ai',
    'PerplexityBot',
    'Applebot-Extended',
    'Bytespider',
    'CCBot',
    'cohere-ai',
    'Diffbot',
    'FacebookBot',
    'Meta-ExternalAgent',
    'YouBot',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/profile'],
      },
      ...aiAgents.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/', '/profile'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
