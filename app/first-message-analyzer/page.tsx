import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('first-message-analyzer');

export default function Page() {
  return <AssessmentToolPage slug="first-message-analyzer" />;
}
