export const bodyFatContent = {
  en: {
    pageTitle: 'Body Fat Calculator - US Navy Tape Method | CalcMaster',
    metaDescription:
      'Calculate body fat percentage and lean muscle mass using the official US Navy tape method. Compare results with clinical ACE categories for men & women.',
    h1: 'Body Fat Calculator – US Navy Circumference Method',
    introText:
      'Body Fat Percentage reflects the proportion of adipose tissue relative to your total body mass. While BMI only evaluates total weight against height, the US Navy Circumference Method accurately differentiates between lean muscle mass and fat tissue without expensive medical equipment.',
    howToUse: [
      'Select your biological gender and enter your age, height, and body weight.',
      'Measure your neck circumference just below the larynx (Adam\'s apple) with tape horizontal.',
      'Measure your waist circumference (at the navel level for men; at the narrowest natural waistline for women).',
      'For women, measure your hip circumference at the widest point of the buttocks.',
      'Instantly review your body fat percentage, fat mass in kg, lean body mass, and American Council on Exercise (ACE) category.',
    ],
    formulaExplanation:
      'The US Navy Body Fat equations (Hodgdon & Beckett) use logarithmic circumference ratios:\n\n• For Men:\nBody Fat % = 495 ÷ [1.0324 - 0.19077 × log₁₀(Waist - Neck) + 0.15456 × log₁₀(Height)] - 450\n(All circumference and height measurements in cm)\n\n• For Women:\nBody Fat % = 495 ÷ [1.29579 - 0.35004 × log₁₀(Waist + Hip - Neck) + 0.22100 × log₁₀(Height)] - 450\n\nMass Breakdowns:\n• Fat Mass (kg) = Total Weight × (Body Fat % ÷ 100)\n• Lean Muscle Mass (kg) = Total Weight - Fat Mass',
    solvedExamples: [
      {
        title: 'Active Male Professional (Height 178 cm, Weight 80 kg)',
        inputs: 'Male | Age: 28 | Height: 178 cm | Weight: 80 kg | Neck: 39 cm | Waist: 86 cm',
        calculation:
          'Waist - Neck = 47 cm.\nlog₁₀(47) = 1.6721; log₁₀(178) = 2.2504.\nDenominator = 1.0324 - 0.3190 + 0.3478 = 1.0612.\nBody Fat % = (495 / 1.0612) - 450 = 16.5%.\nFat Mass = 80 × 0.165 = 13.2 kg | Lean Mass = 66.8 kg.',
        result:
          'Body Fat: 16.5% | Category: Fitness | Lean Muscle Mass: 66.8 kg',
      },
      {
        title: 'Fitness-Focused Female (Height 165 cm, Weight 62 kg)',
        inputs: 'Female | Age: 30 | Height: 165 cm | Weight: 62 kg | Neck: 33 cm | Waist: 72 cm | Hip: 96 cm',
        calculation:
          'Waist + Hip - Neck = 72 + 96 - 33 = 135 cm.\nBody Fat % = ~23.4%.\nFat Mass = 62 × 0.234 = 14.5 kg | Lean Mass = 47.5 kg.',
        result:
          'Body Fat: 23.4% | Category: Fitness (Optimal) | Fat Mass: 14.5 kg',
      },
      {
        title: 'Overweight Risk Case (Male 170 cm, Weight 92 kg)',
        inputs: 'Male | Age: 42 | Height: 170 cm | Weight: 92 kg | Neck: 40 cm | Waist: 104 cm',
        calculation:
          'Waist - Neck = 64 cm.\nCalculated Body Fat % = 28.2%.\nIdeal Max = 20% | Excess Fat = 92 × (0.282 - 0.20) = 7.5 kg.',
        result:
          'Body Fat: 28.2% | Category: Obese | Fat to Lose for 20% Goal: ~7.5 kg',
      },
    ],
    tips: [
      'Take measurements in the morning under fasting conditions before breakfast and hydration shifts.',
      'Ensure the measuring tape lies flat and taut against the skin without compressing soft tissues.',
      'Repeat measurements twice and use the average value for consistent tracking over time.',
      'Track monthly changes in waist circumference alongside body weight to confirm that weight loss is primarily fat rather than muscle.',
    ],
    commonMistakes: [
      'Pulling the measuring tape too tight around the waist or neck, yielding an artificially low fat estimate.',
      'Measuring waist at different locations (e.g., above the hip bones instead of navel for men).',
      'Comparing circumference estimates directly with DEXA scans (tape methods have an inherent 3-4% margin of error).',
    ],
    faqs: [
      {
        question: 'How accurate is the US Navy Body Fat Method?',
        answer:
          'The US Navy method correlates strongly (r > 0.90) with hydrostatic weighing and DEXA scans, with an average margin of error of approximately 3% to 4%. It is the standard physical readiness test used by military armed forces worldwide.',
      },
      {
        question: 'What is a healthy body fat percentage for Indian men and women?',
        answer:
          'For Indian men, a healthy body fat range is 10% to 20% (ideal fitness: 14-17%). For Indian women, a healthy range is 18% to 28% (ideal fitness: 21-24%). Levels exceeding 25% for men and 32% for women are classified as clinical obesity.',
      },
      {
        question: 'What is Essential Body Fat?',
        answer:
          'Essential body fat is the minimum level of adipose tissue required for physiological survival, protecting internal organs, and regulating hormones (2-5% for men, 10-13% for women). Dropping below essential levels causes severe endocrine and cardiovascular dysfunction.',
      },
      {
        question: 'Why is body fat percentage more useful than BMI for athletes?',
        answer:
          'BMI treats all weight equally regardless of composition. Athletes with substantial skeletal muscle mass often register a "high BMI" despite having healthy, single-digit body fat percentages. Body fat percentage distinguishes lean tissue from adipose fat.',
      },
      {
        question: 'How often should I measure my body fat percentage?',
        answer:
          'Measuring once every 3 to 4 weeks under identical morning conditions is optimal. Fat loss is a gradual physiological process, and day-to-day fluid retention can skew tape measurements.',
      },
    ],
    relatedCalculators: [
      { name: 'BMI Calculator', slug: 'bmi-calculator', description: 'Calculate body mass index and healthy weight ranges' },
      { name: 'Calorie Calculator', slug: 'calorie-calculator', description: 'Determine daily calorie targets for fat loss' },
      { name: 'BMR Calculator', slug: 'bmr-calculator', description: 'Calculate resting metabolic calorie expenditure' },
      { name: 'Ideal Weight Calculator', slug: 'ideal-weight-calculator', description: 'Calculate healthy weight ranges by height' },
    ],
    lastUpdated: '2026-09-30',
  },
};
