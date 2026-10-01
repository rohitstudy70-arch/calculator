import { calculateCalories, validateCalorieInput } from '@/lib/calculators/calorie';

describe('Calorie & TDEE Calculator Tests', () => {
  // Test Case 1: Moderately Active Male (BMR 1649 kcal, Activity 1.55)
  // TDEE = 1649 * 1.55 = 2555.95 -> 2556 kcal/day
  // Weight Loss (-500 kcal): 2056 kcal/day
  // Weight Gain (+500 kcal): 3056 kcal/day
  test('Moderately active male 30y, 175cm, 70kg calorie targets', () => {
    const res = calculateCalories({
      gender: 'male',
      age: 30,
      unitSystem: 'metric',
      heightCm: 175,
      weightKg: 70,
      activityLevel: 'moderately_active',
    });

    expect(res.bmr).toBe(1649);
    expect(res.tdee).toBe(2556);
    expect(res.targets.maintenance.dailyCalories).toBe(2556);
    expect(res.targets.weightLoss.dailyCalories).toBe(2056);
    expect(res.targets.weightGain.dailyCalories).toBe(3056);
    expect(res.targets.extremeWeightLoss.isSafeThresholdWarning).toBe(false);
  });

  // Test Case 2: Sedentary Female Safe Floor Clamp Test
  // Female 45y, 155cm, 50kg, Sedentary (1.2)
  // BMR = 10(50) + 6.25(155) - 5(45) - 161 = 500 + 968.75 - 225 - 161 = 1082.75 -> 1083 kcal
  // TDEE = 1083 * 1.2 = 1299.6 -> 1300 kcal
  // Deficit of -500 would be 800 kcal, but safe floor for females is 1200 kcal!
  test('Sedentary petite female safe calorie floor clamping (1200 kcal floor)', () => {
    const res = calculateCalories({
      gender: 'female',
      age: 45,
      unitSystem: 'metric',
      heightCm: 155,
      weightKg: 50,
      activityLevel: 'sedentary',
    });

    expect(res.tdee).toBe(1300);
    // Weight loss target should be clamped to safe threshold 1200 kcal
    expect(res.targets.weightLoss.dailyCalories).toBe(1200);
    expect(res.targets.weightLoss.isSafeThresholdWarning).toBe(true);
    expect(res.targets.extremeWeightLoss.dailyCalories).toBe(1200);
  });

  // Test Case 3: Macronutrient gram calculations (2000 kcal target)
  // Balanced: 50% Carb (1000 kcal / 4 = 250g), 20% Protein (400 kcal / 4 = 100g), 30% Fat (600 kcal / 9 = 67g)
  test('Macro split gram calculations for 2000 kcal', () => {
    const res = calculateCalories({
      gender: 'male',
      age: 25,
      unitSystem: 'metric',
      heightCm: 180,
      weightKg: 75,
      activityLevel: 'lightly_active',
    });

    const maint = res.targets.maintenance;
    const balanced = maint.macros.balanced;
    expect(balanced.carbsGrams).toBeGreaterThan(0);
    expect(balanced.proteinGrams).toBeGreaterThan(0);
    expect(balanced.fatGrams).toBeGreaterThan(0);
  });

  // Test Case 4: Validation
  test('Validation catches invalid ages and inputs', () => {
    expect(validateCalorieInput({ gender: 'male', age: 10, activityLevel: 'sedentary', heightCm: 170, weightKg: 70 }).valid).toBe(false);
    expect(validateCalorieInput({ gender: 'male', age: 25, activityLevel: 'sedentary', heightCm: 170, weightKg: 70 }).valid).toBe(true);
  });
});
