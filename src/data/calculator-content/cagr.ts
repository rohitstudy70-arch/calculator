export const cagrContent = {
  en: {
    pageTitle: 'CAGR Calculator - Calculate Compound Annual Growth Rate',
    metaDescription: 'Free CAGR calculator with standard and reverse modes to compute compound annual growth rate, portfolio returns, and future investment values.',
    h1: 'CAGR Calculator – Measure True Compound Annual Growth Rate',
    introText:
      'Compound Annual Growth Rate (CAGR) is the single most accurate metric used by investors and fund managers worldwide to assess the annualized geometric growth rate of an investment over multiple years, smoothing out market volatility and annual fluctuations.',
    howToUse: [
      'Choose your mode: "Calculate CAGR" (to find the annualized growth %) or "Future Value from Target CAGR".',
      'Enter the Initial Investment Value in INR (e.g. ₹1,00,000).',
      'Enter the Final Investment Value (for CAGR mode) or Target CAGR percentage (for Future Value mode).',
      'Specify the total investment duration in years (e.g., 5.0 years).',
      'Review your exact CAGR %, total absolute gain %, absolute gain in rupees, and year-by-year portfolio progression.',
    ],
    formulaExplanation:
      'The standard Compound Annual Growth Rate formula is:\nCAGR = [(Final Value ÷ Initial Value)^(1 ÷ n)] - 1\nCAGR (%) = CAGR × 100\n\nWhere:\n• Final Value = Portfolio value at the end of the period\n• Initial Value = Starting investment amount\n• n = Investment tenure in years\n\nReverse Formula (Future Value):\nFinal Value = Initial Value × (1 + CAGR / 100)^n.',
    solvedExamples: [
      {
        title: 'Mutual Fund 5-Year Performance',
        inputs: 'Initial Investment: ₹1,00,000 | Final Value: ₹2,00,000 | Duration: 5 Years',
        calculation:
          'CAGR = (200000 / 100000)^(1/5) - 1 = (2.0)^0.2 - 1 = 1.1487 - 1 = 14.87% per year.',
        result:
          'CAGR: 14.87% | Absolute Gain: +100.0% (₹1,00,000) | Doubling Time: ~4.8 Years',
      },
      {
        title: 'Real Estate Property Growth (10 Years)',
        inputs: 'Purchase Price: ₹35,00,000 | Sale Price: ₹85,00,000 | Duration: 10 Years',
        calculation:
          'CAGR = (8500000 / 3500000)^(1/10) - 1 = (2.42857)^0.1 - 1 = 1.0928 - 1 = 9.28% p.a.',
        result:
          'CAGR: 9.28% | Total Gain: +142.8% (₹50,00,000) | Doubling Time: ~7.8 Years',
      },
      {
        title: 'Target Future Value (Reverse CAGR Mode)',
        inputs: 'Initial: ₹5,00,000 | Target CAGR: 12.0% | Horizon: 7 Years',
        calculation:
          'Final Value = 500000 × (1 + 0.12)^7 = 500000 × 2.21068 = ₹11,05,340.',
        result:
          'Initial Investment: ₹5,00,000 | Projected Final Value: ₹11,05,340 | Total Profit: ₹6,05,340',
      },
    ],
    tips: [
      'Use CAGR instead of Absolute Return when comparing investments with different holding periods (e.g., 50% gain in 3 years is 14.5% CAGR, whereas 50% in 5 years is only 8.4% CAGR).',
      'CAGR assumes steady, smoothed annual growth; it does not measure intra-period risk or market drawdowns (use Standard Deviation / Sharpe Ratio alongside CAGR).',
      'For ongoing periodic investments (like SIPs), use XIRR (Extended Internal Rate of Return) instead of CAGR.',
      'Always compare your investment’s CAGR against standard market benchmark indices (such as Nifty 50 TRI or BSE 500).',
    ],
    commonMistakes: [
      'Using simple Average Annual Return instead of CAGR (an investment that drops 50% in Year 1 and gains 50% in Year 2 has an average return of 0%, but a CAGR of -29.3%!).',
      'Applying CAGR to systematic monthly investments (SIPs) rather than one-time lump-sum portfolios.',
      'Ignoring inflation and capital gains taxes when assessing net real CAGR.',
    ],
    faqs: [
      {
        question: 'What is the difference between CAGR and Absolute Return?',
        answer:
          'Absolute Return measures the total percentage gain or loss without considering how many years it took (e.g. ₹1 Lakh growing to ₹2 Lakhs is always a 100% absolute return). CAGR measures the annualized compound growth rate per year, accounting for the time value of money.',
      },
      {
        question: 'What is the difference between CAGR and XIRR?',
        answer:
          'CAGR is used for single lump-sum investments with one cash inflow and one cash outflow. XIRR is used for multiple periodic cash flows at irregular intervals, such as mutual fund SIPs, dividend reinvestments, and partial withdrawals.',
      },
      {
        question: 'Can CAGR be negative?',
        answer:
          'Yes. If the final value of an investment is lower than the initial starting value, the CAGR will be negative, reflecting the annualized percentage loss.',
      },
      {
        question: 'What is a good CAGR for investments in India?',
        answer:
          'Fixed Deposits typically generate 6.5%–7.5% CAGR, Provident Funds (EPF/PPF) deliver 7.1%–8.25% CAGR, while broad equity indices (Nifty 50) have historically delivered 12%–14% long-term CAGR over 10+ year horizons.',
      },
      {
        question: 'How do I calculate CAGR in Excel or Google Sheets?',
        answer:
          'In Excel/Sheets, you can calculate CAGR using: =((End_Value / Start_Value)^(1 / Years)) - 1, or by using the RRI function: =RRI(Years, Start_Value, End_Value).',
      },
    ],
    relatedCalculators: [
      { name: 'Lumpsum Calculator', slug: 'lumpsum-calculator', description: 'Calculate future wealth from one-time mutual fund investments.' },
      { name: 'SIP Calculator', slug: 'sip-calculator', description: 'Compute compound returns for monthly systematic investments.' },
      { name: 'Inflation Calculator', slug: 'inflation-calculator', description: 'Assess how inflation affects the real purchasing power of your CAGR.' },
    ],
  },
  hi: {
    pageTitle: 'सीएजीआर कैलकुलेटर - चक्रवृद्धि वार्षिक वृद्धि दर की गणना करें',
    metaDescription: 'प्रारंभिक व अंतिम निवेश मूल्य और अवधि के आधार पर अपने पोर्टफोलियो की वार्षिक चक्रवृद्धि वृद्धि दर (CAGR) की तुरंत गणना करें।',
    h1: 'सीएजीआर (CAGR) कैलकुलेटर – अपने निवेश की वास्तविक वार्षिक वृद्धि दर जानें',
    introText:
      'कंपाउंड एनुअल ग्रोथ रेट (CAGR) किसी निवेश की वार्षिक वृद्धि दर मापने का सबसे सटीक पैमाना है, जो बाजार के उतार-चढ़ाव को संतुलित करके प्रति वर्ष की औसत वृद्धि दर्शाता है।',
    howToUse: [
      'प्रारंभिक निवेश मूल्य (Initial Value) दर्ज करें।',
      'अंतिम मूल्य (Final Value) और निवेश की अवधि (वर्षों में) भरें।',
      'तुरंत अपनी वार्षिक सीएजीआर %, कुल लाभ और वेल्थ डबलिंग समय देखें।',
    ],
    tips: [
      'एकमुश्त निवेश के लिए सीएजीआर सबसे उत्तम पैमाना है, जबकि एसआईपी (SIP) के लिए एक्सआईआरआर (XIRR) देखा जाता है।',
      'साधारण औसत रिटर्न के बजाय हमेशा सीएजीआर की तुलना करें।',
    ],
    faqs: [
      {
        question: 'सीएजीआर (CAGR) और एब्सोल्यूट रिटर्न में क्या अंतर है?',
        answer: 'एब्सोल्यूट रिटर्न सिर्फ कुल मुनाफा प्रतिशत बताता है चाहे उसमें कितने भी साल लगे हों, जबकि सीएजीआर हर साल की औसत चक्रवृद्धि वृद्धि बताता है।',
      },
      {
        question: 'सीएजीआर का फॉर्मूला क्या है?',
        answer: 'CAGR = (अंतिम मूल्य / प्रारंभिक मूल्य)^(1 / वर्ष) - 1।',
      },
    ],
  },
};
