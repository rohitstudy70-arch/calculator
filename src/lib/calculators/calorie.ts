import { Gender, UnitSystem } from './bmi';
import { calculateBMR, BMRFormula } from './bmr';
import { HEALTH_CONFIG } from '@/config/health';

export type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'extra_active';

export interface CalorieInput {
  gender: Gender;
  age: number;
  unitSystem?: UnitSystem;
  heightCm?: number;
  heightFeet?: number;
  heightInches?: number;
  weightKg?: number;
  weightLbs?: number;
  activityLevel: ActivityLevel;
  formula?: BMRFormula;
  bodyFatPercent?: number;
}

export interface MacroSplit {
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
}

export interface CalorieTarget {
  goal: string;
  weeklyPaceKg: number;
  dailyCalories: number;
  deficitOrSurplus: number;
  isSafeThresholdWarning: boolean;
  macros: {
    balanced: MacroSplit; // 50% Carb, 20% Protein, 30% Fat
    highProtein: MacroSplit; // 40% Carb, 30% Protein, 30% Fat
    lowCarb: MacroSplit; // 25% Carb, 35% Protein, 40% Fat
  };
}

export interface CalorieResult {
  bmr: number;
  tdee: number;
  activityMultiplier: number;
  activityLevelLabel: string;
  safeFloor: number;
  targets: {
    maintenance: CalorieTarget;
    mildWeightLoss: CalorieTarget; // -250 kcal (0.25 kg/wk)
    weightLoss: CalorieTarget; // -500 kcal (0.5 kg/wk)
    extremeWeightLoss: CalorieTarget; // -1000 kcal (1 kg/wk)
    mildWeightGain: CalorieTarget; // +250 kcal
    weightGain: CalorieTarget; // +500 kcal
  };
}

export function validateCalorieInput(input: CalorieInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const isMetric = (input.unitSystem ?? 'metric') === 'metric';

  if (!input.age || input.age < 15 || input.age > 100 || isNaN(input.age)) {
    errors.age = 'Age must be between 15 and 100 years';
  }

  if (isMetric) {
    if (!input.heightCm || input.heightCm < 50 || input.heightCm > 260 || isNaN(input.heightCm)) {
      errors.heightCm = 'Height must be between 50 cm and 260 cm';
    }
    if (!input.weightKg || input.weightKg < 20 || input.weightKg > 350 || isNaN(input.weightKg)) {
      errors.weightKg = 'Weight must be between 20 kg and 350 kg';
    }
  } else {
    const totalInches = (input.heightFeet ?? 0) * 12 + (input.heightInches ?? 0);
    if (totalInches < 20 || totalInches > 105) {
      errors.height = 'Height must be between 1 ft 8 in and 8 ft 9 in';
    }
    if (!input.weightLbs || input.weightLbs < 44 || input.weightLbs > 770 || isNaN(input.weightLbs)) {
      errors.weightLbs = 'Weight must be between 44 lbs and 770 lbs';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function calculateMacroSplit(calories: number, carbPct: number, proteinPct: number, fatPct: number): MacroSplit {
  const carbsCalories = Math.round(calories * (carbPct / 100));
  const proteinCalories = Math.round(calories * (proteinPct / 100));
  const fatCalories = Math.round(calories * (fatPct / 100));

  return {
    carbsCalories,
    proteinCalories,
    fatCalories,
    carbsGrams: Math.round(carbsCalories / 4), // 4 kcal per gram of carbs
    proteinGrams: Math.round(proteinCalories / 4), // 4 kcal per gram of protein
    fatGrams: Math.round(fatCalories / 9), // 9 kcal per gram of fat
  };
}

function createTarget(
  goal: string,
  pace: number,
  tdee: number,
  offset: number,
  safeFloor: number
): CalorieTarget {
  let daily = tdee + offset;
  const isWarning = daily < safeFloor;
  if (daily < safeFloor) {
    daily = safeFloor; // Never suggest below safe clinical floor
  }

  return {
    goal,
    weeklyPaceKg: pace,
    dailyCalories: Math.round(daily),
    deficitOrSurplus: offset,
    isSafeThresholdWarning: isWarning,
    macros: {
      balanced: calculateMacroSplit(daily, 50, 20, 30),
      highProtein: calculateMacroSplit(daily, 40, 30, 30),
      lowCarb: calculateMacroSplit(daily, 25, 35, 40),
    },
  };
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE) and goal-specific daily calorie targets.
 */
export function calculateCalories(input: CalorieInput): CalorieResult {
  const bmrRes = calculateBMR({
    gender: input.gender,
    age: input.age,
    unitSystem: input.unitSystem,
    heightCm: input.heightCm,
    heightFeet: input.heightFeet,
    heightInches: input.heightInches,
    weightKg: input.weightKg,
    weightLbs: input.weightLbs,
    bodyFatPercent: input.bodyFatPercent,
    formula: input.formula,
  });

  const bmr = bmrRes.primaryBMR;
  const safeFloor =
    input.gender === 'female'
      ? HEALTH_CONFIG.safeCalorieFloors.female.value
      : HEALTH_CONFIG.safeCalorieFloors.male.value;

  const activityMap: Record<ActivityLevel, { multiplier: number; label: string }> = {
    sedentary: { multiplier: 1.2, label: 'Sedentary (Desk job, little exercise)' },
    lightly_active: { multiplier: 1.375, label: 'Lightly Active (1-3 days/week exercise)' },
    moderately_active: { multiplier: 1.55, label: 'Moderately Active (3-5 days/week sports)' },
    very_active: { multiplier: 1.725, label: 'Very Active (6-7 days/week hard exercise)' },
    extra_active: { multiplier: 1.9, label: 'Extra Active (Physical job or 2x daily training)' },
  };

  const act = activityMap[input.activityLevel ?? 'sedentary'] ?? activityMap.sedentary;
  const tdee = Math.round(bmr * act.multiplier);

  return {
    bmr,
    tdee,
    activityMultiplier: act.multiplier,
    activityLevelLabel: act.label,
    safeFloor,
    targets: {
      maintenance: createTarget('Maintain Current Weight', 0, tdee, 0, safeFloor),
      mildWeightLoss: createTarget('Mild Weight Loss (0.25 kg / week)', -0.25, tdee, -250, safeFloor),
      weightLoss: createTarget('Steady Weight Loss (0.50 kg / week)', -0.5, tdee, -500, safeFloor),
      extremeWeightLoss: createTarget('Accelerated Weight Loss (1.0 kg / week)', -1.0, tdee, -1000, safeFloor),
      mildWeightGain: createTarget('Mild Weight Gain (0.25 kg / week)', 0.25, tdee, 250, safeFloor),
      weightGain: createTarget('Muscle Building Weight Gain (0.50 kg / week)', 0.5, tdee, 500, safeFloor),
    },
  };
}
