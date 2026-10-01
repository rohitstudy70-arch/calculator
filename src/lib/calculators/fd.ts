export type CompoundingFrequency = 'daily' | 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

export interface FDInput {
  principal: number;
  annualRate: number;
  tenureMonths: number;
  compounding: CompoundingFrequency;
}

export interface FDResult {
  maturityAmount: number;
  totalInterest: number;
  effectiveRate: number;
  principalPercentage: number;
  interestPercentage: number;
}

export interface FDYearlyBreakdown {
  year: number;
  openingBalance: number;
  interestEarned: number;
  closingBalance: number;
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

export function validateFDInput(input: FDInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (input.principal <= 0) errors.principal = 'Principal must be greater than zero.';
  if (input.annualRate < 0) errors.annualRate = 'Interest rate cannot be negative.';
  if (input.tenureMonths <= 0 || !Number.isInteger(input.tenureMonths)) errors.tenureMonths = 'Tenure must be a positive integer in months.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function calculateFD(input: FDInput): FDResult {
  const { principal, annualRate, tenureMonths, compounding } = input;
  const n = getCompoundingTimes(compounding);
  const t = tenureMonths / 12;
  const r = annualRate / 100;
  
  const maturityAmount = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = maturityAmount - principal;
  
  const effectiveRate = ((Math.pow(1 + r / n, n) - 1) * 100);
  const principalPercentage = (principal / maturityAmount) * 100;
  const interestPercentage = (totalInterest / maturityAmount) * 100;
  
  return {
    maturityAmount,
    totalInterest,
    effectiveRate,
    principalPercentage,
    interestPercentage,
  };
}

export function generateFDYearlyBreakdown(input: FDInput): FDYearlyBreakdown[] {
  const { principal, annualRate, tenureMonths, compounding } = input;
  const n = getCompoundingTimes(compounding);
  const r = annualRate / 100;
  const totalYears = Math.ceil(tenureMonths / 12);
  const breakdown: FDYearlyBreakdown[] = [];
  
  let currentBalance = principal;
  let remainingMonths = tenureMonths;

  for (let year = 1; year <= totalYears; year++) {
    const monthsInYear = Math.min(12, remainingMonths);
    const newBalance = principal * Math.pow(1 + r / n, n * (year === totalYears ? tenureMonths/12 : year));
    const interestEarned = newBalance - currentBalance;
    
    breakdown.push({
      year,
      openingBalance: currentBalance,
      interestEarned,
      closingBalance: newBalance,
    });
    
    currentBalance = newBalance;
    remainingMonths -= monthsInYear;
  }
  
  return breakdown;
}
