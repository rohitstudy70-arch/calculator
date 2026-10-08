export const mutualFundContent = {
  en: {
    pageTitle: 'Mutual Fund Calculator - SIP & Lumpsum Returns | CalcMaster',
    metaDescription:
      'Calculate mutual fund returns online for SIP & lumpsum investments. Free mutual fund calculator with wealth growth charts, yearly schedule & tax guide.',
    h1: 'Mutual Fund Calculator – SIP & Lumpsum Wealth Returns',
    introText:
      'Plan your mutual fund investments and estimate future returns. Calculate expected maturity wealth for Systematic Investment Plans (SIP), one-time lumpsum investments, and financial goal targets with year-by-year compounding breakdowns.',
    howToUse: [
      'Select your investment method: Monthly SIP or One-Time Lumpsum.',
      'Enter the investment amount (e.g., ₹5,000/month or ₹2,00,000 one-time).',
      'Select your expected annual rate of return (historically 12% to 15% for Indian equity mutual funds).',
      'Choose your investment tenure in years (e.g., 5, 10, 15, or 20 years).',
      'View your estimated maturity corpus, total wealth gain, and invested capital breakup.',
      'Analyze the annual growth chart and year-by-year compounding table.',
      'Download your customized mutual fund investment report as a PDF or Excel sheet.',
    ],
    formulaExplanation: `Mutual Fund Compounding Formulas:

1. Systematic Investment Plan (SIP) Formula:
   M = P × [((1 + i)^n - 1) / i] × (1 + i)
   Where:
   • M = Maturity Value
   • P = Monthly SIP amount
   • i = Periodic monthly rate of return = (Annual Return % / 12 / 100)
   • n = Total number of monthly installments = (Tenure in Years × 12)

2. One-Time Lumpsum Investment Formula:
   A = P × (1 + r / 100)^t
   Where:
   • A = Future maturity amount
   • P = Initial lumpsum principal
   • r = Expected annual rate of return (%)
   • t = Investment horizon in years

Mutual fund returns compound over time, meaning profits earned each year generate additional returns in subsequent years.`,
    solvedExamples: [
      {
        title: 'Example 1: 15-Year Wealth Creation via SIP',
        inputs: 'Monthly SIP: ₹10,000 | Expected Return: 12% | Tenure: 15 Years',
        calculation: 'Total Invested = 10,000 × 180 months = ₹18,00,000\nCompounded Corpus = ₹50,45,760\nEstimated Wealth Gain = ₹32,45,760',
        result: 'Maturity Value = ₹50.46 Lakh (Gain: +180%)',
      },
      {
        title: 'Example 2: 10-Year Lumpsum Investment in Equity Fund',
        inputs: 'Lumpsum: ₹5,00,000 | Expected Return: 14% | Tenure: 10 Years',
        calculation: 'A = 5,00,000 × (1 + 0.14)^10\nA = 5,00,000 × 3.7072 = ₹18,53,610\nNet Gain = ₹13,53,610',
        result: 'Maturity Value = ₹18.54 Lakh (3.7x Wealth Multiple)',
      },
      {
        title: 'Example 3: Aggressive ₹1 Crore Retirement Goal (20 Years)',
        inputs: 'Target: ₹1 Crore | Return: 13% | Tenure: 20 Years',
        calculation: 'Required Monthly SIP = ~₹8,800/month\nTotal Invested over 20 years = ₹21.12 Lakh\nCompounded Corpus = ₹1.01 Crore',
        result: 'Monthly SIP of ₹8,800 creates ₹1 Crore corpus',
      },
    ],
    tips: [
      'Increase your SIP amount by 10% each year (Step-up SIP) to reach your financial goals up to 5 years earlier.',
      'Equity mutual funds have historically outperformed inflation, gold, and fixed deposits over 7+ year holding periods.',
      'Avoid pausing SIPs during market downturns; falling markets provide more units at lower NAVs (Rupee Cost Averaging).',
      'Under current Indian income tax rules, Long-Term Capital Gains (LTCG) on equity mutual funds are tax-exempt up to ₹1.25 Lakh per financial year.',
    ],
    commonMistakes: [
      'Expecting guaranteed returns; mutual fund returns are subject to market volatility and are not fixed like bank FDs.',
      'Stopping SIP investments prematurely during temporary short-term market corrections.',
      'Over-diversifying into too many overlapping mutual funds (4–5 well-chosen schemes are usually sufficient).',
      'Ignoring expense ratios and fund exit loads when selecting mutual fund schemes.',
    ],
    faqs: [
      {
        question: 'What is a mutual fund calculator?',
        answer:
          'A mutual fund calculator is an online financial tool that projects the future maturity value of your mutual fund investments based on your monthly SIP or lumpsum contributions and expected rate of return.',
      },
      {
        question: 'Which is better: SIP or Lumpsum in mutual funds?',
        answer:
          'SIP is ideal for salaried earners because it inculcates disciplined monthly savings and benefits from rupee cost averaging. Lumpsum is effective when you have idle surplus cash and a long investment horizon (5+ years).',
      },
      {
        question: 'What is a realistic expected return for mutual funds in India?',
        answer:
          'Historically, diversified Indian equity mutual funds (Flexi-cap, Large & Mid-cap) have delivered 12% to 15% annualized returns over 10+ year horizons. Debt funds typically return 6.5% to 8%, and hybrid funds average 10% to 12%.',
      },
      {
        question: 'How are mutual fund returns taxed in India (Budget 2024–2026)?',
        answer:
          'For equity mutual funds held for more than 12 months, Long-Term Capital Gains (LTCG) above ₹1.25 Lakh per financial year are taxed at 12.5%. Gains held for 12 months or less (STCG) are taxed at 20%.',
      },
      {
        question: 'Can I withdraw my mutual fund investment anytime?',
        answer:
          'Open-ended mutual funds can be redeemed anytime within 1 to 3 business days, though an exit load of ~1% may apply if redeemed within the first year. ELSS tax-saving funds have a mandatory 3-year lock-in period.',
      },
      {
        question: 'Mutual fund calculator kaise use karein (Hindi)?',
        answer:
          'Apni monthly SIP rashi (ya lumpsum amount), apekshit return rate (jaise 12%) aur nivesh samay (saal) dalein. Calculator turant aapka kul nivesh, munafa aur maturity corpus dikha dega.',
      },
      {
        question: 'What is the power of compounding in mutual funds?',
        answer:
          'Compounding means generating returns on your past returns. Over 15 to 20 years, compounding typically accounts for 60% to 80% of your total mutual fund wealth, far exceeding your principal investment.',
      },
      {
        question: 'Does this mutual fund calculator include inflation adjustment?',
        answer:
          'By default, the calculator shows nominal returns. You can check the real purchasing power of your future corpus using our linked Inflation Calculator.',
      },
    ],
    relatedCalculators: [
      { slug: 'sip', name: 'SIP Calculator', description: 'Detailed Systematic Investment Plan calculator' },
      { slug: 'lumpsum', name: 'Lumpsum Calculator', description: 'One-time mutual fund returns calculator' },
      { slug: 'cagr', name: 'CAGR Calculator', description: 'Compound Annual Growth Rate calculator' },
      { slug: 'roi', name: 'ROI Calculator', description: 'Return on Investment calculator' },
    ],
  },
  hi: {
    pageTitle: 'म्यूचुअल फंड कैलकुलेटर - SIP व एकमुश्त रिटर्न | CalcMaster',
    metaDescription:
      'म्यूचुअल फंड एसआईपी और एकमुश्त निवेश पर रिटर्न व मैच्योरिटी कॉर्पस ऑनलाइन निकालें। फ्री म्यूचुअल फंड वेल्थ कैलकुलेटर।',
    h1: 'म्यूचुअल फंड कैलकुलेटर – SIP व एकमुश्त वेल्थ रिटर्न',
    introText:
      'अपने म्यूचुअल फंड निवेश की भविष्य की वैल्यू निकालें। मासिक SIP और एकमुश्त (Lumpsum) निवेश पर चक्रवृद्धि लाभ, ग्राफ और पूरा विवरण देखें।',
  },
};
