import type { BlogImage, BlogImageCredit } from './types';

const UNSPLASH_SEARCH = 'https://api.unsplash.com/search/photos';

export type ImageBrief = {
  /** Short Unsplash search query (3–6 concrete visual words). */
  query: string;
  /** What the photo should show, used for scoring + alt fallback. */
  visual: string;
  /** cover | inline */
  role: 'cover' | 'inline';
  /** Prefer placing after this section heading when role is inline. */
  afterHeading?: string;
};

type UnsplashPhoto = {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: { regular: string; full?: string };
  links: { html: string; download_location?: string };
  tags?: { title?: string }[];
  user: {
    name: string;
    username: string;
    links: { html: string };
  };
};

type UnsplashSearchResult = {
  results?: UnsplashPhoto[];
};

/** Verified fallbacks if UNSPLASH_ACCESS_KEY is missing or the API fails. */
const FALLBACK_POOL: Record<string, BlogImage[]> = {
  eyes: [
    {
      src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80',
      alt: 'Makeup brushes and beauty products',
      photographer: 'Freestocks',
      photographerUrl: 'https://unsplash.com/@freestocks',
      photoUrl: 'https://unsplash.com/photos/wawEfYdpkag',
    },
    {
      src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80',
      alt: 'Soft lighting beauty makeup look',
      photographer: 'Engin Akyurt',
      photographerUrl: 'https://unsplash.com/@enginakyurt',
      photoUrl: 'https://unsplash.com/photos/SABLIlUeH1o',
    },
  ],
  hair: [
    {
      src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=80',
      alt: 'Classic barbershop haircut scene',
      photographer: 'Adam Winger',
      photographerUrl: 'https://unsplash.com/@adamwinger',
      photoUrl: 'https://unsplash.com/photos/iIRQsit8U-8',
    },
  ],
  style: [
    {
      src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1400&q=80',
      alt: 'Neatly arranged wardrobe and clothing',
      photographer: 'Marcus Loke',
      photographerUrl: 'https://unsplash.com/@pixplicity',
      photoUrl: 'https://unsplash.com/photos/xU5ALj8t-lE',
    },
  ],
  confidence: [
    {
      src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80',
      alt: 'Friends laughing together outdoors',
      photographer: 'Perry Grone',
      photographerUrl: 'https://unsplash.com/@perrygrone',
      photoUrl: 'https://unsplash.com/photos/lbO1iCspH04',
    },
  ],
  dating: [
    {
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
      alt: 'People talking over coffee',
      photographer: 'Brooke Cagle',
      photographerUrl: 'https://unsplash.com/@brookecagle',
      photoUrl: 'https://unsplash.com/photos/g1Kr4Ozfoac',
    },
  ],
  photo: [
    {
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80',
      alt: 'Natural light portrait',
      photographer: 'Michael Dam',
      photographerUrl: 'https://unsplash.com/@michaeldam',
      photoUrl: 'https://unsplash.com/photos/mEZ3PoFGs_k',
    },
  ],
  glasses: [
    {
      src: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=80',
      alt: 'Eyeglasses frames on display',
      photographer: 'Apostolos Vamvouras',
      photographerUrl: 'https://unsplash.com/@apostolosv',
      photoUrl: 'https://unsplash.com/photos/mCiA4D5uo0s',
    },
  ],
  color: [
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80',
      alt: 'Colorful fabric and textile swatches',
      photographer: 'Karen Cinegraphic',
      photographerUrl: 'https://unsplash.com/@kcinegraphic',
      photoUrl: 'https://unsplash.com/photos/4jnm_8T9Q1I',
    },
  ],
  grooming: [
    {
      src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=80',
      alt: 'Barber styling hair in a salon',
      photographer: 'Kenny Eliason',
      photographerUrl: 'https://unsplash.com/@neonbrand',
      photoUrl: 'https://unsplash.com/photos/FKyoy_n-KsA',
    },
  ],
  default: [
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273b2bff73?auto=format&fit=crop&w=1400&q=80',
      alt: 'People collaborating and connecting',
      photographer: 'Annie Spratt',
      photographerUrl: 'https://unsplash.com/@anniespratt',
      photoUrl: 'https://unsplash.com/photos/QckxruozjRg',
    },
  ],
};

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'for', 'to', 'in', 'on', 'with', 'at',
  'by', 'from', 'is', 'are', 'be', 'this', 'that', 'photo', 'image', 'picture',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
}

