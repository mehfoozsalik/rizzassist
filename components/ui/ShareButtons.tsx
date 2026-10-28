'use client';

import { useMemo, useState } from 'react';
import { Check, Link2, Linkedin, Share2, Twitter } from 'lucide-react';
import { SITE_URL } from '@/lib/config';

type ShareButtonsProps = {
  title?: string;
  text?: string;
  path?: string;
  className?: string;
};

export function ShareButtons({
  title = 'Rizz Assist: AI Look Analyzer',
  text = 'Unlock your inner rizz with free AI style tips, pickup lines, and look analysis.',
  path = '/',
  className = '',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = useMemo(() => {
    const base = SITE_URL.replace(/\/$/, '');
    const cleaned = path.startsWith('/') ? path : `/${path}`;
    return `${base}${cleaned === '/' ? '' : cleaned}`;
  }, [path]);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const btn =
    'inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-ink-800 dark:text-white/70 dark:hover:border-brand-600/40 dark:hover:text-brand-400';

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/35">
        <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
        Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Share on X (Twitter)"
      >
        <Twitter className="h-3.5 w-3.5" aria-hidden="true" />
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
        LinkedIn
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title}, ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>
      <button type="button" onClick={copyLink} className={btn} aria-label="Copy page link">
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
        ) : (
          <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <span className="sr-only">{encodedTitle}</span>
    </div>
  );
}
