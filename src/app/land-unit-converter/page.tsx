import React, { Suspense } from 'react';
import { Metadata } from 'next';
import LandConverterCalculator from '@/components/calculators/LandConverterCalculator';
import { landConverterContent } from '@/data/calculator-content/land-converter';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';

const content = landConverterContent.en;

export const metadata: Metadata = {
  title: content.pageTitle,
  description: content.metaDescription,
  alternates: {
    canonical: 'https://calculator-kappa-one-10.vercel.app/land-unit-converter',
    languages: {
      'hi-IN': 'https://calculator-kappa-one-10.vercel.app/hi/land-unit-converter',
    },
  },
  openGraph: {
    title: content.pageTitle,
    description: content.metaDescription,
    url: 'https://calculator-kappa-one-10.vercel.app/land-unit-converter',
    siteName: 'CalcMaster',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function LandConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": content.pageTitle,
    "description": content.metaDescription,
    "url": "https://calculator-kappa-one-10.vercel.app/land-unit-converter",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Utility Calculators', href: '/category/utility' },
          { label: 'Land Unit Converter', href: '/land-unit-converter' },
        ]} 
      />

      <h1 className="text-3xl font-bold mb-4">{content.h1}</h1>
      <p className="text-gray-600 mb-8">{content.introText}</p>

      <AdSlot id="land-converter-top" height={90} className="rounded-xl overflow-hidden" />

      <Suspense fallback={<div>Loading calculator...</div>}>
        <LandConverterCalculator />
      </Suspense>

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Use the Land Unit Converter</h2>
          <ul className="list-disc pl-6 space-y-2">
            {content.howToUse.map((step, idx) => (
              <li key={idx} className="text-gray-700">{step}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Land Measurements</h2>
          <p className="text-gray-700">{content.formulaExplanation}</p>
        </section>

        <AdSlot id="land-converter-middle" height={90} className="rounded-xl overflow-hidden" />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Examples</h2>
          <div className="space-y-4">
            {content.solvedExamples.map((ex, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg mb-2">{ex.title}</h3>
                <p className="text-gray-600 mb-2">{ex.description}</p>
                <div className="bg-gray-50 p-3 rounded text-sm mb-2 font-mono">
                  {ex.steps.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </div>
                <p className="font-medium text-green-700">Result: {ex.result}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Tips</h2>
            <ul className="list-disc pl-6 space-y-2">
              {content.tips.map((tip, idx) => (
                <li key={idx} className="text-gray-700">{tip}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Common Mistakes</h2>
            <ul className="list-disc pl-6 space-y-2">
              {content.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="text-red-600">{mistake}</li>
              ))}
            </ul>
          </div>
        </section>

        <FAQ faqs={content.faqs} />
        
        <LastUpdated date="2026-10-02" />
      </div>
    </div>
  );
}
