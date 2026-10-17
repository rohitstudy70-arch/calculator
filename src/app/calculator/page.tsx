import React, { Suspense } from 'react';
import { Metadata } from 'next';
import BasicCalculator from '@/components/calculators/BasicCalculator';
import { basicCalculatorContent } from '@/data/calculator-content/basic-calculator';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: basicCalculatorContent.en.pageTitle,
  },
  description: basicCalculatorContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/calculator',
  },
  openGraph: {
    title: basicCalculatorContent.en.pageTitle,
    description: basicCalculatorContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: basicCalculatorContent.en.pageTitle,
    description: basicCalculatorContent.en.metaDescription,
  },
};

export default function CalculatorPage() {
  const content = basicCalculatorContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Math Calculators', href: '/math-calculators' },
    { label: 'Online Calculator', href: '/calculator' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.pageTitle,
    description: content.metaDescription,
    url: 'https://www.calcmaster.co.in/calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <Breadcrumb items={breadcrumbs} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {content.h1}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {content.introText}
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />}>
        <BasicCalculator />
      </Suspense>

      <section className="mt-12 not-prose">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Popular Online Calculators for India
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Explore essential financial, tax, mathematical, and utility tools built specifically for Indian rules and benchmarks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cluster 1: Tax & Salary */}
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-base">
              <span>💼</span>
              <h3>Tax & Salary Calculators</h3>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/salary-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 flex items-center justify-between">
                  <span>Salary In-Hand Calculator</span>
                  <span className="text-xs text-slate-500">CTC to Take-home →</span>
                </Link>
              </li>
              <li>
                <Link href="/income-tax-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 flex items-center justify-between">
                  <span>Income Tax (Old vs New)</span>
                  <span className="text-xs text-slate-500">FY 2025-26 Slabs →</span>
                </Link>
              </li>
              <li>
                <Link href="/gst-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 flex items-center justify-between">
                  <span>GST Calculator Online</span>
                  <span className="text-xs text-slate-500">Add & Remove Mode →</span>
                </Link>
              </li>
              <li>
                <Link href="/hra-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 flex items-center justify-between">
                  <span>HRA Exemption Calculator</span>
                  <span className="text-xs text-slate-500">Metro vs Non-Metro →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cluster 2: Investment & Loans */}
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
              <span>📈</span>
              <h3>Investment & Savings</h3>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/sip-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-emerald-600 flex items-center justify-between">
                  <span>SIP Calculator</span>
                  <span className="text-xs text-slate-500">Mutual Fund Returns →</span>
                </Link>
              </li>
              <li>
                <Link href="/sukanya-samriddhi-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-emerald-600 flex items-center justify-between">
                  <span>Sukanya Samriddhi (SSY)</span>
                  <span className="text-xs text-slate-500">8.2% Tax-Free EEE →</span>
                </Link>
              </li>
              <li>
                <Link href="/ppf-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-emerald-600 flex items-center justify-between">
                  <span>PPF Calculator</span>
                  <span className="text-xs text-slate-500">15-Year Schedule →</span>
                </Link>
              </li>
              <li>
                <Link href="/home-loan-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-emerald-600 flex items-center justify-between">
                  <span>Home Loan EMI Calculator</span>
                  <span className="text-xs text-slate-500">Amortization Table →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cluster 3: Math & Indian Utilities */}
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <span>📐</span>
              <h3>Math & Indian Utilities</h3>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/graphing-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 flex items-center justify-between">
                  <span>2D Graphing Calculator</span>
                  <span className="text-xs text-slate-500">Plot Functions & Roots →</span>
                </Link>
              </li>
              <li>
                <Link href="/land-unit-converter" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 flex items-center justify-between">
                  <span>Land Unit Converter</span>
                  <span className="text-xs text-slate-500">Bigha, Katha, Guntha →</span>
                </Link>
              </li>
              <li>
                <Link href="/sarkari-exam-age-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 flex items-center justify-between">
                  <span>Sarkari Exam Age Limit</span>
                  <span className="text-xs text-slate-500">UPSC, SSC, Banking →</span>
                </Link>
              </li>
              <li>
                <Link href="/bmi-calculator" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 flex items-center justify-between">
                  <span>BMI Calculator (ICMR)</span>
                  <span className="text-xs text-slate-500">Ideal Indian Weight →</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="my-12">
        <AdSlot id="basic-calc-leaderboard" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How to Use the Online Calculator</h2>
          <ol className="list-decimal pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300">
            {content.howToUse.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Basic Operations & Mathematical Precedence</h2>
          <p className="mt-4 whitespace-pre-line text-gray-700 dark:text-gray-300">
            {content.formulaExplanation}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            {content.solvedExamples?.map((example, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {example.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {example.inputs}
                </p>
                <p className="text-xs font-mono bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2 rounded mb-2 overflow-x-auto whitespace-pre-line">
                  {example.calculation}
                </p>
                <p className="font-semibold text-sm text-blue-600 dark:text-blue-400">
                  {example.result}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-4">
              Calculator Features & Shortcuts
            </h2>
            <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
              {content.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/40 p-6 rounded-2xl border border-rose-200 dark:border-rose-800">
            <h2 className="text-xl font-bold text-rose-900 dark:text-rose-300 mb-4">
              Common Calculation Pitfalls
            </h2>
            <ul className="space-y-2 text-sm text-rose-800 dark:text-rose-200">
              {content.commonMistakes?.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <FAQ items={content.faqs} />
        </section>

        <section className="not-prose mt-12 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Related Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {content.relatedCalculators?.map((calc, idx) => (
              <Link key={idx} href={calc.slug.startsWith('/') ? calc.slug : `/${calc.slug}`} className="block group">
                <div className="h-full bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-sm">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {calc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <LastUpdated date="2026-10-07" />
    </div>
  );
}
