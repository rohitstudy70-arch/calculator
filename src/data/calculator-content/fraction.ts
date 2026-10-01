export const fractionContent = {
  en: {
    pageTitle: 'Fraction Calculator - Add, Subtract, Multiply & Divide Fractions',
    metaDescription:
      'Free fraction calculator with step-by-step working. Add, subtract, multiply, divide, simplify fractions, and convert improper fractions to mixed numbers.',
    h1: 'Fraction Calculator – Step-by-Step Operations & Simplification',
    introText:
      'Solve fraction arithmetic problems with full step-by-step working. Supports addition, subtraction, multiplication, and division for proper fractions, improper fractions, and mixed numbers with GCD reduction and decimal conversion.',
    howToUse: [
      'Select the arithmetic operation: Addition (+), Subtraction (-), Multiplication (×), or Division (÷).',
      'Enter the numerator and denominator for Fraction 1 and Fraction 2 (and optional whole numbers for mixed numbers).',
      'Instantly view the simplified result in both proper/improper fraction and mixed number formats, alongside the decimal equivalent.',
      'Follow the detailed step-by-step mathematical working including LCM of denominators and GCD simplification.',
      'Compare two different fraction equations side-by-side using the Compare mode.',
      'Export the complete step-by-step solution to PDF or Excel.',
    ],
    formulaExplanation: `Fraction operations follow exact algebraic rules:

1. Addition & Subtraction:
• Must have a common denominator.
• Find Least Common Multiple: LCD = LCM(d1, d2)
• Adjusted Numerator: (n1 × LCD/d1) ± (n2 × LCD/d2)
• Result = Adjusted Numerators / LCD

2. Multiplication:
• Multiply straight across: (n1 × n2) / (d1 × d2)

3. Division:
• Multiply by the reciprocal of the second fraction: (n1 / d1) ÷ (n2 / d2) = (n1 × d2) / (d1 × n2)

4. Simplification & Mixed Numbers:
• Simplify by dividing numerator and denominator by Greatest Common Divisor: GCD(n, d).
• Mixed Number = Math.floor(n / d) and Remainder / d.`,
    solvedExamples: [
      {
        title: 'Example 1: Adding Unlike Fractions (1/2 + 2/3)',
        inputs: 'Operation: Add | Fraction 1: 1/2 | Fraction 2: 2/3',
        calculation: 'LCD of 2 & 3 = 6\n1/2 = 3/6 and 2/3 = 4/6\n3/6 + 4/6 = 7/6',
        result: '7/6 = 1 1/6 (Decimal: 1.1667)',
      },
      {
        title: 'Example 2: Subtracting Mixed Numbers (2 3/4 - 1 1/2)',
        inputs: 'Operation: Subtract | 2 3/4 - 1 1/2',
        calculation: 'Convert to improper: 11/4 - 3/2\nLCD = 4: 11/4 - 6/4 = 5/4',
        result: '5/4 = 1 1/4 (Decimal: 1.25)',
      },
      {
        title: 'Example 3: Multiplying Fractions (3/8 × 4/9)',
        inputs: 'Operation: Multiply | 3/8 × 4/9',
        calculation: 'Numerators: 3 × 4 = 12\nDenominators: 8 × 9 = 72\nReduce via GCD(12, 72) = 12: 12÷12 / 72÷12 = 1/6',
        result: '1/6 (Decimal: 0.1667)',
      },
    ],
    tips: [
      'Always convert mixed numbers to improper fractions before performing multiplication or division.',
      'When adding or subtracting, finding the Lowest Common Multiple (LCM) keeps numbers smaller and easier to simplify.',
      'To divide fractions, remember the rhyme: "Dividing fractions, don’t be shy, flip the second and multiply!"',
      'The Greatest Common Divisor (GCD) allows you to reduce any fraction to its simplest irreducible form in a single division step.',
    ],
    commonMistakes: [
      'Adding denominators directly (e.g. 1/2 + 1/2 is not 2/4 = 1/2, it is 2/2 = 1).',
      'Forgetting to invert the second fraction when dividing.',
      'Setting a denominator equal to 0, which is undefined in mathematics.',
      'Failing to simplify the final fraction to lowest terms.',
    ],
    faqs: [
      {
        question: 'What is the difference between a proper and improper fraction?',
        answer:
          'A proper fraction has a numerator smaller than its denominator (e.g., 3/4 < 1). An improper fraction has a numerator greater than or equal to its denominator (e.g., 7/4 ≥ 1) and can be converted into a mixed number (1 3/4).',
      },
      {
        question: 'How do you convert an improper fraction to a mixed number?',
        answer:
          'Divide the numerator by the denominator. The quotient becomes the whole number, the remainder becomes the new numerator, and the denominator remains unchanged. For example, 11/4: 11 ÷ 4 = 2 with remainder 3 → 2 3/4.',
      },
      {
        question: 'Why can a denominator never be zero?',
        answer:
          'In mathematics, division by zero is undefined because no real number multiplied by 0 can equal a non-zero numerator.',
      },
      {
        question: 'How is the Least Common Denominator (LCD) determined?',
        answer:
          'The LCD is the Least Common Multiple (LCM) of the two denominators. It is calculated as (|d1 × d2|) ÷ GCD(d1, d2).',
      },
      {
        question: 'Can this calculator handle negative fractions?',
        answer:
          'Yes. Enter negative signs in the numerator or whole number fields, and the calculator preserves algebraic sign rules.',
      },
      {
        question: 'How do I convert a fraction to a decimal?',
        answer:
          'Simply divide the numerator by the denominator (e.g., 5 ÷ 8 = 0.625). The calculator displays the exact decimal value up to 6 decimal places.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Percentage Calculator',
        slug: 'percentage-calculator',
        description: 'Convert between percentages, decimals, and ratios.',
      },
      {
        name: 'Scientific Calculator',
        slug: 'scientific-calculator',
        description: 'Perform advanced algebraic and trigonometric calculations.',
      },
      {
        name: 'Unit Converter',
        slug: 'unit-converter',
        description: 'Convert length, area, weight, and volume units.',
      },
    ],
  },
  hi: {
    pageTitle: 'Fraction Calculator - भिन्न (Fraction) जोड़ें, घटाएं और गुणा करें',
    metaDescription: 'भिन्नों (Fractions) का जोड़, घटाव, गुणा, भाग और सरलीकरण (Simplification) स्टेप-बाय-स्टेप करें।',
    h1: 'भिन्न कैलकुलेटर (Fraction Calculator) – स्टेप-बाय-स्टेप हल',
    introText: 'साधारण भिन्न, विषम भिन्न और मिश्रित संख्याओं (Mixed Numbers) को आसानी से हल करें और सरलतम रूप (Lowest Terms) में बदलें।',
  },
};
