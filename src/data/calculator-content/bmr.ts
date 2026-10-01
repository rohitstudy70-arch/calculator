export const bmrContent = {
  en: {
    pageTitle: 'BMR Calculator - Basal Metabolic Rate (Mifflin-St Jeor)',
    metaDescription: 'Free BMR calculator to determine your daily basal calorie expenditure using Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas.',
    h1: 'BMR Calculator – Calculate Your Basal Metabolic Rate & Resting Calories',
    introText:
      'Your Basal Metabolic Rate (BMR) represents the minimum number of calories your body burns every 24 hours just to stay alive at complete physical rest — powering critical cellular functions such as breathing, blood circulation, temperature regulation, and brain activity.',
    howToUse: [
      'Select your biological gender and enter your current age in years.',
      'Provide your height and body weight in either metric (cm, kg) or imperial (ft, in, lbs) units.',
      'Optionally enter your body fat percentage if you want to compute the Katch-McArdle lean mass formula.',
      'Select your preferred clinical calculation formula (Mifflin-St Jeor is recommended by the Academy of Nutrition and Dietetics).',
      'Review your resting calorie burn per day, hourly metabolic burn rate, and comparative formula outputs.',
    ],
    formulaExplanation:
      'BMR is calculated using validated clinical equations:\n\n1. Mifflin-St Jeor Equation (Gold Standard):\n• Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5\n• Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161\n\n2. Revised Harris-Benedict Equation (1984):\n• Men: BMR = 88.362 + (13.397 × kg) + (4.799 × cm) - (5.677 × age)\n• Women: BMR = 447.593 + (9.247 × kg) + (3.098 × cm) - (4.330 × age)\n\n3. Katch-McArdle Equation (Lean Body Mass):\n• BMR = 370 + (21.6 × LBM in kg)\n• Where LBM = Weight × (1 - Body Fat % / 100)',
    solvedExamples: [
      {
        title: '30-Year-Old Indian Male (175 cm, 70 kg)',
        inputs: 'Male | Age: 30 | Height: 175 cm | Weight: 70 kg',
        calculation:
          'Mifflin-St Jeor = (10 × 70) + (6.25 × 175) - (5 × 30) + 5\n= 700 + 1093.75 - 150 + 5 = 1,648.75 ≈ 1,649 kcal/day.\nHarris-Benedict = 1,696 kcal/day.',
        result:
          'Basal Metabolic Rate: 1,649 kcal/day | Hourly Resting Burn: 68.7 kcal/hr',
      },
      {
        title: '28-Year-Old Indian Female (160 cm, 54 kg)',
        inputs: 'Female | Age: 28 | Height: 160 cm | Weight: 54 kg',
        calculation:
          'Mifflin-St Jeor = (10 × 54) + (6.25 × 160) - (5 × 28) - 161\n= 540 + 1000 - 140 - 161 = 1,239 kcal/day.',
        result:
          'Basal Metabolic Rate: 1,239 kcal/day | Hourly Resting Burn: 51.6 kcal/hr',
      },
      {
        title: 'Athletic Male with 14% Body Fat (178 cm, 78 kg)',
        inputs: 'Male | Age: 26 | Weight: 78 kg | Body Fat: 14%',
        calculation:
          'Lean Mass LBM = 78 × (1 - 0.14) = 67.08 kg.\nKatch-McArdle = 370 + (21.6 × 67.08) = 370 + 1448.9 = 1,819 kcal/day.',
        result:
          'Katch-McArdle BMR: 1,819 kcal/day | Lean Body Mass: 67.1 kg',
      },
    ],
    tips: [
      'Never consume fewer calories than your calculated BMR without strict medical supervision, as extreme deficits trigger muscle catabolism and metabolic slowdown.',
      'Building lean muscle mass through resistance training is the most effective way to naturally increase your resting BMR over time.',
      'BMR accounts for approximately 60% to 75% of your total daily energy expenditure (TDEE).',
      'BMR naturally declines by roughly 1% to 2% per decade after age 25 due to age-related sarcopenia.',
    ],
    commonMistakes: [
      'Confusing BMR (calories burned at rest) with TDEE (total calories burned including movement and exercise).',
      'Using unadjusted Harris-Benedict formulas from 1919 which overestimate modern caloric requirements by 5-10%.',
      'Severely under-eating below basal levels in an attempt to lose weight faster.',
    ],
    faqs: [
      {
        question: 'What is the difference between BMR and RMR (Resting Metabolic Rate)?',
        answer:
          'BMR is measured under strict laboratory conditions immediately upon waking in a fasting state and thermoneutral environment. RMR is measured under less stringent resting conditions without overnight stays and typically averages 5% to 10% higher than true BMR. In practical fitness, they are often used interchangeably.',
      },
      {
        question: 'Which BMR formula is the most accurate?',
        answer:
          'The Mifflin-St Jeor equation is considered the most accurate formula for general populations by the Academy of Nutrition and Dietetics, with a margin of error within 10%. If you accurately know your body fat percentage from a DEXA scan, the Katch-McArdle equation provides high precision because it isolates lean mass.',
      },
      {
        question: 'Why does BMR decrease with age?',
        answer:
          'As people age, they naturally lose muscle mass (sarcopenia) and experience hormonal changes unless they actively engage in strength training and adequate protein intake.',
      },
      {
        question: 'How do I use my BMR to lose or gain weight?',
        answer:
          'Multiply your BMR by your physical activity multiplier (1.2 to 1.9) to find your Total Daily Energy Expenditure (TDEE). To lose weight, aim for a 300 to 500 kcal deficit below your TDEE while staying above your BMR floor.',
      },
      {
        question: 'Can thyroid dysfunction alter my actual BMR?',
        answer:
          'Yes. Hypothyroidism can reduce metabolic rate by up to 20-30%, whereas hyperthyroidism can elevate basal calorie consumption. If you suspect metabolic irregularities, consult an endocrinologist.',
      },
      {
        question: 'Does drinking cold water or eating spicy food boost BMR?',
        answer:
          'The thermic effect of water and spicy foods (capsaicin) provides only a negligible, transient bump (less than 20-30 kcal/day) and does not meaningfully impact your long-term basal metabolic rate.',
      },
    ],
    relatedCalculators: [
      { name: 'Calorie Calculator', slug: 'calorie-calculator', description: 'Calculate daily TDEE and deficit/surplus targets' },
      { name: 'BMI Calculator', slug: 'bmi-calculator', description: 'Evaluate body mass index and healthy weight ranges' },
      { name: 'Body Fat Calculator', slug: 'body-fat-calculator', description: 'Calculate fat mass and lean muscle mass' },
      { name: 'Age Calculator', slug: 'age-calculator', description: 'Calculate exact age and timeline milestones' },
    ],
    lastUpdated: '2026-09-30',
  },
};
