export const epfContent = {
  en: {
    pageTitle: 'EPF Calculator 2026 - Calculate PF Balance & Maturity Corpus',
    metaDescription: 'Free EPF calculator to compute retirement corpus, interest earned, and monthly contributions based on latest EPFO interest rates and salary growth.',
    h1: 'EPF Calculator – Estimate Your Retirement Provident Fund Corpus',
    introText:
      "Employees' Provident Fund (EPF) is one of India's premier statutory retirement savings schemes governed by EPFO. A mandatory monthly deduction from your basic salary combined with an equal matching employer contribution builds a substantial tax-free corpus over your working career, powered by guaranteed compound interest.",
    howToUse: [
      'Enter your current monthly Basic Salary and Dearness Allowance (DA).',
      'Provide your current age and expected retirement age (standard is 58 years).',
      'Input your expected annual salary increment percentage (typically 5% to 10%).',
      'Adjust the EPF interest rate (current rate is 8.25% p.a. set by the EPFO Central Board of Trustees).',
      'Optionally add your existing accumulated EPF balance to see total projected maturity corpus.',
    ],
    formulaExplanation:
      'In the EPF scheme, the employee contributes 12% of (Basic + DA). The employer also contributes 12%, which is split into 3.67% towards the EPF account and 8.33% towards the Employees Pension Scheme (EPS, capped at ₹1,250/mo on a ₹15,000 wage ceiling). Interest is calculated on the running monthly balance at the EPFO annual rate (r = 8.25% p.a.) and credited at the end of the financial year.',
    solvedExamples: [
      {
        title: 'Early Career Starter (Age 25)',
        inputs: 'Current Basic: ₹25,000/mo | Current Age: 25 | Retirement: 58 (33 yrs) | Salary Hike: 5% | Rate: 8.25%',
        calculation:
          'Monthly employee contribution = 12% of ₹25,000 = ₹3,000. Employer EPF contribution (3.67%) = ₹917.50. Total monthly deposit = ₹3,917.50, increasing by 5% each year. Compounded monthly at 8.25% per annum.',
        result:
          'Employee Share: ~₹27.8 Lakhs | Employer Share: ~₹8.5 Lakhs | Interest Earned: ~₹94.8 Lakhs | Total Corpus: ~₹1.31 Crore',
      },
      {
        title: 'Mid-Career Professional (Age 35 with existing balance)',
        inputs: 'Current Basic: ₹60,000/mo | Current Age: 35 | Retirement: 58 (23 yrs) | Existing Balance: ₹8 Lakhs | Salary Hike: 7% | Rate: 8.25%',
        calculation:
          'Existing ₹8 Lakhs compounds over 23 years while monthly employee deposit of ₹7,200 and employer deposit of ₹2,202 scale annually by 7%.',
        result:
          'Employee Share: ~₹49.8 Lakhs | Employer Share: ~₹15.2 Lakhs | Interest Earned: ~₹1.52 Crore | Total Corpus: ~₹2.25 Crore',
      },
      {
        title: 'Senior Executive (Age 45)',
        inputs: 'Current Basic: ₹1,20,000/mo | Current Age: 45 | Retirement: 60 (15 yrs) | Salary Hike: 6% | Rate: 8.25%',
        calculation:
          'Monthly total contribution starts at ₹18,804/mo. With annual salary increments over 15 years, compound interest yields massive wealth multiplication.',
        result:
          'Total Contribution: ~₹52.4 Lakhs | Interest Earned: ~₹55.1 Lakhs | Total Corpus: ~₹1.07 Crore',
      },
    ],
    tips: [
      'Avoid withdrawing your EPF balance when switching jobs; use Universal Account Number (UAN) transfer to maintain continuous compounding and preserve tax-free status.',
      'Withdrawals before 5 continuous years of service are subject to TDS and taxed as income from other sources.',
      'Opt for Voluntary Provident Fund (VPF) if you want to contribute more than 12% of basic salary to earn the same high government-backed interest.',
      'Interest on employee EPF contributions exceeding ₹2.5 Lakhs in a financial year is taxable as per Finance Act rules.',
      'Nomination via the EPFO Unified Member Portal (e-Nomination) is vital for seamless claim settlement by family members.',
    ],
    commonMistakes: [
      'Premature withdrawal of PF for short-term discretionary expenses, resetting the compounding snowball.',
      'Assuming the entire 12% employer contribution goes to EPF (in reality, 8.33% goes to EPS pension pool).',
      'Failing to link Aadhaar, PAN, and active bank account with your UAN.',
      'Ignoring the ₹2.5 Lakh annual employee contribution taxation threshold on interest income.',
    ],
    faqs: [
      {
        question: 'What is the current EPF interest rate in India?',
        answer:
          'The EPFO Central Board of Trustees (CBT) has declared an interest rate of 8.25% per annum for the recent financial years. The interest is compounded annually and calculated on monthly running balances.',
      },
      {
        question: 'How is employer contribution divided between EPF and EPS?',
        answer:
          'The employer’s 12% contribution is split into two parts: 3.67% goes directly to the employee’s EPF account, and 8.33% is diverted to the Employees’ Pension Scheme (EPS), subject to a statutory wage ceiling of ₹15,000 (maximum EPS contribution of ₹1,250 per month).',
      },
      {
        question: 'Is EPF maturity corpus completely tax-free?',
        answer:
          'Yes, EPF follows the EEE (Exempt-Exempt-Exempt) tax regime. The contribution qualifies for deduction under Section 80C, interest earned is tax-free (up to ₹2.5 Lakh annual employee contribution), and the final maturity corpus after 5 years of continuous service is 100% exempt from income tax.',
      },
      {
        question: 'What is VPF and can I contribute more than 12%?',
        answer:
          'Voluntary Provident Fund (VPF) allows employees to voluntarily contribute up to 100% of their Basic + DA into their PF account. VPF earns the exact same interest rate as EPF and shares identical tax rules.',
      },
      {
        question: 'Can I withdraw EPF before retirement?',
        answer:
          'Partial withdrawals (advances) are permitted for specified life events such as buying/constructing a home, medical emergencies, higher education, or marriage after completing specified years of service.',
      },
      {
        question: 'What happens to EPF interest if I leave employment?',
        answer:
          'If an account receives no contributions for 36 months after leaving service before retirement age, it becomes inoperative. However, inoperative accounts continue to earn interest until the member reaches 58 years of age.',
      },
      {
        question: 'How is interest calculated on monthly EPF balances?',
        answer:
          'At the end of each month, the closing balance (previous balance + new contributions) is recorded. Monthly interest is calculated as (Monthly Balance × Annual Rate / 1200). At the end of the financial year (March 31), the sum of all 12 monthly interest amounts is added to the principal balance.',
      },
      {
        question: 'How do I check my EPF balance online?',
        answer:
          'You can check your EPF passbook on the EPFO Unified Portal (epfindia.gov.in), through the UMANG mobile app, or by sending an SMS "EPFOHO UAN ENG" to 7738299899 from your registered mobile number.',
      },
    ],
    relatedCalculators: [
      { name: 'NPS Calculator', slug: 'nps-calculator', description: 'Estimate retirement pension and lump sum under the National Pension System.' },
      { name: 'PPF Calculator', slug: 'ppf-calculator', description: 'Calculate Public Provident Fund maturity with 15-year tax-free compounding.' },
      { name: 'Gratuity Calculator', slug: 'gratuity-calculator', description: 'Compute statutory gratuity payout based on years of continuous service.' },
    ],
  },
  hi: {
    pageTitle: 'ईपीएफ कैलकुलेटर 2026 - पीएफ बैलेंस और रिटायरमेंट कॉर्पस की गणना करें',
    metaDescription: 'नवीनतम ईपीएफओ ब्याज दरों और वेतन वृद्धि के आधार पर अपने पीएफ रिटायरमेंट कॉर्पस, कुल ब्याज और मासिक योगदान की गणना करें।',
    h1: 'ईपीएफ कैलकुलेटर – अपने भविष्य निधि रिटायरमेंट फंड का अनुमान लगाएं',
    introText:
      'कर्मचारी भविष्य निधि (EPF) भारत सरकार द्वारा संचालित प्रमुख सामाजिक सुरक्षा व बचत योजना है। आपके मासिक मूल वेतन में से की गई 12% कटौती और नियोक्ता के बराबर अंशदान से चक्रवृद्धि ब्याज के साथ एक बड़ा कर-मुक्त रिटायरमेंट फंड तैयार होता है।',
    howToUse: [
      'अपना वर्तमान मासिक मूल वेतन (Basic Salary) और महंगाई भत्ता (DA) दर्ज करें।',
      'अपनी वर्तमान आयु और सेवानिवृत्ति आयु (मानक 58 वर्ष) दर्ज करें।',
      'अपनी अपेक्षित वार्षिक वेतन वृद्धि प्रतिशत (जैसे 5% या 10%) दर्ज करें।',
      'ईपीएफ ब्याज दर (वर्तमान में 8.25% प्रति वर्ष) की पुष्टि करें।',
      'यदि पहले से कोई पीएफ बैलेंस है, तो उसे जोड़कर कुल परिपक्वता राशि देखें।',
    ],
    tips: [
      'नौकरी बदलते समय पीएफ राशि निकालने के बजाय यूएएन (UAN) के माध्यम से ट्रांसफर करें ताकि चक्रवृद्धि ब्याज का लाभ जारी रहे।',
      '5 वर्ष से कम की सेवा में पीएफ निकासी पर टीडीएस (TDS) और टैक्स लागू होता है।',
      'यदि आप अधिक बचत करना चाहते हैं तो वीपीएफ (VPF) के जरिए 12% से अधिक निवेश कर सकते हैं।',
    ],
    faqs: [
      {
        question: 'वर्तमान में ईपीएफ की ब्याज दर क्या है?',
        answer: 'ईपीएफओ (EPFO) ने हालिया वित्तीय वर्षों के लिए 8.25% वार्षिक ब्याज दर निर्धारित की है, जिसकी गणना मासिक रनिंग बैलेंस पर की जाती है।',
      },
      {
        question: 'क्या ईपीएफ का पूरा पैसा टैक्स-फ्री होता है?',
        answer: 'हां, 5 वर्ष की निरंतर सेवा के बाद निकाला गया ईपीएफ कॉर्पस और उस पर अर्जित ब्याज पूरी तरह से आयकर मुक्त (EEE श्रेणी) होता है।',
      },
      {
        question: 'नियोक्ता का 12% अंशदान कैसे बांटा जाता है?',
        answer: 'नियोक्ता के 12% में से 3.67% सीधे कर्मचारी के ईपीएफ खाते में जाता है और 8.33% कर्मचारी पेंशन योजना (EPS) में जाता है।',
      },
      {
        question: 'वीपीएफ (VPF) क्या है?',
        answer: 'स्वैच्छिक भविष्य निधि (VPF) के तहत कर्मचारी अपनी इच्छा से 12% से अधिक मूल वेतन पीएफ में जमा कर सकते हैं, जिस पर ईपीएफ के समान ही ब्याज मिलता है।',
      },
    ],
  },
};
