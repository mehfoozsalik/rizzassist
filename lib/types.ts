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

export interface AnalysisResult {
  rizzScore: number;
  overallImpression: string;
  scores: ScoreItem[];
  styleTips: string[];
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
