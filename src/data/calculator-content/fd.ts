export const fdContent = {
  en: {
    pageTitle: 'FD Calculator - Fixed Deposit Returns 2026 | CalcMaster',
    metaDescription:
      'Calculate Fixed Deposit (FD) maturity value and interest earned with monthly, quarterly, or annual compounding. Compare bank FD rates & export PDF.',
    h1: 'FD Calculator – Calculate Fixed Deposit Returns Instantly',
    introText: 'A Fixed Deposit (FD) is one of the safest and most popular investment options in India. It offers guaranteed returns at a fixed interest rate for a specific tenure. Our FD Calculator helps you estimate your maturity amount and total interest earned over the tenure, allowing you to plan your investments better. It supports various compounding frequencies used by Indian banks.',
    howToUse: [
      'Enter the initial deposit amount (Principal).',
      'Input the annual interest rate offered by your bank (typically higher for senior citizens).',
      'Select the tenure (duration) of your fixed deposit in months or years.',
      'Choose the compounding frequency (most Indian banks use quarterly compounding).',
      'Click calculate to instantly see your maturity amount and interest earned.'
    ],
    formulaExplanation: 'For compound interest FDs, the formula is: A = P × (1 + r/n)^(n×t). Here, A is the maturity amount, P is the principal deposit, r is the annual interest rate in decimal, n is the number of times interest is compounded per year, and t is the tenure in years.',
    solvedExamples: [
      {
        title: 'Short Term FD Example',
        inputs: 'Deposit: ₹1,00,000 | Interest Rate: 6.5% | Tenure: 1 Year | Compounding: Quarterly',
        calculation: 'A = 100000 × (1 + 0.065/4)^(4×1)',
        result: 'Maturity Amount: ₹1,06,660 | Total Interest: ₹6,660'
      },
      {
        title: 'Medium Term FD Example',
        inputs: 'Deposit: ₹5,00,000 | Interest Rate: 7.0% | Tenure: 3 Years | Compounding: Quarterly',
        calculation: 'A = 500000 × (1 + 0.07/4)^(4×3)',
        result: 'Maturity Amount: ₹6,15,719 | Total Interest: ₹1,15,719'
      },
      {
        title: 'Long Term FD Example (Senior Citizen)',
        inputs: 'Deposit: ₹10,00,000 | Interest Rate: 7.5% | Tenure: 5 Years | Compounding: Quarterly',
        calculation: 'A = 1000000 × (1 + 0.075/4)^(4×5)',
        result: 'Maturity Amount: ₹14,49,948 | Total Interest: ₹4,49,948'
      }
    ],
    tips: [
      'Look for special FD schemes for senior citizens, which usually offer 0.50% extra interest.',
      'Check the compounding frequency of the bank. Quarterly compounding yields higher returns than half-yearly or yearly.',
      'Consider tax implications. Interest earned from FDs is taxable under "Income from Other Sources".',
      'Submit Form 15G or 15H if your total income is below the taxable limit to prevent TDS deduction on your FD interest.',
      'For tax savings, you can invest in 5-year tax-saving FDs which fall under Section 80C.'
    ],
    commonMistakes: [
      'Ignoring the impact of inflation and taxes on FD returns, leading to a negative real rate of return.',
      'Withdrawing an FD before maturity, which usually incurs a penalty of 0.5% to 1% on the interest rate.',
      'Not submitting Form 15G/15H when eligible, leading to unnecessary TDS deductions.',
      'Auto-renewing FDs without checking if current market interest rates have increased.'
    ],
    faqs: [
      {
        question: 'What is a Fixed Deposit (FD)?',
        answer: 'A Fixed Deposit is a financial instrument provided by banks or NBFCs which provides investors a higher rate of interest than a regular savings account, until the given maturity date.'
      },
      {
        question: 'How is FD interest calculated?',
        answer: 'FD interest is calculated using either simple interest or compound interest. For tenures above 6 months, banks generally use compound interest with quarterly compounding.'
      },
      {
        question: 'Is FD interest taxable?',
        answer: 'Yes, the interest earned on Fixed Deposits is fully taxable as per your income tax slab. Banks deduct TDS at 10% if the interest exceeds ₹40,000 in a financial year (₹50,000 for senior citizens).'
      },
      {
        question: 'Can I break my FD before maturity?',
        answer: 'Yes, most FDs allow premature withdrawal, but banks usually levy a penalty of 0.5% to 1% on the applicable interest rate for the period the deposit was held.'
      },
      {
        question: 'What is a Tax Saving FD?',
        answer: 'A tax-saving FD is a special type of fixed deposit with a mandatory lock-in period of 5 years. The principal amount invested qualifies for tax deduction under Section 80C up to ₹1.5 lakh.'
      },
      {
        question: 'Do senior citizens get higher interest rates?',
        answer: 'Yes, most banks and financial institutions in India offer an additional interest rate of 0.50% to 0.75% for senior citizens (individuals aged 60 years and above).'
      },
      {
        question: 'What is the minimum amount required to open an FD?',
        answer: 'The minimum amount required varies from bank to bank, but it can be as low as ₹1,000 or ₹5,000.'
      },
      {
        question: 'What happens to the FD on maturity?',
        answer: 'On maturity, the principal along with the accumulated interest is credited to your linked savings account. Alternatively, if you chose auto-renewal, the bank will automatically renew the FD for the same tenure at the prevailing interest rate.'
      }
    ],
    relatedCalculators: [
      {
        name: 'RD Calculator',
        slug: '/rd-calculator',
        description: 'Calculate your returns on Recurring Deposits.'
      },
      {
        name: 'SIP Calculator',
        slug: '/sip-calculator',
        description: 'Calculate future wealth accumulation through Systematic Investment Plans.'
      },
      {
        name: 'PPF Calculator',
        slug: '/ppf-calculator',
        description: 'Estimate your Public Provident Fund maturity amount and interest earned.'
      }
    ]
  },
  hi: {
    h1: 'एफडी कैलकुलेटर – फिक्स्ड डिपॉजिट रिटर्न की तुरंत गणना करें',
    introText: 'फिक्स्ड डिपॉजिट (FD) भारत में सबसे सुरक्षित और लोकप्रिय निवेश विकल्पों में से एक है। यह एक निश्चित अवधि के लिए एक निश्चित ब्याज दर पर गारंटीड रिटर्न देता है। हमारा एफडी कैलकुलेटर आपको मैच्योरिटी राशि और कुल ब्याज का अनुमान लगाने में मदद करता है।',
    howToUse: [
      'जमा राशि (मूलधन) दर्ज करें।',
      'अपने बैंक द्वारा दी जाने वाली वार्षिक ब्याज दर भरें।',
      'अपनी एफडी की अवधि महीनों या वर्षों में चुनें।',
      'मैच्योरिटी राशि और ब्याज देखने के लिए कैलकुलेट पर क्लिक करें।'
    ],
    tips: [
      'वरिष्ठ नागरिकों के लिए विशेष एफडी योजनाओं की तलाश करें, जो आमतौर पर 0.50% अतिरिक्त ब्याज देती हैं।',
      'टैक्स बचाने के लिए आप 5 साल की टैक्स-सेविंग एफडी में निवेश कर सकते हैं जो धारा 80C के तहत आती है।',
      'यदि आपकी कुल आय कर योग्य सीमा से कम है, तो अपनी एफडी पर टीडीएस कटौती को रोकने के लिए फॉर्म 15G या 15H जमा करें।'
    ],
    faqs: [
      {
        question: 'फिक्स्ड डिपॉजिट (FD) क्या है?',
        answer: 'फिक्स्ड डिपॉजिट एक वित्तीय साधन है जो बैंकों द्वारा प्रदान किया जाता है। यह एक नियमित बचत खाते की तुलना में मैच्योरिटी तिथि तक अधिक ब्याज दर प्रदान करता है।'
      },
      {
        question: 'क्या एफडी का ब्याज कर योग्य (taxable) है?',
        answer: 'हां, एफडी पर मिलने वाला ब्याज आपके इनकम टैक्स स्लैब के अनुसार पूरी तरह से कर योग्य है।'
      },
      {
        question: 'क्या मैं मैच्योरिटी से पहले अपनी एफडी तोड़ सकता हूं?',
        answer: 'हां, ज्यादातर एफडी में समय से पहले निकासी की अनुमति होती है, लेकिन बैंक आमतौर पर लागू ब्याज दर पर 0.5% से 1% तक जुर्माना लगाते हैं।'
      },
      {
        question: 'क्या वरिष्ठ नागरिकों को अधिक ब्याज मिलता है?',
        answer: 'हां, भारत में अधिकांश बैंक और वित्तीय संस्थान वरिष्ठ नागरिकों (60 वर्ष और उससे अधिक आयु के व्यक्तियों) के लिए 0.50% से 0.75% की अतिरिक्त ब्याज दर प्रदान करते हैं।'
      }
    ]
  }
};
