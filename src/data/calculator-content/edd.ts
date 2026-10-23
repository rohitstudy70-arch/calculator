export const eddContent = {
  en: {
    pageTitle: 'EDD Calculator by LMP & USG – Calculate Your Due Date',
    metaDescription:
      'Calculate your estimated pregnancy due date with CalcMaster\'s free EDD Calculator using LMP, USG, or due date to track gestational age and pregnancy weeks.',
    h1: 'EDD Calculator by LMP & USG – Calculate Your Due Date',
    introText:
      'Calculate your estimated pregnancy due date with CalcMaster\'s free EDD Calculator. Use your Last Menstrual Period (LMP), ultrasound scan (USG), or other supported pregnancy dating information to estimate your due date, gestational age, pregnancy weeks, and remaining days until delivery.',
    howToUse: [
      'Select the LMP, USG (Ultrasound), or Due Date calculation method.',
      'Enter the first day of your last menstrual period, scan date, or known due date.',
      'Enter or adjust your average menstrual cycle length if the calculator provides that option.',
      'Calculate your estimated due date.',
      'Review your estimated pregnancy weeks, gestational age, and other results supported by the calculator.',
      'Consult your healthcare professional about the best method to date your pregnancy.',
    ],
    formulaExplanation: `Obstetricians and maternal healthcare providers calculate the Estimated Due Date (EDD) using established clinical rules:

1. Naegele's Rule (LMP with Cycle Adjustment):
• Standard 28-day cycle: EDD = LMP + 280 Days (40 Weeks / 10 Lunar Months)
• Cycle Length Adjustment: EDD = LMP + 280 Days + (Cycle Length - 28 Days)
• Quick Calculation: (LMP Date + 1 Year) - 3 Months + 7 Days (for a standard 28-day cycle).

2. Conception Date Method (Ovulation):
• EDD = Conception Date + 266 Days (38 Weeks / 266 Gestational Days from fertilization).

3. IVF Embryo Transfer Method:
• Day 5 Blastocyst Transfer: EDD = Transfer Date + 261 Days
• Day 3 Embryo Transfer: EDD = Transfer Date + 263 Days

4. Ultrasound Dating (Crown-Rump Length):
• EDD = Ultrasound Date + (280 - Gestational Age in Days at Scan). First-trimester crown-rump length (CRL) is considered the most accurate baseline if LMP is uncertain.

5. Gestational Trimesters:
• 1st Trimester: Conception to 13 Weeks 6 Days (Organogenesis)
• 2nd Trimester: 14 Weeks to 27 Weeks 6 Days (Rapid Growth)
• 3rd Trimester: 28 Weeks to Delivery (Maturation & Weight Gain)`,
    solvedExamples: [
      {
        title: 'Example 1: Regular 28-Day Cycle via LMP',
        inputs: 'LMP: 1 February 2026 | Cycle Length: 28 Days',
        calculation:
          'EDD = Feb 1, 2026 + 280 Days\nEstimated Conception = Feb 15, 2026 (Day 14)\nFull-term milestone = Oct 18, 2026 (Week 37)',
        result: 'Estimated Due Date (EDD): November 8, 2026 (40 Weeks 0 Days)',
      },
      {
        title: 'Example 2: Longer 32-Day Menstrual Cycle',
        inputs: 'LMP: 10 January 2026 | Cycle Length: 32 Days (+4 days adjustment)',
        calculation:
          'Standard EDD = Oct 17, 2026\nAdjusted EDD (+4 days for delayed ovulation) = Oct 21, 2026\nEstimated Ovulation = Day 18',
        result: 'Estimated Due Date (EDD): October 21, 2026',
      },
      {
        title: 'Example 3: IVF Day-5 Blastocyst Embryo Transfer',
        inputs: 'Method: IVF Day 5 | Transfer Date: 15 March 2026',
        calculation:
          'EDD = March 15, 2026 + 261 Days\nEquivalent LMP Date = March 1, 2026',
        result: 'Estimated Due Date (EDD): December 1, 2026',
      },
    ],
    tips: [
      'Only 4% to 5% of babies arrive on their exact calculated EDD. A normal full-term birth window spans anywhere between 37 weeks and 42 weeks.',
      'If your first-trimester dating ultrasound scan differs from your LMP date by more than 7 days, obstetricians generally adopt the ultrasound EDD.',
      'Track your gestational weeks carefully to schedule critical prenatal tests on time: NT scan (weeks 11-13), Anomaly scan (weeks 18-20), and Gestational Diabetes screen (weeks 24-28).',
      'If you have irregular periods or PCOS, calculate your EDD using an early dating ultrasound scan rather than LMP.',
    ],
    commonMistakes: [
      'Assuming pregnancy is strictly 9 calendar months. Medically, gestational age is measured as 40 completed weeks (280 days) from the first day of your last period.',
      'Forgetting to adjust for menstrual cycle lengths longer or shorter than 28 days when using Naegele\'s rule.',
      'Confusing the conception date with the LMP date (LMP is approximately 2 weeks earlier than conception).',
      'Panicking if delivery does not occur exactly on the calculated EDD; normal labor usually occurs within two weeks before or after.',
    ],
    faqs: [
      {
        question: 'What is the full form of EDD?',
        answer:
          'EDD stands for Estimated Due Date, also known as the estimated date of delivery. It is the approximate date a baby is expected to be born.',
      },
      {
        question: 'How do I calculate EDD by LMP?',
        answer:
          'For a typical 28-day menstrual cycle, add 280 days, or 40 weeks, to the first day of your last menstrual period. The result is an estimated due date. Cycle irregularity or uncertainty about the LMP can affect accuracy.',
      },
      {
        question: 'Is an EDD calculator by USG more accurate than an LMP calculator?',
        answer:
          'An early ultrasound is generally the most accurate ultrasound method for establishing or confirming pregnancy dating. LMP-based estimates can also be useful when the date is known and cycles are regular. Your clinician considers the available information to establish the best estimated due date.',
      },
      {
        question: 'How do I calculate pregnancy weeks by LMP?',
        answer:
          'Count the time from the first day of your last menstrual period to the reference date. Express the elapsed time in completed weeks and remaining days. The method estimates gestational age, not the exact time since conception.',
      },
      {
        question: 'Can I calculate pregnancy weeks using my EDD?',
        answer:
          'Yes, approximately, if your EDD has been established using a 40-week pregnancy framework. Subtract the days remaining until the EDD from 280 days to estimate gestational age. Follow the gestational age documented by your healthcare professional if it differs.',
      },
      {
        question: 'What is the difference between EDD and gestational age?',
        answer:
          'EDD is the estimated date when the baby is due, while gestational age describes how far the pregnancy has progressed in weeks and days.',
      },
      {
        question: 'Does an EDD calculator work with irregular periods?',
        answer:
          'An LMP-based calculator can produce an estimate, but irregular cycles or uncertain ovulation may reduce accuracy. An ultrasound and clinical assessment may help establish more reliable pregnancy dating.',
      },
      {
        question: 'Can an EDD calculator predict the exact delivery date?',
        answer:
          'No. EDD is an estimate, not a guarantee that delivery will happen on that date. Actual delivery timing varies from pregnancy to pregnancy.',
      },
      {
        question: "Is CalcMaster's EDD calculator the same as UpToDate?",
        answer:
          'No. CalcMaster is an independent online calculator, not an UpToDate product or affiliated service. UpToDate is a separate clinical information resource. For individual pregnancy care, follow the estimated due date documented by your healthcare professional.',
      },
      {
        question: 'Should I use my LMP date or the EDD on my ultrasound report?',
        answer:
          'If you have an ultrasound report with an established EDD, compare it with your LMP-based estimate and discuss any difference with your clinician. Do not independently replace a clinically established due date with a calculator result.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Pregnancy Due Date Calculator',
        slug: 'pregnancy-due-date-calculator',
        description: 'Comprehensive gestational milestone and trimester scheduler.',
      },
      {
        name: 'BMI Calculator',
        slug: 'bmi-calculator',
        description: 'Check healthy pre-pregnancy and postpartum body mass index.',
      },
      {
        name: 'Calorie Calculator',
        slug: 'calorie-calculator',
        description: 'Calculate daily energy and nutrition requirements.',
      },
    ],
  },
  hi: {
    pageTitle: 'EDD Calculator - डिलीवरी की तारीख और प्रेग्नेंसी ट्रैकर',
    metaDescription:
      'अपने अंतिम मासिक धर्म (LMP), गर्भाधान या IVF की तारीख से अपनी अपेक्षित डिलीवरी तारीख (EDD) निकालें और सप्ताह-दर-सप्ताह प्रेग्नेंसी ट्रैक करें।',
    h1: 'ईडीडी कैलकुलेटर और प्रेग्नेंसी ट्रैकर (EDD Calculator & Tracker)',
    introText:
      'अपनी अनुमानित डिलीवरी की तारीख (EDD) की सटीक गणना करें और सप्ताह-दर-सप्ताह अपनी गर्भावस्था के विकास को ट्रैक करें। एलएमपी (LMP), गर्भाधान तिथि और आईवीएफ (IVF) पद्धतियों का समर्थन करता है।',
  },
};
