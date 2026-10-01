import { HEALTH_CONFIG } from '@/config/health';

export type UnitSystem = 'metric' | 'imperial';
export type Gender = 'male' | 'female';

export interface BMIInput {
  unitSystem?: UnitSystem; // default 'metric'
  heightCm?: number; // Height in cm (metric)
  heightFeet?: number; // Feet (imperial)
  heightInches?: number; // Inches (imperial)
  weightKg?: number; // Weight in kg (metric)
  weightLbs?: number; // Weight in lbs (imperial)
  age?: number; // Age in years (optional for adults, used for advisory context)
  gender?: Gender; // Optional
}

export type WHOCategory =
  | 'Underweight (Severe Thinness)'
  | 'Underweight (Moderate Thinness)'
  | 'Underweight (Mild Thinness)'
  | 'Normal Weight'
  | 'Overweight (Pre-obese)'
  | 'Obese Class I'
  | 'Obese Class II'
  | 'Obese Class III';

export type AsianCategory =
  | 'Underweight'
  | 'Normal Weight (Low Risk)'
  | 'Overweight (Increased Risk)'
  | 'Obese (High Risk)';

export interface BMIResult {
  bmi: number;
  heightMeters: number;
  weightKg: number;
  whoCategory: WHOCategory;
  asianCategory: AsianCategory;
  whoHealthyWeightMinKg: number;
  whoHealthyWeightMaxKg: number;
  asianHealthyWeightMinKg: number;
  asianHealthyWeightMaxKg: number;
  weightDifferenceKg: number; // Difference from normal range midpoint (positive = above, negative = below)
  ponderalIndex: number; // kg/m^3
  primeIndex: number; // BMI / 25
}

export function validateBMIInput(input: BMIInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const isMetric = (input.unitSystem ?? 'metric') === 'metric';

  if (isMetric) {
    if (!input.heightCm || input.heightCm < 50 || input.heightCm > 280 || isNaN(input.heightCm)) {
      errors.heightCm = 'Height must be between 50 cm and 280 cm';
    }
    if (!input.weightKg || input.weightKg < 10 || input.weightKg > 500 || isNaN(input.weightKg)) {
      errors.weightKg = 'Weight must be between 10 kg and 500 kg';
    }
  } else {
    const totalInches = (input.heightFeet ?? 0) * 12 + (input.heightInches ?? 0);
    if (totalInches < 20 || totalInches > 110) {
      errors.height = 'Height must be between 1 ft 8 in and 9 ft 2 in';
    }
    if (!input.weightLbs || input.weightLbs < 22 || input.weightLbs > 1100 || isNaN(input.weightLbs)) {
      errors.weightLbs = 'Weight must be between 22 lbs and 1100 lbs';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates Body Mass Index (BMI), healthy weight ranges, and classifications
 * under both International WHO cutoffs and Asian-Indian (ICMR) consensus cutoffs.
 */
export function calculateBMI(input: BMIInput): BMIResult {
  const isMetric = (input.unitSystem ?? 'metric') === 'metric';

  let heightMeters = 1.7; // default 170cm
  let weightKg = 70; // default 70kg

  if (isMetric) {
    heightMeters = Math.max(0.5, (input.heightCm ?? 170) / 100);
    weightKg = Math.max(10, input.weightKg ?? 70);
  } else {
    const feet = Math.max(0, input.heightFeet ?? 5);
    const inches = Math.max(0, input.heightInches ?? 7);
    const totalInches = feet * 12 + inches;
    heightMeters = Math.max(0.5, totalInches * 0.0254);
    weightKg = Math.max(10, (input.weightLbs ?? 154) * 0.45359237);
  }

  const bmiRaw = weightKg / (heightMeters * heightMeters);
  const bmi = parseFloat(bmiRaw.toFixed(1));

  // WHO Category
  let whoCategory: WHOCategory = 'Normal Weight';
  if (bmi < 16.0) whoCategory = 'Underweight (Severe Thinness)';
  else if (bmi < 17.0) whoCategory = 'Underweight (Moderate Thinness)';
  else if (bmi < 18.5) whoCategory = 'Underweight (Mild Thinness)';
  else if (bmi <= 24.9) whoCategory = 'Normal Weight';
  else if (bmi <= 29.9) whoCategory = 'Overweight (Pre-obese)';
  else if (bmi <= 34.9) whoCategory = 'Obese Class I';
  else if (bmi <= 39.9) whoCategory = 'Obese Class II';
  else whoCategory = 'Obese Class III';

  // Asian-Indian (ICMR / WHO Asia-Pacific) Category
  let asianCategory: AsianCategory = 'Normal Weight (Low Risk)';
  if (bmi < 18.5) asianCategory = 'Underweight';
  else if (bmi <= 22.9) asianCategory = 'Normal Weight (Low Risk)';
  else if (bmi <= 24.9) asianCategory = 'Overweight (Increased Risk)';
  else asianCategory = 'Obese (High Risk)';

  // Healthy weight boundaries
  const h2 = heightMeters * heightMeters;
  const whoMin = parseFloat((18.5 * h2).toFixed(1));
  const whoMax = parseFloat((24.9 * h2).toFixed(1));
  const asianMin = parseFloat((18.5 * h2).toFixed(1));
  const asianMax = parseFloat((22.9 * h2).toFixed(1));

  // Weight difference from normal midpoint
  const midHealthy = (whoMin + whoMax) / 2;
  const weightDiff = parseFloat((weightKg - midHealthy).toFixed(1));

  // Ponderal Index (kg/m^3)
  const ponderalIndex = parseFloat((weightKg / Math.pow(heightMeters, 3)).toFixed(2));

  // BMI Prime (Ratio of actual BMI to upper normal limit 25)
  const primeIndex = parseFloat((bmi / 25).toFixed(2));

  return {
    bmi,
    heightMeters: parseFloat(heightMeters.toFixed(2)),
    weightKg: parseFloat(weightKg.toFixed(1)),
    whoCategory,
    asianCategory,
    whoHealthyWeightMinKg: whoMin,
    whoHealthyWeightMaxKg: whoMax,
    asianHealthyWeightMinKg: asianMin,
    asianHealthyWeightMaxKg: asianMax,
    weightDifferenceKg: weightDiff,
    ponderalIndex,
    primeIndex,
  };
}
