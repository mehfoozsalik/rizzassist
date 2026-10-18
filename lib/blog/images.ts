import type { BlogImage, BlogImageCredit } from './types';

const UNSPLASH_SEARCH = 'https://api.unsplash.com/search/photos';

type UnsplashSearchResult = {
  results?: {
    id: string;
    description: string | null;
    alt_description: string | null;
    urls: { regular: string; full?: string };
    links: { html: string; download_location?: string };
    user: {
      name: string;
      username: string;
      links: { html: string };
    };
  }[];
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

function poolKeyForQuery(query: string): keyof typeof FALLBACK_POOL {
  const q = query.toLowerCase();
  if (/(eye|makeup|liner|lash|brow)/.test(q)) return 'eyes';
  if (/(hair|barber|cut)/.test(q)) return 'hair';
  if (/(wardrobe|outfit|fashion|dress|clothes)/.test(q)) return 'style';
  if (/(confidence|social|friend|charisma|conversation)/.test(q)) return 'confidence';
  if (/(dating|message|text|date)/.test(q)) return 'dating';
  if (/(photo|selfie|camera|portrait)/.test(q)) return 'photo';
  if (/(glass|frame|optical)/.test(q)) return 'glasses';
  if (/(color|palette|season)/.test(q)) return 'color';
  if (/(groom|skincare|shave)/.test(q)) return 'grooming';
  return 'default';
}

function pickFallbackImages(queries: string[], count: number, seed: number): BlogImage[] {
  const picked: BlogImage[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < Math.max(count, queries.length) * 2 && picked.length < count; i++) {
    const query = queries[i % Math.max(queries.length, 1)] || 'style';
    const pool = FALLBACK_POOL[poolKeyForQuery(query)];
    const img = pool[(seed + i) % pool.length];
    if (!seen.has(img.src)) {
      seen.add(img.src);
      picked.push(img);
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

async function searchUnsplash(query: string, page: number): Promise<BlogImage | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY?.trim();
  if (!accessKey) return null;

  const url = new URL(UNSPLASH_SEARCH);
  url.searchParams.set('query', query);
  url.searchParams.set('page', String(Math.max(1, page)));
  url.searchParams.set('per_page', '1');
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('content_filter', 'high');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      'Accept-Version': 'v1',
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    console.warn(`Unsplash search failed (${res.status}) for query: ${query}`);
    return null;
  }

  const data = (await res.json()) as UnsplashSearchResult;
  const photo = data.results?.[0];
  if (!photo?.urls?.regular) return null;

  const photographerUrl = photo.user.links?.html
    ? `${photo.user.links.html}?utm_source=rizzassist&utm_medium=referral`
    : `https://unsplash.com/@${photo.user.username}?utm_source=rizzassist&utm_medium=referral`;

  const photoUrl = photo.links?.html
    ? `${photo.links.html}?utm_source=rizzassist&utm_medium=referral`
    : `https://unsplash.com/photos/${photo.id}?utm_source=rizzassist&utm_medium=referral`;

  return {
    src: `${photo.urls.regular}&w=1400&q=80`,
    alt: photo.alt_description || photo.description || query,
    photographer: photo.user.name || photo.user.username,
    photographerUrl,
    photoUrl,
    downloadLocation: photo.links?.download_location,
  };
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
      photographerUrl: img.photographerUrl || 'https://unsplash.com/?utm_source=rizzassist&utm_medium=referral',
      photoUrl: img.photoUrl,
      alt: img.alt,
    });
  }

  return credits;
}

/**
 * Fetch topic-matched images via Unsplash API (demo/free Access Key).
 * Falls back to curated CDN URLs if the key is missing or search fails.
 */
export async function fetchBlogImages(
  queries: string[],
  count = 3,
  seed = 0
): Promise<BlogImage[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY?.trim();
  if (!accessKey) {
    return pickFallbackImages(queries, count, seed);
  }

  const picked: BlogImage[] = [];
  const seen = new Set<string>();
  const list = queries.length ? queries : ['lifestyle portrait'];

  for (let i = 0; i < count; i++) {
    const query = list[i % list.length];
    const page = ((seed + i) % 8) + 1;
    try {
      const img = await searchUnsplash(query, page);
      if (img && !seen.has(img.src)) {
        seen.add(img.src);
        picked.push(img);
        continue;
      }
    } catch (err) {
      console.warn('Unsplash fetch error:', err);
    }
  }

  if (picked.length < count) {
    for (const fb of pickFallbackImages(queries, count, seed)) {
      if (picked.length >= count) break;
      if (seen.has(fb.src)) continue;
      seen.add(fb.src);
      picked.push(fb);
    }
  }

  await trackUnsplashDownloads(picked);
  return picked;
}

/** @deprecated Prefer fetchBlogImages (async Unsplash API). */
export function pickBlogImages(
  queries: string[],
  count = 3,
  seed = 0
): BlogImage[] {
  return pickFallbackImages(queries, count, seed);
}
