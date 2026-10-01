export const lumpsumContent = {
  en: {
    pageTitle: 'Lumpsum Calculator - One-Time MF Returns | CalcMaster',
    metaDescription:
      'Calculate returns on one-time lump sum mutual fund investments. Estimate future wealth, total profit, and compound growth over 1 to 30 years free!',
    h1: 'Lumpsum Calculator - One-Time Investment Returns',
    introText: 'A Lumpsum investment is a single, bulk amount invested at once in mutual funds, stocks, or other financial instruments. Unlike a SIP where you invest periodically, lumpsum investing allows you to put your capital to work immediately. This calculator helps you estimate the future value of your one-time investment based on an expected rate of return and time period.',
    howToUse: [
      'Enter the total amount you wish to invest upfront.',
      'Input the expected annual rate of return.',
      'Specify the investment duration in years.',
      'View your estimated returns, total value, and the growth curve.'
    ],
    formulaExplanation: 'The formula for calculating lumpsum investment maturity is A = P(1 + r)^n. Here, A is the estimated future value, P is the principal investment amount, r is the annual expected return rate, and n is the number of years.',
    solvedExamples: [
      {
        title: '₹1 Lakh for 5 Years',
        inputs: 'Investment Amount: ₹1,00,000 | Expected Return: 12% | Duration: 5 Years',
        calculation: 'A = 100000 * (1 + 0.12)^5',
        result: 'Estimated Returns: ₹76,234 | Total Value: ₹1,76,234'
      },
      {
        title: '₹5 Lakh for 10 Years',
        inputs: 'Investment Amount: ₹5,00,000 | Expected Return: 10% | Duration: 10 Years',
        calculation: 'A = 500000 * (1 + 0.10)^10',
        result: 'Estimated Returns: ₹7,96,871 | Total Value: ₹12,96,871'
      },
      {
        title: '₹10 Lakh for 20 Years',
        inputs: 'Investment Amount: ₹10,00,000 | Expected Return: 15% | Duration: 20 Years',
        calculation: 'A = 1000000 * (1 + 0.15)^20',
        result: 'Estimated Returns: ₹1,53,66,537 | Total Value: ₹1,63,66,537'
      }
    ],
    tips: [
      'Lumpsum investments are highly effective when you expect the market to rise or when the market has corrected significantly.',
      'Do not invest your emergency fund as a lumpsum in volatile assets like equity mutual funds.',
      'Diversify your lumpsum investment across different asset classes if the amount is substantial.',
      'Consider your risk tolerance. Equity can be volatile in the short term.',
      'Use Systematic Transfer Plan (STP) instead of lumpsum if you fear immediate market downturns.'
    ],
    commonMistakes: [
      'Trying to time the market perfectly with a lumpsum investment.',
      'Investing money needed in the short term (less than 3 years) into equity funds.',
      'Panicking and withdrawing the lumpsum investment during a market correction.',
      'Ignoring the tax implications of withdrawing lumpsum investments.'
    ],
    faqs: [
      {
        question: 'What is a Lumpsum investment?',
        answer: 'A lumpsum investment involves investing a significant sum of money at one go, rather than breaking it up into smaller, periodic installments like a SIP.'
      },
      {
        question: 'SIP vs Lumpsum: Which is better?',
        answer: 'SIPs are great for regular savings and averaging out market volatility. Lumpsum is better if you have a large amount of cash available upfront and the investment horizon is long.'
      },
      {
        question: 'Are lumpsum returns guaranteed?',
        answer: 'If you invest in mutual funds or stocks, returns are linked to the market and are not guaranteed. However, instruments like Fixed Deposits offer guaranteed returns.'
      },
      {
        question: 'Can I invest lumpsum amount in any mutual fund?',
        answer: 'Yes, almost all mutual funds accept lumpsum investments, except some schemes that may restrict lumpsum inflows during certain market conditions.'
      },
      {
        question: 'How are lumpsum investments taxed?',
        answer: 'Taxation depends on the asset class and holding period. For equity funds, Long Term Capital Gains (LTCG) over ₹1 Lakh are taxed at 10% (as per current laws).'
      },
      {
        question: 'Can I withdraw my lumpsum investment anytime?',
        answer: 'Yes, open-ended mutual funds allow you to withdraw your investment anytime, though an exit load may apply if withdrawn within a specific period, usually 1 year.'
      },
      {
        question: 'Is there a limit to how much I can invest as lumpsum?',
        answer: 'Generally, there is no maximum limit for lumpsum investments in most mutual funds, but some AMCs might put temporary restrictions.'
      },
      {
        question: 'What is STP?',
        answer: 'STP stands for Systematic Transfer Plan. You invest a lumpsum in a safe liquid fund and give a mandate to transfer a fixed amount regularly into an equity fund, reducing timing risk.'
      }
    ],
    relatedCalculators: [
      {
        name: 'SIP Calculator',
        slug: '/sip-calculator',
        description: 'Calculate future wealth accumulation through Systematic Investment Plans.'
      },
      {
        name: 'EMI Calculator',
        slug: '/emi-calculator',
        description: 'Calculate your monthly EMI for home, car, or personal loans.'
      }
    ]
  },
  hi: {
    pageTitle: 'Lumpsum Calculator in Hindi',
    metaDescription: 'Lumpsum calculator in Hindi.',
    h1: 'लम्पसम (Lumpsum) कैलकुलेटर',
    introText: 'लम्पसम कैलकुलेटर...',
    howToUse: ['...'],
    tips: ['...'],
    faqs: []
  }
};
