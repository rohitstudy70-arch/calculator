import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PregnancyCalculator from '@/components/calculators/PregnancyCalculator';
import { pregnancyContent } from '@/data/calculator-content/pregnancy';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: pregnancyContent.en.pageTitle,
  description: pregnancyContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/pregnancy-due-date-calculator',
  },
  openGraph: {
    title: pregnancyContent.en.pageTitle,
    description: pregnancyContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/pregnancy-due-date-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pregnancyContent.en.pageTitle,
    description: pregnancyContent.en.metaDescription,
  },
};

export default function PregnancyCalculatorPage() {
  const content = pregnancyContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Health Calculators', href: '/health-calculators' },
    { label: 'Pregnancy Due Date Calculator' },
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
    name: 'Pregnancy Due Date & Trimester Calculator',
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {content.h1}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {content.introText}
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />}>
        <PregnancyCalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="pregnancy-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How to Use the Pregnancy Due Date Calculator</h2>
          <ol className="list-decimal pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300">
            {content.howToUse.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Clinical Dating Formulas & Naegele’s Rule Explained</h2>
          <p className="mt-4 whitespace-pre-line text-gray-700 dark:text-gray-300">{content.formulaExplanation}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            {content.solvedExamples?.map((example, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{example.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{example.inputs}</p>
                <p className="text-xs font-mono bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2 rounded mb-2 overflow-x-auto whitespace-pre-line">
                  {example.calculation}
                </p>
                <p className="font-semibold text-sm text-rose-600 dark:text-rose-400">{example.result}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-4">Prenatal Care Guidelines</h2>
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
            <h2 className="text-xl font-bold text-rose-900 dark:text-rose-300 mb-4">Common Misconceptions</h2>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <FAQ items={content.faqs} />
        </section>

        <section className="not-prose mt-12 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Obstetric & Clinical References</h2>
          <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
            <li>1. American College of Obstetricians and Gynecologists (ACOG): <em>Committee Opinion No. 700: Methods for Estimating the Due Date</em> (Obstet Gynecol 2017; 129:e150–4).</li>
            <li>2. Federation of Obstetric and Gynaecological Societies of India (FOGSI): <em>Good Clinical Practice Recommendations for Antenatal Care</em>.</li>
            <li>3. World Health Organization (WHO): <em>WHO Recommendations on Antenatal Care for a Positive Pregnancy Experience</em> (Geneva, 2016).</li>
          </ul>
        </section>

        <section className="not-prose mt-12 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Health Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {content.relatedCalculators?.map((calc, idx) => (
              <Link key={idx} href={`/${calc.slug}`} className="block group">
                <div className="h-full bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-rose-500 dark:hover:border-rose-400 transition-colors shadow-sm">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 mb-1">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{calc.description}</p>
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
