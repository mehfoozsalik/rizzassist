import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('first-impression-test');

export default function Page() {
  return <AssessmentToolPage slug="first-impression-test" />;
}
