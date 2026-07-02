import {
  callDeepSeek,
  isDeepSeekOverloaded,
  isInsufficientBalance,
  isBadApiKey,
  isRateLimit,
} from '@/lib/deepseekServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SEO_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, max-age=0',
  'X-Robots-Tag': 'noindex',
};

const VALID_FACE_SHAPES = ['oval', 'round', 'square', 'heart', 'oblong', 'diamond'] as const;
type FaceShape = (typeof VALID_FACE_SHAPES)[number];

interface FaceRatios {
  jawWidthRatio: number;
  foreheadToJawRatio: number;
  faceLengthRatio: number;
  symmetryScore: number;
}

export interface FaceAdvice {
  faceShape: string;
  styleAdvice: string;
  bestHairstyles: string[];
  glassesStyles: string[];
  pickupLines: string[];
  confidenceTips: string[];
}

function buildPrompt(faceShape: FaceShape, ratios: FaceRatios): string {
  return `You are a professional style consultant and confidence coach. The user has a ${faceShape} face shape, confirmed by AI facial landmark analysis.

Landmark-derived ratios:
- Jaw width ratio: ${ratios.jawWidthRatio.toFixed(2)}
- Forehead to jaw ratio: ${ratios.foreheadToJawRatio.toFixed(2)}
- Face length ratio (height divided by width): ${ratios.faceLengthRatio.toFixed(2)}
- Facial symmetry score (0 to 1): ${ratios.symmetryScore.toFixed(2)}

Your tone: confident, warm, GQ-meets-charismatic-friend. Frame all advice as opportunity, never criticism.

Return valid JSON matching this exact shape:
{
  "faceShape": "${faceShape}",
  "styleAdvice": "<2-3 sentences of specific style advice for a ${faceShape} face, referencing why certain cuts or accessories flatter this shape>",
  "bestHairstyles": ["hairstyle1", "hairstyle2", "hairstyle3"],
  "glassesStyles": ["frame style 1 with brief reason", "frame style 2 with brief reason"],
  "pickupLines": [
    "<clever line with subtle nod to their face shape's best quality>",
    "<playful flirty line>",
    "<smooth and confident line>"
  ],
  "confidenceTips": [
    "<tip tied to a strength of the ${faceShape} face shape>",
    "<body language or presence tip>",
    "<one daily habit to amplify their natural magnetism>"
  ]
}`;
}

function extractJson<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
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
    const faceShape: unknown = body?.faceShape;
    const ratios: unknown = body?.ratios;

    if (typeof faceShape !== 'string' || !VALID_FACE_SHAPES.includes(faceShape as FaceShape)) {
      return Response.json(
        { error: `Invalid faceShape. Must be one of: ${VALID_FACE_SHAPES.join(', ')}.` },
        { status: 400, headers: SEO_HEADERS }
      );
    }
    if (!ratios || typeof ratios !== 'object' || Array.isArray(ratios)) {
      return Response.json(
        { error: 'Invalid request. Expected a ratios object with jawWidthRatio, foreheadToJawRatio, faceLengthRatio, symmetryScore.' },
        { status: 400, headers: SEO_HEADERS }
      );
    }

    const r = ratios as Record<string, unknown>;
    const parsedRatios: FaceRatios = {
      jawWidthRatio: Number(r.jawWidthRatio) || 0,
      foreheadToJawRatio: Number(r.foreheadToJawRatio) || 0,
      faceLengthRatio: Number(r.faceLengthRatio) || 0,
      symmetryScore: Number(r.symmetryScore) || 0,
    };

    const text = await callDeepSeek(
      [{ role: 'user', content: buildPrompt(faceShape as FaceShape, parsedRatios) }],
      { temperature: 0.75, maxTokens: 1024, jsonMode: true }
    );

    const advice = extractJson<FaceAdvice>(text);
    if (!advice) {
      return Response.json(
        { error: 'Could not interpret the AI response. Please try again.' },
        { status: 502, headers: SEO_HEADERS }
      );
    }

    return Response.json({ advice }, { headers: SEO_HEADERS });
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
        { error: 'AI is experiencing high demand. Please try again in a moment.' },
        { status: 503, headers: SEO_HEADERS }
      );
    }
    const message = err instanceof Error ? err.message : 'Unexpected server error.';
    if (/abort|timeout/i.test(message)) {
      return Response.json(
        { error: 'AI took too long to respond. Please try again.' },
        { status: 504, headers: SEO_HEADERS }
      );
    }
    return Response.json(
      { error: message },
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
