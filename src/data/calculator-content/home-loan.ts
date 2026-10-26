export const homeLoanContent = {
  en: {
    pageTitle: 'Home Loan EMI Calculator with Prepayment | CalcMaster',
    metaDescription:
      "Use CalcMaster's home loan EMI calculator to estimate monthly EMI, interest and prepayments with SBI, HDFC, ICICI, Axis Bank or Canara Bank rates.",
    h1: 'Home Loan EMI Calculator',
    introText:
      'Estimate your housing loan monthly payments, interest cost, and prepayment savings online with CalcMaster’s Home Loan EMI Calculator. Plan your dream home with accurate amortization schedules, tax benefits under Section 24(b) and 80C, and compare top bank rates from SBI, HDFC, ICICI, Axis Bank, and Canara Bank.',
    howToUse: [
      'Enter the property value or the total loan amount you plan to borrow.',
      'Adjust your down payment percentage (banks usually fund 75% to 90% of the agreement value).',
      'Input the annual interest rate offered by your lender (e.g., 8.5% p.a.).',
      'Select your loan tenure in years (commonly 10 to 30 years).',
      'Optionally customize processing fee, stamp duty, or registration charges to see upfront closing expenses.',
      'Review your estimated monthly EMI, total interest payable, yearly amortization schedule, and tax deductions.'
    ],
    formulaExplanation:
      'Home loan EMI is calculated using the standard mathematical reducing-balance formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is the principal loan amount, R is the monthly interest rate (Annual Rate ÷ 12 ÷ 100), and N is the total repayment duration in months.',
    solvedExamples: [
      {
        title: '₹20 Lakh Home Loan (20 Years @ 8.5%)',
        inputs: 'Loan Amount: ₹20,00,000 | Interest Rate: 8.5% p.a. | Tenure: 20 Years (240 Months)',
        calculation: 'Monthly Rate R = 8.5 / 12 / 100 = 0.007083. N = 240.\nEMI = [2000000 × 0.007083 × (1.007083)^240] / [(1.007083)^240 - 1]',
        result: 'Monthly EMI: ₹17,356 | Total Interest: ₹21,65,440 | Total Payment: ₹41,65,440'
      },
      {
        title: '₹25 Lakh Home Loan (10 Years @ 8.5%)',
        inputs: 'Loan Amount: ₹25,00,000 | Interest Rate: 8.5% p.a. | Tenure: 10 Years (120 Months)',
        calculation: 'Monthly Rate R = 8.5 / 12 / 100 = 0.007083. N = 120.\nEMI = [2500000 × 0.007083 × (1.007083)^120] / [(1.007083)^120 - 1]',
        result: 'Monthly EMI: ₹30,996 | Total Interest: ₹12,19,520 | Total Payment: ₹37,19,520'
      },
      {
        title: '₹40 Lakh Home Loan (20 Years @ 8.5%)',
        inputs: 'Loan Amount: ₹40,00,000 | Interest Rate: 8.5% p.a. | Tenure: 20 Years (240 Months)',
        calculation: 'Monthly Rate R = 8.5 / 12 / 100 = 0.007083. N = 240.\nEMI = [4000000 × 0.007083 × (1.007083)^240] / [(1.007083)^240 - 1]',
        result: 'Monthly EMI: ₹34,713 | Total Interest: ₹43,31,120 | Total Payment: ₹83,31,120'
      }
    ],
    tips: [
      'Aim for a CIBIL score of 750 or higher to qualify for the lowest home loan interest rates from PSU and private banks.',
      'Keep your total EMI obligations (including existing personal and auto loans) within 40%–50% of your net monthly salary.',
      'Make prepayments whenever you receive bonuses or incentives; even 1 extra EMI per year can reduce a 20-year loan tenure by 3–4 years.',
      'Opt for joint home loans with a spouse or co-borrower to increase overall loan eligibility and double tax deductions under Section 80C and Section 24(b).',
      'Compare processing fees, legal verification charges, and valuation fees across lenders before signing loan agreements.'
    ],
    commonMistakes: [
      'Choosing an excessively long tenure (e.g., 30 years) just to lower the monthly EMI, which results in paying more in total interest than the borrowed principal.',
      'Exhausting all liquid savings for down payment without leaving an emergency fund covering at least 6 months of household expenses and EMIs.',
      'Forgetting ancillary property acquisition costs such as Stamp Duty (5%–7%), Registration (1%), GST on under-construction flats, and interior furnishing.',
      'Failing to monitor repo rate revisions, causing floating interest rates to increase without timely tenure or EMI restructuring.'
    ],
    faqs: [
      {
        question: 'What is the EMI for a 20 lakh home loan?',
        answer:
          'For a ₹20 lakh home loan at an interest rate of 8.5% p.a. for a 20-year tenure (240 months), the monthly EMI is approximately ₹17,356. Total interest paid across 20 years is ₹21,65,440, making the total repayment ₹41,65,440. For a shorter 15-year tenure at the same rate, the monthly EMI is ₹19,695, and total interest reduces to ₹15,45,100.'
      },
      {
        question: 'What is the EMI for a 25 lakh home loan for 10 years?',
        answer:
          'For a ₹25 lakh home loan at an 8.5% annual interest rate over a 10-year tenure (120 months), the monthly EMI is ₹30,996. Over 10 years, you will pay a total interest of ₹12,19,520, resulting in a total repayment amount of ₹37,19,520. If the interest rate is 9.0%, the monthly EMI becomes ₹31,669 with total interest of ₹13,00,280.'
      },
      {
        question: 'How much salary is required for a 40 lakh home loan?',
        answer:
          'To be eligible for a ₹40 lakh home loan at 8.5% for 20 years (EMI of ₹34,713), most lenders require a net monthly take-home salary of approximately ₹70,000 to ₹80,000. Indian banks use the Fixed Obligation to Income Ratio (FOIR), restricting total monthly debt repayments to 50% of your take-home pay. If you have other active EMIs (such as a car or personal loan), you will need a higher salary or a co-applicant to qualify.'
      },
      {
        question: 'How to calculate home EMI using the formula?',
        answer:
          'Home loan EMI is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]. In this formula, P is the principal loan amount, R is the monthly interest rate (annual interest rate divided by 12 and then by 100), and N is the total tenure in months. CalcMaster’s online calculator computes this automatically and renders an instant amortization table.'
      },
      {
        question: 'How does a home loan EMI calculator with prepayment help save money?',
        answer:
          'Prepaying a portion of your housing loan directly reduces the outstanding principal balance. Because interest is charged on the reducing balance, partial prepayments accelerate principal amortization, drastically cutting total interest and shaving years off your repayment timeline without any RBI prepayment penalties on floating rate loans.'
      },
      {
        question: 'What are the current home loan interest rates in SBI, HDFC, ICICI, Axis Bank, and Canara Bank?',
        answer:
          'Current benchmark floating home loan interest rates typically range between 8.40% and 9.75% p.a. for borrowers with a credit score of 750 or higher. Public sector banks like SBI and Canara Bank link rates to EBLR/RLLR, while private banks like HDFC, ICICI, and Axis Bank link to their respective repo-linked benchmarks. Actual rates vary based on borrower risk profiles and loan amounts.'
      },
      {
        question: 'What is the difference between home loan and personal loan EMI?',
        answer:
          'Home loans are secured against real estate property, featuring low interest rates (typically 8.4% to 10%) and extended tenures of up to 30 years. Personal loans are unsecured borrowings with higher interest rates (10.5% to 24%) and shorter tenures (1 to 5 years). You can evaluate unsecured debt using our Personal Loan EMI Calculator.'
      },
      {
        question: 'What tax benefits are available on housing loan EMIs in India?',
        answer:
          'Under the Old Tax Regime, you can claim a deduction of up to ₹1.5 lakh on principal repayment under Section 80C and up to ₹2 lakh on interest paid for a self-occupied property under Section 24(b). In the first financial year of the loan, interest constitutes the major portion of your EMI payments.'
      },
      {
        question: 'Is CalcMaster an official bank calculator or loan distributor?',
        answer:
          'No. CalcMaster is an independent, free financial calculation platform. It provides unbiased mathematical estimates and analytical tools to help consumers plan their loans. CalcMaster does not approve loans, issue sanctions, or represent any bank or financial institution.'
      }
    ],
    relatedCalculators: [
      {
        name: 'Personal Loan EMI Calculator',
        slug: 'personal-loan-calculator',
        description: 'Calculate monthly EMIs and interest for unsecured personal loans.'
      },
      {
        name: 'Loan Prepayment Calculator',
        slug: 'loan-prepayment-calculator',
        description: 'Calculate how part-payments save interest and shorten tenure.'
      },
      {
        name: 'All-in-One Loan EMI Calculator',
        slug: 'emi-calculator',
        description: 'Universal EMI calculator for personal, car, home, and bike loans.'
      },
      {
        name: 'SIP Calculator',
        slug: 'sip-calculator',
        description: 'Plan mutual fund investments to offset your home loan interest.'
      }
    ]
  },
  hi: {
    pageTitle: 'Home Loan EMI Calculator with Prepayment | CalcMaster',
    metaDescription:
      'होम लोन ईएमआई कैलकुलेटर: SBI, HDFC, ICICI, Axis Bank और Canara Bank की ब्याज दरों पर मासिक ईएमआई, प्री-पेमेंट बचत और टैक्स छूट की गणना करें।',
    h1: 'होम लोन ईएमआई कैलकुलेटर (Home Loan EMI Calculator)',
    introText:
      'अपने होम लोन की मासिक ईएमआई, कुल ब्याज और प्रीपेमेंट बचत का ऑनलाइन अनुमान लगाएं। 20 लाख, 25 लाख और 40 लाख के लोन पर सटीक गणना और बैंक दरों की तुलना करें।'
  }
};
