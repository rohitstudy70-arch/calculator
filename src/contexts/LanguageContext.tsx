'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_LOCALE } from '@/lib/constants';
import { en } from '@/lib/translations/en';
import { hi } from '@/lib/translations/hi';

type Locale = 'en' | 'hi';

type Translations = typeof en;

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Locale>(DEFAULT_LOCALE as Locale);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Locale;
    if (savedLang === 'en' || savedLang === 'hi') {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: keyof Translations): string => {
    const translations = language === 'hi' ? hi : en;
    return translations[key] || en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
