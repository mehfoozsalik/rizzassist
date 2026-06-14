import { SkipToContent } from '@/components/seo/SkipToContent';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
