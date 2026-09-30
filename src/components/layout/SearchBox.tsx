'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const searchRef = useRef<HTMLDivElement>(null);

  const allCalculators = CATEGORIES.flatMap(cat => 
    cat.calculators.map(calc => ({
      ...calc,
      categoryName: language === 'hi' ? cat.nameHi : cat.name,
      categorySlug: cat.slug,
    }))
  );

  const filteredCalculators = query
    ? allCalculators.filter(calc => 
        (language === 'hi' ? calc.nameHi : calc.name).toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-sm" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={language === 'hi' ? 'कैलकुलेटर खोजें...' : 'Search calculators...'}
          className="w-full px-4 py-2 pl-10 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1E40AF] dark:text-white"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {isOpen && query && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
          {filteredCalculators.length > 0 ? (
            <ul className="py-2">
              {filteredCalculators.map(calc => (
                <li key={calc.id}>
                  <Link
                    href={`/${calc.slug}-calculator`}
                    className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800 outline-none"
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {language === 'hi' ? calc.nameHi : calc.name}
                      </span>
                      <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                        {calc.categoryName}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-slate-500 dark:text-slate-400 text-center">
              {language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No results found'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
