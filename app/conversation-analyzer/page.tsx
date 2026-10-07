import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('conversation-analyzer');

export default function Page() {
  return <AssessmentToolPage slug="conversation-analyzer" />;
}
