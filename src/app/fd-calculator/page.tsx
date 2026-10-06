import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { FDCalculator } from '@/components/calculators/FDCalculator';
import { fdContent } from '@/data/calculator-content/fd';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: fdContent.en.pageTitle,
  description: fdContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/fd-calculator',
  },
  openGraph: {
    title: fdContent.en.pageTitle,
    description: fdContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/fd-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: fdContent.en.pageTitle,
    description: fdContent.en.metaDescription,
  }
};

export default function FDCalculatorPage() {
  const content = fdContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Investment Calculators', href: '/#investment' },
    { label: 'FD Calculator' }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FD Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR'
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbs} className="mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 xl:col-span-9">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.h1}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {content.introText}
            </p>

            <Suspense fallback={<div className="h-[600px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" />}>
              <FDCalculator />
            </Suspense>

            <div className="mt-16 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How to Use the FD Calculator?</h2>
                <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-300">
                  {content.howToUse.map((step, idx) => (
                    <li key={idx} className="pl-2">{step}</li>
                  ))}
                </ol>
              </section>

              <AdSlot id="fd-mid-content-1" format="horizontal" />

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Formula for Fixed Deposit</h2>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{content.formulaExplanation}</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Solved Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.solvedExamples.map((example, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">{example.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <p><span className="font-medium">Inputs:</span> {example.inputs}</p>
                        <p><span className="font-medium">Calculation:</span> {example.calculation}</p>
                        <p className="font-semibold text-blue-700 dark:text-blue-400 pt-2 border-t border-gray-100 dark:border-gray-700">{example.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Tips for FD Investors</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300">
                  {content.tips.map((tip, idx) => (
                    <li key={idx} className="pl-2">{tip}</li>
                  ))}
                </ul>
              </section>

              <AdSlot id="fd-mid-content-2" format="rectangle" />

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common Mistakes to Avoid</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300">
                  {content.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="pl-2">{mistake}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                <FAQ faqs={content.faqs} />
              </section>
            </div>
          </div>

          <div className="lg:col-span-4 xl:col-span-3 space-y-8">
            <AdSlot id="fd-sidebar-1" format="vertical" />
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Related Calculators</h3>
              <div className="space-y-4">
                {content.relatedCalculators.map((calc, idx) => (
                  <Link key={idx} href={calc.slug} className="block group">
                    <h4 className="font-medium text-blue-600 dark:text-blue-400 group-hover:underline">{calc.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{calc.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <AdSlot id="fd-sidebar-2" format="vertical" />
          </div>
        </div>
        
        <LastUpdated date={new Date().toISOString()} />
      </div>
    </>
  );
}
