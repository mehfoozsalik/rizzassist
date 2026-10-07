import { getRelatedTools } from '@/lib/assessments/registry';
import { RelatedTools } from '@/components/assessments/RelatedTools';

const DEFAULT_RELATED = [
  'personality-test',
  'confidence-test',
  'style-assessment',
  'grooming-assessment',
  'face-shape-detector',
];

/** Cross-sell block for existing appearance / calculator pages */
export function AppearanceCrossSell({
  relatedSlugs = DEFAULT_RELATED,
}: {
  relatedSlugs?: string[];
}) {
  const tools = getRelatedTools(relatedSlugs);
  return (
    <div className="mt-10">
      <RelatedTools
        tools={tools}
        title="Want to improve your overall presentation?"
        subtitle="Connect appearance insights with personality and confidence"
      />
    </div>
  );
}
