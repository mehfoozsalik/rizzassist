import type { ClothingColor } from '@/lib/types';

/** Fallback wardrobe when the model omits clothing fields. */
export function fallbackClothesByFaceShape(faceShape: string): {
  clothingColors: ClothingColor[];
  clothesSuggestions: string[];
} {
  const shape = (faceShape || 'oval').toLowerCase();

  const commonTops = [
    'Well-fitted crew-neck tee in a flattering solid color',
    'Button-down shirt with a clean collar that frames your face',
    'Lightweight knit or polo for smart-casual days',
  ];

  const byShape: Record<
    string,
    { clothingColors: ClothingColor[]; clothesSuggestions: string[] }
  > = {
    oval: {
      clothingColors: [
        { name: 'Navy', hex: '#1E3A5F', why: 'Deep navy sharpens oval features without overpowering.' },
        { name: 'Warm White', hex: '#F7F3E9', why: 'Brightens the face and keeps outfits breathable.' },
        { name: 'Soft Olive', hex: '#6B8E4E', why: 'Earthy tone that adds quiet confidence.' },
        { name: 'Burgundy', hex: '#7A1F3D', why: 'Rich accent color for nights out.' },
      ],
      clothesSuggestions: [
        ...commonTops,
        'Tailored chinos or dark jeans with a clean break',
        'Unstructured blazer in navy or charcoal for dates',
      ],
    },
    round: {
      clothingColors: [
        { name: 'Charcoal', hex: '#36454F', why: 'Creates vertical contrast and definition.' },
        { name: 'Crisp White', hex: '#FAFAFA', why: 'Opens up the face and reads fresh.' },
        { name: 'Deep Teal', hex: '#0F766E', why: 'Cool jewel tone that elongates the look.' },
        { name: 'Brick Red', hex: '#B33A3A', why: 'Bold accent that draws the eye upward.' },
      ],
      clothesSuggestions: [
        'V-neck tees and shirts to lengthen the neckline',
        'Vertical-stripe or lightly patterned button-downs',
        'Structured jacket with slight shoulder definition',
        'Straight or slim trousers — avoid extreme baggy fits',
        'Open collar or deeper neckline for evening looks',
      ],
    },
    square: {
      clothingColors: [
        { name: 'Soft Camel', hex: '#C4A484', why: 'Softens strong jawlines with warmth.' },
        { name: 'Slate Blue', hex: '#5B7C99', why: 'Cool balance against angular features.' },
        { name: 'Ivory', hex: '#FFFFF0', why: 'Light contrast that keeps the look approachable.' },
        { name: 'Forest Green', hex: '#2F4F3E', why: 'Grounded color that feels confident, not harsh.' },
      ],
      clothesSuggestions: [
        'Soft-shoulder knits and rounded necklines',
        'Casual overshirts or chore jackets',
        'Relaxed (not oversized) straight jeans',
        'Layered hoodie + overshirt for weekend energy',
        'Avoid ultra-boxy suits that exaggerate angles',
      ],
    },
    heart: {
      clothingColors: [
        { name: 'Dusty Rose', hex: '#D4A5A5', why: 'Softens a wider forehead area.' },
        { name: 'Sage', hex: '#9CAF88', why: 'Calm green that balances proportions.' },
        { name: 'Warm Gray', hex: '#8A8580', why: 'Neutral base that never fights the face.' },
        { name: 'Cobalt', hex: '#0047AB', why: 'Strong accent for dates and nights out.' },
      ],
      clothesSuggestions: [
        'Boat necks and wider collars to balance the upper face',
        'Horizontal interest across the chest/shoulders',
        'Fitted mid-layers that don’t taper too hard at the hip',
        'Statement jackets with interest at the shoulder line',
        'Keep bottoms simple so the outfit stays balanced',
      ],
    },
    oblong: {
      clothingColors: [
        { name: 'Warm Camel', hex: '#C19A6B', why: 'Horizontal warmth that softens length.' },
        { name: 'Rust', hex: '#B7410E', why: 'Rich mid-tone that frames the face.' },
        { name: 'Cream', hex: '#FFFDD0', why: 'Light layers that break up vertical lines.' },
        { name: 'Ink Blue', hex: '#1B2838', why: 'Classic depth without stretching the look.' },
      ],
      clothesSuggestions: [
        'Crew necks and horizontal details to balance face length',
        'Layered looks (tee + open shirt) for width at the torso',
        'Avoid long skinny scarves that exaggerate length',
        'Shorter jackets that hit at the hip',
        'Textured knits that add horizontal interest',
      ],
    },
    diamond: {
      clothingColors: [
        { name: 'Soft Black', hex: '#1A1A1A', why: 'Sleek contrast that highlights cheekbones.' },
        { name: 'Champagne', hex: '#F7E7CE', why: 'Light tone that softens angular width.' },
        { name: 'Plum', hex: '#5B2C6F', why: 'Dramatic accent for nightlife fits.' },
        { name: 'Steel Blue', hex: '#4682B4', why: 'Cool mid-tone that feels polished.' },
      ],
      clothesSuggestions: [
        'Scoop or soft V-necks to balance cheekbone width',
        'Structured collars that add presence at the jaw',
        'Slim-but-not-tight shirts with clean shoulders',
        'Dark denim + light top for contrast',
        'Minimal accessories so facial geometry stays the star',
      ],
    },
  };

  return byShape[shape] ?? byShape.oval;
}

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export function normalizeHex(hex: unknown, fallback = '#E11D48'): string {
  if (typeof hex !== 'string') return fallback;
  const t = hex.trim();
  if (!HEX_RE.test(t)) return fallback;
  if (t.length === 4) {
    const [, r, g, b] = t;
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return t.toUpperCase();
}
