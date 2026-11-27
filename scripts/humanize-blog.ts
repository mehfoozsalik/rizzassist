/**
 * Offline pass: scrub machine-writing tells, rewrite titles/excerpts for
 * Search Console CTR, rebuild content from heading+paragraph blocks.
 *
 * Usage: npm run blog:humanize
 */
import { promises as fs } from 'fs';
import path from 'path';
import { contentFromBlocks, plainCopy, plainHeading } from '../lib/blog/plainCopy';
import type { BlogBlock, BlogPost } from '../lib/blog/types';

type IndexFile = {
  posts: BlogPost[];
  topicHistory?: string[];
  lastGeneratedDate?: string;
};

type MetaRewrite = { title: string; excerpt: string };

/**
 * CTR rewrites keyed by slug family. First ~60 chars track high-impression,
 * low-CTR Search Console queries (body type calculator, eye shape, frames,
 * personal color analysis, communication style, eyebrow grooming, etc.).
 */
function metaForSlug(slug: string): MetaRewrite | null {
  if (slug.includes('glasses') || slug.includes('frames')) {
    return {
      title: 'How to pick the right frames for your face shape',
      excerpt:
        'Match glasses frames to your face shape with clear try-on rules, common mistakes, and a simple fitting checklist you can use in-store.',
    };
  }
  if (slug.includes('personal-color') || slug.includes('color-analysis')) {
    return {
      title: 'Personal color analysis for your wardrobe',
      excerpt:
        'Find your undertone and seasonal palette, then build shirts and jackets that fit your coloring instead of chasing trends.',
    };
  }
  if (slug.includes('eyebrow')) {
    return {
      title: 'Eyebrow grooming guide for a cleaner look',
      excerpt:
        'Keep natural thickness, clean strays, and tell your barber what you want so brows frame your eyes without looking overdone.',
    };
  }
  if (slug.includes('eye-shape') || slug.includes('eye-makeup')) {
    return {
      title: 'What eye shape do I have? Makeup tips that fit',
      excerpt:
        'Spot almond, round, hooded, monolid, deep-set, upturned, or downturned eyes, then use makeup and grooming that match your shape.',
    };
  }
  if (slug.includes('body-shape') || slug.includes('body-type')) {
    return {
      title: 'Body shape vs body type: dress for your silhouette',
      excerpt:
        'Stop mixing up body shape and body type. Use silhouette ratios and simple outfit formulas that improve posture and presence.',
    };
  }
  if (slug.includes('communication-styles') || slug.includes('communication-style')) {
    return {
      title: 'Communication style assessment: close your blind spots',
      excerpt:
        'Most people misread how they come across. Spot over-explaining, interviewing, and conflict avoidance, then practice one fix.',
    };
  }
  if (slug.includes('face-shape-hairstyle') || slug.includes('face-shape-hair')) {
    return {
      title: 'Face shape hairstyles that actually fit your features',
      excerpt:
        'Map oval, round, square, heart, diamond, and oblong faces to cuts, volume, and length that look intentional, not trendy.',
    };
  }
  if (slug.includes('photo-setup')) {
    return {
      title: 'Photo setup for face and eye shape tools',
      excerpt:
        'Lighting, angle, hair, and expression tips so face shape and eye tools give cleaner results from a single selfie.',
    };
  }
  if (slug.includes('first-message') || slug.includes('first-messages')) {
    return {
      title: 'First messages that feel natural (clever usually flops)',
      excerpt:
        'Write openers with one specific detail, skip the clever bit, and turn a reply into a real plan without sounding scripted.',
    };
  }
  if (slug.includes('social-confidence')) {
    return {
      title: 'Social confidence habits you can practice this week',
      excerpt:
        'Build social confidence with small daily reps, recovery lines for awkward moments, and honest ways to track progress.',
    };
  }
  if (slug.includes('first-impressions')) {
    return {
      title: 'First impressions on dates: calm interest beats intensity',
      excerpt:
        'Use calm body language, easy pacing, and curiosity questions so first dates feel steady instead of over-performed.',
    };
  }
  if (slug.includes('charisma')) {
    return {
      title: 'Charisma is a conversation skill, not a personality trait',
      excerpt:
        'Warmth, competence, and timing are trainable. Practice the conversation moves that make people feel at ease with you.',
    };
  }
  return null;
}

function scrubBlock(block: BlogBlock): BlogBlock {
  switch (block.type) {
    case 'heading':
      return { ...block, text: plainHeading(block.text) };
    case 'paragraph':
    case 'quote':
      return { ...block, text: plainCopy(block.text) };
    case 'list':
      return { ...block, items: block.items.map(plainCopy) };
    case 'image':
      return {
        ...block,
        alt: plainCopy(block.alt || ''),
        caption: block.caption ? plainCopy(block.caption) : block.caption,
      };
    default:
      return block;
  }
}

function scrubPost(post: BlogPost): BlogPost {
  const meta = metaForSlug(post.slug);
  const blocks = (post.blocks || []).map(scrubBlock);
  const title = meta?.title ?? plainCopy(post.title);
  const excerpt = meta?.excerpt ?? plainCopy(post.excerpt);

  return {
    ...post,
    title,
    excerpt,
    blocks,
    content: contentFromBlocks(blocks),
    relatedToolLabel: post.relatedToolLabel
      ? plainCopy(post.relatedToolLabel)
      : post.relatedToolLabel,
    references: post.references?.map((ref) => ({
      ...ref,
      title: plainCopy(ref.title),
      note: ref.note ? plainCopy(ref.note) : ref.note,
    })),
    imageCredits: post.imageCredits?.map((c) => ({
      ...c,
      alt: c.alt ? plainCopy(c.alt) : c.alt,
    })),
  };
}

async function main() {
  const filePath = path.join(process.cwd(), 'data/blog/generated.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const index = JSON.parse(raw) as IndexFile;

  if (!Array.isArray(index.posts)) {
    throw new Error('generated.json missing posts array');
  }

  const before = index.posts.map((p) => ({ slug: p.slug, title: p.title }));
  index.posts = index.posts.map(scrubPost);

  // Validate JSON round-trip
  const out = JSON.stringify(index, null, 2) + '\n';
  JSON.parse(out);
  await fs.writeFile(filePath, out, 'utf8');

  const changedTitles = before.filter((b, i) => b.title !== index.posts[i].title);
  console.log(
    JSON.stringify(
      {
        ok: true,
        posts: index.posts.length,
        titlesRewritten: changedTitles.length,
        samples: changedTitles.slice(0, 8).map((c, i) => ({
          slug: c.slug,
          from: c.title,
          to: index.posts.find((p) => p.slug === c.slug)?.title,
        })),
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
