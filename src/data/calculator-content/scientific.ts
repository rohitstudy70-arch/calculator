export const scientificContent = {
  en: {
    pageTitle: 'Online Scientific Calculators - Trig & Algebra | CalcMaster',
    metaDescription:
      'Free online scientific calculators: compute trig functions, logs, exponents & algebra with physical keyboard support, deg/rad modes & calculation history.',
    h1: 'Online Scientific Calculators – Advanced Mathematical Engine',
    introText:
      'Full-featured scientific calculators online for students, engineers, and researchers. Compute algebraic expressions, trigonometry (deg/rad), natural logs, roots, factorials, and powers with complete calculation history.',
    howToUse: [
      'Click the on-screen keypad buttons or type directly using your physical computer keyboard.',
      'Toggle between Degree (Deg) and Radian (Rad) angle units for trigonometric calculations (sin, cos, tan).',
      'Use parentheses ( and ) to specify operator precedence and group complex terms.',
      'Access mathematical constants like π (Pi = 3.14159...) and e (Euler’s number = 2.71828...).',
      'Press "=" or the Enter key to evaluate the expression.',
      'View your calculation history list to recall previous results or clear the history as needed.',
    ],
    formulaExplanation: `This scientific calculator implements a safe AST parser using Dijkstra’s Shunting-Yard algorithm.

Standard Mathematical Rules:
• Order of Operations: Parentheses → Functions → Exponents/Factorials → Multiplication/Division → Addition/Subtraction (BODMAS / PEMDAS).
• Trigonometry:
  - In Degree Mode: sin(30°) = 0.5, cos(60°) = 0.5, tan(45°) = 1.0.
  - In Radian Mode: sin(π/6) = 0.5, cos(π/3) = 0.5, tan(π/4) = 1.0.
• Logarithms:
  - log(x) = base-10 logarithm (log10(100) = 2).
  - ln(x) = natural logarithm to base e (ln(e) = 1).
• Factorials: n! = n × (n - 1) × ... × 1 (e.g., 5! = 120).`,
    solvedExamples: [
      {
        title: 'Example 1: Algebraic & Power Expression',
        inputs: 'Expression: 10 + 5 * 2^3 - (4 / 2)',
        calculation: 'Power: 2^3 = 8\nMultiply: 5 * 8 = 40\nParentheses: 4 / 2 = 2\nResult: 10 + 40 - 2 = 48',
        result: 'Result = 48',
      },
      {
        title: 'Example 2: Trigonometric Identity (Degrees)',
        inputs: 'Expression: sin(30) + cos(60) + tan(45)',
        calculation: 'sin(30°) = 0.5\ncos(60°) = 0.5\ntan(45°) = 1.0\nSum: 0.5 + 0.5 + 1.0 = 2.0',
        result: 'Result = 2',
      },
      {
        title: 'Example 3: Combined Roots and Factorials',
        inputs: 'Expression: sqrt(144) + 5! / 10',
        calculation: 'sqrt(144) = 12\n5! = 120\n120 / 10 = 12\nSum: 12 + 12 = 24',
        result: 'Result = 24',
      },
    ],
    tips: [
      'Use the keyboard shortcut "Enter" to evaluate expressions and "Esc" or "C" to clear the display.',
      'Remember to check your angle unit (Deg vs Rad) before solving engineering or physics trigonometric questions.',
      'Nested parentheses can be used to any depth: e.g., ((3 + 5) * 2)^2 = 256.',
      'Click on any previous item in the Calculation History log to re-populate the expression into the display.',
    ],
    commonMistakes: [
      'Forgetting to switch from Degree to Radian mode when calculating calculus or higher physics formulas.',
      'Entering negative numbers under square root (sqrt) functions in the real domain.',
      'Unclosed or mismatched opening and closing parentheses.',
      'Attempting division by zero or logarithms of zero and negative values.',
    ],
    faqs: [
      {
        question: 'When should I use Radians instead of Degrees?',
        answer:
          'Degrees are standard for geometry, navigation, and everyday angles (0° to 360°). Radians (where 2π = 360°) are mandatory for calculus, Fourier transforms, physics equations, and advanced calculus.',
      },
      {
        question: 'What is the difference between log and ln?',
        answer:
          'The "log" button calculates the common logarithm (base 10), whereas "ln" calculates the natural logarithm with base e (Euler’s number ≈ 2.71828).',
      },
      {
        question: 'Does this calculator support keyboard input?',
        answer:
          'Yes. You can type numbers, operators (+, -, *, /), parentheses, and letters directly on your physical keyboard.',
      },
      {
        question: 'How is the expression evaluated safely without security vulnerabilities?',
        answer:
          'CalcMaster uses a custom tokenized Shunting-Yard abstract syntax tree (AST) parser in TypeScript without executing JavaScript eval(), guaranteeing 100% security against arbitrary code execution.',
      },
      {
        question: 'What is the largest factorial this calculator can compute?',
        answer:
          'Factorials up to 170! (approx 7.257 × 10³⁰⁶) can be evaluated before exceeding standard 64-bit floating-point limits.',
      },
      {
        question: 'Can I export or copy my calculation history?',
        answer:
          'Yes. You can copy the shareable calculation link or export your calculations to PDF and Excel.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Fraction Calculator',
        slug: 'fraction-calculator',
        description: 'Add, subtract, multiply, and simplify fractions step by step.',
      },
      {
        name: 'Percentage Calculator',
        slug: 'percentage-calculator',
        description: 'Calculate percentages, percentage differences, and discounts.',
      },
      {
        name: 'Unit Converter',
        slug: 'unit-converter',
        description: 'Convert length, area, mass, speed, and Indian units.',
      },
    ],
  },
  hi: {
    pageTitle: 'Scientific Calculator Online - वैज्ञानिक कैलकुलेटर',
    metaDescription: 'त्रिकोणमिति (Trigonometry), लघुगणक (Log), घात (Powers) और बीजगणित के लिए उन्नत साइंटिफिक कैलकुलेटर।',
    h1: 'साइंटिफिक कैलकुलेटर (Scientific Calculator) – उन्नत गणितीय गणना',
    introText: 'त्रिकोणमिति (Degree/Radian), Log, Ln, वर्गमूल, फैक्टोरियल (n!) और कोष्ठकों के साथ उन्नत समीकरण हल करें।',
  },
};
