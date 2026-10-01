export const dateDifferenceContent = {
  en: {
    pageTitle: 'Date Difference Calculator - Days & Workdays | CalcMaster',
    metaDescription:
      'Calculate exact number of days, weeks, months, and working business days between two dates. Toggle inclusive end date and 5-day or 6-day work weeks now!',
    h1: 'Date Difference Calculator – Calculate Duration Between Two Dates',
    introText:
      'Find the exact calendar duration between any two dates. Calculate total calendar days, working business days (skipping weekends), weeks, months, and hours with customizable end-date inclusion.',
    howToUse: [
      'Select the Start Date and End Date from the calendar pickers.',
      'Check "Include End Date" if you want the final day counted in the total duration (standard for project billing, leases, and leave applications).',
      'Choose your Work Week schedule (5-Day Mon–Fri or 6-Day Mon–Sat) to calculate accurate business working days.',
      'Review the results summary showing total days, working days, weekend days, and full year/month/day breakdown.',
      'Compare two different date spans side-by-side using the Compare mode.',
      'Export the complete schedule and breakdown as a PDF or Excel sheet.',
    ],
    formulaExplanation: `Calculating the difference between two dates involves both chronological calendar interval math and business day filtering.

1. Calendar Duration Breakdown:
• Years = End Year - Start Year
• Months = End Month - Start Month
• Days = End Day - Start Day
(Adjusting for month-end overflows and leap years by borrowing days from preceding calendar months).

2. Working Business Days Calculation:
Iterating daily across the interval [Start Date, End Date):
• If 5-Day Work Week: Exclude Saturdays (Day 6) and Sundays (Day 0).
• If 6-Day Work Week: Exclude Sundays (Day 0) only.
• Working Days = Total Days - Weekend Days.`,
    solvedExamples: [
      {
        title: 'Example 1: Standard Two-Week Interval',
        inputs: 'Start: 1 Jan 2026 (Thu) | End: 15 Jan 2026 (Thu) | Exclude End Date | 5-Day Week',
        calculation: 'Total Days = 14 days\nWeekend Days (2 Saturdays + 2 Sundays) = 4 days\nWorking Days = 14 - 4 = 10 business days',
        result: '14 Calendar Days | 10 Working Days | 2 Full Weeks',
      },
      {
        title: 'Example 2: Inclusive Leave Application Duration',
        inputs: 'Start: 10 Aug 2026 (Mon) | End: 14 Aug 2026 (Fri) | Include End Date = True',
        calculation: 'Total Days = 5 days (Mon, Tue, Wed, Thu, Fri)\nWeekend Days = 0\nWorking Days = 5 business days',
        result: '5 Days (All 5 Working Days)',
      },
      {
        title: 'Example 3: Long Project Timeline (6-Day Work Week)',
        inputs: 'Start: 1 Jan 2026 | End: 1 April 2026 | 6-Day Work Week (Mon-Sat)',
        calculation: 'Total Days = 90 days (3 Months)\nSundays count = 13 days\nWorking Days = 90 - 13 = 77 days',
        result: '3 Months (90 Days) | 77 Working Days',
      },
    ],
    tips: [
      'For formal employment leave applications, hotel bookings, and equipment rentals, verify whether the end date is inclusive or exclusive.',
      'In India, banking and IT sectors predominantly follow a 5-day work week, while manufacturing, retail, and construction frequently operate on a 6-day schedule.',
      'For statutory legal notices (e.g. 15-day cheque bounce notice u/s 138 NI Act or 30-day notice periods), the starting day is typically excluded and the final day included.',
      'Use this tool to track project sprint velocity and expected delivery timelines.',
    ],
    commonMistakes: [
      'Forgetting whether the final day is included in legal and contractual agreements.',
      'Assuming all weeks contain exactly 5 working days when public and national holidays coincide.',
      'Overlooking leap years when computing spans over multiple years.',
      'Confusing calendar days with statutory business working days.',
    ],
    faqs: [
      {
        question: 'What is the difference between including and excluding the end date?',
        answer:
          'Excluding the end date measures elapsed time (e.g., from Monday noon to Tuesday noon is 1 day). Including the end date counts both the starting date and ending date as active full days (e.g., Monday through Tuesday is 2 days).',
      },
      {
        question: 'Does the working days calculation skip public holidays?',
        answer:
          'This calculator filters out weekend days (Saturdays and Sundays for 5-day weeks, and Sundays for 6-day weeks). Public holidays vary by state, nation, and company policy, so statutory holidays should be deducted separately.',
      },
      {
        question: 'How are leap years handled?',
        answer:
          'The calculator accounts for leap years (such as 2024, 2028, 2032) automatically, ensuring exact day counts over multi-year ranges.',
      },
      {
        question: 'Can I reverse the start and end dates?',
        answer:
          'Yes. If the end date entered occurs before the start date, the calculator automatically detects the reverse direction and computes the accurate elapsed duration.',
      },
      {
        question: 'How is the total weeks value calculated?',
        answer:
          'Total weeks equals total calendar days divided by 7, rounded to 1 decimal place, alongside the count of full completed weeks.',
      },
      {
        question: 'Why is a 6-day work week option provided?',
        answer:
          'Many industries, educational institutions, retail businesses, and public offices in India operate 6 days a week (Monday to Saturday), making a 6-day calculation essential for project planning.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Age Calculator',
        slug: 'age-calculator',
        description: 'Calculate exact chronological age, months, and days.',
      },
      {
        name: 'Pregnancy Due Date Calculator',
        slug: 'pregnancy-due-date-calculator',
        description: 'Estimate due date and gestational timeline.',
      },
      {
        name: 'Simple Interest Calculator',
        slug: 'simple-interest-calculator',
        description: 'Calculate interest across exact days, months, and years.',
      },
    ],
  },
  hi: {
    pageTitle: 'Date Difference Calculator - दो तारीखों के बीच के दिन और वर्किंग डेज',
    metaDescription: 'दो तारीखों के बीच कुल दिन, हफ्ते, महीने और कामकाजी दिनों की सटीक गणना करें।',
    h1: 'तारीखों के बीच का अंतर कैलकुलेटर (Date Difference Calculator)',
    introText: 'किसी भी दो तारीखों के बीच के कुल दिन, कार्य दिवस (Working Days), सप्ताहांत और महीने आसानी से निकालें।',
  },
};
