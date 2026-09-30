import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { salaryCalculatorContent } from '@/data/calculator-content/salary';
import SalaryCalculator from '@/components/calculators/SalaryCalculator';

export const metadata: Metadata = {
  title: salaryCalculatorContent.pageTitle,
  description: salaryCalculatorContent.metaDescription,
};

export default function SalaryCalculatorPage() {
  const { h1, introText, howToUse, formulaExplanation, solvedExamples, tips, commonMistakes, faqs } = salaryCalculatorContent;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{h1}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{introText}</p>
      </div>

      <div className="mb-12">
        <Suspense fallback={<div className="h-[600px] flex items-center justify-center bg-gray-50 rounded-xl border animate-pulse">Loading calculator...</div>}>
          <SalaryCalculator />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the Salary Calculator</h2>
          <div className="space-y-6">
            {howToUse.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">CTC vs In-Hand Formula</h2>
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <div className="prose prose-emerald max-w-none text-sm text-gray-700 whitespace-pre-line">
              {formulaExplanation}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Solved Salary Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solvedExamples.map((example, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-3">{example.title}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{example.calculation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips for Maximizing Take-Home</h2>
          <ul className="space-y-4">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-gray-600 text-sm bg-white p-4 rounded-lg border border-gray-50 shadow-sm">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Myths & Mistakes</h2>
          <ul className="space-y-4">
            {commonMistakes.map((mistake, i) => (
              <li key={i} className="flex gap-3 text-gray-600 text-sm bg-white p-4 rounded-lg border border-gray-50 shadow-sm">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-16 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-bold text-gray-800 mb-2 flex items-start gap-2">
                <span className="text-blue-500">Q.</span> {faq.question}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed pl-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
