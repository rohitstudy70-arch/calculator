export const compoundInterestContent = {
  en: {
    pageTitle: 'Compound Interest Calculator - Calculate Interest & Maturity Value',
    metaDescription: 'Free compound interest calculator to compute daily, monthly, quarterly, and annual compounding with optional regular periodic deposits.',
    h1: 'Compound Interest Calculator – Harness the Power of Compounding',
    introText:
      'Albert Einstein famously called compound interest the "eighth wonder of the world". Unlike simple interest, compound interest allows you to earn interest on both your initial principal and accumulated interest from previous periods, creating exponential wealth growth over time.',
    howToUse: [
      'Enter your initial starting principal investment amount.',
      'Specify the annual interest rate (e.g. 7.5% for fixed deposits or 12% for mutual funds).',
      'Enter the investment duration/tenure in years.',
      'Select your compounding frequency (Daily, Monthly, Quarterly, Half-Yearly, or Annually).',
      'Optionally enable regular monthly or annual additions to simulate systematic wealth accumulation.',
      'Review the total interest earned, final maturity value, effective annual rate (APY), and year-by-year growth table.',
    ],
    formulaExplanation:
      'The standard compound interest formula is:\nA = P × (1 + r / n)^(n × t)\n\nWhere:\n• A = Final maturity amount\n• P = Initial principal balance\n• r = Annual nominal interest rate (in decimal, e.g. 8% = 0.08)\n• n = Compounding frequency per year (1 for Annual, 2 for Half-Yearly, 4 for Quarterly, 12 for Monthly, 365 for Daily)\n• t = Number of years\n\nTotal Compound Interest = A - P\nEffective Annual Rate (EAR / APY) = (1 + r / n)^n - 1',
    solvedExamples: [
      {
        title: 'Quarterly Compounded Fixed Deposit',
        inputs: 'Principal: ₹1,00,000 | Rate: 10% p.a. | Tenure: 5 Years | Compounding: Quarterly (n=4)',
        calculation:
          'A = 100000 × (1 + 0.10/4)^(4 × 5) = 100000 × (1.025)^20 = 100000 × 1.6386164 = ₹1,63,862.',
        result:
          'Principal: ₹1,00,000 | Interest Earned: ₹63,862 | Maturity Amount: ₹1,63,862 | Effective Annual Rate: 10.38%',
      },
      {
        title: 'Long-Term Compounding (15 Years)',
        inputs: 'Principal: ₹5,00,000 | Rate: 12% p.a. | Tenure: 15 Years | Compounding: Annual (n=1)',
        calculation:
          'A = 500000 × (1 + 0.12)^15 = 500000 × 5.473565 = ₹27,36,783.',
        result:
          'Principal: ₹5,00,000 | Interest Earned: ₹22,36,783 | Maturity Amount: ₹27,36,783 | 5.47x Capital Growth',
      },
      {
        title: 'Compounding with Regular Monthly Additions',
        inputs: 'Initial Principal: ₹50,000 | Monthly Addition: ₹5,000 | Rate: 10% | Tenure: 10 Years | Compounding: Monthly',
        calculation:
          'Initial ₹50,000 grows to ₹1,35,352. Monthly additions of ₹5,000 (total ₹6,00,000) grow to ₹10,24,222.',
        result:
          'Total Principal: ₹6,50,000 | Total Interest Earned: ₹5,09,574 | Final Maturity Amount: ₹11,59,574',
      },
    ],
    tips: [
      'The higher the compounding frequency (e.g. daily vs annual), the higher the total interest earned on your investment.',
      'Use the Rule of 72 to estimate how fast your money will double: divide 72 by the annual interest rate (e.g. at 12%, money doubles in ~6 years).',
      'Starting 5 years earlier can double your eventual retirement wealth due to exponential back-loaded compounding.',
      'Reinvest dividends and interest payouts rather than withdrawing them to maintain the compounding multiplier effect.',
      'Always consider real returns by subtracting the prevailing inflation rate from your nominal compound interest rate.',
    ],
    commonMistakes: [
      'Confusing nominal interest rate with Effective Annual Rate (EAR) which factors in compounding frequency.',
      'Interrupting the compounding process with frequent early withdrawals.',
      'Underestimating the massive difference between simple interest and compound interest over 10+ year horizons.',
      'Ignoring the drag of taxes and expense ratios on net compounded returns.',
    ],
    faqs: [
      {
        question: 'What is the difference between simple interest and compound interest?',
        answer:
          'Simple interest is calculated solely on the original principal amount for the entire duration. Compound interest is calculated on the initial principal PLUS all previously accumulated interest, leading to exponential growth.',
      },
      {
        question: 'What is Effective Annual Rate (EAR / APY)?',
        answer:
          'The Effective Annual Rate (EAR) is the real annual return earned on an investment when compounding occurs more frequently than once a year (e.g., quarterly or monthly). For example, 10% compounded quarterly yields an effective rate of 10.38% per year.',
      },
      {
        question: 'How does compounding frequency impact returns?',
        answer:
          'More frequent compounding yields higher returns because interest is credited and begins earning additional interest sooner. For instance, ₹1,00,000 at 10% for 1 year produces ₹10,000 with annual compounding, ₹10,381 with quarterly compounding, and ₹10,516 with daily compounding.',
      },
      {
        question: 'What is the Rule of 72 in compound interest?',
        answer:
          'The Rule of 72 is a quick mathematical shortcut to estimate the number of years required to double your money. You divide 72 by the annual rate of return (e.g., at 8% return, 72 / 8 = 9 years to double).',
      },
      {
        question: 'How do Indian banks compound interest on Fixed Deposits?',
        answer:
          'Most commercial banks in India (SBI, HDFC, ICICI, etc.) compound interest on Fixed Deposits on a quarterly basis (4 times a year), while savings accounts typically calculate interest daily and credit it quarterly.',
      },
      {
        question: 'Can compound interest work against you in loans?',
        answer:
          'Yes. In revolving credit facilities like credit cards and personal loans, unpaid interest is compounded monthly at high APRs (often 36% to 42% p.a.), leading to rapid debt accumulation if not cleared on time.',
      },
      {
        question: 'What is the compounding frequency of PPF and EPF in India?',
        answer:
          'Public Provident Fund (PPF) and Employees Provident Fund (EPF) calculate interest monthly on the lowest balance between the 5th and last day of the month, and compound/credit the accumulated interest annually on March 31.',
      },
      {
        question: 'How does regular monthly investing supercharge compounding?',
        answer:
          'Adding regular monthly contributions (like a SIP) creates a continuous stream of new compounding engines. Over 15–20 years, interest earned per year will often exceed your total annual salary.',
      },
    ],
    relatedCalculators: [
      { name: 'Simple Interest Calculator', slug: 'simple-interest-calculator', description: 'Compare linear simple interest with compound returns.' },
      { name: 'SIP Calculator', slug: 'sip-calculator', description: 'Calculate wealth accumulation in equity mutual funds via monthly SIPs.' },
      { name: 'FD Calculator', slug: 'fd-calculator', description: 'Calculate quarterly compounded returns on Indian bank Fixed Deposits.' },
    ],
  },
  hi: {
    pageTitle: 'चक्रवृद्धि ब्याज कैलकुलेटर - कंपाउंड इंटरेस्ट व परिपक्वता राशि की गणना करें',
    metaDescription: 'दैनिक, मासिक, त्रैमासिक और वार्षिक चक्रवृद्धि ब्याज तथा नियमित मासिक जमा के साथ परिपक्वता राशि की गणना करें।',
    h1: 'चक्रवृद्धि ब्याज कैलकुलेटर – कंपाउंडिंग की शक्ति से बनाएं बड़ा फंड',
    introText:
      'अल्बर्ट आइंस्टीन ने चक्रवृद्धि ब्याज को "दुनिया का आठवां अजूबा" कहा था। इसमें न केवल आपके मूलधन पर बल्कि पहले से अर्जित ब्याज पर भी ब्याज मिलता है, जिससे समय के साथ आपकी संपत्ति में घातीय (exponential) वृद्धि होती है।',
    howToUse: [
      'अपनी प्रारंभिक निवेश राशि (मूलधन) दर्ज करें।',
      'अपेक्षित वार्षिक ब्याज दर प्रतिशत भरें।',
      'निवेश की अवधि (वर्षों में) दर्ज करें।',
      'कंपाउंडिंग आवृत्ति चुनें (दैनिक, मासिक, त्रैमासिक या वार्षिक)।',
      'यदि चाहें तो मासिक या वार्षिक नियमित जमा जोड़ें।',
      'तुरंत अपना कुल अर्जित ब्याज, अंतिम राशि और वार्षिक वृद्धि तालिका देखें।',
    ],
    tips: [
      'कंपाउंडिंग की आवृत्ति जितनी अधिक होगी (जैसे दैनिक या त्रैमासिक), कुल ब्याज उतना ही अधिक मिलेगा।',
      'पैसा दोगुना होने का समय जानने के लिए "Rule of 72" का उपयोग करें (72 को ब्याज दर से विभाजित करें)।',
      'जितनी जल्दी निवेश शुरू करेंगे, कंपाउंडिंग का फायदा उतना ही बड़ा मिलेगा।',
    ],
    faqs: [
      {
        question: 'साधारण ब्याज और चक्रवृद्धि ब्याज में क्या अंतर है?',
        answer: 'साधारण ब्याज केवल मूलधन पर मिलता है, जबकि चक्रवृद्धि ब्याज में मूलधन और पहले से मिले ब्याज दोनों पर नया ब्याज मिलता है।',
      },
      {
        question: 'भारतीय बैंक एफडी पर ब्याज कैसे जोड़ते हैं?',
        answer: 'भारत में अधिकांश बैंक फिक्स्ड डिपॉजिट (FD) पर त्रैमासिक (Quarterly) आधार पर ब्याज को चक्रवृद्धि करते हैं।',
      },
      {
        question: 'कंपाउंडिंग में समय का क्या महत्व है?',
        answer: 'कंपाउंडिंग में समय सबसे बड़ा कारक है। 10 वर्ष की तुलना में 20 वर्ष के निवेश में ब्याज कई गुना अधिक तेजी से बढ़ता है।',
      },
      {
        question: 'इफेक्टिव एनुअल रेट (EAR) क्या है?',
        answer: 'जब ब्याज साल में एक से अधिक बार (जैसे त्रैमासिक) जुड़ता है, तो वास्तविक वार्षिक रिटर्न दर नॉमिनल दर से अधिक होती है, जिसे इफेक्टिव रेट कहते हैं।',
      },
    ],
  },
};
