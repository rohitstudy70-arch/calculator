import React, { Suspense } from 'react';
import { Metadata } from 'next';
import BMICalculator from '@/components/calculators/BMICalculator';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: 'BMI Calculator for Female & Male in kg, cm and Feet',
  },
  description:
    'Calculate your Body Mass Index (BMI) online with CalcMaster\'s free BMI Calculator using weight in kg and height in feet, cm or metres for men and women.',
  alternates: {
    canonical: 'https://www.calcmaster.co.in/bmi-calculator',
  },
  openGraph: {
    title: 'BMI Calculator for Female & Male in kg, cm and Feet',
    description:
      'Calculate your Body Mass Index (BMI) online with CalcMaster\'s free BMI Calculator using weight in kg and height in feet, cm or metres for men and women.',
    url: 'https://www.calcmaster.co.in/bmi-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator for Female & Male in kg, cm and Feet',
    description:
      'Calculate your Body Mass Index (BMI) online with CalcMaster\'s free BMI Calculator using weight in kg and height in feet, cm or metres for men and women.',
  },
};

const bmiFaqs = [
  {
    question: 'How do I calculate BMI using kg and cm?',
    answer:
      'Divide your weight in kilograms by your height in metres squared. To convert height from centimetres to metres, divide the centimetre value by 100. For example, 70 kg and 175 cm gives a BMI of approximately 22.9.',
  },
  {
    question: 'Can I calculate BMI using kg and feet?',
    answer:
      'Yes. Convert your height from feet and inches into metres or centimetres, then apply the standard BMI formula. If your calculator supports feet and inches directly, enter your measurements in the available fields.',
  },
  {
    question: 'Is there a different BMI calculator for males and females?',
    answer:
      'The standard adult BMI formula is the same for men and women. BMI categories also use the same standard adult ranges, although BMI does not account for differences in muscle mass, fat distribution, or individual health circumstances.',
  },
  {
    question: 'Does age affect BMI calculation?',
    answer:
      'For adults, the standard BMI formula remains the same regardless of age. For children and teenagers, BMI is interpreted using age- and sex-specific percentiles rather than the standard adult categories.',
  },
  {
    question: 'What is a healthy BMI for adults?',
    answer:
      'The commonly used standard healthy-weight BMI range for adults is 18.5–24.9. This is a screening range rather than a guarantee of good health, and individual risk assessment may require additional information.',
  },
  {
    question: 'How can I calculate BMI without a calculator?',
    answer:
      'Convert your height into metres, multiply the height by itself, and divide your weight in kilograms by that result. For example, 60 kg ÷ (1.60 × 1.60) gives a BMI of approximately 23.4.',
  },
  {
    question: 'Is BMI accurate for everyone?',
    answer:
      'BMI is useful for general screening, but it cannot directly distinguish fat from muscle or show where fat is stored. It may be less informative for some athletes, older adults, pregnant people, and individuals with particular health conditions.',
  },
  {
    question: 'Can I use an adult BMI calculator for my child?',
    answer:
      'Adult BMI categories are not appropriate for children and teenagers. Their BMI should be interpreted using age- and sex-specific growth references, ideally with guidance from a healthcare professional.',
  },
  {
    question: 'What is the BMI formula in kilograms?',
    answer:
      'The metric formula is BMI = weight in kilograms ÷ height in metres squared. Ensure your height is converted into metres before calculating the result.',
  },
  {
    question: 'Should I rely only on BMI to assess my health?',
    answer:
      'No. BMI is one screening measure and should not replace a comprehensive health assessment. Waist circumference, medical history, blood pressure, laboratory results, and other factors may also be relevant.',
  },
];

