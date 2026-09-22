export interface ScoreItem {
  label: string;
  score: number;
  note: string;
}

export interface ShadeItem {
  style: string;
  description: string;
  faceShape: string;
}

export interface ClothingColor {
  name: string;
  hex: string;
  why: string;
}

export interface AnalysisResult {
  rizzScore: number;
  overallImpression: string;
  scores: ScoreItem[];
  styleTips: string[];
  dressColors: string[];
  dressStyles: string[];
  clothesSuggestions: string[];
  clothingColors: ClothingColor[];
  haircutStyles: string[];
  shades: ShadeItem[];
  faceOrientation: string[];
  pickupLines: string[];
  confidenceTips: string[];
}

export interface AnalyzeResponse {
  feedback: AnalysisResult;
}

export interface AnalyzeError {
  error: string;
}

/* ─── Body Type Calculator ─── */
export type BodyType = 'Ectomorph' | 'Mesomorph' | 'Endomorph';
export type FrameSize = 'small' | 'medium' | 'large';
export type ActivityLevel = 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';

export interface BodyTypeMeasurements {
  height: number;
  weight: number;
  shoulder: number;
  chest: number;
  waist: number;
  hip: number;
  wrist: number;
  gender?: 'male' | 'female';
  activityLevel: ActivityLevel;
  unit: 'metric' | 'imperial';
}

export interface BodyTypeResult {
  type: BodyType;
  bmi: number;
  frameSize: FrameSize;
  shoulderHipRatio: number;
  waistHipRatio: number;
}

export interface BodyTypeAdvice {
  bodyType: string;
  bmi: number;
  bmiCategory: string;
  description: string;
  fitnessGoal: string;
  workoutPlan: string[];
  workoutsToAvoid: string[];
  dietTips: string[];
  macroSplit: { protein: string; carbs: string; fats: string };
  styleTips: string[];
  celebrities: string[];
  weeklyPlan: { cardio: string; strength: string; rest: string };
}

/* ─── Body Shape Calculator ─── */
export type BodyShape =
  | 'Hourglass'
  | 'Pear'
  | 'Apple'
  | 'Rectangle'
  | 'Inverted Triangle';

export interface BodyShapeMeasurements {
  bust: number;
  waist: number;
  hip: number;
  unit: 'metric' | 'imperial';
}

export interface BodyShapeAdvice {
  bodyShape: string;
  description: string;
  keyFeature: string;
  whatToWear: string[];
  whatToAvoid: string[];
  dressingGoal: string;
  bestNecklines: string[];
  bestBottoms: string[];
  celebrities: string[];
  outfitIdeas: string[];
}

/* ─── Eye Shape Detector ─── */
export interface EyeRatios {
  widthHeightRatio: number;
  creaseDepth: number;
  cornerTilt: number;
  eyeSpacing: number;
}

export interface EyeShapeResult {
  eyeShape: string;
  description: string;
  makeupTips: string[];
  eyelinerStyles: string[];
  eyeshadowTechniques: string[];
  famousExamples: string[];
  colorRecommendations: string[];
  avoidThese: string[];
}
