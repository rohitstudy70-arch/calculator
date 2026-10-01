import { calculateBMR, validateBMRInput } from '@/lib/calculators/bmr';

describe('BMR Calculator Tests', () => {
  // Test Case 1: Standard 30-year-old Male (175 cm, 70 kg)
  // Mifflin-St Jeor: 10(70) + 6.25(175) - 5(30) + 5 = 700 + 1093.75 - 150 + 5 = 1648.75 -> 1649 kcal
  // Harris-Benedict: 88.362 + 13.397(70) + 4.799(175) - 5.677(30) = 88.362 + 937.79 + 839.825 - 170.31 = 1695.667 -> 1696 kcal
  test('Male 30y, 175cm, 70kg Mifflin & Harris calculation', () => {
    const res = calculateBMR({
      gender: 'male',
      age: 30,
      unitSystem: 'metric',
      heightCm: 175,
      weightKg: 70,
    });

    expect(res.mifflinStJeor).toBe(1649);
    expect(res.harrisBenedict).toBe(1696);
    expect(res.primaryBMR).toBe(1649);
    expect(res.hourlyRestingCalories).toBeCloseTo(68.7, 1);
  });

  // Test Case 2: 28-year-old Female (162 cm, 55 kg)
  // Mifflin-St Jeor: 10(55) + 6.25(162) - 5(28) - 161 = 550 + 1012.5 - 140 - 161 = 1261.5 -> 1262 kcal
  // Harris-Benedict: 447.593 + 9.247(55) + 3.098(162) - 4.330(28) = 447.593 + 508.585 + 501.876 - 121.24 = 1336.814 -> 1337 kcal
  test('Female 28y, 162cm, 55kg Mifflin & Harris calculation', () => {
    const res = calculateBMR({
      gender: 'female',
      age: 28,
      unitSystem: 'metric',
      heightCm: 162,
      weightKg: 55,
    });

    expect(res.mifflinStJeor).toBe(1262);
    expect(res.harrisBenedict).toBe(1337);
  });

  // Test Case 3: Katch-McArdle Formula with Body Fat % (Male 80 kg, 15% Body Fat)
  // LBM = 80 * (1 - 0.15) = 68 kg
  // Katch-McArdle = 370 + 21.6 * 68 = 370 + 1468.8 = 1838.8 -> 1839 kcal
  test('Katch-McArdle formula with 15% body fat', () => {
    const res = calculateBMR({
      gender: 'male',
      age: 25,
      unitSystem: 'metric',
      heightCm: 180,
      weightKg: 80,
      bodyFatPercent: 15,
      formula: 'katch_mcardle',
    });

    expect(res.leanBodyMassKg).toBe(68);
    expect(res.katchMcardle).toBe(1839);
    expect(res.primaryBMR).toBe(1839);
  });

  // Test Case 4: Imperial Inputs (Female 5 ft 4 in, 130 lbs, 35 yrs)
  test('Imperial units conversion and BMR calculation', () => {
    const res = calculateBMR({
      gender: 'female',
      age: 35,
      unitSystem: 'imperial',
      heightFeet: 5,
      heightInches: 4,
      weightLbs: 130,
    });

    expect(res.mifflinStJeor).toBeGreaterThan(1200);
    expect(res.mifflinStJeor).toBeLessThan(1400);
  });

  // Test Case 5: Validation
  test('Validation catches invalid ages and measurements', () => {
    expect(validateBMRInput({ gender: 'male', age: 10, heightCm: 170, weightKg: 70 }).valid).toBe(false);
    expect(validateBMRInput({ gender: 'male', age: 25, heightCm: 170, weightKg: 10 }).valid).toBe(false);
    expect(validateBMRInput({ gender: 'male', age: 25, heightCm: 170, weightKg: 70 }).valid).toBe(true);
  });
});
