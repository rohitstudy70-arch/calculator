import { Gender, UnitSystem } from './bmi';

export interface BodyFatInput {
  gender: Gender;
  age: number;
  unitSystem?: UnitSystem;
  heightCm?: number;
  heightFeet?: number;
  heightInches?: number;
  weightKg?: number;
  weightLbs?: number;
  neckCm?: number;
  neckInches?: number;
  waistCm?: number;
  waistInches?: number;
  hipCm?: number; // Required for women
  hipInches?: number;
}

export type BodyFatCategory =
  | 'Essential Fat'
  | 'Athletes'
  | 'Fitness'
  | 'Average'
  | 'Obese';

export interface BodyFatResult {
  bodyFatPercentage: number;
  category: BodyFatCategory;
  fatMassKg: number;
  leanMassKg: number;
  weightKg: number;
  idealBodyFatMin: number;
  idealBodyFatMax: number;
  fatToLoseForIdealKg: number;
  method: string;
}

export function validateBodyFatInput(input: BodyFatInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const isMetric = (input.unitSystem ?? 'metric') === 'metric';
  const isFemale = input.gender === 'female';

  if (!input.age || input.age < 15 || input.age > 100 || isNaN(input.age)) {
    errors.age = 'Age must be between 15 and 100 years';
  }

  if (isMetric) {
    if (!input.heightCm || input.heightCm < 80 || input.heightCm > 250) errors.heightCm = 'Height must be 80–250 cm';
    if (!input.weightKg || input.weightKg < 25 || input.weightKg > 300) errors.weightKg = 'Weight must be 25–300 kg';
    if (!input.neckCm || input.neckCm < 20 || input.neckCm > 80) errors.neckCm = 'Neck circumference must be 20–80 cm';
    if (!input.waistCm || input.waistCm < 40 || input.waistCm > 200) errors.waistCm = 'Waist circumference must be 40–200 cm';
    if (isFemale && (!input.hipCm || input.hipCm < 50 || input.hipCm > 220)) errors.hipCm = 'Hip circumference must be 50–220 cm';
  } else {
    const totalInches = (input.heightFeet ?? 0) * 12 + (input.heightInches ?? 0);
    if (totalInches < 30 || totalInches > 100) errors.height = 'Height must be between 2 ft 6 in and 8 ft 4 in';
    if (!input.weightLbs || input.weightLbs < 55 || input.weightLbs > 660) errors.weightLbs = 'Weight must be 55–660 lbs';
    if (!input.neckInches || input.neckInches < 8 || input.neckInches > 32) errors.neck = 'Neck circumference must be 8–32 in';
    if (!input.waistInches || input.waistInches < 15 || input.waistInches > 80) errors.waist = 'Waist circumference must be 15–80 in';
    if (isFemale && (!input.hipInches || input.hipInches < 20 || input.hipInches > 90)) errors.hip = 'Hip circumference must be 20–90 in';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates Body Fat Percentage using the official US Navy Circumference Method.
 */
export function calculateBodyFat(input: BodyFatInput): BodyFatResult {
  const isMetric = (input.unitSystem ?? 'metric') === 'metric';
  const gender = input.gender ?? 'male';

  let heightCm = 175;
  let weightKg = 75;
  let neckCm = 38;
  let waistCm = 85;
  let hipCm = 95;

  if (isMetric) {
    heightCm = Math.max(50, input.heightCm ?? 175);
    weightKg = Math.max(25, input.weightKg ?? 75);
    neckCm = Math.max(15, input.neckCm ?? 38);
    waistCm = Math.max(30, input.waistCm ?? 85);
    hipCm = Math.max(30, input.hipCm ?? 95);
  } else {
    const feet = Math.max(0, input.heightFeet ?? 5);
    const inches = Math.max(0, input.heightInches ?? 9);
    heightCm = (feet * 12 + inches) * 2.54;
    weightKg = (input.weightLbs ?? 165) * 0.45359237;
    neckCm = (input.neckInches ?? 15) * 2.54;
    waistCm = (input.waistInches ?? 33.5) * 2.54;
    hipCm = (input.hipInches ?? 37.5) * 2.54;
  }

  let bodyFat = 0;

  if (gender === 'male') {
    const waistMinusNeck = Math.max(1, waistCm - neckCm);
    bodyFat =
      495 / (1.0324 - 0.19077 * Math.log10(waistMinusNeck) + 0.15456 * Math.log10(heightCm)) -
      450;
  } else {
    const waistPlusHipMinusNeck = Math.max(1, waistCm + hipCm - neckCm);
    bodyFat =
      495 / (1.29579 - 0.35004 * Math.log10(waistPlusHipMinusNeck) + 0.221 * Math.log10(heightCm)) -
      450;
  }

  // Bounds clamp
  bodyFat = Math.max(2, Math.min(65, bodyFat));
  const roundedBF = parseFloat(bodyFat.toFixed(1));

  const fatMass = parseFloat((weightKg * (roundedBF / 100)).toFixed(1));
  const leanMass = parseFloat((weightKg - fatMass).toFixed(1));

  // Category based on American Council on Exercise (ACE)
  let category: BodyFatCategory = 'Fitness';
  let idealMin = 10;
  let idealMax = 20;

  if (gender === 'male') {
    idealMin = 10;
    idealMax = 20;
    if (roundedBF < 6) category = 'Essential Fat';
    else if (roundedBF <= 13) category = 'Athletes';
    else if (roundedBF <= 17) category = 'Fitness';
    else if (roundedBF <= 24) category = 'Average';
    else category = 'Obese';
  } else {
    idealMin = 18;
    idealMax = 28;
    if (roundedBF < 14) category = 'Essential Fat';
    else if (roundedBF <= 20) category = 'Athletes';
    else if (roundedBF <= 24) category = 'Fitness';
    else if (roundedBF <= 31) category = 'Average';
    else category = 'Obese';
  }

  // Fat to lose for ideal maximum boundary
  const targetFatKg = roundedBF > idealMax ? (weightKg * (roundedBF - idealMax)) / 100 : 0;

  return {
    bodyFatPercentage: roundedBF,
    category,
    fatMassKg: fatMass,
    leanMassKg: leanMass,
    weightKg: parseFloat(weightKg.toFixed(1)),
    idealBodyFatMin: idealMin,
    idealBodyFatMax: idealMax,
    fatToLoseForIdealKg: parseFloat(targetFatKg.toFixed(1)),
    method: 'US Navy Circumference Equation (Hodgdon & Beckett)',
  };
}
