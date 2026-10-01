import { calculateBodyFat, validateBodyFatInput } from '@/lib/calculators/body-fat';

describe('Body Fat Calculator Tests', () => {
  // Test Case 1: Standard Male (178 cm, 80 kg, Neck 39 cm, Waist 86 cm)
  // waist - neck = 47 cm. log10(47) = 1.6721. log10(178) = 2.2504.
  // denom = 1.0324 - 0.19077(1.6721) + 0.15456(2.2504) = 1.0324 - 0.3190 + 0.3478 = 1.0612.
  // 495 / 1.0612 - 450 = 466.45 - 450 = 16.45% -> ~16.5%
  // Category: Fitness (14 - 17%)
  test('Standard male fitness body fat test (178 cm, 80 kg, Neck 39, Waist 86)', () => {
    const res = calculateBodyFat({
      gender: 'male',
      age: 28,
      unitSystem: 'metric',
      heightCm: 178,
      weightKg: 80,
      neckCm: 39,
      waistCm: 86,
    });

    expect(res.bodyFatPercentage).toBeCloseTo(16.4, 1);
    expect(res.category).toBe('Fitness');
    expect(res.leanMassKg).toBeGreaterThan(60);
  });

  // Test Case 2: Female Body Fat Test (165 cm, 62 kg, Neck 33 cm, Waist 72 cm, Hip 96 cm)
  // waist + hip - neck = 72 + 96 - 33 = 135 cm.
  // Category should be Fitness / Average (21 - 25%)
  test('Standard female body fat test (165 cm, 62 kg, Neck 33, Waist 72, Hip 96)', () => {
    const res = calculateBodyFat({
      gender: 'female',
      age: 30,
      unitSystem: 'metric',
      heightCm: 165,
      weightKg: 62,
      neckCm: 33,
      waistCm: 72,
      hipCm: 96,
    });

    expect(res.bodyFatPercentage).toBeGreaterThan(20);
    expect(res.bodyFatPercentage).toBeLessThan(28);
    expect(res.category).toBeDefined();
  });

  // Test Case 3: Imperial System Conversion
  test('Imperial system input test', () => {
    const res = calculateBodyFat({
      gender: 'male',
      age: 32,
      unitSystem: 'imperial',
      heightFeet: 5,
      heightInches: 10,
      weightLbs: 175,
      neckInches: 15.5,
      waistInches: 34,
    });

    expect(res.bodyFatPercentage).toBeGreaterThan(10);
    expect(res.bodyFatPercentage).toBeLessThan(25);
  });

  // Test Case 4: Validation
  test('Validation catches missing measurements', () => {
    expect(validateBodyFatInput({ gender: 'female', age: 25, heightCm: 165, weightKg: 60, neckCm: 33, waistCm: 70 }).valid).toBe(false); // missing hip
    expect(validateBodyFatInput({ gender: 'female', age: 25, heightCm: 165, weightKg: 60, neckCm: 33, waistCm: 70, hipCm: 95 }).valid).toBe(true);
  });
});
