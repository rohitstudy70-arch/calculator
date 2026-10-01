'use client';

import React, { useState } from 'react';
import { HindiSection } from '@/lib/blog-types';

interface BilingualSectionProps {
  data: HindiSection;
}

export default function BilingualSection({ data }: BilingualSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!data) return null;

  return (
    <div className="not-prose my-8 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-6 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            हिं
          </span>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              हिंदी सारांश और मुख्य निष्कर्ष (Hindi Summary)
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              इस लेख का संक्षिप्त हिंदी विवरण और जरूरी सुझाव
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-sm hover:bg-amber-100 transition-colors"
        >
          {isOpen ? 'छुपाएं (Hide)' : 'देखें (Read in Hindi)'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 pt-4 border-t border-amber-200 dark:border-amber-800/50 flex flex-col gap-4 text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
          <p>{data.intro}</p>

          <div className="p-4 bg-white dark:bg-gray-900/60 rounded-xl border border-amber-200 dark:border-amber-900/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-1">
              मुख्य निष्कर्ष (Key Takeaway)
            </h4>
            <p className="font-semibold text-gray-900 dark:text-white">{data.verdict}</p>
          </div>

          {data.faqs && data.faqs.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                महत्वपूर्ण प्रश्नोत्तरी (Frequently Asked Questions in Hindi)
              </h4>
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="p-3 bg-white/70 dark:bg-gray-800/60 rounded-lg text-xs">
                  <p className="font-bold text-gray-900 dark:text-white mb-1">
                    प्र. {faq.question}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
