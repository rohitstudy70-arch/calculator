import React, { Suspense } from 'react';
import { Metadata } from 'next';
import EDDCalculator from '@/components/calculators/EDDCalculator';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: 'EDD Calculator by LMP & USG – Calculate Your Due Date',
  },
  description:
    'Calculate your estimated pregnancy due date with CalcMaster\'s free EDD Calculator using LMP, USG, or due date to track gestational age and pregnancy weeks.',
  alternates: {
    canonical: 'https://www.calcmaster.co.in/edd-calculator',
  },
  openGraph: {
    title: 'EDD Calculator by LMP & USG – Calculate Your Due Date',
    description:
      'Calculate your estimated pregnancy due date with CalcMaster\'s free EDD Calculator using LMP, USG, or due date to track gestational age and pregnancy weeks.',
    url: 'https://www.calcmaster.co.in/edd-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EDD Calculator by LMP & USG – Calculate Your Due Date',
    description:
      'Calculate your estimated pregnancy due date with CalcMaster\'s free EDD Calculator using LMP, USG, or due date to track gestational age and pregnancy weeks.',
  },
};

const eddFaqs = [
  {
    question: '1. What is the full form of EDD?',
    answer:
      'EDD stands for Estimated Due Date, also known as the estimated date of delivery. It is the approximate date a baby is expected to be born.',
  },
  {
    question: '2. How do I calculate EDD by LMP?',
    answer:
      'For a typical 28-day menstrual cycle, add 280 days, or 40 weeks, to the first day of your last menstrual period. The result is an estimated due date. Cycle irregularity or uncertainty about the LMP can affect accuracy.',
  },
  {
    question: '3. Is an EDD calculator by USG more accurate than an LMP calculator?',
    answer:
      'An early ultrasound is generally the most accurate ultrasound method for establishing or confirming pregnancy dating. LMP-based estimates can also be useful when the date is known and cycles are regular. Your clinician considers the available information to establish the best estimated due date.',
  },
  {
    question: '4. How do I calculate pregnancy weeks by LMP?',
    answer:
      'Count the time from the first day of your last menstrual period to the reference date. Express the elapsed time in completed weeks and remaining days. The method estimates gestational age, not the exact time since conception.',
  },
  {
    question: '5. Can I calculate pregnancy weeks using my EDD?',
    answer:
      'Yes, approximately, if your EDD has been established using a 40-week pregnancy framework. Subtract the days remaining until the EDD from 280 days to estimate gestational age. Follow the gestational age documented by your healthcare professional if it differs.',
  },
  {
    question: '6. What is the difference between EDD and gestational age?',
    answer:
      'EDD is the estimated date when the baby is due, while gestational age describes how far the pregnancy has progressed in weeks and days.',
  },
  {
    question: '7. Does an EDD calculator work with irregular periods?',
    answer:
      'An LMP-based calculator can produce an estimate, but irregular cycles or uncertain ovulation may reduce accuracy. An ultrasound and clinical assessment may help establish more reliable pregnancy dating.',
  },
  {
    question: '8. Can an EDD calculator predict the exact delivery date?',
    answer:
      'No. EDD is an estimate, not a guarantee that delivery will happen on that date. Actual delivery timing varies from pregnancy to pregnancy.',
  },
  {
    question: "9. Is CalcMaster's EDD calculator the same as UpToDate?",
    answer:
      "No. CalcMaster is an independent online calculator, not an UpToDate product or affiliated service. UpToDate is a separate clinical information resource. For individual pregnancy care, follow the estimated due date documented by your healthcare professional.",
  },
  {
    question: '10. Should I use my LMP date or the EDD on my ultrasound report?',
    answer:
      'If you have an ultrasound report with an established EDD, compare it with your LMP-based estimate and discuss any difference with your clinician. Do not independently replace a clinically established due date with a calculator result.',
  },
];

const relatedCalculators = [
  {
    name: 'Pregnancy Due Date Calculator',
    slug: 'pregnancy-due-date-calculator',
    description: 'Track trimester timelines, baby size milestones, and fetal growth week by week.',
  },
  {
    name: 'BMI Calculator',
    slug: 'bmi-calculator',
    description: 'Calculate Body Mass Index for men and women using weight in kg and height in cm or feet.',
  },
  {
    name: 'Calorie Calculator',
    slug: 'calorie-calculator',
    description: 'Estimate daily calorie and nutrition requirements based on activity and metabolic rate.',
  },
  {
    name: 'Age Calculator',
    slug: 'age-calculator',
    description: 'Calculate exact chronological age in years, months, and days from date of birth.',
  },
];

