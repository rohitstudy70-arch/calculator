export const currencyContent = {
  en: {
    pageTitle: 'XE Currency Converter - Live Dollar to Rupee | CalcMaster',
    metaDescription:
      'Check today\'s dollar rate (USD to INR), AED to INR, Euro & city forex rates in Delhi, Mumbai, Kolkata with live wholesale interbank currency converter.',
    h1: 'XE Currency Converter – Live Dollar to Rupee, AED to INR & Forex Rates',
    introText:
      'Free live XE currency converter alternative: check today\'s dollar rate, convert US dollar to rupees (USD to INR), AED to INR, Euro, and British pound with real-time wholesale interbank exchange rates for 20+ global currencies.',
    howToUse: [
      'Enter the monetary amount you want to convert in the amount field.',
      'Select your source currency (e.g., US Dollar USD, UAE Dirham AED, Euro EUR, British Pound GBP).',
      'Choose your target destination currency (e.g., Indian Rupee INR).',
      'View the converted total instantly along with today\'s live interbank exchange rate and inverse rate.',
      'Use the 1-click swap button (⇄) to invert the conversion (e.g., Rupee to Dollar or INR to AED).',
      'Inspect the quick denomination conversion table (1, 10, 50, 100, 500, 1000 units) and export reports.',
    ],
    formulaExplanation: `Currency conversion uses real-time foreign exchange (Forex) interbank rates via a standard currency pair formula:

1. Direct Conversion Formula:
• Converted Amount = Source Amount × Current Exchange Rate
• Example (USD to INR): $100 × ₹86.85 = ₹8,685.00

2. Cross-Currency Bridge (Via US Dollar USD):
When converting between non-USD pairs (for instance, UAE Dirham AED to Indian Rupee INR):
• Rate (AED to INR) = Rate (USD to INR) / Rate (USD to AED)
• With USD/INR = 86.85 and USD/AED = 3.6725:
  1 AED = 86.85 / 3.6725 = ₹23.65 INR.

3. Inverse Exchange Rate:
• Inverse Rate = 1 / Current Exchange Rate
• If 1 USD = ₹86.85 INR, then 1 INR = 1 / 86.85 = $0.0115 USD.

4. Interbank vs. Retail Cash Rates:
• Interbank (Mid-Market) Rate: The real wholesale exchange rate banks use when trading currencies with each other. This is the rate shown by CalcMaster and Xe currency converter.
• Buy Rate / Sell Rate: Banks, airports, and card issuers charge a 1% to 3.5% forex markup margin over the mid-market rate.`,
    solvedExamples: [
      {
        title: 'Example 1: US Dollar to Rupees (USD to INR)',
        inputs: 'Amount: $500 USD | Target: Indian Rupee (INR) | Rate: ₹86.85 per USD',
        calculation:
          'Converted Amount = 500 × 86.85\nRate Applied: 1 USD = 86.85 INR\nInverse: 1 INR = $0.0115 USD',
        result: '500 US Dollars = ₹43,425.00 Indian Rupees',
      },
      {
        title: 'Example 2: UAE Dirham in Indian Rupees (AED to INR)',
        inputs: 'Amount: 1,500 AED | Target: Indian Rupee (INR) | Rate: ₹23.65 per AED',
        calculation:
          'Converted Amount = 1,500 × 23.65\nCross Rate: USD/INR (86.85) ÷ USD/AED (3.6725) = 23.65',
        result: '1,500 UAE Dirham = ₹35,475.00 Indian Rupees',
      },
      {
        title: 'Example 3: British Pound Sterling to INR (GBP to INR)',
        inputs: 'Amount: £250 GBP | Target: Indian Rupee (INR) | Rate: ₹111.80 per GBP',
        calculation:
          'Converted Amount = 250 × 111.80\nRate: 1 GBP = 111.80 INR',
        result: '250 British Pounds = ₹27,950.00 Indian Rupees',
      },
    ],
    tips: [
      'Always check the real mid-market interbank rate before exchanging physical cash or making international wire transfers to ensure fair markups.',
      'When paying with an Indian credit or debit card abroad, always choose to be billed in the local currency (e.g., USD or AED) rather than INR to avoid high Dynamic Currency Conversion (DCC) markups.',
      'For NRI remittances from UAE, Saudi Arabia, or USA to India, look for remittance services offering zero fee and close to interbank mid-market rates.',
      'Forex markets are closed on weekends (Saturday & Sunday); rates displayed on weekends reflect Friday\'s official market closing rate.',
    ],
    commonMistakes: [
      'Confusing the interbank mid-market rate with airport currency exchange counter rates, which typically carry hidden spreads of 5% to 10%.',
      'Overlooking the 1% to 3.5% foreign transaction markup fee charged by credit card providers on overseas transactions.',
      'Assuming currency exchange rates remain static throughout the business day; forex rates fluctuate every second during live market hours.',
      'Forgetting that sending remittances above ₹7 Lakh from India triggers 5% to 20% Tax Collected at Source (TCS) under RBI\'s LRS rules.',
    ],
    faqs: [
      {
        question: 'What is today\'s dollar rate in Indian Rupees (USD to INR)?',
        answer:
          'Today\'s dollar rate in Indian Rupees is updated live based on global interbank forex market feeds. Use the CalcMaster currency converter above to view the exact live exchange rate, including real-time fluctuations.',
      },
      {
        question: 'How is the dollar to rupee (USD to INR) exchange rate determined?',
        answer:
          'The USD to INR rate is determined by market forces of supply and demand in foreign exchange markets, influenced by crude oil prices, foreign institutional investor (FII) flows, interest rate differentials between the US Federal Reserve and RBI, and trade balances.',
      },
      {
        question: 'How much is 1 AED in Indian Rupees (Dirham to INR)?',
        answer:
          'Because the UAE Dirham (AED) is officially pegged to the US Dollar at a fixed rate of 3.6725 AED per USD, the AED to INR rate moves in tandem with the dollar rate. Divide the current USD/INR rate by 3.6725 to get the exact AED to INR rate.',
      },
      {
        question: 'How does this converter compare to XE Currency Converter or Google Finance?',
        answer:
          'CalcMaster uses the same mid-market interbank exchange rates as XE and Google Finance. It provides real-time conversions without retail spreads, giving you the pure wholesale rate for transparent comparisons.',
      },
      {
        question: 'What is the current Euro in Indian Rupees (EUR to Rs) rate?',
        answer:
          'The Euro to Indian Rupee (EUR/INR) rate reflects European Central Bank and global forex trading. Select EUR and INR in our calculator above to view the exact current rate and live conversion.',
      },
      {
        question: 'How do I convert British Pound Sterling to INR (GBP to INR)?',
        answer:
          'To convert British Pounds to Indian Rupees, enter your GBP amount into our converter and select INR as destination. The tool multiplies your pound value by the live GBP/INR interbank exchange rate.',
      },
      {
        question: 'What is the Australian Dollar in Indian Rupees (AUD to INR)?',
        answer:
          'The AUD to INR rate fluctuates based on commodity markets and Australian reserve policies. You can convert Australian Dollars to Indian Rupees instantly using the dropdown selection above.',
      },
      {
        question: 'Are live currency converter rates 100% free on CalcMaster?',
        answer:
          'Yes. All currency conversions, live forex rate updates, and printable rate reports on CalcMaster India are 100% free with no registration or subscription required.',
      },
      {
        question: 'What is today\'s dollar rate in Delhi, Kolkata, Mumbai, and other major Indian cities?',
        answer:
          'The official interbank USD to INR exchange rate remains uniform nationwide across all Indian financial centers including Delhi, Kolkata, Mumbai, Bengaluru, and Chennai. However, over-the-counter physical cash exchange at local forex dealers or airports may carry a minor 0.5% to 2% margin above the wholesale interbank rate shown on CalcMaster.',
      },
    ],
    relatedCalculators: [
      {
        name: 'State-Wise Land Unit Converter',
        slug: 'land-unit-converter',
        description: 'Convert Bigha, Katha, Dhur, Biswa, and Acre across Indian states.',
      },
      {
        name: 'Unit Converter',
        slug: 'unit-converter',
        description: 'Convert metric and imperial units of length, area, weight, and volume.',
      },
      {
        name: 'Income Tax Calculator',
        slug: 'income-tax-calculator',
        description: 'Calculate and compare income tax liabilities under Old vs New regime.',
      },
    ],
  },
  hi: {
    pageTitle: 'XE Currency Converter - लाइव डॉलर रेट | CalcMaster',
    metaDescription:
      'मुफ्त XE currency converter विकल्प: आज का डॉलर रेट (USD to INR), दिरहम (AED to INR) व यूरो भाव जानें। लाइव इंटरबैंक विदेशी मुद्रा विनिमय दर कैलकुलेटर।',
    h1: 'XE Currency Converter – लाइव डॉलर से रुपया व विदेशी मुद्रा विनिमय',
    introText:
      'मुफ्त लाइव XE currency converter विकल्प: आज का डॉलर रेट जानें और अमेरिकी डॉलर, यूएई दिरहम (AED), यूरो (EUR), ब्रिटिश पाउंड (GBP) को भारतीय रुपये में लाइव बदलें।',
  },
};
