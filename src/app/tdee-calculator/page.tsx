import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TDEECalculator from '@/components/calculators/TDEECalculator';
import { tdeeContent } from '@/data/calculator-content/tdee';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: tdeeContent.en.pageTitle,
  },
  description: tdeeContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/tdee-calculator',
  },
  openGraph: {
    title: tdeeContent.en.pageTitle,
    description: tdeeContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/tdee-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: tdeeContent.en.pageTitle,
    description: tdeeContent.en.metaDescription,
  },
};

export default function TDEECalculatorPage() {
  const content = tdeeContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Health Calculators', href: '/health-calculators' },
    { label: 'TDEE Calculator', href: '/tdee-calculator' },
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
    name: 'Free TDEE Calculator to Lose Weight',
    applicationCategory: 'HealthApplication',
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

      {/* Interactive Calculator */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />}>
        <TDEECalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="tdee-calc-leaderboard" height={90} className="rounded-xl overflow-hidden" />
      </div>

      {/* Exact User SEO Content Article */}
      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        {/* Section: How to Use */}
        <section>
          <div className="bg-gray-50 dark:bg-gray-800/80 p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 not-prose">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              How to Use the TDEE Calculator
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              {content.howToUse.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Section 1: What Is a TDEE Calculator? */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What Is a TDEE Calculator?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            TDEE stands for Total Daily Energy Expenditure. It estimates the total number of calories your body uses throughout a typical day, including energy used at rest, through physical activity, and during digestion. A TDEE calculator helps you understand your daily energy requirements based on your age, sex, height, weight, and activity level.
          </p>
        </section>

        {/* Section 2: Free TDEE Calculator to Lose Weight */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Free TDEE Calculator to Lose Weight
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A free TDEE calculator can help you estimate how many calories you need to maintain your current weight. To support weight loss, people commonly use this estimate to plan a moderate calorie deficit. Actual results vary depending on individual metabolism, activity, food intake, and other factors.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Avoid extreme calorie restriction. Your estimated TDEE is a starting point, not an exact measurement of the calories you burn.
          </p>
        </section>

        {/* Section 3: TDEE Calculator in KG */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            TDEE Calculator in KG
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Use your weight in kilograms (kg) and your height in the available units, such as centimeters or feet and inches. Enter accurate measurements to help the calculator estimate your daily energy expenditure. Make sure you select the correct units before calculating your result.
          </p>
        </section>

        {/* Section 4: TDEE Calculator for Women */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            TDEE Calculator for Women
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Women can use a TDEE calculator to estimate daily calorie needs based on personal measurements and physical activity. Energy requirements differ between individuals and can be affected by age, body size, activity, and other physiological factors. Use the estimate as general nutritional guidance rather than a fixed calorie prescription.
          </p>
        </section>

        {/* Section 5: TDEE Chart and Activity Levels */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            TDEE Chart and Activity Levels
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A TDEE chart helps compare estimated calorie requirements at different physical activity levels. A person with a sedentary routine may need fewer calories than someone who exercises regularly or performs physically demanding work.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Choose the activity level that best reflects your usual routine. Selecting an activity level that is too high or too low can affect the accuracy of the estimate.
          </p>

          <div className="overflow-x-auto mt-6 not-prose">
            <table className="w-full text-left text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="py-3 px-4 font-bold">Activity Level</th>
                  <th className="py-3 px-4 font-bold">Multiplier</th>
                  <th className="py-3 px-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">Sedentary</td>
                  <td className="py-3 px-4 font-mono">BMR × 1.2</td>
                  <td className="py-3 px-4">Desk job, little to no regular exercise</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">Lightly Active</td>
                  <td className="py-3 px-4 font-mono">BMR × 1.375</td>
                  <td className="py-3 px-4">Light exercise or sports 1–3 days per week</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 bg-blue-50/40 dark:bg-blue-950/20 font-medium">
                  <td className="py-3 px-4 font-semibold text-blue-900 dark:text-blue-300">Moderately Active</td>
                  <td className="py-3 px-4 font-mono text-blue-700 dark:text-blue-300">BMR × 1.55</td>
                  <td className="py-3 px-4">Moderate exercise or workouts 3–5 days per week</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">Very Active</td>
                  <td className="py-3 px-4 font-mono">BMR × 1.725</td>
                  <td className="py-3 px-4">Hard physical exercise or sports 6–7 days per week</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-semibold">Extremely Active</td>
                  <td className="py-3 px-4 font-mono">BMR × 1.9</td>
                  <td className="py-3 px-4">Hard physical daily job or two-a-day athletic training</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: TDEE vs BMR Calculator vs BMI Calculator */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            TDEE vs BMR Calculator vs BMI Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            TDEE, BMR, and BMI are different measurements.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-4">
            <li>
              <strong>TDEE</strong> estimates the total calories your body uses throughout a typical day, including activity.
            </li>
            <li>
              <strong>BMR</strong> stands for Basal Metabolic Rate. A{' '}
              <Link href="/bmr-calculator" className="text-blue-600 dark:text-blue-400 underline font-medium">
                BMR calculator
              </Link>{' '}
              estimates the energy required to support essential bodily functions at rest.
            </li>
            <li>
              <strong>BMI</strong> stands for Body Mass Index. A{' '}
              <Link href="/bmi-calculator" className="text-blue-600 dark:text-blue-400 underline font-medium">
                BMI calculator
              </Link>{' '}
              uses height and weight to calculate a screening measure of body size; it does not directly estimate daily calorie needs.
            </li>
            <li>
              A{' '}
              <Link href="/calorie-calculator" className="text-blue-600 dark:text-blue-400 underline font-medium">
                calorie calculator
              </Link>{' '}
              estimates daily calorie requirements based on the purpose and inputs of that tool.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            These calculators serve different purposes, so use the one that matches your goal.
          </p>
        </section>

        {/* Section 7: How Is TDEE Calculated? */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Is TDEE Calculated?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A common method is to estimate resting energy expenditure using an equation such as Mifflin-St Jeor and then multiply the result by an activity factor.
          </p>
          <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-xl font-mono text-center my-4 text-sm sm:text-base font-bold text-blue-700 dark:text-blue-400 break-words overflow-x-auto not-prose">
            Estimated TDEE = Estimated Resting Energy Expenditure × Activity Factor
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Some calculators also offer alternative methods based on body composition. Results may differ depending on the formula, the activity factor selected, and individual circumstances. A calculated value is an estimate rather than a direct measurement of energy expenditure.
          </p>
        </section>

        {/* Section 8: Can I Use a Free TDEE Calculator Online? */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Can I Use a Free TDEE Calculator Online?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Yes. An online TDEE calculator lets you estimate daily calorie needs in your browser without installing a separate application. Enter your measurements, select your physical activity level, and review your estimated result. You can use this information to plan your nutrition goals.
          </p>
        </section>

        {/* Section 9: Frequently Asked Questions About TDEE */}
        <section className="not-prose pt-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions About TDEE
          </h2>
          <FAQ items={content.faqs} />
        </section>

        {/* Section: Related Health Calculators */}
        <section className="not-prose mt-12 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Related Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {content.relatedCalculators?.map((calc, idx) => (
              <Link key={idx} href={`/${calc.slug}`} className="block group">
                <div className="h-full bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-sm">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {calc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <LastUpdated date="2026-10-25" />
    </div>
  );
}