export default function BMICalculatorPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Health Calculators', href: '/health-calculators' },
    { label: 'BMI Calculator', href: '/bmi-calculator' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: bmiFaqs.map((faq) => ({
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
    name: 'BMI Calculator for Female & Male in kg, cm and Feet',
    description:
      'Calculate BMI online with CalcMaster free BMI Calculator. Supports kg, cm, feet, inches and adult standard categories.',
    url: 'https://www.calcmaster.co.in/bmi-calculator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  const relatedCalculators = [
    { name: 'Calorie Calculator', slug: 'calorie-calculator', description: 'Calculate daily calories and macros for fitness' },
    { name: 'BMR Calculator', slug: 'bmr-calculator', description: 'Find your basal metabolic rate at rest' },
    { name: 'Body Fat Calculator', slug: 'body-fat-calculator', description: 'Estimate body fat percentage using US Navy tape' },
    { name: 'TDEE Calculator', slug: 'tdee-calculator', description: 'Total daily energy expenditure calculation' },
  ];

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <Breadcrumb items={breadcrumbs} />

      {/* Header & Intro */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          BMI Calculator for Female &amp; Male in kg, cm and Feet
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mb-4">
          Calculate your Body Mass Index (BMI) online with CalcMaster&apos;s free BMI Calculator. Whether you are looking for a BMI calculator for men, women, or a way to calculate BMI using weight in kilograms and height in feet, this guide helps you understand your BMI, the formula behind it, and what your result means.
        </p>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
          Enter your weight and height into the calculator above to calculate your BMI in seconds. You can also learn how age affects BMI interpretation, understand standard adult BMI categories, and find answers to common BMI calculation questions.
        </p>
      </div>

      {/* Interactive Calculator Component */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />}>
        <BMICalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="bmi-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      {/* Exact User Content Article */}
      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Free BMI Calculator in kg, cm and Feet
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our BMI Calculator is designed to make calculating Body Mass Index simple. BMI is calculated using your weight and height and can help you understand whether your weight falls within a standard adult BMI category.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            You may want to calculate BMI for yourself, understand BMI for men and women, or check how to use kilograms and feet when entering your measurements. The formula remains the same for adults regardless of whether the measurements are entered in metric or imperial units.
          </p>
          <div className="mt-4 bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white mb-2">How to calculate your BMI:</p>
            <ol className="list-decimal pl-6 space-y-1.5 text-gray-700 dark:text-gray-300">
              <li>Enter your weight in kilograms (kg).</li>
              <li>Enter your height in centimetres (cm), or convert your height from feet and inches if your calculator supports those units.</li>
              <li>Select the calculate option.</li>
              <li>Review your BMI value and the corresponding adult BMI category.</li>
            </ol>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic">
              For an accurate result, enter your current weight and height correctly. BMI is a screening measure, not a complete assessment of your health.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            BMI Calculator for Men and Women
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A BMI calculator for male and female users uses the same standard BMI formula for adults. Your BMI is calculated from your weight and height, not directly from your gender.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For example, an adult man and an adult woman with the same weight and height will have the same BMI. However, BMI does not directly measure body fat, muscle mass, or fat distribution, so two people with the same BMI may have different body compositions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 not-prose">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">BMI Calculator for Men</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Men can use BMI to understand how their weight compares with standard adult BMI categories. Enter your weight in kilograms and your height in metres, centimetres, or the equivalent height in feet and inches.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Remember that BMI does not distinguish between muscle and fat. People with greater muscle mass may have a higher BMI without having excess body fat.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">BMI Calculator for Women</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Women can also use the standard adult BMI formula to calculate their Body Mass Index. The result can provide a general screening measure of weight relative to height.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                BMI alone does not account for pregnancy, muscle mass, age-related body composition changes, or individual health circumstances. For these reasons, interpret your result alongside other relevant health information.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            BMI Calculator in kg and Feet
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you measure your weight in kilograms but your height in feet and inches, you can still calculate your BMI. Convert your height into metres before using the standard metric formula.
          </p>

          <div className="mt-4 bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700 not-prose">
            <p className="font-semibold text-gray-900 dark:text-white mb-3">Height conversion examples:</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700 dark:text-gray-300 font-mono">
              <li className="bg-white dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-800">5 feet = 152.4 cm</li>
              <li className="bg-white dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-800">5 feet 5 inches = 165.1 cm</li>
              <li className="bg-white dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-800">5 feet 6 inches = 167.64 cm</li>
              <li className="bg-white dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-800">5 feet 8 inches = 172.72 cm</li>
              <li className="bg-white dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-800">6 feet = 182.88 cm</li>
            </ul>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            To calculate BMI manually, convert your height from centimetres to metres by dividing it by 100. Then multiply your height in metres by itself and divide your weight in kilograms by that number.
          </p>
          <div className="mt-4 p-5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900 text-sm text-gray-800 dark:text-gray-200">
            <p className="font-semibold mb-2 text-blue-900 dark:text-blue-300">
              For example, if your weight is 70 kg and your height is 175 cm:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Height in metres = 1.75 m</li>
              <li>Height squared = 1.75 × 1.75 = 3.0625</li>
              <li>BMI = 70 ÷ 3.0625 = 22.86</li>
            </ul>
            <p className="mt-2 font-medium">
              Your BMI is approximately <strong>22.9</strong>, which falls within the standard healthy-weight category for adults.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            BMI Formula: How Is BMI Calculated?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The standard metric BMI formula is:
          </p>
          <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-xl font-mono text-center my-3 text-sm sm:text-base font-bold text-blue-700 dark:text-blue-400 break-words overflow-x-auto">
            BMI = Weight in kilograms ÷ (Height in metres × Height in metres)
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            For example, a person weighing 80 kg with a height of 1.80 metres has a BMI of approximately 24.7.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            If you use pounds and inches instead, the commonly used imperial formula is:
          </p>
          <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-xl font-mono text-center my-3 text-sm sm:text-base font-bold text-blue-700 dark:text-blue-400 break-words overflow-x-auto">
            BMI = (Weight in pounds ÷ Height in inches²) × 703
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Both formulas estimate Body Mass Index using weight and height. When measurements are entered correctly, they produce equivalent results apart from rounding differences.
          </p>
        </section>

        {/* Section 5 */}
        <section className="not-prose">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Standard Adult BMI Categories
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            For adults aged 20 and older, the commonly used international BMI categories are:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="py-3 px-4 font-bold">BMI value</th>
                  <th className="py-3 px-4 font-bold">Standard adult category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium">Below 18.5</td>
                  <td className="py-3 px-4">Underweight</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 bg-emerald-50/50 dark:bg-emerald-950/20 font-semibold text-emerald-800 dark:text-emerald-300">
                  <td className="py-3 px-4">18.5–24.9</td>
                  <td className="py-3 px-4">Healthy weight</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium">25.0–29.9</td>
                  <td className="py-3 px-4">Overweight</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium">30.0 and above</td>
                  <td className="py-3 px-4">Obesity</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
            These categories are general screening ranges, not a diagnosis. BMI should be interpreted in context, including health history, body composition, and other clinical measurements.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
            Some health guidelines use additional risk thresholds for Asian populations, including Indian populations. A healthcare professional can help interpret BMI in the context of your individual health risks.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            BMI Calculator by Age: Does Age Affect BMI?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you are searching for a BMI calculator by age or a BMI calculator kg with age, it is important to understand the difference between adult and child BMI interpretation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 not-prose">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">BMI for Adults</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                For most adults aged 20 and older, the standard BMI formula uses weight and height. The formula itself does not change simply because an adult is older.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                However, age can influence body composition and health risks. Older adults may lose muscle mass or experience changes in fat distribution, so BMI may not tell the whole story about their health.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">BMI for Children and Teenagers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                For children and teenagers aged 2–19, BMI is interpreted differently. Healthcare professionals generally use BMI-for-age percentiles that account for age and sex because body composition changes during growth.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Adult BMI categories should not be applied directly to children and teenagers. If you are calculating BMI for a child, use an appropriate child and teen BMI assessment tool or consult a healthcare professional.
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-900 dark:text-amber-200">
            <strong>Important:</strong> Adding an age field to a calculator does not automatically make the BMI result age-adjusted. The interpretation must use the appropriate method for the person&apos;s age.
          </div>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            BMI Calculator India: What Should Indian Users Know?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            People in India can use a BMI calculator to estimate their Body Mass Index using weight in kilograms and height in centimetres or feet. These familiar units make it easy to enter measurements without first converting weight into pounds.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            BMI can be a useful starting point for understanding weight relative to height. However, health risks can differ between individuals and populations, and some clinical guidance uses lower BMI thresholds to assess certain risks in Asian populations.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Use BMI as a general screening tool rather than a complete measure of health. If you have concerns about your weight, blood sugar, blood pressure, or other health risks, seek personalised advice from a qualified healthcare professional.
          </p>
        </section>

        {/* Section 8 - FAQs */}
        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions About BMI
          </h2>
          <FAQ items={bmiFaqs} />
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Calculate Your BMI with CalcMaster
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Use the BMI Calculator above to calculate your Body Mass Index from your weight and height. Whether you are searching for a BMI calculator for men, a BMI calculator for women, a BMI calculator in kg and feet, or guidance on BMI by age, understanding the formula and its limitations can help you interpret your result more responsibly.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            CalcMaster aims to make everyday calculations easier with clear explanations and practical online tools. Use your BMI result as a starting point for understanding weight relative to height, and consult a qualified healthcare professional for personalised health advice.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            *Health note: This calculator provides an estimate for informational purposes and is not a substitute for professional medical advice, diagnosis, or treatment.*
          </p>
        </section>

        {/* Related Health Calculators */}
        <section className="not-prose mt-12 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Health Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedCalculators.map((calc, idx) => (
              <Link key={idx} href={`/${calc.slug}`} className="block group">
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

      <LastUpdated date="2026-10-23" />
    </div>
  );
}
