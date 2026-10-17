import { NextRequest, NextResponse } from 'next/server';
import {
  DeepSeekError,
  isBadApiKey,
  isDeepSeekOverloaded,
  isInsufficientBalance,
  isRateLimit,
} from '@/lib/deepseekServer';
import { generateDailyBlog } from '@/lib/blog/generator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const SEO_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Robots-Tag': 'noindex',
};

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    // Allow in local/dev when secret is unset so you can test generation
    return process.env.NODE_ENV !== 'production';
  }
  const header = req.headers.get('authorization') || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7) : '';
  const query = req.nextUrl.searchParams.get('secret') || '';
  return bearer === secret || query === secret;
}

async function handle(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: SEO_HEADERS });
  }

  if (!process.env.DEEPSEEK_API_KEY?.trim()) {
    return NextResponse.json(
      { error: 'Missing DEEPSEEK_API_KEY' },
      { status: 500, headers: SEO_HEADERS }
    );
  }

  const force = req.nextUrl.searchParams.get('force') === '1';

  try {
    const result = await generateDailyBlog({ force });
    return NextResponse.json(
      {
        ok: true,
        created: result.created,
        skipped: result.skipped ?? false,
        reason: result.reason,
        slug: result.post?.slug,
        title: result.post?.title,
        author: result.post?.author,
        github: result.github,
      },
      { headers: SEO_HEADERS }
    );
  } catch (err) {
    if (isInsufficientBalance(err)) {
      return NextResponse.json(
        { error: 'Insufficient DeepSeek credits' },
        { status: 402, headers: SEO_HEADERS }
      );
    }
    if (isBadApiKey(err)) {
      return NextResponse.json({ error: 'Invalid DeepSeek API key' }, { status: 401, headers: SEO_HEADERS });
    }
    if (isRateLimit(err) || isDeepSeekOverloaded(err)) {
      return NextResponse.json(
        { error: 'DeepSeek temporarily unavailable. Retry later.' },
        { status: 503, headers: SEO_HEADERS }
      );
    }
    const message =
      err instanceof DeepSeekError
        ? err.message
        : err instanceof Error
          ? err.message
          : 'Blog generation failed';
    return NextResponse.json({ error: message }, { status: 500, headers: SEO_HEADERS });
  }
}

/** Vercel Cron sends GET by default. */
export async function GET(req: NextRequest) {
  return handle(req);
}

export async function POST(req: NextRequest) {
  return handle(req);
}
