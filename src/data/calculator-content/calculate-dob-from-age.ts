export const calculateDobFromAgeContent = {
  en: {
    pageTitle: 'Calculate DOB from Age - Reverse Age Calculator | CalcMaster',
    metaDescription:
      'Calculate DOB from age online: find your exact birth date from age in years, months & days. Reverse age calculator with day of week & horoscope sign free.',
    h1: 'Calculate DOB from Age – Reverse Birth Date Calculator',
    introText:
      'Need to calculate DOB from age? Use our reverse age calculator to find your exact date of birth, day of the week, and zodiac sign from your given age in years, months, and days relative to today or any reference date.',
    howToUse: [
      'Enter your current age in completed Years (e.g., 25).',
      'Optionally enter additional completed Months (0 to 11) and Days (0 to 31).',
      'Select the reference "As of Date" (defaults to today; change it for job applications or exam cutoff dates).',
      'Instantly view your calculated Date of Birth (DOB) in full format (e.g., 15 August 2000).',
      'Check the day of the week you were born on (Monday, Tuesday, etc.) and your astrological zodiac sign.',
      'Export your reverse birth date verification report to PDF or Excel with a single click.',
    ],
    formulaExplanation: `Calculating Date of Birth (DOB) from Age is the mathematical reverse of chronological age calculation.

Given:
• Reference Date: $Y_{ref}, M_{ref}, D_{ref}$
• Age: $Y_{age}$ years, $M_{age}$ months, $D_{age}$ days

Algorithm:
1. Target Year = $Y_{ref} - Y_{age}$
2. Target Month = $M_{ref} - M_{age}$
3. Target Day = $D_{ref} - D_{age}$
4. Day Borrowing: If $D_{target} \\le 0$, subtract 1 from $M_{target}$ and add the total days of the previous month ($DaysInPrevMonth$).
5. Month Borrowing: If $M_{target} < 0$, subtract 1 from $Y_{target}$ and add 12 to $M_{target}$.
6. Verify Gregorian Calendar validity: Ensure February leap year adjustments ($29$ vs $28$ days) are accurately calculated.`,
    solvedExamples: [
      {
        title: 'Example 1: Exact Years Age (25 Years Old Today)',
        inputs: 'Age: 25 Years, 0 Months, 0 Days | As of Date: 7 October 2026',
        calculation: 'Year = 2026 - 25 = 2001\nMonth = October (10)\nDay = 7',
        result: 'Date of Birth: 7 October 2001 (Sunday, Zodiac: Libra)',
      },
      {
        title: 'Example 2: Age with Years, Months & Days (Competitive Exam Cutoff)',
        inputs: 'Age: 28 Years, 4 Months, 12 Days | Cutoff Date: 1 August 2026',
        calculation: 'Year = 2026 - 28 = 1998\nMonth = 8 - 4 = 4 (April)\nDay = 1 - 12 -> Borrow March (31 days) -> Month = March (3), Day = 31 + 1 - 12 = 20',
        result: 'Date of Birth: 20 March 1998 (Friday, Zodiac: Pisces)',
      },
      {
        title: 'Example 3: Child School Admission Verification',
        inputs: 'Age: 5 Years, 6 Months, 0 Days | School Cutoff: 31 March 2026',
        calculation: 'Year = 2026 - 5 = 2021\nMonth = 3 - 6 -> Borrow 1 year -> Year = 2020, Month = 12 + 3 - 6 = 9 (September)\nDay = 31 (capped to Sept max 30) -> 30 September 2020',
        result: 'Date of Birth: 30 September 2020 (Wednesday, Zodiac: Libra)',
      },
    ],
    tips: [
      'Official application forms (UPSC, SSC, State PSC, Army) often state age requirements as "Age as on 1st August" — always set that cutoff in the reference date.',
      'If you only know your age in completed years, leave months and days as 0 to get your anniversary birth date.',
      'Medical and insurance underwriting forms frequently require reverse date of birth calculation from policy issue dates.',
      'Check the day of the week to verify against your birth certificate or family records.',
    ],
    commonMistakes: [
      'Subtracting 365.25 days per year directly without accounting for specific leap years in the elapsed period.',
      'Neglecting variable month lengths (28, 30, or 31 days) when subtracting months and days.',
      'Using today as reference date when verifying eligibility against an official backdated or forward notification date.',
      'Confusing Western zodiac dates when birth dates fall on solar cusps.',
    ],
    faqs: [
      {
        question: 'How do I calculate DOB from age?',
        answer:
          'To calculate DOB from age, subtract your age in completed years, months, and days from the reference date (such as today or an exam cutoff date). Our reverse age calculator automates this with calendar-exact day borrowing and leap-year rules.',
      },
      {
        question: 'Can I find my exact birth date if I only know my age in years?',
        answer:
          'If you only know your age in years (e.g., 25 years old), subtracting 25 years from today gives your birth year and anniversary date. For exact day precision, you need your additional months and days.',
      },
      {
        question: 'How to calculate date of birth from age for government exam eligibility?',
        answer:
          'Enter the maximum or minimum age specified in the exam notification, set the "As of Date" to the official cutoff date (e.g., 1st August 2026), and the calculator will display the exact earliest or latest eligible birth date.',
      },
      {
        question: 'Does this reverse DOB calculator account for leap years?',
        answer:
          'Yes. Our calculator accurately tracks every leap year (including century leap year exceptions) and adjusts February days according to Gregorian calendar rules.',
      },
      {
        question: 'What day of the week was I born on?',
        answer:
          'Once your date of birth is computed, the tool immediately identifies your birth day of the week (Monday through Sunday) along with your astrological zodiac sign.',
      },
      {
        question: 'Why do competitive exam forms require age calculation on a cutoff date?',
        answer:
          'Recruitment boards set uniform cutoff dates (often 1st January or 1st August) to ensure fairness across all applicants regardless of when the notification or exam is conducted.',
      },
      {
        question: 'Kya main apni umar (age) se janam tithi (DOB) nikal sakta hoon?',
        answer:
          'Haan, agar aapko apni umar saal, mahine aur din mein pata hai, toh aap asani se apni exact janam tithi (Date of Birth) aur janam ka din nikal sakte hain.',
      },
      {
        question: 'Is this reverse age calculator completely free and private?',
        answer:
          'Yes, CalcMaster reverse age calculator runs 100% in your browser. No personal dates or birth details are ever stored on any server.',
      },
    ],
    relatedCalculators: [
      { slug: 'age', name: 'Age Calculator', description: 'Calculate exact chronological age from DOB' },
      { slug: 'dob-calculator', name: 'DOB Calculator', description: 'Birth of date calculation & age by DOB' },
      { slug: 'sarkari-exam-age', name: 'Sarkari Exam Age Calculator', description: 'Check government exam eligibility with category relaxation' },
      { slug: 'date-difference', name: 'Date Difference Calculator', description: 'Calculate days between two dates' },
    ],
  },
  hi: {
    pageTitle: 'उम्र से जन्म तिथि कैलकुलेटर - Reverse DOB | CalcMaster',
    metaDescription:
      'अपनी उम्र (वर्ष, महीने, दिन) से सटीक जन्म तिथि (DOB) और जन्म का वार निकालें। फ्री रिवर्स एज कैलकुलेटर इंडिया।',
    h1: 'उम्र से जन्म तिथि कैलकुलेटर – Calculate DOB from Age',
    introText:
      'क्या आप अपनी उम्र से जन्म तिथि निकालना चाहते हैं? हमारे फ्री रिवर्स एज कैलकुलेटर से अपनी उम्र (साल, महीने, दिन) दर्ज करें और सटीक जन्म तारीख, वार (दिन) और राशि जानें।',
  },
};
