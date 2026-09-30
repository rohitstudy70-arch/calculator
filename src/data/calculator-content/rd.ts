export const rdContent = {
  en: {
    pageTitle: 'RD Calculator - Recurring Deposit Maturity Calculator Online | CalcMaster',
    metaDescription: 'Free RD calculator to accurately estimate your recurring deposit maturity amount and total interest earned. Plan your monthly savings easily.',
    h1: 'RD Calculator – Calculate Recurring Deposit Maturity Online',
    introText: 'A Recurring Deposit (RD) is a special kind of term deposit offered by Indian banks which helps people with regular incomes deposit a fixed amount every month into their RD account and earn interest at the rate applicable to Fixed Deposits. Our RD Calculator helps you accurately predict your maturity amount by factoring in your monthly investment, interest rate, and tenure.',
    howToUse: [
      'Enter the amount you wish to deposit every month.',
      'Input the annual interest rate offered by your bank for the RD.',
      'Select the tenure (duration) of your RD in months or years.',
      'Click calculate to instantly see your total deposited amount, interest earned, and final maturity value.'
    ],
    formulaExplanation: 'The standard formula used for RD calculations involves calculating the compound interest for each monthly deposit for its respective remaining duration. M = P × [(1 + r/n)^(nt) - 1] / [1 - (1 + r/n)^(-1/n)], where P is monthly deposit, r is interest rate, n is compounding frequency (quarterly), and t is time in years.',
    solvedExamples: [
      {
        title: 'Small Savings Example',
        inputs: 'Monthly Deposit: ₹2,000 | Interest Rate: 6.0% | Tenure: 2 Years | Compounding: Quarterly',
        calculation: 'Calculated iteratively for 24 months compounding quarterly.',
        result: 'Total Deposited: ₹48,000 | Total Interest: ₹3,059 | Maturity Amount: ₹51,059'
      },
      {
        title: 'Medium Savings Example',
        inputs: 'Monthly Deposit: ₹5,000 | Interest Rate: 6.5% | Tenure: 5 Years | Compounding: Quarterly',
        calculation: 'Calculated iteratively for 60 months compounding quarterly.',
        result: 'Total Deposited: ₹3,00,000 | Total Interest: ₹54,955 | Maturity Amount: ₹3,54,955'
      },
      {
        title: 'Large Savings Example',
        inputs: 'Monthly Deposit: ₹10,000 | Interest Rate: 7.0% | Tenure: 3 Years | Compounding: Quarterly',
        calculation: 'Calculated iteratively for 36 months compounding quarterly.',
        result: 'Total Deposited: ₹3,60,000 | Total Interest: ₹39,000 | Maturity Amount: ₹3,99,000'
      }
    ],
    tips: [
      'Set up a standing instruction or auto-debit from your savings account to ensure you never miss an RD installment.',
      'Compare RD interest rates across various banks before starting. Small Finance Banks often offer higher rates.',
      'Consider the impact of TDS. Submit Form 15G/15H if your total income is below the taxable limit.',
      'Unlike SIPs in mutual funds, RD returns are guaranteed and unaffected by market volatility.',
      'Ensure you have sufficient liquidity before committing to a high monthly deposit amount to avoid penalties for missed payments.'
    ],
    commonMistakes: [
      'Missing a monthly installment, which attracts penalty charges and reduces the overall interest earned.',
      'Breaking an RD prematurely, which leads to a penalty and a lower interest payout.',
      'Forgetting to account for inflation, which might make the real returns of an RD negative over a long period.',
      'Not considering the tax implications (TDS and income tax) on the interest earned.'
    ],
    faqs: [
      {
        question: 'What is a Recurring Deposit (RD)?',
        answer: 'A Recurring Deposit is a term deposit that allows you to deposit a fixed amount every month for a pre-defined period, earning an interest rate similar to a Fixed Deposit.'
      },
      {
        question: 'How is RD interest calculated in India?',
        answer: 'Banks in India typically calculate RD interest by compounding it on a quarterly basis. Each monthly installment earns interest for the remaining duration of the RD tenure.'
      },
      {
        question: 'Is the interest earned on RD taxable?',
        answer: 'Yes, the interest earned on an RD is fully taxable according to your income tax slab. Banks deduct TDS at 10% if the interest earned exceeds ₹40,000 in a financial year (₹50,000 for senior citizens).'
      },
      {
        question: 'Can I change my monthly RD installment amount?',
        answer: 'No, once you open a standard RD, you cannot change the monthly installment amount. However, some banks offer flexible RDs (like Flexi RD) where you can deposit varying amounts up to a certain limit.'
      },
      {
        question: 'What is the minimum tenure for an RD?',
        answer: 'The minimum tenure for a Recurring Deposit is usually 6 months. It can go up to a maximum of 10 years.'
      },
      {
        question: 'What happens if I miss an RD installment?',
        answer: 'If you miss an installment, the bank may charge a penalty fee. If you miss multiple consecutive installments (usually 3 to 6), the bank may prematurely close your RD account.'
      },
      {
        question: 'Can I withdraw money from my RD before maturity?',
        answer: 'You cannot make partial withdrawals from an RD. You can break the RD completely before maturity, but this will attract a penalty (usually 0.5% to 1% reduction in the applicable interest rate).'
      },
      {
        question: 'Are there special RD rates for senior citizens?',
        answer: 'Yes, just like Fixed Deposits, most banks offer an additional 0.50% to 0.75% interest on RDs for senior citizens.'
      }
    ],
    relatedCalculators: [
      {
        name: 'FD Calculator',
        slug: '/fd-calculator',
        description: 'Calculate maturity amount for your Fixed Deposits.'
      },
      {
        name: 'SIP Calculator',
        slug: '/sip-calculator',
        description: 'Calculate future wealth accumulation through Systematic Investment Plans.'
      },
      {
        name: 'EMI Calculator',
        slug: '/emi-calculator',
        description: 'Calculate your monthly loan EMI.'
      }
    ]
  },
  hi: {
    h1: 'आरडी कैलकुलेटर – रेकरिंग डिपॉजिट की मैच्योरिटी की गणना करें',
    introText: 'रेकरिंग डिपॉजिट (RD) एक विशेष प्रकार का टर्म डिपॉजिट है जो निश्चित आय वाले लोगों को हर महीने एक निश्चित राशि जमा करने और एफडी के समान ब्याज दर अर्जित करने में मदद करता है। हमारा आरडी कैलकुलेटर आपकी मैच्योरिटी राशि का सटीक अनुमान लगाने में मदद करता है।',
    howToUse: [
      'वह राशि दर्ज करें जो आप हर महीने जमा करना चाहते हैं।',
      'अपने बैंक द्वारा आरडी के लिए दी जाने वाली वार्षिक ब्याज दर भरें।',
      'महीनों या वर्षों में अपनी आरडी की अवधि (tenure) चुनें।',
      'कुल जमा राशि, ब्याज और अंतिम मैच्योरिटी मूल्य तुरंत देखने के लिए कैलकुलेट पर क्लिक करें।'
    ],
    tips: [
      'अपनी किश्त कभी न चूकने के लिए अपने बचत खाते से ऑटो-डेबिट (auto-debit) सेट करें।',
      'शुरू करने से पहले विभिन्न बैंकों की आरडी ब्याज दरों की तुलना करें।',
      'यदि आपकी कुल आय कर योग्य सीमा से कम है, तो टीडीएस से बचने के लिए फॉर्म 15G/15H जमा करें।'
    ],
    faqs: [
      {
        question: 'रेकरिंग डिपॉजिट (RD) क्या है?',
        answer: 'रेकरिंग डिपॉजिट एक टर्म डिपॉजिट है जो आपको एक पूर्व-निर्धारित अवधि के लिए हर महीने एक निश्चित राशि जमा करने की अनुमति देता है, जिस पर फिक्स्ड डिपॉजिट के समान ब्याज मिलता है।'
      },
      {
        question: 'क्या आरडी पर मिलने वाला ब्याज कर योग्य (taxable) है?',
        answer: 'हां, आरडी पर मिलने वाला ब्याज आपके इनकम टैक्स स्लैब के अनुसार पूरी तरह से कर योग्य है।'
      },
      {
        question: 'क्या मैं अपनी मासिक आरडी किश्त की राशि बदल सकता हूं?',
        answer: 'नहीं, एक बार मानक आरडी खोलने के बाद, आप मासिक किश्त की राशि को नहीं बदल सकते हैं।'
      },
      {
        question: 'आरडी के लिए न्यूनतम अवधि क्या है?',
        answer: 'रेकरिंग डिपॉजिट के लिए न्यूनतम अवधि आमतौर पर 6 महीने होती है। यह अधिकतम 10 साल तक हो सकती है।'
      }
    ]
  }
};
