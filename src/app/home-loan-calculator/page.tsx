import React, { Suspense } from 'react';
import { Metadata } from 'next';
import HomeLoanCalculator from '@/components/calculators/HomeLoanCalculator';
import { homeLoanContent } from '@/data/calculator-content/home-loan';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: homeLoanContent.en.pageTitle,
  },
  description: homeLoanContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/home-loan-calculator',
  },
  openGraph: {
    title: homeLoanContent.en.pageTitle,
    description: homeLoanContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/home-loan-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: homeLoanContent.en.pageTitle,
    description: homeLoanContent.en.metaDescription,
  },
};

export default function HomeLoanCalculatorPage() {
  const content = homeLoanContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Loan Calculators', href: '/#loan' },
    { label: 'Home Loan EMI Calculator', href: '/home-loan-calculator' },
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
    name: 'Home Loan EMI Calculator with Prepayment',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <Breadcrumb items={breadcrumbs} />

      {/* Header & Intro */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          {content.h1}
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
          {content.introText}
        </p>
      </div>

      {/* Interactive Calculator Component */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />}>
        <HomeLoanCalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="home-loan-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      {/* Comprehensive SEO Content Article */}
      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        {/* Section 1: Introduction: Online Home Loan EMI Calculator */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Introduction: Online Home Loan EMI Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Purchasing a residential property or constructing a house is often the single most significant financial milestone in an individual’s life. Because home loans in India usually span 15 to 30 years and involve substantial capital, calculating your <strong>home loan EMI</strong> (Equated Monthly Installment) beforehand is critical. An accurate online <strong>home loan EMI calculator</strong> empowers you to forecast your monthly commitments, evaluate down payment feasibility, and understand the total interest burden before approaching lending institutions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Whether you are planning to finance an apartment with a loan from State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, or Canara Bank, CalcMaster’s <strong>home loan EMI calculator with prepayment</strong> allows you to model both standard repayment schedules and aggressive prepayment strategies to become debt-free years ahead of schedule.
          </p>
        </section>

        {/* Section 2: What Is a Home Loan EMI Calculator? */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            What Is a Home Loan EMI Calculator?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A <strong>Home Loan EMI Calculator</strong> is an interactive digital financial tool that computes the exact monthly installment required to pay off a housing loan over a specified tenure. It operates on the reducing-balance amortization model, taking into account three essential variables: the <em>principal loan amount</em>, the <em>annual interest rate</em>, and the <em>loan tenure</em>.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Every home loan EMI comprises two parts:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
            <li>
              <strong>Interest Component:</strong> The fee charged by the bank for borrowing money. In the early years of a home loan, interest makes up as much as 70% to 80% of your monthly installment.
            </li>
            <li>
              <strong>Principal Component:</strong> The actual portion of the loan amount being repaid. Over time, as the outstanding balance reduces, the principal component increases while interest decreases.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Instead of navigating complex manual arithmetic or relying on confusing sales charts, using a verified <strong>home loan EMI calculator Google</strong> search leads to instant, unbiased financial clarity in seconds.
          </p>
        </section>

        {/* Section 3: How to Calculate Home EMI */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            How to Calculate Home EMI
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Knowing <strong>how to calculate home EMI</strong> helps prospective homeowners balance lifestyle expenses with property commitments. When you calculate EMI for housing loan requirements online, follow these five simple steps:
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/80 p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 not-prose my-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Step-by-Step Home Loan EMI Calculation:
            </h3>
            <ol className="list-decimal pl-5 space-y-2.5 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <li>
                <strong>Input Property Cost &amp; Down Payment:</strong> Enter your total property value and specify your down payment (typically 20% to 25%). The remaining amount is your loan principal ($P$).
              </li>
              <li>
                <strong>Enter the Annual Home Loan Interest Rate:</strong> Check current floating interest rates offered by top banks (e.g., 8.50% to 9.25% p.a.) and input the percentage.
              </li>
              <li>
                <strong>Choose Loan Tenure in Years:</strong> Select an affordable tenure between 10 and 30 years. Shorter tenures raise EMI but cut total interest dramatically.
              </li>
              <li>
                <strong>Factor in Ancillary Expenses:</strong> Estimate mandatory charges including Stamp Duty (typically 5%–7%), property registration (1%), and lender processing fees (0.25%–0.50%).
              </li>
              <li>
                <strong>Click Calculate &amp; Inspect Amortization:</strong> Instantly view your monthly installment, principal vs. interest breakdown pie chart, and yearly balance schedule.
              </li>
            </ol>
          </div>
        </section>

        {/* Section 4: Home Loan EMI Calculation Formula */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Home Loan EMI Calculation Formula
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Every financial institution in India calculates housing loan installments using the standard mathematical formula for reducing balance loans:
          </p>

          <div className="p-4 sm:p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-900 font-mono text-center my-6 text-sm sm:text-base font-bold text-blue-900 dark:text-blue-300 break-words overflow-x-auto not-prose shadow-sm">
            EMI = [P × R × (1 + R)^N] ÷ [(1 + R)^N − 1]
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose text-sm">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">P = Principal Loan Amount</span>
              <p className="text-gray-600 dark:text-gray-400">The total amount sanctioned by the bank after deducting your initial down payment.</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">R = Monthly Interest Rate</span>
              <p className="text-gray-600 dark:text-gray-400">Annual interest rate divided by 12 months and divided by 100 (e.g., 8.5% ÷ 1200 = 0.007083).</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">N = Total Loan Duration</span>
              <p className="text-gray-600 dark:text-gray-400">Number of monthly payments over the entire tenure (e.g., 20 years × 12 = 240 months).</p>
            </div>
          </div>
        </section>

        {/* Section 5: Home Loan EMI Examples: ₹20 lakh, ₹25 lakh for 10 years, and ₹40 lakh */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Home Loan EMI Examples: ₹20 Lakh, ₹25 Lakh for 10 Years, and ₹40 Lakh
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To understand how loan size, tenure, and interest rates shape your monthly outgo, review these mathematically verified benchmark examples calculated at standard Indian home loan rates (8.5% p.a.):
          </p>

          <div className="overflow-x-auto mt-6 not-prose">
            <table className="w-full text-left text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="py-3 px-4 font-bold">Loan Scenario</th>
                  <th className="py-3 px-4 font-bold">Principal ($P$)</th>
                  <th className="py-3 px-4 font-bold">Tenure ($N$)</th>
                  <th className="py-3 px-4 font-bold">Interest Rate</th>
                  <th className="py-3 px-4 font-bold text-blue-700 dark:text-blue-400">Monthly EMI</th>
                  <th className="py-3 px-4 font-bold">Total Interest</th>
                  <th className="py-3 px-4 font-bold">Total Repayment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">20 Lakh Home Loan (20 Yrs)</td>
                  <td className="py-3 px-4">₹20,00,000</td>
                  <td className="py-3 px-4">20 Years (240 m)</td>
                  <td className="py-3 px-4">8.50%</td>
                  <td className="py-3 px-4 font-bold text-blue-700 dark:text-blue-400">₹17,356</td>
                  <td className="py-3 px-4">₹21,65,440</td>
                  <td className="py-3 px-4">₹41,65,440</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">20 Lakh Home Loan (15 Yrs)</td>
                  <td className="py-3 px-4">₹20,00,000</td>
                  <td className="py-3 px-4">15 Years (180 m)</td>
                  <td className="py-3 px-4">8.50%</td>
                  <td className="py-3 px-4 font-bold text-blue-700 dark:text-blue-400">₹19,695</td>
                  <td className="py-3 px-4">₹15,45,100</td>
                  <td className="py-3 px-4">₹35,45,100</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 bg-blue-50/40 dark:bg-blue-950/20 font-medium">
                  <td className="py-3 px-4 font-semibold text-blue-900 dark:text-blue-200">25 Lakh Home Loan (10 Yrs)</td>
                  <td className="py-3 px-4">₹25,00,000</td>
                  <td className="py-3 px-4">10 Years (120 m)</td>
                  <td className="py-3 px-4">8.50%</td>
                  <td className="py-3 px-4 font-bold text-blue-700 dark:text-blue-400">₹30,996</td>
                  <td className="py-3 px-4">₹12,19,520</td>
                  <td className="py-3 px-4">₹37,19,520</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">25 Lakh Home Loan (10 Yrs @ 9%)</td>
                  <td className="py-3 px-4">₹25,00,000</td>
                  <td className="py-3 px-4">10 Years (120 m)</td>
                  <td className="py-3 px-4">9.00%</td>
                  <td className="py-3 px-4 font-bold text-blue-700 dark:text-blue-400">₹31,669</td>
                  <td className="py-3 px-4">₹13,00,280</td>
                  <td className="py-3 px-4">₹38,00,280</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 bg-emerald-50/40 dark:bg-emerald-950/20 font-medium">
                  <td className="py-3 px-4 font-semibold text-emerald-900 dark:text-emerald-200">40 Lakh Home Loan (20 Yrs)</td>
                  <td className="py-3 px-4">₹40,00,000</td>
                  <td className="py-3 px-4">20 Years (240 m)</td>
                  <td className="py-3 px-4">8.50%</td>
                  <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">₹34,713</td>
                  <td className="py-3 px-4">₹43,31,120</td>
                  <td className="py-3 px-4">₹83,31,120</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">40 Lakh Home Loan (15 Yrs)</td>
                  <td className="py-3 px-4">₹40,00,000</td>
                  <td className="py-3 px-4">15 Years (180 m)</td>
                  <td className="py-3 px-4">8.50%</td>
                  <td className="py-3 px-4 font-bold text-blue-700 dark:text-blue-400">₹39,390</td>
                  <td className="py-3 px-4">₹30,90,200</td>
                  <td className="py-3 px-4">₹70,90,200</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">40 Lakh Home Loan (25 Yrs)</td>
                  <td className="py-3 px-4">₹40,00,000</td>
                  <td className="py-3 px-4">25 Years (300 m)</td>
                  <td className="py-3 px-4">8.50%</td>
                  <td className="py-3 px-4 font-bold text-blue-700 dark:text-blue-400">₹32,209</td>
                  <td className="py-3 px-4">₹56,62,700</td>
                  <td className="py-3 px-4">₹96,62,700</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            *Note: The above calculations are mathematical estimates. Actual EMI may vary based on exact bank processing dates, billing cycles, and applicable loan reset benchmarks.
          </p>
        </section>

        {/* Section 6: Bank-Wise Home Loan EMI Comparison */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Top Bank Home Loan EMI Calculators Compared
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            India&apos;s leading commercial banks link floating home loan rates to external benchmarks such as the Reserve Bank of India (RBI) repo rate. While the core EMI formula remains consistent across all banks, each lender applies specific spreads based on credit profile, loan amount, and gender:
          </p>

          <div className="overflow-x-auto mt-6 not-prose">
            <table className="w-full text-left text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="py-3 px-4 font-bold">Lending Bank</th>
                  <th className="py-3 px-4 font-bold">Benchmark System</th>
                  <th className="py-3 px-4 font-bold">Indicative Rate Range (p.a.)</th>
                  <th className="py-3 px-4 font-bold">Max Tenure</th>
                  <th className="py-3 px-4 font-bold">EMI on ₹30L for 20 Yrs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">State Bank of India (SBI)</td>
                  <td className="py-3 px-4">EBLR (Repo Linked)</td>
                  <td className="py-3 px-4 font-mono">8.50% – 9.65%</td>
                  <td className="py-3 px-4">30 Years</td>
                  <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">₹26,035 (at 8.50%)</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">HDFC Bank</td>
                  <td className="py-3 px-4">Repo Rate Benchmark (RPLR)</td>
                  <td className="py-3 px-4 font-mono">8.70% – 9.80%</td>
                  <td className="py-3 px-4">30 Years</td>
                  <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">₹26,426 (at 8.70%)</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">ICICI Bank</td>
                  <td className="py-3 px-4">I-RLLR (Repo Linked)</td>
                  <td className="py-3 px-4 font-mono">8.75% – 9.90%</td>
                  <td className="py-3 px-4">30 Years</td>
                  <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">₹26,524 (at 8.75%)</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">Axis Bank</td>
                  <td className="py-3 px-4">Repo Linked Lending Rate (RLLR)</td>
                  <td className="py-3 px-4 font-mono">8.75% – 10.05%</td>
                  <td className="py-3 px-4">30 Years</td>
                  <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">₹26,524 (at 8.75%)</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">Canara Bank</td>
                  <td className="py-3 px-4">Canara RLLR</td>
                  <td className="py-3 px-4 font-mono">8.40% – 9.90%</td>
                  <td className="py-3 px-4">30 Years</td>
                  <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">₹25,845 (at 8.40%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 not-prose">
            <div className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                SBI Home Loan EMI Calculator
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                State Bank of India (SBI) is India&apos;s largest mortgage lender. SBI&apos;s home loan interest rates are pegged to the External Benchmark Lending Rate (EBLR). SBI offers interest concessions (usually 0.05%) for women borrowers and reduced processing fees during festive campaigns.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                HDFC Home Loan EMI Calculator
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                HDFC Bank provides tailored residential financing for salaried and self-employed individuals. Its streamlined digital approval platform offers fast in-principle sanctions and flexible repayment options, including step-up and accelerated repayment schemes.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                ICICI Bank Home Loan EMI Calculator
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                ICICI Bank offers quick digital home loan sanctions linked to its I-RLLR benchmark. Borrowers with pre-approved offers enjoy minimal documentation, zero foreclosure charges on floating-rate loans, and competitive balance transfer facilities.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Axis Bank &amp; Canara Bank Home Loan Calculators
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Axis Bank features loan products such as Shubh Aarambh Home Loans with EMI waivers on regular repayments. Canara Bank, a premier public sector institution, offers some of the lowest entry-level RLLR rates for salaried government and corporate employees.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            *CalcMaster is an independent mathematical calculation utility. Bank interest rate ranges and benchmarks are presented for educational and comparison purposes only and are subject to revision by the respective lenders.
          </p>
        </section>

        {/* Section 7: Home Loan Interest Rate and Loan Tenure */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Home Loan Interest Rate and Loan Tenure
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Your monthly EMI and overall interest obligation depend heavily on the interplay between the <strong>home loan interest rate</strong> and the chosen <strong>loan tenure</strong>. Consider how choosing between 15, 20, and 30-year tenures affects a <strong>₹50 Lakh Home Loan</strong> at 8.5% p.a.:
          </p>

          <div className="overflow-x-auto mt-6 not-prose">
            <table className="w-full text-left text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="py-3 px-4 font-bold">Loan Tenure</th>
                  <th className="py-3 px-4 font-bold">Monthly EMI</th>
                  <th className="py-3 px-4 font-bold">Total Interest Payable</th>
                  <th className="py-3 px-4 font-bold">Total Outgo</th>
                  <th className="py-3 px-4 font-bold">Interest vs. Principal Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">15 Years (180 months)</td>
                  <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">₹49,237</td>
                  <td className="py-3 px-4">₹38,62,656</td>
                  <td className="py-3 px-4">₹88,62,656</td>
                  <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">77% of Principal</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 bg-blue-50/30 dark:bg-blue-950/20 font-medium">
                  <td className="py-3 px-4 font-semibold">20 Years (240 months)</td>
                  <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">₹43,391</td>
                  <td className="py-3 px-4">₹54,13,879</td>
                  <td className="py-3 px-4">₹1,04,13,879</td>
                  <td className="py-3 px-4 text-amber-600 dark:text-amber-400 font-semibold">108% of Principal</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">30 Years (360 months)</td>
                  <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">₹38,446</td>
                  <td className="py-3 px-4">₹88,40,490</td>
                  <td className="py-3 px-4">₹1,38,40,490</td>
                  <td className="py-3 px-4 text-rose-600 dark:text-rose-400 font-semibold">177% of Principal</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Notice that stretching the tenure from 20 to 30 years reduces the monthly payment by only ₹4,945 per month, but increases the total interest burden by a staggering <strong>₹34.26 Lakh</strong>! Opting for the shortest tenure your monthly budget comfortably allows is the single most effective way to minimize mortgage costs.
          </p>
        </section>

        {/* Section 8: Home Loan EMI Calculator With Prepayment */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Home Loan EMI Calculator With Prepayment
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            One of the greatest advantages of home loans in India is that under Reserve Bank of India (RBI) mandates, <strong>no prepayment penalties or foreclosure charges</strong> can be levied on floating rate housing loans sanctioned to individual borrowers.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            When you use a <strong>home loan EMI calculator with prepayment</strong>, you see the compound power of making lump-sum or recurring prepayments:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 not-prose">
            <div className="p-5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-bold text-base text-emerald-950 dark:text-emerald-200 mb-2">
                1. Pay 1 Extra EMI Every Year
              </h3>
              <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                Paying just one additional EMI each calendar year (for example, using an annual bonus) can reduce a 20-year home loan to approximately 16.5 years, saving lakhs in interest.
              </p>
            </div>

            <div className="p-5 bg-blue-50/70 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-base text-blue-950 dark:text-blue-200 mb-2">
                2. Step-Up EMI by 5% Annually
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                As your salary increases each year, increasing your monthly EMI by 5% to 10% can cut your total loan duration by nearly half.
              </p>
            </div>

            <div className="p-5 bg-purple-50/70 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-base text-purple-950 dark:text-purple-200 mb-2">
                3. Lump-Sum Principal Injections
              </h3>
              <p className="text-sm text-purple-800 dark:text-purple-300 leading-relaxed">
                Directing PPF maturities, stock market profits, or property sale proceeds toward loan prepayment directly reduces the outstanding principal balance.
              </p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To simulate exact prepayment schedules, compare tenure reductions versus EMI drops, and calculate your exact savings, explore our dedicated{' '}
            <Link href="/loan-prepayment-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Loan Prepayment Calculator
            </Link>.
          </p>
        </section>

        {/* Section 9: How Much Salary Is Required for a ₹40 Lakh Home Loan? */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            How Much Salary Is Required for a ₹40 Lakh Home Loan?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Before sanctioning a housing loan, banks evaluate your creditworthiness using the <strong>FOIR (Fixed Obligation to Income Ratio)</strong>. Most Indian banks (including SBI, HDFC, and ICICI) cap your total monthly debt payments at <strong>50%</strong> of your net monthly take-home salary.
          </p>

          <div className="p-5 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 my-6 not-prose">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              ₹40 Lakh Home Loan Salary Qualification Breakdown:
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <li>
                <strong>Monthly EMI for ₹40 Lakh (20 Yrs @ 8.5%):</strong> ₹34,713 per month.
              </li>
              <li>
                <strong>Assuming 50% Maximum Permissible FOIR:</strong> ₹34,713 ÷ 0.50 = <strong>₹69,426</strong>.
              </li>
              <li>
                <strong>Recommended Net Monthly In-Hand Salary:</strong> <strong>₹70,000 to ₹85,000</strong> (with zero other active EMIs).
              </li>
              <li>
                <strong>If you have existing loans:</strong> For instance, an active car loan EMI of ₹10,000 raises the required take-home pay to (₹34,713 + ₹10,000) ÷ 0.50 = <strong>₹89,426/month</strong>.
              </li>
            </ul>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If your individual salary falls short of the threshold, you can include your spouse, parents, or an earning sibling as a co-applicant to pool incomes and qualify. To verify how personal debt impacts your borrowing capacity, check our{' '}
            <Link href="/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Personal Loan EMI Calculator
            </Link>.
          </p>
        </section>

        {/* Section 10: Frequently Asked Questions */}
        <section className="not-prose pt-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <FAQ items={content.faqs} />
        </section>

        {/* Section 11: Plan Your Home Loan With CalcMaster */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 sm:p-8 rounded-3xl border border-blue-100 dark:border-gray-700 not-prose">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Plan Your Home Loan With CalcMaster
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
            CalcMaster is committed to delivering transparent, fast, and mathematically accurate financial tools for Indian consumers. Pair your home loan planning with our suite of verified mortgage, debt, and wealth calculators:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {content.relatedCalculators?.map((calc, idx) => (
              <Link key={idx} href={`/${calc.slug}`} className="block group">
                <div className="h-full bg-white dark:bg-gray-800/90 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-sm group-hover:shadow-md">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {calc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <LastUpdated date="2026-10-26" />
    </div>
  );
}
