import type { AnalysisResult, ShadeItem, ClothingColor } from '@/lib/types';
import { callDeepSeek, isDeepSeekOverloaded, isInsufficientBalance, isBadApiKey, isRateLimit } from '@/lib/deepseekServer';
import { fallbackClothesByFaceShape, normalizeHex } from '@/lib/clothesAdvice';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SEO_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, max-age=0',
  'X-Robots-Tag': 'noindex',
};

const VALID_SHADE_STYLES = [
  'Aviator', 'Wayfarer', 'Round', 'Cat-Eye', 'Clubmaster',
  'Square', 'Rectangular', 'Oval', 'Geometric', 'Butterfly',
] as const;

interface FaceData {
  detected: boolean;
  faceShape: string;
  faceLengthRatio: number;
  jawToCheekRatio: number;
  foreheadToJawRatio: number;
  symmetryScore: number;
  eyeShape: string;
  eyeAspectRatio: number;
  cornerTilt: string;
}

interface BodyData {
  detected: boolean;
  shoulderHipRatio: number;
  bodyTendency: string;
}

function buildPrompt(faceData: FaceData | null, bodyData: BodyData | null): string {
  const faceSection = faceData?.detected
    ? `FACE ANALYSIS (MediaPipe Face Landmarker):
- Face shape: ${faceData.faceShape}
- Face length to width ratio: ${faceData.faceLengthRatio.toFixed(2)}
- Jaw to cheekbone ratio: ${faceData.jawToCheekRatio.toFixed(2)}
- Forehead to jaw ratio: ${faceData.foreheadToJawRatio.toFixed(2)}
- Facial symmetry score: ${faceData.symmetryScore.toFixed(2)} (0 to 1, higher is more symmetric)
- Eye shape: ${faceData.eyeShape}
- Eye aspect ratio: ${faceData.eyeAspectRatio.toFixed(2)}
- Eye corner tilt: ${faceData.cornerTilt}`
    : 'FACE ANALYSIS: No face clearly detected in this photo.';

  const bodySection = bodyData?.detected
    ? `BODY ANALYSIS (MediaPipe Pose Landmarker):
- Shoulder to hip ratio: ${bodyData.shoulderHipRatio.toFixed(2)}
- Body build tendency: ${bodyData.bodyTendency}`
    : 'BODY ANALYSIS: No full body clearly detected in this photo.';

  return `You are Rizz Assist, an elite AI style coach and confidence expert. A user submitted a photo that was analyzed locally by AI landmark detection. Their photo never left their device. Use only the extracted measurements below to write a personalized Rizz Report.

${faceSection}

${bodySection}

Tone: confident hype-man meets sophisticated style consultant, GQ-meets-your-most-charismatic-friend energy. Frame everything as opportunity, never criticism.

INSTRUCTIONS:
- Reference the detected face shape explicitly when recommending shades, hairstyles, clothing colors, and clothes.
- ALWAYS include clothingColors (with real hex codes) and clothesSuggestions, these are required sections of the Rizz Report.
- clothingColors: 4-5 specific wearable colors (tops, jackets, shirts) that flatter this face shape. Each must include name, hex (#RRGGBB), and a short why.
- clothesSuggestions: 5 concrete clothing items / outfits to wear (e.g. "navy crew-neck tee", "tailored charcoal blazer", "dark wash straight jeans") matched to face shape + body build.
- Also fill dressColors and dressStyles as short string lists (colors + silhouettes/necklines).
- Recommend haircut styles that suit the detected face shape.
- Reference the eye shape in faceOrientation tips.
- Reference the body build tendency in fit and silhouette suggestions.
- For Style, score 65-80 as a motivating baseline since you cannot see the outfit.
- For Grooming, use symmetry score as a guide: symmetryScore > 0.85 suggests 75+, below 0.7 suggests 60-70.
- For Photo Quality, always set 75 with a note that the photo was processed locally.
- Alpha Presence and Edge Factor reflect face shape and bone structure projections.
- Pickup lines must be clever, tasteful, and SFW. Reference their best detected feature subtly.
- If no face was detected, acknowledge the photo was unclear and give warm general tips.

SCORE DEFINITIONS:
- "Style": inferred from body build tendency (0=fashion disaster, 100=runway ready)
- "Grooming": estimated from face symmetry score (0=needs work, 100=immaculate)
- "Alpha Presence": commanding energy from face shape and proportions (0=wallflower, 100=commands every room)
- "Edge Factor": mysterious magnetism from facial features (0=safe, 100=dangerously captivating)
- "Photo Quality": always 75, processed locally

Return ONLY valid JSON, no markdown, no code fences, exactly this shape:
{
  "rizzScore": <0-100, weighted average biased toward Alpha Presence and Edge Factor>,
  "overallImpression": "<2-3 sentences: lead with their strongest quality from the measurements, name their vibe archetype, end with excitement about their potential>",
  "scores": [
    { "label": "Style", "score": <0-100>, "note": "<specific observation from body build>" },
    { "label": "Grooming", "score": <0-100>, "note": "<observation from symmetry score>" },
    { "label": "Alpha Presence", "score": <0-100>, "note": "<observation from face shape strength>" },
    { "label": "Edge Factor", "score": <0-100>, "note": "<observation from detected features>" },
    { "label": "Photo Quality", "score": 75, "note": "Photo processed locally on device for privacy." }
  ],
  "styleTips": [
    "<color or outfit suggestion matched to body build tendency>",
    "<accessory tip that complements the detected face shape>",
    "<clothing fit recommendation>",
    "<something to avoid based on the measurements>",
    "<signature look suggestion>"
  ],
  "clothingColors": [
    { "name": "<color name e.g. Navy>", "hex": "<#RRGGBB>", "why": "<why this clothing color flatters their face>" },
    { "name": "<second color>", "hex": "<#RRGGBB>", "why": "<why>" },
    { "name": "<third color>", "hex": "<#RRGGBB>", "why": "<why>" },
    { "name": "<fourth color>", "hex": "<#RRGGBB>", "why": "<why>" }
  ],
  "clothesSuggestions": [
    "<specific top or shirt to wear>",
    "<jacket / outerwear suggestion>",
    "<bottoms suggestion>",
    "<full casual outfit idea>",
    "<date-night or elevated outfit idea>"
  ],
  "dressColors": [
    "<color name that flatters this face, with a short why>",
    "<second color>",
    "<third color>",
    "<accent combo to try>"
  ],
  "dressStyles": [
    "<silhouette or cut that suits face + body>",
    "<neckline or collar that flatters the face>",
    "<formal look suggestion>",
    "<casual everyday style suggestion>"
  ],
  "haircutStyles": [
    "<haircut that suits the detected face shape, with a short why>",
    "<second haircut option>",
    "<third option or styling tip (length, fringe, fade, layers)>"
  ],
  "shades": [
    { "style": "<MUST be exactly one of: Aviator, Wayfarer, Round, Cat-Eye, Clubmaster, Square, Rectangular, Oval, Geometric, Butterfly>", "description": "<why this frame suits the detected face shape>", "faceShape": "<the detected face shape in lowercase>" },
    { "style": "<second recommendation, different from first>", "description": "<why>", "faceShape": "<same face shape>" }
  ],
  "faceOrientation": [
    "<best camera angle for the detected face shape>",
    "<expression tip referencing the detected eye shape>",
    "<grooming tip for the detected face shape>",
    "<lighting tip>"
  ],
  "pickupLines": [
    "<witty line with subtle nod to their best detected feature>",
    "<playful teasing line>",
    "<smooth and suave line, timeless class>",
    "<bold line, slightly daring but classy>",
    "<mysterious line that leaves them wanting more>"
  ],
  "confidenceTips": [
    "<posture or body language upgrade for their build>",
    "<mindset shift that leverages their face shape strength>",
    "<daily habit that builds magnetic confidence>",
    "<their strongest detected trait to lean into>"
  ]
}`;
}

