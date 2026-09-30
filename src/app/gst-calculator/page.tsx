import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { gstCalculatorContent } from '@/data/calculator-content/gst';
import GSTCalculator from '@/components/calculators/GSTCalculator';

export const metadata: Metadata = {
  title: gstCalculatorContent.pageTitle,
  description: gstCalculatorContent.metaDescription,
};

export default function GSTCalculatorPage() {
  const { h1, introText, howToUse, formulaExplanation, solvedExamples, tips, commonMistakes, faqs } = gstCalculatorContent;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{h1}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{introText}</p>
      </div>

      <div className="mb-12">
        <Suspense fallback={<div className="h-96 flex items-center justify-center bg-gray-50 rounded-xl border animate-pulse">Loading calculator...</div>}>
          <GSTCalculator />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the GST Calculator</h2>
          <div className="space-y-6">
            {howToUse.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">GST Calculation Formula</h2>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="prose prose-blue max-w-none text-sm text-gray-700 whitespace-pre-line">
              {formulaExplanation}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Solved Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solvedExamples.map((example, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">{example.title}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">{example.calculation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips</h2>
          <ul className="space-y-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid</h2>
          <ul className="space-y-3">
            {commonMistakes.map((mistake, i) => (
              <li key={i} className="flex gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-16 bg-gray-50 p-8 rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-bold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
