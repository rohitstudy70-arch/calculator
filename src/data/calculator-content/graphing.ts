export const graphingContent = {
  en: {
    pageTitle: 'Graphing Calculator Online - Plot 2D Functions | CalcMaster',
    metaDescription:
      'Free online graphing calculator: plot 2D functions, algebraic curves, trig & calculus graphs. Interactive coordinate grid, root finder & table generator.',
    h1: 'Online Graphing Calculator – 2D Function Plotter & Curve Analyzer',
    introText:
      'Plot mathematical functions, analyze curves, find real roots, and visualize 2D Cartesian coordinate graphs instantly with our free online graphing calculator. Designed for students, teachers, engineers, and researchers, this tool provides instant rendering of polynomials, trigonometric functions, exponentials, logarithms, and rational expressions without requiring installation or plugins.',
    howToUse: [
      'Enter your mathematical expression into the function input f₁(x) (e.g. x^2 - 4, sin(x), 2x + 3, e^x).',
      'Optionally add a second function f₂(x) to compare intersections, transformations, and dual curves.',
      'Select a pre-configured curve from the Presets dropdown to quickly explore standard graphs.',
      'Adjust viewing bounds using Zoom In (+), Zoom Out (−), or the Reset [-10, 10] button.',
      'Inspect detected real roots (zeros) and the vertical y-intercept displayed in the summary cards.',
      'Review the generated (x, y) coordinates table and export the graph to PDF or Excel.'
    ],
    formulaExplanation:
      'The graphing engine maps discrete input domain values x across the selected interval [x_min, x_max] to output range values y = f(x). Points are translated into 2D Cartesian SVG coordinates using linear projection: sx = pad + ((x - x_min)/(x_max - x_min)) × plot_width and sy = (height - pad) - ((y - y_min)/(y_max - y_min)) × plot_height.',
    solvedExamples: [
      {
        title: 'Quadratic Parabola: f(x) = x^2 - 4',
        inputs: 'Expression: x^2 - 4 | Domain: [-10, 10] | Step: 1',
        calculation: 'Set f(x) = 0: x^2 - 4 = 0 => (x - 2)(x + 2) = 0. Vertex at (0, -4).',
        result: 'Real Roots at x = -2 and x = 2 | Y-intercept: (0, -4) | Symmetric U-shaped parabola'
      },
      {
        title: 'Harmonic Oscillation: f(x) = sin(x)',
        inputs: 'Expression: sin(x) | Domain: [-6.28, 6.28] (-2π to 2π)',
        calculation: 'Periodic sine wave with amplitude 1 and period 2π (~6.283).',
        result: 'Roots at multiples of π (x = 0, ±3.14, ±6.28) | Y-intercept: (0, 0)'
      },
      {
        title: 'Cubic Polynomial: f(x) = x^3 - 3*x',
        inputs: 'Expression: x^3 - 3*x | Domain: [-5, 5]',
        calculation: 'Roots at x(x^2 - 3) = 0 => x = 0, x = ±√3 (±1.73). Local max at x = -1, local min at x = 1.',
        result: 'Roots at x = -1.73, 0, 1.73 | Turning points at (-1, 2) and (1, -2)'
      }
    ],
    tips: [
      'Use standard operator precedence: powers (^) have highest priority, followed by multiplication/division (*, /), then addition/subtraction (+, -).',
      'Implicit multiplication is supported: you can type 2x instead of 2*x, and 3sin(x) instead of 3*sin(x).',
      'Use parentheses for complex exponents: e.g., type e^(-(x^2)) for a Gaussian normal distribution bell curve.',
      'Use the step selector in the value table to examine fine-grained decimal points around roots and critical turning points.'
    ],
    commonMistakes: [
      'Writing sin x without parentheses instead of sin(x) or sin(2*x).',
      'Confusing rational division without grouping parentheses: e.g. 1/x+2 (which means (1/x)+2) instead of 1/(x+2).',
      'Expecting complex imaginary roots on a 2D real plane: only real intersections with y = 0 are displayed.',
      'Setting identical minimum and maximum window limits (e.g. x_min = 10 and x_max = 10).'
    ],
    faqs: [
      {
        question: 'What mathematical functions are supported by this graphing calculator?',
        answer: 'You can plot algebraic polynomials (x^2, x^3), linear lines (mx + c), trigonometric functions (sin, cos, tan), square roots (sqrt), absolute values (abs), logarithms (ln, log), exponentials (e^x, 2^x), and rational expressions (1/x).'
      },
      {
        question: 'How do I plot trigonometric graphs in degrees vs radians?',
        answer: 'Trigonometric functions (sin, cos, tan) naturally evaluate x in radians, which is standard for calculus and analytical geometry. To plot in degrees, use sin(x * pi / 180).'
      },
      {
        question: 'Can I plot two functions simultaneously to find points of intersection?',
        answer: 'Yes! Click "+ Add second function f₂(x)" to render a secondary dashed green curve alongside the primary indigo curve to visually pinpoint intersections.'
      },
      {
        question: 'How does the calculator find roots (x-intercepts)?',
        answer: 'The calculator analyzes the function across the visible window, detecting where the curve crosses the horizontal axis (y = 0) and uses linear interpolation to highlight exact real root coordinates.'
      },
      {
        question: 'Is this graphing calculator free to use on mobile devices?',
        answer: 'Yes, it is 100% free, responsive, and works seamlessly across smartphones, tablets, laptops, and desktop browsers with no registration or download needed.'
      },
      {
        question: 'Does the calculator handle asymptotes and discontinuities?',
        answer: 'Yes. Rational functions like 1/x clamp infinite and undefined values so the SVG path breaks cleanly at vertical asymptotes without crashing the render.'
      },
      {
        question: 'Can I export or print my graph?',
        answer: 'Yes, you can export your graph and data table to PDF or Excel using the one-click export buttons located directly below the coordinate plane.'
      },
      {
        question: 'Can I share my plotted function with students or colleagues?',
        answer: 'Yes. Every parameter (function expression, window limits, zoom levels) is encoded into a shareable link that recreates the exact graph on any device.'
      }
    ],
    relatedCalculators: [
      {
        name: 'Scientific Calculator',
        slug: '/scientific-calculator',
        description: 'Perform advanced trigonometry, logarithms, and scientific calculations.'
      },
      {
        name: 'Fraction Calculator',
        slug: '/fraction-calculator',
        description: 'Add, subtract, multiply, and divide fractions with step-by-step simplification.'
      },
      {
        name: 'Percentage Calculator',
        slug: '/percentage-calculator',
        description: 'Calculate percentage increases, decreases, and ratios instantly.'
      }
    ]
  },
  hi: {
    pageTitle: 'ऑनलाइन ग्राफिंग कैलकुलेटर - 2D फ़ंक्शन प्लॉटर | CalcMaster',
    metaDescription:
      'मुफ़्त ऑनलाइन 2D ग्राफिंग कैलकुलेटर: बीजगणितीय, त्रिकोणमितीय एवं कैलकुलस ग्राफ़ बनाएं। वास्तविक रूट्स (शून्यक) और निर्देशांक तालिका देखें।',
    h1: 'ऑनलाइन ग्राफिंग कैलकुलेटर – 2D फ़ंक्शन एवं वक्र विश्लेषक',
    introText:
      'हमारे मुफ़्त ऑनलाइन 2D ग्राफिंग कैलकुलेटर की मदद से बीजगणित, त्रिकोणमिति, घातांक और कैलकुलस फलनों के ग्राफ़ तुरंत बनाएं। वास्तविक रूट्स (शून्यक) खोजें और निर्देशांकों की तालिका का विश्लेषण करें।',
    howToUse: [
      'फ़ंक्शन इनपुट बॉक्स में अपना गणितीय समीकरण दर्ज करें (जैसे x^2 - 4, sin(x), e^x)।',
      'तुलना करने के लिए दूसरा फ़ंक्शन f₂(x) जोड़ें।',
      'ज़ूम इन और ज़ूम आउट बटनों से ग्राफ विंडो को एडजस्ट करें।',
      'वास्तविक रूट्स (शून्यक) और y-अवरोधन देखें।'
    ],
    formulaExplanation:
      'ग्राफिंग इंजन चुने हुए डोमेन [x_min, x_max] में प्रत्येक x बिंदु पर y = f(x) का मान निकालता है और इसे 2D कार्टेशियन निर्देशांक तल पर प्रदर्शित करता है।',
    solvedExamples: [
      {
        title: 'द्विघात परवलय: f(x) = x^2 - 4',
        inputs: 'समीकरण: x^2 - 4 | डोमेन: [-10, 10]',
        calculation: 'x^2 - 4 = 0 => x = ±2. शीर्ष बिंदु (0, -4)।',
        result: 'रूट्स x = -2 और x = 2 पर | Y-अवरोधन: (0, -4)'
      }
    ],
    tips: [
      'समीकरण में 2x या 3sin(x) जैसे सामान्य संक्षिप्तीकरण आसानी से काम करते हैं।',
      'जटिल समीकरणों के लिए कोष्ठक () का प्रयोग करें।'
    ],
    commonMistakes: [
      'त्रिकोणमितीय फलनों में बिना कोष्ठक के sin x लिखना।'
    ],
    faqs: [
      {
        question: 'क्या यह ग्राफिंग कैलकुलेटर मोबाइल पर काम करता है?',
        answer: 'हाँ, यह मोबाइल, टैबलेट और डेस्कटॉप सभी डिवाइसों पर पूरी तरह मुफ़्त और रिस्पॉन्सिव रूप से काम करता है।'
      },
      {
        question: 'क्या मैं दो फ़ंक्शन एक साथ प्लॉट कर सकता हूँ?',
        answer: 'हाँ, आप एक साथ दो फ़ंक्शन प्लॉट करके उनके प्रतिच्छेदन बिंदु और अंतर देख सकते हैं।'
      }
    ],
    relatedCalculators: [
      {
        name: 'वैज्ञानिक कैलकुलेटर (Scientific Calculator)',
        slug: '/scientific-calculator',
        description: 'उन्नत वैज्ञानिक गणनाएं और त्रिकोणमिति हल करें।'
      }
    ]
  }
};
