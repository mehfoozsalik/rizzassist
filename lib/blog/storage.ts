import { promises as fs } from 'fs';
import path from 'path';
import type { BlogPost } from './types';

const DATA_DIR = path.join(process.cwd(), 'data', 'blog');
const GENERATED_FILE = path.join(DATA_DIR, 'generated.json');

export type GeneratedBlogIndex = {
  posts: BlogPost[];
  topicHistory: string[];
  lastGeneratedDate?: string;
};

const EMPTY_INDEX: GeneratedBlogIndex = { posts: [], topicHistory: [] };

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readGeneratedIndex(): Promise<GeneratedBlogIndex> {
  try {
    const raw = await fs.readFile(GENERATED_FILE, 'utf8');
    const parsed = JSON.parse(raw) as GeneratedBlogIndex;
    return {
      posts: Array.isArray(parsed.posts) ? parsed.posts : [],
      topicHistory: Array.isArray(parsed.topicHistory) ? parsed.topicHistory : [],
      lastGeneratedDate: parsed.lastGeneratedDate,
    };
  } catch {
    return { ...EMPTY_INDEX };
  }
}

export async function writeGeneratedIndex(index: GeneratedBlogIndex): Promise<void> {
  await ensureDataDir();
  const payload = `${JSON.stringify(index, null, 2)}\n`;
  await fs.writeFile(GENERATED_FILE, payload, 'utf8');
}

export async function appendGeneratedPost(
  post: BlogPost,
  topicId: string,
  dateKey: string,
  options?: { force?: boolean }
): Promise<GeneratedBlogIndex> {
  const index = await readGeneratedIndex();

  if (!options?.force && index.lastGeneratedDate === dateKey) {
    return index;
  }

  if (index.posts.some((p) => p.slug === post.slug)) {
    post.slug = `${post.slug}-${dateKey.replace(/-/g, '')}`;
  }

  // Force re-run for the same day: drop any post already dated today
  const posts =
    options?.force
      ? index.posts.filter((p) => p.date !== dateKey)
      : index.posts;

  index.posts = [post, ...posts];
  index.topicHistory = [topicId, ...index.topicHistory.filter((id) => id !== topicId)].slice(
    0,
    48
  );
  index.lastGeneratedDate = dateKey;
  await writeGeneratedIndex(index);
  return index;
}

/** Optional: persist via GitHub Contents API when running on read-only hosts (e.g. Vercel). */
export async function commitGeneratedIndexToGitHub(
  index: GeneratedBlogIndex
): Promise<{ committed: boolean; reason?: string }> {
  const token = process.env.GITHUB_TOKEN?.trim();
  const repo = process.env.GITHUB_REPO?.trim(); // owner/name
  const branch = process.env.GITHUB_BRANCH?.trim() || 'main';
  const filePath = 'data/blog/generated.json';

  if (!token || !repo) {
    return { committed: false, reason: 'GITHUB_TOKEN or GITHUB_REPO not set' };
  }

  const apiBase = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'rizzassist-blog-automation',
  };

  let sha: string | undefined;
  const existing = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, { headers });
  if (existing.ok) {
    const json = (await existing.json()) as { sha?: string };
    sha = json.sha;
  }

  const content = Buffer.from(`${JSON.stringify(index, null, 2)}\n`, 'utf8').toString('base64');
  const put = await fetch(apiBase, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `chore(blog): add automated post ${index.lastGeneratedDate ?? ''}`.trim(),
      content,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!put.ok) {
    const detail = await put.text();
    return { committed: false, reason: `GitHub ${put.status}: ${detail.slice(0, 240)}` };
  }

  return { committed: true };
}

export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
