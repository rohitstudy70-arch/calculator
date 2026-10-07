import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ROICalculator from '@/components/calculators/ROICalculator';
import { roiContent } from '@/data/calculator-content/roi';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

const pageTitle = roiContent.en.pageTitle;
const metaDescription = roiContent.en.metaDescription;

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/roi-calculator',
  },
  openGraph: {
    title: pageTitle,
    description: metaDescription,
    url: 'https://www.calcmaster.co.in/roi-calculator',
    siteName: 'CalcMaster India',
    locale: 'en_IN',
    type: 'website',
  },
  keywords: [
    'roi calculator',
    'return on investment calculator',
    'calculate roi',
    'annualized roi calculator',
    'investment return calculator',
    'roi percentage calculator',
    'roi calculator online',
    'cagr vs roi',
  ],
};

export default function ROICalculatorPage() {
  const content = roiContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Investment Calculators', href: '/investment-calculators' },
    { label: 'ROI Calculator', href: '/roi-calculator' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: pageTitle,
    description: metaDescription,
    url: 'https://www.calcmaster.co.in/roi-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb items={breadcrumbs} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {content.h1}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          {content.introText}
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl h-96 w-full" />}>
        <ROICalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="roi-calc-slot-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        {/* How to use */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            How to Use the ROI Calculator
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mt-4 text-slate-700 dark:text-slate-300">
            {content.howToUse.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>

        {/* Real life practical applications */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
              📈 Stock &amp; Mutual Fund Portfolio
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Measure the true annualized performance of equity holdings and compare them with standard benchmarks like Nifty 50 or Sensex.
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
              🏢 Real Estate &amp; Business Ventures
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Evaluate commercial property yield, capital appreciation, and business expansion payback periods with multi-year compound math.
            </p>
          </div>
        </section>

        {/* Solved Examples */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Solved ROI Calculation Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mt-6">
            {content.solvedExamples.map((ex, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-2">
                    {ex.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
                    {ex.inputs}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line mb-3 font-mono bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    {ex.calculation}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {ex.result}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formula */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Return on Investment (ROI) Formula &amp; Math
          </h2>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mt-4 whitespace-pre-line text-slate-700 dark:text-slate-300 font-mono text-sm">
            {content.formulaExplanation}
          </div>
        </section>

        {/* Related Calculators */}
        <section className="not-prose">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Related Investment Calculators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.relatedCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}-calculator`}
                className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <div className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {calc.name} →
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {calc.description}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <FAQ faqs={content.faqs} />
        </section>

        {/* Footer info */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/cagr-calculator" className="text-emerald-600 hover:underline">
              ← CAGR Calculator
            </Link>
            <Link href="/sip-calculator" className="text-emerald-600 hover:underline">
              SIP Calculator →
            </Link>
          </div>
          <LastUpdated date="2026-10-07" />
        </div>
      </article>
    </div>
  );
}
