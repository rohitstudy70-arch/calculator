import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CurrencyConverter from '@/components/calculators/CurrencyConverter';
import { currencyContent } from '@/data/calculator-content/currency';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

const pageTitle = 'AED to INR - Dirham to Rupee Today Exchange Rate | CalcMaster';
const metaDescription =
  'Convert UAE Dirham to Indian Rupees (AED to INR). Check live AED to Rs exchange rate, Dirham in Indian rupees today, and 100% free forex calculator.';

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/aed-to-inr',
  },
  openGraph: {
    title: pageTitle,
    description: metaDescription,
    url: 'https://www.calcmaster.co.in/aed-to-inr',
    siteName: 'CalcMaster India',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function AedToInrPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: pageTitle,
    description: metaDescription,
    url: 'https://www.calcmaster.co.in/aed-to-inr',
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
    { label: 'AED to INR (Dirham to Rupee)', href: '/aed-to-inr' },
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
          AED to INR – Convert UAE Dirham to Indian Rupees
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Check live UAE Dirham to Indian Rupee (AED to INR) exchange rate, calculate remittances from Dubai &amp; Abu Dhabi to India, and view denomination charts.
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl h-96 w-full" />}>
        <CurrencyConverter initialFrom="AED" initialTo="INR" initialAmount={100} />
      </Suspense>

      <div className="my-12">
        <AdSlot id="aed-inr-slot-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why Track AED to INR Rates for NRI Remittances?</h2>
          <p className="text-slate-700 dark:text-slate-300">
            Over 3.5 million Indian expatriates reside in the United Arab Emirates (Dubai, Abu Dhabi, Sharjah), making the AED to INR remittance corridor one of the largest in the world. Since the UAE Dirham is strictly pegged to the US Dollar at 1 USD = 3.6725 AED, any fluctuation in the USD/INR exchange rate directly impacts your AED remittance earnings in India.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">UAE Dirham (AED) Facts</h3>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300">
              <li><strong>Currency Code:</strong> AED (د.إ)</li>
              <li><strong>Pegged To:</strong> US Dollar at 3.6725 AED/USD</li>
              <li><strong>Central Bank:</strong> Central Bank of the UAE (CBUAE)</li>
              <li><strong>Sub-unit:</strong> 1 Dirham = 100 Fils</li>
            </ul>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Tips for Remitting from UAE to India</h3>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300">
              <li>Compare exchange houses (Al Ansari, LuLu Exchange) vs bank wire rates.</li>
              <li>Look for zero-fee transfer offers during peak festival seasons.</li>
              <li>Check the wholesale mid-market rate on CalcMaster before initiating transfers.</li>
            </ul>
          </div>
        </section>

        <section className="not-prose">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Popular UAE Dirham to Indian Rupee (AED to INR) Conversions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Quick reference conversion chart for popular NRI salary, property, and remittance amounts from Dubai &amp; UAE to India (at ~₹22.75 per 1 AED mid-market conversion rate):
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold">
                <tr>
                  <th className="px-4 py-3">UAE Dirham (AED)</th>
                  <th className="px-4 py-3">Indian Rupees (INR)</th>
                  <th className="px-4 py-3">Common Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="px-4 py-2.5 font-medium">1 AED to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">₹22.75</td>
                  <td className="px-4 py-2.5">Base UAE Dirham to Rupee rate</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">1,000 AED to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">₹22,750</td>
                  <td className="px-4 py-2.5">Monthly family remittance</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">18,000 AED to INR (18 000 AED)</td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">₹4,09,500 (~₹4.10 Lakh)</td>
                  <td className="px-4 py-2.5">Mid-senior Dubai monthly salary package</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">1,00,000 AED to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">₹22,75,000 (~₹22.75 Lakh)</td>
                  <td className="px-4 py-2.5">Annual NRI savings transfer</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">160,000 AED to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">₹36,40,000 (~₹36.40 Lakh)</td>
                  <td className="px-4 py-2.5"> Annual executive package / NRE deposit</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">180,000 AED to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">₹40,95,000 (~₹40.95 Lakh)</td>
                  <td className="px-4 py-2.5">Senior IT/Engineering annual CTC in UAE</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">1 Million Dirham in Indian Rupees</td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">₹2,27,50,000 (~₹2.28 Crore)</td>
                  <td className="px-4 py-2.5">Dubai Golden Visa / Real estate benchmark</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">3.5 Million Dirham in Indian Rupees</td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">₹7,96,25,000 (~₹7.96 Crore)</td>
                  <td className="px-4 py-2.5">Luxury villa / high-value remittance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <FAQ
            faqs={[
              {
                question: 'What is the UAE Dirham to Rupee (AED in to INR) conversion rate today?',
                answer:
                  '1 UAE Dirham (AED) is approximately ₹22.70 to ₹22.85 Indian Rupees (INR) on the live interbank forex market. Enter any Dirham amount in the converter above to calculate the exact UAE Dirham to Rupee value instantly.',
              },
              {
                question: 'How much is 18,000 AED, 160,000 AED, and 180,000 AED in Indian Rupees?',
                answer:
                  'At an exchange rate of ₹22.75 per AED: 18,000 AED (18 000 AED to INR) equals ₹4,09,500 (~₹4.10 Lakh); 160,000 AED to INR equals ₹36,40,000 (~₹36.40 Lakh); and 180,000 AED to INR equals ₹40,95,000 (~₹40.95 Lakh).',
              },
              {
                question: 'How much is 3.5 million Dirham in Indian Rupees?',
                answer:
                  '3.5 million UAE Dirham (3,500,000 AED) in Indian Rupees is approximately ₹7,96,25,000 (₹7.96 Crore / 79.62 Million INR) at the ₹22.75 AED/INR exchange rate.',
              },
              {
                question: 'Is it UAE Dinar to Rupees or UAE Dirham to Rupees?',
                answer:
                  'The official currency of the United Arab Emirates (Dubai, Abu Dhabi, Sharjah) is the UAE Dirham (AED), not the Dinar. Many travelers search for "UAE Dinar to Rupees" when checking the Dubai currency rate (1 AED ≈ ₹22.75). By contrast, Dinars are used in neighboring Gulf nations like Kuwait (1 KWD ≈ ₹272 INR) and Bahrain (1 BHD ≈ ₹221 INR).',
              },
              ...currencyContent.en.faqs.filter(
                (f) => f.question.includes('AED') || f.question.includes('dollar') || f.question.includes('XE')
              ),
            ]}
          />
        </section>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <Link href="/currency-converter" className="text-blue-600 hover:underline font-medium text-sm">
            ← Explore all 20+ currencies
          </Link>
          <LastUpdated date="2026-10-12" />
        </div>
      </article>
    </div>
  );
}
