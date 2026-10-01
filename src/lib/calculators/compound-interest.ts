import { CompoundingFrequency } from './fd';
export type { CompoundingFrequency as CICompoundingFrequency };
export type DepositFrequency = 'monthly' | 'quarterly' | 'yearly';

export interface CompoundInterestInput {
  principal: number; // Starting principal in INR
  annualRate: number; // Annual interest rate in %
  tenureYears: number; // Duration in years
  compoundingFrequency: CompoundingFrequency; // Default 'yearly' or 'quarterly'
  regularDepositAmount?: number; // Optional periodic recurring deposit (default 0)
  regularDepositFrequency?: DepositFrequency; // 'monthly' | 'quarterly' | 'yearly'
  depositTiming?: 'beginning' | 'end'; // Default 'end'
}

export interface CompoundInterestResult {
  initialPrincipal: number;
  totalRegularDeposits: number;
  totalPrincipal: number; // initial + regular deposits
  totalInterestEarned: number;
  maturityAmount: number;
  effectiveAnnualRate: number; // APY / EAR in %
}

export interface CIYearlyBreakdown {
  year: number;
  openingBalance: number;
  depositsThisYear: number;
  interestEarnedThisYear: number;
  closingBalance: number;
}

export function validateCompoundInterestInput(input: CompoundInterestInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.principal < 0 || isNaN(input.principal)) {
    errors.principal = 'Principal amount cannot be negative';
  }
  if (input.annualRate < 0 || input.annualRate > 100 || isNaN(input.annualRate)) {
    errors.annualRate = 'Interest rate must be between 0% and 100%';
  }
  if (input.tenureYears <= 0 || input.tenureYears > 100 || isNaN(input.tenureYears)) {
    errors.tenureYears = 'Tenure must be between 0.1 and 100 years';
  }
  if (input.regularDepositAmount !== undefined && input.regularDepositAmount < 0) {
    errors.regularDepositAmount = 'Regular deposit cannot be negative';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getCompoundingPeriodsPerYear(frequency: CompoundingFrequency): number {
  switch (frequency) {
    case 'daily':
      return 365;
    case 'monthly':
      return 12;
    case 'quarterly':
      return 4;
    case 'half-yearly':
      return 2;
    case 'yearly':
    default:
      return 1;
  }
}

/**
 * Calculates compound interest with optional periodic deposits.
 * Effective Annual Rate (EAR) = (1 + r/n)^n - 1
 */
export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const principal = Math.max(0, input.principal);
  const rate = Math.max(0, input.annualRate);
  const years = Math.max(0, input.tenureYears);
  const regDeposit = Math.max(0, input.regularDepositAmount ?? 0);
  const depositFreq = input.regularDepositFrequency ?? 'monthly';
  const timing = input.depositTiming ?? 'end';

  const n = getCompoundingPeriodsPerYear(input.compoundingFrequency);
  const r = rate / 100;

  // Effective Annual Rate
  const ear = r === 0 ? 0 : (Math.pow(1 + r / n, n) - 1) * 100;

  // Simulate monthly or step-by-step to handle any compounding + deposit combination accurately
  // Using standard compound growth simulation
  const months = Math.round(years * 12);
  let balance = principal;
  let totalDeposits = 0;

  // Number of deposits per year
  const depositsPerYear = depositFreq === 'monthly' ? 12 : depositFreq === 'quarterly' ? 4 : 1;
  const depositIntervalMonths = 12 / depositsPerYear;

  // Monthly compound rate equivalent: (1 + r/n)^(n/12) - 1
  const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;

  for (let m = 1; m <= months; m++) {
    const isDepositMonth = (m - 1) % depositIntervalMonths === 0;

    if (isDepositMonth && regDeposit > 0 && timing === 'beginning') {
      balance += regDeposit;
      totalDeposits += regDeposit;
    }

    balance = balance * (1 + monthlyRate);

    if (isDepositMonth && regDeposit > 0 && timing === 'end') {
      balance += regDeposit;
      totalDeposits += regDeposit;
    }
  }

  const totalPrincipalInvested = principal + totalDeposits;
  const totalInterest = Math.max(0, balance - totalPrincipalInvested);

  return {
    initialPrincipal: Math.round(principal),
    totalRegularDeposits: Math.round(totalDeposits),
    totalPrincipal: Math.round(totalPrincipalInvested),
    totalInterestEarned: Math.round(totalInterest),
    maturityAmount: Math.round(balance),
    effectiveAnnualRate: parseFloat(ear.toFixed(2)),
  };
}

export function generateCIYearlyBreakdown(input: CompoundInterestInput): CIYearlyBreakdown[] {
  const principal = Math.max(0, input.principal);
  const rate = Math.max(0, input.annualRate);
  const years = Math.ceil(input.tenureYears);
  const regDeposit = Math.max(0, input.regularDepositAmount ?? 0);
  const depositFreq = input.regularDepositFrequency ?? 'monthly';
  const timing = input.depositTiming ?? 'end';

  const n = getCompoundingPeriodsPerYear(input.compoundingFrequency);
  const r = rate / 100;
  const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;

  const depositsPerYear = depositFreq === 'monthly' ? 12 : depositFreq === 'quarterly' ? 4 : 1;
  const depositIntervalMonths = 12 / depositsPerYear;

  const breakdown: CIYearlyBreakdown[] = [];
  let balance = principal;

  for (let y = 1; y <= years; y++) {
    const openBalance = balance;
    let yearDeposits = 0;

    for (let m = 1; m <= 12; m++) {
      const isDepositMonth = (m - 1) % depositIntervalMonths === 0;

      if (isDepositMonth && regDeposit > 0 && timing === 'beginning') {
        balance += regDeposit;
        yearDeposits += regDeposit;
      }

      balance = balance * (1 + monthlyRate);

      if (isDepositMonth && regDeposit > 0 && timing === 'end') {
        balance += regDeposit;
        yearDeposits += regDeposit;
      }
    }

    const yearInterest = balance - openBalance - yearDeposits;

    breakdown.push({
      year: y,
      openingBalance: Math.round(openBalance),
      depositsThisYear: Math.round(yearDeposits),
      interestEarnedThisYear: Math.round(yearInterest),
      closingBalance: Math.round(balance),
    });
  }

  return breakdown;
}
