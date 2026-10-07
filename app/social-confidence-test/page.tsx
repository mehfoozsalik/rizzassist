import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('social-confidence-test');

export default function Page() {
  return <AssessmentToolPage slug="social-confidence-test" />;
}
