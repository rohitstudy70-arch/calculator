import { calculateBMI, validateBMIInput } from '@/lib/calculators/bmi';

describe('BMI Calculator Tests', () => {
  // Test Case 1: Standard Adult Male (175 cm, 70 kg)
  // BMI = 70 / (1.75^2) = 70 / 3.0625 = 22.857... -> 22.9
  // WHO: Normal (18.5 - 24.9)
  // Asian-Indian: Normal Weight (18.5 - 22.9)
  test('Standard metric normal weight adult (175 cm, 70 kg)', () => {
    const res = calculateBMI({
      unitSystem: 'metric',
      heightCm: 175,
      weightKg: 70,
    });

    expect(res.bmi).toBe(22.9);
    expect(res.whoCategory).toBe('Normal Weight');
    expect(res.asianCategory).toBe('Normal Weight (Low Risk)');
    expect(res.whoHealthyWeightMinKg).toBeCloseTo(56.7, 1);
    expect(res.whoHealthyWeightMaxKg).toBeCloseTo(76.3, 1);
    expect(res.asianHealthyWeightMaxKg).toBeCloseTo(70.1, 1);
  });

  // Test Case 2: Asian-Indian Overweight Discrepancy Case (170 cm, 69 kg)
  // BMI = 69 / (1.70^2) = 69 / 2.89 = 23.875... -> 23.9
  // WHO: Normal Weight (< 25.0)
  // Asian-Indian (ICMR): Overweight (Increased Risk) (23.0 - 24.9)
  test('Asian-Indian cutoff discrepancy test (170 cm, 69 kg)', () => {
    const res = calculateBMI({
      unitSystem: 'metric',
      heightCm: 170,
      weightKg: 69,
    });

    expect(res.bmi).toBe(23.9);
    expect(res.whoCategory).toBe('Normal Weight');
    expect(res.asianCategory).toBe('Overweight (Increased Risk)');
  });

  // Test Case 3: Imperial System Conversion (5 ft 10 in, 180 lbs)
  // Height: 70 inches = 1.778 m
  // Weight: 180 lbs = 81.6466 kg
  // BMI = 81.6466 / (1.778^2) = 25.8
  // WHO: Overweight
  // Asian-Indian: Obese (>= 25.0)
  test('Imperial units test (5 ft 10 in, 180 lbs)', () => {
    const res = calculateBMI({
      unitSystem: 'imperial',
      heightFeet: 5,
      heightInches: 10,
      weightLbs: 180,
    });

    expect(res.bmi).toBe(25.8);
    expect(res.whoCategory).toBe('Overweight (Pre-obese)');
    expect(res.asianCategory).toBe('Obese (High Risk)');
  });

  // Test Case 4: Underweight Case (160 cm, 42 kg)
  // BMI = 42 / 2.56 = 16.4
  // WHO: Underweight (Moderate Thinness)
  test('Underweight thinness classification (160 cm, 42 kg)', () => {
    const res = calculateBMI({
      unitSystem: 'metric',
      heightCm: 160,
      weightKg: 42,
    });

    expect(res.bmi).toBe(16.4);
    expect(res.whoCategory).toBe('Underweight (Moderate Thinness)');
    expect(res.asianCategory).toBe('Underweight');
  });

  // Test Case 5: Input Validation Edge Cases
  test('Validation catches invalid and negative values', () => {
    expect(validateBMIInput({ unitSystem: 'metric', heightCm: 30, weightKg: 70 }).valid).toBe(false);
    expect(validateBMIInput({ unitSystem: 'metric', heightCm: 175, weightKg: 0 }).valid).toBe(false);
    expect(validateBMIInput({ unitSystem: 'metric', heightCm: 175, weightKg: 70 }).valid).toBe(true);
  });
});
