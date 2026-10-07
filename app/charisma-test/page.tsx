import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('charisma-test');

export default function Page() {
  return <AssessmentToolPage slug="charisma-test" />;
}
