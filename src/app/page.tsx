import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { AdSlot } from '@/components/ui/AdSlot';

export const metadata: Metadata = {
  title: 'CalcMaster India - Free Financial, Tax & Math Calculators',
  description: 'Free online calculators for India. Calculate EMI, SIP, Income Tax (Old vs New), GST, EPF, PPF, Salary, BMI & more with instant charts & PDF reports. Try now!',
  alternates: {
    canonical: 'https://calcmaster.in',
  }
};

export default function HomePage() {
  const popularCalculators = [
    { id: 'emi', name: 'EMI Calculator', desc: 'Calculate home & car loan EMI', slug: '/emi-calculator', icon: '🏠' },
    { id: 'sip', name: 'SIP Calculator', desc: 'Mutual fund returns', slug: '/sip-calculator', icon: '📈' },
    { id: 'income-tax', name: 'Income Tax', desc: 'Old vs New regime', slug: '/income-tax-calculator', icon: '💰' },
    { id: 'gst', name: 'GST Calculator', desc: 'Add/Remove GST', slug: '/gst-calculator', icon: '🧾' },
    { id: 'ppf', name: 'PPF Calculator', desc: 'Public Provident Fund', slug: '/ppf-calculator', icon: '🏦' },
    { id: 'bmi', name: 'BMI Calculator', desc: 'Check body mass index', slug: '/bmi-calculator', icon: '⚖️' },
    { id: 'age', name: 'Age Calculator', desc: 'Exact age in years & days', slug: '/age-calculator', icon: '🎂' },
    { id: 'percentage', name: 'Percentage', desc: 'Quick percentage math', slug: '/percentage-calculator', icon: '💯' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Free Online Calculators for India
          </h1>
          <p className="text-xl text-blue-100 mb-10">
            EMI, SIP, Tax, GST, Health & more — instant, accurate results
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-transparent"
                type="text"
                id="search"
                placeholder="Search calculators (e.g., 'Home Loan EMI', 'SIP')..."
              />
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        {/* Popular Calculators */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Popular Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCalculators.map(calc => (
              <Link href={calc.slug} key={calc.id} className="block group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200">
                  <div className="text-4xl mb-4">{calc.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {calc.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {calc.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="my-12">
          <AdSlot id="home-middle" height={90} className="rounded-xl overflow-hidden" />
        </div>

        {/* Categories */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            All Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map(category => (
              <div key={category.id} id={category.id} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                  {category.description}
                </p>
                <ul className="space-y-3">
                  {category.calculators.map(calc => (
                    <li key={calc.id}>
                      <Link 
                        href={`/${calc.slug}-calculator`}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center justify-between group"
                      >
                        <span>{calc.name}</span>
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            CalcMaster is India's most trusted online platform for financial, mathematical, and health calculators. 
            Whether you need to plan your home loan with our EMI calculator, project your wealth with the SIP calculator, 
            or figure out your tax liabilities, we provide fast and accurate tools completely free of charge. Our responsive 
            design ensures you can crunch numbers effortlessly on your mobile, tablet, or desktop.
          </p>
        </section>
      </main>
    </div>
  );
}
