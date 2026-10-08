/**
 * TDEE (Total Daily Energy Expenditure) Calculator Engine
 * Calculates maintenance calories, BMR, weight loss/gain targets, and macro distributions.
 */

export type Gender = 'male' | 'female';

export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'heavy'
  | 'athlete';

export interface TDEEInput {
  gender: Gender;
  age: number; // 15 - 100
  heightCm: number; // 100 - 250 cm
  weightKg: number; // 30 - 300 kg
  activityLevel: ActivityLevel;
  bodyFatPercent?: number; // Optional Katch-McArdle formula
}

export interface MacroDistribution {
  name: string;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export interface TDEEResult {
  bmr: number;
  tdee: number; // Maintenance calories per day
  bmi: number;
  bmiCategory: string;
  idealWeightKg: { min: number; max: number };
  calorieGoals: {
    maintenance: number;
    mildLoss: number; // -250 kcal (-0.25 kg/wk)
    weightLoss: number; // -500 kcal (-0.5 kg/wk)
    extremeLoss: number; // -1000 kcal (-1 kg/wk)
    mildGain: number; // +250 kcal (+0.25 kg/wk)
    muscleGain: number; // +500 kcal (+0.5 kg/wk)
  };
  macros: {
    moderateCarb: MacroDistribution;
    lowerCarb: MacroDistribution;
    higherCarb: MacroDistribution;
  };
  activityMultiplier: number;
  activityLabel: string;
}

export const ACTIVITY_MULTIPLIERS: Record<
  ActivityLevel,
  { multiplier: number; label: string; description: string }
> = {
  sedentary: {
    multiplier: 1.2,
    label: 'Sedentary (Desk Job)',
    description: 'Little to no physical exercise, office work',
  },
  light: {
    multiplier: 1.375,
    label: 'Lightly Active',
    description: 'Light exercise or sports 1–3 days per week',
  },
  moderate: {
    multiplier: 1.55,
    label: 'Moderately Active',
    description: 'Moderate exercise or sports 3–5 days per week',
  },
  heavy: {
    multiplier: 1.725,
    label: 'Very Active',
    description: 'Hard daily exercise or training 6–7 days per week',
  },
  athlete: {
    multiplier: 1.9,
    label: 'Extremely Active / Athlete',
    description: 'Heavy physical labor or 2x daily intense training',
  },
};

export function validateTDEEInput(input: TDEEInput): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!input.age || input.age < 15 || input.age > 100) {
    errors.age = 'Age must be between 15 and 100 years.';
  }
  if (!input.heightCm || input.heightCm < 100 || input.heightCm > 250) {
    errors.height = 'Height must be between 100 cm and 250 cm.';
  }
  if (!input.weightKg || input.weightKg < 30 || input.weightKg > 300) {
    errors.weight = 'Weight must be between 30 kg and 300 kg.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateTDEE(input: TDEEInput): TDEEResult {
  const { gender, age, heightCm, weightKg, activityLevel, bodyFatPercent } = input;

  let bmr: number;

  if (bodyFatPercent && bodyFatPercent > 3 && bodyFatPercent < 60) {
    // Katch-McArdle formula (lean body mass)
    const lbm = weightKg * (1 - bodyFatPercent / 100);
    bmr = 370 + 21.6 * lbm;
  } else {
    // Mifflin-St Jeor formula
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  const actInfo = ACTIVITY_MULTIPLIERS[activityLevel] || ACTIVITY_MULTIPLIERS.moderate;
  const tdee = Math.round(bmr * actInfo.multiplier);

  // BMI
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));
  let bmiCategory = 'Normal Weight';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi < 25) bmiCategory = 'Normal Weight';
  else if (bmi < 30) bmiCategory = 'Overweight';
  else bmiCategory = 'Obese';

  // Healthy weight range (BMI 18.5 - 24.9)
  const minHealthyWeight = Math.round(18.5 * heightM * heightM);
  const maxHealthyWeight = Math.round(24.9 * heightM * heightM);

  // Calorie Targets (with minimum safe thresholds: 1200 kcal female, 1500 kcal male)
  const safeFloor = gender === 'female' ? 1200 : 1500;
  const mildLoss = Math.max(safeFloor, Math.round(tdee - 250));
  const weightLoss = Math.max(safeFloor, Math.round(tdee - 500));
  const extremeLoss = Math.max(safeFloor, Math.round(tdee - 1000));
  const mildGain = Math.round(tdee + 250);
  const muscleGain = Math.round(tdee + 500);

  // Macro helper: (Calories, Protein%, Carb%, Fat%)
  const computeMacros = (cals: number, pPct: number, cPct: number, fPct: number, name: string): MacroDistribution => ({
    name,
    proteinGrams: Math.round((cals * pPct) / 4),
    carbsGrams: Math.round((cals * cPct) / 4),
    fatGrams: Math.round((cals * fPct) / 9),
  });

  return {
    bmr: Math.round(bmr),
    tdee,
    bmi,
    bmiCategory,
    idealWeightKg: { min: minHealthyWeight, max: maxHealthyWeight },
    calorieGoals: {
      maintenance: tdee,
      mildLoss,
      weightLoss,
      extremeLoss,
      mildGain,
      muscleGain,
    },
    macros: {
      moderateCarb: computeMacros(tdee, 0.30, 0.40, 0.30, 'Moderate Carb (30P / 40C / 30F)'),
      lowerCarb: computeMacros(tdee, 0.40, 0.20, 0.40, 'Lower Carb / Cutting (40P / 20C / 40F)'),
      higherCarb: computeMacros(tdee, 0.30, 0.50, 0.20, 'Higher Carb / Athletic (30P / 50C / 20F)'),
    },
    activityMultiplier: actInfo.multiplier,
    activityLabel: actInfo.label,
  };
}
