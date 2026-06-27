'use client';

import { openCookieSettings } from '@/components/ui/CookieConsent';

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-ink-600 transition-colors hover:text-brand-600 dark:text-white/60 dark:hover:text-brand-400"
    >
      Cookie Settings
    </button>
  );
}
