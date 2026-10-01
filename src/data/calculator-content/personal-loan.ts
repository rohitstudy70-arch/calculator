export const personalLoanContent = {
  en: {
    pageTitle: 'Personal Loan EMI Calculator 2026 - Calculate Monthly EMI & APR',
    metaDescription: 'Free Personal Loan EMI calculator to calculate monthly EMI, total interest, processing fees, and effective APR for instant unsecured loans in India.',
    h1: 'Personal Loan EMI Calculator – Calculate Monthly EMI & Total Interest',
    introText:
      'A Personal Loan is an unsecured financing option provided by Indian banks and NBFCs without requiring collateral. Because personal loans carry higher interest rates (typically 10.5% to 24% p.a.), calculating your monthly EMI, processing fees, and effective APR before borrowing helps you avoid debt traps.',
    howToUse: [
      'Enter the desired Personal Loan principal amount in INR (from ₹10,000 up to ₹50,00,000).',
      'Input the annual interest rate quoted by your lender (reducing balance rate).',
      'Select your repayment tenure in months or years (typically 12 to 60 months).',
      'Input the upfront processing fee percentage (typically 1.5% to 3.0% + 18% GST).',
      'Review your exact monthly EMI, total interest payable, total cost of loan, and month-by-month repayment schedule.',
    ],
    formulaExplanation:
      'Personal loans in India use the reducing-balance EMI formula:\nEMI = [P × r × (1 + r)^n] ÷ [(1 + r)^n - 1]\n\nWhere:\n• P = Loan Principal amount\n• r = Monthly interest rate (Annual Rate ÷ 12 ÷ 100)\n• n = Total loan tenure in months\n\nTotal Loan Cost = (EMI × n) + Upfront Processing Fee (including 18% GST).',
    solvedExamples: [
      {
        title: 'Wedding / Lifestyle Loan (₹3 Lakhs, 3 Years)',
        inputs: 'Principal: ₹3,00,000 | Rate: 12.0% p.a. | Tenure: 36 Months | Processing Fee: 2%',
        calculation:
          'Monthly rate r = 12/1200 = 0.01. EMI = [300000 × 0.01 × (1.01)^36] / [(1.01)^36 - 1] = ₹9,964/mo. Processing fee = 2% of ₹3L = ₹6,000 + ₹1,080 GST = ₹7,080.',
        result:
          'Monthly EMI: ₹9,964 | Total Interest: ₹58,717 | Total Processing Fees: ₹7,080 | Total Cost: ₹3,65,797',
      },
      {
        title: 'Emergency Medical Loan (₹5 Lakhs, 5 Years)',
        inputs: 'Principal: ₹5,00,000 | Rate: 14.5% p.a. | Tenure: 60 Months | Processing Fee: 1.5%',
        calculation:
          'Monthly rate r = 14.5/1200 = 0.012083. EMI = ₹11,764/mo. Total repayment = ₹7,05,840.',
        result:
          'Monthly EMI: ₹11,764 | Total Interest: ₹2,05,840 | Total Fees: ₹8,850 | Total Cost: ₹7,14,690',
      },
      {
        title: 'Debt Consolidation Loan (₹10 Lakhs, 4 Years)',
        inputs: 'Principal: ₹10,00,000 | Rate: 11.0% p.a. | Tenure: 48 Months',
        calculation:
          'Monthly rate r = 11/1200 = 0.009167. EMI = ₹25,845/mo. Total interest = ₹2,40,580.',
        result:
          'Monthly EMI: ₹25,845 | Total Interest: ₹2,40,580 | Total Repayment: ₹12,40,580',
      },
    ],
    tips: [
      'Aim for a CIBIL credit score of 750+ to negotiate interest rates below 12% and lower processing fees.',
      'Check whether the lender charges flat interest or reducing balance interest (flat rate of 10% is equivalent to ~18% reducing balance!).',
      'Keep your total Fixed Obligation to Income Ratio (FOIR) below 40% of your monthly net income to prevent financial stress.',
      'Watch out for hidden prepayment penalties; RBI regulations prohibit foreclosure charges on floating-rate loans, but fixed-rate personal loans may levy 2% to 5% charges.',
      'Always consider borrowing against fixed deposits or gold before opting for an unsecured personal loan to save 4% to 6% in interest.',
    ],
    commonMistakes: [
      'Falling for deceptive "flat interest rate" advertisements that mask much higher real interest costs.',
      'Applying for personal loans across multiple banks simultaneously, triggering hard credit inquiries and lowering your CIBIL score.',
      'Ignoring the 18% GST applied on loan processing and administrative charges.',
      'Choosing a very long tenure (e.g. 7 years) just to lower the EMI, which doubles your overall interest outgo.',
    ],
    faqs: [
      {
        question: 'What is the difference between Flat Rate and Reducing Balance Rate?',
        answer:
          'In a flat rate loan, interest is calculated on the initial principal for the entire tenure, meaning you pay interest on money you have already repaid. In a reducing balance loan, interest is calculated only on the remaining unpaid loan balance each month. A 10% flat rate is approximately equal to an 18% reducing balance rate.',
      },
      {
        question: 'What are the typical processing fees for personal loans in India?',
        answer:
          'Most Indian banks (HDFC, SBI, ICICI, Axis) charge processing fees between 1.0% and 3.0% of the sanctioned loan amount, plus mandatory 18% GST.',
      },
      {
        question: 'Can I prepay or foreclose my personal loan early?',
        answer:
          'Yes. Most lenders allow prepayment after a mandatory lock-in period (usually 6 to 12 months). While RBI prohibits foreclosure charges on floating-rate personal loans for individuals, fixed-rate loans may carry a 2% to 4% prepayment fee.',
      },
      {
        question: 'How does my CIBIL score impact my personal loan interest rate?',
        answer:
          'A CIBIL score of 750+ qualifies you for preferred interest rates (10.5%–13%), higher loan amounts, and fast approvals. A score below 700 may lead to rejection or interest rates as high as 18%–24%.',
      },
      {
        question: 'Are personal loan repayments eligible for income tax deductions?',
        answer:
          'Generally, personal loans do not carry tax deductions. However, if the loan amount is proven to have been used for home renovation (Section 24b) or business investment, the interest component may be claimed as a tax deduction.',
      },
      {
        question: 'What is the maximum tenure for a personal loan?',
        answer:
          'Most commercial banks offer personal loans with tenures ranging from 12 months (1 year) to 60 months (5 years). Select public sector banks may extend tenures up to 72 or 84 months for high-income applicants.',
      },
    ],
    relatedCalculators: [
      { name: 'Loan Prepayment Calculator', slug: 'loan-prepayment-calculator', description: 'See how much interest you can save by prepaying your personal loan.' },
      { name: 'Home Loan EMI Calculator', slug: 'home-loan-calculator', description: 'Calculate EMIs for property purchases with tax-saving benefits.' },
      { name: 'Car Loan Calculator', slug: 'car-loan-calculator', description: 'Compute monthly vehicle finance EMIs and on-road acquisition costs.' },
    ],
  },
  hi: {
    pageTitle: 'पर्सनल लोन ईएमआई कैलकुलेटर 2026 - मासिक किस्त व ब्याज की गणना करें',
    metaDescription: 'पर्सनल लोन की मासिक ईएमआई, कुल ब्याज, प्रोसेसिंग फीस और इफेक्टिव एपीआर का तुरंत हिसाब लगाएं।',
    h1: 'पर्सनल लोन ईएमआई कैलकुलेटर – मासिक ईएमआई और कुल ब्याज जानें',
    introText:
      'पर्सनल लोन एक अनसिक्योर्ड लोन है जो किसी भी संपत्ति को गिरवी रखे बिना तुरंत वित्तीय जरूरतों के लिए मिलता है। बैंक से लोन लेने से पहले अपनी ईएमआई और प्रोसेसिंग फीस का हिसाब लगाना बेहद जरूरी है।',
    howToUse: [
      'वांछित पर्सनल लोन राशि (₹10,000 से ₹50 लाख तक) दर्ज करें।',
      'बैंक द्वारा बताई गई वार्षिक ब्याज दर (%) भरें।',
      'लोन की अवधि (महीनों या वर्षों में) चुनें।',
      'प्रोसेसिंग फीस प्रतिशत दर्ज करें।',
      'तुरंत अपनी मासिक ईएमआई और कुल ब्याज देखें।',
    ],
    tips: [
      '750 से अधिक सिबिल (CIBIL) स्कोर रखने पर सबसे कम ब्याज दर मिलती है।',
      'हमेशा रिड्यूसिंग बैलेंस (Reducing Balance) ब्याज दर पर ही लोन लें, फ्लैट रेट पर नहीं।',
    ],
    faqs: [
      {
        question: 'फ्लैट रेट और रिड्यूसिंग बैलेंस रेट में क्या अंतर है?',
        answer: 'फ्लैट रेट में पूरे कार्यकाल के दौरान मूलधन पर ब्याज लगता है, जबकि रिड्यूसिंग बैलेंस में हर महीने चुकाए गए मूलधन के बाद बची हुई राशि पर ही ब्याज लगता है।',
      },
      {
        question: 'क्या पर्सनल लोन पर प्रीपेमेंट पेनल्टी लगती है?',
        answer: 'फ्लोटिंग रेट पर्सनल लोन पर आरबीआई के नियमानुसार कोई पेनल्टी नहीं लगती, लेकिन फिक्स्ड रेट लोन पर 2% से 4% तक शुल्क लग सकता है।',
      },
    ],
  },
};
