import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CurrencyConverter from '@/components/calculators/CurrencyConverter';
import { currencyContent } from '@/data/calculator-content/currency';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

const pageTitle = 'XE Currency Converter - Live Dollar to Rupee | CalcMaster';
const metaDescription =
  'Free XE currency converter alternative: check live dollar rate (USD to INR), AED to INR, Euro & Pound rates with real-time interbank forex exchange rates.';

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/xe-currency-converter',
  },
  openGraph: {
    title: pageTitle,
    description: metaDescription,
    url: 'https://www.calcmaster.co.in/xe-currency-converter',
    siteName: 'CalcMaster India',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function XeCurrencyConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: pageTitle,
    description: metaDescription,
    url: 'https://www.calcmaster.co.in/xe-currency-converter',
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
    { label: 'XE Currency Converter', href: '/xe-currency-converter' },
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
          XE Currency Converter – Live Dollar to Rupee &amp; Forex Rates
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Looking for a fast, free XE currency converter alternative? Convert 20+ currencies including USD to INR, AED to INR, Euro, and GBP with real-time wholesale interbank exchange rates.
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl h-96 w-full" />}>
        <CurrencyConverter initialFrom="USD" initialTo="INR" initialAmount={1} />
      </Suspense>

      <div className="my-12">
        <AdSlot id="xe-currency-slot-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why Use CalcMaster as Your XE Currency Converter Alternative?</h2>
          <p className="text-slate-700 dark:text-slate-300">
            Just like XE Currency Converter, CalcMaster tracks the <strong>mid-market interbank rate</strong>—the exact point midway between the buying and selling rates in global currency markets. While retail banks and physical exchange counters charge hefty 2% to 7% margins, our currency converter gives you the pure wholesale rate for 100% transparency.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">⚡ Real-Time Live Feed</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Live updates direct from central banks and global forex trading desks. Real-time rates refresh continuously during international market hours.
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">🔒 100% Free &amp; Ad-Clean</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              No sign-ups, no invasive popups, and no premium paywalls. Instant calculations with 1-click swap (⇄), denomination charts, and PDF/Excel export.
            </p>
          </div>
        </section>

        <section>
          <FAQ faqs={currencyContent.en.faqs} />
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
