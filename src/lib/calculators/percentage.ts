export type PercentageMode =
  | 'percent_of' // What is X% of Y?
  | 'is_what_percent' // X is what % of Y?
  | 'percent_change' // Percentage change from X to Y
  | 'increase_decrease'; // Increase/Decrease X by Y%

export interface PercentageInput {
  mode: PercentageMode;
  val1: number; // X
  val2: number; // Y
  changeType?: 'increase' | 'decrease'; // For mode 4
}

export interface PercentageResult {
  mode: PercentageMode;
  resultValue: number;
  formattedResult: string;
  formulaUsed: string;
  steps: string[];
  secondaryInfo?: string;
  percentValue?: number;
  initialValue?: number;
  finalValue?: number;
  difference?: number;
}

export function validatePercentageInput(input: PercentageInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (isNaN(input.val1)) {
    errors.val1 = 'Please enter a valid number';
  }
  if (isNaN(input.val2)) {
    errors.val2 = 'Please enter a valid number';
  }

  if (input.mode === 'is_what_percent' && input.val2 === 0) {
    errors.val2 = 'Denominator (Y) cannot be zero';
  }

  if (input.mode === 'percent_change' && input.val1 === 0) {
    errors.val1 = 'Original value (from X) cannot be zero for percentage change';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Pure calculation logic for all 4 percentage calculator modes.
 */
export function calculatePercentage(input: PercentageInput): PercentageResult {
  const x = input.val1;
  const y = input.val2;

  switch (input.mode) {
    case 'percent_of': {
      // What is X% of Y? -> Result = (X / 100) * Y
      const res = (x / 100) * y;
      const rounded = parseFloat(res.toFixed(4));
      return {
        mode: 'percent_of',
        resultValue: rounded,
        formattedResult: `${x}% of ${y} = ${rounded}`,
        formulaUsed: `Result = (${x} / 100) × ${y}`,
        steps: [
          `Convert ${x}% to a decimal: ${x} ÷ 100 = ${(x / 100).toFixed(4)}`,
          `Multiply by the base value: ${(x / 100).toFixed(4)} × ${y} = ${rounded}`,
        ],
        percentValue: x,
        initialValue: y,
        finalValue: rounded,
      };
    }

    case 'is_what_percent': {
      // X is what % of Y? -> Result = (X / Y) * 100
      if (y === 0) {
        return {
          mode: 'is_what_percent',
          resultValue: 0,
          formattedResult: 'Cannot divide by zero',
          formulaUsed: 'Result = (X / Y) × 100',
          steps: ['Division by zero is undefined.'],
        };
      }
      const res = (x / y) * 100;
      const rounded = parseFloat(res.toFixed(2));
      return {
        mode: 'is_what_percent',
        resultValue: rounded,
        formattedResult: `${x} is ${rounded}% of ${y}`,
        formulaUsed: `Percentage = (${x} / ${y}) × 100`,
        steps: [
          `Divide the numerator by the denominator: ${x} ÷ ${y} = ${(x / y).toFixed(6)}`,
          `Multiply by 100 to convert to percentage: ${(x / y).toFixed(6)} × 100 = ${rounded}%`,
        ],
        percentValue: rounded,
        initialValue: y,
        difference: x,
      };
    }

    case 'percent_change': {
      // Percentage change from X to Y -> ((Y - X) / |X|) * 100
      if (x === 0) {
        return {
          mode: 'percent_change',
          resultValue: 0,
          formattedResult: 'Undefined (initial value cannot be 0)',
          formulaUsed: 'Change % = ((Final - Initial) / |Initial|) × 100',
          steps: ['Initial value cannot be zero.'],
        };
      }
      const diff = y - x;
      const pctChange = (diff / Math.abs(x)) * 100;
      const rounded = parseFloat(pctChange.toFixed(2));
      const direction = diff >= 0 ? 'Increase' : 'Decrease';
      return {
        mode: 'percent_change',
        resultValue: rounded,
        formattedResult: `${direction} of ${Math.abs(rounded)}% from ${x} to ${y}`,
        formulaUsed: `Percentage Change = ((${y} - ${x}) / |${x}|) × 100`,
        steps: [
          `Calculate absolute difference: ${y} - ${x} = ${diff}`,
          `Divide difference by original value: ${diff} ÷ |${x}| = ${(diff / Math.abs(x)).toFixed(6)}`,
          `Multiply by 100: ${(diff / Math.abs(x)).toFixed(6)} × 100 = ${rounded}%`,
        ],
        secondaryInfo: `${direction} by ${Math.abs(diff)} absolute units`,
        percentValue: rounded,
        initialValue: x,
        finalValue: y,
        difference: diff,
      };
    }

    case 'increase_decrease': {
      // Increase/Decrease X by Y%
      const type = input.changeType ?? 'increase';
      const changeAmount = (y / 100) * x;
      const res = type === 'increase' ? x + changeAmount : x - changeAmount;
      const rounded = parseFloat(res.toFixed(4));
      return {
        mode: 'increase_decrease',
        resultValue: rounded,
        formattedResult: `${type === 'increase' ? 'Increased' : 'Decreased'} ${x} by ${y}% = ${rounded}`,
        formulaUsed: `Result = ${x} ${type === 'increase' ? '+' : '-'} (${x} × (${y} / 100))`,
        steps: [
          `Calculate ${y}% of ${x}: (${y} ÷ 100) × ${x} = ${changeAmount.toFixed(4)}`,
          `${type === 'increase' ? 'Add to' : 'Subtract from'} original: ${x} ${type === 'increase' ? '+' : '-'} ${changeAmount.toFixed(4)} = ${rounded}`,
        ],
        percentValue: y,
        initialValue: x,
        finalValue: rounded,
        difference: changeAmount,
      };
    }
  }
}
