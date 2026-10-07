export const roiContent = {
  en: {
    pageTitle: 'ROI Calculator - Return on Investment Online | CalcMaster',
    metaDescription:
      'Calculate Return on Investment (ROI) & annualized ROI percentage online. Free investment profit, loss and annualized return calculator with charts and PDF.',
    h1: 'ROI Calculator – Return on Investment & Annualized Profit',
    introText:
      'Calculate your Return on Investment (ROI) and annualized rate of return effortlessly. Measure total gains, investment multiples, and yearly compound growth across stocks, real estate, mutual funds, or business investments.',
    howToUse: [
      'Enter the initial Amount Invested (total acquisition cost or capital outlay).',
      'Enter the Amount Returned (current market value or final sale proceeds).',
      'Specify the Investment Period in years and months to calculate annualized ROI.',
      'Instantly view your Total ROI percentage, Net Profit or Loss, and Investment Multiple.',
      'Analyze the annual growth trajectory and compound progression table.',
      'Download your comprehensive ROI assessment report as a PDF or Excel document.',
    ],
    formulaExplanation: `Return on Investment (ROI) measures the profitability or efficiency of an investment.

Formulas:
1. Net Profit / Gain:
   Net Profit = Amount Returned - Amount Invested

2. Total ROI (%):
   ROI = (Net Profit / Amount Invested) × 100

3. Investment Multiple:
   Multiple = Amount Returned / Amount Invested

4. Annualized ROI (% per year / CAGR):
   Annualized ROI = [(Amount Returned / Amount Invested)^(1 / Years) - 1] × 100
   Where Years = Years + (Months / 12).

Annualized ROI accounts for the time value of money, enabling direct performance comparisons between short-term trades and multi-year holdings.`,
    solvedExamples: [
      {
        title: 'Example 1: Stock Market Multi-Year Investment',
        inputs: 'Invested: ₹2,00,000 | Returned: ₹3,60,000 | Period: 3 Years',
        calculation: 'Net Profit = 3,60,000 - 2,00,000 = ₹1,60,000\nTotal ROI = (1,60,000 / 2,00,000) × 100 = 80.00%\nAnnualized ROI = (1.80)^(1/3) - 1 = 21.64% per year',
        result: 'Net Profit: ₹1,60,000 | Total ROI: +80.00% | Annualized: 21.64% p.a.',
      },
      {
        title: 'Example 2: Real Estate Property Sale',
        inputs: 'Invested: ₹50,00,000 | Returned: ₹95,00,000 | Period: 5 Years',
        calculation: 'Net Profit = 95,00,000 - 50,00,000 = ₹45,00,000\nTotal ROI = (45,00,000 / 50,00,000) × 100 = 90.00%\nAnnualized ROI = (1.90)^(1/5) - 1 = 13.70% per year',
        result: 'Net Profit: ₹45,00,000 | Total ROI: +90.00% | Annualized: 13.70% p.a.',
      },
      {
        title: 'Example 3: Business Project Loss Analysis',
        inputs: 'Invested: ₹5,00,000 | Returned: ₹3,50,000 | Period: 2 Years',
        calculation: 'Net Loss = 3,50,000 - 5,00,000 = -₹1,50,000\nTotal ROI = (-1,50,000 / 5,00,000) × 100 = -30.00%\nAnnualized ROI = (0.70)^(1/2) - 1 = -16.33% per year',
        result: 'Net Loss: -₹1,50,000 | Total ROI: -30.00% | Annualized: -16.33% p.a.',
      },
    ],
    tips: [
      'Always include all upfront costs (brokerage, legal fees, maintenance, and taxes) in the Amount Invested for accurate net ROI.',
      'Compare investments of different durations using Annualized ROI rather than nominal Total ROI.',
      'A high nominal ROI over 15 years may have a modest annualized rate when factoring inflation.',
      'For ongoing monthly contributions, use a SIP calculator instead of a lump sum ROI calculator.',
    ],
    commonMistakes: [
      'Ignoring transaction costs, exit loads, stamp duties, and capital gains taxes.',
      'Confusing simple ROI with annualized ROI when comparing investments held over multiple years.',
      'Failing to adjust for inflation which erodes real purchasing power over long horizons.',
      'Comparing annualized ROI against simple interest rates without compounding alignment.',
    ],
    faqs: [
      {
        question: 'What is Return on Investment (ROI)?',
        answer:
          'Return on Investment (ROI) is a popular financial metric used to evaluate the efficiency or profitability of an investment. It is expressed as a percentage by dividing net profit by total investment cost.',
      },
      {
        question: 'How is Annualized ROI calculated?',
        answer:
          'Annualized ROI expresses the geometric average amount of money earned by an investment each year over a given time period. It uses the compound annual growth formula: ((Returned / Invested)^(1 / Years) - 1) × 100.',
      },
      {
        question: 'What is a good ROI percentage in India?',
        answer:
          'A good ROI depends on asset class risk: Bank FDs typically yield 6.5%–7.5%, debt mutual funds yield 7%–9%, equity mutual funds historically deliver 12%–15% annualized, and real estate averages 8%–12% inclusive of rental yield.',
      },
      {
        question: 'Can ROI be negative?',
        answer:
          'Yes, if the amount returned is less than the amount originally invested, net profit is negative, indicating a capital loss and negative ROI.',
      },
      {
        question: 'What is the difference between ROI and CAGR?',
        answer:
          'Simple ROI measures total percentage return over the entire investment holding period, whereas CAGR (Compound Annual Growth Rate) and Annualized ROI measure the smoothed annual compounding rate per year.',
      },
      {
        question: 'Does this ROI calculator include taxes and fees?',
        answer:
          'You can factor in taxes and brokerage by adding them directly to the Amount Invested or deducting them from the Amount Returned before calculation.',
      },
      {
        question: 'ROI kaise calculate karein (Hindi)?',
        answer:
          'ROI nikalne ke liye kul munafa (Returned Amount - Invested Amount) ko investment cost se divide karein aur 100 se multiply karein. Udaharan ke liye: ₹1 Lakh laga kar ₹1.5 Lakh mile toh ROI = 50% hoga.',
      },
      {
        question: 'Can I export my ROI calculation report?',
        answer:
          'Yes, CalcMaster allows you to instantly download a professional PDF or Excel report containing all inputs, profit/loss breakdown, and yearly progression.',
      },
    ],
    relatedCalculators: [
      { slug: 'cagr', name: 'CAGR Calculator', description: 'Compound Annual Growth Rate calculator' },
      { slug: 'sip', name: 'SIP Calculator', description: 'Mutual fund monthly SIP wealth calculator' },
      { slug: 'lumpsum', name: 'Lumpsum Calculator', description: 'One-time mutual fund returns calculator' },
      { slug: 'compound-interest', name: 'Compound Interest Calculator', description: 'Calculate compound interest growth' },
    ],
  },
  hi: {
    pageTitle: 'आरओआई कैलकुलेटर - रिटर्न ऑन इन्वेस्टमेंट | CalcMaster',
    metaDescription:
      'अपने निवेश का रिटर्न ऑन इन्वेस्टमेंट (ROI) और वार्षिक रिटर्न (Annualized ROI) ऑनलाइन निकालें। फ्री निवेश लाभ कैलकुलेटर।',
    h1: 'आरओआई कैलकुलेटर – रिटर्न ऑन इन्वेस्टमेंट व शुद्ध लाभ',
    introText:
      'अपने शेयर, रियल एस्टेट, व्यापार या म्यूचुअल फंड निवेश का सटीक रिटर्न ऑन इन्वेस्टमेंट (ROI) और वार्षिक कंपाउंड रिटर्न निकालें।',
  },
};
