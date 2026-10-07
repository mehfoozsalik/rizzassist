import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('communication-style-test');

export default function Page() {
  return <AssessmentToolPage slug="communication-style-test" />;
}
