import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_URL } from '@/lib/config';
import { BreadcrumbSchema } from './SchemaMarkup';

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <BreadcrumbSchema
        crumbs={crumbs.map((c) => ({
          name: c.name,
          item: `${SITE_URL}${c.href === '/' ? '' : c.href}`,
        }))}
      />
      <ol className="flex flex-wrap items-center gap-1 text-gray-500">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="font-medium text-gray-700">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-brand-600"
                >
                  {crumb.name}
                </Link>
              )}
              {!isLast && (
                <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
