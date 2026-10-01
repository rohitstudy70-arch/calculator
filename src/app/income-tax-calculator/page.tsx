import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { incomeTaxContent } from '@/data/calculator-content/income-tax';
import IncomeTaxCalculator from '@/components/calculators/IncomeTaxCalculator';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { LastUpdated } from '@/components/ui/LastUpdated';
import { AdSlot } from '@/components/ui/AdSlot';

export const metadata: Metadata = {
  title: incomeTaxContent.pageTitle,
  description: incomeTaxContent.metaDescription,
  alternates: {
    canonical: 'https://calculator-kappa-one-10.vercel.app/income-tax-calculator',
  },
};

export default function IncomeTaxCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: incomeTaxContent.h1,
    description: incomeTaxContent.metaDescription,
    url: 'https://calculator-kappa-one-10.vercel.app/income-tax-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: incomeTaxContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Calculators', href: '/calculators' },
              { label: 'Income Tax Calculator', href: '/income-tax-calculator' },
            ]}
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
            {incomeTaxContent.h1}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {incomeTaxContent.introText}
          </p>
        </div>

        <Suspense fallback={<div className="h-[600px] flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-200">Loading calculator...</div>}>
          <IncomeTaxCalculator />
        </Suspense>

        <AdSlot id="income-tax-middle" className="my-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Use the Calculator</h2>
              <ul className="space-y-4">
                {incomeTaxContent.howToUse.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-slate-600 mt-1">{step}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Formula & Slabs Explained</h2>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 whitespace-pre-wrap text-slate-600">
                {incomeTaxContent.formulaExplanation}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Examples</h2>
              <div className="grid gap-6">
                {incomeTaxContent.solvedExamples.map((example, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{example.title}</h3>
                    <p className="text-slate-600 whitespace-pre-wrap">{example.calculation}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {incomeTaxContent.faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <AdSlot id="income-tax-sidebar-1" height={250} />

            <section className="bg-slate-900 rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-6">Smart Tax Tips</h2>
              <ul className="space-y-4">
                {incomeTaxContent.tips.map((tip, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-slate-300 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-rose-50 rounded-2xl p-8 border border-rose-100">
              <h2 className="text-xl font-bold text-rose-900 mb-6">Common Mistakes</h2>
              <ul className="space-y-4">
                {incomeTaxContent.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-rose-500">×</span>
                    <span className="text-rose-800 text-sm">{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Related Calculators</h3>
              <div className="space-y-4">
                {incomeTaxContent.relatedCalculators.map((calc, index) => (
                  <a
                    key={index}
                    href={calc.url}
                    className="block p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors"
                  >
                    <h4 className="font-semibold text-indigo-600 mb-1">{calc.name}</h4>
                    <p className="text-sm text-slate-600">{calc.description}</p>
                  </a>
                ))}
              </div>
            </section>
            
            <AdSlot id="income-tax-top" className="my-12" />
          </div>
        </div>

        <div className="mt-12 text-center">
          <LastUpdated date="March 2025" />
        </div>
      </main>
    </div>
  );
}
