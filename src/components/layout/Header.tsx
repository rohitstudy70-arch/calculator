'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES, getCalculatorHref } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import SearchBox from './SearchBox';
import MobileSearchModal from './MobileSearchModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileCategories, setOpenMobileCategories] = useState<Record<string, boolean>>({
    loan: true, // open first by default
  });
  
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMobileCategory = (catId: string) => {
    setOpenMobileCategories(prev => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Concise category labels for top navigation bar
  const getShortCategoryName = (id: string, isHindi: boolean) => {
    if (isHindi) {
      switch (id) {
        case 'loan': return 'ऋण';
        case 'investment': return 'निवेश';
        case 'tax': return 'टैक्स';
        case 'retirement': return 'रिटायरमेंट';
        case 'health': return 'स्वास्थ्य';
        case 'math': return 'गणित';
        case 'utility': return 'उपयोगिता';
        default: return id;
      }
    }
    switch (id) {
      case 'loan': return 'Loans';
      case 'investment': return 'Investments';
      case 'tax': return 'Taxes';
      case 'retirement': return 'Retirement';
      case 'health': return 'Health';
      case 'math': return 'Math';
      case 'utility': return 'Utility';
      default: return id;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1E40AF] text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>
        
        <div className="container mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2 md:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-xl sm:text-2xl font-black text-[#1E40AF] dark:text-[#3b82f6] tracking-tight">
              CalcMaster
            </span>
            <span className="text-[11px] font-bold bg-[#059669] text-white px-1.5 py-0.5 rounded shadow-sm">
              India
            </span>
          </Link>
          
          {/* Desktop Nav (Visible on lg and above) */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-0">
            {CATEGORIES.map(category => (
              <div 
                key={category.id} 
                className="relative group"
                onMouseEnter={() => setOpenDropdown(category.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button 
                  className="px-2.5 py-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#1E40AF] dark:hover:text-[#3b82f6] rounded-md focus:outline-none flex items-center gap-1 transition-colors"
                  aria-expanded={openDropdown === category.id}
                >
                  <span>{getShortCategoryName(category.id, language === 'hi')}</span>
                  <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openDropdown === category.id && (
                  <div className="absolute top-full left-0 w-64 pt-1.5">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
                        {language === 'hi' ? category.nameHi : category.name}
                      </div>
                      <ul className="py-1.5 max-h-80 overflow-y-auto divide-y divide-slate-100/50 dark:divide-slate-800/50">
                        {category.calculators.map(calc => (
                          <li key={calc.id}>
                            <Link 
                              href={getCalculatorHref(calc.slug)}
                              className="block px-3.5 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-[#1E40AF] dark:hover:text-[#3b82f6] transition-colors"
                            >
                              {language === 'hi' ? calc.nameHi : calc.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Right side actions (Search + Language + Dark Mode) */}
          <div className="hidden lg:flex items-center space-x-2.5 flex-1 justify-end max-w-md xl:max-w-lg">
            <SearchBox />
            
            <button 
              onClick={toggleLanguage}
              className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors"
              aria-label="Toggle language"
              title={language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
            
            <button
              onClick={toggleTheme}
              className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-slate-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Right Bar: Search Icon + Language + Dark Mode + Hamburger Menu */}
          <div className="flex items-center space-x-1.5 lg:hidden">
            {/* Direct Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="p-2 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
              aria-label="Search calculators"
              title="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-slate-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Search Modal */}
      <MobileSearchModal
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />

      {/* Mobile Drawer Menu (Robust & Touch-Friendly) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop (Separate click catcher) */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-[#1E40AF] dark:text-[#3b82f6]">CalcMaster</span>
                <span className="text-[10px] font-bold bg-[#059669] text-white px-1.5 py-0.2 rounded">India</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Search trigger inside drawer */}
            <div className="p-3 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm border border-slate-200 dark:border-slate-700 shadow-sm active:scale-98 transition-transform"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{language === 'hi' ? '35+ कैलकुलेटर खोजें...' : 'Search 35+ calculators...'}</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded">
                  Open
                </span>
              </button>
            </div>

            {/* Scrollable Categories Accordion */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 pt-1 pb-1">
                {language === 'hi' ? 'सभी श्रेणियां (Categories)' : 'All Calculator Categories'}
              </div>

              {CATEGORIES.map(category => {
                const isExpanded = !!openMobileCategories[category.id];
                return (
                  <div key={category.id} className="rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/20">
                    <button
                      onClick={() => toggleMobileCategory(category.id)}
                      className="w-full flex items-center justify-between p-3 text-left font-bold text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/60 active:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span>{language === 'hi' ? category.nameHi : category.name}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                          ({category.calculators.length})
                        </span>
                      </div>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-blue-600' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <ul className="p-2 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/60">
                        {category.calculators.map(calc => (
                          <li key={calc.id}>
                            <Link
                              href={getCalculatorHref(calc.slug)}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 active:bg-blue-50 dark:active:bg-slate-800 rounded-lg transition-colors"
                            >
                              <span>{language === 'hi' ? calc.nameHi : calc.name}</span>
                              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Footer inside drawer */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0 text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                CalcMaster India &bull; 100% Free Calculators
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