export default function EDDCalculatorPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Health Calculators', href: '/health-calculators' },
    { label: 'EDD Calculator by LMP & USG' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: eddFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question.replace(/^\d+\.\s*/, ''),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'EDD Calculator by LMP & USG',
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

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          EDD Calculator by LMP &amp; USG – Calculate Your Due Date
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Calculate your estimated pregnancy due date with CalcMaster&apos;s free EDD Calculator. Use your Last Menstrual Period (LMP), ultrasound scan (USG), or other supported pregnancy dating information to estimate your due date, gestational age, pregnancy weeks, and remaining days until delivery.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
          Whether you need an EDD calculator by LMP, an EDD calculator by USG, a pregnancy week calculator, or a gestational age calculator, this tool helps you understand important pregnancy dates. Enter the information requested by the calculator to view your estimated results.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
          Your estimated due date is a guide, not a guaranteed delivery date. For personal pregnancy care, always follow the dating assessment provided by your healthcare professional.
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />}>
        <EDDCalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="edd-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-10">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What Is EDD? EDD Full Form and Meaning
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            EDD stands for Estimated Due Date, also called the estimated date of delivery. It is the approximate date when a baby is expected to be born.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For a typical pregnancy, the estimated due date is calculated as 40 weeks, or 280 days, from the first day of the Last Menstrual Period (LMP). This standard calculation assumes a regular 28-day menstrual cycle.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            An EDD calculator can help estimate when your baby may arrive and understand how far along your pregnancy is. The result is useful for pregnancy planning and tracking, but it does not predict the exact day of birth.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            EDD Calculator by LMP
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The LMP method is a commonly used way to estimate a pregnancy due date. LMP means Last Menstrual Period, and the calculation starts from the first day of your last normal menstrual period, not the day your period ended.
          </p>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
            How to Use the LMP Calculator
          </h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>Select the LMP calculation method.</li>
            <li>Enter the first day of your last menstrual period.</li>
            <li>Enter or adjust your average menstrual cycle length if the calculator provides that option.</li>
            <li>Calculate your estimated due date.</li>
            <li>Review your estimated pregnancy weeks, gestational age, and other results supported by the calculator.</li>
          </ol>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            If your menstrual cycles are irregular or you cannot remember your LMP accurately, the result may be less reliable. Consult your healthcare professional about the best method to date your pregnancy.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            EDD Calculator by USG (Ultrasound)
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            An EDD calculator by USG uses information from an ultrasound scan to help estimate pregnancy dating. USG is a common abbreviation for ultrasonography, or ultrasound.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            An ultrasound report may provide the estimated gestational age, an estimated due date, or measurements used by a clinician to assess pregnancy dating. Depending on the calculator&apos;s input fields, you may need the scan date and the gestational age reported on the scan.
          </p>
          <p className="text-gray-700 dark:text-gray-300 font-semibold mt-4">
            For accurate use:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
            <li>Check the scan date and pregnancy age shown on your ultrasound report.</li>
            <li>Enter only the details requested by the calculator.</li>
            <li>Compare the calculator&apos;s result with the EDD documented by your healthcare professional.</li>
            <li>Ask your clinician if the LMP-based and ultrasound-based dates differ.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            An ultrasound in the first trimester is generally the most accurate ultrasound method for establishing or confirming gestational age. Later ultrasound measurements may be less precise for dating a pregnancy. Do not change your clinician&apos;s documented due date based only on an online calculation.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            EDD Calculator Formula
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The standard EDD calculator formula for a regular 28-day menstrual cycle is known as Naegele&apos;s rule.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-800 my-4 text-center font-bold text-blue-900 dark:text-blue-200 text-lg">
            Estimated Due Date (EDD) = First day of LMP + 280 days
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This is equivalent to adding 40 weeks to the first day of the last menstrual period.
          </p>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2">
            EDD Formula With Menstrual Cycle Adjustment
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If the calculator supports cycle-length adjustment, a commonly used estimate is:
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 my-4 text-center font-semibold text-slate-900 dark:text-slate-100">
            Adjusted EDD = LMP + 280 days + (Cycle Length − 28 days)
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            For example, a cycle length of 32 days adds four days to the standard estimate, while a cycle length of 26 days subtracts two days.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
            This adjustment is only an estimate. Ovulation timing varies, and an irregular cycle can make an LMP-based due date less accurate.
          </p>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2">
            How Is EDD Estimated From an Ultrasound?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If an ultrasound report provides gestational age on a known scan date, a simplified estimate can be calculated as:
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 my-4 text-center font-semibold text-slate-900 dark:text-slate-100">
            Estimated EDD = Scan Date + (280 days − Gestational Age in Days)
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            For example, 12 weeks and 3 days represents 87 days of gestational age. The simplified formula would add 193 days to the scan date.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
            This calculation assumes a 280-day pregnancy dating framework. Clinical ultrasound dating depends on the scan measurements, timing, and professional assessment. Use the EDD from your ultrasound report or clinician&apos;s assessment when available.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pregnancy Week Calculator by LMP
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A pregnancy week calculator by LMP estimates how many weeks and days have passed since the first day of your last menstrual period.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Gestational age is commonly expressed in completed weeks and additional days. For example, 10 weeks and 4 days means ten complete weeks plus four days.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Pregnancy dating begins at the LMP, so gestational age is not the same as the time since conception. In a typical 28-day cycle, conception often occurs around two weeks after the first day of the last period, although this varies.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Use your LMP date and the calculator&apos;s reference date to estimate pregnancy weeks. If you are unsure about the LMP or have irregular cycles, ask a healthcare professional to confirm your pregnancy dating.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pregnancy Week Calculator by EDD
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You can also estimate gestational age using a previously established estimated due date and a reference date.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            If the EDD is based on a 40-week pregnancy, the approximate calculation is:
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 my-4 text-center font-semibold text-slate-900 dark:text-slate-100">
            Gestational Age in Days = 280 − Days Remaining Until EDD
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Convert the result into weeks and days by dividing the total number of days by seven.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            This is an approximation based on the established EDD. It should not replace the gestational age recorded by your healthcare professional, particularly if the original pregnancy dating was adjusted after an ultrasound.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestational Age Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Gestational age describes how far a pregnancy has progressed, usually in weeks and days. It is important for understanding pregnancy milestones and determining the timing of prenatal assessments.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            A gestational age calculator may use the LMP, an established EDD, or ultrasound dating information, depending on the supported calculation method.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For the most useful result, make sure the dates and ultrasound information you enter are correct. If the result differs from your pregnancy records, consult your clinician rather than changing your dates yourself.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pregnancy Month Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A pregnancy month calculator converts pregnancy progress into an approximate month-based description. However, pregnancy weeks and days are more precise than months because calendar months have different lengths.
          </p>
          <p className="text-gray-700 dark:text-gray-300 font-semibold mt-4">
            Pregnancy is commonly described in three trimesters:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
            <li><strong>First trimester:</strong> Through 13 weeks and 6 days.</li>
            <li><strong>Second trimester:</strong> From 14 weeks through 27 weeks and 6 days.</li>
            <li><strong>Third trimester:</strong> From 28 weeks onward.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Use weeks and days as your primary pregnancy timeline, and treat month-based descriptions as approximate.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            EDD Calculator App: Can I Calculate My Due Date Online?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You can use an online EDD calculator through a compatible mobile or desktop browser without necessarily installing a separate application. Enter your supported pregnancy dating information to estimate your due date and gestational age.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Before relying on any result, check that the calculator explains its method and that the values you enter match your medical records. An online calculator is a convenience tool, not a replacement for prenatal appointments or professional pregnancy dating.
          </p>
        </section>

        {/* Section 10 - FAQs */}
        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions About EDD Calculators
          </h2>
          <FAQ items={eddFaqs} />
        </section>

        {/* Section 11 - Calculate Your Estimated Due Date With CalcMaster */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Calculate Your Estimated Due Date With CalcMaster
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Use CalcMaster&apos;s EDD Calculator to estimate your due date and understand pregnancy weeks, months, and gestational age using the supported LMP or ultrasound dating methods.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For the most reliable pregnancy timeline, enter accurate dates and compare your result with your prenatal records. Consult a qualified healthcare professional for individual advice, especially if your LMP is uncertain, your cycles are irregular, or your ultrasound and LMP estimates differ.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-200 dark:border-amber-800 my-6">
            <p className="text-xs text-amber-900 dark:text-amber-200 font-medium">
              <strong>Medical disclaimer:</strong> This calculator provides an informational estimate only. It does not diagnose a pregnancy or replace medical advice, clinical dating, prenatal assessments, or care from a qualified healthcare professional.
            </p>
          </div>

          <div className="pt-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Further reading:</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a
                  href="https://www.nhs.uk/pregnancy/finding-out/due-date-calculator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  NHS Pregnancy Due Date Calculator
                </a>
              </li>
              <li>
                <a
                  href="https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ACOG: Methods for Estimating the Due Date
                </a>
              </li>
            </ul>
          </div>
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
