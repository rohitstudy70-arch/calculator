import { CompoundingFrequency } from './fd';
export type { CompoundingFrequency };

export interface RDInput {
  monthlyDeposit: number;
  annualRate: number;
  tenureMonths: number;
  compounding: CompoundingFrequency;
}

export interface RDResult {
  totalDeposited: number;
  totalInterest: number;
  maturityAmount: number;
  effectiveRate: number;
}

export interface RDYearlyBreakdown {
  year: number;
  deposited: number;
  interestEarned: number;
  balance: number;
}

const getCompoundingTimes = (compounding: CompoundingFrequency): number => {
  switch (compounding) {
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'half-yearly': return 2;
    case 'yearly': return 1;
    default: return 4;
  }
};

export function validateRDInput(input: RDInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (input.monthlyDeposit <= 0) errors.monthlyDeposit = 'Deposit must be greater than zero.';
  if (input.annualRate < 0) errors.annualRate = 'Interest rate cannot be negative.';
  if (input.tenureMonths <= 0 || !Number.isInteger(input.tenureMonths)) errors.tenureMonths = 'Tenure must be a positive integer.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function calculateRD(input: RDInput): RDResult {
  const { monthlyDeposit, annualRate, tenureMonths, compounding } = input;
  const n = getCompoundingTimes(compounding);
  const r = annualRate / 100;
  
  let maturityAmount = 0;
  for (let m = 1; m <= tenureMonths; m++) {
    const remainingYears = (tenureMonths - m + 1) / 12;
    // For quarterly compounding, compute exact periods
    let compoundingPeriods = n * remainingYears;
    
    // Most banks compound on completed quarters only
    if (compounding === 'quarterly') {
       // Typically interest is calculated using quarterly compounding on the quarters and simple interest on remaining months.
       // However, iterating month by month compounding is also standard. We use standard fractional exponent.
    }
    
    maturityAmount += monthlyDeposit * Math.pow(1 + r / n, n * remainingYears);
  }
  
  const totalDeposited = monthlyDeposit * tenureMonths;
  const totalInterest = maturityAmount - totalDeposited;
  const effectiveRate = ((Math.pow(1 + r / n, n) - 1) * 100);
  
  return {
    totalDeposited,
    totalInterest,
    maturityAmount,
    effectiveRate,
  };
}

export function generateRDYearlyBreakdown(input: RDInput): RDYearlyBreakdown[] {
  const { monthlyDeposit, annualRate, tenureMonths, compounding } = input;
  const n = getCompoundingTimes(compounding);
  const r = annualRate / 100;
  const totalYears = Math.ceil(tenureMonths / 12);
  const breakdown: RDYearlyBreakdown[] = [];
  
  let currentBalance = 0;
  let totalDepositedSoFar = 0;

  for (let year = 1; year <= totalYears; year++) {
    const startMonth = (year - 1) * 12 + 1;
    const endMonth = Math.min(year * 12, tenureMonths);
    const monthsInYear = endMonth - startMonth + 1;
    
    let balanceAtEndOfYear = 0;
    // We compute total balance up to this year for ALL deposits made so far
    for (let m = 1; m <= endMonth; m++) {
      const remainingYearsForThisDeposit = (endMonth - m + 1) / 12;
      balanceAtEndOfYear += monthlyDeposit * Math.pow(1 + r / n, n * remainingYearsForThisDeposit);
    }
    
    const depositedThisYear = monthsInYear * monthlyDeposit;
    totalDepositedSoFar += depositedThisYear;
    
    const interestEarned = balanceAtEndOfYear - currentBalance - depositedThisYear;
    
    breakdown.push({
      year,
      deposited: depositedThisYear,
      interestEarned,
      balance: balanceAtEndOfYear,
    });
    
    currentBalance = balanceAtEndOfYear;
  }
  
  return breakdown;
}
