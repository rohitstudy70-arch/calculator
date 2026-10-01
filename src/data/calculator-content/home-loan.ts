export const homeLoanContent = {
  en: {
    pageTitle: 'Home Loan EMI Calculator 2026 - Tax Benefits | CalcMaster',
    metaDescription:
      'Calculate home loan EMI, down payment, stamp duty & tax savings under Section 24(b) & 80C. View amortization schedule with charts. Try free today!',
    h1: 'Home Loan EMI Calculator',
    introText: 'Buying a home is one of the biggest financial decisions you\'ll make. Our Home Loan EMI Calculator goes beyond simple EMI calculations. It helps you estimate your down payment, calculate processing fees, estimate stamp duty and registration charges, and even figures out your estimated tax savings under Section 80C and 24(b) of the Income Tax Act.',
    howToUse: [
      'Enter the total property value you intend to purchase.',
      'Set your down payment percentage. Typically, banks finance up to 80-90% of the property value.',
      'Enter the annual interest rate offered by your bank (e.g., 8.5%).',
      'Select your loan tenure in months. A standard home loan is usually between 15 to 20 years (180 to 240 months).',
      'Optionally, adjust the processing fee percentage to see your upfront costs.'
    ],
    formulaExplanation: 'The core EMI calculation uses the standard formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is the Loan Amount (Property Value minus Down Payment), R is the monthly interest rate, and N is the tenure in months. Furthermore, the calculator estimates Stamp Duty at roughly 6% and Registration at 1% of the property value, though actual rates vary by state.',
    solvedExamples: [
      {
        title: 'Standard 20-Year Loan Example',
        inputs: 'Property: ₹75,00,000 | Down Payment: 20% | Interest Rate: 8.5% | Tenure: 20 Years (240 months)',
        calculation: 'Loan = ₹60,00,000. EMI = [6000000 × 0.007083 × (1+0.007083)^240] / [(1+0.007083)^240 - 1]',
        result: 'Loan Amount: ₹60,00,000 | EMI: ₹52,069 | Total Interest: ₹64,96,655 | Total Payment: ₹1,24,96,655'
      },
      {
        title: 'High Down Payment Example',
        inputs: 'Property: ₹1,00,00,000 (1 Crore) | Down Payment: 25% | Interest Rate: 7.5% | Tenure: 25 Years (300 months)',
        calculation: 'Loan = ₹75,00,000. EMI = [7500000 × 0.00625 × (1+0.00625)^300] / [(1+0.00625)^300 - 1]',
        result: 'Loan Amount: ₹75,00,000 | EMI: ₹55,424 | Total Interest: ₹91,27,337 | Total Payment: ₹1,66,27,337'
      },
      {
        title: 'Short Tenure Example',
        inputs: 'Property: ₹40,00,000 | Down Payment: 10% | Interest Rate: 9.0% | Tenure: 15 Years (180 months)',
        calculation: 'Loan = ₹36,00,000. EMI = [3600000 × 0.0075 × (1+0.0075)^180] / [(1+0.0075)^180 - 1]',
        result: 'Loan Amount: ₹36,00,000 | EMI: ₹36,514 | Total Interest: ₹29,72,572 | Total Payment: ₹65,72,572'
      }
    ],
    tips: [
      'Increase your down payment if possible to reduce your total loan amount and save on interest.',
      'Check for Pradhan Mantri Awas Yojana (PMAY) subsidy eligibility if you are buying your first home.',
      'Make prepayments every year; even one extra EMI per year can reduce your loan tenure significantly.',
      'Compare Home Loan processing fees and hidden charges across banks before finalizing.',
      'Claim maximum tax benefits: Up to ₹1.5L on principal (Sec 80C) and ₹2L on interest (Sec 24b) for self-occupied properties.'
    ],
    commonMistakes: [
      'Ignoring additional costs like Stamp Duty, Registration, and GST when budgeting for the house.',
      'Opting for a very long tenure (e.g., 30 years) just to lower the EMI, resulting in huge interest payouts.',
      'Not maintaining an emergency fund to cover at least 6 months of EMIs in case of job loss.',
      'Failing to negotiate the interest rate or processing fees with the bank.'
    ],
    faqs: [
      {
        question: 'What is a Home Loan EMI?',
        answer: 'Home Loan EMI (Equated Monthly Installment) is the fixed amount you pay your bank every month to repay your home loan. It includes both the principal amount and the interest.'
      },
      {
        question: 'How much loan can I get for a house?',
        answer: 'Banks usually finance up to 80% to 90% of the property value. The exact amount depends on your income, age, credit score, and existing liabilities.'
      },
      {
        question: 'What are the tax benefits on a home loan?',
        answer: 'You can claim a deduction of up to ₹1.5 lakh on principal repayment under Section 80C, and up to ₹2 lakh on interest payment under Section 24(b) for a self-occupied property.'
      },
      {
        question: 'What is Stamp Duty and Registration?',
        answer: 'Stamp Duty is a tax levied by the state government on the property transaction, usually around 5-7%. Registration charges are paid to register the property in your name, usually around 1%.'
      },
      {
        question: 'Should I opt for a fixed or floating interest rate?',
        answer: 'Most home loans in India are on floating rates linked to the RBI repo rate. Floating rates are generally lower than fixed rates and do not carry prepayment penalties.'
      },
      {
        question: 'Can I prepay my home loan?',
        answer: 'Yes, you can make prepayments. For floating rate home loans, banks do not charge any prepayment penalty as per RBI guidelines.'
      },
      {
        question: 'Does down payment affect the EMI?',
        answer: 'Yes, a higher down payment means a lower loan amount, which directly reduces your EMI and total interest outgo.'
      },
      {
        question: 'What is PMAY?',
        answer: 'Pradhan Mantri Awas Yojana (PMAY) is a government initiative that offers an interest subsidy to eligible first-time homebuyers.'
      }
    ],
    relatedCalculators: [
      {
        name: 'EMI Calculator',
        slug: '/emi-calculator',
        description: 'Calculate EMI for home, car, or personal loans.'
      },
      {
        name: 'SIP Calculator',
        slug: '/sip-calculator',
        description: 'Calculate wealth accumulation through SIPs.'
      }
    ]
  },
  hi: {
    pageTitle: 'होम लोन ईएमआई कैलकुलेटर - प्रॉपर्टी लोन कैलकुलेटर | CalcMaster',
    metaDescription: 'अपने होम लोन की ईएमआई, अमोर्टाइजेशन शेड्यूल, और टैक्स छूट (सेक्शन 80C और 24b) की गणना करें।',
    h1: 'होम लोन ईएमआई कैलकुलेटर (Home Loan EMI Calculator)',
    introText: 'घर खरीदना एक बड़ा वित्तीय निर्णय है। हमारा होम लोन ईएमआई कैलकुलेटर आपको ईएमआई के साथ-साथ डाउन पेमेंट, स्टाम्प ड्यूटी, और सेक्शन 80C और 24(b) के तहत संभावित टैक्स बचत का अनुमान लगाने में मदद करता है।',
    howToUse: [
      'प्रॉपर्टी की कुल कीमत दर्ज करें।',
      'अपना डाउन पेमेंट प्रतिशत चुनें (बैंक आमतौर पर 80-90% तक फाइनेंस करते हैं)।',
      'बैंक द्वारा दी जाने वाली वार्षिक ब्याज दर दर्ज करें (जैसे 8.5%)।',
      'महीनों में अपने लोन की अवधि चुनें (15 से 20 साल एक मानक अवधि है)।',
      'प्रोसेसिंग फीस प्रतिशत को एडजस्ट करें (वैकल्पिक)।'
    ],
    formulaExplanation: 'ईएमआई की गणना मानक सूत्र से की जाती है: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]। इसके अलावा, कैलकुलेटर स्टाम्प ड्यूटी (लगभग 6%) और रजिस्ट्रेशन फीस (लगभग 1%) का अनुमान लगाता है।',
    solvedExamples: [
      {
        title: '20 साल के लोन का उदाहरण',
        inputs: 'प्रॉपर्टी: ₹75,00,000 | डाउन पेमेंट: 20% | ब्याज दर: 8.5% | अवधि: 240 महीने',
        calculation: 'लोन = ₹60,00,000',
        result: 'लोन राशि: ₹60,00,000 | ईएमआई: ₹52,069 | कुल ब्याज: ₹64,96,655 | कुल भुगतान: ₹1,24,96,655'
      },
      {
        title: 'अधिक डाउन पेमेंट का उदाहरण',
        inputs: 'प्रॉपर्टी: ₹1,00,00,000 | डाउन पेमेंट: 25% | ब्याज दर: 7.5% | अवधि: 300 महीने',
        calculation: 'लोन = ₹75,00,000',
        result: 'लोन राशि: ₹75,00,000 | ईएमआई: ₹55,424 | कुल ब्याज: ₹91,27,337 | कुल भुगतान: ₹1,66,27,337'
      },
      {
        title: 'कम अवधि का उदाहरण',
        inputs: 'प्रॉपर्टी: ₹40,00,000 | डाउन पेमेंट: 10% | ब्याज दर: 9.0% | अवधि: 180 महीने',
        calculation: 'लोन = ₹36,00,000',
        result: 'लोन राशि: ₹36,00,000 | ईएमआई: ₹36,514 | कुल ब्याज: ₹29,72,572 | कुल भुगतान: ₹65,72,572'
      }
    ],
    tips: [
      'यदि संभव हो तो अपना डाउन पेमेंट बढ़ाएं ताकि लोन राशि और ब्याज कम हो सके।',
      'यदि आप पहली बार घर खरीद रहे हैं तो PMAY सब्सिडी की जांच करें।',
      'हर साल कम से कम एक अतिरिक्त ईएमआई का प्रीपेमेंट करें।',
      'बैंकों के बीच प्रोसेसिंग फीस और छिपे हुए शुल्कों की तुलना करें।',
      'टैक्स लाभ: मूलधन पर ₹1.5 लाख (Sec 80C) और ब्याज पर ₹2 लाख (Sec 24b) का दावा करें।'
    ],
    commonMistakes: [
      'बजट बनाते समय स्टाम्प ड्यूटी, रजिस्ट्रेशन और जीएसटी जैसे अतिरिक्त खर्चों को नजरअंदाज करना।',
      'केवल ईएमआई कम करने के लिए बहुत लंबी अवधि (जैसे 30 साल) चुनना।',
      'आपातकालीन फंड न रखना, जिससे नौकरी छूटने पर ईएमआई देना मुश्किल हो सकता है।',
      'बैंक के साथ ब्याज दर पर मोलभाव न करना।'
    ],
    faqs: [
      {
        question: 'होम लोन ईएमआई क्या है?',
        answer: 'यह वह निश्चित राशि है जो आप हर महीने अपने बैंक को होम लोन चुकाने के लिए देते हैं, जिसमें मूलधन और ब्याज दोनों शामिल होते हैं।'
      },
      {
        question: 'मुझे घर के लिए कितना लोन मिल सकता है?',
        answer: 'बैंक आमतौर पर प्रॉपर्टी की कीमत का 80% से 90% तक फाइनेंस करते हैं। सटीक राशि आपकी आय और क्रेडिट स्कोर पर निर्भर करती है।'
      },
      {
        question: 'होम लोन पर क्या टैक्स लाभ हैं?',
        answer: 'सेक्शन 80C के तहत मूलधन पर ₹1.5 लाख तक और सेक्शन 24(b) के तहत ब्याज पर ₹2 लाख तक की छूट।'
      },
      {
        question: 'स्टाम्प ड्यूटी और रजिस्ट्रेशन क्या है?',
        answer: 'स्टाम्प ड्यूटी राज्य सरकार द्वारा लगाया गया कर है (5-7%) और रजिस्ट्रेशन प्रॉपर्टी को आपके नाम पर रजिस्टर करने की फीस है (1%)।'
      },
      {
        question: 'क्या मुझे फिक्स्ड या फ्लोटिंग ब्याज दर चुननी चाहिए?',
        answer: 'फ्लोटिंग दरें आम तौर पर सस्ती होती हैं और आरबीआई नियमों के अनुसार इनमें प्रीपेमेंट पेनल्टी नहीं होती है।'
      },
      {
        question: 'क्या मैं अपना होम लोन समय से पहले चुका सकता हूँ?',
        answer: 'हां, आरबीआई नियमों के अनुसार, फ्लोटिंग रेट होम लोन पर बैंक कोई प्रीपेमेंट पेनल्टी नहीं लगाते हैं।'
      },
      {
        question: 'क्या डाउन पेमेंट ईएमआई को प्रभावित करता है?',
        answer: 'हां, अधिक डाउन पेमेंट का मतलब है कम लोन राशि, जिससे आपकी ईएमआई कम हो जाती है।'
      },
      {
        question: 'PMAY क्या है?',
        answer: 'प्रधानमंत्री आवास योजना (PMAY) सरकार की एक पहल है जो पात्र पहली बार घर खरीदारों को ब्याज सब्सिडी प्रदान करती है।'
      }
    ],
    relatedCalculators: [
      {
        name: 'ईएमआई कैलकुलेटर (EMI Calculator)',
        slug: '/emi-calculator',
        description: 'अपने होम, कार या पर्सनल लोन के लिए ईएमआई की गणना करें।'
      },
      {
        name: 'सिप कैलकुलेटर (SIP Calculator)',
        slug: '/sip-calculator',
        description: 'म्यूचुअल फंड एसआईपी के लिए रिटर्न की गणना करें।'
      }
    ]
  }
};
