import { calculateFraction, validateFractionInput, gcd, lcm } from '@/lib/calculators/fraction';

describe('Fraction Calculator Tests', () => {
  // Test Case 1: Addition of fractions with unlike denominators
  // 1/2 + 2/3 = 3/6 + 4/6 = 7/6 = 1 1/6 (decimal ~1.166667)
  test('Add unlike fractions: 1/2 + 2/3 = 7/6 (1 1/6)', () => {
    const res = calculateFraction({
      op: 'add',
      num1: 1,
      den1: 2,
      num2: 2,
      den2: 3,
    });

    expect(res.numerator).toBe(7);
    expect(res.denominator).toBe(6);
    expect(res.formattedMixed).toBe('1 1/6');
    expect(res.decimalValue).toBeCloseTo(1.166667, 4);
    expect(res.steps.length).toBeGreaterThan(2);
  });

  // Test Case 2: Mixed number subtraction
  // 2 3/4 - 1 1/2 = 11/4 - 6/4 = 5/4 = 1 1/4 (1.25)
  test('Subtract mixed numbers: 2 3/4 - 1 1/2 = 5/4 (1 1/4)', () => {
    const res = calculateFraction({
      op: 'subtract',
      whole1: 2,
      num1: 3,
      den1: 4,
      whole2: 1,
      num2: 1,
      den2: 2,
    });

    expect(res.numerator).toBe(5);
    expect(res.denominator).toBe(4);
    expect(res.formattedMixed).toBe('1 1/4');
    expect(res.decimalValue).toBe(1.25);
  });

  // Test Case 3: Multiplication & Simplification with GCD
  // 3/8 * 4/9 = 12/72 = 1/6
  test('Multiply fractions with GCD reduction: 3/8 * 4/9 = 1/6', () => {
    const res = calculateFraction({
      op: 'multiply',
      num1: 3,
      den1: 8,
      num2: 4,
      den2: 9,
    });

    expect(res.numerator).toBe(1);
    expect(res.denominator).toBe(6);
    expect(res.gcdValue).toBe(12);
  });

  // Test Case 4: Division of fractions
  // (3/4) / (2/5) = (3/4) * (5/2) = 15/8 = 1 7/8 (1.875)
  test('Divide fractions: (3/4) / (2/5) = 15/8 (1 7/8)', () => {
    const res = calculateFraction({
      op: 'divide',
      num1: 3,
      den1: 4,
      num2: 2,
      den2: 5,
    });

    expect(res.numerator).toBe(15);
    expect(res.denominator).toBe(8);
    expect(res.formattedMixed).toBe('1 7/8');
    expect(res.decimalValue).toBe(1.875);
  });

  // Test Case 5: GCD and LCM helper functions
  test('GCD and LCM helper functions', () => {
    expect(gcd(12, 18)).toBe(6);
    expect(lcm(4, 6)).toBe(12);
  });

  // Test Case 6: Validation
  test('Validation catches zero denominator and division by zero', () => {
    expect(validateFractionInput({ op: 'add', num1: 1, den1: 0, num2: 1, den2: 2 }).valid).toBe(false);
    expect(validateFractionInput({ op: 'divide', num1: 1, den1: 2, num2: 0, den2: 3 }).valid).toBe(false);
  });
});
