import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { gstCalculatorContent } from '@/data/calculator-content/gst';
import GSTCalculator from '@/components/calculators/GSTCalculator';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: gstCalculatorContent.pageTitle,
  },
  description: gstCalculatorContent.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/gst-calculator',
  },
  openGraph: {
    title: gstCalculatorContent.pageTitle,
    description: gstCalculatorContent.metaDescription,
    url: 'https://www.calcmaster.co.in/gst-calculator',
    siteName: 'CalcMaster India',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: gstCalculatorContent.pageTitle,
    description: gstCalculatorContent.metaDescription,
  },
};

export default function GSTCalculatorPage() {
  const content = gstCalculatorContent;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Tax Calculators', href: '/tax-calculators' },
    { label: 'GST Calculator', href: '/gst-calculator' },
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
    url: 'https://www.calcmaster.co.in/gst-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {content.h1}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {content.introText}
        </p>
      </div>

      <div className="mb-12">
        <Suspense fallback={<div className="h-96 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 animate-pulse">Loading calculator...</div>}>
          <GSTCalculator />
        </Suspense>
      </div>

      <div className="my-12">
        <AdSlot id="gst-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <section className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Use the GST Calculator</h2>
          <div className="space-y-5">
            {content.howToUse.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 dark:bg-blue-950/40 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">GST Calculation Formula</h2>
          <div className="prose prose-blue dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
            {content.formulaExplanation}
          </div>
        </section>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Solved Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.solvedExamples.map((example, i) => (
            <div key={i} className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">{example.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded-lg whitespace-pre-line">
                {example.calculation}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <section className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/50">
          <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-4 flex items-center gap-2">
            <span>💡</span> Pro GST Invoicing Tips
          </h2>
          <ul className="space-y-2.5 text-sm text-emerald-800 dark:text-emerald-200/90">
            {content.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-rose-50 dark:bg-rose-950/30 p-6 rounded-2xl border border-rose-200 dark:border-rose-800/50">
          <h2 className="text-xl font-bold text-rose-900 dark:text-rose-300 mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Mistakes to Avoid
          </h2>
          <ul className="space-y-2.5 text-sm text-rose-800 dark:text-rose-200/90">
            {content.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="my-12">
        <AdSlot id="gst-leaderboard-2" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <section className="mt-12 not-prose">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <FAQ items={content.faqs} />
      </section>

      {content.relatedCalculators && (
        <section className="mt-12 not-prose">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Tax & Finance Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.relatedCalculators.map((calc, i) => (
              <Link
                key={i}
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

      <div className="pt-8 mt-12 border-t border-slate-200 dark:border-slate-800">
        <LastUpdated date="2026-10-12" />
      </div>
    </div>
  );
}
