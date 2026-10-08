import {
  performBasicOperation,
  calculateBasicPercentage,
  formatBasicNumber,
} from '@/lib/calculators/basic-calculator';

describe('Basic / Normal Calculator Tests', () => {
  test('Standard addition, subtraction, multiplication, and division', () => {
    expect(performBasicOperation('+', 125, 75).value).toBe(200);
    expect(performBasicOperation('-', 200, 85).value).toBe(115);
    expect(performBasicOperation('×', 25, 4).value).toBe(100);
    expect(performBasicOperation('÷', 150, 3).value).toBe(50);
  });

  test('Division by zero handling', () => {
    const res = performBasicOperation('÷', 100, 0);
    expect(res.isValid).toBe(false);
    expect(res.error).toBe('Cannot divide by zero');
  });

  test('Floating point precision (0.1 + 0.2)', () => {
    const res = performBasicOperation('+', 0.1, 0.2);
    expect(res.value).toBe(0.3);
  });

  test('Percentage calculation', () => {
    expect(calculateBasicPercentage(25)).toBe(0.25);
    expect(calculateBasicPercentage(10, 500)).toBe(50);
  });

  test('Number formatting with commas', () => {
    expect(formatBasicNumber(100000)).toBe('1,00,000');
    expect(formatBasicNumber(1234.56)).toBe('1,234.56');
    expect(formatBasicNumber(NaN)).toBe('Error');
  });
});
