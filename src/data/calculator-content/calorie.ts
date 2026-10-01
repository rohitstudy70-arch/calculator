export const calorieContent = {
  en: {
    pageTitle: 'Calorie Calculator - Daily TDEE & Macros | CalcMaster',
    metaDescription:
      'Calculate daily calorie needs (TDEE) for weight loss, maintenance, or muscle gain. Get customized macro split (protein, carbs, fat) and safe targets.',
    h1: 'Calorie Calculator – Daily Calorie & Macro Target Planner',
    introText:
      'Achieving sustainable fitness and body composition goals requires understanding your Total Daily Energy Expenditure (TDEE). This clinical calculator determines the exact number of daily calories required to maintain, lose, or gain weight safely, backed by evidence-based macronutrient distributions and safety floors.',
    howToUse: [
      'Select your gender, age, height, and current body weight.',
      'Select your realistic daily physical activity level (from sedentary desk work to intense athletic training).',
      'Review your baseline BMR and Total Daily Energy Expenditure (TDEE).',
      'Explore customized daily calorie targets for steady weight loss (-500 kcal/day), mild fat loss (-250 kcal), or clean bulking (+500 kcal).',
      'Check recommended macronutrient gram distributions across Balanced, High-Protein, and Low-Carb splits.',
    ],
    formulaExplanation:
      'Daily Calorie Needs are determined via two sequential scientific calculations:\n\n1. Basal Metabolic Rate (BMR):\nCalculated via the Mifflin-St Jeor equation (the clinical gold standard).\n\n2. Total Daily Energy Expenditure (TDEE):\nTDEE = BMR × Physical Activity Factor (PAL)\n• Sedentary (desk job, minimal exercise): 1.20\n• Lightly Active (1–3 days/week workout): 1.375\n• Moderately Active (3–5 days/week sports/gym): 1.55\n• Very Active (6–7 days/week intense training): 1.725\n• Extra Active (heavy manual labor or twice-daily workouts): 1.90\n\nEnergy Balance Guidelines:\n• 1 kg of body fat contains approximately 7,700 kcal.\n• A daily deficit of 500 kcal yields ~0.5 kg of weekly fat loss.\n• Safe Minimum Floor: 1,200 kcal/day for women; 1,500 kcal/day for men.',
    solvedExamples: [
      {
        title: 'Software Engineer in Bengaluru (Male 29y, 76 kg, Sedentary)',
        inputs: 'Male | Age: 29 | Height: 174 cm | Weight: 76 kg | Activity: Sedentary (1.2)',
        calculation:
          'BMR = (10 × 76) + (6.25 × 174) - (5 × 29) + 5 = 760 + 1087.5 - 145 + 5 = 1,707.5 kcal.\nTDEE = 1,708 × 1.2 = 2,050 kcal/day.\nFat Loss Target (-500 kcal) = 1,550 kcal/day.',
        result:
          'Maintenance: 2,050 kcal/day | Fat Loss (0.5 kg/wk): 1,550 kcal/day | Protein Target: 116g/day',
      },
      {
        title: 'Working Professional in Mumbai (Female 32y, 60 kg, Moderately Active)',
        inputs: 'Female | Age: 32 | Height: 162 cm | Weight: 60 kg | Activity: Moderately Active (1.55)',
        calculation:
          'BMR = (10 × 60) + (6.25 × 162) - (5 × 32) - 161 = 600 + 1012.5 - 160 - 161 = 1,291.5 kcal.\nTDEE = 1,292 × 1.55 = 2,003 kcal/day.\nMild Deficit Target (-250 kcal) = 1,753 kcal/day.',
        result:
          'Maintenance: 2,003 kcal/day | Mild Loss (0.25 kg/wk): 1,753 kcal/day | Protein: 88g/day',
      },
      {
        title: 'Gym Enthusiast Bulking (Male 24y, 68 kg, Very Active)',
        inputs: 'Male | Age: 24 | Height: 178 cm | Weight: 68 kg | Activity: Very Active (1.725)',
        calculation:
          'BMR = (10 × 68) + (6.25 × 178) - (5 × 24) + 5 = 680 + 1112.5 - 120 + 5 = 1,677.5 kcal.\nTDEE = 1,678 × 1.725 = 2,895 kcal/day.\nMuscle Gain Surplus (+500 kcal) = 3,395 kcal/day.',
        result:
          'Maintenance: 2,895 kcal/day | Clean Surplus: 3,395 kcal/day | High-Protein: 255g/day',
      },
    ],
    tips: [
      'Prioritize a moderate 300 to 500 kcal deficit rather than crash diets; moderate deficits preserve lean muscle mass and prevent metabolic adaptation.',
      'Consume at least 1.6 to 2.2 grams of protein per kilogram of body weight during calorie deficits to optimize muscle retention.',
      'Track your calorie intake using a digital food scale for accurate portion sizing rather than relying on visual estimation.',
      'Adjust your calorie targets every 4 to 6 weeks as your body weight drops and metabolic rate adjusts.',
    ],
    commonMistakes: [
      'Overestimating workout calories and eating back the entire calorie burn calculated by fitness watches.',
      'Dropping below the clinical safety threshold (1,200 kcal for women, 1,500 kcal for men), risking micronutrient deficiencies and hormonal imbalances.',
      'Forgetting liquid calories (sugary chai, sodas, juices, and alcohol) and cooking oils in daily tracking.',
    ],
    faqs: [
      {
        question: 'What is Total Daily Energy Expenditure (TDEE)?',
        answer:
          'TDEE is the total sum of calories burned in 24 hours. It comprises four key components: Basal Metabolic Rate (BMR, ~60-70%), Non-Exercise Activity Thermogenesis (NEAT, ~15%), Exercise Activity Thermogenesis (EAT, ~5-10%), and Thermic Effect of Food (TEF, ~10%).',
      },
      {
        question: 'How many calories do I need to cut to lose 1 kg of fat?',
        answer:
          'One kilogram of human body fat tissue stores approximately 7,700 calories. A daily caloric deficit of 500 kcal creates a weekly deficit of 3,500 kcal, producing approximately 0.45 to 0.5 kg of fat loss per week.',
      },
      {
        question: 'What is the safe minimum daily calorie intake?',
        answer:
          'Clinical guidelines from the American College of Sports Medicine (ACSM) and Harvard Medical School recommend never consuming fewer than 1,200 kcal/day for women and 1,500 kcal/day for men without direct medical supervision.',
      },
      {
        question: 'How should I divide my daily calories between protein, carbs, and fats?',
        answer:
          'A balanced macronutrient split typically allocates 45-55% of calories to complex carbohydrates, 20-30% to lean proteins, and 25-30% to healthy fats. If you are strength training or cutting, a high-protein distribution (30-35% protein) is recommended.',
      },
      {
        question: 'Why has my weight loss stalled despite sticking to the same calorie target?',
        answer:
          'As you lose weight, your smaller body requires fewer calories to operate (reduced BMR and NEAT), a phenomenon termed "adaptive thermogenesis". You may need to recalculate your TDEE based on your new lower weight.',
      },
      {
        question: 'Can I build muscle and lose fat at the same time (Body Recomposition)?',
        answer:
          'Yes, especially for beginners or those returning after a hiatus. Consuming a slight caloric deficit (200-300 kcal) paired with progressive resistance training and high protein intake (2.0g/kg) enables simultaneous muscle synthesis and fat loss.',
      },
    ],
    relatedCalculators: [
      { name: 'BMR Calculator', slug: 'bmr-calculator', description: 'Find your resting basal metabolic burn' },
      { name: 'BMI Calculator', slug: 'bmi-calculator', description: 'Check your body mass index and healthy range' },
      { name: 'Body Fat Calculator', slug: 'body-fat-calculator', description: 'Estimate body fat percentage via US Navy method' },
      { name: 'Water Intake Calculator', slug: 'water-intake-calculator', description: 'Calculate daily hydration needs' },
    ],
    lastUpdated: '2026-09-30',
  },
};
