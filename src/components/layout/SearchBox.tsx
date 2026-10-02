'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchCalculators, POPULAR_SEARCH_KEYWORDS, SearchableCalculator, SEARCHABLE_CALCULATORS } from '@/lib/search-data';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { language } = useLanguage();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results: SearchableCalculator[] = React.useMemo(() => {
    if (!query.trim()) {
      // When opened without query, show popular calculators
      return SEARCHABLE_CALCULATORS.filter(c => c.popular).slice(0, 8);
    }
    return searchCalculators(query, language);
  }, [query, language]);

  // Global shortcut (Ctrl+K or ⌘K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        router.push(results[selectedIndex].href);
        setIsOpen(false);
        setQuery('');
      } else if (results.length > 0) {
        router.push(results[0].href);
        setIsOpen(false);
        setQuery('');
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-xs md:max-w-md lg:max-w-sm xl:max-w-md" ref={searchRef}>
      {/* Search Input */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={language === 'hi' ? 'कैलकुलेटर खोजें...' : 'Search 35+ calculators...'}
          className="w-full h-10 pl-10 pr-12 text-sm bg-slate-100 hover:bg-slate-200/70 focus:bg-white dark:bg-slate-800 dark:hover:bg-slate-700/80 dark:focus:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-full border border-slate-200/80 dark:border-slate-700/80 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all shadow-inner"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedIndex(-1);
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex absolute right-3 items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded pointer-events-none shadow-sm">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Dropdown Results Box */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-full min-w-[320px] md:min-w-[400px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[460px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400 px-3">
            <span>
              {query.trim()
                ? `${results.length} ${language === 'hi' ? 'परिणाम' : 'Results'}`
                : `🔥 ${language === 'hi' ? 'लोकप्रिय कैलकुलेटर' : 'Popular Calculators'}`}
            </span>
            <span className="text-[10px] text-slate-400 font-normal">ESC to close</span>
          </div>

          {results.length > 0 ? (
            <ul className="py-1 divide-y divide-slate-100 dark:divide-slate-800/60">
              {results.map((calc, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={calc.id}>
                    <Link
                      href={calc.href}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`block px-3.5 py-2.5 transition-colors ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-xl shrink-0">{calc.icon}</span>
                          <div className="truncate">
                            <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                              {language === 'hi' ? calc.nameHi : calc.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {language === 'hi' ? calc.descriptionHi : calc.description}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] shrink-0 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-medium">
                          {language === 'hi' ? calc.categoryNameHi : calc.categoryName}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No calculators found'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'hi' ? 'SIP, EMI, Bigha, Sarkari Age खोजें' : 'Try searching for SIP, EMI, Bigha, or Age'}
              </p>
            </div>
          )}

          {/* Quick links footer */}
          {!query.trim() && (
            <div className="p-2.5 bg-slate-50/70 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5 px-3">
              <span className="text-[11px] text-slate-400 self-center mr-1">Quick:</span>
              {POPULAR_SEARCH_KEYWORDS.slice(0, 4).map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] px-2 py-0.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-600 hover:border-blue-500"
                >
                  {language === 'hi' ? item.labelHi : item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
