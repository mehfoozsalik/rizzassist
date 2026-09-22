'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { downloadReportPdf, type PdfSection } from '@/lib/pdfReport';
import { toastSuccess } from '@/lib/toast';

export function DownloadPdfButton({
  title,
  subtitle,
  filename,
  sections,
  className = '',
}: {
  title: string;
  subtitle?: string;
  filename: string;
  sections: PdfSection[];
  className?: string;
}) {
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    setBusy(true);
    try {
      downloadReportPdf({ title, subtitle, filename, sections });
      toastSuccess('PDF downloaded', 'Your report was saved to your downloads.');
    } catch {
      /* ignore */
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      aria-label={`Download ${title} as PDF`}
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Download className="h-4 w-4" aria-hidden="true" />
      )}
      Download PDF
    </button>
  );
}
