import type { BodyType, BodyTypeMeasurements, BodyTypeResult, FrameSize } from '@/lib/types';

const LB_TO_KG = 0.45359237;
const IN_TO_CM = 2.54;

function frameSize(wristCm: number, gender: 'male' | 'female' = 'male'): FrameSize {
  if (gender === 'female') {
    if (wristCm < 14) return 'small';
    if (wristCm <= 16.5) return 'medium';
    return 'large';
  }
  if (wristCm < 16) return 'small';
  if (wristCm <= 18.5) return 'medium';
  return 'large';
}

function detectBodyType(
  bmi: number,
  frame: FrameSize,
  shoulderHipRatio: number,
  waistHipRatio: number
): BodyType {
  if (bmi < 18.5 && (frame === 'small' || frame === 'medium')) return 'Ectomorph';
  if (bmi >= 18.5 && bmi <= 24.9 && shoulderHipRatio >= 1.0) return 'Mesomorph';
  if (bmi >= 18.5 && bmi <= 27 && frame === 'medium') return 'Mesomorph';
  if (bmi > 25 || waistHipRatio > 0.85) return 'Endomorph';
  return 'Mesomorph';
}

export function calculateBodyType(m: BodyTypeMeasurements): BodyTypeResult {
  const weightKg = m.unit === 'imperial' ? m.weight * LB_TO_KG : m.weight;
  const heightCm = m.unit === 'imperial' ? m.height * IN_TO_CM : m.height;
  const wristCm = m.unit === 'imperial' ? m.wrist * IN_TO_CM : m.wrist;
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? weightKg / (heightM * heightM) : 0;

  const frame = frameSize(wristCm, m.gender ?? 'male');
  const shoulderHipRatio = m.hip > 0 ? m.shoulder / m.hip : 0;
  const waistHipRatio = m.hip > 0 ? m.waist / m.hip : 0;

  const type = detectBodyType(bmi, frame, shoulderHipRatio, waistHipRatio);

  return {
    type,
    bmi: Math.round(bmi * 10) / 10,
    frameSize: frame,
    shoulderHipRatio: Math.round(shoulderHipRatio * 100) / 100,
    waistHipRatio: Math.round(waistHipRatio * 100) / 100,
  };
}

export interface BodyTypeProfile {
  type: BodyType;
  description: string;
  fitness: string[];
  diet: string[];
  style: string[];
  famous: string[];
}

export const BODY_TYPE_PROFILES: BodyTypeProfile[] = [
  {
    type: 'Ectomorph',
    description:
      'A naturally lean, narrow frame with fast metabolism. Ectomorphs tend to have smaller joints, narrow shoulders and hips, and find it harder to gain weight or muscle.',
    fitness: [
      'Prioritize heavy compound lifts (squats, deadlifts, bench press) over cardio',
      'Keep sessions shorter and intense, since excessive cardio burns precious calories',
      'Allow longer rest between sets (90+ seconds) to maximize strength gains',
    ],
    diet: [
      'Eat in a calorie surplus with frequent meals (5-6 per day)',
      'Prioritize protein (1.6-2.2g per kg bodyweight) to support muscle growth',
      "Don't skip carbs: they fuel the intensity needed to build mass",
    ],
    style: [
      'Layering adds visual bulk: try jackets, layered tees, and textured fabrics',
      'Horizontal stripes and structured shoulders create the illusion of width',
      'Avoid overly baggy clothes that swallow your frame, and go for slim, tailored fits instead',
    ],
    famous: ['Adrien Brody', 'Kate Moss', 'Cillian Murphy'],
  },
  {
    type: 'Mesomorph',
    description:
      'An athletic, naturally muscular build with shoulders roughly as wide as the hips. Mesomorphs gain muscle and lose fat relatively easily compared to other types.',
    fitness: [
      'Mix strength training with moderate cardio for balanced conditioning',
      'Respond well to varied training: change rep ranges every few weeks',
      'Train 4-5x per week; recovery is generally faster than other types',
    ],
    diet: [
      'Balanced macros work best: roughly even protein, carbs, and fats',
      'Calorie needs adjust quickly with activity level, so track and tweak often',
      'Time carbs around workouts for performance and recovery',
    ],
    style: [
      'Fitted and tailored clothing shows off your natural proportions',
      'V-necks and crew necks both work well with your balanced shoulder-to-hip ratio',
      'Avoid overly loose fits that hide your build’s natural shape',
    ],
    famous: ['Dwayne Johnson', 'Serena Williams', 'Chris Hemsworth'],
  },
  {
    type: 'Endomorph',
    description:
      'A solid, naturally curvier build with a wider waist and hips relative to the shoulders. Endomorphs carry weight efficiently and tend to build strength quickly, though metabolism runs slower.',
    fitness: [
      'Combine strength training with regular cardio (3-4x per week) for fat loss',
      'Higher training volume and shorter rest periods boost calorie burn',
      'Compound movements (lunges, rows, presses) build efficient, functional strength',
    ],
    diet: [
      'A moderate calorie deficit with high protein preserves muscle while losing fat',
      'Favor complex carbs (oats, vegetables, legumes) over refined sugars',
      'Spacing meals evenly helps manage hunger and blood sugar',
    ],
    style: [
      'Monochrome outfits and vertical lines elongate and streamline your silhouette',
      'Structured blazers and tailored waistlines define your shape nicely',
      'Avoid clingy fabrics around the midsection, opting instead for breathable, structured material',
    ],
    famous: ['Jack Black', 'Adele', 'Jonah Hill'],
  },
];

export function getBodyTypeProfile(type: BodyType): BodyTypeProfile {
  return BODY_TYPE_PROFILES.find((p) => p.type === type) ?? BODY_TYPE_PROFILES[1];
}

export function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}
