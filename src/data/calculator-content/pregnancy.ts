export const pregnancyContent = {
  en: {
    pageTitle: 'Pregnancy Due Date Calculator - EDD & Trimester Timeline',
    metaDescription: 'Calculate your Estimated Due Date (EDD) using LMP (Naegele\'s rule), cycle length adjustment, conception date, or IVF transfer milestones.',
    h1: 'Pregnancy Due Date Calculator – Calculate EDD & Trimester Milestones',
    introText:
      'Determine your Estimated Due Date (EDD) and track your gestational pregnancy week-by-week. This clinical obstetric tool supports multiple calculation methods: Last Menstrual Period (LMP) with cycle length adjustment, exact Conception Date, IVF Transfer Date (Day 3 & Day 5), and Ultrasound Dating.',
    howToUse: [
      'Choose your calculation method: Last Menstrual Period (LMP), Conception Date, IVF Transfer, or Ultrasound Scan.',
      'Enter the relevant starting date.',
      'If using LMP, enter your typical menstrual cycle length (default is 28 days).',
      'Instantly view your Estimated Due Date (EDD), current gestational age (weeks + days), trimester timeline, and progress percentage.',
      'Review key clinical screening milestones and diagnostic scan dates for each trimester.',
    ],
    formulaExplanation:
      'Obstetric Due Date calculations use standardized clinical formulas:\n\n1. Naegele\'s Rule (LMP with Cycle Adjustment):\n• Standard 28-day cycle: EDD = LMP + 280 Days (40 Weeks)\n• Adjusted Cycle: EDD = LMP + 280 Days + (Cycle Length - 28 Days)\n• Alternatively: (LMP + 1 Year) - 3 Months + 7 Days\n\n2. Conception Date Method:\n• EDD = Conception Date + 266 Days (38 Weeks)\n\n3. IVF Embryo Transfer Method:\n• Day 5 Blastocyst Transfer: EDD = Transfer Date + 261 Days\n• Day 3 Embryo Transfer: EDD = Transfer Date + 263 Days\n\n4. Trimester Division:\n• 1st Trimester: Weeks 1 – 13 (Day 1 to Day 91)\n• 2nd Trimester: Weeks 14 – 27 (Day 92 to Day 189)\n• 3rd Trimester: Weeks 28 – 40+ (Day 190 to Delivery)',
    solvedExamples: [
      {
        title: 'Standard 28-Day Menstrual Cycle (LMP: Jan 15, 2026)',
        inputs: 'Method: LMP | Date: January 15, 2026 | Cycle Length: 28 Days',
        calculation:
          'EDD = Jan 15, 2026 + 280 days = October 22, 2026.\nEstimated Conception = Jan 29, 2026.',
        result:
          'Estimated Due Date: October 22, 2026 | Full Term Starts: October 1, 2026 (Week 37)',
      },
      {
        title: 'Longer 33-Day Cycle Adjustment (LMP: Feb 1, 2026)',
        inputs: 'Method: LMP | Date: February 1, 2026 | Cycle Length: 33 Days (+5 days adjustment)',
        calculation:
          'Standard EDD = Nov 8, 2026. Adjusted (+5 days) = November 13, 2026.',
        result:
          'Estimated Due Date: November 13, 2026 | Ovulation Occurred at: Day 19',
      },
      {
        title: 'IVF Day 5 Blastocyst Transfer (Transfer: March 10, 2026)',
        inputs: 'Method: IVF Day 5 Blastocyst | Date: March 10, 2026',
        calculation:
          'EDD = March 10, 2026 + 261 days = November 26, 2026.',
        result:
          'Estimated Due Date: November 26, 2026 | Conception Reference: March 5, 2026',
      },
    ],
    tips: [
      'Only about 4% to 5% of babies are born exactly on their estimated due date; a normal full-term delivery window spans 37 to 42 weeks.',
      'First-trimester dating ultrasound (between 11 and 14 weeks) is considered the most accurate method to confirm gestational age if menstrual cycles are irregular.',
      'Start taking daily prenatal supplements with 400–500 mcg of folic acid early to prevent neural tube defects.',
      'Schedule regular antenatal checkups (monthly up to week 28, bi-weekly up to week 36, weekly thereafter).',
    ],
    commonMistakes: [
      'Assuming a standard 28-day cycle if your personal cycle length is consistently 32 or 35 days (leading to early induction pressure).',
      'Confusing gestational age (calculated from LMP) with embryonic age (calculated from conception, which is 2 weeks shorter).',
      'Changing the due date based on late third-trimester ultrasound scans (late scans reflect fetal size variations rather than gestational age).',
    ],
    faqs: [
      {
        question: 'Why is gestational age calculated from the first day of the last period (LMP)?',
        answer:
          'Most women know the exact start date of their last period, whereas the exact day of ovulation and conception is harder to determine. By medical convention (ACOG guidelines), the 40 weeks (280 days) of pregnancy are counted starting from the first day of the last menstrual period.',
      },
      {
        question: 'How accurate is the estimated due date (EDD)?',
        answer:
          'An EDD provides a reference estimate. Approximately 90% of spontaneous births occur within a two-week window before or after the estimated due date (between weeks 37 and 41).',
      },
      {
        question: 'What if my ultrasound due date differs from my LMP due date?',
        answer:
          'If the first-trimester ultrasound dating differs by more than 5 to 7 days from the LMP-calculated date, obstetricians typically adjust the official due date to match the early ultrasound measurement (Crown-Rump Length, CRL).',
      },
      {
        question: 'What are the key scans and screening milestones during pregnancy in India?',
        answer:
          'Major antenatal scans include: Dating/Viability Scan (6-9 weeks), NT/Double Marker Scan (11-13 weeks), TIFFA/Targeted Anomaly Scan (18-20 weeks), and Growth/Color Doppler Scans (28-36 weeks).',
      },
      {
        question: 'What defines a "Full Term" pregnancy?',
        answer:
          'A pregnancy is classified as Early Term between 37 weeks 0 days and 38 weeks 6 days; Full Term between 39 weeks 0 days and 40 weeks 6 days; and Late Term between 41 weeks 0 days and 41 weeks 6 days.',
      },
      {
        question: 'How is the due date calculated for IVF pregnancies?',
        answer:
          'Because the exact embryo age and transfer date are known in IVF, the calculation is exact: add 261 days to the transfer date for a Day-5 blastocyst, or 263 days for a Day-3 embryo.',
      },
    ],
    relatedCalculators: [
      { name: 'Age Calculator', slug: 'age-calculator', description: 'Calculate exact age in years, months, and days' },
      { name: 'BMI Calculator', slug: 'bmi-calculator', description: 'Evaluate body mass index and healthy weight ranges' },
      { name: 'Calorie Calculator', slug: 'calorie-calculator', description: 'Calculate daily energy and pregnancy nutritional needs' },
      { name: 'Date Difference Calculator', slug: 'date-difference-calculator', description: 'Calculate days and weeks between two calendar dates' },
    ],
    lastUpdated: '2026-09-30',
  },
};
