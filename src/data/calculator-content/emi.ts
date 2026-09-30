export const emiContent = {
  en: {
    pageTitle: 'EMI Calculator - Calculate Home, Car & Personal Loan EMI Online | CalcMaster',
    metaDescription: 'Free EMI calculator to instantly compute your monthly loan EMI, total interest & repayment schedule. Works for home, car & personal loans.',
    h1: 'EMI Calculator – Calculate Your Loan EMI Instantly',
    introText: 'Equated Monthly Installment (EMI) is the fixed payment amount you make to a bank or lender each month to pay off your loan. Our EMI calculator helps you instantly figure out your monthly commitments, the total interest you will pay, and provides a clear month-by-month repayment schedule for home, car, or personal loans.',
    howToUse: [
      'Enter the loan amount (Principal) you wish to borrow.',
      'Input the annual interest rate offered by the bank or financial institution.',
      'Provide the loan tenure in months or years.',
      'Click calculate to instantly see your monthly EMI, total interest, and the full amortization schedule.'
    ],
    formulaExplanation: 'The mathematical formula used to calculate EMI is: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]. Here, P is the principal loan amount, R is the monthly interest rate (annual rate divided by 12 and then by 100), and N is the total number of monthly installments (tenure).',
    solvedExamples: [
      {
        title: 'Home Loan Example',
        inputs: 'Principal: ₹50,00,000 | Interest Rate: 8.5% | Tenure: 20 Years',
        calculation: 'Monthly Rate = 8.5 / 12 / 100 = 0.007083. Tenure = 240 months. EMI = [5000000 × 0.007083 × (1+0.007083)^240] / [(1+0.007083)^240 - 1]',
        result: 'EMI: ₹43,391 | Total Interest: ₹54,13,879 | Total Payment: ₹1,04,13,879'
      },
      {
        title: 'Car Loan Example',
        inputs: 'Principal: ₹8,00,000 | Interest Rate: 9.0% | Tenure: 5 Years',
        calculation: 'Monthly Rate = 9.0 / 12 / 100 = 0.0075. Tenure = 60 months. EMI = [800000 × 0.0075 × (1+0.0075)^60] / [(1+0.0075)^60 - 1]',
        result: 'EMI: ₹16,607 | Total Interest: ₹1,96,391 | Total Payment: ₹9,96,391'
      },
      {
        title: 'Personal Loan Example',
        inputs: 'Principal: ₹5,00,000 | Interest Rate: 12.5% | Tenure: 3 Years',
        calculation: 'Monthly Rate = 12.5 / 12 / 100 = 0.010416. Tenure = 36 months. EMI = [500000 × 0.010416 × (1+0.010416)^36] / [(1+0.010416)^36 - 1]',
        result: 'EMI: ₹16,727 | Total Interest: ₹1,02,165 | Total Payment: ₹6,02,165'
      }
    ],
    tips: [
      'Always compare interest rates from multiple banks before finalizing your loan.',
      'Try to keep your total EMI commitments below 40% of your net monthly income.',
      'Making a partial prepayment on your home loan every year can drastically reduce your total interest burden.',
      'A longer tenure reduces your monthly EMI but increases the overall interest paid to the bank.',
      'Maintain a good credit score (CIBIL > 750) to negotiate lower interest rates.'
    ],
    commonMistakes: [
      'Not factoring in processing fees and hidden charges while comparing loans.',
      'Choosing a longer tenure just to get a lower EMI, ignoring the massive interest accumulation.',
      'Missing an EMI payment, which negatively impacts your credit score and incurs penalty charges.',
      'Failing to read the terms regarding prepayment penalties or foreclosure charges.'
    ],
    faqs: [
      {
        question: 'What is EMI?',
        answer: 'EMI stands for Equated Monthly Installment. It is a fixed amount paid by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.'
      },
      {
        question: 'How is EMI calculated?',
        answer: 'EMI is calculated using the formula: P × R × (1+R)^N / [(1+R)^N - 1], where P is Principal, R is the monthly rate of interest, and N is the number of months. Our calculator automates this complex math for you.'
      },
      {
        question: 'Does EMI change during the loan tenure?',
        answer: 'If you have opted for a fixed interest rate, your EMI remains constant. However, for floating rate loans (like most home loans in India linked to the RBI repo rate), the EMI or the loan tenure may change when the interest rate fluctuates.'
      },
      {
        question: 'Can I reduce my EMI?',
        answer: 'Yes, you can reduce your EMI by making a partial prepayment towards your principal, negotiating a lower interest rate with your bank, or refinancing your loan to another lender offering better rates (Balance Transfer).'
      },
      {
        question: 'What happens if I miss an EMI payment?',
        answer: 'Missing an EMI payment will attract late payment penalties from the bank. More importantly, it is reported to credit bureaus like CIBIL, which will drop your credit score and make future borrowing difficult.'
      },
      {
        question: 'Is it better to increase EMI or make prepayments?',
        answer: 'Both approaches save interest. Increasing your EMI reduces the tenure. Making lump-sum prepayments reduces the principal outstanding immediately. Prepayments are generally more flexible as you can pay whenever you have surplus funds.'
      },
      {
        question: 'How does interest rate affect my EMI?',
        answer: 'The interest rate directly impacts your EMI. A higher interest rate means a higher EMI and greater overall interest cost, while a lower rate makes the loan more affordable. Even a 0.5% reduction can save lakhs on a large home loan.'
      },
      {
        question: 'What is the difference between flat and reducing balance EMI?',
        answer: 'In a flat rate method, interest is calculated on the original loan amount throughout the tenure. In the reducing balance method, interest is calculated only on the outstanding principal. Always prefer the reducing balance method as the effective interest rate is much lower.'
      }
    ],
    relatedCalculators: [
      {
        name: 'Home Loan Eligibility Calculator',
        slug: '/home-loan-eligibility-calculator',
        description: 'Find out how much home loan you are eligible for based on your income.'
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
    h1: 'ईएमआई कैलकुलेटर – अपने लोन की ईएमआई तुरंत कैलकुलेट करें',
    introText: 'ईएमआई (समान मासिक किश्त) वह निश्चित राशि है जो आप हर महीने अपने लोन को चुकाने के लिए बैंक को देते हैं। हमारा ईएमआई कैलकुलेटर आपको तुरंत आपकी मासिक किश्त, कुल ब्याज और होम, कार या पर्सनल लोन के लिए महीने-दर-महीने का रीपेमेंट शेड्यूल जानने में मदद करता है।',
    howToUse: [
      'वह लोन राशि (मूलधन) दर्ज करें जो आप उधार लेना चाहते हैं।',
      'बैंक या वित्तीय संस्थान द्वारा दी जाने वाली वार्षिक ब्याज दर भरें।',
      'लोन की अवधि महीनों या वर्षों में दर्ज करें।',
      'अपनी मासिक ईएमआई, कुल ब्याज और पूरा शेड्यूल तुरंत देखने के लिए कैलकुलेट पर क्लिक करें।'
    ],
    tips: [
      'अपना लोन फाइनल करने से पहले हमेशा कई बैंकों की ब्याज दरों की तुलना करें।',
      'कोशिश करें कि आपकी कुल ईएमआई देनदारियां आपकी शुद्ध मासिक आय के 40% से कम रहें।',
      'हर साल अपने होम लोन का आंशिक प्रीपेमेंट (पूर्व-भुगतान) करने से आपके कुल ब्याज का बोझ काफी कम हो सकता है।'
    ],
    faqs: [
      {
        question: 'ईएमआई क्या है?',
        answer: 'ईएमआई का मतलब समान मासिक किश्त (Equated Monthly Installment) है। यह एक निश्चित राशि है जो एक उधारकर्ता द्वारा हर महीने की एक निश्चित तारीख को ऋणदाता को चुकाई जाती है। ईएमआई में मूलधन और ब्याज दोनों शामिल होते हैं।'
      },
      {
        question: 'ईएमआई की गणना कैसे की जाती है?',
        answer: 'ईएमआई की गणना इस फॉर्मूले से की जाती है: P × R × (1+R)^N / [(1+R)^N - 1], जहां P मूलधन है, R मासिक ब्याज दर है, और N महीनों की संख्या है। हमारा कैलकुलेटर आपके लिए यह काम अपने आप कर देता है।'
      },
      {
        question: 'क्या लोन की अवधि के दौरान ईएमआई बदलती है?',
        answer: 'यदि आपने फिक्स्ड ब्याज दर चुनी है, तो आपकी ईएमआई समान रहती है। हालांकि, फ्लोटिंग रेट वाले लोन (जैसे भारत में अधिकांश होम लोन) के लिए, ब्याज दर में उतार-चढ़ाव होने पर ईएमआई या लोन की अवधि बदल सकती है।'
      },
      {
        question: 'क्या मैं अपनी ईएमआई कम कर सकता हूँ?',
        answer: 'हां, आप मूलधन में आंशिक प्रीपेमेंट करके, अपने बैंक के साथ कम ब्याज दर पर बातचीत करके, या बेहतर दरों की पेशकश करने वाले किसी अन्य बैंक में अपना लोन ट्रांसफर (बैलेंस ट्रांसफर) करके अपनी ईएमआई कम कर सकते हैं।'
      }
    ]
  }
};
