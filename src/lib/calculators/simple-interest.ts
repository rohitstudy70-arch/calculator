export type SITimeUnit = 'years' | 'months' | 'days';
export type SIMode = 'calculate_interest' | 'find_rate' | 'find_time' | 'find_principal';

export interface SimpleInterestInput {
  mode?: SIMode; // Default 'calculate_interest'
  principal: number; // P
  annualRate: number; // R in %
  timeValue: number; // T
  timeUnit: SITimeUnit; // 'years' | 'months' | 'days'
  targetInterest?: number; // Used in reverse modes
  targetTotalAmount?: number; // Used in reverse modes
}

export interface SimpleInterestResult {
  principal: number;
  annualRate: number;
  timeInYears: number;
  timeInMonths: number;
  timeInDays: number;
  interestEarned: number;
  totalAmount: number;
  dailyInterest: number;
  monthlyInterest: number;
  yearlyInterest: number;
}

export interface SIYearlyBreakdown {
  period: string;
  openingPrincipal: number;
  interestEarned: number;
  cumulativeInterest: number;
  totalAmount: number;
}

export function validateSimpleInterestInput(input: SimpleInterestInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const mode = input.mode ?? 'calculate_interest';

  if (mode === 'calculate_interest') {
    if (input.principal <= 0 || isNaN(input.principal)) {
      errors.principal = 'Principal must be greater than 0';
    }
    if (input.annualRate < 0 || isNaN(input.annualRate)) {
      errors.annualRate = 'Interest rate cannot be negative';
    }
    if (input.timeValue <= 0 || isNaN(input.timeValue)) {
      errors.timeValue = 'Time period must be greater than 0';
    }
  } else if (mode === 'find_rate') {
    if (input.principal <= 0) errors.principal = 'Principal must be greater than 0';
    if (input.timeValue <= 0) errors.timeValue = 'Time period must be greater than 0';
    if ((input.targetInterest ?? 0) <= 0 && (input.targetTotalAmount ?? 0) <= input.principal) {
      errors.targetInterest = 'Target interest must be greater than 0';
    }
  } else if (mode === 'find_time') {
    if (input.principal <= 0) errors.principal = 'Principal must be greater than 0';
    if (input.annualRate <= 0) errors.annualRate = 'Interest rate must be greater than 0';
    if ((input.targetInterest ?? 0) <= 0 && (input.targetTotalAmount ?? 0) <= input.principal) {
      errors.targetInterest = 'Target interest must be greater than 0';
    }
  } else if (mode === 'find_principal') {
    if (input.annualRate <= 0) errors.annualRate = 'Interest rate must be greater than 0';
    if (input.timeValue <= 0) errors.timeValue = 'Time period must be greater than 0';
    if ((input.targetInterest ?? 0) <= 0 && (input.targetTotalAmount ?? 0) <= 0) {
      errors.targetInterest = 'Target interest or total amount is required';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function convertTimeToYears(timeValue: number, unit: SITimeUnit): number {
  if (timeValue <= 0) return 0;
  switch (unit) {
    case 'days':
      return timeValue / 365;
    case 'months':
      return timeValue / 12;
    case 'years':
    default:
      return timeValue;
  }
}

/**
 * Standard & Reverse Simple Interest calculations.
 * Formula: SI = (P * R * T) / 100
 * Amount = P + SI
 */
export function calculateSimpleInterest(input: SimpleInterestInput): SimpleInterestResult {
  const mode = input.mode ?? 'calculate_interest';

  let P = Math.max(0, input.principal);
  let R = Math.max(0, input.annualRate);
  let T_years = convertTimeToYears(Math.max(0, input.timeValue), input.timeUnit);

  let targetInterest = input.targetInterest ?? 0;
  if (targetInterest === 0 && input.targetTotalAmount && input.targetTotalAmount > P) {
    targetInterest = input.targetTotalAmount - P;
  }

  if (mode === 'find_rate' && P > 0 && T_years > 0) {
    // R = (SI * 100) / (P * T)
    R = (targetInterest * 100) / (P * T_years);
  } else if (mode === 'find_time' && P > 0 && R > 0) {
    // T = (SI * 100) / (P * R)
    T_years = (targetInterest * 100) / (P * R);
  } else if (mode === 'find_principal' && R > 0 && T_years > 0) {
    if (input.targetTotalAmount && input.targetTotalAmount > 0 && targetInterest === 0) {
      // A = P + (P * R * T)/100 = P * (1 + RT/100) => P = A / (1 + RT/100)
      P = input.targetTotalAmount / (1 + (R * T_years) / 100);
    } else {
      // P = (SI * 100) / (R * T)
      P = (targetInterest * 100) / (R * T_years);
    }
  }

  const SI = (P * R * T_years) / 100;
  const totalAmount = P + SI;

  const yearlyInterest = (P * R) / 100;
  const monthlyInterest = yearlyInterest / 12;
  const dailyInterest = yearlyInterest / 365;

  return {
    principal: Math.round(P * 100) / 100,
    annualRate: Math.round(R * 100) / 100,
    timeInYears: Math.round(T_years * 100) / 100,
    timeInMonths: Math.round(T_years * 12 * 10) / 10,
    timeInDays: Math.round(T_years * 365),
    interestEarned: Math.round(SI * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    dailyInterest: Math.round(dailyInterest * 100) / 100,
    monthlyInterest: Math.round(monthlyInterest * 100) / 100,
    yearlyInterest: Math.round(yearlyInterest * 100) / 100,
  };
}

export function generateSIBreakdown(input: SimpleInterestInput): SIYearlyBreakdown[] {
  const res = calculateSimpleInterest(input);
  const years = Math.max(1, Math.ceil(res.timeInYears));
  const breakdown: SIYearlyBreakdown[] = [];

  const yearlyInt = res.yearlyInterest;
  let cumulative = 0;

  for (let y = 1; y <= years; y++) {
    const isLastYear = y === years;
    const fractionOfYear = isLastYear ? res.timeInYears - (years - 1) : 1;
    const thisYearInterest = yearlyInt * fractionOfYear;
    cumulative += thisYearInterest;

    breakdown.push({
      period: `Year ${y}`,
      openingPrincipal: Math.round(res.principal),
      interestEarned: Math.round(thisYearInterest),
      cumulativeInterest: Math.round(cumulative),
      totalAmount: Math.round(res.principal + cumulative),
    });
  }

  return breakdown;
}
