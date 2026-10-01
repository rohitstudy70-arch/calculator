import { Gender, UnitSystem } from './bmi';

export type BMRFormula = 'mifflin_st_jeor' | 'harris_benedict' | 'katch_mcardle';

export interface BMRInput {
  unitSystem?: UnitSystem;
  gender: Gender;
  age: number; // in years (15-100)
  heightCm?: number;
  heightFeet?: number;
  heightInches?: number;
  weightKg?: number;
  weightLbs?: number;
  bodyFatPercent?: number; // Optional (0-60%), required for Katch-McArdle
  formula?: BMRFormula; // Default mifflin_st_jeor
}

export interface BMRResult {
  mifflinStJeor: number; // kcal/day
  harrisBenedict: number; // kcal/day
  katchMcardle: number | null; // kcal/day (if bodyFat provided)
  primaryBMR: number; // kcal/day according to selected formula
  hourlyRestingCalories: number; // primaryBMR / 24
  weightKg: number;
  heightCm: number;
  leanBodyMassKg: number | null;
  formulaUsed: string;
}

export function validateBMRInput(input: BMRInput): { valid: boolean; errors: Record<string, string> } {
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

  if (input.bodyFatPercent !== undefined && (input.bodyFatPercent < 2 || input.bodyFatPercent > 65 || isNaN(input.bodyFatPercent))) {
    errors.bodyFatPercent = 'Body fat percentage must be between 2% and 65%';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates Basal Metabolic Rate (BMR) across Mifflin-St Jeor, Revised Harris-Benedict,
 * and Katch-McArdle equations.
 */
export function calculateBMR(input: BMRInput): BMRResult {
  const isMetric = (input.unitSystem ?? 'metric') === 'metric';
  const gender = input.gender ?? 'male';
  const age = Math.max(15, Math.min(100, input.age ?? 25));

  let heightCm = 170;
  let weightKg = 70;

  if (isMetric) {
    heightCm = Math.max(50, input.heightCm ?? 170);
    weightKg = Math.max(20, input.weightKg ?? 70);
  } else {
    const feet = Math.max(0, input.heightFeet ?? 5);
    const inches = Math.max(0, input.heightInches ?? 7);
    heightCm = Math.max(50, (feet * 12 + inches) * 2.54);
    weightKg = Math.max(20, (input.weightLbs ?? 154) * 0.45359237);
  }

  // 1. Mifflin-St Jeor Equation
  let mifflin = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    mifflin += 5;
  } else {
    mifflin -= 161;
  }

  // 2. Revised Harris-Benedict Equation (1984)
  let harris = 0;
  if (gender === 'male') {
    harris = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  } else {
    harris = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
  }

  // 3. Katch-McArdle Equation
  let katch: number | null = null;
  let leanMass: number | null = null;
  if (input.bodyFatPercent !== undefined && input.bodyFatPercent > 0) {
    const bf = Math.max(2, Math.min(65, input.bodyFatPercent));
    leanMass = parseFloat((weightKg * (1 - bf / 100)).toFixed(1));
    katch = Math.round(370 + 21.6 * leanMass);
  }

  const formula = input.formula ?? 'mifflin_st_jeor';
  let primaryBMR = Math.round(mifflin);
  let formulaUsed = 'Mifflin-St Jeor (Recommended)';

  if (formula === 'harris_benedict') {
    primaryBMR = Math.round(harris);
    formulaUsed = 'Revised Harris-Benedict';
  } else if (formula === 'katch_mcardle' && katch !== null) {
    primaryBMR = katch;
    formulaUsed = 'Katch-McArdle (Lean Body Mass)';
  }

  return {
    mifflinStJeor: Math.round(mifflin),
    harrisBenedict: Math.round(harris),
    katchMcardle: katch,
    primaryBMR,
    hourlyRestingCalories: parseFloat((primaryBMR / 24).toFixed(1)),
    weightKg: parseFloat(weightKg.toFixed(1)),
    heightCm: parseFloat(heightCm.toFixed(1)),
    leanBodyMassKg: leanMass,
    formulaUsed,
  };
}
