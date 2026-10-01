export const retirementContent = {
  en: {
    pageTitle: 'Retirement Calculator 2026 - Corpus & SIP | CalcMaster',
    metaDescription:
      'Calculate the retirement corpus you need in India. Factors in inflation, life expectancy, post-retirement expenses, and monthly SIP needed to retire.',
    h1: 'Retirement Calculator India – Build a Financially Free Future',
    introText:
      'Retirement planning is the ultimate long-term financial goal. In India, with increasing life expectancy, medical costs, and the absence of universal social security pensions for private employees, building a dedicated, inflation-proof retirement corpus is indispensable for a peaceful post-working life.',
    howToUse: [
      'Enter your Current Age and your desired Target Retirement Age (e.g. 58 or 60).',
      'Provide your estimated Life Expectancy (typically 80 to 85 years).',
      'Enter your Current Monthly Living Expenses (excluding existing EMIs that will end before retirement).',
      'Set the Expected Annual Inflation Rate (standard benchmark is 6.0%).',
      'Specify your Pre-Retirement Investment Return % (typically 12% in diversified equity mutual funds) and Post-Retirement Safe Return % (typically 7% in debt/annuities/SCSS).',
      'Optionally input any Existing Retirement Savings (EPF, PPF, NPS, mutual funds) you already hold.',
      'Review your required retirement corpus and the exact monthly SIP needed starting today.',
    ],
    formulaExplanation:
      'Retirement corpus estimation uses a two-phase mathematical framework:\n\nPhase 1: Future Expense at Retirement:\nMonthly Expense_ret = Current Expense × (1 + inflation)^years_to_retirement\nAnnual Expense_ret = Monthly Expense_ret × 12\n\nPhase 2: Required Corpus at Retirement:\nReal Post-Retirement Return (g) = [(1 + r_post) ÷ (1 + inflation)] - 1\nCorpus = Annual Expense_ret × [(1 - (1 + g)^(-years_in_ret)) ÷ g] × (1 + g)\n\nPhase 3: Monthly SIP Required:\nNet Corpus Needed = Max(0, Required Corpus - Future Value of Existing Savings)\nMonthly SIP = Net Gap ÷ [(((1 + r_m)^n - 1) ÷ r_m) × (1 + r_m)].',
    solvedExamples: [
      {
        title: 'Young Professional Starting Early (Age 30)',
        inputs: 'Age: 30 | Retire: 60 | Life Exp: 85 | Current Exp: ₹50,000/mo | Inflation: 6% | Pre-Return: 12% | Post-Return: 7% | Existing: ₹5 Lakhs',
        calculation:
          'In 30 years, monthly expense swells from ₹50,000 to ₹2.87 Lakhs/mo (₹34.46 Lakhs/yr). Total required corpus at age 60 to last 25 years = ~₹6.28 Crores. Existing ₹5L grows to ~₹1.50 Crores, leaving a net gap of ~₹4.78 Crores.',
        result:
          'Required Corpus: ~₹6.28 Crores | Future Monthly Expense: ₹2.87 Lakhs | Monthly SIP Required: ~₹13,550/month',
      },
      {
        title: 'Mid-Career Saver (Age 40)',
        inputs: 'Age: 40 | Retire: 60 | Life Exp: 85 | Current Exp: ₹80,000/mo | Inflation: 6% | Pre-Return: 12% | Post-Return: 7% | Existing: ₹20 Lakhs',
        calculation:
          'In 20 years, monthly expense becomes ₹2.57 Lakhs/mo. Required corpus at 60 = ~₹5.61 Crores. Existing savings grow to ₹1.93 Crores, leaving gap of ₹3.68 Crores.',
        result:
          'Required Corpus: ~₹5.61 Crores | Future Monthly Expense: ₹2.57 Lakhs | Monthly SIP Required: ~₹37,150/month',
      },
      {
        title: 'Late Starter (Age 48)',
        inputs: 'Age: 48 | Retire: 58 | Life Exp: 80 | Current Exp: ₹1,00,000/mo | Inflation: 6% | Pre-Return: 11% | Post-Return: 7% | Existing: ₹40 Lakhs',
        calculation:
          'With only 10 years to retirement, higher monthly savings are needed to fund 22 years of retirement living.',
        result:
          'Required Corpus: ~₹4.72 Crores | Net Gap: ~₹3.58 Crores | Monthly SIP Required: ~₹1.67 Lakhs/month',
      },
    ],
    tips: [
      'The biggest asset in retirement planning is TIME: starting at age 25 requires 1/4th the monthly SIP compared to starting at age 40 for the exact same retirement lifestyle.',
      'Do not rely solely on EPF/Gratuity; equity mutual funds and NPS are critical to generate inflation-beating real returns over 20+ year accumulation phases.',
      'Maintain an independent super top-up health insurance policy (₹25L to ₹50L cover) so healthcare bills do not eat into your retirement corpus.',
      'Adopt a "bucket strategy" in retirement: Bucket 1 (1-3 yrs expenses in liquid/FD), Bucket 2 (4-7 yrs in hybrid debt funds), Bucket 3 (8+ yrs in conservative equity funds for growth).',
      'Step up your retirement SIP by 5% to 10% every year as your salary increases to reach your corpus years ahead of schedule.',
    ],
    commonMistakes: [
      'Ignoring inflation: thinking that ₹1 Crore will be sufficient for retirement 25 years from now (at 6% inflation, ₹1 Crore in 25 years is worth only ~₹23 Lakhs today!).',
      'Sacrificing retirement savings for children’s weddings or luxury vacations (you can get an education loan for college, but nobody gives a retirement loan).',
      'Moving 100% of retirement corpus to fixed deposits on Day 1 of retirement, leading to purchasing power collapse by age 75.',
    ],
    faqs: [
      {
        question: 'How much money do I need to retire comfortably in India?',
        answer:
          'A practical rule of thumb is 25x to 30x your expected annual expenses at retirement. For example, if your household currently spends ₹50,000/month and you retire in 25 years, you will need a corpus of ₹5 Crore to ₹7 Crore to sustain you comfortably until age 85.',
      },
      {
        question: 'What is the 4% Safe Withdrawal Rule?',
        answer:
          'The 4% Rule states that if you withdraw 4% of your total retirement corpus in the first year of retirement, and adjust subsequent annual withdrawals for inflation, your savings have a 95%+ probability of lasting at least 30 years.',
      },
      {
        question: 'Which investment instruments are best for retirement in India?',
        answer:
          'During accumulation (pre-retirement): Equity Mutual Funds, EPF, PPF, and NPS. During distribution (post-retirement): Senior Citizens Savings Scheme (SCSS), Post Office Monthly Income Scheme (POMIS), RBI Floating Rate Bonds, Debt Mutual Funds, and Systematic Withdrawal Plans (SWP).',
      },
      {
        question: 'How does an SWP (Systematic Withdrawal Plan) work in retirement?',
        answer:
          'An SWP allows you to withdraw a fixed sum of money on a monthly basis from your mutual fund investments. SWP is significantly more tax-efficient than bank FD interest because only the capital gain portion of each withdrawal is taxed.',
      },
      {
        question: 'What happens if inflation is higher than expected during retirement?',
        answer:
          'If inflation averages 7% or 8% instead of 6%, your corpus will deplete faster. That is why keeping 20% to 30% of your post-retirement portfolio in equity index funds/balanced advantage funds is recommended to ensure your corpus keeps pace with living costs.',
      },
    ],
    relatedCalculators: [
      { name: 'NPS Calculator', slug: 'nps-calculator', description: 'Calculate pension payouts and lump-sum retirement fund from NPS.' },
      { name: 'EPF Calculator', slug: 'epf-calculator', description: 'Estimate mandatory employee provident fund corpus at superannuation.' },
      { name: 'Inflation Calculator', slug: 'inflation-calculator', description: 'Understand how inflation impacts future living expenses and money value.' },
    ],
  },
  hi: {
    pageTitle: 'रिटायरमेंट कैलकुलेटर 2026 - पेंशन फंड व मासिक एसआईपी की गणना करें',
    metaDescription: 'सेवानिवृत्ति के बाद आरामदायक जीवन के लिए आवश्यक कुल फंड, भविष्य के महंगाई खर्च और आज से जरूरी मासिक एसआईपी की गणना करें।',
    h1: 'रिटायरमेंट कैलकुलेटर – रिटायरमेंट फंड और जरूरी मासिक बचत जानें',
    introText:
      'रिटायरमेंट की योजना बनाना जीवन का सबसे महत्वपूर्ण वित्तीय लक्ष्य है। बढ़ती उम्र, स्वास्थ्य खर्च और महंगाई को देखते हुए एक सुरक्षित व मजबूत रिटायरमेंट फंड बनाना हर कामकाजी व्यक्ति के लिए अनिवार्य है।',
    howToUse: [
      'अपनी वर्तमान आयु और लक्षित रिटायरमेंट आयु दर्ज करें।',
      'वर्तमान मासिक घरेलू खर्च भरें।',
      'अपेक्षित वार्षिक महंगाई दर (जैसे 6%) दर्ज करें।',
      'निवेश पर अपेक्षित रिटर्न और पहले से मौजूद बचत जोड़ें।',
      'तुरंत देखें कि आपको कितने करोड़ का फंड चाहिए और आज से कितनी मासिक एसआईपी (SIP) शुरू करनी होगी।',
    ],
    tips: [
      'जितनी कम उम्र में रिटायरमेंट प्लानिंग शुरू करेंगे, उतनी ही छोटी मासिक बचत से बड़ा फंड बन जाएगा।',
      'बच्चों की पढ़ाई या शादी के लिए अपने रिटायरमेंट फंड से कभी समझौता न करें।',
    ],
    faqs: [
      {
        question: 'भारत में रिटायरमेंट के लिए कितने पैसों की जरूरत होती है?',
        answer: 'आमतौर पर रिटायरमेंट के समय के वार्षिक खर्च का 25 से 30 गुना फंड होना सुरक्षित माना जाता है (मध्यमवर्गीय परिवार के लिए ₹4 से 7 करोड़)।',
      },
      {
        question: 'रिटायरमेंट के बाद नियमित मासिक आय कैसे पाएं?',
        answer: 'म्यूचुअल फंड में एसडब्ल्यूपी (SWP), सीनियर सिटीजन सेविंग्स स्कीम (SCSS) और एनपीएस एन्युइटी के जरिए टैक्स-कुशल मासिक पेंशन प्राप्त की जा सकती है।',
      },
    ],
  },
};
