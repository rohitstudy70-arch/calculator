export const percentageContent = {
  en: {
    pageTitle: 'Percentage Calculator - Calculate %, Increase, Decrease & Change',
    metaDescription:
      'Free online percentage calculator. Calculate X% of Y, what percent is X of Y, percentage increase or decrease, and percentage difference step by step.',
    h1: 'Percentage Calculator – Fast, Multi-Mode % Calculations',
    introText:
      'Easily solve any percentage problem with 4 dedicated calculation modes: finding a percentage of a number, determining what percent one number is of another, measuring percentage change, and applying percent increases or discounts.',
    howToUse: [
      'Choose the percentage calculation mode you need from the 4 tabs.',
      'Enter the values (X and Y) into the respective input fields.',
      'If using the Increase/Decrease mode, choose whether you want to add or subtract the percentage.',
      'View the instant result, mathematical formula, and step-by-step arithmetic working.',
      'Use the Compare Scenarios mode to analyze two different percentage rates or pricing discounts side-by-side.',
      'Download your calculation steps as a PDF or Excel document.',
    ],
    formulaExplanation: `Percentages represent fractions out of 100. Standard mathematical formulas applied:

1. What is X% of Y?
• Formula: Result = (X / 100) × Y

2. X is what % of Y?
• Formula: Percentage = (X / Y) × 100

3. Percentage Change from X to Y (Growth / Decline):
• Formula: % Change = ((Y - X) / |X|) × 100
• If positive (+), it represents an increase; if negative (-), it represents a decrease.

4. Increase or Decrease X by Y%:
• Increase Formula: Result = X + (X × (Y / 100)) = X × (1 + Y / 100)
• Decrease / Discount Formula: Result = X - (X × (Y / 100)) = X × (1 - Y / 100)`,
    solvedExamples: [
      {
        title: 'Example 1: GST / Tax Amount (18% of ₹5,000)',
        inputs: 'Mode: X% of Y | X = 18 | Y = 5000',
        calculation: 'Decimal = 18 ÷ 100 = 0.18\nTax = 0.18 × 5000 = 900',
        result: '18% of 5000 = 900 (Total with GST = ₹5,900)',
      },
      {
        title: 'Example 2: Exam Score Percentage (425 out of 500)',
        inputs: 'Mode: X is what % of Y | X = 425 | Y = 500',
        calculation: 'Fraction = 425 ÷ 500 = 0.85\nPercentage = 0.85 × 100 = 85%',
        result: '425 is 85% of 500',
      },
      {
        title: 'Example 3: E-Commerce Festival Discount (20% off ₹3,500)',
        inputs: 'Mode: Decrease X by Y% | X = 3500 | Y = 20',
        calculation: 'Discount Amount = (20 ÷ 100) × 3500 = 700\nFinal Price = 3500 - 700 = 2800',
        result: 'Final Price = ₹2,800 (Saved ₹700)',
      },
    ],
    tips: [
      'To quickly find 10% of any number, move the decimal point one place to the left.',
      'To find 1% of any number, move the decimal point two places to the left.',
      'For compound percentage changes (e.g. +20% then -20%), the net result is not 0%: 100 + 20% = 120; 120 - 20% = 96 (a 4% net loss).',
      'Use the Percentage Change mode for tracking mutual fund returns, stock price fluctuations, and year-over-year revenue growth.',
    ],
    commonMistakes: [
      'Applying percentage discounts additively rather than multiplicatively (e.g., "50% off + 50% off" is not 100% free; it equals 75% off).',
      'Confusing percentage points with percentage change (e.g., interest rate rising from 4% to 5% is a 1 percentage point rise, but a 25% relative increase).',
      'Dividing by zero when the base initial value is 0.',
      'Forgetting that percentage decrease cannot exceed 100% for physical quantities.',
    ],
    faqs: [
      {
        question: 'What is the difference between percentage and percentage points?',
        answer:
          'A percentage expresses a relative ratio or proportion. Percentage points refer to the arithmetic difference between two percentage values. For example, if inflation drops from 6% to 4%, it dropped by 2 percentage points, but 33.3% relatively.',
      },
      {
        question: 'How do I calculate successive or successive discounts?',
        answer:
          'Successive discounts are applied consecutively to the reducing balance. If an item has 20% off plus an extra 10% off, multiply the price by (1 - 0.20) × (1 - 0.10) = 0.80 × 0.90 = 0.72 (a 28% total discount).',
      },
      {
        question: 'How do I convert a fraction into a percentage?',
        answer:
          'Divide the numerator by the denominator, then multiply the result by 100. For example, 3/4 = 0.75 × 100 = 75%.',
      },
      {
        question: 'Can percentage change be negative?',
        answer:
          'Yes. A negative percentage change indicates a decline, loss, or discount from the starting reference value to the final value.',
      },
      {
        question: 'Why does a 50% increase followed by a 50% decrease not return to the original number?',
        answer:
          'Because the percentage decrease is calculated on a larger base amount. For example, starting at ₹100, a 50% increase gives ₹150. A 50% decrease of ₹150 is -₹75, leaving ₹75.',
      },
      {
        question: 'How do I calculate reverse GST or reverse percentage?',
        answer:
          'To find the original price before an 18% GST addition, divide the total price by 1.18 (not multiplying total price by 0.82). You can also use our dedicated GST Calculator.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Fraction Calculator',
        slug: 'fraction-calculator',
        description: 'Perform arithmetic and simplify fractions step by step.',
      },
      {
        name: 'GST Calculator',
        slug: 'gst-calculator',
        description: 'Add or remove GST with split CGST/SGST/IGST breakdown.',
      },
      {
        name: 'CAGR Calculator',
        slug: 'cagr-calculator',
        description: 'Calculate compounded annual growth rate over multiple years.',
      },
    ],
  },
  hi: {
    pageTitle: 'Percentage Calculator - प्रतिशत निकालने का आसान कैलकुलेटर',
    metaDescription: 'प्रतिशत (Percentage), प्रतिशत वृद्धि, कमी और छूट की तुरंत स्टेप-बाय-स्टेप गणना करें।',
    h1: 'प्रतिशत कैलकुलेटर (Percentage Calculator) – तुरंत प्रतिशत निकालें',
    introText: 'किसी संख्या का प्रतिशत, प्रतिशत बदलाव, छूट (Discount) और दो संख्याओं के बीच का प्रतिशत आसानी से निकालें।',
  },
};
