import {
  calculateTDEE,
  validateTDEEInput,
  ACTIVITY_MULTIPLIERS,
} from '@/lib/calculators/tdee';

describe('TDEE Calculator Tests', () => {
  test('Standard male TDEE calculation (25y, 175cm, 70kg, moderate activity)', () => {
    // Male BMR = 10*70 + 6.25*175 - 5*25 + 5 = 700 + 1093.75 - 125 + 5 = 1673.75 => 1674
    // Moderate activity (1.55) => 1673.75 * 1.55 = 2594
    const res = calculateTDEE({
      gender: 'male',
      age: 25,
      heightCm: 175,
      weightKg: 70,
      activityLevel: 'moderate',
    });

    expect(res.bmr).toBe(1674);
    expect(res.tdee).toBe(2594);
    expect(res.calorieGoals.weightLoss).toBe(2094); // 2594 - 500
    expect(res.calorieGoals.muscleGain).toBe(3094); // 2594 + 500
    expect(res.bmi).toBe(22.9);
    expect(res.bmiCategory).toBe('Normal Weight');
  });

  test('Standard female TDEE calculation (30y, 160cm, 55kg, sedentary)', () => {
    // Female BMR = 10*55 + 6.25*160 - 5*30 - 161 = 550 + 1000 - 150 - 161 = 1239
    // Sedentary (1.2) => 1239 * 1.2 = 1487
    const res = calculateTDEE({
      gender: 'female',
      age: 30,
      heightCm: 160,
      weightKg: 55,
      activityLevel: 'sedentary',
    });

    expect(res.bmr).toBe(1239);
    expect(res.tdee).toBe(1487);
    expect(res.calorieGoals.weightLoss).toBe(1200); // capped at safe floor 1200
  });

  test('Katch-McArdle formula with body fat percentage', () => {
    const res = calculateTDEE({
      gender: 'male',
      age: 28,
      heightCm: 180,
      weightKg: 80,
      activityLevel: 'light',
      bodyFatPercent: 15,
    });

    // LBM = 80 * 0.85 = 68 kg => BMR = 370 + 21.6 * 68 = 1838.8 => 1839
    expect(res.bmr).toBe(1839);
    expect(res.tdee).toBe(Math.round(1838.8 * 1.375));
  });

  test('Input validation checks', () => {
    expect(validateTDEEInput({ gender: 'male', age: 10, heightCm: 170, weightKg: 65, activityLevel: 'moderate' }).valid).toBe(false);
    expect(validateTDEEInput({ gender: 'male', age: 25, heightCm: 80, weightKg: 65, activityLevel: 'moderate' }).valid).toBe(false);
    expect(validateTDEEInput({ gender: 'female', age: 25, heightCm: 165, weightKg: 20, activityLevel: 'moderate' }).valid).toBe(false);
    expect(validateTDEEInput({ gender: 'male', age: 25, heightCm: 175, weightKg: 70, activityLevel: 'moderate' }).valid).toBe(true);
  });
});
