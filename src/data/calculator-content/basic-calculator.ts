export const basicCalculatorContent = {
  en: {
    pageTitle: 'Calculator - Online Normal & Basic Calculator | CalcMaster',
    metaDescription:
      'Free online calculator for quick everyday math: add, subtract, multiply, divide, percentages & memory functions. Fast, clean & mobile-friendly calculator.',
    h1: 'Online Calculator – Free Basic & Normal Calculator',
    introText:
      'Fast, free, and easy-to-use normal calculator for everyday basic arithmetic. Perform addition, subtraction, multiplication, division, percentages, and memory operations with physical keyboard support.',
    howToUse: [
      'Type numbers and operators using your computer keyboard or click the buttons on the screen.',
      'Use the standard operators: + (Add), - (Subtract), × (Multiply), and ÷ (Divide).',
      'Press "=" or hit Enter on your keyboard to calculate the instant result.',
      'Press "%" to calculate percentages for sales tax, discounts, or tips.',
      'Use "+/-" to toggle positive and negative values.',
      'Use Memory functions: M+ to add, M- to subtract, MR to recall memory, and MC to clear memory.',
      'Press "C" to clear the current entry or "AC" (Escape) to reset the entire calculation.',
    ],
    formulaExplanation: `Standard Arithmetic Operations & Precedence:

1. Addition (+): a + b = Sum
2. Subtraction (-): a - b = Difference
3. Multiplication (×): a × b = Product
4. Division (÷): a ÷ b = Quotient (Division by zero is undefined)
5. Percentage (%):
   • Standalone: x% = x / 100
   • Markup / Discount: a + (a × b%) = a × (1 + b/100)
6. Memory Registers:
   • M+ : Memory = Memory + Display
   • M- : Memory = Memory - Display
   • MR : Recall saved Memory value to display
   • MC : Reset Memory register to 0`,
    solvedExamples: [
      {
        title: 'Example 1: Everyday Grocery Bill Total',
        inputs: '145 + 230 + 85.50 + 49',
        calculation: 'Sum of all items: 145 + 230 = 375\n375 + 85.50 = 460.50\n460.50 + 49 = 509.50',
        result: 'Total = 509.50',
      },
      {
        title: 'Example 2: Discount & Percentage Calculation',
        inputs: '₹1,500 with 20% discount',
        calculation: 'Discount Amount = 1500 × 20% = 300\nFinal Payable = 1500 - 300 = 1200',
        result: 'Payable Amount = ₹1,200 (Saved ₹300)',
      },
      {
        title: 'Example 3: Unit Rate & Division',
        inputs: '₹4,500 divided among 6 people',
        calculation: 'Per person share = 4500 ÷ 6 = 750',
        result: 'Per Person = ₹750',
      },
    ],
    tips: [
      'You can use the numeric keypad (Numpad) on your keyboard for super-fast data entry.',
      'Press the Backspace key on your keyboard to delete the last typed digit without clearing the whole number.',
      'Press Escape key on your physical keyboard to perform an All Clear (AC).',
      'The calculation tape on the right saves your recent history so you never lose your tally.',
    ],
    commonMistakes: [
      'Dividing any number by zero, which results in a mathematical error.',
      'Pressing clear (C) instead of backspace when only the last digit was typed incorrectly.',
      'Forgetting that memory (M+) retains stored values until Memory Clear (MC) is pressed.',
      'Entering multiple decimals in a single number.',
    ],
    faqs: [
      {
        question: 'What is a normal calculator?',
        answer:
          'A normal calculator (also known as a basic or simple calculator) is an electronic arithmetic tool designed to perform four primary mathematical functions: addition, subtraction, multiplication, and division, along with percentages and memory storage.',
      },
      {
        question: 'Can I use keyboard shortcuts with this online calculator?',
        answer:
          'Yes! You can type numbers 0-9 directly, use +, -, *, / for operators, Enter or = to calculate, Backspace to delete, and Escape to clear (AC).',
      },
      {
        question: 'How do the M+, M-, MR, and MC memory buttons work?',
        answer:
          'M+ adds the current number to the memory register. M- subtracts it from memory. MR recalls the memory value to the screen. MC clears the memory back to zero.',
      },
      {
        question: 'How do I calculate percentage on a normal calculator?',
        answer:
          'Enter the base number, press multiply (×) or divide (÷), enter the percentage value, and press %. For example, 500 × 10 % gives 50.',
      },
      {
        question: 'Is this normal calculator completely free to use online?',
        answer:
          'Yes, CalcMaster provides a 100% free, fast, ad-light normal calculator that works seamlessly on desktop computers, tablets, iPhones, and Android smartphones.',
      },
      {
        question: 'Does this calculator save my calculation history?',
        answer:
          'Yes, the calculation tape displays your recent calculations so you can review previous steps or copy the totals.',
      },
      {
        question: 'Normal calculator online kaise use karein (Hindi)?',
        answer:
          'Aap apne mobile screen par buttons daba kar ya computer keyboard se direct type karke jod (+), ghatana (-), guna (×), bhag (÷) aur pratishat (%) turant nikal sakte hain.',
      },
      {
        question: 'What is the difference between a normal calculator and a scientific calculator?',
        answer:
          'A normal calculator handles standard arithmetic and everyday finances, while a scientific calculator includes advanced functions like trigonometry (sin, cos, tan), logarithms, powers, and roots.',
      },
    ],
    relatedCalculators: [
      { slug: 'scientific', name: 'Scientific Calculator', description: 'Advanced trigonometry, log, powers and algebra' },
      { slug: 'percentage', name: 'Percentage Calculator', description: 'Detailed percentage change, increase and discount' },
      { slug: 'fraction', name: 'Fraction Calculator', description: 'Add, subtract, multiply and divide fractions' },
      { slug: 'gpa', name: 'GPA to Percentage Calculator', description: 'Convert college CGPA to percentage marks' },
    ],
  },
  hi: {
    pageTitle: 'कैलकुलेटर ऑनलाइन - सामान्य व बेसिक कैलकुलेटर | CalcMaster',
    metaDescription:
      'दैनिक गणित के लिए फ्री ऑनलाइन साधारण कैलकुलेटर: जोड़, घटाव, गुणा, भाग, प्रतिशत और मेमोरी फ़ीचर्स। फ़ास्ट व आसान।',
    h1: 'ऑनलाइन कैलकुलेटर – सामान्य व बेसिक कैलकुलेटर',
    introText:
      'रोजमर्रा के साधारण हिसाब-किताब के लिए सबसे तेज और आसान ऑनलाइन कैलकुलेटर। जोड़, घटाव, गुणा, भाग और प्रतिशत तुरंत निकालें।',
  },
};
