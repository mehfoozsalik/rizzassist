export type FaceShape =
  | 'Oval'
  | 'Round'
  | 'Square'
  | 'Heart'
  | 'Diamond'
  | 'Oblong'
  | 'Triangle';

export interface FaceShapeMeasurements {
  faceLengthRatio: number;
  jawToCheekRatio: number;
  foreheadToJawRatio: number;
  cheekToJawDiff: number;
}

export interface FaceShapeProfile {
  shape: FaceShape;
  tagline: string;
  description: string;
  traits: string[];
  hairstyles: string[];
  glasses: string[];
  grooming: string[];
  personalityPresence: string[];
  avoid: string[];
}

export const FACE_SHAPE_PROFILES: FaceShapeProfile[] = [
  {
    shape: 'Oval',
    tagline: 'Balanced proportions, your most versatile canvas',
    description:
      'Cheekbones are usually the widest point, with a gentle taper to a soft chin and face length about 1.5× width. Oval faces suit almost every style, so grooming becomes about intention, not correction.',
    traits: ['Cheekbones widest', 'Length ~1.5× width', 'Soft jaw taper'],
    hairstyles: [
      'Most cuts work, pick one that matches your personality energy',
      'Medium layers or a clean fade for everyday confidence',
      'Side parts and curtain bangs both land well',
    ],
    glasses: ['Wayfarer', 'Aviator', 'Rectangular', 'Oval'],
    grooming: [
      'Keep brows tidy but natural, oval already has balance',
      'Beard: short boxed or light stubble frames without hiding the oval line',
      'Skincare glow matters more than contouring for presence',
    ],
    personalityPresence: [
      'Lean into approachability, soft eye contact and open posture',
      'Your face reads as balanced; let outfits and voice carry edge if you want it',
      'Photo tip: slight three-quarter angle still looks polished',
    ],
    avoid: ['Overly extreme asymmetry that fights natural balance'],
  },
  {
    shape: 'Round',
    tagline: 'Soft curves, style that adds definition and length',
    description:
      'Width and length are nearly equal with soft jaw curves and full cheeks. Grooming that adds vertical lines helps your presence read sharper and more intentional.',
    traits: ['Width ≈ length', 'Full cheeks', 'Soft jaw curves'],
    hairstyles: [
      'Volume on top (quiff, textured crop) to elongate',
      'Side-swept styles and longer layers',
      'Avoid blunt chin-length cuts that widen the face',
    ],
    glasses: ['Rectangular', 'Square', 'Geometric', 'Wayfarer'],
    grooming: [
      'Brows with a gentle arch add structure',
      'Beard: goatee or longer chin coverage to lengthen the face',
      'Contour lightly along temples and jaw for photos if you use makeup',
    ],
    personalityPresence: [
      'Use height in hair and vertical outfit lines to project polish',
      'Stand tall, posture multiplies the elongating effect of your cut',
      'Smile freely; soft features read warm, pair with crisp clothing for contrast',
    ],
    avoid: ['Ultra-round frames that echo cheek width', 'Flat hair with zero crown height'],
  },
  {
    shape: 'Square',
    tagline: 'Strong angles, soften with contrast for magnetic presence',
    description:
      'Forehead, cheekbones, and jaw are similar in width with a defined angular jaw. Softening styles create contrast and keep your presence powerful without looking severe.',
    traits: ['Equal widths', 'Angular jaw', 'Width ≈ length'],
    hairstyles: [
      'Soft waves, textured fringes, or side-swept looks',
      'Medium length that breaks the jaw line',
      'Avoid ultra-boxy flat tops that exaggerate angles',
    ],
    glasses: ['Round', 'Oval', 'Aviator', 'Clubmaster'],
    grooming: [
      'Brows slightly rounded soften the forehead line',
      'Beard: rounded or faded jaw beard softens sharp corners',
      'Keep sideburns neat so the jaw remains intentional, not harsh',
    ],
    personalityPresence: [
      'Your bone structure already signals confidence, soften with approachable expression',
      'Pair structured clothes with relaxed fabric (knit, linen) for balance',
      'Camera tip: slight smile reduces severity in still photos',
    ],
    avoid: ['Heavy square frames stacked on a square jaw', 'Hard geometric cuts with zero texture'],
  },
  {
    shape: 'Heart',
    tagline: 'Wide forehead, delicate chin, balance the silhouette',
    description:
      'Prominent forehead and high cheekbones taper to a narrower chin. Styles that add width at the jaw and soft volume near the chin create proportional harmony.',
    traits: ['Forehead widest', 'High cheekbones', 'Narrow chin'],
    hairstyles: [
      'Chin-length bobs, side parts, and soft waves at the jaw',
      'Avoid too much volume at the crown alone',
      'Longer styles with ends near the chin balance the taper',
    ],
    glasses: ['Aviator', 'Bottom-heavy frames', 'Cat-Eye', 'Wayfarer'],
    grooming: [
      'Brows not too thin at the outer edge, keep gentle fullness',
      'Beard: fuller at the chin/cheeks to balance a narrower jaw',
      'Highlight mid-face; keep forehead makeup/matte so it doesn’t dominate',
    ],
    personalityPresence: [
      'Your upper face draws attention, use eye contact and expressive brows',
      'Necklines and collars that widen the lower frame help outfit balance',
      'Lead with warmth; heart shapes often read expressive and engaging',
    ],
    avoid: ['Heavy bangs that shrink the forehead without balancing the chin'],
  },
  {
    shape: 'Diamond',
    tagline: 'Striking cheekbones, frame temples and chin for balance',
    description:
      'Narrow forehead and jaw with wide, prominent cheekbones. Volume at temples and soft width at the chin balances the standout mid-face.',
    traits: ['Cheekbones prominent', 'Narrow forehead', 'Pointed chin'],
    hairstyles: [
      'Volume at the temples and soft fringe options',
      'Chin-length or collarbone styles that widen the lower face',
      'Avoid ultra-tight slick-backs that emphasize cheek width alone',
    ],
    glasses: ['Oval', 'Cat-Eye', 'Rimless', 'Butterfly'],
    grooming: [
      'Brows with soft peaks, don’t over-arch into severity',
      'Beard: light fullness at the chin to widen a pointed jaw',
      'Makeup/contour: soften cheek apex; bring light to forehead and chin',
    ],
    personalityPresence: [
      'High cheekbones read memorable, keep grooming precise, not busy',
      'Minimal jewelry near the cheeks lets bone structure speak',
      'Confident stillness photographs well; avoid over-posing',
    ],
    avoid: ['Narrow frames that ignore cheek width', 'Hair flat at the temples'],
  },
  {
    shape: 'Oblong',
    tagline: 'Elongated lines, add width and break vertical length',
    description:
      'Face length exceeds width with relatively straight sides. Horizontal volume, bangs, and wider frames interrupt length and create a more grounded look.',
    traits: ['Length >> width', 'Straight sides', 'Minimal taper'],
    hairstyles: [
      'Bangs, curtain fringe, or shoulder-length waves',
      'Side volume and layers that add width',
      'Avoid super-long sleek styles that stretch the face further',
    ],
    glasses: ['Wide Wayfarer', 'Aviator', 'Clubmaster', 'Oversized Round'],
    grooming: [
      'Brows with more horizontal emphasis',
      'Beard: keep shorter on the chin, fuller on the cheeks for width',
      'Avoid long pointed goatees that elongate further',
    ],
    personalityPresence: [
      'Horizontal details in clothing (scarves, wider collars) ground your frame',
      'Smile and eye contact fill vertical space with warmth',
      'Photo tip: chin slightly down, camera a bit above eye level',
    ],
    avoid: ['Long skinny scarves under the chin', 'Ultra-narrow frames'],
  },
  {
    shape: 'Triangle',
    tagline: 'Strong jaw base, build presence upward',
    description:
      'Widest at the jaw and narrower at the forehead, the inverse of heart. Volume at the crown and styles that widen the upper face create balance.',
    traits: ['Jaw widest', 'Narrow forehead', 'Bottom-heavy'],
    hairstyles: [
      'Volume and texture at the crown and temples',
      'Shorter sides with fuller top',
      'Avoid heavy length that piles weight at the jaw',
    ],
    glasses: ['Aviator', 'Browline', 'Clubmaster', 'Semi-rimless'],
    grooming: [
      'Brows with gentle lift at the outer third',
      'Beard: keep jaw beard trimmed tighter; leave more on cheeks/sideburns carefully',
      'Highlight forehead/temples; matte the jaw area in photos if using makeup',
    ],
    personalityPresence: [
      'Your jaw already signals strength, soften with open expression',
      'Structured shoulders and open collars balance a wider lower face',
      'Lead with listening energy so strength doesn’t read as intensity',
    ],
    avoid: ['Heavy bottom-weighted beards', 'Flat hair with zero crown volume'],
  },
];

