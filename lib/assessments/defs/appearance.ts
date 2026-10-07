import type { AssessmentDefinition } from '../types';
import { q, SHARED_FAQS } from '../helpers';

/** Appearance-adjacent questionnaires (not photo AI) */
export const styleAssessment: AssessmentDefinition = {
  id: 'style',
  slug: 'style-assessment',
  title: 'Style Assessment',
  shortTitle: 'Style',
  category: 'appearance',
  description:
    'Reflect on fit, color, grooming coordination, and presentation habits that shape first impressions.',
  whatItMeasures:
    'Style here means intentional presentation — clothing fit, consistency, and alignment with the impression you want. It does not diagnose fashion taste scientifically.',
  minutes: 3,
  relatedSlugs: ['grooming-assessment', 'first-impression-test', 'face-shape-detector', 'confidence-test'],
  faqs: SHARED_FAQS,
  questions: q('style', [
    { text: 'My clothes generally fit well in the shoulders and waist.', dimension: 'selfAwareness' },
    { text: 'I have a go-to outfit that feels like “me.”', dimension: 'authenticity' },
    { text: 'I leave the house in whatever is clean without considering the occasion.', dimension: 'socialAwareness', reverse: true },
    { text: 'Colors I wear usually flatter my skin tone.', dimension: 'selfAwareness' },
    { text: 'Shoes and accessories feel intentional, not last-minute.', dimension: 'selfAwareness' },
    { text: 'I feel confident in photos of my everyday style.', dimension: 'confidence' },
    { text: 'I update my wardrobe when fits or trends no longer serve me.', dimension: 'selfAwareness' },
    { text: 'People compliment how put-together I look.', dimension: 'charisma' },
    { text: 'I know what silhouettes work for my body.', dimension: 'selfAwareness' },
    { text: 'I dress for the life I actually live, not a fantasy wardrobe.', dimension: 'authenticity' },
  ]),
};

export const groomingAssessment: AssessmentDefinition = {
  id: 'grooming',
  slug: 'grooming-assessment',
  title: 'Grooming Assessment',
  shortTitle: 'Grooming',
  category: 'appearance',
  description:
    'Check consistency around hair, skin, scent, and daily grooming that support confidence.',
  whatItMeasures:
    'Grooming habits that affect first impressions and self-confidence — practical check-in, not medical dermatology advice.',
  minutes: 3,
  relatedSlugs: ['style-assessment', 'face-shape-detector', 'eye-shape-detector', 'first-impression-test'],
  faqs: SHARED_FAQS,
  questions: q('groom', [
    { text: 'I have a simple daily grooming routine I actually follow.', dimension: 'selfAwareness' },
    { text: 'Hair or facial hair looks intentional most days.', dimension: 'selfAwareness' },
    { text: 'I skip basics (teeth, nails, scent) when busy.', dimension: 'selfAwareness', reverse: true },
    { text: 'My skincare is consistent enough for my climate.', dimension: 'selfAwareness' },
    { text: 'I feel camera-ready without a special occasion.', dimension: 'confidence' },
    { text: 'I get regular haircuts or trims on a schedule.', dimension: 'selfAwareness' },
    { text: 'Fragrance or freshness is part of my leave-the-house checklist.', dimension: 'socialAwareness' },
    { text: 'Grooming neglect shows up when I’m stressed.', dimension: 'emotionalIntelligence', reverse: true },
    { text: 'People notice I look cared-for.', dimension: 'charisma' },
    { text: 'I adjust grooming for dates or important meetings.', dimension: 'socialAwareness' },
  ]),
};
