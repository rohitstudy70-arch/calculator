import React, { Suspense } from 'react';
import { Metadata } from 'next';
import AgeCalculator from '@/components/calculators/AgeCalculator';
import { ageContent } from '@/data/calculator-content/age';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: ageContent.en.pageTitle,
  },
  description: ageContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/age-calculator',
  },
  openGraph: {
    title: ageContent.en.pageTitle,
    description: ageContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/age-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: ageContent.en.pageTitle,
    description: ageContent.en.metaDescription,
  },
};

export default function AgeCalculatorPage() {
  const content = ageContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Date & Time Calculators', href: '/date-time-calculators' },
    { label: 'Age Calculator', href: '/age-calculator' },
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
    name: 'Free Age Calculator by Date of Birth',
    applicationCategory: 'UtilityApplication',
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
          Free Age Calculator by Date of Birth
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mb-4">
          Calculate your exact age online with the free CalcMaster Age Calculator. Enter your date of birth to find your age in years, months and days. Whether you are looking for an age calculator by date of birth, a free online age calculator, or a simple date of birth calculator to find your age, CalcMaster makes age calculation simple and convenient.
        </p>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
          You can use this age calculator online to work out your current age, check the age difference between two dates, or find out how old someone was in a particular year. Instead of calculating manually, enter the required dates and let the calculator do the work.
        </p>
      </div>

      {/* Interactive Calculator Component */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />}>
        <AgeCalculator />
      </Suspense>

      <div className="my-12">
        <AdSlot id="age-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      {/* Exact User Content Article */}
      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What Is an Age Calculator?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            An age calculator is an online tool that calculates the time between a person&apos;s date of birth and a selected date. The result is commonly expressed in completed years, months and days.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            A reliable age calculator by date of birth considers the month and day of birth, rather than simply subtracting the birth year from the current year. This helps you understand your actual chronological age more accurately.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For example, if your date of birth is 15 May 2007 and the selected date is 15 May 2025, your age on that date is exactly 18 years. If your birthday has not yet occurred during the selected year, your completed age will be one year less than the simple difference between the two years.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            CalcMaster provides a convenient way to calculate age online without performing these calculations yourself.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use the Age Calculator Online
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Follow these simple steps to calculate your age by date of birth:
          </p>
          <div className="mt-4 bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700 not-prose">
            <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <li>
                <strong>Enter your date of birth:</strong> Select the correct day, month and year from the date input.
              </li>
              <li>
                <strong>Choose the calculation date:</strong> Use the current date to calculate your present age, or enter a different date if you want to know your age in the past.
              </li>
              <li>
                <strong>Calculate your age:</strong> Click the calculate button to process the dates.
              </li>
              <li>
                <strong>Check the result:</strong> Review your calculated age in years, months and days, as displayed by the calculator.
              </li>
            </ol>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3 italic">
              Always enter the correct date of birth. Even a one-day difference can affect the calculated result when a birthday is close to the selected date.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Age Calculator by Date of Birth Free Online
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Looking for an age calculator by date of birth free online? CalcMaster helps you calculate age using your birth date without complicated manual calculations.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            A date of birth age calculator is useful when you need to check your age for everyday planning, school or college forms, job applications, birthday planning, or personal records. Make sure you follow the age and date requirements stated by the relevant organisation when completing an official form.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            The calculator provides a date-based result. For official eligibility, admission, employment or legal purposes, always check the specific rules that apply to your situation.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Can I Calculate My Real Age?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To calculate your real age, compare your full date of birth with the date on which you want to know your age.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Subtract your birth year from the selected year. Then check whether your birthday has already occurred during that year. If it has not, subtract one from the year difference to obtain your completed age in years.
          </p>
          <div className="mt-4 p-5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900 text-sm text-gray-800 dark:text-gray-200 not-prose">
            <p className="font-semibold mb-2 text-blue-900 dark:text-blue-300">For example:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Date of birth: 15 May 2007</li>
              <li>Calculation date: 26 October 2025</li>
              <li>Completed age: 18 years</li>
            </ul>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For a result in years, months and days, you must also account for the calendar months and the number of days between the dates. Using an online age calculator is an easier way to perform this calculation accurately.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Date of Birth Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A date of birth calculator helps you calculate age from a complete birth date. It can be more accurate than a birth-year calculator because it takes the actual birthday into account.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Enter your day, month and year of birth to calculate your age on the selected date. If you only know a person&apos;s birth year, you can estimate their age by subtracting the birth year from the year being checked. However, the exact completed age may differ by one year depending on whether their birthday has passed.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Use CalcMaster as a simple date of birth calculator whenever you need to work out an age from calendar dates.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Date of Birth Calculator by Year
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A date of birth calculator by year is useful when you want to estimate how old a person was in a particular calendar year.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For example, someone born in 2007 would reach the age of 18 during 2025. Before their birthday in 2025, they would still be 17. After their birthday, they would be 18.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            The basic year calculation is:
          </p>
          <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-xl font-mono text-center my-3 text-sm sm:text-base font-bold text-blue-700 dark:text-blue-400 break-words overflow-x-auto not-prose">
            Estimated age = Selected year − Birth year
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This formula gives the difference between the years. To determine the actual completed age, you must also consider the person&apos;s birthday.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For a precise result, use the full date of birth instead of the birth year alone.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Old Is Someone Born in 2007 in 2025?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If someone was born in 2007, the difference between 2025 and 2007 is 18 years.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            However, their exact age in 2025 depends on their date of birth:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-gray-700 dark:text-gray-300 mt-2">
            <li>Before their birthday in 2025, they are 17 years old.</li>
            <li>On and after their birthday in 2025, they are 18 years old.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For example, a person born on 15 May 2007 turns 18 on 15 May 2025.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            This is why a date of birth calculator is more useful than calculating age using only the birth year.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How Can I Know My Actual Age?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The most reliable way to know your actual chronological age is to use your complete date of birth and the date on which you want to calculate your age.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Your actual age in completed years changes on your birthday. Your age expressed in years, months and days also depends on the calendar dates being compared.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            To get your result, enter your correct date of birth into the CalcMaster Age Calculator and use the current date as the calculation date. For applications or official documents, use the date of birth recorded in your valid documents whenever required.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Age Calculator Google: Calculate Age Online
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Searching for an age calculator on Google? You can use CalcMaster&apos;s online age calculator to work out your age by entering your date of birth.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            You do not need to subtract years, count months manually or work out the difference between calendar dates yourself. Enter your birth date, calculate the result and review your age.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Whether you search for an age calculator Google, an online age calculator, or an age calculator online by date of birth, choose a calculator that uses the full dates when you need an exact result.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Age Calculator App vs Online Age Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            An age calculator app and an online age calculator are designed to help users determine their age from a date of birth.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            An online calculator can be accessed through a compatible web browser, while a downloadable app may provide additional features depending on its design. If you prefer not to install a separate application, you can use the CalcMaster age calculator directly through its website.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            For accurate results, ensure that the calculator uses the correct birth date, calculation date and calendar system.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            एज कैलकुलेटर – जन्म तिथि से अपनी उम्र जानें
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            CalcMaster का एज कैलकुलेटर आपकी जन्म तिथि के आधार पर उम्र निकालने में मदद करता है। अपनी जन्म तिथि, महीना और साल दर्ज करें और चुनी गई तारीख पर अपनी उम्र जानें।
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            जन्म तिथि से आयु कैलकुलेटर का उपयोग करके आप अपनी उम्र साल, महीने और दिनों में समझ सकते हैं। यदि आपको किसी खास साल में अपनी उम्र जाननी है, तो उस साल और अपनी जन्म तिथि के आधार पर उम्र की गणना करें।
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            ध्यान रखें कि केवल जन्म वर्ष घटाने से हमेशा आपकी सही उम्र नहीं मिलती। उस साल आपका जन्मदिन हो चुका है या नहीं, यह भी देखना जरूरी है।
          </p>
        </section>

        {/* Section 12 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            आयु कैलकुलेटर का उपयोग कैसे करें?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            आयु कैलकुलेटर का उपयोग करना आसान है। अपनी सही जन्म तिथि दर्ज करें, गणना की तारीख चुनें और कैलकुलेट बटन पर क्लिक करें। आपको चुनी गई तारीख के अनुसार अपनी उम्र का परिणाम मिलेगा।
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            उदाहरण के लिए, यदि आपकी जन्म तिथि 15 मई 2007 है, तो 15 मई 2025 को आपकी उम्र 18 साल होगी। यदि गणना की तारीख 15 मई 2025 से पहले है, तो आपकी पूरी हुई उम्र अभी 17 साल होगी।
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            यह ऑनलाइन एज कैलकुलेटर जन्म तिथि से उम्र की गणना को आसान बनाता है।
          </p>
        </section>

        {/* Section 13 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Age Calculator Nepali
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you are looking for an Age Calculator Nepali, first check which calendar the calculator supports. Nepal commonly uses the Bikram Sambat (BS) calendar alongside the Gregorian calendar.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            If your date of birth is recorded in the Nepali calendar and the calculator accepts only Gregorian dates, you may need to convert your birth date to the Gregorian calendar before calculating your age. Use a reliable calendar conversion tool and verify the converted date.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            The final result depends on the dates and calendar system accepted by the calculator. Do not assume that a Gregorian date input automatically supports Bikram Sambat dates.
          </p>
        </section>

        {/* Section 14 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What Is a Death Age Calculator?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A death age calculator is a search term sometimes used for tools that claim to estimate life expectancy or predict how long someone might live.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            A regular age calculator cannot predict when a person will die. It calculates chronological age from dates and should not be confused with a medical assessment or a life expectancy estimate.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            If you are calculating someone&apos;s current age, use a date of birth calculator. Any discussion of life expectancy involves uncertainty and should not be treated as a prediction of an individual&apos;s death.
          </p>
        </section>

        {/* Section 15 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Age Calculator Formula
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The basic age calculation begins by subtracting the birth year from the calculation year.
          </p>
          <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-xl font-mono text-center my-3 text-sm sm:text-base font-bold text-blue-700 dark:text-blue-400 break-words overflow-x-auto not-prose">
            Year difference = Calculation year − Birth year
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Then check the month and day of birth:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
            <li>If the birthday has not occurred in the selected year, subtract one from the year difference to obtain completed years.</li>
            <li>If the birthday has occurred, the year difference gives the completed age in years.</li>
            <li>To calculate months and days, compare the complete birth date with the selected date and account for the calendar&apos;s month lengths and leap years.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            An online age calculator performs these date comparisons automatically, helping you avoid errors from manual calculations.
          </p>
        </section>

        {/* Section 16: FAQs */}
        <section className="not-prose pt-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <FAQ items={content.faqs} />
        </section>

        {/* Section 17 */}
        <section className="bg-gray-50 dark:bg-gray-800/60 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 not-prose">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Calculate Your Age With CalcMaster
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
            Use the CalcMaster Age Calculator to calculate your age online by date of birth. Whether you need a quick birth-year age estimate or a more precise result in years, months and days, entering the correct dates makes the calculation easier.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
            For the best result, use your full date of birth instead of relying only on the birth year. CalcMaster helps simplify everyday date calculations so you can spend less time calculating manually and more time on what matters to you.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Related Calculators
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
