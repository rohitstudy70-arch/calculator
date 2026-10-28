import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  // Generate JSON-LD schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://www.calcmaster.co.in${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={`mb-4 ${className || ''}`}>
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center min-w-0">
                {isLast || !item.href ? (
                  <span
                    className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[220px] sm:max-w-md md:max-w-xl"
                    aria-current="page"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href}
                    className="hover:text-blue-800 dark:hover:text-blue-400 transition-colors shrink-0"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <span className="ml-1.5 sm:ml-2 text-gray-400 select-none shrink-0" aria-hidden="true">
                    &gt;
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
