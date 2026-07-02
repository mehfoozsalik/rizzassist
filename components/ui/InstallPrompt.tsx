'use client';

import { useEffect, useState } from 'react';
import { Download, Share, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    setIsIOS(ios);

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && (window.navigator as Record<string, unknown>).standalone === true);
    setIsStandalone(standalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (dismissed || isStandalone) return null;
  if (!deferredPrompt && !isIOS) return null;

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') setDismissed(true);
    setDeferredPrompt(null);
  };

  return (
    <div
      role="dialog"
      aria-label="Install Rizz Assist"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm rounded-2xl border border-brand-300/60 bg-white p-4 shadow-lg dark:border-brand-600/30 dark:bg-ink-800 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-xs"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Add Rizz Assist to your home screen
          </p>
          {isIOS ? (
            <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
              Tap the{' '}
              <Share className="inline h-3 w-3" aria-hidden="true" />{' '}
              Share button in Safari, then &ldquo;Add to Home Screen.&rdquo;
            </p>
          ) : (
            <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
              Install for faster access with no browser bar.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 text-gray-400 transition-colors hover:text-gray-600 dark:text-white/30 dark:hover:text-white/60"
          aria-label="Dismiss install prompt"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {!isIOS && deferredPrompt && (
        <button
          type="button"
          onClick={install}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-800 dark:bg-ink-700 dark:hover:bg-ink-600"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Install App
        </button>
      )}
    </div>
  );
}
