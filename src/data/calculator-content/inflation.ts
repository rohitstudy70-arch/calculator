export const inflationContent = {
  en: {
    pageTitle: 'Inflation Calculator India 2026 - Future Cost | CalcMaster',
    metaDescription:
      'Calculate future cost of living, money depreciation, and purchasing power loss over time. Understand real returns against historical Indian inflation.',
    h1: 'Inflation Calculator India – Protect Your Future Purchasing Power',
    introText:
      'Inflation is the steady rise in the prices of goods and services over time, which reduces the purchasing power of your money. In India, where consumer price inflation (CPI) historically averages 5% to 7% per year, understanding how inflation erodes cash is vital for realistic retirement, education, and investment planning.',
    howToUse: [
      'Enter the current monetary cost or present value amount in INR (e.g. ₹50,000 monthly expense or ₹25 Lakhs college fee).',
      'Input the expected annual inflation rate (India’s long-term CPI benchmark is typically 6.0%; education/healthcare inflation is often 8%–10%).',
      'Select the time horizon in years (from 1 to 50 years).',
      'Instantly review what the same basket of goods will cost in the future, and what today’s fixed cash amount will buy in the future.',
    ],
    formulaExplanation:
      'Inflation calculations rely on compound compounding equations:\n\n1. Future Equivalent Cost (FV):\nFV = PV × (1 + i)^n\n(Where PV = Present Value, i = Annual Inflation Rate in decimal, n = Number of Years)\n\n2. Future Purchasing Power of a Fixed Sum:\nPV = FV ÷ (1 + i)^n\n\n3. Purchasing Power Loss (%):\nLoss = [1 - (1 ÷ (1 + i)^n)] × 100.',
    solvedExamples: [
      {
        title: 'Child’s Higher Education in 15 Years',
        inputs: 'Current College Fee: ₹15,00,000 | Education Inflation: 8.0% | Time Horizon: 15 Years',
        calculation:
          'FV = 1500000 × (1 + 0.08)^15 = 1500000 × 3.172169 = ₹47,58,254.',
        result:
          'Present Cost: ₹15 Lakhs | Future Cost in 15 Yrs: ~₹47.58 Lakhs | Price Increase: +217% (3.17x Multiplier)',
      },
      {
        title: 'Household Monthly Expenses at Retirement (25 Years)',
        inputs: 'Current Monthly Expense: ₹60,000 | CPI Inflation: 6.0% | Time Horizon: 25 Years',
        calculation:
          'FV = 60000 × (1 + 0.06)^25 = 60000 × 4.29187 = ₹2,57,512/month.',
        result:
          'Current Monthly Expense: ₹60,000 | Required at Retirement: ~₹2.57 Lakhs/month | 4.29x Multiplier',
      },
      {
        title: 'Purchasing Power Loss of ₹10 Lakhs Cash in 10 Years',
        inputs: 'Cash in Bank: ₹10,00,000 | Inflation: 6.0% | Time Horizon: 10 Years',
        calculation:
          'Future Value in today’s money = 1000000 ÷ (1.06)^10 = 1000000 ÷ 1.79085 = ₹5,58,395.',
        result:
          'Nominal Cash: ₹10 Lakhs | Real Purchasing Power: ~₹5.58 Lakhs | Real Wealth Loss: -44.2%',
      },
    ],
    tips: [
      'Never leave long-term emergency or retirement savings in a standard savings account earning 3% when inflation is 6% (you are losing 3% real wealth every year).',
      'Invest in equity mutual funds, index funds, and real assets that have historically outpaced inflation by delivering 11% to 14% long-term CAGR.',
      'Plan for sector-specific inflation: higher education and medical healthcare in India inflate at 8% to 12% annually, much faster than the general headline CPI.',
      'Use real rate of return when calculating retirement corpus: Real Rate = [(1 + Nominal Return) ÷ (1 + Inflation)] - 1.',
      'Review life and health insurance covers every 3 to 5 years to ensure coverage limits keep pace with medical inflation.',
    ],
    commonMistakes: [
      'Assuming your expenses in retirement will remain identical to your current living costs without compounding for 20+ years of inflation.',
      'Confusing headline CPI inflation (food and fuel) with personal lifestyle inflation.',
      'Keeping retirement corpus in 100% fixed debt instruments, causing the real value of the monthly pension to dwindle over decades.',
    ],
    faqs: [
      {
        question: 'What is the average inflation rate in India?',
        answer:
          'Over the last two decades, India’s Consumer Price Index (CPI) inflation has averaged approximately 5.5% to 6.5% annually. The Reserve Bank of India (RBI) operates with an official target inflation band of 4% (+/- 2%).',
      },
      {
        question: 'What is the difference between CPI and WPI in India?',
        answer:
          'Consumer Price Index (CPI) measures the price changes of goods and services at the retail level purchased directly by households. Wholesale Price Index (WPI) measures the prices of goods traded at the wholesale and manufacturing stages.',
      },
      {
        question: 'How fast does inflation cut money value in half?',
        answer:
          'Using the Rule of 70: divide 70 by the annual inflation rate. At a 6% inflation rate, the purchasing power of your money is cut in half in approximately 11.6 years (70 ÷ 6 ≈ 11.6).',
      },
      {
        question: 'Which investment assets beat inflation in India?',
        answer:
          'Equity Mutual Funds, Nifty/Sensex Index Funds, Sovereign Gold Bonds (SGB), and Real Estate have historically generated returns well above 6% inflation, providing positive real wealth growth.',
      },
      {
        question: 'Why is education and healthcare inflation higher than general inflation?',
        answer:
          'Specialized infrastructure, advanced medical technology, imported pharmaceuticals, and high demand for top-tier educational institutions cause education and healthcare costs in India to inflate at 8% to 12% annually.',
      },
    ],
    relatedCalculators: [
      { name: 'Retirement Calculator', slug: 'retirement-calculator', description: 'Calculate required retirement corpus adjusted for inflation.' },
      { name: 'SIP Calculator', slug: 'sip-calculator', description: 'Plan equity mutual fund SIPs to beat inflation and create wealth.' },
      { name: 'Compound Interest Calculator', slug: 'compound-interest-calculator', description: 'See how compound interest grows wealth against inflation.' },
    ],
  },
  hi: {
    pageTitle: 'मुद्रास्फीति कैलकुलेटर 2026 - महंगाई दर व पैसे की क्रय शक्ति की गणना करें',
    metaDescription: 'भविष्य में रहने के खर्च, पैसे के मूल्य में गिरावट और महंगाई के प्रभाव का तुरंत सटीक अनुमान लगाएं।',
    h1: 'मुद्रास्फीति (महंगाई) कैलकुलेटर – भविष्य के खर्चों और पैसे के घटते मूल्य को समझें',
    introText:
      'मुद्रास्फीति (Inflation) समय के साथ वस्तुओं और सेवाओं की कीमतों में होने वाली वृद्धि है, जिससे आपके पैसे की क्रय शक्ति (खरीदने की ताकत) घटती जाती है। वित्तीय लक्ष्यों के लिए महंगाई को ध्यान में रखकर योजना बनाना आवश्यक है।',
    howToUse: [
      'वर्तमान खर्च या राशि दर्ज करें।',
      'अपेक्षित वार्षिक महंगाई दर (जैसे 6%) भरें।',
      'वर्षों में समय अवधि चुनें।',
      'तुरंत देखें कि भविष्य में उसी सामान की कीमत कितनी होगी और आपके पैसे का वास्तविक मूल्य कितना रह जाएगा।',
    ],
    tips: [
      'पैसों को सिर्फ बचत खाते में रखने से 6% महंगाई के कारण हर साल मूल्य घटता है।',
      'महंगाई को मात देने के लिए इक्विटी म्यूचुअल फंड और गोल्ड जैसे एसेट्स में निवेश करें।',
    ],
    faqs: [
      {
        question: 'भारत में औसत महंगाई दर क्या है?',
        answer: 'भारत में उपभोक्ता मूल्य सूचकांक (CPI) आधारित औसत महंगाई दर ऐतिहासिक रूप से 5.5% से 6.5% के बीच रही है।',
      },
      {
        question: '70 का नियम (Rule of 70) क्या है?',
        answer: '70 को महंगाई दर से विभाजित करने पर पता चलता है कि कितने वर्षों में आपके पैसे का मूल्य आधा रह जाएगा (जैसे 70 / 6 = लगभग 11.6 वर्ष)।',
      },
    ],
  },
};
