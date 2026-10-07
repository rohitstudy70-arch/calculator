import React, { Suspense } from 'react';
import { Metadata } from 'next';
import AgeCalculator from '@/components/calculators/AgeCalculator';
import { ageContent } from '@/data/calculator-content/age';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

const pageTitle = 'DOB Calculator - Birth of Date Calculation | CalcMaster';
const metaDescription =
  'Free birth of date calculation tool: find age by DOB, calculate exact age from birth date in years, months & days. Instant online DOB calculator in India.';

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/dob-calculator',
  },
  openGraph: {
    title: pageTitle,
    description: metaDescription,
    url: 'https://www.calcmaster.co.in/dob-calculator',
    siteName: 'CalcMaster India',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function DobCalculatorPage() {
  const content = ageContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Date & Time Calculators', href: '/date-time-calculators' },
    { label: 'DOB Calculator', href: '/dob-calculator' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: pageTitle,
    description: metaDescription,
    url: 'https://www.calcmaster.co.in/dob-calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb items={breadcrumbs} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          DOB Calculator – Birth of Date Calculation &amp; Age by DOB
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Find age by DOB instantly with our free birth of date calculation tool. Enter your date of birth to calculate your exact age in years, months, days, hours, and minutes with complete birthday countdown.
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl h-96 w-full" />}>
        <AgeCalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="dob-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How to Find Age by DOB (Date of Birth)</h2>
          <ol className="list-decimal pl-6 space-y-2 mt-4 text-slate-700 dark:text-slate-300">
            <li>Select your exact Date of Birth (DOB) using the date picker.</li>
            <li>By default, today&apos;s date is selected as the reference date. You can choose any past or future cutoff date.</li>
            <li>View your exact chronological age broken down in years, months, and days.</li>
            <li>See total days lived, hours, minutes, and exact days left until your next birthday.</li>
            <li>Download your age and milestone summary as a free PDF or Excel report.</li>
          </ol>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">📌 School &amp; College Admissions</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Calculate exact DOB eligibility as of the school academic cutoff date (e.g. 31st March or 31st July) to ensure minimum age compliance.
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">🏛️ Govt Exams &amp; Job Applications</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Check age eligibility for UPSC, SSC, Banking, Defense, and Railway notifications as on the specific notification cutoff date.
            </p>
          </div>
        </section>

        <section>
          <FAQ faqs={content.faqs} />
        </section>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <Link href="/sarkari-exam-age-calculator" className="text-blue-600 hover:underline font-medium text-sm">
            Check Sarkari Exam Eligibility →
          </Link>
          <LastUpdated date="2026-10-07" />
        </div>
      </article>
    </div>
  );
}
