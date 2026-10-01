'use client';

import React, { useState, useEffect } from 'react';
import { TOCItem } from '@/lib/blog-types';

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -70% 0%' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav
      className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
      aria-label="Table of Contents"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <span>Table of Contents</span>
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-xs text-blue-600 dark:text-blue-400 font-medium"
        >
          {isOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <ul className={`space-y-2 text-xs ${isOpen ? 'block' : 'hidden md:block'}`}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? '1rem' : '0rem' }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  setActiveId(item.id);
                }
              }}
              className={`block py-0.5 transition-colors line-clamp-1 ${
                activeId === item.id
                  ? 'font-bold text-blue-600 dark:text-blue-400 border-l-2 border-blue-600 dark:border-blue-400 pl-2'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
