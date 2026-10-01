import { calculatePercentage, validatePercentageInput } from '@/lib/calculators/percentage';

describe('Percentage Calculator Tests', () => {
  // Test Case 1: What is X% of Y? (What is 18% of 5000?) -> 900
  test('Mode 1: What is X% of Y (18% of 5000 = 900)', () => {
    const res = calculatePercentage({
      mode: 'percent_of',
      val1: 18,
      val2: 5000,
    });

    expect(res.resultValue).toBe(900);
    expect(res.steps.length).toBe(2);
  });

  // Test Case 2: X is what % of Y? (75 is what % of 300?) -> 25%
  test('Mode 2: X is what % of Y (75 is what % of 300 = 25%)', () => {
    const res = calculatePercentage({
      mode: 'is_what_percent',
      val1: 75,
      val2: 300,
    });

    expect(res.resultValue).toBe(25);
    expect(res.formattedResult).toContain('25%');
  });

  // Test Case 3: Percentage change from X to Y (From 400 to 500 = +25% increase)
  test('Mode 3: Percentage increase from 400 to 500 (+25%)', () => {
    const res = calculatePercentage({
      mode: 'percent_change',
      val1: 400,
      val2: 500,
    });

    expect(res.resultValue).toBe(25);
    expect(res.formattedResult).toContain('Increase');
  });

  // Test Case 4: Percentage decrease from X to Y (From 500 to 375 = -25% decrease)
  test('Mode 3: Percentage decrease from 500 to 375 (-25%)', () => {
    const res = calculatePercentage({
      mode: 'percent_change',
      val1: 500,
      val2: 375,
    });

    expect(res.resultValue).toBe(-25);
    expect(res.formattedResult).toContain('Decrease');
  });

  // Test Case 5: Increase/Decrease X by Y% (Increase 1000 by 15% = 1150)
  test('Mode 4: Increase 1000 by 15% (= 1150)', () => {
    const res = calculatePercentage({
      mode: 'increase_decrease',
      val1: 1000,
      val2: 15,
      changeType: 'increase',
    });

    expect(res.resultValue).toBe(1150);
  });

  // Test Case 6: Decrease 2000 by 20% (= 1600)
  test('Mode 4: Decrease 2000 by 20% (= 1600)', () => {
    const res = calculatePercentage({
      mode: 'increase_decrease',
      val1: 2000,
      val2: 20,
      changeType: 'decrease',
    });

    expect(res.resultValue).toBe(1600);
  });

  // Test Case 7: Validation
  test('Validation catches division by zero', () => {
    expect(validatePercentageInput({ mode: 'is_what_percent', val1: 50, val2: 0 }).valid).toBe(false);
    expect(validatePercentageInput({ mode: 'percent_change', val1: 0, val2: 100 }).valid).toBe(false);
    expect(validatePercentageInput({ mode: 'percent_of', val1: 15, val2: 200 }).valid).toBe(true);
  });
});
