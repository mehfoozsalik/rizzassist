import { GoogleGenerativeAI } from '@google/generative-ai';

const PRIMARY_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || 'gemini-2.0-flash';

type Part = { text: string } | { inlineData: { data: string; mimeType: string } };

export function isGeminiOverloaded(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /\b503\b|overloaded|service unavailable|high demand/i.test(message);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calls Gemini with one same-model retry on transient 503 overload, then falls
 * back to a secondary model if the primary is still overloaded. Non-overload
 * errors (bad request, auth, etc.) fail immediately without retrying.
 */
export async function generateContentWithFallback(
  genAI: GoogleGenerativeAI,
  parts: Part[],
  generationConfig?: Record<string, unknown>
) {
  const attempts = [
    { model: PRIMARY_MODEL, delayMs: 0 },
    { model: PRIMARY_MODEL, delayMs: 1500 },
    { model: FALLBACK_MODEL, delayMs: 0 },
  ];

  let lastErr: unknown;
  for (const attempt of attempts) {
    if (attempt.delayMs) await sleep(attempt.delayMs);
    try {
      const model = genAI.getGenerativeModel({ model: attempt.model, generationConfig });
      return await model.generateContent(parts);
    } catch (err) {
      lastErr = err;
      if (!isGeminiOverloaded(err)) throw err;
    }
  }
  throw lastErr;
}
