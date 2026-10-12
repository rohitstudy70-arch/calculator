import React from 'react';
import Link from 'next/link';
import { CATEGORIES, getCalculatorHref, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export default function Footer() {
  const popularCalculators = [
    { name: 'EMI Calculator', href: '/emi-calculator' },
    { name: 'SIP Calculator', href: '/sip-calculator' },
    { name: 'Income Tax Calculator', href: '/income-tax-calculator' },
    { name: 'GST Calculator', href: '/gst-calculator' },
    { name: 'Age Calculator', href: '/age-calculator' },
    { name: 'BMI Calculator', href: '/bmi-calculator' },
    { name: 'Online Calculator', href: '/calculator' },
  ];

  const specialToolsAndGuides = [
    { name: 'USD to INR (Dollar to Rupee)', href: '/dollar-to-rupee' },
    { name: 'AED to INR (Dirham to Rupee)', href: '/aed-to-inr' },
    { name: 'XE Currency Converter', href: '/xe-currency-converter' },
    { name: 'EDD Calculator & Tracker', href: '/edd-calculator' },
    { name: 'DOB Calculator', href: '/dob-calculator' },
    { name: 'Calculate DOB from Age', href: '/calculate-dob-from-age' },
    { name: 'ICMR BMI Chart for Indians', href: '/blog/bmi-chart-for-indians-icmr-guidelines' },
    { name: 'Personal Loan Prepayment Guide', href: '/blog/personal-loan-prepayment-early-repayment-india' },
    { name: 'Home Loan EMI vs Prepayment', href: '/blog/home-loan-emi-vs-prepayment' },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-2xl font-bold text-[#1E40AF] dark:text-[#3b82f6] tracking-tight">{SITE_NAME.split(' ')[0]}</span>
              <span className="text-xs font-semibold bg-[#059669] text-white px-1.5 py-0.5 rounded-sm">India</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {SITE_DESCRIPTION}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map(category => (
                <li key={category.id}>
                  <Link href={`/${category.slug}-calculators`} className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link href="/blog" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]">Financial &amp; Health Blog</Link></li>
              <li><Link href="/about" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Column 4: Popular */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Popular Calculators</h3>
            <ul className="space-y-2.5">
              {popularCalculators.map(calc => (
                <li key={calc.href}>
                  <Link href={calc.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]">
                    {calc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Complete All Calculators & Tools Directory for Fast Indexing & Internal Linking */}
        <div className="py-8 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
            All Online Calculators &amp; Financial Tools Directory
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => (
              <div key={`footer-dir-${category.id}`}>
                <Link
                  href={`/${category.slug}-calculators`}
                  className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-[#1E40AF] dark:hover:text-[#3b82f6] block mb-2"
                >
                  {category.name}
                </Link>
                <ul className="space-y-1.5">
                  {category.calculators.map((calc) => (
                    <li key={`footer-calc-${category.id}-${calc.id}`}>
                      <Link
                        href={getCalculatorHref(calc.slug)}
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]"
                      >
                        {calc.name} {calc.name.toLowerCase().includes('calculator') || calc.name.toLowerCase().includes('converter') ? '' : 'Calculator'}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <Link
                href="/blog"
                className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-[#1E40AF] dark:hover:text-[#3b82f6] block mb-2"
              >
                Special Tools &amp; Guides
              </Link>
              <ul className="space-y-1.5">
                {specialToolsAndGuides.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-[#1E40AF] dark:hover:text-[#3b82f6]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <span>Made with <span className="text-red-500">♥</span> in India</span>
            <span className="ml-2 px-2 py-0.5 border border-slate-300 dark:border-slate-700 rounded text-xs bg-white dark:bg-slate-800">Bharat</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
