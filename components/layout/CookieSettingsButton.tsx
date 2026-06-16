'use client';

import { openCookieSettings } from '@/components/ui/CookieConsent';

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-white/60 transition-colors hover:text-brand-400"
    >
      Cookie Settings
    </button>
  );
}
