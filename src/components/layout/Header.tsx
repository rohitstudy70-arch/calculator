'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES, getCalculatorHref } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import SearchBox from './SearchBox';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1E40AF] text-white px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>
      
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-2 md:gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="text-2xl font-bold text-[#1E40AF] dark:text-[#3b82f6] tracking-tight">CalcMaster</span>
          <span className="text-xs font-semibold bg-[#059669] text-white px-1.5 py-0.5 rounded-sm">India</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center space-x-1 shrink-0">
          {CATEGORIES.map(category => (
            <div 
              key={category.id} 
              className="relative group"
              onMouseEnter={() => setOpenDropdown(category.id)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button 
                className="px-2.5 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#1E40AF] dark:hover:text-[#3b82f6] rounded-md focus:outline-none flex items-center gap-1"
                aria-expanded={openDropdown === category.id}
              >
                <span>{getShortCategoryName(category.id, language === 'hi')}</span>
                <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openDropdown === category.id && (
                <div className="absolute top-full left-0 w-64 pt-2">
                  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {language === 'hi' ? category.nameHi : category.name}
                    </div>
                    <ul className="py-1.5 max-h-80 overflow-y-auto">
                      {category.calculators.map(calc => (
                        <li key={calc.id}>
                          <Link 
                            href={getCalculatorHref(calc.slug)}
                            className="block px-3.5 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#1E40AF] dark:hover:text-[#3b82f6] rounded-md transition-colors"
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

        {/* Right side actions - Enlarged & Prominent SearchBox */}
        <div className="hidden lg:flex items-center space-x-3 flex-1 justify-end max-w-lg">
          <SearchBox />
          
          <button 
            onClick={toggleLanguage}
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors"
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu and search toggle button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button 
            onClick={toggleLanguage}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
          >
            {language === 'en' ? 'हिं' : 'EN'}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-slate-950 pb-12 shadow-xl">
            <div className="flex px-4 pt-5 pb-2 items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <span className="text-xl font-bold text-[#1E40AF] dark:text-[#3b82f6]">CalcMaster</span>
              <button
                type="button"
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-slate-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800">
              <SearchBox />
            </div>

            <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>

            <div className="mt-4 px-2">
              {CATEGORIES.map(category => (
                <div key={category.id} className="mb-4">
                  <h3 className="px-3 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                    {language === 'hi' ? category.nameHi : category.name}
                  </h3>
                  <ul className="space-y-1">
                    {category.calculators.map(calc => (
                      <li key={calc.id}>
                        <Link
                          href={getCalculatorHref(calc.slug)}
                          className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6] hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {language === 'hi' ? calc.nameHi : calc.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
