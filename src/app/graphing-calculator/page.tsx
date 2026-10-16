import React, { Suspense } from 'react';
import { Metadata } from 'next';
import GraphingCalculator from '@/components/calculators/GraphingCalculator';
import { graphingContent } from '@/data/calculator-content/graphing';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: graphingContent.en.pageTitle,
  description: graphingContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/graphing-calculator',
  },
  openGraph: {
    title: graphingContent.en.pageTitle,
    description: graphingContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/graphing-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: graphingContent.en.pageTitle,
    description: graphingContent.en.metaDescription,
  },
};

export default function GraphingCalculatorPage() {
  const content = graphingContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Math Calculators', href: '/category/math' },
    { label: 'Graphing Calculator' },
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
    name: 'Online Graphing Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
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

      <Suspense
        fallback={
          <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />
        }
      >
        <GraphingCalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="graph-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use the Online Graphing Calculator
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300">
            {content.howToUse.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            2D Coordinate Math & Function Evaluation Explained
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{content.formulaExplanation}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.solvedExamples?.map((example, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{example.inputs}</p>
                <p className="text-sm font-mono bg-white dark:bg-gray-900 p-2 rounded mb-2 overflow-x-auto">
                  {example.calculation}
                </p>
                <p className="font-semibold text-indigo-700 dark:text-indigo-400">
                  {example.result}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Tips for Graphing Functions
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {content.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Common Mistakes to Avoid
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {content.commonMistakes?.map((mistake, idx) => (
                <li key={idx}>{mistake}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQ items={content.faqs} />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Related Math & Scientific Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {content.relatedCalculators?.map((calc, idx) => (
              <Link key={idx} href={calc.slug} className="block group">
                <div className="h-full bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors shadow-sm">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {calc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <LastUpdated date="2026-10-16" />
    </div>
  );
}