function extractJson(text: string): AnalysisResult | null {
  try {
    return JSON.parse(text) as AnalysisResult;
  } catch {
    return null;
  }
}

function sanitize(raw: AnalysisResult, faceShapeHint = 'oval'): AnalysisResult {
  const toStrings = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x) => typeof x === 'string').slice(0, 6) : [];
  const clampScore = (n: unknown) =>
    Math.max(0, Math.min(100, Math.round(Number(n) || 0)));
  const scores = Array.isArray(raw.scores) ? raw.scores : [];
  const avg =
    scores.length > 0
      ? Math.round(scores.reduce((sum, s) => sum + clampScore(s?.score), 0) / scores.length)
      : 0;
  const rizzScore = clampScore(raw.rizzScore) || avg;

  const toShades = (v: unknown): ShadeItem[] => {
    if (!Array.isArray(v)) return [];
    return v
      .filter((x) => x && typeof x === 'object')
      .slice(0, 4)
      .map((x: Record<string, unknown>) => {
        const rawStyle = typeof x.style === 'string' ? x.style.trim() : '';
        const matched = VALID_SHADE_STYLES.find(
          (s) => s.toLowerCase() === rawStyle.toLowerCase()
        );
        return {
          style: matched ?? 'Wayfarer',
          description: typeof x.description === 'string' ? x.description : '',
          faceShape: typeof x.faceShape === 'string' ? x.faceShape : '',
        };
      });
  };

  const toClothingColors = (v: unknown): ClothingColor[] => {
    if (!Array.isArray(v)) return [];
    return v
      .filter((x) => x && typeof x === 'object')
      .slice(0, 6)
      .map((x: Record<string, unknown>) => ({
        name: typeof x.name === 'string' && x.name.trim() ? x.name.trim() : 'Accent',
        hex: normalizeHex(x.hex),
        why: typeof x.why === 'string' ? x.why : '',
      }));
  };

  const fallback = fallbackClothesByFaceShape(faceShapeHint);
  let clothingColors = toClothingColors((raw as AnalysisResult).clothingColors);
  let clothesSuggestions = toStrings((raw as AnalysisResult).clothesSuggestions);
  let dressColors = toStrings((raw as AnalysisResult).dressColors);
  let dressStyles = toStrings((raw as AnalysisResult).dressStyles);

  // If AI returned plain dressColors but no structured clothingColors, promote them
  if (!clothingColors.length && dressColors.length) {
    clothingColors = dressColors.slice(0, 4).map((line, i) => {
      const name = line.split(/[:, -]/)[0]?.trim() || `Color ${i + 1}`;
      return {
        name: name.slice(0, 32),
        hex: fallback.clothingColors[i % fallback.clothingColors.length].hex,
        why: line,
      };
    });
  }

  if (!clothesSuggestions.length && dressStyles.length) {
    clothesSuggestions = dressStyles;
  }

  if (!clothingColors.length) clothingColors = fallback.clothingColors;
  if (!clothesSuggestions.length) clothesSuggestions = fallback.clothesSuggestions;
  if (!dressColors.length) {
    dressColors = clothingColors.map((c) => `${c.name}: ${c.why || 'Flattering wardrobe color.'}`);
  }
  if (!dressStyles.length) dressStyles = clothesSuggestions.slice(0, 4);

  return {
    rizzScore,
    overallImpression:
      typeof raw.overallImpression === 'string' ? raw.overallImpression : 'Rizz Report complete.',
    scores: Array.isArray(raw.scores)
      ? raw.scores
          .filter((s) => s && typeof s.label === 'string')
          .slice(0, 6)
          .map((s) => ({
            label: s.label,
            score: clampScore(s.score),
            note: typeof s.note === 'string' ? s.note : '',
          }))
      : [],
    styleTips: toStrings(raw.styleTips),
    dressColors,
    dressStyles,
    clothingColors,
    clothesSuggestions,
    haircutStyles: toStrings((raw as AnalysisResult).haircutStyles),
    shades: toShades(raw.shades),
    faceOrientation: toStrings(raw.faceOrientation),
    pickupLines: toStrings(raw.pickupLines),
    confidenceTips: toStrings(raw.confidenceTips),
  };
}

