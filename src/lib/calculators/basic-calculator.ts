/**
 * Basic / Normal Calculator Engine
 * Handles standard decimal arithmetic, order of precedence, percentages, sign change, and memory registers.
 */

export interface BasicCalculatorState {
  displayValue: string;
  previousValue: string | null;
  operation: string | null;
  waitingForOperand: boolean;
  memory: number;
}

export interface BasicCalculationResult {
  value: number;
  formatted: string;
  isValid: boolean;
  error?: string;
}

export function formatBasicNumber(num: number): string {
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return num > 0 ? 'Infinity' : '-Infinity';

  // Prevent floating point artifacts like 0.1 + 0.2 = 0.30000000000000004
  const rounded = parseFloat(num.toPrecision(12));

  // If very large or very small, use scientific notation
  if (Math.abs(rounded) >= 1e12 || (Math.abs(rounded) > 0 && Math.abs(rounded) < 1e-6)) {
    return rounded.toExponential(6);
  }

  // Format with locale commas for readability
  const parts = rounded.toString().split('.');
  const integerPart = parseInt(parts[0], 10).toLocaleString('en-IN');
  return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
}

export function performBasicOperation(
  op: string,
  prev: number,
  current: number
): BasicCalculationResult {
  let res = 0;
  switch (op) {
    case '+':
      res = prev + current;
      break;
    case '-':
      res = prev - current;
      break;
    case '×':
    case '*':
      res = prev * current;
      break;
    case '÷':
    case '/':
      if (current === 0) {
        return { value: 0, formatted: 'Cannot divide by zero', isValid: false, error: 'Cannot divide by zero' };
      }
      res = prev / current;
      break;
    default:
      res = current;
  }

  const rounded = parseFloat(res.toPrecision(12));
  return {
    value: rounded,
    formatted: formatBasicNumber(rounded),
    isValid: true,
  };
}

export function calculateBasicPercentage(current: number, base?: number): number {
  if (base !== undefined && base !== null) {
    // Relative percentage (e.g. 200 + 10% = 200 + 20)
    return (base * current) / 100;
  }
  // Standalone percentage (e.g. 50% = 0.5)
  return current / 100;
}
