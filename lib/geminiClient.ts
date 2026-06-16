function stripJsonMarkdown(text: string): string {
  return text.replace(/```json|```/g, '').trim();
}

function extractJson<T>(text: string): T | null {
  const cleaned = stripJsonMarkdown(text);
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as T;
  } catch {
    return null;
  }
}

async function callGeminiApi(prompt: string, imageBase64?: string, mimeType?: string): Promise<string> {
  const res = await fetch('/api/gemini/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, imageBase64, mimeType }),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.error || 'Could not connect to AI. Showing basic results only.');
  }
  return json.result as string;
}

export class GeminiNetworkError extends Error {}

/**
 * Calls the shared /api/gemini endpoint and parses the response as JSON,
 * retrying once with a stricter instruction if the first response isn't valid JSON.
 */
export async function fetchGeminiJson<T>(
  prompt: string,
  options?: { imageBase64?: string; mimeType?: string }
): Promise<T> {
  let text: string;
  try {
    text = await callGeminiApi(prompt, options?.imageBase64, options?.mimeType);
  } catch (err) {
    throw new GeminiNetworkError(err instanceof Error ? err.message : 'Network error.');
  }

  let parsed = extractJson<T>(text);
  if (!parsed) {
    try {
      text = await callGeminiApi(
        `${prompt}\n\nReturn ONLY raw JSON, no markdown, no backticks, no explanation.`,
        options?.imageBase64,
        options?.mimeType
      );
    } catch (err) {
      throw new GeminiNetworkError(err instanceof Error ? err.message : 'Network error.');
    }
    parsed = extractJson<T>(text);
  }

  if (!parsed) {
    throw new Error('Could not interpret the AI response.');
  }
  return parsed;
}
