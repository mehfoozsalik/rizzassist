import type { BodyShape, BodyShapeMeasurements } from '@/lib/types';

const IN_TO_CM = 2.54;

function detectBodyShape(bust: number, waist: number, hip: number): BodyShape {
  const bustHipDiff = Math.abs(bust - hip);
  const bustWaistDiff = bust - waist;
  const hipWaistDiff = hip - waist;

  if (bustHipDiff <= 5 && bustWaistDiff >= 9 && hipWaistDiff >= 9) return 'Hourglass';
  if (hip - bust >= 5 && hipWaistDiff >= 7) return 'Pear';
  if (bust - hip >= 5 && bustWaistDiff >= 7) return 'Inverted Triangle';
  if (waist >= bust * 0.9 || waist >= hip * 0.9) return 'Apple';
  return 'Rectangle';
}

/** Measurements may be in cm or inches (per `unit`) — always compared in cm. */
export function calculateBodyShape(m: BodyShapeMeasurements): BodyShape {
  const toCm = (v: number) => (m.unit === 'imperial' ? v * IN_TO_CM : v);
  return detectBodyShape(toCm(m.bust), toCm(m.waist), toCm(m.hip));
}

export interface BodyShapeProfile {
  shape: BodyShape;
  unique: string;
  wear: string[];
  avoid: string[];
  famous: string[];
  goals: string[];
}

export const BODY_SHAPE_PROFILES: BodyShapeProfile[] = [
  {
    shape: 'Hourglass',
    unique:
      'Bust and hips are close in width with a noticeably narrower waist, creating a naturally balanced, curved silhouette.',
    wear: [
      'Wrap dresses and belted waists that follow your natural curve',
      'Fitted tops tucked in to highlight your waistline',
      'High-waisted bottoms that sit right at your narrowest point',
    ],
    avoid: [
      'Boxy, shapeless silhouettes that hide your waist definition',
      'Oversized layers that add bulk without structure',
    ],
    famous: ['Scarlett Johansson', 'Marilyn Monroe', 'Salma Hayek'],
    goals: [
      'Emphasize the waist with belts, seaming, or wrap styles',
      'Keep proportions balanced — avoid overpowering shoulders or hips',
    ],
  },
  {
    shape: 'Pear',
    unique:
      'Hips are noticeably wider than the bust, with a defined waist — weight tends to sit lower on the body.',
    wear: [
      'Structured or embellished tops that add width up top',
      'Boat-neck and off-shoulder tops to broaden the shoulder line',
      'A-line skirts and dark, simple bottoms that skim over the hips',
    ],
    avoid: [
      'Skinny-fit bottoms with busy patterns that draw attention to the hips',
      'Tight, clingy fabrics around the hip and thigh area',
    ],
    famous: ['Jennifer Lopez', 'Beyoncé', 'Shakira'],
    goals: [
      'Balance proportions by adding visual volume to the upper body',
      'Use darker, streamlined bottoms to minimize hip emphasis',
    ],
  },
  {
    shape: 'Apple',
    unique:
      'The midsection — waist — is the widest part of the torso, with a less defined waistline relative to bust and hips.',
    wear: [
      'Empire-waist tops and dresses that flow from just under the bust',
      'V-necks to elongate the torso and draw the eye vertically',
      'Structured jackets that create definition without clinging to the middle',
    ],
    avoid: [
      'Tight belts or clingy fabric cinched right at the natural waist',
      'Bulky layers piled around the midsection',
    ],
    famous: ['Adele', 'Melissa McCarthy', 'Drew Barrymore'],
    goals: [
      'Create the illusion of a defined waist with empire seams or A-line cuts',
      'Draw attention upward and outward to balance the midsection',
    ],
  },
  {
    shape: 'Rectangle',
    unique:
      'Bust, waist, and hips are all roughly the same width, giving a straight, athletic silhouette with minimal curve definition.',
    wear: [
      'Belted dresses and peplum tops to create the appearance of curves',
      'Layered outfits with texture to add dimension',
      'Ruffles, pleats, or patterned fabric around the waist and hips',
    ],
    avoid: [
      'Completely straight-cut shift dresses with no shaping',
      'Boxy tops paired with boxy bottoms — it flattens your shape further',
    ],
    famous: ['Cameron Diaz', 'Keira Knightley', 'Natalie Portman'],
    goals: [
      'Build the illusion of curves through belting, ruffles, and layering',
      'Create visual interest at the waist to break up a straight line',
    ],
  },
  {
    shape: 'Inverted Triangle',
    unique:
      'Shoulders and bust are noticeably broader than the hips, often with an athletic upper body and narrower lower half.',
    wear: [
      'A-line and flared skirts or trousers that add volume below the waist',
      'Simple, unembellished tops that keep the upper body streamlined',
      'V-necks to soften a broad shoulder line',
    ],
    avoid: [
      'Shoulder pads, halter necks, or boat necks that widen the top further',
      'Skinny bottoms that exaggerate the narrower lower half',
    ],
    famous: ['Angelina Jolie', 'Naomi Campbell', 'Demi Moore'],
    goals: [
      'Add volume to the hips and lower body to balance broader shoulders',
      'Keep the upper body simple and uncluttered',
    ],
  },
];

export function getBodyShapeProfile(shape: BodyShape): BodyShapeProfile {
  return BODY_SHAPE_PROFILES.find((p) => p.shape === shape) ?? BODY_SHAPE_PROFILES[0];
}

export const SHAPE_METRICS: Record<BodyShape, { shoulder: number; waist: number; hip: number }> = {
  Hourglass: { shoulder: 38, waist: 20, hip: 38 },
  Pear: { shoulder: 28, waist: 24, hip: 40 },
  Apple: { shoulder: 34, waist: 38, hip: 30 },
  Rectangle: { shoulder: 32, waist: 30, hip: 32 },
  'Inverted Triangle': { shoulder: 40, waist: 26, hip: 22 },
};
