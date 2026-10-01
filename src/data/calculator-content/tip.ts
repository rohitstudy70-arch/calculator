export const tipContent = {
  en: {
    pageTitle: 'Tip Calculator - Bill Split, Gratuity & Service Charge India',
    metaDescription:
      'Calculate restaurant bill tip, split expenses evenly between friends, apply rounding rules, and understand Indian restaurant service charge guidelines.',
    h1: 'Tip Calculator – Bill Splitting & Gratuity Calculator',
    introText:
      'Easily calculate fair tips and split dining, cafe, or taxi bills among groups of friends. Includes convenient preset tipping buttons (5%, 10%, 15%, 20%), custom tip rates, and smart rounding options to simplify UPI transfers.',
    howToUse: [
      'Enter the total food and beverage bill amount.',
      'Select a tip percentage from quick presets (5%, 10%, 12%, 15%, 18%, 20%) or enter a custom percentage rate.',
      'Set the number of people sharing the bill to calculate individual per-person shares.',
      'Choose a rounding option (e.g. Round per Person Up to avoid odd decimal change during group UPI payments).',
      'Review the instant summary card showing total tip, overall bill, and each person’s exact share.',
      'Export the bill splitting breakdown as a PDF or Excel summary.',
    ],
    formulaExplanation: `Tip and bill splitting formulas:

1. Total Tip Amount:
• Tip Amount = Bill Amount × (Tip Percentage / 100)

2. Total Payable Amount:
• Total Amount = Bill Amount + Tip Amount

3. Per-Person Splitting:
• Tip per Person = Total Tip Amount / Number of People
• Total per Person = Total Payable Amount / Number of People

4. Smart UPI Rounding Rules:
• Round Per Person: Ceil(Total per Person) ensures every diner pays clean round Rupee figures without small paisa change.`,
    solvedExamples: [
      {
        title: 'Example 1: Family Dinner at a Restaurant',
        inputs: 'Bill: ₹3,600 | Tip: 10% | People: 4 | Rounding: None',
        calculation: 'Tip = ₹3,600 × 0.10 = ₹360\nTotal = ₹3,600 + ₹360 = ₹3,960\nPer Person = ₹3,960 ÷ 4 = ₹990',
        result: 'Total: ₹3,960 | Per Person: ₹990 (Tip: ₹90/person)',
      },
      {
        title: 'Example 2: Weekend Friends Outing with Clean UPI Split',
        inputs: 'Bill: ₹1,850 | Tip: 15% | People: 3 | Rounding: Round Per Person',
        calculation: 'Raw Total = ₹1,850 + ₹277.50 = ₹2,127.50\nRaw Per Person = ₹709.17\nRounded Per Person = ₹710',
        result: 'Total: ₹2,130 | Per Person: ₹710 (Clean UPI transfer)',
      },
      {
        title: 'Example 3: Solo Cafe Visit',
        inputs: 'Bill: ₹450 | Tip: 10% | People: 1 | Rounding: Round Total',
        calculation: 'Tip = ₹45 | Total = ₹495 (Rounded to ₹500 with ₹50 tip)',
        result: 'Total: ₹500 | Tip: ₹50',
      },
    ],
    tips: [
      'In India, check if the restaurant bill already includes an added "Service Charge" (typically 5% to 10%) before adding a voluntary tip.',
      'Under Central Consumer Protection Authority (CCPA) guidelines in India, service charges are voluntary and cannot be mandatorily levied by hotels and restaurants.',
      'Use the "Round per person" option when splitting bills on payment apps like Google Pay, PhonePe, or Paytm to avoid fractional rupees.',
      'For food delivery and ride hailing in India (Swiggy, Zomato, Uber, Ola), tipping ₹20 to ₹50 is customary for exceptional service in harsh weather conditions.',
    ],
    commonMistakes: [
      'Double tipping by paying a tip when a mandatory service charge was already added to the bill without your consent.',
      'Calculating tip on top of GST rather than on the subtotal food amount.',
      'Trying to split uneven fractional change among friends instead of using smart rounding.',
      'Assuming tipping norms are identical globally (in the US, 15–20% is standard; in Japan, tipping is not practiced).',
    ],
    faqs: [
      {
        question: 'Is tipping mandatory in Indian restaurants?',
        answer:
          'No. Tipping in India is entirely voluntary. As per Central Consumer Protection Authority (CCPA) guidelines, restaurants cannot enforce mandatory service charges on the bill without consumer consent.',
      },
      {
        question: 'What is the standard tipping percentage in India?',
        answer:
          'In casual dining and cafes, 5% to 10% of the food subtotal is customary for good service. For exceptional fine dining, 10% to 15% is common.',
      },
      {
        question: 'Should tip be calculated before or after GST?',
        answer:
          'Standard etiquette suggests calculating the tip percentage on the subtotal before GST and government taxes are applied.',
      },
      {
        question: 'How does the "Round Per Person" feature help?',
        answer:
          'It rounds each individual’s share up to the nearest whole integer Rupee, making it effortless to collect group payments on UPI apps without dealing with fractional paisa.',
      },
      {
        question: 'What is the difference between Service Charge and Service Tax / GST?',
        answer:
          'GST (5% or 18%) is a statutory government tax. A Service Charge is a restaurant fee retained by the establishment, which is voluntary under Indian consumer law.',
      },
      {
        question: 'Can I split the bill across up to 50 people?',
        answer:
          'Yes. The calculator supports splitting group dinner, corporate event, and party bills among up to 100 people.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Percentage Calculator',
        slug: 'percentage-calculator',
        description: 'Calculate discounts, sales tax, and percentages.',
      },
      {
        name: 'GST Calculator',
        slug: 'gst-calculator',
        description: 'Add or remove GST with split CGST/SGST/IGST breakdown.',
      },
      {
        name: 'Salary Calculator',
        slug: 'salary-calculator',
        description: 'Calculate monthly take-home salary and CTC deductions.',
      },
    ],
  },
  hi: {
    pageTitle: 'Tip Calculator - रेस्तरां बिल टिप और बिल विभाजन कैलकुलेटर',
    metaDescription: 'रेस्तरां बिल टिप, दोस्तों के बीच बिल का बराबर बंटवारा और UPI राउंडिंग आसानी से निकालें।',
    h1: 'टिप कैलकुलेटर (Tip Calculator) – बिल विभाजन और टिपिंग',
    introText: 'रेस्तरां, कैफे और पार्टी बिलों में टिप की गणना करें और दोस्तों के बीच प्रति व्यक्ति खर्च आसानी से बांटें।',
  },
};
