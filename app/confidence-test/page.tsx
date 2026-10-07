import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('confidence-test');

export default function Page() {
  return <AssessmentToolPage slug="confidence-test" />;
}
