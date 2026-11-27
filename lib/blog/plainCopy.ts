/**
 * Scrub blog copy for common machine-writing tells
 * (Wikipedia: Signs of AI writing). Used at generation time
 * and by the offline humanize script.
 */

import type { BlogBlock } from './types';

/** Rebuild legacy `content` from headings + paragraphs only. */
export function contentFromBlocks(blocks: BlogBlock[]): string[] {
  return blocks
    .filter(
      (b): b is Extract<BlogBlock, { type: 'heading' | 'paragraph' }> =>
        b.type === 'heading' || b.type === 'paragraph'
    )
    .map((b) => b.text)
    .filter((t) => Boolean(t?.trim()));
}

const WORD_SWAPS: [RegExp, string][] = [
  [/\bAdditionally,\s*/gi, 'Also, '],
  [/\bMoreover,\s*/gi, 'Also, '],
  [/\bFurthermore,\s*/gi, 'And '],
  [/\bIn conclusion,\s*/gi, ''],
  [/\bIn summary,\s*/gi, ''],
  [/\bTo summarize,\s*/gi, ''],
  [/\bIt is important to note that\s*/gi, ''],
  [/\bIt's important to note that\s*/gi, ''],
  [/\bIt's worth noting that\s*/gi, ''],
  [/\bAt its core,\s*/gi, ''],
  [/\bIn today's (?:fast-paced |rapidly evolving )?world,?\s*/gi, ''],
  [/\bIn today's\b/gi, 'In this'],
  [/\bDive into\b/gi, 'Look at'],
  [/\bdelve into\b/gi, 'look at'],
  [/\bdelves into\b/gi, 'looks at'],
  [/\bunderscores?\b/gi, 'shows'],
  [/\bhighlighting\b/gi, 'showing'],
  [/\bemphasizing\b/gi, 'with'],
  [/\bensuring\b/gi, 'so'],
  [/\bfostering\b/gi, 'building'],
  [/\bcultivating\b/gi, 'building'],
  [/\bshowcasing\b/gi, 'showing'],
  [/\bleverag(?:e|es|ing)\b/gi, 'use'],
  [/\brobust\b/gi, 'solid'],
  [/\bseamless(?:ly)?\b/gi, 'smooth'],
  [/\bcrucial\b/gi, 'important'],
  [/\bpivotal\b/gi, 'important'],
  [/\bvibrant\b/gi, 'lively'],
  [/\bintricate\b/gi, 'detailed'],
  [/\btestament to\b/gi, 'sign of'],
  [/\bcomprehensive guide\b/gi, 'practical guide'],
  [/\bever-evolving\b/gi, 'changing'],
  [/\bevolving landscape\b/gi, 'field'],
  [/\btechnological landscape\b/gi, 'tech world'],
  [/\bgame-?changer\b/gi, 'big shift'],
  [/\bunlock your potential\b/gi, 'get better results'],
  [/\bnestled\b/gi, 'set'],
  [/\bstands as\b/gi, 'is'],
  [/\bserves as\b/gi, 'is'],
  [/\bfunctions as\b/gi, 'is'],
  [/\bact as a catalyst\b/gi, 'help'],
  [/\bWhether you're\b/gi, 'If you are'],
  [/\bWhether you've\b/gi, 'If you have'],
  [/\bWhether your\b/gi, 'If your'],
  [/\bWhether you\b/gi, 'If you'],
  [/\bwhether it's\b/gi, 'if it is'],
  [/\bThe good news:\s*/gi, ''],
  [/\bThe best part:\s*/gi, ''],
  [/\bHere's the thing:\s*/gi, ''],
  [/\bLet's dive in\.?\s*/gi, ''],
  [/\bWithout further ado,?\s*/gi, ''],
  [/\bstyling landscape\b/gi, 'style options'],
  [/\bfashion landscape\b/gi, 'fashion scene'],
  [/\bdating landscape\b/gi, 'dating world'],
  [/\bsocial landscape\b/gi, 'social scene'],
  [/\bcommunication landscape\b/gi, 'communication habits'],
  [/\bevolving landscape\b/gi, 'changing field'],
];

const PHRASE_SWAPS: [RegExp, string][] = [
  [
    /\bIt'?s not just about ([^.;,]+)[;,]?\s*it'?s(?: about)? ([^.]+)\./gi,
    'It comes down to $2 more than $1.',
  ],
  [
    /\bIt'?s not just ([^.;,]+)[;,]?\s*it'?s ([^.]+)\./gi,
    'The real point is $2.',
  ],
  [
    /\bIt'?s not merely ([^.;,]+)[;,]?\s*it'?s ([^.]+)\./gi,
    'The real point is $2.',
  ],
  [/\bNot only ([^,]+), but also ([^.]+)\./gi, '$1, and $2.'],
];

/** Sentence-case a heading while keeping short acronyms and "I". */
export function toSentenceCase(heading: string): string {
  const trimmed = heading.trim();
  if (!trimmed) return trimmed;

  const words = trimmed.split(/(\s+)/);
  let firstWordDone = false;

  const out = words.map((token) => {
    if (/^\s+$/.test(token)) return token;
    if (/^[^A-Za-z0-9]/.test(token) && token.length <= 2) return token;

    const bare = token.replace(/[^A-Za-z0-9]/g, '');
    const keep =
      /^(I|OK|URL|SEO|CTA|H2|JSON|API)$/i.test(bare) ||
      (/^[A-Z0-9]{2,5}$/.test(bare) &&
        bare === bare.toUpperCase() &&
        bare.length >= 2 &&
        bare !== 'FACE');

    if (!firstWordDone) {
      firstWordDone = true;
      if (/^(I)$/i.test(bare)) return token.replace(/i/i, 'I');
      return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
    }

    if (keep) {
      if (/^I$/i.test(bare)) return token.replace(/i/i, 'I');
      return token;
    }

    if (/^(Rizz|Assist|Unsplash)$/i.test(bare)) {
      const map: Record<string, string> = {
        rizz: 'Rizz',
        assist: 'Assist',
        unsplash: 'Unsplash',
      };
      const fixed = map[bare.toLowerCase()] || bare;
      return token.replace(bare, fixed);
    }

    return token.toLowerCase();
  });

  // Capitalize word immediately after ": "
  let joined = out.join('').replace(/\s+/g, ' ').trim();
  joined = joined.replace(/:(\s*)([a-z])/g, (_, sp, ch) => `:${sp}${ch.toUpperCase()}`);
  return joined;
}

const BRAND_MARK = '<<MF_BRAND>>';

function protectBrand(input: string): string {
  return input.replace(/MakeUp Face Ai/gi, BRAND_MARK);
}

function restoreBrand(input: string): string {
  // Lowercase stray "MakeUp" first, then put the partner brand back.
  return input
    .replace(/\bMakeUp\b/g, 'makeup')
    .replace(new RegExp(BRAND_MARK, 'g'), 'MakeUp Face Ai')
    .replace(/\bmakeup Face Ai\b/g, 'MakeUp Face Ai');
}

export function plainCopy(input: string): string {
  if (!input) return input;

  let text = protectBrand(input)
    .replace(/\u2014/g, ', ')
    .replace(/\u2013/g, ', ')
    .replace(/--+/g, ', ')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, '...');

  for (const [re, swap] of WORD_SWAPS) {
    text = text.replace(re, swap);
  }
  for (const [re, swap] of PHRASE_SWAPS) {
    text = text.replace(re, swap);
  }

  text = text
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ',')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.!?;:])/g, '$1')
    .replace(/^[,\s]+/, '')
    .trim();

  // Fix accidental lowercase after stripping openers
  text = text.replace(/(^|[.!?]\s+)([a-z])/g, (_, a, b) => a + b.toUpperCase());

  return restoreBrand(text);
}

export function plainHeading(input: string): string {
  return restoreBrand(toSentenceCase(protectBrand(plainCopy(input))));
}
