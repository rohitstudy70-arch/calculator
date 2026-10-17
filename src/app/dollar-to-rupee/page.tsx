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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much is $1000 USD in Indian Rupees today?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'At the current interbank exchange rate (~₹86.85 per USD), $1,000 USD equals approximately ₹86,850 Indian Rupees. Retail bank wires and PayPal payouts may vary slightly by 1% to 2% based on transfer fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much is 100 dollar in Indian Rupees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '$100 USD in Indian Rupees is equal to approximately ₹8,685 INR based on today’s live wholesale forex exchange rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'What was 1 USD to INR in 1947, 2014, and today?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 1947 at Indian independence, the Rupee was pegged to the British Pound and effectively traded at approximately 1 USD = ₹1 INR. By 2014, the exchange rate was around ₹62.33 per USD. Today, it trades between ₹86.85 and ₹95.00 per US Dollar.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will 1 USD become 100 INR?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Forex macro analysts and institutional research forecast that long-term inflation differentials between the US Federal Reserve and the Reserve Bank of India (RBI) cause a standard 2% to 4% annual depreciation of the rupee, making 1 USD = 100 INR a realistic economic milestone in coming years.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much is $1 US in India today?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '1 US Dollar (USD) is currently worth approximately ₹86.85 to ₹94.97 Indian Rupees (INR) on the live forex and currency markets.',
        },
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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

        <section className="not-prose space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  Direct Answer: 1,000 USD in INR
                </span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  ₹86,850
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ≈ ₹86.85 Thousand (At ~₹86.85 / $1 rate)
                </p>
              </div>
              <span className="text-3xl">💵</span>
            </div>

            <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Direct Answer: 100 USD in INR
                </span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  ₹8,685
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Standard freelance &amp; small remittance benchmark
                </p>
              </div>
              <span className="text-3xl">🇮🇳</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Popular US Dollar to Indian Rupee (USD to INR) Conversions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Quick reference conversion table for popular freelance earnings, software salaries, and NRI bank remittance amounts (calculated at ~₹86.85 interbank rate):
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold">
                <tr>
                  <th className="px-4 py-3">US Dollar (USD)</th>
                  <th className="px-4 py-3">Indian Rupees (INR)</th>
                  <th className="px-4 py-3">Common Indian Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="px-4 py-2.5 font-medium">$1 USD to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">₹86.85</td>
                  <td className="px-4 py-2.5">Base US Dollar exchange rate today</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">$10 USD to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">₹868.50</td>
                  <td className="px-4 py-2.5">Monthly SaaS software subscription</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">$50 USD to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">₹4,342.50</td>
                  <td className="px-4 py-2.5">Domain, hosting or online certification</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">$100 USD to INR (100 Dollar)</td>
                  <td className="px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">₹8,685.00</td>
                  <td className="px-4 py-2.5">Standard freelance gig payout</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">$500 USD to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">₹43,425.00</td>
                  <td className="px-4 py-2.5">Monthly remote freelance retainer</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">$1,000 USD to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">₹86,850.00</td>
                  <td className="px-4 py-2.5">Monthly family remittance from USA to India</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">$5,000 USD to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">₹4,34,250 (~₹4.34 Lakh)</td>
                  <td className="px-4 py-2.5">US university semester fee installment</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium">$10,000 USD to INR</td>
                  <td className="px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">₹8,68,500 (~₹8.68 Lakh)</td>
                  <td className="px-4 py-2.5">Annual NRE / FCNR fixed deposit transfer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="not-prose">
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Historical Perspective: 1 USD to INR (1947 vs 2014 vs Today)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              A historical overview of the US Dollar to Indian Rupee journey over decades:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">1947 (Independence)</span>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">₹1.00 / USD</div>
                <p className="text-[11px] text-slate-500 mt-1">Pegged to British Pound Sterling</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">2014 Benchmark</span>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">₹62.33 / USD</div>
                <p className="text-[11px] text-slate-500 mt-1">Pre-demonetization era</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800">
                <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">2026 Today</span>
                <div className="text-xl font-extrabold text-blue-700 dark:text-blue-300 mt-1">₹86.85 – ₹95.00</div>
                <p className="text-[11px] text-blue-600/80 dark:text-blue-400 mt-1">Live wholesale interbank rate</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <FAQ
            faqs={[
              {
                question: 'How much is $1000 USD in Indian Rupees today?',
                answer:
                  'At the current interbank exchange rate (~₹86.85 per USD), $1,000 USD equals approximately ₹86,850 Indian Rupees. Retail bank wires and PayPal payouts may vary slightly by 1% to 2% based on transfer fees.',
              },
              {
                question: 'How much is 100 dollar in Indian Rupees?',
                answer:
                  '$100 USD in Indian Rupees is equal to approximately ₹8,685 INR based on today’s live wholesale forex exchange rate.',
              },
              {
                question: 'What was 1 USD to INR in 1947, 2014, and today?',
                answer:
                  'In 1947 at Indian independence, the Rupee was pegged to the British Pound and effectively traded at approximately 1 USD = ₹1 INR. By 2014, the exchange rate was around ₹62.33 per USD. Today, it trades between ₹86.85 and ₹95.00 per US Dollar.',
              },
              {
                question: 'Will 1 USD become 100 INR?',
                answer:
                  'Forex macro analysts and institutional research forecast that long-term inflation differentials between the US Federal Reserve and the Reserve Bank of India (RBI) cause a standard 2% to 4% annual depreciation of the rupee, making 1 USD = 100 INR a realistic economic milestone in coming years.',
              },
              {
                question: 'How much is $1 US in India today?',
                answer:
                  '1 US Dollar (USD) is currently worth approximately ₹86.85 to ₹94.97 Indian Rupees (INR) on the live forex and currency markets.',
              },
              ...currencyContent.en.faqs.filter((f) => f.question.includes('dollar') || f.question.includes('XE')),
            ]}
          />
        </section>

        <section className="not-prose pt-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Related Currency & Financial Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/aed-to-inr" className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 transition block group shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 mb-1">AED to INR (Dirham to Rupee)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Live Dubai exchange rate, conversion table & remittance advice.</p>
            </Link>
            <Link href="/xe-currency-converter" className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 transition block group shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 mb-1">XE Currency Converter Alternative</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Fast mid-market interbank forex rates for 20+ global currencies.</p>
            </Link>
            <Link href="/currency-converter" className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 transition block group shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 mb-1">All Currencies Forex Converter</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Convert Euro, British Pound, Canadian Dollar, Australian Dollar & more.</p>
            </Link>
          </div>
        </section>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <Link href="/currency-converter" className="text-blue-600 hover:underline font-medium text-sm">
            ← Explore all 20+ currencies
          </Link>
          <LastUpdated date="2026-10-16" />
        </div>
      </article>
    </div>
  );
}
