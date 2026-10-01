export const simpleInterestContent = {
  en: {
    pageTitle: 'Simple Interest Calculator - Calculate Interest, Rate & Time Online',
    metaDescription: 'Free Simple Interest calculator with standard and reverse modes to find interest, principal, rate percentage, or time duration in years, months, or days.',
    h1: 'Simple Interest Calculator – Fast & Accurate SI Calculations',
    introText:
      'Simple Interest (SI) is a quick, straightforward method of calculating the interest charge on a loan or investment where interest is determined solely on the original principal amount, without any compounding of previous earnings.',
    howToUse: [
      'Choose your calculation mode: "Calculate Interest", "Find Interest Rate", "Find Time Period", or "Find Principal".',
      'Enter the Principal loan or deposit amount in INR.',
      'Specify the annual interest rate percentage.',
      'Select the time duration and unit (Years, Months, or Days).',
      'Instantly see total interest earned, final amount, daily/monthly interest breakdown, and payment schedule.',
    ],
    formulaExplanation:
      'The foundational formula for Simple Interest is:\nSI = (P × R × T) ÷ 100\nTotal Amount (A) = P + SI\n\nWhere:\n• P = Principal amount (initial sum borrowed or invested)\n• R = Annual rate of interest (% per year)\n• T = Time period in years (Days / 365 or Months / 12)\n\nReverse Formulas:\n• Rate (R) = (SI × 100) ÷ (P × T)\n• Time (T) = (SI × 100) ÷ (P × R)\n• Principal (P) = (SI × 100) ÷ (R × T)',
    solvedExamples: [
      {
        title: 'Short-Term Personal Loan (Years)',
        inputs: 'Principal: ₹50,000 | Rate: 8% p.a. | Time: 3 Years',
        calculation:
          'SI = (50000 × 8 × 3) ÷ 100 = ₹12,000.\nTotal Amount = ₹50,000 + ₹12,000 = ₹62,000.',
        result:
          'Principal: ₹50,000 | Interest: ₹12,000 | Total Amount: ₹62,000 | Yearly Interest: ₹4,000/yr | Monthly Interest: ₹333.33/mo',
      },
      {
        title: 'Commercial Borrowing (Months)',
        inputs: 'Principal: ₹1,00,000 | Rate: 12% p.a. | Time: 18 Months (1.5 Years)',
        calculation:
          'Time in years = 18 ÷ 12 = 1.5 years.\nSI = (100000 × 12 × 1.5) ÷ 100 = ₹18,000.',
        result:
          'Principal: ₹1,00,000 | Interest: ₹18,000 | Total Amount: ₹1,18,000',
      },
      {
        title: 'Reverse Calculation (Finding Rate %)',
        inputs: 'Principal: ₹2,00,000 | Time: 4 Years | Total Interest Earned: ₹64,000',
        calculation:
          'Rate = (64000 × 100) ÷ (200000 × 4) = 6400000 ÷ 800000 = 8.0% p.a.',
        result:
          'Calculated Interest Rate: 8.0% per annum',
      },
    ],
    tips: [
      'Simple interest is commonly used for short-term personal loans, automotive flat loans, informal lending, and academic financial problems.',
      'When time is in days, standard banking conventions use 365 days (Ordinary year) or 366 days for a leap year.',
      'Unlike compound interest, simple interest yields linear growth; interest earned in Year 1 is identical to interest earned in Year 10.',
      'In peer-to-peer (P2P) lending, always clarify whether the quoted rate is annual simple interest or monthly flat rate.',
    ],
    commonMistakes: [
      'Forgetting to convert months into years (dividing by 12) or days into years (dividing by 365) before applying the formula.',
      'Confusing monthly interest rates (e.g., 2% per month) with annual interest rates (24% per year).',
      'Assuming bank Fixed Deposits use simple interest (most bank FDs use quarterly compounding).',
    ],
    faqs: [
      {
        question: 'Where is Simple Interest used in real life?',
        answer:
          'Simple interest is used in short-term promissory notes, automobile financing with flat-rate quotes, informal private loans, installment loans, and specific government savings instruments.',
      },
      {
        question: 'How do I convert months or days into the formula?',
        answer:
          'Always convert the time period (T) to years: for months, divide by 12 (e.g., 6 months = 6/12 = 0.5 years); for days, divide by 365 (e.g., 73 days = 73/365 = 0.2 years).',
      },
      {
        question: 'How does simple interest differ from compound interest?',
        answer:
          'With simple interest, you earn interest only on the principal amount each year. With compound interest, you earn interest on the principal PLUS all previously accumulated interest.',
      },
      {
        question: 'What is the reverse simple interest formula to find the interest rate?',
        answer:
          'The formula to find the annual interest rate is: Rate (%) = (Simple Interest × 100) / (Principal × Time in Years).',
      },
      {
        question: 'What is the reverse formula to find time duration?',
        answer:
          'The formula to find time is: Time (Years) = (Simple Interest × 100) / (Principal × Annual Rate).',
      },
      {
        question: 'Is simple interest better for borrowers or lenders?',
        answer:
          'Simple interest is generally more advantageous for borrowers because the total interest paid is strictly linear and does not compound exponentially over time.',
      },
    ],
    relatedCalculators: [
      { name: 'Compound Interest Calculator', slug: 'compound-interest-calculator', description: 'See how much more wealth you generate with compound interest.' },
      { name: 'FD Calculator', slug: 'fd-calculator', description: 'Calculate quarterly compounded returns on Fixed Deposits.' },
      { name: 'Personal Loan Calculator', slug: 'personal-loan-calculator', description: 'Calculate reducing balance monthly EMIs on personal loans.' },
    ],
  },
  hi: {
    pageTitle: 'साधारण ब्याज कैलकुलेटर - ब्याज, दर और समय की ऑनलाइन गणना करें',
    metaDescription: 'मूलधन, ब्याज दर और समय (वर्ष, माह, दिन) के आधार पर साधारण ब्याज और कुल राशि की तुरंत गणना करें।',
    h1: 'साधारण ब्याज कैलकुलेटर – सरल और सटीक ब्याज गणना',
    introText:
      'साधारण ब्याज (Simple Interest) किसी ऋण या निवेश पर ब्याज निकालने का सबसे सीधा तरीका है, जहां ब्याज की गणना केवल प्रारंभिक मूलधन पर की जाती है।',
    howToUse: [
      'गणना का प्रकार चुनें (ब्याज निकालना, ब्याज दर खोजना, समय निकालना या मूलधन खोजना)।',
      'मूलधन राशि (रुपयों में) दर्ज करें।',
      'वार्षिक ब्याज दर प्रतिशत भरें।',
      'समय अवधि और इकाई (वर्ष, महीने या दिन) चुनें।',
      'तुरंत कुल ब्याज और कुल परिपक्वता राशि देखें।',
    ],
    tips: [
      'महीनों को वर्षों में बदलने के लिए 12 से और दिनों को 365 से विभाजित करें।',
      'साधारण ब्याज में हर साल मिलने वाला ब्याज एक समान रहता है।',
    ],
    faqs: [
      {
        question: 'साधारण ब्याज का फॉर्मूला क्या है?',
        answer: 'साधारण ब्याज (SI) = (मूलधन × दर × समय) / 100। कुल राशि (A) = मूलधन + साधारण ब्याज।',
      },
      {
        question: 'साधारण ब्याज और चक्रवृद्धि ब्याज में क्या अंतर है?',
        answer: 'साधारण ब्याज केवल मूलधन पर मिलता है, जबकि चक्रवृद्धि ब्याज में मूलधन और ब्याज दोनों पर नया ब्याज मिलता है।',
      },
      {
        question: 'ब्याज दर निकालने का उल्टा फॉर्मूला क्या है?',
        answer: 'दर (%) = (ब्याज × 100) / (मूलधन × समय)।',
      },
    ],
  },
};
