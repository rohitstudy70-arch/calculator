'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically imported calculators for embed
const LoanPrepaymentCalculator = dynamic(
  () => import('@/components/calculators/LoanPrepaymentCalculator').then(mod => mod.LoanPrepaymentCalculator),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" /> }
);
const EMICalculator = dynamic(
  () => import('@/components/calculators/EMICalculator').then(mod => mod.EMICalculator),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" /> }
);
const SIPCalculator = dynamic(
  () => import('@/components/calculators/SIPCalculator').then(mod => mod.SIPCalculator),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" /> }
);
const IncomeTaxCalculator = dynamic(
  () => import('@/components/calculators/IncomeTaxCalculator'),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" /> }
);
const BMICalculator = dynamic(
  () => import('@/components/calculators/BMICalculator').then(mod => mod.BMICalculator),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" /> }
);

interface CalculatorEmbedProps {
  slug: string;
  title?: string;
}

export default function CalculatorEmbed({ slug, title }: CalculatorEmbedProps) {
  let CalculatorComponent = null;

  switch (slug) {
    case 'loan-prepayment-calculator':
      CalculatorComponent = LoanPrepaymentCalculator;
      break;
    case 'emi-calculator':
      CalculatorComponent = EMICalculator;
      break;
    case 'sip-calculator':
      CalculatorComponent = SIPCalculator;
      break;
    case 'income-tax-calculator':
      CalculatorComponent = IncomeTaxCalculator;
      break;
    case 'bmi-calculator':
      CalculatorComponent = BMICalculator;
      break;
    default:
      CalculatorComponent = LoanPrepaymentCalculator;
  }

  return (
    <div className="not-prose my-10 p-6 md:p-8 bg-gradient-to-br from-blue-50/60 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl border border-blue-200/70 dark:border-blue-900/50 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-2.5 py-1 rounded-full">
            Interactive Tool Embed
          </span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1.5">
            {title || 'Try the Calculation Tool Live'}
          </h3>
        </div>
        <Link
          href={`/${slug}`}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
        >
          Open Full Page Mode
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <CalculatorComponent />
    </div>
  );
}
