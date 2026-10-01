export const unitConverterContent = {
  en: {
    pageTitle: 'Unit Converter Online - Indian & Metric Units | CalcMaster',
    metaDescription:
      'Convert length, weight, area, volume, temperature, and speed. Includes traditional Indian land units (Bigha, Guntha, Acre, Katha), gold tola & lakh/crore.',
    h1: 'Universal Unit Converter – Metric, Imperial & Indian Units',
    introText:
      'Convert between metric, imperial, and traditional Indian measurement units with NIST standard precision. Includes land units (Bigha, Guntha, Acre, Gaj), gold weight (Tola, Pavan), and financial numbering (Lakh, Crore, Million, Billion).',
    howToUse: [
      'Select the measurement category from the category tabs (Length, Area, Weight, Volume, Temperature, Speed, Time, Data, or Indian Numbers).',
      'Choose your source unit ("From") and target unit ("To") from the dropdowns.',
      'Enter the numerical value you want to convert.',
      'View the converted value instantly alongside the multi-unit conversion matrix table.',
      'Use the Compare mode to evaluate two separate conversions simultaneously.',
      'Download the full unit conversion table as a PDF or Excel document.',
    ],
    formulaExplanation: `All conversions use normalized base units (SI standards and statutory Indian revenue land standards):

1. Area & Indian Land Measurement:
• 1 Acre = 43,560 sq ft = 4,046.86 m² = 40 Guntha = 1.6 Standard Bigha (North India = 27,225 sq ft).
• 1 Guntha = 1,089 sq ft = 121 sq yards = 33 ft × 33 ft.
• 1 Gaj (Square Yard) = 9 sq ft = 0.8361 m².
• 1 Ground (Tamil Nadu) = 2,400 sq ft.
• 1 Cent (South India) = 435.6 sq ft (1/100 Acre).

2. Weight & Indian Gold Standards:
• 1 Tola = 11.6638 grams (standard statutory weight of one silver rupee coin in British India).
• 1 Pavan / Sovereign = 8 grams (standard gold jewellery unit in South India).
• 1 Quintal = 100 kg | 1 Metric Tonne = 1,000 kg.

3. Indian vs International Numbering System:
• 1 Lakh = 100 Thousand = 10⁵ (1,00,000)
• 1 Million = 10 Lakh = 10⁶ (1,000,000)
• 1 Crore = 100 Lakh = 10 Million = 10⁷ (1,00,00,000)
• 1 Billion = 100 Crore = 1 Arab = 10⁹ (1,000,000,000)`,
    solvedExamples: [
      {
        title: 'Example 1: Converting Land Area (2.5 Acres to Guntha)',
        inputs: 'Category: Area | From: Acre | To: Guntha | Value: 2.5',
        calculation: '1 Acre = 40 Guntha\n2.5 × 40 = 100 Guntha',
        result: '2.5 Acres = 100 Guntha (1,08,900 sq ft)',
      },
      {
        title: 'Example 2: Converting Gold Weight (5 Tola to Grams)',
        inputs: 'Category: Weight | From: Tola | To: Gram | Value: 5',
        calculation: '1 Tola = 11.6638 grams\n5 × 11.6638 = 58.319 grams',
        result: '5 Tola = 58.319 Grams (approx 7.29 Pavan)',
      },
      {
        title: 'Example 3: Financial Figures (15 Crore to Millions)',
        inputs: 'Category: Indian Numbering | From: Crore | To: Million | Value: 15',
        calculation: '1 Crore = 10 Million\n15 × 10 = 150 Million',
        result: '15 Crore = 150 Million ($/₹)',
      },
    ],
    tips: [
      'Bigha sizes vary by Indian state (e.g. Pucca Bigha vs Kacha Bigha); our calculator uses standard North Indian revenue Bigha (27,225 sq ft).',
      'For plot purchases in India, property sizes are frequently quoted in Gaj (Square Yards) or Square Feet (1 Gaj = 9 sq ft).',
      'For gold valuation in India, hallmark rates are quoted per 10 grams or per 1 Tola (11.664 g).',
      'Use the Indian Numbering converter when comparing foreign startup funding (in millions/billions) to Indian Rupees (in Crores).',
    ],
    commonMistakes: [
      'Confusing Square Yards (Gaj) with Square Feet (1 Gaj is 9 times larger than 1 sq ft).',
      'Assuming 1 Billion is 10 Crore (1 Billion = 100 Crore or 1 Arab).',
      'Assuming Bigha is identical in all Indian states without verifying local patwari revenue records.',
      'Mixing up US Gallons (3.785 L) with UK Imperial Gallons (4.546 L).',
    ],
    faqs: [
      {
        question: 'How many square feet are in 1 Guntha and 1 Bigha?',
        answer:
          '1 Guntha equals exactly 1,089 square feet (121 sq yards). Standard Pucca Bigha in North India (UP, Punjab, Haryana, Rajasthan) equals 27,225 square feet (3,025 sq yards).',
      },
      {
        question: 'How many grams is 1 Tola of gold in India?',
        answer:
          'Statutorily, 1 Tola equals 11.6638 grams. In everyday retail trade in India, jewelers occasionally round 1 Tola to 10 grams, but pure bullion weight is 11.664 g.',
      },
      {
        question: 'How do you convert Millions to Crores?',
        answer:
          '10 Million equals 1 Crore. To convert any Million figure to Crores, divide the million number by 10 (e.g., $50 Million = $5 Crore).',
      },
      {
        question: 'What is the conversion between Gaj and Square Feet?',
        answer:
          '1 Gaj is 1 Square Yard, which equals exactly 9 Square Feet (3 feet × 3 feet = 9 sq ft = 0.8361 sq meters).',
      },
      {
        question: 'How does Fahrenheit to Celsius conversion work?',
        answer:
          'The formula is: °C = (°F - 32) × 5/9. Conversely, °F = (°C × 9/5) + 32. Water freezes at 0°C (32°F) and boils at 100°C (212°F).',
      },
      {
        question: 'How many bytes are in 1 Gigabyte (GB)?',
        answer:
          'In binary computing standards (IEC/JEDEC), 1 GB = 1,024 MB = 1,048,576 KB = 1,073,741,824 bytes (2³⁰ bytes).',
      },
    ],
    relatedCalculators: [
      {
        name: 'Scientific Calculator',
        slug: 'scientific-calculator',
        description: 'Advanced math, trigonometry, logs, and factorials.',
      },
      {
        name: 'Percentage Calculator',
        slug: 'percentage-calculator',
        description: 'Calculate percentages, growth rate, and fractions.',
      },
      {
        name: 'Fraction Calculator',
        slug: 'fraction-calculator',
        description: 'Step-by-step fraction arithmetic and simplification.',
      },
    ],
  },
  hi: {
    pageTitle: 'Unit Converter Online - लम्बाई, क्षेत्रफल, बीघा, तोला और मात्रक परिवर्तक',
    metaDescription: 'बीघा, एकड़, गुंठा, गज, तोला, किलोग्राम, लीटर और लाख/करोड़ का आसान और सटीक यूनिट कनवर्टर।',
    h1: 'यूनिट कनवर्टर (Unit Converter) – भारतीय और अंतरराष्ट्रीय मात्रक',
    introText: 'जमीन की नाप (बीघा, गुंठा, एकड़, गज), सोने का वजन (तोला, ग्राम), तापमान और लाख/करोड़ की त्वरित और सटीक गणना करें।',
  },
};