export async function POST(request: Request) {
  try {
    if (!process.env.DEEPSEEK_API_KEY) {
      return Response.json(
        { error: 'Server is not configured. Missing DEEPSEEK_API_KEY.' },
        { status: 500, headers: SEO_HEADERS }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return Response.json(
        { error: 'Invalid request. Expected JSON with faceData and/or bodyData.' },
        { status: 400, headers: SEO_HEADERS }
      );
    }

    const faceData = (body.faceData && typeof body.faceData === 'object') ? body.faceData as FaceData : null;
    const bodyData = (body.bodyData && typeof body.bodyData === 'object') ? body.bodyData as BodyData : null;

    if (!faceData && !bodyData) {
      return Response.json(
        { error: 'No analysis data provided. Please upload a photo and try again.' },
        { status: 400, headers: SEO_HEADERS }
      );
    }

    if (faceData && !faceData.detected && (!bodyData || !bodyData.detected)) {
      return Response.json(
        {
          error:
            'No face detected. Upload a clear, well-lit photo of your face looking at the camera, avoid sunglasses, blur, or cropped shots.',
          code: 'NO_FACE',
        },
        { status: 422, headers: SEO_HEADERS }
      );
    }

    const text = await callDeepSeek(
      [{ role: 'user', content: buildPrompt(faceData, bodyData) }],
      { temperature: 0.75, maxTokens: 3200, jsonMode: true }
    );

    const parsedResult = extractJson(text);
    if (!parsedResult) {
      return Response.json(
        { error: 'Could not interpret the AI response. Please try again.' },
        { status: 502, headers: SEO_HEADERS }
      );
    }

    return Response.json(
      {
        feedback: sanitize(
          parsedResult,
          faceData?.detected ? faceData.faceShape : 'oval'
        ),
      },
      { headers: SEO_HEADERS }
    );
  } catch (err) {
    if (isBadApiKey(err)) {
      return Response.json(
        { error: 'Invalid DeepSeek API key. Check your server configuration.' },
        { status: 401, headers: SEO_HEADERS }
      );
    }
    if (isInsufficientBalance(err)) {
      return Response.json(
        { error: 'Insufficient DeepSeek credits. Top up your account at platform.deepseek.com.' },
        { status: 402, headers: SEO_HEADERS }
      );
    }
    if (isRateLimit(err)) {
      return Response.json(
        { error: 'AI rate limit reached. Please wait a moment and try again.' },
        { status: 429, headers: SEO_HEADERS }
      );
    }
    if (isDeepSeekOverloaded(err)) {
      return Response.json(
        { error: 'Our AI is experiencing high demand right now. Please try again in a moment.' },
        { status: 503, headers: SEO_HEADERS }
      );
    }
    const message = err instanceof Error ? err.message : 'Unexpected server error.';
    if (/abort|timeout/i.test(message)) {
      return Response.json(
        { error: 'Analysis took too long. Please try again.' },
        { status: 504, headers: SEO_HEADERS }
      );
    }
    return Response.json({ error: message }, { status: 500, headers: SEO_HEADERS });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...SEO_HEADERS,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
