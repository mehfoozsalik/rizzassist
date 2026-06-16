export interface EyeShapeGuideEntry {
  name: string;
  description: string;
  tips: string[];
  tilt: number;
  widthRatio: number;
  heightRatio: number;
  crease: boolean;
}

export const EYE_SHAPE_GUIDE: EyeShapeGuideEntry[] = [
  {
    name: 'Almond',
    description:
      'Tapered, pointed corners with visible crease — often considered the most balanced and versatile eye shape.',
    tips: [
      'Most eyeliner and eyeshadow styles work well — experiment freely',
      'Winged liner following the natural lift of the outer corner looks great',
      'Define the crease with a mid-tone shade for added dimension',
    ],
    tilt: 0,
    widthRatio: 1,
    heightRatio: 0.55,
    crease: true,
  },
  {
    name: 'Round',
    description:
      'Visible iris top and bottom with a circular, open appearance and a less elongated horizontal shape.',
    tips: [
      'Extend liner slightly past the outer corner to elongate the eye',
      'Apply darker shadow at the outer V to add length',
      'Avoid heavy liner all the way around — it can make eyes look smaller',
    ],
    tilt: 0,
    widthRatio: 0.85,
    heightRatio: 0.75,
    crease: true,
  },
  {
    name: 'Monolid',
    description:
      'Minimal or no visible crease, with the eyelid skin lying flat from lash line to brow bone.',
    tips: [
      'Gradient eyeshadow blending (dark at lash line, lighter up top) adds dimension',
      'Tightline the upper lash line to define the eye shape',
      'Winged liner drawn slightly thicker compensates for the flat lid',
    ],
    tilt: 0,
    widthRatio: 1.05,
    heightRatio: 0.4,
    crease: false,
  },
  {
    name: 'Hooded',
    description:
      'A fold of skin partially covers the crease when eyes are open, making the lid space appear smaller.',
    tips: [
      'Apply shadow with eyes open to ensure visibility',
      'Matte shades blend better than shimmer on hooded lids',
      'Thin liner that flicks up slightly avoids the smudge-and-fade problem',
    ],
    tilt: 0,
    widthRatio: 1,
    heightRatio: 0.45,
    crease: true,
  },
  {
    name: 'Deep-set',
    description:
      'Eyes sit further back in the socket, often appearing more shadowed with a prominent brow bone.',
    tips: [
      'Light, shimmery shades on the lid help bring eyes forward',
      'Avoid heavy dark shadow in the crease — it can look sunken',
      'Highlight the inner corner and brow bone for a brightening effect',
    ],
    tilt: 0,
    widthRatio: 0.95,
    heightRatio: 0.5,
    crease: true,
  },
  {
    name: 'Wide-set',
    description:
      'More than one eye-width of space between the inner corners, giving a spaced-out, open appearance.',
    tips: [
      'Apply darker shadow toward the inner corner to visually pull eyes closer',
      'Tightline the inner lash line to ground the inner corner',
      'Define the inner corner with a darker pencil before blending outward',
    ],
    tilt: 0,
    widthRatio: 1,
    heightRatio: 0.5,
    crease: true,
  },
  {
    name: 'Close-set',
    description:
      'Less than one eye-width of space between the inner corners, giving a more centered appearance.',
    tips: [
      'Keep inner corners light and bright to create visual space',
      'Focus darker shadow toward the outer corner instead of the inner one',
      'Avoid liner that starts too far into the inner corner',
    ],
    tilt: 0,
    widthRatio: 0.95,
    heightRatio: 0.5,
    crease: true,
  },
  {
    name: 'Downturned',
    description:
      'Outer corners angle slightly downward compared to the inner corners, giving a softer, gentler look.',
    tips: [
      'A subtle winged liner that angles upward at the outer corner counteracts the downward tilt',
      'Avoid letting eyeliner droop down at the outer edge',
      'Concentrate definition along the upper lash line, lifting outward',
    ],
    tilt: 4,
    widthRatio: 1,
    heightRatio: 0.5,
    crease: true,
  },
  {
    name: 'Upturned',
    description:
      'Outer corners angle slightly upward compared to the inner corners, giving a naturally lifted, feline look.',
    tips: [
      'A classic winged liner enhances the natural upward lift',
      'Cat-eye and feline-flick styles are especially flattering',
      'Keep the wing following your natural angle rather than over-exaggerating it',
    ],
    tilt: -4,
    widthRatio: 1,
    heightRatio: 0.5,
    crease: true,
  },
  {
    name: 'Protruding',
    description:
      'Eyes extend further out from the face with more visible eyelid surface, giving a rounder, more prominent look.',
    tips: [
      'Matte, darker shades on the lid help recede the eye visually',
      'Smoky, blended definition along the crease adds depth without emphasizing protrusion',
      'Avoid frosted or light shimmer all over the lid — it draws more attention forward',
    ],
    tilt: 0,
    widthRatio: 1,
    heightRatio: 0.7,
    crease: true,
  },
];
