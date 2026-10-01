'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RATES } from '@/config/rates';
import { HEALTH_CONFIG } from '@/config/health';

interface DisclaimerNoteProps {
  className?: string;
  sourceNote?: string;
  type?: 'financial' | 'health' | 'medical' | 'loan' | 'investment' | 'retirement';
}

export function DisclaimerNote({ className = '', sourceNote, type = 'financial' }: DisclaimerNoteProps) {
  const { language } = useLanguage();
  
  const isHealth = type === 'health' || type === 'medical';
  const defaultNote = isHealth
    ? (language === 'hi' ? HEALTH_CONFIG.medicalDisclaimer.hi : HEALTH_CONFIG.medicalDisclaimer.en)
    : (language === 'hi' ? RATES.disclaimerNote.hi : RATES.disclaimerNote.en);

  const bgColor = isHealth
    ? 'bg-rose-50/80 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-800/40 text-rose-900 dark:text-rose-200/90'
    : 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-800/40 text-amber-900 dark:text-amber-200/90';

  const iconColor = isHealth
    ? 'text-rose-600 dark:text-rose-400'
    : 'text-amber-600 dark:text-amber-400';

  const sourceColor = isHealth
    ? 'text-rose-700 dark:text-rose-300/80'
    : 'text-amber-700 dark:text-amber-300/80';

  return (
    <div className={`flex items-start gap-2.5 p-3.5 border rounded-xl text-xs ${bgColor} ${className}`}>
      <svg
        className={`w-4 h-4 shrink-0 mt-0.5 ${iconColor}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      <div>
        <p className="leading-relaxed font-medium">{defaultNote}</p>
        {sourceNote && (
          <p className={`mt-1 text-[11px] opacity-90 ${sourceColor}`}>{sourceNote}</p>
        )}
      </div>
    </div>
  );
}

export default DisclaimerNote;
