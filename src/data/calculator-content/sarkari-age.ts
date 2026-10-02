export const sarkariAgeContent = {
  en: {
    pageTitle: 'Sarkari Exam Age Calculator - Check Eligibility | CalcMaster',
    metaDescription: 'Calculate exact age as on date for UPSC, SSC, Banking, and Defense exams. Check your age eligibility and category age relaxation online.',
    h1: 'Sarkari Exam Age Eligibility Calculator – Check Age Limit',
    introText: 'Calculate your exact age on the specific exam cutoff date. See if you qualify for government exams like UPSC, SSC CGL, RRB, and IBPS by factoring in age relaxation for OBC, SC/ST, PwD, and Ex-Servicemen.',
    howToUse: [
      'Select your target exam from the preset dropdown (e.g., UPSC CSE, SSC CGL, IBPS PO) or choose "Custom".',
      'The calculator will automatically fill in the official cutoff date, minimum age, and maximum age limit for General category.',
      'Enter your Date of Birth accurately.',
      'Select your reservation category (General, OBC, SC/ST, etc.) to apply category-wise age relaxation rules.',
      'View your precise age in years, months, and days on the cutoff date.',
      'Check the prominent eligibility result showing if you are Eligible ✅, Over-age ❌, or Under-age ⚠️, plus see how many eligible years you have left.',
    ],
    formulaExplanation: `Age for Indian Government exams is strictly calculated as of a specified reference/cutoff date (e.g., 1st August for UPSC or 1st January for SSC).

The calculation works like this:
1. Exact Chronological Age: Your age is calculated in exact years, months, and days between your Date of Birth and the Cutoff Date.
2. Effective Maximum Age: Based on your reservation category, an age relaxation is added to the base maximum age limit. 
   Effective Max Age = Base Max Age + Relaxation (e.g., General Max 32 + OBC 3 years = 35 years).
3. Eligibility Condition: 
   - You must be ≥ Minimum Age limit.
   - You must be < Effective Maximum Age on the cutoff date. Some exams specify "must not have attained" the max age, meaning you must be strictly less than that age.`,
    solvedExamples: [
      {
        title: 'UPSC CSE (IAS/IPS) Example',
        inputs: 'DOB: 15-May-1995 | Cutoff: 1-Aug-2026 | Gen | Limits: 21-32',
        calculation: 'Age on cutoff = 31 Years, 2 Months, 17 Days\nCategory: General (0 years relaxation)\nEffective Max Age: 32 Years\nAge (31) < Max Age (32)',
        result: 'Eligible',
      },
      {
        title: 'SSC CGL Example',
        inputs: 'DOB: 05-Jan-1993 | Cutoff: 1-Jan-2026 | OBC | Limits: 18-32',
        calculation: 'Age on cutoff = 32 Years, 11 Months, 27 Days\nCategory: OBC (3 years relaxation)\nEffective Max Age: 35 Years\nAge (32.99) < Max Age (35)',
        result: 'Eligible',
      },
      {
        title: 'NDA Example',
        inputs: 'DOB: 20-Mar-2007 | Cutoff: 1-Jul-2026 | Gen | Limits: 16.5-19.5',
        calculation: 'Age on cutoff = 19.28 Years (19 Years, 3 Months, 11 Days)\nCategory: General (0 years relaxation)\nEffective Max Age: 19.5 Years\nAge (19.28) < Max Age (19.5)',
        result: 'Eligible',
      },
    ],
    tips: [
      'Always refer to the official notification of the current year. Exam cutoff dates (like Jan 1 vs Aug 1) can occasionally change.',
      'OBC (Non-Creamy Layer) candidates get 3 years of relaxation for central government exams. Ensure you have the NCL certificate.',
      'Age limits can differ between posts within the same exam (e.g., SSC CGL has posts with max age 27, 30, and 32). Pick the correct limits for your target post.',
      'For defense exams like NDA/CDS, limits are very strict and include half-years (e.g., 16.5 to 19.5). Always verify the exact birth date range mentioned in the notification.',
    ],
    commonMistakes: [
      'Confusing the current date with the exam cutoff date. Government exam eligibility is NOT checked against today\'s date.',
      'Assuming state exams follow central exam relaxation rules. State quotas can differ drastically from central OBC/SC/ST relaxations.',
      'Thinking "must not have attained 32 years" means you can apply in your 32nd year. No, it means your exact age must be less than 32 (31 years, 11 months, 29 days is fine).',
      'Forgetting that PwD candidates often get horizontal relaxation over and above their vertical (caste) category.',
    ],
    faqs: [
      {
        question: 'Sarkari exam mein age limit kaise check karein?',
        answer: 'You can check your age limit by selecting your Date of Birth and the exam cutoff date in this calculator. It will precisely calculate your age in years, months, and days and match it against the required age limit.',
      },
      {
        question: 'OBC ko kitne saal ki chhoot milti hai?',
        answer: 'For most central government exams like UPSC, SSC, and Banking, OBC (Non-Creamy Layer) candidates receive an age relaxation of 3 years over the General category age limit.',
      },
      {
        question: 'UPSC mein maximum age kya hai?',
        answer: 'For the UPSC Civil Services Exam (CSE), the base maximum age limit is 32 years. With relaxations, it is 35 years for OBC, 37 years for SC/ST, and up to 42 years for PwD candidates.',
      },
      {
        question: 'SC/ST ko age relaxation kitna milta hai?',
        answer: 'SC and ST candidates generally receive an age relaxation of 5 years for central government examinations.',
      },
      {
        question: 'PwD category mein age limit kya hoti hai?',
        answer: 'Persons with Benchmark Disabilities (PwBD) typically get a 10-year baseline age relaxation. This is cumulative with other categories: PwD+OBC gets 13 years, and PwD+SC/ST gets 15 years.',
      },
      {
        question: 'Age cutoff date kya hota hai?',
        answer: 'The age cutoff date is the specific reference date set by the recruiting commission (e.g., 1st August for UPSC or 1st January for SSC). Your eligibility is based entirely on your exact age on this specific date, not on the day you fill out the form.',
      },
      {
        question: 'Ex-serviceman ko age relaxation kitna milta hai?',
        answer: 'Ex-servicemen usually receive an age relaxation of 3 to 5 years (plus the period of military service rendered) depending on the exam and their specific category.',
      },
      {
        question: 'SSC CGL mein kitni umar tak apply kar sakte hain?',
        answer: 'SSC CGL age limits vary by post. The most common max age limits are 27, 30, and 32 years for General category candidates. Category relaxations apply on top of these limits.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Age Calculator',
        slug: 'age-calculator',
        description: 'Calculate your exact age and next birthday.',
      },
      {
        name: 'Date Difference Calculator',
        slug: 'date-difference-calculator',
        description: 'Calculate exact days between two dates.',
      },
      {
        name: 'Retirement Calculator',
        slug: 'retirement-calculator',
        description: 'Plan your retirement corpus and savings.',
      },
    ],
  },
  hi: {
    pageTitle: 'Sarkari Exam Age Calculator - Check Eligibility | CalcMaster',
    metaDescription: 'यूपीएससी, एसएससी, बैंकिंग और रक्षा परीक्षाओं के लिए अपनी आयु पात्रता और छूट की जांच करें।',
    h1: 'Sarkari Exam Age Eligibility Calculator – Check Age Limit',
    introText: 'सरकारी परीक्षाओं के लिए कटऑफ तिथि पर अपनी सटीक आयु की गणना करें। ओबीसी, एससी/एसटी, और अन्य श्रेणियों के लिए आयु में छूट के साथ अपनी पात्रता की जांच करें।',
  },
};
