import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { SimpleInterestCalculator } from '@/components/calculators/SimpleInterestCalculator';
import { simpleInterestContent } from '@/data/calculator-content/simple-interest';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: simpleInterestContent.en.pageTitle,
  description: simpleInterestContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/simple-interest-calculator',
  },
  openGraph: {
    title: simpleInterestContent.en.pageTitle,
    description: simpleInterestContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/simple-interest-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: simpleInterestContent.en.pageTitle,
    description: simpleInterestContent.en.metaDescription,
  },
};

export default function SimpleInterestCalculatorPage() {
  const content = simpleInterestContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Investment Calculators', href: '/investment-calculators' },
    { label: 'Simple Interest Calculator', href: '/simple-interest-calculator' },
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
    url: 'https://www.calcmaster.co.in/simple-interest-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Simple Interest',
    description: 'Calculate simple interest on any principal amount using SI = (P × R × T) / 100.',
    step: [
      { '@type': 'HowToStep', name: 'Enter Principal Amount', text: 'Input the initial money borrowed or deposited in INR.' },
      { '@type': 'HowToStep', name: 'Specify Annual Interest Rate', text: 'Input the interest rate percentage per annum.' },
      { '@type': 'HowToStep', name: 'Select Time Tenure', text: 'Choose duration in years, months, or days.' },
      { '@type': 'HowToStep', name: 'Apply Formula', text: 'Multiply Principal by Rate by Time and divide by 100: SI = (P × R × T) / 100.' },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <Breadcrumb items={breadcrumbs} />

      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {content.h1}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {content.introText}
        </p>
      </div>

      <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-sm not-prose">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
          <span>💡</span> Quick Answer: Simple Interest Formula (SI)
        </h2>
        <div className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
          <p>
            <strong>Standard Formula:</strong> <code className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-mono text-blue-700 dark:text-blue-300">SI = (P × R × T) ÷ 100</code>
          </p>
          <p>
            <strong>Example:</strong> Borrowing <strong>₹50,000</strong> at <strong>8% p.a.</strong> for <strong>3 years</strong>: <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded font-mono text-xs">(50,000 × 8 × 3) ÷ 100 = ₹12,000 Interest</code>. Total Repayment = <strong>₹62,000</strong>.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
            ⚡ <em>Reverse Formula:</em> Find Rate: <code className="font-mono">R = (SI × 100) ÷ (P × T)</code> | Find Time: <code className="font-mono">T = (SI × 100) ÷ (P × R)</code>.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />}>
        <SimpleInterestCalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="si-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How to Use the Simple Interest Calculator</h2>
          <ol className="list-decimal pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300">
            {content.howToUse.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Simple Interest Formula & Reverse Modes</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">{content.formulaExplanation}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.solvedExamples?.map((example, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{example.inputs}</p>
                <p className="text-sm font-mono bg-white dark:bg-gray-900 p-2 rounded mb-2 overflow-x-auto">
                  {example.calculation}
                </p>
                <p className="font-semibold text-blue-700 dark:text-blue-400">{example.result}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tips for Borrowers and Lenders</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {content.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes to Avoid</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {content.commonMistakes?.map((mistake, idx) => (
                <li key={idx}>{mistake}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <FAQ items={content.faqs} />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {content.relatedCalculators?.map((calc, idx) => (
              <Link key={idx} href={calc.slug.startsWith('/') ? calc.slug : `/${calc.slug}`} className="block group">
                <div className="h-full bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-sm">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{calc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <LastUpdated date="2026-09-30" />
    </div>
  );
}
