import React, { Suspense } from 'react';
import { Metadata } from 'next';
import BMICalculator from '@/components/calculators/BMICalculator';
import { bmiContent } from '@/data/calculator-content/bmi';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: 'BMI Calculator for Female & Male in kg, cm & Feet',
  },
  description: 'Calculate BMI for female and male using weight in kg and height in cm or feet. Use our free BMI calculator to check your body mass index easily.',
  alternates: {
    canonical: 'https://www.calcmaster.co.in/bmi-calculator',
  },
  openGraph: {
    title: 'BMI Calculator for Female & Male in kg, cm & Feet',
    description: 'Calculate BMI for female and male using weight in kg and height in cm or feet. Use our free BMI calculator to check your body mass index easily.',
    url: 'https://www.calcmaster.co.in/bmi-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator for Female & Male in kg, cm & Feet',
    description: 'Calculate BMI for female and male using weight in kg and height in cm or feet. Use our free BMI calculator to check your body mass index easily.',
  },
};
export default function BMICalculatorPage() {
  const content = bmiContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Health Calculators', href: '/health-calculators' },
    { label: 'BMI Calculator', href: '/bmi-calculator' },
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
    url: 'https://www.calcmaster.co.in/bmi-calculator',
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

      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {content.h1}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {content.introText}
        </p>
      </div>

      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-sm not-prose">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Official Indian Guidelines: ICMR & WHO Benchmarks
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              How BMI is Calculated for Indian Adults
            </h2>
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-blue-300 dark:border-blue-700 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
            Formula: <code className="font-mono text-blue-600 dark:text-blue-400">BMI = Weight (kg) ÷ [Height (m)]²</code>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          <strong>Example:</strong> For a person weighing <strong>70 kg</strong> with a height of <strong>170 cm (1.70 m)</strong>: <code className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-mono text-xs">70 ÷ (1.70)² = 24.22 kg/m²</code>. While classified as &quot;Normal&quot; on the international WHO scale (&lt;25), it is classified as <strong>Overweight</strong> under Indian ICMR consensus guidelines (&ge;23.0).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 block font-medium">Underweight</span>
            <strong className="text-slate-800 dark:text-slate-200 text-sm">&lt; 18.5</strong>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-300 dark:border-emerald-700">
            <span className="text-emerald-700 dark:text-emerald-300 block font-semibold">Normal (ICMR Ideal)</span>
            <strong className="text-emerald-800 dark:text-emerald-200 text-sm">18.5 – 22.9</strong>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/50 rounded-xl border border-amber-300 dark:border-amber-700">
            <span className="text-amber-700 dark:text-amber-300 block font-semibold">Overweight (Indian)</span>
            <strong className="text-amber-800 dark:text-amber-200 text-sm">23.0 – 24.9</strong>
          </div>
          <div className="p-3 bg-rose-50 dark:bg-rose-950/50 rounded-xl border border-rose-300 dark:border-rose-700">
            <span className="text-rose-700 dark:text-rose-300 block font-semibold">Obese (Class I+)</span>
            <strong className="text-rose-800 dark:text-rose-200 text-sm">&ge; 25.0</strong>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />}>
        <BMICalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="bmi-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How to Use the BMI Calculator</h2>
          <ol className="list-decimal pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300">
            {content.howToUse.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">BMI Formulas & Cutoff Boundaries Explained</h2>
          <p className="mt-4 whitespace-pre-line text-gray-700 dark:text-gray-300">{content.formulaExplanation}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            {content.solvedExamples?.map((example, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{example.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{example.inputs}</p>
                <p className="text-xs font-mono bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2 rounded mb-2 overflow-x-auto whitespace-pre-line">
                  {example.calculation}
                </p>
                <p className="font-semibold text-sm text-blue-700 dark:text-blue-400">{example.result}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-4">Healthy Living Guidelines</h2>
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
            <h2 className="text-xl font-bold text-rose-900 dark:text-rose-300 mb-4">Common Misinterpretations</h2>
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

        <section className="not-prose mt-12 bg-blue-50 dark:bg-blue-950/40 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related In-Depth Health Guide</h2>
          <Link href="/blog/bmi-chart-for-indians-icmr-guidelines" className="block group">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-blue-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                Health & Wellness
              </span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 my-1">
                BMI Chart for Indians: Official ICMR Guidelines & Ideal Weight Explained
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn why Indian body types require lower BMI cutoffs (23 kg/m² for overweight vs WHO 25), understand the thin-fat phenotype, visceral fat risks, and ICMR healthy weight charts.
              </p>
            </div>
          </Link>
        </section>

        <section className="not-prose mt-12 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Clinical References</h2>
          <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
            <li>1. ICMR / Consensus Group: <em>Consensus Statement for Diagnosis of Obesity and Metabolic Syndrome for Asian Indians</em> (JAPI 2009; 57: 163–170).</li>
            <li>2. World Health Organization (WHO): <em>Appropriate body-mass index for Asian populations and its implications for policy and intervention strategies</em> (Lancet 2004; 363: 157–163).</li>
            <li>3. National Institute of Nutrition (NIN), Hyderabad: <em>Dietary Guidelines for Indians (ICMR-NIN)</em>.</li>
          </ul>
        </section>

        <section className="not-prose mt-12 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Health Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {content.relatedCalculators?.map((calc, idx) => (
              <Link key={idx} href={calc.slug.startsWith('/') ? calc.slug : `/${calc.slug}`} className="block group">
                <div className="h-full bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-sm">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
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
