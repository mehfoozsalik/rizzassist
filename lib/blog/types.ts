export type BlogReference = {
  title: string;
  url: string;
  author?: string;
  note?: string;
};

/** Photo credit for Unsplash (or fallback stock) images used in a post. */
export type BlogImageCredit = {
  photographer: string;
  photographerUrl: string;
  photoUrl: string;
  alt?: string;
};

export type BlogImage = {
  src: string;
  alt: string;
  photographer?: string;
  photographerUrl?: string;
  photoUrl?: string;
  /** Unsplash download_location; ping when the photo is used (API guideline). */
  downloadLocation?: string;
};

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level?: 2 | 3; text: string }
  | {
      type: 'image';
      src: string;
      alt: string;
      caption?: string;
      photographer?: string;
      photographerUrl?: string;
      photoUrl?: string;
    }
  | { type: 'quote'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  /** Legacy short paragraphs. Prefer `blocks` for SEO heading structure. */
  content: string[];
  author: string;
  coverImage?: string;
  blocks?: BlogBlock[];
  references?: BlogReference[];
  /** Unsplash / photo credits shown at the end of the article. */
  imageCredits?: BlogImageCredit[];
  /** True when created by the daily DeepSeek automation. */
  generated?: boolean;
  relatedToolHref?: string;
  relatedToolLabel?: string;
};

export type BlogTopic = {
  id: string;
  titleHint: string;
  category: string;
  angle: string;
  relatedToolHref?: string;
  relatedToolLabel?: string;
  /** Optional external inspiration. Never copy verbatim; cite when used. */
  inspiration?: BlogReference;
  imageQueries: string[];
};
