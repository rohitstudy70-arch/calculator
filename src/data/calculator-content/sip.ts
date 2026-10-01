export const sipContent = {
  en: {
    pageTitle: 'SIP Calculator 2026 - Mutual Fund Returns | CalcMaster',
    metaDescription:
      'Calculate mutual fund SIP returns and wealth growth with our free SIP calculator. See year-by-year compounding, growth charts, and PDF reports.',
    h1: 'SIP Calculator - Mutual Fund Returns Calculator',
    introText: 'A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds. Our SIP calculator helps you calculate the wealth gain and expected returns for your monthly SIP investment. By investing small amounts regularly, you can build a large corpus over time thanks to the power of compounding.',
    howToUse: [
      'Enter the monthly SIP investment amount you plan to make.',
      'Enter the expected annual return rate for your mutual fund.',
      'Select the time period (in years) for which you plan to invest.',
      'View the total invested amount, estimated returns, and total future value.'
    ],
    formulaExplanation: 'The formula used by the SIP calculator is M = P × [{(1 + i)^n - 1} / i] × (1 + i). Where M is the maturity amount, P is the monthly investment amount, i is the monthly interest rate (annual rate / 12 / 100), and n is the total number of months.',
    solvedExamples: [
      {
        title: '₹5,000 Monthly SIP',
        inputs: 'Monthly Investment: ₹5,000 | Return Rate: 12% | Tenure: 15 Years',
        calculation: 'M = 5000 * [{(1 + 0.01)^180 - 1} / 0.01] * (1 + 0.01)',
        result: 'Total Investment: ₹9,00,000 | Estimated Returns: ₹16,22,880 | Total Value: ₹25,22,880'
      },
      {
        title: '₹10,000 Monthly SIP',
        inputs: 'Monthly Investment: ₹10,000 | Return Rate: 15% | Tenure: 10 Years',
        calculation: 'M = 10000 * [{(1 + 0.0125)^120 - 1} / 0.0125] * (1 + 0.0125)',
        result: 'Total Investment: ₹12,00,000 | Estimated Returns: ₹15,86,573 | Total Value: ₹27,86,573'
      },
      {
        title: '₹2,000 Monthly SIP for 20 Years',
        inputs: 'Monthly Investment: ₹2,000 | Return Rate: 10% | Tenure: 20 Years',
        calculation: 'M = 2000 * [{(1 + 0.00833)^240 - 1} / 0.00833] * (1 + 0.00833)',
        result: 'Total Investment: ₹4,80,000 | Estimated Returns: ₹10,45,263 | Total Value: ₹15,25,263'
      }
    ],
    tips: [
      'Start investing early to maximize the benefits of compounding.',
      'Increase your SIP amount every year in line with your income growth (Step-up SIP).',
      'Do not stop your SIPs during market downturns; this is when you accumulate more units.',
      'Link your investment goals to specific time horizons.',
      'Review your portfolio periodically to ensure it aligns with your risk appetite.'
    ],
    commonMistakes: [
      'Stopping SIPs when the market is falling.',
      'Not increasing the SIP amount as income increases.',
      'Having too many mutual funds in the portfolio (over-diversification).',
      'Focusing only on short-term past performance instead of long-term consistency.'
    ],
    faqs: [
      {
        question: 'What is SIP?',
        answer: 'SIP or Systematic Investment Plan is a method of investing a fixed sum regularly, usually monthly, in a mutual fund scheme.'
      },
      {
        question: 'Is SIP safe?',
        answer: 'SIPs in equity mutual funds are subject to market risks. However, investing for the long term reduces volatility and risk.'
      },
      {
        question: 'Can I stop my SIP anytime?',
        answer: 'Yes, most SIPs are completely flexible. You can stop, pause, or decrease your SIP amount at any time without any penalties.'
      },
      {
        question: 'What is the minimum amount for SIP?',
        answer: 'You can start a SIP with as little as ₹500 per month in many mutual fund schemes in India.'
      },
      {
        question: 'How is return calculated in SIP?',
        answer: 'SIP returns are calculated using XIRR (Extended Internal Rate of Return), which considers multiple cash flows at different dates.'
      },
      {
        question: 'Is SIP tax-free?',
        answer: 'SIP returns are taxed based on the type of mutual fund (equity or debt) and the holding period. ELSS funds offer tax benefits under section 80C.'
      },
      {
        question: 'What is Step-up SIP?',
        answer: 'A Step-up SIP allows you to increase your SIP investment amount by a fixed amount or percentage periodically, such as annually.'
      },
      {
        question: 'When is the best time to start a SIP?',
        answer: 'The best time to start a SIP is right now. Due to the power of compounding, the earlier you start, the more wealth you can accumulate.'
      }
    ],
    relatedCalculators: [
      {
        name: 'Lumpsum Calculator',
        slug: '/lumpsum-calculator',
        description: 'Calculate returns for one-time mutual fund investments.'
      },
      {
        name: 'EMI Calculator',
        slug: '/emi-calculator',
        description: 'Calculate your monthly EMI for home, car, or personal loans.'
      }
    ]
  },
  hi: {
    pageTitle: 'SIP Calculator in Hindi',
    metaDescription: 'SIP calculator in Hindi.',
    h1: 'सिप (SIP) कैलकुलेटर',
    introText: 'सिप कैलकुलेटर...',
    howToUse: ['...'],
    tips: ['...'],
    faqs: []
  }
};
