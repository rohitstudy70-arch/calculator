import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, getCalculatorHref } from '@/lib/constants';
import { AdSlot } from '@/components/ui/AdSlot';
import HeroSearch from '@/components/home/HeroSearch';

export const metadata: Metadata = {
  title: 'CalcMaster India - Free Financial, Tax & Math Calculators',
  description: 'Free online calculators for India. Calculate EMI, SIP, Income Tax (Old vs New), GST, EPF, PPF, Salary, BMI & more with instant charts & PDF reports. Try now!',
  alternates: {
    canonical: 'https://www.calcmaster.co.in',
  }
};

export default function HomePage() {
  const popularCalculators = [
    { id: 'emi', name: 'EMI Calculator', desc: 'Calculate home & car loan EMI', slug: '/emi-calculator', icon: '🏠' },
    { id: 'sip', name: 'SIP Calculator', desc: 'Mutual fund wealth returns', slug: '/sip-calculator', icon: '📈' },
    { id: 'income-tax', name: 'Income Tax FY 25-26', desc: 'Old vs New tax regime', slug: '/income-tax-calculator', icon: '💰' },
    { id: 'sarkari-exam-age', name: 'Sarkari Exam Age', desc: 'Check eligibility & cutoff', slug: '/sarkari-exam-age-calculator', icon: '🎯' },
    { id: 'land-unit-converter', name: 'Land Converter', desc: 'Bigha, Katha to Sq Ft', slug: '/land-unit-converter', icon: '🌾' },
    { id: 'gst', name: 'GST Calculator', desc: 'Add/Remove GST slabs', slug: '/gst-calculator', icon: '🧾' },
    { id: 'salary', name: 'Salary In-Hand', desc: 'CTC to take-home pay', slug: '/salary-calculator', icon: '💵' },
    { id: 'ppf', name: 'PPF Calculator', desc: 'Public Provident Fund 7.1%', slug: '/ppf-calculator', icon: '🏦' },
    { id: 'bmi', name: 'BMI Calculator', desc: 'Body mass & ideal weight', slug: '/bmi-calculator', icon: '⚖️' },
    { id: 'age', name: 'Age Calculator', desc: 'Exact age in years & days', slug: '/age-calculator', icon: '🎂' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1E3A8A] via-[#1E40AF] to-[#1D4ED8] text-white py-16 md:py-24 px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
            Free Online Calculators for India
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-normal">
            EMI, SIP, Income Tax, Land Units, Exam Age & more — fast, 100% free & accurate results
          </p>
          
          {/* Fully Interactive Live Hero Search */}
          <HeroSearch />
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        {/* Popular Calculators */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Popular Calculators
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Most frequently used financial, tax, utility and exam calculators across India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {popularCalculators.map(calc => (
              <Link href={calc.slug} key={calc.id} className="block group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-3xl mb-3 p-2 bg-blue-50 dark:bg-slate-700/50 rounded-xl w-fit">{calc.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2">
                      {calc.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Calculate Now</span>
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="my-12">
          <AdSlot id="home-middle" height={90} className="rounded-xl overflow-hidden" />
        </div>

        {/* All Categories */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Browse by Category
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Explore 35+ specialized calculators organized for your daily calculations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map(category => (
              <div key={category.id} id={category.id} className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-5 text-xs">
                  {category.description}
                </p>
                <ul className="space-y-2.5">
                  {category.calculators.map(calc => (
                    <li key={calc.id}>
                      <Link 
                        href={getCalculatorHref(calc.slug)}
                        className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center justify-between group p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <span>{calc.name}</span>
                        <svg className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Why CalcMaster */}
        <section className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 md:p-12 mb-12 border border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Why Use CalcMaster?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Real-time calculations as you type, no waiting or page reloads.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">No Signup Required</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">100% free to use. No accounts, no data collection, no hassle.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">India Focused</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Formatted in INR, aligned with Indian financial rules and tax laws.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Easy Exports</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Download comprehensive reports in PDF and Excel formats.</p>
            </div>
          </div>
        </section>

        {/* SEO Text */}
        <section className="prose prose-sm dark:prose-invert max-w-none text-gray-500 dark:text-gray-400 text-center">
          <p>
            CalcMaster is India&apos;s most trusted online platform for financial, mathematical, and health calculators. 
            Whether you need to plan your home loan with our EMI calculator, project your wealth with the SIP calculator, 
            calculate your land area in Bigha and Katha, check Sarkari Exam age eligibility, or figure out your tax liabilities, 
            we provide fast and accurate tools completely free of charge.
          </p>
        </section>
      </main>
    </div>
  );
}
