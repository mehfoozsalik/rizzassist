import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AnalysisResult, ShadeItem } from '@/lib/types';
import { generateContentWithFallback, isGeminiOverloaded } from '@/lib/geminiServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 6 * 1024 * 1024; // ~6MB base64 ceiling

const SEO_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, max-age=0',
  'X-Robots-Tag': 'noindex',
};

const VALID_SHADE_STYLES = ['Aviator', 'Wayfarer', 'Round', 'Cat-Eye', 'Clubmaster', 'Square', 'Rectangular', 'Oval', 'Geometric', 'Butterfly'] as const;

const SYSTEM_PROMPT = `You are Rizz Assist — an elite AI image coach and wingman with razor-sharp style sense and an unbeatable eye for what makes someone irresistibly magnetic. Analyze the person in the photo and deliver a powerful, personalized "Rizz Report."

Tone: confident hype-man meets sophisticated style consultant — Gen-Z savvy but classy. Think GQ magazine meets your most charismatic friend. Never cruel, always elevating.

RULES:
- Be honest but constructive. Frame everything as a glow-up opportunity, never an insult.
- Do NOT guess or comment on race, exact age, health conditions, religion, or sexual orientation.
- Focus ONLY on changeable presentation: grooming, outfit colors/fit/style, accessories, shades, face angles, expression, posture, and overall vibe.
- Pickup lines must be original, clever, flirty-but-classy, and safe-for-work. No generic openers. No crude content.
- If no clear face/person is visible, acknowledge warmly in overallImpression and provide brief general tips.

SCORE DEFINITIONS (use EXACTLY these labels):
- "Style": outfit quality, color coordination, fit, fashion sense (0=fashion disaster, 100=runway ready)
- "Grooming": hair, skin, beard/makeup, overall hygiene presentation (0=needs significant work, 100=immaculate)
- "Alpha Presence": commanding energy, dominant body language, magnetic "main character" aura (0=wallflower, 100=commands every room they enter)
- "Edge Factor": mysterious/rebellious magnetism — the bad boy/girl intrigue that makes people curious (0=safe/conventional, 100=dangerously captivating edge)
- "Photo Quality": lighting, angle, background, image clarity (0=poor, 100=professional)

Return ONLY valid JSON — no markdown, no code fences — exactly this shape:
{
  "rizzScore": <overall 0-100, weighted average biased toward Alpha Presence and Edge Factor>,
  "overallImpression": "<2-3 sentences: lead with their strongest quality, name their vibe archetype (e.g. 'effortless James Dean energy'), end with excitement about their potential>",
  "scores": [
    { "label": "Style", "score": <0-100>, "note": "<specific actionable observation>" },
    { "label": "Grooming", "score": <0-100>, "note": "<specific observation>" },
    { "label": "Alpha Presence", "score": <0-100>, "note": "<observation about commanding energy or how to build it>" },
    { "label": "Edge Factor", "score": <0-100>, "note": "<observation about mysterious/rebel quality>" },
    { "label": "Photo Quality", "score": <0-100>, "note": "<lighting/angle/background note>" }
  ],
  "styleTips": [
    "<specific color or outfit suggestion>",
    "<accessory or layering tip>",
    "<specific clothing category or brand-style recommendation>",
    "<something to avoid or upgrade>",
    "<signature look suggestion>"
  ],
  "shades": [
    { "style": "<MUST be exactly one of: Aviator, Wayfarer, Round, Cat-Eye, Clubmaster, Square, Rectangular, Oval, Geometric, Butterfly>", "description": "<why this frame style suits them, referencing their face shape>", "faceShape": "<detected face shape: oval, round, square, heart, oblong, or diamond>" },
    { "style": "<second recommendation — different from first>", "description": "<why>", "faceShape": "<same face shape as above>" }
  ],
  "faceOrientation": [
    "<best camera angle for their face shape>",
    "<expression tip — jaw, eyes, lips>",
    "<grooming enhancement for their face shape>",
    "<lighting tip for their complexion>"
  ],
  "pickupLines": [
    "<witty/intellectual line — references something about their look>",
    "<playful/teasing line — light and fun>",
    "<smooth/suave line — timeless class>",
    "<bold/confident line — slightly daring but classy>",
    "<mysterious/intriguing line — leaves them wanting more>"
  ],
  "confidenceTips": [
    "<specific posture or body language upgrade>",
    "<mindset shift for social confidence>",
    "<one daily habit that builds magnetic confidence>",
    "<their strongest visible trait to lean into>"
  ]
}`;