function poolKeyForQuery(query: string): keyof typeof FALLBACK_POOL {
  const q = query.toLowerCase();
  if (/(eye|makeup|liner|lash|brow)/.test(q)) return 'eyes';
  if (/(hair|barber|cut|salon)/.test(q)) return 'hair';
  if (/(wardrobe|outfit|fashion|dress|clothes|jacket)/.test(q)) return 'style';
  if (/(confidence|social|friend|charisma|conversation|laugh)/.test(q)) return 'confidence';
  if (/(dating|message|text|date|cafe)/.test(q)) return 'dating';
  if (/(photo|selfie|camera|portrait|lighting)/.test(q)) return 'photo';
  if (/(glass|frame|optical)/.test(q)) return 'glasses';
  if (/(color|palette|season|swatch)/.test(q)) return 'color';
  if (/(groom|skincare|shave)/.test(q)) return 'grooming';
  return 'default';
}

function pickFallbackImages(queries: string[], count: number): BlogImage[] {
  const picked: BlogImage[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < Math.max(count, queries.length) * 2 && picked.length < count; i++) {
    const query = queries[i % Math.max(queries.length, 1)] || 'style';
    const pool = FALLBACK_POOL[poolKeyForQuery(query)];
    const img = pool[i % pool.length];
    if (!seen.has(img.src)) {
      seen.add(img.src);
      const copy: BlogImage = { ...img, alt: img.alt || query };
      copy.query = query;
      picked.push(copy);
    }
  }

  while (picked.length < count) {
    const fallback = FALLBACK_POOL.default[picked.length % FALLBACK_POOL.default.length];
    if (seen.has(fallback.src)) break;
    seen.add(fallback.src);
    picked.push(fallback);
  }

  return picked;
}

function photoToBlogImage(photo: UnsplashPhoto, query: string, visual: string): BlogImage {
  const photographerUrl = photo.user.links?.html
    ? `${photo.user.links.html}?utm_source=rizzassist&utm_medium=referral`
    : `https://unsplash.com/@${photo.user.username}?utm_source=rizzassist&utm_medium=referral`;

  const photoUrl = photo.links?.html
    ? `${photo.links.html}?utm_source=rizzassist&utm_medium=referral`
    : `https://unsplash.com/photos/${photo.id}?utm_source=rizzassist&utm_medium=referral`;

  return {
    src: `${photo.urls.regular}${photo.urls.regular.includes('?') ? '&' : '?'}w=1400&q=80`,
    alt: photo.alt_description || photo.description || visual || query,
    photographer: photo.user.name || photo.user.username,
    photographerUrl,
    photoUrl,
    downloadLocation: photo.links?.download_location,
    query,
  };
}

/** Score how well a photo's text matches the intended visual query. */
function relevanceScore(photo: UnsplashPhoto, query: string, visual: string): number {
  const haystack = [
    photo.alt_description || '',
    photo.description || '',
    ...(photo.tags || []).map((t) => t.title || ''),
  ]
    .join(' ')
    .toLowerCase();

  const needles = [...new Set([...tokenize(query), ...tokenize(visual)])];
  if (!needles.length) return 0;

  let hits = 0;
  for (const token of needles) {
    if (haystack.includes(token)) hits += 1;
  }

  // Prefer photos that mention multiple query terms; slight boost for longer alts
  const coverage = hits / needles.length;
  const detailBonus = Math.min(0.15, (haystack.split(/\s+/).length || 0) / 200);
  return coverage + detailBonus;
}

async function searchUnsplashCandidates(
  query: string,
  visual: string
): Promise<{ image: BlogImage; score: number }[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY?.trim();
  if (!accessKey) return [];

  const url = new URL(UNSPLASH_SEARCH);
  url.searchParams.set('query', query);
  url.searchParams.set('page', '1');
  url.searchParams.set('per_page', '12');
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('content_filter', 'high');
  url.searchParams.set('order_by', 'relevant');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      'Accept-Version': 'v1',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    console.warn(`Unsplash search failed (${res.status}) for query: ${query}`);
    return [];
  }

  const data = (await res.json()) as UnsplashSearchResult;
  const results = data.results || [];

  return results
    .filter((p) => p.urls?.regular)
    .map((photo) => ({
      image: photoToBlogImage(photo, query, visual),
      score: relevanceScore(photo, query, visual),
    }))
    .sort((a, b) => b.score - a.score);
}

