export type AssessmentEvent =
  | 'tool_viewed'
  | 'tool_started'
  | 'question_answered'
  | 'tool_completed'
  | 'result_viewed'
  | 'related_tool_clicked'
  | 'assessment_retaken'
  | 'profile_viewed'
  | 'report_viewed';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAssessment(event: AssessmentEvent, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', event, {
      event_category: 'assessment',
      ...params,
    });
  } catch {
    // no-op
  }
}
