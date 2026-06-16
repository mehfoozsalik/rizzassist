'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

type Consent = 'pending' | 'accepted' | 'rejected';

const STORAGE_KEY = 'cookie-consent';
const OPEN_EVENT = 'open-cookie-settings';

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookieConsent({ gaId }: { gaId?: string }) {
  const [consent, setConsent] = useState<Consent>('pending');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored);
    } else {
      setVisible(true);
    }

    const handleOpen = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_EVENT, handleOpen);
  }, []);

  function choose(value: 'accepted' | 'rejected') {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setVisible(false);
  }

  return (
    <>
      {consent === 'accepted' && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {visible && (
        <div
          role="dialog"
          aria-label="Cookie settings"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink-900 px-4 py-5 shadow-2xl"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-sm text-white/70">
              We use cookies for basic analytics to understand site usage. No photos or
              personal data are ever stored. See our{' '}
              <Link href="/privacy" className="text-brand-400 underline hover:no-underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose('rejected')}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
