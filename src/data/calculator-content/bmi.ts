export const bmiContent = {
  en: {
    pageTitle: 'BMI Calculator for Indian - Ideal Weight & ICMR | CalcMaster',
    metaDescription:
      'Calculate BMI for Indian adults with ICMR & WHO cutoffs. Find ideal body mass index, healthy weight in kg & cm, and cardio risks with free PDF report.',
    h1: 'BMI Calculator – Body Mass Index with Asian-Indian Cutoffs',
    introText:
      'Body Mass Index (BMI) is a standardized clinical screening metric that evaluates whether your weight is proportional to your height. For the Indian population, health experts recommend following the Asian-Indian ICMR consensus guidelines alongside standard WHO thresholds to better assess cardiovascular and metabolic risks.',
    howToUse: [
      'Select your preferred measurement units: Metric (cm / kg) or Imperial (feet & inches / lbs).',
      'Enter your accurate height and body weight.',
      'Instantly view your BMI value, Ponderal Index, and dual classification (WHO vs Asian-Indian).',
      'Inspect your personalized healthy weight target range calculated specifically for your height.',
      'Compare your lifestyle profile or weight goals side-by-side using the Compare mode.',
    ],
    formulaExplanation:
      'The Quetelet Body Mass Index formula is calculated as:\n\nMetric:\nBMI = Weight (kg) ÷ [Height (m)]²\n\nImperial:\nBMI = 703 × Weight (lbs) ÷ [Height (inches)]²\n\nPonderal Index (tri-ponderal mass):\nPI = Weight (kg) ÷ [Height (m)]³\n\nHealthy Weight Range Calculation:\n• Minimum Healthy Weight = 18.5 × [Height (m)]²\n• WHO Upper Healthy Weight = 24.9 × [Height (m)]²\n• Asian-Indian Upper Healthy Weight = 22.9 × [Height (m)]²',
    solvedExamples: [
      {
        title: 'Average Indian Adult (170 cm, 65 kg)',
        inputs: 'Height: 170 cm (1.70 m) | Weight: 65 kg',
        calculation:
          'BMI = 65 / (1.70)² = 65 / 2.89 = 22.49 kg/m².\nHealthy Range (Asian): 53.5 kg – 66.2 kg.\nHealthy Range (WHO): 53.5 kg – 72.0 kg.',
        result:
          'BMI: 22.5 | WHO Category: Normal Weight | Asian-Indian: Normal Weight (Optimal)',
      },
      {
        title: 'Asian-Indian Increased Risk Case (168 cm, 68 kg)',
        inputs: 'Height: 168 cm (1.68 m) | Weight: 68 kg',
        calculation:
          'BMI = 68 / (1.68)² = 68 / 2.8224 = 24.09 kg/m².\nWHO Normal cutoff is < 25.0, but Asian-Indian overweight threshold starts at 23.0.',
        result:
          'BMI: 24.1 | WHO Category: Normal Weight | Asian-Indian: Overweight (Action Recommended)',
      },
      {
        title: 'Imperial Unit Example (5 ft 8 in, 175 lbs)',
        inputs: 'Height: 68 inches (1.727 m) | Weight: 175 lbs (79.38 kg)',
        calculation:
          'BMI = (703 × 175) / (68)² = 123,025 / 4,624 = 26.6 kg/m².',
        result:
          'BMI: 26.6 | WHO Category: Overweight (Pre-obese) | Asian-Indian: Obese Class I',
      },
    ],
    tips: [
      'For Indians and South Asians, visceral abdominal fat accumulation occurs at lower BMIs; aim for a BMI between 18.5 and 22.9 kg/m².',
      'Combine BMI with Waist-to-Hip Ratio (WHR) and Body Fat Percentage for a comprehensive cardiovascular health assessment.',
      'Muscular athletes and strength trainers often have high BMIs due to dense lean muscle mass rather than excess body fat.',
      'Focus on sustainable, gradual weight management (0.5 kg to 1 kg per week) through balanced nutrition and daily physical activity.',
    ],
    commonMistakes: [
      'Relying solely on international WHO cutoffs for Indian body types (missing early pre-diabetes risk between BMI 23 and 25).',
      'Confusing BMI with body fat percentage (BMI does not differentiate between water, muscle mass, and adipose tissue).',
      'Attempting severe crash dieting to drop BMI rapidly, leading to metabolic slowdown and muscle loss.',
    ],
    faqs: [
      {
        question: 'Why are BMI cutoffs different for Asian Indians compared to Western populations?',
        answer:
          'Clinical research endorsed by ICMR, NIN, and WHO shows that South Asians possess a "thin-fat phenotype" — higher body fat percentage and higher abdominal visceral fat at lower BMI values compared to Caucasians. Therefore, the overweight threshold for Indians is lowered from 25.0 to 23.0 kg/m² and obesity from 30.0 to 25.0 kg/m².',
      },
      {
        question: 'What is a healthy weight for a person 5 feet 7 inches (170 cm) tall in India?',
        answer:
          'For a height of 170 cm, the healthy weight range under Asian-Indian ICMR guidelines is 53.5 kg to 66.2 kg (BMI 18.5 to 22.9). Under international WHO guidelines, the range extends up to 72.0 kg (BMI 24.9).',
      },
      {
        question: 'Can BMI overestimate body fat in athletes and gym-goers?',
        answer:
          'Yes. Muscle is much denser than adipose fat tissue. Bodybuilders and strength athletes with high lean muscle mass and very low body fat may register a BMI in the overweight or obese category.',
      },
      {
        question: 'What health risks are associated with a high BMI in India?',
        answer:
          'A BMI above 23.0 kg/m² in South Asians is associated with higher risks of Type 2 Diabetes Mellitus, hypertension, dyslipidemia, non-alcoholic fatty liver disease (NAFLD), and coronary artery disease.',
      },
      {
        question: 'What is the Ponderal Index and how does it differ from BMI?',
        answer:
          'The Ponderal Index (PI = weight / height³) measures body corpulence in three dimensions rather than two. It provides more accurate scaling for very short or very tall individuals where standard BMI can skew disproportionately.',
      },
      {
        question: 'Is BMI accurate for children and teenagers?',
        answer:
          'No, standard adult BMI cutoffs should not be used for children and adolescents under 18. Pediatric growth requires age-and-gender-specific BMI percentile growth charts (IAP/WHO charts).',
      },
      {
        question: 'What is the ideal body mass index and healthy weight for an Indian adult?',
        answer:
          'According to ICMR and consensus guidelines for Asian Indians, the ideal body mass index (BMI) is between 18.5 and 22.9 kg/m². A BMI between 23.0 and 24.9 kg/m² indicates overweight, and 25.0 kg/m² or higher indicates obesity due to higher predisposition to abdominal visceral adiposity.',
      },
      {
        question: 'How do I calculate BMI with height in cm and weight in kg (kg/m²)?',
        answer:
          'To calculate BMI with height in centimetres, convert your height to metres by dividing by 100 (e.g. 170 cm = 1.70 m), square that value (1.70 × 1.70 = 2.89), and divide your weight in kg by that number (e.g. 65 kg ÷ 2.89 = 22.49 kg/m²).',
      },
    ],
    relatedCalculators: [
      { name: 'BMR Calculator', slug: 'bmr-calculator', description: 'Calculate daily basal metabolic calories' },
      { name: 'Calorie Calculator', slug: 'calorie-calculator', description: 'Calculate daily TDEE and calorie targets' },
      { name: 'Body Fat Calculator', slug: 'body-fat-calculator', description: 'Estimate body fat percentage via US Navy method' },
      { name: 'Age Calculator', slug: 'age-calculator', description: 'Calculate exact age in years, months, and days' },
    ],
    lastUpdated: '2026-09-30',
  },
};
