import type { Metadata } from 'next';
import { AssessmentToolPage, assessmentMetadata } from '@/components/assessments/AssessmentToolPage';

export const metadata: Metadata = assessmentMetadata('listening-skills-test');

export default function Page() {
  return <AssessmentToolPage slug="listening-skills-test" />;
}
