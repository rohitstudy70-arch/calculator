import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CurrencyConverter from '@/components/calculators/CurrencyConverter';
import { currencyContent } from '@/data/calculator-content/currency';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

const pageTitle = 'Dollar to Rupee - Today Dollar Rate & USD to INR | CalcMaster';
const metaDescription =
  'Convert US dollar to rupees with today dollar rate (USD to INR). Live exchange rate, historical conversions, and instant interbank forex calculator.';

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/dollar-to-rupee',
  },
  openGraph: {
    title: pageTitle,
    description: metaDescription,
    url: 'https://www.calcmaster.co.in/dollar-to-rupee',
    siteName: 'CalcMaster India',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function DollarToRupeePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: pageTitle,
    description: metaDescription,
    url: 'https://www.calcmaster.co.in/dollar-to-rupee',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Currency Converter', href: '/currency-converter' },
    { label: 'Dollar to Rupee (USD to INR)', href: '/dollar-to-rupee' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={breadcrumbs} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Dollar to Rupee Converter – Today Dollar Rate & USD to INR
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Check today&apos;s dollar rate, convert US dollar to Indian rupees (USD to INR), and track real-time interbank forex rates with 100% accuracy.
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl h-96 w-full" />}>
        <CurrencyConverter initialFrom="USD" initialTo="INR" initialAmount={1} />
      </Suspense>

      <div className="my-12">
        <AdSlot id="dollar-rupee-slot-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why Track Today&apos;s Dollar Rate (USD to INR)?</h2>
          <p className="text-slate-700 dark:text-slate-300">
            The US Dollar (USD) to Indian Rupee (INR) pair is one of the world&apos;s most active currency trading corridors. Whether you are an NRI sending remittances home, an IT freelancer receiving payments via PayPal or wire transfer, or a student planning overseas tuition fees, tracking the live dollar rate ensures you maximize your rupee conversion.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Key US Dollar (USD) Facts</h3>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300">
              <li><strong>Currency Code:</strong> USD ($)</li>
              <li><strong>Central Bank:</strong> US Federal Reserve (Fed)</li>
              <li><strong>Market Share:</strong> ~88% of all global forex trades</li>
              <li><strong>Forex Timings:</strong> 24 hours (Monday to Friday)</li>
            </ul>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Indian Rupee (INR) Details</h3>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300">
              <li><strong>Currency Code:</strong> INR (₹)</li>
              <li><strong>Central Bank:</strong> Reserve Bank of India (RBI)</li>
              <li><strong>Sub-unit:</strong> 1 Rupee = 100 Paise</li>
              <li><strong>RBI Reference Rate:</strong> Released daily around 1:30 PM IST</li>
            </ul>
          </div>
        </section>

        <section>
          <FAQ faqs={currencyContent.en.faqs.slice(0, 5)} />
        </section>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <Link href="/currency-converter" className="text-blue-600 hover:underline font-medium text-sm">
            ← Explore all 20+ currencies
          </Link>
          <LastUpdated date="2026-10-06" />
        </div>
      </article>
    </div>
  );
}
