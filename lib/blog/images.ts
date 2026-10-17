/**
 * Curated Unsplash images (free-to-use) keyed by loose topic keywords.
 * Automation assigns cover + in-article images from these pools — no scraping.
 */
const IMAGE_POOL: Record<string, { src: string; alt: string }[]> = {
  eyes: [
    {
      src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80',
      alt: 'Makeup brushes and beauty products',
    },
    {
      src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80',
      alt: 'Close-up beauty portrait focusing on eyes',
    },
    {
      src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80',
      alt: 'Soft lighting beauty makeup look',
    },
  ],
  hair: [
    {
      src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=80',
      alt: 'Barber styling hair in a salon',
    },
    {
      src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=80',
      alt: 'Classic barbershop haircut scene',
    },
  ],
  style: [
    {
      src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1400&q=80',
      alt: 'Neatly arranged wardrobe and clothing',
    },
    {
      src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80',
      alt: 'Fashion clothing on a rack',
    },
  ],
  confidence: [
    {
      src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80',
      alt: 'Friends laughing together outdoors',
    },
    {
      src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=80',
      alt: 'Group of friends in conversation',
    },
  ],
  dating: [
    {
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
      alt: 'People talking over coffee',
    },
    {
      src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80',
      alt: 'Relaxed cafe conversation',
    },
  ],
  photo: [
    {
      src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80',
      alt: 'Camera and natural light photography setup',
    },
    {
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80',
      alt: 'Natural light portrait',
    },
  ],
  glasses: [
    {
      src: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=80',
      alt: 'Eyeglasses frames on display',
    },
    {
      src: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1400&q=80',
      alt: 'Person wearing stylish glasses',
    },
  ],
  color: [
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80',
      alt: 'Colorful fabric and textile swatches',
    },
    {
      src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=80',
      alt: 'Paint color samples arranged in a palette',
    },
  ],
  grooming: [
    {
      src: 'https://images.unsplash.com/photo-1621607512214-682997277b79?auto=format&fit=crop&w=1400&q=80',
      alt: 'Grooming tools and skincare essentials',
    },
    {
      src: 'https://images.unsplash.com/photo-1585747860715-2ba37e789b80?auto=format&fit=crop&w=1400&q=80',
      alt: 'Barbershop grooming atmosphere',
    },
  ],
  default: [
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273b2bff73?auto=format&fit=crop&w=1400&q=80',
      alt: 'People collaborating and connecting',
    },
    {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
      alt: 'Team discussion around a table',
    },
  ],
};

function poolForQuery(query: string): { src: string; alt: string }[] {
  const q = query.toLowerCase();
  if (/(eye|makeup|liner|lash|brow)/.test(q)) return IMAGE_POOL.eyes;
  if (/(hair|barber|cut)/.test(q)) return IMAGE_POOL.hair;
  if (/(wardrobe|outfit|fashion|dress|clothes)/.test(q)) return IMAGE_POOL.style;
  if (/(confidence|social|friend|charisma|conversation)/.test(q)) return IMAGE_POOL.confidence;
  if (/(dating|message|text|date)/.test(q)) return IMAGE_POOL.dating;
  if (/(photo|selfie|camera|portrait)/.test(q)) return IMAGE_POOL.photo;
  if (/(glass|frame|optical)/.test(q)) return IMAGE_POOL.glasses;
  if (/(color|palette|season)/.test(q)) return IMAGE_POOL.color;
  if (/(groom|skincare|shave)/.test(q)) return IMAGE_POOL.grooming;
  return IMAGE_POOL.default;
}

export function pickBlogImages(
  queries: string[],
  count = 3,
  seed = 0
): { src: string; alt: string }[] {
  const picked: { src: string; alt: string }[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < Math.max(count, queries.length); i++) {
    const query = queries[i % queries.length] || 'style';
    const pool = poolForQuery(query);
    const img = pool[(seed + i) % pool.length];
    if (!seen.has(img.src)) {
      seen.add(img.src);
      picked.push(img);
    }
    if (picked.length >= count) break;
  }

  while (picked.length < count) {
    const fallback = IMAGE_POOL.default[picked.length % IMAGE_POOL.default.length];
    if (!seen.has(fallback.src)) {
      seen.add(fallback.src);
      picked.push(fallback);
    } else break;
  }

  return picked;
}
