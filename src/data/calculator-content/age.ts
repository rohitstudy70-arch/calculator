export const ageContent = {
  en: {
    pageTitle: 'Age Calculator - Exact Age in Years, Months, Days & Next Birthday',
    metaDescription:
      'Calculate your exact age in years, months, days, hours, and minutes. Find days until your next birthday, zodiac sign, and milestone dates online.',
    h1: 'Age Calculator – Exact Age in Years, Months & Days',
    introText:
      'Determine your chronological age accurately between your date of birth and any reference date. View total days lived, hours, minutes, countdown to your next birthday, and life milestone timeline.',
    howToUse: [
      'Select your Date of Birth using the calendar picker.',
      'Optionally change the "Age at Date" field if you want to calculate your age on a specific future or past date (defaults to today).',
      'Instantly view your exact age broken down in years, months, and days.',
      'Check detailed cumulative statistics including total days, weeks, hours, minutes, and days until your next birthday.',
      'Compare your age with a friend, partner, or family member using the Compare Scenarios mode.',
      'Download your age and milestone summary as a PDF or Excel report.',
    ],
    formulaExplanation: `Age calculation accounts for calendar variations, differing days per month (28, 29, 30, or 31), and leap years.

The exact algorithm:
1. Difference in Years = Target Year - Birth Year
2. Difference in Months = Target Month - Birth Month
3. Difference in Days = Target Day - Birth Day
4. If Target Day < Birth Day, borrow the exact number of days from the preceding month and decrement the month difference by 1.
5. If Target Month < Birth Month, borrow 12 months from the year and decrement the year difference by 1.

Cumulative Units:
• Total Days = (Target Timestamp - Birth Timestamp) / (1000 × 60 × 60 × 24)
• Total Hours = Total Days × 24
• Total Minutes = Total Hours × 60`,
    solvedExamples: [
      {
        title: 'Example 1: Standard Age Calculation',
        inputs: 'Birth Date: 15 May 1995 | Target Date: 1 Oct 2026',
        calculation: 'Years = 2026 - 1995 = 31\nMonths = 10 - 5 = 5 (borrow 1 for days -> 4 months)\nDays = 1 - 15 -> Borrow 30 days (Sept) -> 16 days',
        result: 'Exact Age: 31 Years, 4 Months, 16 Days (Total: 11,462 Days)',
      },
      {
        title: 'Example 2: Leap Year Birthdate',
        inputs: 'Birth Date: 29 Feb 2000 | Target Date: 1 March 2026',
        calculation: 'Years = 2026 - 2000 = 26\nMonths = 3 - 2 = 1 (borrow 1 for days -> 0 months)\nDays = 1 - 29 -> Borrow 28 days (Feb 2026) -> 1 day',
        result: 'Exact Age: 26 Years, 0 Months, 1 Day',
      },
      {
        title: 'Example 3: Child School Admission Age',
        inputs: 'Birth Date: 12 July 2020 | School Cutoff: 31 March 2026',
        calculation: 'Years = 2026 - 2020 = 6\nMonths = 3 - 7 -> Borrow 12 -> 15 - 7 = 8 months\nDays = 31 - 12 = 19 days',
        result: 'Exact Age: 5 Years, 8 Months, 19 Days',
      },
    ],
    tips: [
      'For school admissions, competitive exams (UPSC/SSC), and government job applications, always enter the exact notification cutoff date in "Age at Date".',
      'For passport and visa applications, age is verified up to the exact day of application submission.',
      'Retirement benefits and gratuity calculations count completed six-month blocks of service.',
      'Check the days remaining until your next birthday to plan milestones and celebrations in advance.',
    ],
    commonMistakes: [
      'Assuming all months have 30 days or that a year is simply 365 days, which leads to errors around February and leap years.',
      'Entering future dates or mixing up DD/MM/YYYY and MM/DD/YYYY date formats.',
      'Overlooking official cutoff dates when checking age eligibility for competitive examinations.',
      'Confusing biological age with solar calendar chronological age.',
    ],
    faqs: [
      {
        question: 'How does this calculator handle leap years?',
        answer:
          'The calculator uses real Gregorian calendar rules. Leap years (including Feb 29) are accurately factored into both chronological year/month/day calculations and total elapsed days.',
      },
      {
        question: 'Can I calculate my age on a specific future or past date?',
        answer:
          'Yes. By adjusting the "Age at Date" field, you can calculate how old you were on a specific historical date or how old you will be on a future date (such as a retirement date or exam cutoff).',
      },
      {
        question: 'How is the next birthday countdown calculated?',
        answer:
          'The calculator checks your birthday month and day in the current year. If that date has already passed, it calculates the remaining days until your birthday in the next calendar year.',
      },
      {
        question: 'How do Indian government exam age cutoffs work?',
        answer:
          'Most Indian exams (UPSC CSE, SSC CGL, Banking exams, Defense) set a specific reference date (e.g., 1st August or 1st January). Set this cutoff date in the "Age at Date" field to verify eligibility.',
      },
      {
        question: 'What is the difference between total months and exact months?',
        answer:
          'Exact months represent the remaining months after full completed years. Total months represent your total lifetime duration expressed purely in months (Years × 12 + Months).',
      },
      {
        question: 'Why does zodiac sign depend on birth date?',
        answer:
          'Tropical astrology assigns one of 12 Western zodiac signs based on the sun position corresponding to your calendar birth date range.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Date Difference Calculator',
        slug: 'date-difference-calculator',
        description: 'Calculate days, weeks, and working days between two dates.',
      },
      {
        name: 'Pregnancy Due Date Calculator',
        slug: 'pregnancy-due-date-calculator',
        description: 'Estimate due date, trimester schedule, and fetal progress.',
      },
      {
        name: 'Retirement Calculator',
        slug: 'retirement-calculator',
        description: 'Plan required corpus and monthly investments based on retirement age.',
      },
    ],
  },
  hi: {
    pageTitle: 'Age Calculator - सही उम्र साल, महीने और दिनों में जानें',
    metaDescription: 'अपनी सटीक उम्र साल, महीने, दिन, घंटे और मिनटों में निकालें। अगले जन्मदिन की उल्टी गिनती ऑनलाइन देखें।',
    h1: 'आयु कैलकुलेटर (Age Calculator) – सही उम्र की गणना करें',
    introText: 'अपनी जन्म तिथि दर्ज करके अपनी सटीक उम्र, कुल दिन, घंटे, मिनट और अगले जन्मदिन के बचे हुए दिन जानें।',
  },
};
