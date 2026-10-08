export const tdeeContent = {
  en: {
    pageTitle: 'TDEE Calculator - Daily Energy Expenditure | CalcMaster',
    metaDescription:
      'Calculate your Total Daily Energy Expenditure (TDEE) & maintenance calories accurately. Free TDEE calculator for weight loss, cutting, and muscle building.',
    h1: 'TDEE Calculator – Total Daily Energy Expenditure & Macros',
    introText:
      'Calculate your Total Daily Energy Expenditure (TDEE) and find your exact daily maintenance calories. Get customized calorie and macro targets for fat loss, cutting, body recomposition, and lean muscle building based on the gold-standard Mifflin-St Jeor formula.',
    howToUse: [
      'Select your gender (Male or Female) and enter your current Age in years.',
      'Enter your Height in centimeters (or toggle to feet/inches) and Weight in kilograms (or pounds).',
      'Choose your daily physical activity level from Sedentary to Extremely Active.',
      'Optionally input your Body Fat Percentage if known for Katch-McArdle precision.',
      'Instantly view your BMR (Basal Metabolic Rate) and exact TDEE maintenance calories.',
      'Review personalized daily calorie targets for weight loss (-500 kcal) and lean bulking (+250 kcal).',
      'Check recommended daily macronutrient splits (Protein, Carbohydrates, and Fats in grams).',
      'Download your customized TDEE and nutrition guide as a PDF or Excel report.',
    ],
    formulaExplanation: `TDEE (Total Daily Energy Expenditure) calculation methodology:

1. Basal Metabolic Rate (BMR) via Mifflin-St Jeor Formula:
   • For Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
   • For Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161

2. Optional Lean Body Mass Formula (Katch-McArdle):
   • BMR = 370 + (21.6 × Lean Body Mass in kg)

3. Activity Level Multipliers:
   • Sedentary (desk job, no exercise): BMR × 1.2
   • Lightly Active (light exercise 1–3 days/week): BMR × 1.375
   • Moderately Active (moderate workout 3–5 days/week): BMR × 1.55
   • Very Active (hard training 6–7 days/week): BMR × 1.725
   • Extremely Active (physical labor or 2x daily training): BMR × 1.9

4. Energy Balance Principles:
   • Maintenance: Calories In = TDEE
   • Fat Loss (Deficit): Calories In = TDEE - 500 kcal/day (~0.5 kg loss/week)
   • Muscle Gain (Surplus): Calories In = TDEE + 250 to 500 kcal/day`,
    solvedExamples: [
      {
        title: 'Example 1: Male Office Worker (Fat Loss Goal)',
        inputs: 'Male, 28 Years, 175 cm, 80 kg, Sedentary Activity',
        calculation: 'BMR = 10(80) + 6.25(175) - 5(28) + 5 = 1,759 kcal\nTDEE = 1,759 × 1.2 = 2,111 kcal/day\nFat Loss Target (-500 kcal) = 1,611 kcal/day',
        result: 'Maintenance: 2,111 kcal | Cutting Target: 1,611 kcal/day',
      },
      {
        title: 'Example 2: Female Fitness Enthusiast (Lean Maintenance)',
        inputs: 'Female, 25 Years, 165 cm, 58 kg, Moderately Active (4 days gym)',
        calculation: 'BMR = 10(58) + 6.25(165) - 5(25) - 161 = 1,325 kcal\nTDEE = 1,325 × 1.55 = 2,054 kcal/day',
        result: 'Maintenance: 2,054 kcal/day (Macros: 154g P, 205g C, 68g F)',
      },
      {
        title: 'Example 3: College Student Lean Bulking Target',
        inputs: 'Male, 21 Years, 180 cm, 68 kg, Very Active (lifting 5 days + sports)',
        calculation: 'BMR = 10(68) + 6.25(180) - 5(21) + 5 = 1,705 kcal\nTDEE = 1,705 × 1.725 = 2,941 kcal/day\nLean Bulk Surplus (+300 kcal) = 3,241 kcal/day',
        result: 'Bulking Target: 3,241 kcal/day (~0.3 kg lean gain/week)',
      },
    ],
    tips: [
      'Most people overestimate their daily activity level: if you work at a desk and exercise for 45 minutes, select "Lightly Active" or "Moderately Active" for best accuracy.',
      'Aim for a protein intake of 1.6 to 2.2 grams per kilogram of body weight to preserve lean muscle during a caloric deficit.',
      'Track your weight trend over 2 to 3 weeks and adjust your calorie intake by 100–150 calories if progress stalls.',
      'Never drop below minimum safe biological floors (1,200 kcal for women, 1,500 kcal for men) without clinical supervision.',
    ],
    commonMistakes: [
      'Selecting "Very Active" based solely on 30 minutes of cardio while sitting for the remaining 10 hours of the day.',
      'Creating an excessively aggressive deficit (>1,000 kcal), which leads to muscle loss, fatigue, and metabolic slowdown.',
      'Not counting liquid calories, cooking oils, sauces, and weekend cheat meals in daily calorie totals.',
      'Assuming TDEE remains static as body weight decreases; recalculate TDEE every 4–5 kg of weight change.',
    ],
    faqs: [
      {
        question: 'What is TDEE and how is it calculated?',
        answer:
          'TDEE stands for Total Daily Energy Expenditure. It represents the total number of calories your body burns in a 24-hour period, calculated by multiplying your Basal Metabolic Rate (BMR) by an activity multiplier.',
      },
      {
        question: 'What is the difference between BMR and TDEE?',
        answer:
          'BMR is the base energy required just to keep your organs alive while resting in bed. TDEE includes your BMR plus all physical activity, walking, workouts, and the thermic effect of digesting food.',
      },
      {
        question: 'How many calories should I eat to lose weight?',
        answer:
          'To lose approximately 0.5 kg (1 lb) of fat per week, consume 500 calories below your TDEE daily. For a milder deficit, consume 250 calories below your TDEE.',
      },
      {
        question: 'How accurate is this TDEE calculator?',
        answer:
          'Our calculator uses the scientifically validated Mifflin-St Jeor formula, widely recognized by clinical dietitians as having an accuracy within 5% to 10% of metabolic laboratory testing.',
      },
      {
        question: 'What macro split should I follow after calculating TDEE?',
        answer:
          'A balanced macro split is 30% Protein, 40% Carbohydrates, and 30% Healthy Fats. If you are cutting fat, a higher protein split (40% Protein, 25% Carbs, 35% Fats) helps maintain satiety and muscle mass.',
      },
      {
        question: 'TDEE calculator kaise use karein (Hindi)?',
        answer:
          'Apna ling (Male/Female), umar, lambai, vajan aur daily activity level select karein. Calculator turant aapka BMR, maintenance calories (TDEE) aur vajan kam karne ke daily calorie targets bata dega.',
      },
      {
        question: 'Does TDEE decrease as I lose weight?',
        answer:
          'Yes. As you lose body mass, your body requires less energy to move and function. We recommend updating your weight in the calculator every 4 to 5 kg lost.',
      },
      {
        question: 'Is this TDEE calculator free and confidential?',
        answer:
          'Yes, CalcMaster TDEE calculator runs 100% in your browser for free, with zero signups and complete privacy.',
      },
    ],
    relatedCalculators: [
      { slug: 'calorie', name: 'Calorie Calculator', description: 'Daily calorie deficit and macro targets' },
      { slug: 'bmr', name: 'BMR Calculator', description: 'Basal Metabolic Rate resting calories' },
      { slug: 'bmi', name: 'BMI Calculator', description: 'Body Mass Index and healthy weight range' },
      { slug: 'body-fat', name: 'Body Fat Calculator', description: 'Body fat percentage tape measure method' },
    ],
  },
  hi: {
    pageTitle: 'TDEE कैलकुलेटर - दैनिक कैलोरी बर्न व मेंटेनेंस | CalcMaster',
    metaDescription:
      'अपना टोटल डेली एनर्जी एक्सपेंडिचर (TDEE) और मेंटेनेंस कैलोरी ऑनलाइन निकालें। वजन घटाने और मसल बिल्डिंग का फ्री TDEE कैलकुलेटर।',
    h1: 'TDEE कैलकुलेटर – दैनिक ऊर्जा व्यय व मैक्रोज़',
    introText:
      'जानिए आपका शरीर दिनभर में कितनी कैलोरी बर्न करता है। अपने शरीर और वर्कआउट के अनुसार सटीक मेंटेनेंस कैलोरी, वेट लॉस डाइट और प्रोटीन/कार्ब लक्ष्य प्राप्त करें।',
  },
};
