export const npsContent = {
  en: {
    pageTitle: 'NPS Calculator 2026 - Calculate Pension & Lumpsum Corpus',
    metaDescription: 'Calculate your National Pension System (NPS) maturity corpus, monthly pension, and tax-free lump sum withdrawal based on PFRDA rules.',
    h1: 'NPS Calculator – Plan Retirement Pension & Lump Sum Wealth',
    introText:
      'The National Pension System (NPS) is a voluntary, long-term retirement investment program regulated by PFRDA. Offering market-linked returns across equities and government debt, NPS allows you to build a substantial retirement fund with exclusive tax deductions under Section 80CCD.',
    howToUse: [
      'Enter your intended monthly investment amount (minimum ₹500/month).',
      'Provide your current age and planned retirement age (standard is 60 years).',
      'Set your expected annual return on investment (historical average ranges between 9% and 12%).',
      'Choose the percentage of corpus you wish to allocate to an annuity plan (minimum 40% mandatory as per PFRDA).',
      'Input the expected annuity return rate from Annuity Service Providers (typically 6% to 7%).',
    ],
    formulaExplanation:
      'NPS uses monthly compound accumulation: Total Corpus = P × [((1 + r)^n - 1) / r] × (1 + r), where P is monthly deposit, r is monthly rate of return (annual return / 12 / 100), and n is total months to retirement. At age 60, you can withdraw up to 60% tax-free as a lump sum, while a minimum 40% is converted into an annuity that pays a lifelong monthly pension: Monthly Pension = (Annuity Corpus × Annual Annuity Rate) / 12.',
    solvedExamples: [
      {
        title: 'Young Professional Starting Early (Age 25)',
        inputs: 'Monthly Deposit: ₹5,000 | Age: 25 to 60 (35 yrs) | Expected Return: 10% | Annuity: 40% | Annuity Rate: 6%',
        calculation:
          'Total investment over 420 months = ₹21 Lakhs. Compounded at 10% per annum, the total maturity corpus grows to ~₹1.91 Crore.',
        result:
          'Total Invested: ₹21 Lakhs | Total Corpus: ~₹1.91 Crore | Tax-Free Lump Sum (60%): ~₹1.15 Crore | Annuity Corpus (40%): ~₹76.5 Lakhs | Monthly Pension: ~₹38,250/month',
      },
      {
        title: 'Mid-Career Aggressive Saver (Age 35)',
        inputs: 'Monthly Deposit: ₹15,000 | Age: 35 to 60 (25 yrs) | Expected Return: 11% | Annuity: 40% | Annuity Rate: 6.5%',
        calculation:
          'Total investment over 300 months = ₹45 Lakhs. Compounded at 11% per annum, maturity corpus reaches ~₹2.0 Crore.',
        result:
          'Total Invested: ₹45 Lakhs | Total Corpus: ~₹2.0 Crore | Tax-Free Lump Sum: ~₹1.20 Crore | Annuity Corpus: ~₹80 Lakhs | Monthly Pension: ~₹43,300/month',
      },
      {
        title: 'Late Career Planner (Age 45)',
        inputs: 'Monthly Deposit: ₹25,000 | Age: 45 to 60 (15 yrs) | Expected Return: 9.5% | Annuity: 50% | Annuity Rate: 6%',
        calculation:
          'Total investment over 180 months = ₹45 Lakhs. Maturity corpus equals ~₹1.03 Crore.',
        result:
          'Total Invested: ₹45 Lakhs | Total Corpus: ~₹1.03 Crore | Lump Sum (50%): ~₹51.5 Lakhs | Annuity Corpus (50%): ~₹51.5 Lakhs | Monthly Pension: ~₹25,750/month',
      },
    ],
    tips: [
      'Take advantage of the exclusive ₹50,000 tax deduction under Section 80CCD(1B), over and above the ₹1.5 Lakh limit under Section 80C.',
      'Choose the "Active Choice" asset allocation if you understand equity risk, or "Auto Choice" (Lifecycle Funds) to automatically de-risk as you approach retirement.',
      'NPS Tier-I is your primary retirement account with lock-in, while Tier-II is a flexible investment account with no lock-in.',
      'The 60% lump-sum withdrawal at age 60 is 100% tax-exempt under Section 10(12A).',
      'You can defer your annuity purchase or withdrawal up to the age of 75 if you do not immediately need the retirement funds.',
    ],
    commonMistakes: [
      'Confusing NPS Tier-I (mandatory lock-in till age 60) with NPS Tier-II (open-ended savings account).',
      'Choosing a conservative 100% government bond portfolio at a young age, missing out on equity wealth compounding.',
      'Forgetting that annuity income received monthly is taxable as per your income tax slab in retirement years.',
      'Not claiming the additional ₹50,000 deduction under Section 80CCD(1B) in your ITR.',
    ],
    faqs: [
      {
        question: 'What are the tax benefits of investing in NPS?',
        answer:
          'NPS offers triple tax benefits: 1) Up to ₹1.5 Lakh deduction under Section 80CCD(1) within Section 80C, 2) Exclusive additional deduction of up to ₹50,000 under Section 80CCD(1B), and 3) Employer contribution deduction under Section 80CCD(2) up to 10% (14% for Central Govt) of Basic + DA.',
      },
      {
        question: 'What is the minimum annuity percentage required on retirement?',
        answer:
          'As per PFRDA regulations, a subscriber must utilize at least 40% of their accumulated retirement corpus to purchase an annuity from an approved Annuity Service Provider (ASP). Up to 60% can be withdrawn as a tax-free lump sum.',
      },
      {
        question: 'Is the 60% lump-sum withdrawal tax-free?',
        answer:
          'Yes, the 60% lump-sum withdrawal from NPS at maturity (age 60 or superannuation) is completely exempt from income tax under Section 10(12A).',
      },
      {
        question: 'Can I withdraw from NPS before age 60?',
        answer:
          'Partial withdrawals up to 25% of your own contributions are allowed after 3 years for specific reasons (children education, marriage, home purchase, critical illnesses). Premature exit before age 60 requires 80% of corpus to be put into an annuity.',
      },
      {
        question: 'What is the difference between Auto Choice and Active Choice?',
        answer:
          'In Active Choice, you decide the exact asset mix (Equity E up to 75%, Corporate Bonds C, Govt Securities G, Alternative Assets A up to 5%). In Auto Choice, asset allocation is dynamically managed based on your age lifecycle.',
      },
      {
        question: 'Is the monthly pension taxable?',
        answer:
          'Yes, while the purchase of annuity is tax-exempt, the monthly pension payouts received from the annuity provider are considered income and taxed as per your applicable income tax slab rate in the year of receipt.',
      },
      {
        question: 'Who can open an NPS account in India?',
        answer:
          'Any citizen of India (resident or non-resident/NRI) between 18 and 70 years of age can open an NPS account through eNPS or any Point of Presence (PoP) bank.',
      },
      {
        question: 'Can I extend my NPS account beyond age 60?',
        answer:
          'Yes, you can stay invested and continue contributing to your NPS account up to the age of 75 years.',
      },
    ],
    relatedCalculators: [
      { name: 'EPF Calculator', slug: 'epf-calculator', description: 'Estimate retirement corpus accumulated through the Employees Provident Fund.' },
      { name: 'PPF Calculator', slug: 'ppf-calculator', description: 'Calculate tax-free returns under Public Provident Fund.' },
      { name: 'SIP Calculator', slug: 'sip-calculator', description: 'Plan mutual fund wealth generation with systematic monthly investments.' },
    ],
  },
  hi: {
    pageTitle: 'एनपीएस कैलकुलेटर 2026 - राष्ट्रीय पेंशन प्रणाली से पेंशन व एकमुश्त राशि की गणना करें',
    metaDescription: 'पीएफआरडीए नियमों के आधार पर अपने एनपीएस रिटायरमेंट कॉर्पस, मासिक पेंशन और टैक्स-फ्री एकमुश्त निकासी का तुरंत अनुमान लगाएं।',
    h1: 'एनपीएस कैलकुलेटर – रिटायरमेंट पेंशन और एकमुश्त फंड की योजना बनाएं',
    introText:
      'राष्ट्रीय पेंशन प्रणाली (NPS) भारत सरकार द्वारा विनियमित एक उत्कृष्ट दीर्घकालिक सेवानिवृत्ति योजना है। इसमें निवेश करके आप इक्विटी और डेट के माध्यम से मजबूत वेल्थ बना सकते हैं तथा धारा 80CCD के तहत अतिरिक्त टैक्स छूट पा सकते हैं।',
    howToUse: [
      'अपनी मासिक निवेश राशि दर्ज करें (न्यूनतम ₹500 प्रति माह)।',
      'अपनी वर्तमान आयु और लक्षित सेवानिवृत्ति आयु (मानक 60 वर्ष) दर्ज करें।',
      'अपनी अपेक्षित वार्षिक रिटर्न दर दर्ज करें (औसतन 9% से 12%)।',
      'वार्षिकी (Annuity) में लगाई जाने वाली प्रतिशत राशि चुनें (न्यूनतम 40% अनिवार्य)।',
      'पेंशन प्रदाता से अपेक्षित वार्षिक एन्युइटी दर (6% से 7%) दर्ज करें।',
    ],
    tips: [
      'धारा 80CCD(1B) के तहत ₹50,000 की अतिरिक्त टैक्स कटौती का लाभ अवश्य लें, जो 80C की 1.5 लाख की सीमा से अलग है।',
      '60 वर्ष की आयु में निकाला गया 60% एकमुश्त फंड पूरी तरह से टैक्स-फ्री होता है।',
      'यदि आपकी उम्र कम है, तो अधिक इक्विटी एक्सपोजर (Active Choice) का विकल्प चुनकर बड़ा फंड बनाएं।',
    ],
    faqs: [
      {
        question: 'एनपीएस में कौन-से टैक्स लाभ मिलते हैं?',
        answer: 'एनपीएस में धारा 80CCD(1) के तहत ₹1.5 लाख तक, और धारा 80CCD(1B) के तहत ₹50,000 की विशेष अतिरिक्त टैक्स छूट मिलती है।',
      },
      {
        question: 'क्या 60% एकमुश्त निकासी पर कोई टैक्स लगता है?',
        answer: 'नहीं, 60 वर्ष की आयु पर एनपीएस से 60% तक की एकमुश्त निकासी आयकर कानून की धारा 10(12A) के तहत पूरी तरह कर-मुक्त है।',
      },
      {
        question: 'एन्युइटी (Annuity) का क्या मतलब है?',
        answer: 'एन्युइटी वह न्यूनतम 40% राशि है जिसे जीवन बीमा कंपनी (जैसे LIC, SBI Life) में जमा किया जाता है, जिसके बदले आपको जीवनभर मासिक पेंशन मिलती है।',
      },
      {
        question: 'एनपीएस टियर-1 और टियर-2 में क्या अंतर है?',
        answer: 'टियर-1 मुख्य रिटायरमेंट खाता है जिसमें 60 वर्ष तक लॉक-इन और टैक्स छूट मिलती है। टियर-2 एक स्वैच्छिक बचत खाता है जिसमें से कभी भी पैसे निकाले जा सकते हैं।',
      },
    ],
  },
};
