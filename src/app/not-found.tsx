import React from 'react';
import Link from 'next/link';
import SearchBox from '@/components/layout/SearchBox';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Page Not Found</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        We couldn't find the page or calculator you're looking for. Try searching below or return to the homepage.
      </p>
      
      <div className="w-full max-w-md mb-12 flex justify-center">
        <SearchBox />
      </div>

      <div className="mb-12">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
          Popular Calculators
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/calculator/emi" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-[#1E40AF] hover:text-white dark:hover:bg-[#3b82f6] dark:hover:text-white transition-colors">
            EMI Calculator
          </Link>
          <Link href="/calculator/sip" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-[#1E40AF] hover:text-white dark:hover:bg-[#3b82f6] dark:hover:text-white transition-colors">
            SIP Calculator
          </Link>
          <Link href="/calculator/income-tax" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-[#1E40AF] hover:text-white dark:hover:bg-[#3b82f6] dark:hover:text-white transition-colors">
            Income Tax
          </Link>
        </div>
      </div>

      <Link href="/" className="inline-flex items-center px-6 py-3 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white font-medium rounded-lg transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Return to Home
      </Link>
    </div>
  );
}
