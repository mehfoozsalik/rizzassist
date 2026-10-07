import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('style-assessment');

export default function Page() {
  return <AssessmentToolPage slug="style-assessment" />;
}
