'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchCalculators, POPULAR_SEARCH_KEYWORDS, SearchableCalculator } from '@/lib/search-data';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { language } = useLanguage();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results: SearchableCalculator[] = React.useMemo(() => {
    return searchCalculators(query, language);
  }, [query, language]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation (Arrow keys, Enter, Esc)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'ArrowDown' && query) {
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
      } else if (results.length > 0) {
        router.push(results[0].href);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative" ref={searchContainerRef}>
      {/* Main Search Input Box */}
      <div className="relative flex items-center w-full h-14 md:h-16 rounded-2xl md:rounded-full bg-white dark:bg-slate-900 shadow-2xl border border-blue-200/50 dark:border-slate-700 transition-all focus-within:ring-4 focus-within:ring-blue-400/40 dark:focus-within:ring-blue-500/30">
        <div className="grid place-items-center h-full w-14 text-blue-600 dark:text-blue-400 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          ref={inputRef}
          className="peer h-full w-full outline-none text-base md:text-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-transparent pr-4 font-normal"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            language === 'hi'
              ? "कैलकुलेटर खोजें (उदा. 'होम लोन EMI', 'सिप', 'बीघा', 'सरकारी उम्र')..."
              : "Search calculators (e.g. 'Home Loan EMI', 'SIP', 'Bigha', 'Sarkari Age')..."
          }
          aria-label="Search calculators"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-3 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Live Search Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 text-left max-h-[420px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400 px-4">
            <span>
              {results.length > 0
                ? `${results.length} ${language === 'hi' ? 'कैलकुलेटर मिले' : 'Calculators Found'}`
                : language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No calculators found'}
            </span>
            <span className="hidden sm:inline-block text-[11px] font-normal text-slate-400">
              {language === 'hi' ? 'नेविगेट करने के लिए ↑ ↓ और Enter दबाएं' : 'Use ↑ ↓ arrows to navigate, Enter to open'}
            </span>
          </div>

          {results.length > 0 ? (
            <ul className="py-2 divide-y divide-slate-100 dark:divide-slate-800/60">
              {results.map((calc, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={calc.id}>
                    <Link
                      href={calc.href}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`block px-4 py-3 transition-colors ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl shrink-0 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">{calc.icon}</span>
                          <div className="truncate">
                            <div className="flex items-center gap-2">
                              <span className="text-base font-semibold text-slate-900 dark:text-white">
                                {language === 'hi' ? calc.nameHi : calc.name}
                              </span>
                              {calc.popular && (
                                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {language === 'hi' ? calc.descriptionHi : calc.description}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs shrink-0 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md font-medium border border-slate-200 dark:border-slate-700">
                          {language === 'hi' ? calc.categoryNameHi : calc.categoryName}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <div className="text-3xl mb-2">🔍</div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {language === 'hi' ? 'कोई कैलकुलेटर नहीं मिला' : `No matches for "${query}"`}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === 'hi' ? 'कृपया EMI, SIP, Income Tax, Bigha जैसे शब्द खोजें' : 'Try searching for EMI, SIP, Income Tax, Bigha, or Sarkari Age'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Popular Search Quick Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-blue-200 dark:text-slate-400 font-medium flex items-center gap-1">
          <span>🔥</span> {language === 'hi' ? 'लोकप्रिय खोजें:' : 'Popular:'}
        </span>
        {POPULAR_SEARCH_KEYWORDS.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all hover:scale-105 border border-white/10"
          >
            {language === 'hi' ? item.labelHi : item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
