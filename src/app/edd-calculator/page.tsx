import React, { Suspense } from 'react';
import { Metadata } from 'next';
import EDDCalculator from '@/components/calculators/EDDCalculator';
import { eddContent } from '@/data/calculator-content/edd';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: eddContent.en.pageTitle,
  description: eddContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/edd-calculator',
  },
  openGraph: {
    title: eddContent.en.pageTitle,
    description: eddContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/edd-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: eddContent.en.pageTitle,
    description: eddContent.en.metaDescription,
  },
};

export default function EDDCalculatorPage() {
  const content = eddContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Health Calculators', href: '/health-calculators' },
    { label: 'EDD Calculator & Tracker' },
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
    name: 'EDD Calculator & Pregnancy Tracker',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

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
        <EDDCalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="edd-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How to Use the EDD Calculator</h2>
          <ol className="list-decimal pl-6 space-y-2 mt-4 text-slate-700 dark:text-slate-300">
            {content.howToUse.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Estimated Due Date Formulas & Rules Explained</h2>
          <p className="mt-4 whitespace-pre-line text-slate-700 dark:text-slate-300">{content.formulaExplanation}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            {content.solvedExamples?.map((example, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">{example.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{example.inputs}</p>
                <p className="text-xs font-mono bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-2.5 rounded-lg mb-2 overflow-x-auto whitespace-pre-line border border-slate-100 dark:border-slate-800">
                  {example.calculation}
                </p>
                <p className="font-semibold text-sm text-blue-600 dark:text-blue-400">{example.result}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-4">Clinical Best Practices & Advice</h2>
            <ul className="space-y-2.5 text-sm text-emerald-800 dark:text-emerald-200">
              {content.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/40 p-6 rounded-2xl border border-rose-200 dark:border-rose-800">
            <h2 className="text-lg font-bold text-rose-900 dark:text-rose-300 mb-4">Common Misconceptions to Avoid</h2>
            <ul className="space-y-2.5 text-sm text-rose-800 dark:text-rose-200">
              {content.commonMistakes?.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold shrink-0">✗</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions (FAQs)</h2>
          <FAQ items={content.faqs} />
        </section>

        <section className="not-prose mt-12 bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Related Health & Math Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {content.relatedCalculators?.map((calc, idx) => (
              <Link key={idx} href={`/${calc.slug}`} className="block group">
                <div className="h-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-sm">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{calc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <LastUpdated date="2026-10-06" />
    </div>
  );
}
