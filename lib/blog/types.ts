export type BlogReference = {
  title: string;
  url: string;
  author?: string;
  note?: string;
};

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level?: 2 | 3; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  /** Legacy short paragraphs — still rendered when `blocks` is absent. Prefer `blocks` for SEO heading structure. */
  content: string[];
  author: string;
  coverImage?: string;
  blocks?: BlogBlock[];
  references?: BlogReference[];
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
  /** Optional external inspiration — never copy verbatim; cite when used. */
  inspiration?: BlogReference;
  imageQueries: string[];
};
