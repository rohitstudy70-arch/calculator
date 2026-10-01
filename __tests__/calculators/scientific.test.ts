import { calculateScientific, factorial } from '@/lib/calculators/scientific';

describe('Scientific Calculator Tests (Safe AST Parser)', () => {
  // Test Case 1: Standard operator precedence (BODMAS / PEMDAS)
  // 3 + 4 * 2 / (1 - 5)^2 ^ 3 = 3 + 8 / (-4)^6 = 3 + 8 / 4096 = 3 + 0.001953125 = 3.001953125
  // Simpler: 10 + 5 * 2^3 - (4 / 2) = 10 + 5*8 - 2 = 10 + 40 - 2 = 48
  test('Standard operator precedence & parentheses: 10 + 5 * 2^3 - (4 / 2) = 48', () => {
    const res = calculateScientific({
      expression: '10 + 5 * 2^3 - (4 / 2)',
    });

    expect(res.isValid).toBe(true);
    expect(res.result).toBe(48);
  });

  // Test Case 2: Trigonometry in Degrees & Radians
  // sin(30) in Deg = 0.5; cos(60) in Deg = 0.5; tan(45) in Deg = 1
  test('Trigonometry in Degrees: sin(30) + cos(60) + tan(45) = 2', () => {
    const res = calculateScientific({
      expression: 'sin(30) + cos(60) + tan(45)',
      angleUnit: 'deg',
    });

    expect(res.isValid).toBe(true);
    expect(res.result).toBeCloseTo(2, 5);
  });

  // Test Case 3: Factorial and Mathematical Constants
  // 5! + 3! = 120 + 6 = 126
  test('Factorials and constants: 5! + 3! = 126', () => {
    const res = calculateScientific({
      expression: '5! + 3!',
    });

    expect(res.isValid).toBe(true);
    expect(res.result).toBe(126);
  });

  // Test Case 4: Logarithms, Square Roots, and Constants (pi, e)
  // log(1000) + sqrt(144) + ln(e) = 3 + 12 + 1 = 16
  test('Logarithms, square roots, and natural log: log(1000) + sqrt(144) + ln(e) = 16', () => {
    const res = calculateScientific({
      expression: 'log(1000) + sqrt(144) + ln(e)',
    });

    expect(res.isValid).toBe(true);
    expect(res.result).toBeCloseTo(16, 5);
  });

  // Test Case 5: Unary minus and negative numbers
  // -5 * (-2 + 6) = -5 * 4 = -20
  test('Unary minus and negative calculations: -5 * (-2 + 6) = -20', () => {
    const res = calculateScientific({
      expression: '-5 * (-2 + 6)',
    });

    expect(res.isValid).toBe(true);
    expect(res.result).toBe(-20);
  });

  // Test Case 6: Factorial helper unit test
  test('Factorial helper edge cases', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(factorial(6)).toBe(720);
  });

  // Test Case 7: Syntax Error & Security (No eval, safe rejection)
  test('Safe syntax error handling (rejection of malicious/arbitrary scripts)', () => {
    const res = calculateScientific({
      expression: 'alert("xss")',
    });

    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBeDefined();
  });
});
