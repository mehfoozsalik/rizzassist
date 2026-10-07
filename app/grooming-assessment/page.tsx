import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('grooming-assessment');

export default function Page() {
  return <AssessmentToolPage slug="grooming-assessment" />;
}