export function getFaceShapeProfile(shape: FaceShape): FaceShapeProfile {
  return FACE_SHAPE_PROFILES.find((p) => p.shape === shape) ?? FACE_SHAPE_PROFILES[0];
}

/** Classify face shape from MediaPipe-derived ratios (same logic as ImageUploader). */
export function classifyFaceShape(m: FaceShapeMeasurements): FaceShape {
  const { faceLengthRatio, jawToCheekRatio, foreheadToJawRatio } = m;

  if (faceLengthRatio > 1.55) return 'Oblong';
  if (faceLengthRatio < 1.1) return 'Round';
  if (foreheadToJawRatio > 1.25 && jawToCheekRatio < 0.82) return 'Heart';
  if (foreheadToJawRatio < 0.85 && jawToCheekRatio > 0.95) return 'Triangle';
  if (
    m.cheekToJawDiff > 0.12 &&
    foreheadToJawRatio > 0.9 &&
    foreheadToJawRatio < 1.15 &&
    jawToCheekRatio < 0.85
  ) {
    return 'Diamond';
  }
  if (jawToCheekRatio > 0.88 && faceLengthRatio < 1.35) return 'Square';
  return 'Oval';
}

export function detectFaceShapeFromLandmarks(
  landmarks: Array<{ x: number; y: number; z?: number }>,
  w: number,
  h: number,
  distance: (
    a: { x: number; y: number },
    b: { x: number; y: number },
    iw: number,
    ih: number
  ) => number
): { shape: FaceShape; measurements: FaceShapeMeasurements } {
  const faceHeight = distance(landmarks[10], landmarks[152], w, h);
  const cheekboneWidth = distance(landmarks[234], landmarks[454], w, h);
  const jawWidth = distance(landmarks[172], landmarks[397], w, h);
  const foreheadWidth = distance(landmarks[54], landmarks[284], w, h);

  const measurements: FaceShapeMeasurements = {
    faceLengthRatio: cheekboneWidth > 0 ? faceHeight / cheekboneWidth : 1.3,
    jawToCheekRatio: cheekboneWidth > 0 ? jawWidth / cheekboneWidth : 0.85,
    foreheadToJawRatio: jawWidth > 0 ? foreheadWidth / jawWidth : 1,
    cheekToJawDiff:
      cheekboneWidth > 0 ? (cheekboneWidth - jawWidth) / cheekboneWidth : 0,
  };

  return { shape: classifyFaceShape(measurements), measurements };
}

/** Manual calculator from four tape measurements (cm or inches, ratio only). */
export function classifyFromManualMeasurements(input: {
  forehead: number;
  cheekbones: number;
  jaw: number;
  faceLength: number;
}): FaceShape {
  const { forehead, cheekbones, jaw, faceLength } = input;
  if ([forehead, cheekbones, jaw, faceLength].some((n) => !n || n <= 0)) {
    return 'Oval';
  }
  return classifyFaceShape({
    faceLengthRatio: faceLength / cheekbones,
    jawToCheekRatio: jaw / cheekbones,
    foreheadToJawRatio: forehead / jaw,
    cheekToJawDiff: (cheekbones - jaw) / cheekbones,
  });
}
