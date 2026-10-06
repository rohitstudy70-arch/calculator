import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CurrencyConverter from '@/components/calculators/CurrencyConverter';
import { currencyContent } from '@/data/calculator-content/currency';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

const content = currencyContent.en;

export const metadata: Metadata = {
  title: {
    absolute: content.pageTitle,
  },
  description: content.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/currency-converter',
    languages: {
      'hi-IN': 'https://www.calcmaster.co.in/hi/currency-converter',
    },
  },
  openGraph: {
    title: content.pageTitle,
    description: content.metaDescription,
    url: 'https://www.calcmaster.co.in/currency-converter',
    siteName: 'CalcMaster India',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function CurrencyConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.pageTitle,
    description: content.metaDescription,
    url: 'https://www.calcmaster.co.in/currency-converter',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Utility Calculators', href: '/category/utility' },
    { label: 'Currency Converter', href: '/currency-converter' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
        <CurrencyConverter />
      </Suspense>

      <div className="my-12">
        <AdSlot id="currency-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How to Use the Currency Converter</h2>
          <ol className="list-decimal pl-6 space-y-2 mt-4 text-slate-700 dark:text-slate-300">
            {content.howToUse.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Forex Rates & Exchange Formula Explained</h2>
          <p className="mt-4 whitespace-pre-line text-slate-700 dark:text-slate-300">{content.formulaExplanation}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            {content.solvedExamples?.map((example, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">{example.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{example.inputs}</p>
                <p className="text-xs font-mono bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-2.5 rounded-lg mb-2 overflow-x-auto whitespace-pre-line border border-slate-100 dark:border-slate-800">
                  {example.calculation}
                </p>
                <div className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {example.result}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/50">
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <span>💡</span> Smart Forex & Remittance Tips
            </h3>
            <ul className="space-y-2.5 text-sm text-emerald-800 dark:text-emerald-200/90">
              {content.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-200 dark:border-amber-800/50">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common Currency Exchange Mistakes
            </h3>
            <ul className="space-y-2.5 text-sm text-amber-800 dark:text-amber-200/90">
              {content.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="my-12">
          <AdSlot id="currency-leaderboard-2" height={90} className="rounded-xl overflow-hidden" />
        </div>

        <section>
          <FAQ faqs={content.faqs} />
        </section>

        {content.relatedCalculators && content.relatedCalculators.length > 0 && (
          <section className="not-prose mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Tools & Calculators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {content.relatedCalculators.map((calc, idx) => (
                <Link
                  key={idx}
                  href={`/${calc.slug}`}
                  className="p-5 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all shadow-sm hover:shadow-md block"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{calc.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{calc.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <LastUpdated date="2026-10-06" />
        </div>
      </article>
    </div>
  );
}
