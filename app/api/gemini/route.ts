import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateContentWithFallback, isGeminiOverloaded } from '@/lib/geminiServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_IMAGE_BYTES = 6 * 1024 * 1024;

const SEO_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, max-age=0',
  'X-Robots-Tag': 'noindex',
};

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
    const prompt: unknown = body?.prompt;
    const imageBase64: unknown = body?.imageBase64;
    const mimeType: unknown = body?.mimeType;

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return Response.json(
        { error: 'Invalid request. Expected a non-empty prompt.' },
        { status: 400, headers: SEO_HEADERS }
      );
    }
    if (imageBase64 !== undefined) {
      if (typeof imageBase64 !== 'string') {
        return Response.json(
          { error: 'Invalid request. imageBase64 must be a string.' },
          { status: 400, headers: SEO_HEADERS }
        );
      }
      if (imageBase64.length > MAX_IMAGE_BYTES * 1.4) {
        return Response.json(
          { error: 'Image is too large. Maximum size is 5MB.' },
          { status: 413, headers: SEO_HEADERS }
        );
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const parts: Array<{ text: string } | { inlineData: { data: string; mimeType: string } }> = [
      { text: prompt },
    ];
    if (typeof imageBase64 === 'string' && imageBase64) {
      parts.unshift({
        inlineData: {
          data: imageBase64,
          mimeType: typeof mimeType === 'string' && mimeType ? mimeType : 'image/jpeg',
        },
      });
    }

    const result = await generateContentWithFallback(genAI, parts);
    const text = result.response.text();

    return Response.json({ result: text }, { headers: SEO_HEADERS });
  } catch (err) {
    if (isGeminiOverloaded(err)) {
      return Response.json(
        { error: 'Our AI is experiencing high demand right now. Please try again in a moment.' },
        { status: 503, headers: SEO_HEADERS }
      );
    }
    const message = err instanceof Error ? err.message : 'Unexpected server error.';
    const isRateLimit = /429|rate limit|quota/i.test(message);
    return Response.json(
      { error: isRateLimit ? 'Too many requests. Please wait a moment and try again.' : `AI request failed: ${message}` },
      { status: isRateLimit ? 429 : 500, headers: SEO_HEADERS }
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
