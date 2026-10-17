/**
 * CLI entry for daily blog automation (local + GitHub Actions).
 * Usage: npx tsx scripts/generate-daily-blog.ts [--force]
 */
import { promises as fs } from 'fs';
import path from 'path';
import { generateDailyBlog } from '../lib/blog/generator';

/** Load .env / .env.local without adding a dotenv dependency. */
async function loadEnvFiles() {
  for (const name of ['.env.local', '.env']) {
    try {
      const raw = await fs.readFile(path.join(process.cwd(), name), 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eq = trimmed.indexOf('=');
        if (eq <= 0) continue;
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (process.env[key] === undefined) process.env[key] = value;
      }
    } catch {
      // optional
    }
  }
}

async function main() {
  await loadEnvFiles();
  const force = process.argv.includes('--force');
  const result = await generateDailyBlog({ force });

  if (result.skipped) {
    console.log(`Skipped: ${result.reason}`);
    process.exit(0);
  }

  if (!result.created || !result.post) {
    console.error('Generation failed without a post.');
    process.exit(1);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        slug: result.post.slug,
        title: result.post.title,
        author: result.post.author,
        readMinutes: result.post.readMinutes,
        references: result.post.references?.length ?? 0,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
