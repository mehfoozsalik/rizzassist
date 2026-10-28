import type { AssessmentQuestion, DimensionId } from './types';

/** Build sequential Likert questions for a dimension set */
export function q(
  prefix: string,
  items: { text: string; dimension: DimensionId; reverse?: boolean }[]
): AssessmentQuestion[] {
  return items.map((item, i) => ({
    id: `${prefix}-${i + 1}`,
    text: item.text,
    dimension: item.dimension,
    reverse: item.reverse,
  }));
}

export const SHARED_FAQS = [
  {
    question: 'How long does this assessment take?',
    answer:
      'Most RizzAssist assessments take about 3-5 minutes. You answer one statement at a time and can go back if you change your mind.',
  },
  {
    question: 'Is this a clinical or medical test?',
    answer:
      'No. These are practical self-reflection tools for social and dating confidence, not clinical psychology instruments or medical diagnoses.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Answers are scored in your browser. Saved results stay on your device unless you choose to clear them. We do not sell assessment answers.',
  },
  {
    question: 'Can I retake an assessment?',
    answer:
      'Yes. Retake anytime, comparing scores over weeks is a useful way to track what you’re practicing.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'No account is required. Results and progress can be saved locally on this device.',
  },
];
