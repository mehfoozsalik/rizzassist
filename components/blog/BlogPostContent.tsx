import Image from 'next/image';
import type { BlogBlock, BlogPost } from '@/lib/blog/types';

function BlockView({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'heading':
      if (block.level === 3) {
        return (
          <h3 className="mt-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {block.text}
          </h3>
        );
      }
      return (
        <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {block.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p className="mt-5 text-base leading-relaxed text-gray-700 dark:text-white/70">{block.text}</p>
      );
    case 'quote':
      return (
        <blockquote className="mt-8 border-l-4 border-brand-500 pl-4 text-lg italic leading-relaxed text-gray-800 dark:text-white/80">
          {block.text}
        </blockquote>
      );
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag
          className={`mt-5 space-y-2 pl-5 text-base leading-relaxed text-gray-700 dark:text-white/70 ${
            block.ordered ? 'list-decimal' : 'list-disc'
          }`}
        >
          {block.items.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </Tag>
      );
    }
    case 'image':
      return (
        <figure className="mt-10 overflow-hidden rounded-xl">
          <div className="relative aspect-[16/9] w-full bg-gray-100 dark:bg-ink-800">
            <Image
              src={block.src}
              alt={block.alt?.trim() || block.caption?.trim() || 'Blog article illustration'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-white/45">
            {block.photographer && block.photographerUrl ? (
              <>
                Photo by{' '}
                <a
                  href={block.photographerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-brand-600"
                >
                  {block.photographer}
                </a>
                {' on '}
                <a
                  href={
                    block.photoUrl ||
                    'https://unsplash.com/?utm_source=rizzassist&utm_medium=referral'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-brand-600"
                >
                  Unsplash
                </a>
              </>
            ) : (
              block.caption || null
            )}
          </figcaption>
        </figure>
      );
    default:
      return null;
  }
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  if (post.blocks?.length) {
    return (
      <div className="mt-8">
        {post.blocks.map((block, i) => (
          <BlockView key={`${block.type}-${i}`} block={block} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-5 text-base leading-relaxed text-gray-700 dark:text-white/70">
      {post.content.map((para) => (
        <p key={para.slice(0, 24)}>{para}</p>
      ))}
    </div>
  );
}
