import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('dating-personality-test');

export default function Page() {
  return <AssessmentToolPage slug="dating-personality-test" />;
}
