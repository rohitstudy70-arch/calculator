'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchCalculators, POPULAR_SEARCH_KEYWORDS, SearchableCalculator, SEARCHABLE_CALCULATORS } from '@/lib/search-data';

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSearchModal({ isOpen, onClose }: MobileSearchModalProps) {
  const [query, setQuery] = useState('');
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const results: SearchableCalculator[] = React.useMemo(() => {
    if (!query.trim()) {
      return SEARCHABLE_CALCULATORS.filter(c => c.popular);
    }
    return searchCalculators(query, language);
  }, [query, language]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 animate-in fade-in duration-200">
      {/* Top Search Header */}
      <div className="flex items-center gap-2 p-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10 shadow-sm">
        <div className="relative flex-1 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3.5 text-blue-600 dark:text-blue-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'hi' ? 'कैलकुलेटर खोजें (SIP, EMI, Bigha)...' : 'Search 35+ calculators (SIP, EMI, Land)...'}
            className="w-full h-11 pl-11 pr-9 text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 shrink-0"
        >
          {language === 'hi' ? 'रद्द करें' : 'Cancel'}
        </button>
      </div>

      {/* Quick Pills */}
      {!query.trim() && (
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5 overflow-x-auto text-xs">
          <span className="font-semibold text-slate-500 dark:text-slate-400 text-xs mr-1">
            🔥 {language === 'hi' ? 'लोकप्रिय:' : 'Popular:'}
          </span>
          {POPULAR_SEARCH_KEYWORDS.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={onClose}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-full border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm active:scale-95 transition-transform"
            >
              {language === 'hi' ? item.labelHi : item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-3 divide-y divide-slate-100 dark:divide-slate-800">
        <div className="pb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {query.trim()
            ? `${results.length} ${language === 'hi' ? 'परिणाम मिले' : 'Results'}`
            : `🔥 ${language === 'hi' ? 'लोकप्रिय कैलकुलेटर' : 'Top Calculators'}`}
        </div>

        {results.length > 0 ? (
          <div className="space-y-1.5 pt-2">
            {results.map((calc) => (
              <Link
                key={calc.id}
                href={calc.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-400 active:bg-blue-50 dark:active:bg-blue-900/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl p-2 bg-slate-50 dark:bg-slate-800 rounded-lg shrink-0">
                    {calc.icon}
                  </span>
                  <div className="truncate">
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {language === 'hi' ? calc.nameHi : calc.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {language === 'hi' ? calc.descriptionHi : calc.description}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] shrink-0 font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded ml-2">
                  {language === 'hi' ? calc.categoryNameHi : calc.categoryName}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-semibold text-base text-slate-800 dark:text-slate-200">
              {language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No calculators found'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'hi' ? 'EMI, SIP, Income Tax, Bigha, Sarkari Age खोजें' : 'Try searching for EMI, SIP, Income Tax, Bigha, or Age'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
