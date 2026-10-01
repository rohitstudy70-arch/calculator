export type CAGRMode = 'calculate_cagr' | 'future_value_from_cagr';

export interface CAGRInput {
  mode?: CAGRMode; // Default 'calculate_cagr'
  initialValue: number; // Starting investment value
  finalValue?: number; // Ending investment value (mode = calculate_cagr)
  targetCAGRPercent?: number; // Target annual growth % (mode = future_value_from_cagr)
  durationYears: number; // Period in years
}

export interface CAGRResult {
  initialValue: number;
  finalValue: number;
  durationYears: number;
  cagrPercentage: number;
  totalAbsoluteGainAmount: number;
  totalAbsoluteGainPercentage: number;
  doublingTimeYears: number; // Rule of 72
}

export interface CAGRYearlyBreakdown {
  year: number;
  portfolioValue: number;
  absoluteGainThisYear: number;
  cumulativeGain: number;
}

export function validateCAGRInput(input: CAGRInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const mode = input.mode ?? 'calculate_cagr';

  if (input.initialValue <= 0 || isNaN(input.initialValue)) {
    errors.initialValue = 'Initial investment value must be greater than 0';
  }
  if (input.durationYears <= 0 || input.durationYears > 100 || isNaN(input.durationYears)) {
    errors.durationYears = 'Duration must be between 0.1 and 100 years';
  }

  if (mode === 'calculate_cagr') {
    if (input.finalValue === undefined || input.finalValue <= 0 || isNaN(input.finalValue)) {
      errors.finalValue = 'Final investment value must be greater than 0';
    }
  } else {
    if (input.targetCAGRPercent === undefined || input.targetCAGRPercent < -90 || input.targetCAGRPercent > 1000 || isNaN(input.targetCAGRPercent)) {
      errors.targetCAGRPercent = 'Target CAGR must be between -90% and 1000%';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates Compound Annual Growth Rate (CAGR) and reverse future portfolio values.
 * Standard CAGR: CAGR = (Final / Initial)^(1 / n) - 1
 * Reverse FV: Final = Initial * (1 + CAGR)^n
 */
export function calculateCAGR(input: CAGRInput): CAGRResult {
  const mode = input.mode ?? 'calculate_cagr';
  const V0 = Math.max(0, input.initialValue);
  const n = Math.max(0.01, input.durationYears);

  let Vn = 0;
  let cagr = 0;

  if (mode === 'calculate_cagr') {
    Vn = Math.max(0, input.finalValue ?? V0);
    if (V0 > 0 && Vn > 0) {
      cagr = (Math.pow(Vn / V0, 1 / n) - 1) * 100;
    }
  } else {
    cagr = input.targetCAGRPercent ?? 12.0;
    Vn = V0 * Math.pow(1 + cagr / 100, n);
  }

  const absoluteGainAmount = Vn - V0;
  const absoluteGainPercentage = V0 > 0 ? (absoluteGainAmount / V0) * 100 : 0;
  const doublingTime = cagr > 0 ? 72 / cagr : 0;

  return {
    initialValue: Math.round(V0),
    finalValue: Math.round(Vn),
    durationYears: parseFloat(n.toFixed(1)),
    cagrPercentage: parseFloat(cagr.toFixed(2)),
    totalAbsoluteGainAmount: Math.round(absoluteGainAmount),
    totalAbsoluteGainPercentage: parseFloat(absoluteGainPercentage.toFixed(2)),
    doublingTimeYears: parseFloat(doublingTime.toFixed(1)),
  };
}

export function generateCAGRYearlyBreakdown(input: CAGRInput): CAGRYearlyBreakdown[] {
  const res = calculateCAGR(input);
  const V0 = res.initialValue;
  const cagrRate = res.cagrPercentage / 100;
  const years = Math.ceil(res.durationYears);

  const breakdown: CAGRYearlyBreakdown[] = [];
  let currentValue = V0;

  for (let y = 1; y <= years; y++) {
    const nextVal = V0 * Math.pow(1 + cagrRate, y);
    const gainThisYear = nextVal - currentValue;
    const cumGain = nextVal - V0;

    breakdown.push({
      year: y,
      portfolioValue: Math.round(nextVal),
      absoluteGainThisYear: Math.round(gainThisYear),
      cumulativeGain: Math.round(cumGain),
    });

    currentValue = nextVal;
  }

  return breakdown;
}