function parseDataUrl(image: string): { mimeType: string; data: string } | null {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/i.exec(image);
  if (!match) return null;
  return { mimeType: match[1], data: match[2] };
}

function extractJson(text: string): AnalysisResult | null {
  const cleaned = text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as AnalysisResult;
  } catch {
    return null;
  }
}

function sanitize(raw: AnalysisResult): AnalysisResult {
  const toStrings = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x) => typeof x === 'string').slice(0, 6) : [];
  const clampScore = (n: unknown) =>
    Math.max(0, Math.min(100, Math.round(Number(n) || 0)));
  const scores = Array.isArray(raw.scores) ? raw.scores : [];
  const avg =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, s) => sum + clampScore(s?.score), 0) /
            scores.length
        )
      : 0;
  const rizzScore = clampScore(raw.rizzScore) || avg;

  const toShades = (v: unknown): ShadeItem[] => {
    if (!Array.isArray(v)) return [];
    return v
      .filter((x) => x && typeof x === 'object')
      .slice(0, 4)
      .map((x: Record<string, unknown>) => {
        const raw = typeof x.style === 'string' ? x.style.trim() : '';
        const matched = VALID_SHADE_STYLES.find(
          (s) => s.toLowerCase() === raw.toLowerCase()
        );
        return {
          style: matched ?? 'Wayfarer',
          description: typeof x.description === 'string' ? x.description : '',
          faceShape: typeof x.faceShape === 'string' ? x.faceShape : '',
        };
      });
  };

  return {
    rizzScore,
    overallImpression:
      typeof raw.overallImpression === 'string'
        ? raw.overallImpression
        : 'Rizz Report complete.',
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
    shades: toShades(raw.shades),
    faceOrientation: toStrings(raw.faceOrientation),
    pickupLines: toStrings(raw.pickupLines),
    confidenceTips: toStrings(raw.confidenceTips),
  };
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: 'Server is not configured. Missing GEMINI_API_KEY.' },
        { status: 500, headers: SEO_HEADERS }
      );
    }

    const body = await request.json().catch(() => null);
    const image: unknown = body?.image;
    if (typeof image !== 'string' || !image.startsWith('data:image/')) {
      return Response.json(
        { error: 'Invalid request. Expected a base64 image data URL.' },
        { status: 400, headers: SEO_HEADERS }
      );
    }
    if (image.length > MAX_BYTES * 1.4) {
      return Response.json(
        { error: 'Image is too large. Maximum size is 5MB.' },
        { status: 413, headers: SEO_HEADERS }
      );
    }

    const parsed = parseDataUrl(image);
    if (!parsed) {
      return Response.json(
        { error: 'Unsupported image format. Use JPG, PNG, or WebP.' },
        { status: 400, headers: SEO_HEADERS }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const result = await generateContentWithFallback(
      genAI,
      [
        { text: SYSTEM_PROMPT },
        { inlineData: { mimeType: parsed.mimeType, data: parsed.data } },
      ],
      { temperature: 0.7, responseMimeType: 'application/json' }
    );

    const text = result.response.text();
    const parsedResult = extractJson(text);
    if (!parsedResult) {
      return Response.json(
        { error: 'Could not interpret the AI response. Please try again.' },
        { status: 502, headers: SEO_HEADERS }
      );
    }

    return Response.json(
      { feedback: sanitize(parsedResult) },
      { headers: SEO_HEADERS }
    );
  } catch (err) {
    if (isGeminiOverloaded(err)) {
      return Response.json(
        { error: 'Our AI is experiencing high demand right now. Please try again in a moment.' },
        { status: 503, headers: SEO_HEADERS }
      );
    }
    const message =
      err instanceof Error ? err.message : 'Unexpected server error.';
    return Response.json(
      { error: `Analysis failed: ${message}` },
      { status: 500, headers: SEO_HEADERS }
    );
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