/** Unsplash guideline: ping download_location when a photo is used in production. */
export async function trackUnsplashDownloads(images: BlogImage[]): Promise<void> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY?.trim();
  if (!accessKey) return;

  await Promise.allSettled(
    images.map(async (img) => {
      if (!img.downloadLocation) return;
      await fetch(img.downloadLocation, {
        headers: { Authorization: `Client-ID ${accessKey}` },
      });
    })
  );
}

export function toImageCredits(images: BlogImage[]): BlogImageCredit[] {
  const credits: BlogImageCredit[] = [];
  const seen = new Set<string>();

  for (const img of images) {
    if (!img.photographer || !img.photoUrl) continue;
    const key = img.photoUrl;
    if (seen.has(key)) continue;
    seen.add(key);
    credits.push({
      photographer: img.photographer,
      photographerUrl:
        img.photographerUrl ||
        'https://unsplash.com/?utm_source=rizzassist&utm_medium=referral',
      photoUrl: img.photoUrl,
      alt: img.alt,
    });
  }

  return credits;
}

/**
 * Fetch images for article-aware briefs.
 * Picks the best of ~12 Unsplash results per query by keyword overlap.
 */
export async function fetchBlogImagesFromBriefs(
  briefs: ImageBrief[],
  fallbackQueries: string[] = []
): Promise<BlogImage[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY?.trim();
  const list: ImageBrief[] =
    briefs.length > 0
      ? briefs
      : fallbackQueries.map((query, i) => ({
          query,
          visual: query,
          role: i === 0 ? 'cover' : 'inline',
        }));

  if (!accessKey) {
    return pickFallbackImages(
      list.map((b) => b.query),
      Math.max(list.length, 3)
    );
  }

  const picked: BlogImage[] = [];
  const seenIds = new Set<string>();
  const MIN_SCORE = 0.2;

  for (const brief of list) {
    try {
      const candidates = await searchUnsplashCandidates(brief.query, brief.visual);
      const best = candidates.find(
        (c) => !seenIds.has(c.image.photoUrl || c.image.src) && c.score >= MIN_SCORE
      ) || candidates.find((c) => !seenIds.has(c.image.photoUrl || c.image.src));

      if (best) {
        seenIds.add(best.image.photoUrl || best.image.src);
        const selected: BlogImage = {
          ...best.image,
          alt: brief.visual || best.image.alt,
          role: brief.role,
        };
        if (brief.afterHeading) selected.afterHeading = brief.afterHeading;
        picked.push(selected);
        continue;
      }
    } catch (err) {
      console.warn('Unsplash fetch error:', err);
    }

    // Fallback for this slot
    const fb = pickFallbackImages([brief.query, ...fallbackQueries], 1)[0];
    if (fb && !seenIds.has(fb.src)) {
      seenIds.add(fb.src);
      const selected: BlogImage = {
        ...fb,
        alt: brief.visual || fb.alt,
        role: brief.role,
      };
      if (brief.afterHeading) selected.afterHeading = brief.afterHeading;
      picked.push(selected);
    }
  }

  await trackUnsplashDownloads(picked);
  return picked;
}

/** @deprecated Prefer fetchBlogImagesFromBriefs. */
export async function fetchBlogImages(
  queries: string[],
  count = 3,
  _seed = 0
): Promise<BlogImage[]> {
  const briefs: ImageBrief[] = queries.slice(0, count).map((query, i) => ({
    query,
    visual: query,
    role: i === 0 ? 'cover' : 'inline',
  }));
  while (briefs.length < count && queries.length) {
    briefs.push({
      query: queries[briefs.length % queries.length],
      visual: queries[briefs.length % queries.length],
      role: 'inline',
    });
  }
  return fetchBlogImagesFromBriefs(briefs, queries);
}

export function pickBlogImages(
  queries: string[],
  count = 3,
  _seed = 0
): BlogImage[] {
  return pickFallbackImages(queries, count);
}
