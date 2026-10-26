import React, { Suspense } from 'react';
import { Metadata } from 'next';
import MutualFundCalculator from '@/components/calculators/MutualFundCalculator';
import { mutualFundContent } from '@/data/calculator-content/mutual-fund';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: mutualFundContent.en.pageTitle,
  },
  description: mutualFundContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/mutual-fund-calculator',
  },
  openGraph: {
    title: mutualFundContent.en.pageTitle,
    description: mutualFundContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/mutual-fund-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: mutualFundContent.en.pageTitle,
    description: mutualFundContent.en.metaDescription,
  },
};

export default function MutualFundCalculatorPage() {
  const content = mutualFundContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Investment Calculators', href: '/investment-calculators' },
    { label: 'Mutual Fund Calculator', href: '/mutual-fund-calculator' },
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
    name: content.h1,
    description: content.metaDescription,
    url: 'https://www.calcmaster.co.in/mutual-fund-calculator',
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
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mb-4">
          Use this online mutual fund calculator to estimate the potential value of your investments through a Systematic Investment Plan (SIP) or a lump sum investment. Enter your investment amount, investment duration, and an assumed rate of return to understand how your money could grow over time.
        </p>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl mb-4">
          A mutual fund return calculator can help you estimate the amount invested, potential gains, and projected future value. It is useful for exploring different investment amounts and time periods while planning financial goals.
        </p>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl mb-4">
          Whether you are looking for a SIP mutual fund calculator, a monthly mutual fund calculator, or a lumpsum calculator, the right calculation depends on how you plan to invest and which features the tool supports.
        </p>
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-medium">
          <strong>Important:</strong> This calculator provides illustrative estimates, not guaranteed returns or investment recommendations. Mutual fund investments are subject to market risks, and actual results can differ significantly from projections.
        </div>
      </div>

      {/* Interactive Calculator Component */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />}>
        <MutualFundCalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="mf-calc-leaderboard" height={90} className="rounded-xl overflow-hidden" />
      </div>

      {/* Exact User Content Article */}
      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        {/* Section 1: What Is a Mutual Fund Calculator? */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What Is a Mutual Fund Calculator?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A mutual fund calculator is an online financial planning tool that estimates how an investment may grow over a selected period under an assumed rate of return.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            A typical mutual fund SIP calculator uses inputs such as the monthly investment amount, investment duration, and expected annual return. A lump sum calculator uses the initial investment amount, duration, and assumed return.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Depending on the calculator, the output may include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
            <li>Total amount invested.</li>
            <li>Estimated future investment value.</li>
            <li>Estimated gains or returns.</li>
            <li>Investment duration.</li>
            <li>A comparison of results under different assumed return rates.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            These figures are projections based on mathematical assumptions. They do not predict the future performance of an actual mutual fund scheme.
          </p>
        </section>

        {/* Section 2: How to Use This Mutual Fund Calculator */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use This Mutual Fund Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Follow these steps to estimate your investment value.
          </p>
          <div className="mt-4 bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700 not-prose">
            <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <li>Select SIP or lump sum, if both options are available.</li>
              <li>Enter the amount you plan to invest.</li>
              <li>Choose the investment duration in months or years.</li>
              <li>Enter an assumed annual rate of return.</li>
              <li>Calculate the projected value.</li>
              <li>Review the amount invested, estimated gains, and projected total.</li>
            </ol>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
              You can change the investment amount, duration, or assumed return to see how those variables affect the mathematical projection.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
              Use different scenarios for planning rather than treating one projected result as a promise of future wealth.
            </p>
          </div>
        </section>

        {/* Section 3: SIP Mutual Fund Calculator */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            SIP Mutual Fund Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A SIP, or Systematic Investment Plan, is a method of investing a fixed amount at regular intervals into a mutual fund scheme.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            A SIP calculator estimates the future value of these periodic contributions using an assumed rate of return. It can help you understand the mathematical relationship between your monthly investment, investment duration, and projected corpus.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For example, if you invest ₹5,000 per month for 10 years, your total contributions would be ₹6,00,000 before any returns. The final value depends on actual investment performance, costs, timing, and the assumptions used in the calculator.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            A SIP calculator is useful for estimating how different monthly contributions or investment periods affect a potential investment goal.
          </p>

          <div className="mt-8 space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700 not-prose">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                What Inputs Does a SIP Calculator Need?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                A typical SIP calculator asks for:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 mb-3">
                <li><strong>Monthly investment:</strong> The amount contributed during each instalment.</li>
                <li><strong>Investment duration:</strong> How many months or years you plan to invest.</li>
                <li><strong>Assumed annual return:</strong> The hypothetical rate used for calculation.</li>
                <li><strong>Investment frequency:</strong> Monthly or another supported interval.</li>
              </ul>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Some calculators also allow a yearly increase in the SIP amount. This feature is commonly called a step-up SIP or SIP top-up.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700 not-prose">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                How Does a SIP Calculator Work?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                The calculator applies a mathematical formula to estimate the future value of periodic investments.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                For a SIP with contributions made at the end of each month, a commonly used future-value formula is:
              </p>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-sm text-gray-800 dark:text-gray-200 font-semibold mb-3">
                FV = P × [((1 + i)^n − 1) ÷ i]
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Here:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                <li>FV = Estimated future value.</li>
                <li>P = Monthly investment.</li>
                <li>i = Assumed monthly return rate.</li>
                <li>n = Total number of monthly instalments.</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                If contributions are assumed to occur at the beginning of each month, the formula may include an additional factor of (1 + i). Therefore, the output depends on the specific formula and timing convention implemented in the calculator.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                If an effective annual rate R is converted to an effective monthly rate, one approach is:
              </p>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-sm text-gray-800 dark:text-gray-200 font-semibold mb-3">
                i = (1 + R)^(1/12) − 1
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                This conversion is different from simply dividing an annual rate by 12. The exact method should match the calculator&apos;s documented assumptions.
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                The formula is a mathematical illustration. Actual mutual fund returns do not usually follow a constant rate every month.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Mutual Fund Return Calculator */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mutual Fund Return Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A mutual fund return calculator estimates how much an investment might be worth after a chosen duration under an assumed return scenario.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            It can help you explore questions such as:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
            <li>What might my investment be worth after five or ten years?</li>
            <li>How does investing for longer affect a projected amount?</li>
            <li>What happens to the projection if I change my monthly contribution?</li>
            <li>How different are the projections under lower and higher assumed returns?</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            A projected result should not be confused with actual returns. Actual returns depend on the investment&apos;s market value over time, as well as applicable costs and other factors.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            To understand actual historical performance, use reliable fund disclosures and appropriate return measures. A general investment calculator cannot determine which fund is suitable for you.
          </p>
        </section>

        {/* Section 5: Mutual Fund Calculator for Lump Sum Investments */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mutual Fund Calculator for Lump Sum Investments
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A lump sum investment means investing a single amount instead of making regular contributions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            A lump sum calculator estimates how an initial investment could grow over a chosen period under an assumed rate of return.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For a hypothetical investment with annual compounding, the mathematical future-value formula is:
          </p>
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 p-4 rounded-xl font-mono text-blue-900 dark:text-blue-200 font-semibold my-4">
            FV = P × (1 + R)^t
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Here:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mt-2">
            <li>FV = Projected future value.</li>
            <li>P = Initial investment amount.</li>
            <li>R = Assumed annual return as a decimal.</li>
            <li>t = Investment duration in years.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For example, ₹1,00,000 invested for a selected period can be evaluated under different hypothetical return scenarios. The resulting values are illustrations, not promises of market performance.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Actual mutual fund returns vary with market conditions and the performance of the underlying investments. A formula-based lump sum calculator does not reproduce every movement in a fund&apos;s NAV.
          </p>
        </section>

        {/* Section 6: Mutual Fund Calculator for Monthly Investments */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mutual Fund Calculator for Monthly Investments
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A monthly mutual fund calculator is useful when you want to estimate the projected value of regular monthly investments.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            The main factors are:
          </p>
          <ol className="list-decimal pl-6 space-y-1.5 text-gray-700 dark:text-gray-300 mt-2">
            <li>How much you invest each month.</li>
            <li>How long you continue investing.</li>
            <li>The rate of return assumed for the calculation.</li>
            <li>The formula and timing convention used by the calculator.</li>
          </ol>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            The total amount you contribute is straightforward to calculate:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-sm text-gray-800 dark:text-gray-200 font-semibold my-3">
            Total Contributions = Monthly Investment × Number of Instalments
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            For example, a monthly contribution of ₹5,000 over 120 months equals ₹6,00,000 in total contributions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Any additional projected value depends on the assumed return and calculation method. This is why investment amount, duration, and assumed return should be reviewed separately when comparing scenarios.
          </p>
        </section>

        {/* Section 7: SIP vs Lump Sum: What Is the Difference? */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            SIP vs Lump Sum: What Is the Difference?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            SIP and lump sum describe two different ways of investing.
          </p>

          <div className="mt-6 overflow-x-auto not-prose">
            <table className="w-full text-left border-collapse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700/80 border-b border-gray-200 dark:border-gray-600">
                  <th className="p-3.5 text-sm font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="p-3.5 text-sm font-semibold text-gray-900 dark:text-white">SIP</th>
                  <th className="p-3.5 text-sm font-semibold text-gray-900 dark:text-white">Lump sum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-300">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="p-3.5 font-medium">Investment method</td>
                  <td className="p-3.5">Regular instalments</td>
                  <td className="p-3.5">One initial investment</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="p-3.5 font-medium">Cash-flow requirement</td>
                  <td className="p-3.5">Ongoing contributions</td>
                  <td className="p-3.5">Larger amount available upfront</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="p-3.5 font-medium">Calculator inputs</td>
                  <td className="p-3.5">Instalment, duration, assumed return</td>
                  <td className="p-3.5">Initial amount, duration, assumed return</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="p-3.5 font-medium">Main use</td>
                  <td className="p-3.5">Exploring recurring investment scenarios</td>
                  <td className="p-3.5">Exploring a one-time investment scenario</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="p-3.5 font-medium">Return certainty</td>
                  <td className="p-3.5">Not guaranteed</td>
                  <td className="p-3.5">Not guaranteed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
            Neither method is universally better for every investor. Suitability depends on your financial circumstances, available funds, goals, time horizon, and ability to tolerate investment risk.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Use the calculator to understand hypothetical outcomes, not to assume one investment method will always outperform the other.
          </p>
        </section>

        {/* Section 8: Mutual Fund Calculators in India */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mutual Fund Calculators in India
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Indian investors commonly use online calculators to estimate SIP values, lump sum growth, potential returns, and other financial scenarios.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Before using a mutual fund calculator in India, check whether it clearly explains:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
            <li>Which investment methods it supports.</li>
            <li>How it converts the annual return assumption into a periodic rate.</li>
            <li>Whether investments are assumed to occur at the start or end of each period.</li>
            <li>Whether costs, taxes, and inflation are included or excluded.</li>
            <li>Whether the projected value is clearly labelled as an estimate.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            A general-purpose calculator can support basic planning mathematics, but it should not be used as a substitute for a scheme&apos;s official documents, disclosures, or qualified financial advice.
          </p>
        </section>

        {/* Section 9: Understanding Assumed Returns */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Understanding Assumed Returns
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The assumed rate of return is an input to the calculation, not a prediction.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For example, a calculator may let you change the rate to compare multiple hypothetical scenarios. A higher assumed rate will generally produce a larger mathematical projection when the other inputs remain unchanged.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            This does not mean that the higher-return scenario will actually occur.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For a more careful comparison, run several scenarios and clearly label the rates as assumptions. Avoid selecting an unrealistically high number merely to produce an attractive projected corpus.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Mutual fund schemes are market-linked investments. Historical performance does not guarantee future results.
          </p>
        </section>

        {/* Section 10: Mutual Fund Calculator: Common Mistakes to Avoid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mutual Fund Calculator: Common Mistakes to Avoid
          </h2>

          <div className="space-y-6 mt-6">
            <div className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700 not-prose">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Treating estimates as guaranteed returns
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                A calculator cannot guarantee the future value of a market-linked investment. Actual results may be higher or lower than the projection.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700 not-prose">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Using inconsistent investment periods
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                When comparing two projections, use the same duration and clearly understand whether the duration is measured in months or years.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700 not-prose">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Ignoring contribution timing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Two calculators can show slightly different results because they assume contributions at different times or use different rate-conversion conventions.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700 not-prose">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Confusing total contributions with estimated gains
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Total contributions are the amount you invest. Estimated gains are the difference between the projected value and those contributions, subject to the calculator&apos;s assumptions.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700 not-prose">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Ignoring costs, taxes, and inflation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                If these factors are excluded from the calculator, the displayed future value is not an estimate of the final amount available after all costs, taxes, and changes in purchasing power.
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: Frequently Asked Questions */}
        <section className="not-prose pt-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <FAQ items={content.faqs} />
        </section>

        {/* Section 12: Important Disclaimer */}
        <section className="bg-gray-50 dark:bg-gray-800/60 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Important Disclaimer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
            This calculator and its accompanying content are provided for general information and educational purposes. Calculated values are illustrative estimates based on the inputs and mathematical assumptions used by the tool.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            Mutual fund investments are subject to market risks. Returns are not guaranteed, and past performance is not a guarantee of future results. This content does not constitute personalised investment, tax, or legal advice. Review relevant scheme documents and consult a qualified professional when appropriate.
          </p>
        </section>

        {/* Related Calculators Navigation */}
        <section className="not-prose pt-4 bg-gray-50 dark:bg-gray-800/60 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Related Investment Calculators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {content.relatedCalculators?.map((calc, idx) => (
              <Link key={idx} href={`/${calc.slug}`} className="block group">
                <div className="h-full bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-sm">
                  <h4 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                    {calc.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{calc.description}</p>
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
