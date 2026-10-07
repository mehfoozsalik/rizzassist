import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('self-awareness-test');

export default function Page() {
  return <AssessmentToolPage slug="self-awareness-test" />;
}
