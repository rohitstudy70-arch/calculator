export const eddContent = {
  en: {
    pageTitle: 'EDD Calculator & Tracker - Calculate Due Date | CalcMaster',
    metaDescription:
      'Calculate your Estimated Due Date (EDD) & track pregnancy week by week using LMP, conception date or IVF. Get clinical scan timeline & milestone tracker.',
    h1: 'EDD Calculator & Pregnancy Tracker – Calculate Estimated Due Date',
    introText:
      'Accurately calculate your Estimated Due Date (EDD) and track your pregnancy week by week. Supports Naegele\'s rule (LMP with menstrual cycle adjustments), exact conception date, IVF embryo transfer (Day 3 & Day 5), and ultrasound gestational dating.',
    howToUse: [
      'Select your calculation method: Last Menstrual Period (LMP), Conception Date, IVF Embryo Transfer, or Ultrasound Scan.',
      'Enter the date of your last period or conception.',
      'Adjust your average menstrual cycle length (default is 28 days; adjusts if your cycle is shorter or longer).',
      'Instantly view your calculated Estimated Due Date (EDD), exact gestational age (weeks and days), and remaining delivery countdown.',
      'Track your current trimester and view upcoming prenatal milestones, ultrasound scan windows, and screening tests.',
      'Export or print your complete EDD timeline and medical schedule as a PDF or Excel report.',
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
        question: 'What is EDD in pregnancy and how is it calculated?',
        answer:
          'EDD stands for Estimated Due Date (or Estimated Date of Delivery). It is the predicted date on which spontaneous labor is expected. It is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP) according to Naegele\'s rule.',
      },
      {
        question: 'How accurate is an EDD calculator?',
        answer:
          'While only about 4-5% of babies are born on the exact day of their EDD, roughly 80% to 90% of healthy infants are born within a two-week window (between 37 and 42 weeks of gestation). It serves as a vital clinical benchmark to monitor fetal development and plan medical checkups.',
      },
      {
        question: 'How do you calculate EDD if periods are irregular?',
        answer:
          'If you have irregular menstrual cycles or PCOS, LMP calculations may be inaccurate. In such cases, an early first-trimester ultrasound scan (performed between 7 and 13 weeks measuring Crown-Rump Length) provides the most reliable Estimated Due Date.',
      },
      {
        question: 'Can the EDD date change during pregnancy?',
        answer:
          'Yes. If an early dating ultrasound scan (before 14 weeks) shows a discrepancy of more than 5 to 7 days compared to the LMP-calculated date, your healthcare provider may formally update your official EDD to match the ultrasound measurements.',
      },
      {
        question: 'How is EDD calculated for IVF pregnancies?',
        answer:
          'For IVF pregnancies, the exact embryo transfer date and embryonic age are precisely known. For a Day 5 blastocyst transfer, the EDD is calculated as Transfer Date + 261 days. For a Day 3 embryo transfer, it is Transfer Date + 263 days.',
      },
      {
        question: 'What is the difference between gestational age and fetal age?',
        answer:
          'Gestational age is measured from the first day of your last menstrual period (LMP) and is typically 40 weeks. Fetal age (conceptional age) is measured from the actual time of fertilization and is approximately two weeks shorter (38 weeks).',
      },
      {
        question: 'What are the main pregnancy trimesters and week milestones?',
        answer:
          'Pregnancy is divided into three trimesters: First Trimester (Week 1 through Week 13), Second Trimester (Week 14 through Week 27), and Third Trimester (Week 28 through Delivery). A baby reaches full term at 37 completed weeks.',
      },
      {
        question: 'When should I schedule the main ultrasound scans during pregnancy?',
        answer:
          'Key prenatal scans include the Early Dating / Viability Scan (weeks 6-9), Nuchal Translucency / NT Scan (weeks 11-13), Fetal Anomaly / Level II Scan (weeks 18-20), and Growth / Doppler Scans during the third trimester (weeks 28-36).',
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
