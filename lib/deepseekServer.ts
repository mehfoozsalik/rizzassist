const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
export const DEEPSEEK_MODEL = 'deepseek-v4-flash';

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class DeepSeekError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly rawDetail: string
  ) {
    super(message);
    this.name = 'DeepSeekError';
  }
}

export function isDeepSeekOverloaded(err: unknown): boolean {
  if (err instanceof DeepSeekError) return err.status === 503;
  return false;
}

export function isInsufficientBalance(err: unknown): boolean {
  if (err instanceof DeepSeekError) return err.status === 402;
  return false;
}

export function isBadApiKey(err: unknown): boolean {
  if (err instanceof DeepSeekError) return err.status === 401;
  return false;
}

export function isRateLimit(err: unknown): boolean {
  if (err instanceof DeepSeekError) return err.status === 429;
  return false;
}

export async function callDeepSeek(
  messages: DeepSeekMessage[],
  options?: { temperature?: number; maxTokens?: number; jsonMode?: boolean }
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('Server is not configured. Missing DEEPSEEK_API_KEY.');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);

  let res: Response;
  try {
    res = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2048,
        thinking: { type: 'disabled' },
        ...(options?.jsonMode ? { response_format: { type: 'json_object' } } : {}),
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const rawDetail: string =
      body?.error?.message ?? body?.message ?? body?.detail ?? `HTTP ${res.status}`;
    throw new DeepSeekError(
      `DeepSeek ${res.status}: ${rawDetail}`,
      res.status,
      rawDetail
    );
  }

  const json = await res.json();
  const text: string = json?.choices?.[0]?.message?.content ?? '';
  if (!text) throw new Error('Empty response from AI. Please try again.');
  return text;
}
