export const carLoanContent = {
  en: {
    pageTitle: 'Car Loan EMI Calculator 2026 - Auto Loan | CalcMaster',
    metaDescription:
      'Calculate monthly car loan EMI, on-road vehicle cost, down payment & total interest for new/used cars in India. Instant amortization & PDF export!',
    h1: 'Car Loan EMI Calculator – Plan Your Dream Car Financing',
    introText:
      'Buying a car is one of the most exciting financial milestones. A Car Loan (Auto Loan) allows you to purchase a new or used four-wheeler with flexible down payment options and tenures up to 7 years. Calculate your monthly EMI and total interest outgo before visiting the dealership.',
    howToUse: [
      'Enter the total On-Road Price of your car (including ex-showroom price, RTO registration, and insurance).',
      'Specify your planned Down Payment percentage (typically 15% to 25%).',
      'Enter the annual auto loan interest rate offered by your bank (typically 8.5% to 11.5% for new cars).',
      'Select the loan tenure in months (e.g. 36, 60, or 84 months).',
      'Input any fixed bank processing fees to get the complete total cost of ownership.',
    ],
    formulaExplanation:
      'Car loan calculations use the reducing balance EMI formula on the funded loan amount:\nLoan Amount (P) = On-Road Price - Down Payment\nMonthly EMI = [P × r × (1 + r)^n] ÷ [(1 + r)^n - 1]\n\nWhere:\n• P = Financed vehicle amount\n• r = Monthly interest rate (Annual Rate ÷ 12 ÷ 100)\n• n = Total tenure in months\n\nTotal Vehicle Cost = Down Payment + (EMI × n) + Processing Fees.',
    solvedExamples: [
      {
        title: 'Popular Compact SUV (₹12 Lakhs On-Road)',
        inputs: 'On-Road Price: ₹12,00,000 | Down Payment: 20% (₹2.4L) | Rate: 9.0% | Tenure: 5 Years (60 Months)',
        calculation:
          'Loan Amount = ₹9,60,000. Monthly rate r = 9/1200 = 0.0075. EMI = [960000 × 0.0075 × (1.0075)^60] / [(1.0075)^60 - 1] = ₹19,928/mo.',
        result:
          'Down Payment: ₹2,40,000 | Financed Loan: ₹9,60,000 | Monthly EMI: ₹19,928 | Total Interest: ₹2,35,680 | Total Car Cost: ₹14,39,180',
      },
      {
        title: 'Entry-Level Hatchback (₹6 Lakhs On-Road)',
        inputs: 'On-Road Price: ₹6,00,000 | Down Payment: 15% (₹90k) | Rate: 8.75% | Tenure: 7 Years (84 Months)',
        calculation:
          'Loan Amount = ₹5,10,000. Monthly EMI = ₹8,128/mo. Total interest paid over 7 years = ₹1,72,752.',
        result:
          'Down Payment: ₹90,000 | Monthly EMI: ₹8,128 | Total Interest: ₹1,72,752 | Total Car Cost: ₹7,76,252',
      },
      {
        title: 'Premium Sedan (₹25 Lakhs On-Road)',
        inputs: 'On-Road Price: ₹25,00,000 | Down Payment: 30% (₹7.5L) | Rate: 8.5% | Tenure: 4 Years (48 Months)',
        calculation:
          'Loan Amount = ₹17,50,000. Monthly EMI = ₹43,122/mo. Total interest = ₹3,19,856.',
        result:
          'Down Payment: ₹7,50,000 | Monthly EMI: ₹43,122 | Total Interest: ₹3,19,856 | Total Cost: ₹28,23,356',
      },
    ],
    tips: [
      'Aim for a down payment of at least 20% to prevent "negative equity" (owing more on the loan than the depreciated market value of the car).',
      'Follow the 20/4/10 budgeting rule: 20% down payment, loan tenure no longer than 4 years, and total auto expenses (EMI + insurance + fuel) under 10% of gross monthly income.',
      'Check if your bank offers 100% on-road funding versus ex-showroom funding only (RTO and insurance require separate funding).',
      'Negotiate dealer quotes with pre-approved car loan interest rate offers from your primary salary bank.',
      'Consider electric vehicle (EV) loans: select banks provide 0.5% interest concessions on green auto loans.',
    ],
    commonMistakes: [
      'Taking a 7-year car loan to lower the EMI, resulting in interest costs that exceed 40% of the vehicle’s original value.',
      'Calculating EMI on ex-showroom price instead of the full on-road price (which includes road tax, FASTag, insurance, and accessories).',
      'Buying expensive dealer add-ons (extended warranties and basic accessories) rolled into the loan principal.',
      'Failing to compare dealer-arranged financing with public sector bank rates (SBI, Bank of Baroda).',
    ],
    faqs: [
      {
        question: 'What is the ideal loan tenure for buying a car in India?',
        answer:
          'Financial experts recommend a tenure between 3 to 5 years (36 to 60 months). While 7-year loans lower your monthly EMI, rapid vehicle depreciation means you pay disproportionately high interest on an asset losing value every year.',
      },
      {
        question: 'What is Loan-to-Value (LTV) ratio in car loans?',
        answer:
          'LTV ratio is the percentage of the car price funded by the bank. For example, if a car costs ₹10 Lakhs on-road and you make a ₹2 Lakh down payment, the bank finances ₹8 Lakhs, representing an 80% LTV.',
      },
      {
        question: 'Can I get a tax deduction on car loan EMI in India?',
        answer:
          'Salaried individuals cannot claim tax deductions on personal car loans. However, self-employed professionals and business owners can claim car loan interest as a legitimate business expense and claim vehicle depreciation under Section 32 of the Income Tax Act.',
      },
      {
        question: 'What is the interest rate difference between new and used car loans?',
        answer:
          'New car loans in India typically range from 8.5% to 11.5% p.a., whereas used (pre-owned) car loans carry significantly higher rates between 12.0% and 18.0% p.a. due to higher perceived collateral risk.',
      },
      {
        question: 'What happens to the car hypothecation after loan repayment?',
        answer:
          'Upon paying your final EMI, obtain a No Objection Certificate (NOC) and Form 35 from your lender. Submit these documents to your local RTO within 90 days to remove the bank’s hypothecation from your Vehicle Registration Certificate (RC).',
      },
    ],
    relatedCalculators: [
      { name: 'Personal Loan Calculator', slug: 'personal-loan-calculator', description: 'Compare personal loans with auto financing options.' },
      { name: 'Loan Prepayment Calculator', slug: 'loan-prepayment-calculator', description: 'Calculate how making part-payments reduces your car loan tenure.' },
      { name: 'EMI Calculator', slug: 'emi-calculator', description: 'Generic equated monthly installment calculator for all loan types.' },
    ],
  },
  hi: {
    pageTitle: 'कार लोन ईएमआई कैलकुलेटर 2026 - ऑटो लोन ब्याज व मासिक किस्त',
    metaDescription: 'नई और पुरानी कार के लिए मासिक ईएमआई, डाउन पेमेंट और कुल ब्याज का तुरंत हिसाब लगाएं।',
    h1: 'कार लोन ईएमआई कैलकुलेटर – अपनी नई कार की ईएमआई की योजना बनाएं',
    introText:
      'गाड़ी खरीदने से पहले अपनी मासिक ईएमआई, डाउन पेमेंट और कुल ब्याज का सही अनुमान लगाना एक समझदारी भरा वित्तीय कदम है। हमारा कैलकुलेटर ऑन-रोड कीमत पर सटीक गणना करता है।',
    howToUse: [
      'कार की कुल ऑन-रोड कीमत (On-road Price) दर्ज करें।',
      'अपनी डाउन पेमेंट राशि या प्रतिशत (जैसे 20%) चुनें।',
      'बैंक की ब्याज दर और लोन अवधि (वर्ष/महीने) भरें।',
      'तुरंत अपनी मासिक किस्त और कुल भुगतान देखें।',
    ],
    tips: [
      'कम से कम 20% डाउन पेमेंट करने से ब्याज का बोझ कम रहता है।',
      'कार लोन की अवधि 5 वर्ष से अधिक न रखें क्योंकि गाड़ी की रीसेल वैल्यू तेजी से घटती है।',
    ],
    faqs: [
      {
        question: 'कार लोन की औसत ब्याज दर क्या है?',
        answer: 'भारत में नई कार के लिए ब्याज दरें आमतौर पर 8.5% से 11.5% के बीच होती हैं, जबकि पुरानी कार के लिए दरें 12% से 16% तक हो सकती हैं।',
      },
      {
        question: 'लोन चुकाने के बाद आरसी से बैंक का नाम कैसे हटाएं?',
        answer: 'लोन पूरा होने पर बैंक से एनओसी (NOC) और फॉर्म 35 लेकर आरटीओ में जमा करें ताकि आरसी से हाइपोथिकेशन (Hypothecation) हट सके।',
      },
    ],
  },
};
