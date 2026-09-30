export interface LumpsumInput {
  investmentAmount: number;
  expectedReturnRate: number; // Annual return %
  timePeriodYears: number;
}

export interface LumpsumResult {
  investmentAmount: number;
  estimatedReturns: number;
  totalValue: number;
  wealthGainPercentage: number;
}

export interface LumpsumYearlyBreakdown {
  year: number;
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
}

export function validateLumpsumInput(input: LumpsumInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.investmentAmount < 0) {
    errors.investmentAmount = 'Investment amount cannot be negative.';
  } else if (input.investmentAmount === 0) {
    errors.investmentAmount = 'Investment amount must be greater than zero.';
  }

  if (input.expectedReturnRate < 0) {
    errors.expectedReturnRate = 'Expected return rate cannot be negative.';
  }

  if (input.timePeriodYears <= 0) {
    errors.timePeriodYears = 'Time period must be greater than zero.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateLumpsum(input: LumpsumInput): LumpsumResult {
  const { investmentAmount, expectedReturnRate, timePeriodYears } = input;
  
  if (expectedReturnRate === 0) {
    return {
      investmentAmount,
      estimatedReturns: 0,
      totalValue: investmentAmount,
      wealthGainPercentage: 0,
    };
  }

  const rate = expectedReturnRate / 100;
  // Formula: A = P * (1 + r)^n
  const totalValue = investmentAmount * Math.pow(1 + rate, timePeriodYears);
  const estimatedReturns = Math.max(0, totalValue - investmentAmount);
  const wealthGainPercentage = (estimatedReturns / investmentAmount) * 100;

  return {
    investmentAmount,
    estimatedReturns,
    totalValue,
    wealthGainPercentage,
  };
}

export function generateLumpsumYearlyBreakdown(input: LumpsumInput): LumpsumYearlyBreakdown[] {
  const breakdown: LumpsumYearlyBreakdown[] = [];
  const { investmentAmount, expectedReturnRate, timePeriodYears } = input;
  const rate = expectedReturnRate / 100;
  const totalYears = Math.ceil(timePeriodYears);

  for (let year = 1; year <= totalYears; year++) {
    // Handling fractional years if necessary, assuming integer years typically
    const currentYear = year > timePeriodYears ? timePeriodYears : year;
    const totalValue = investmentAmount * Math.pow(1 + rate, currentYear);

    breakdown.push({
      year: Math.floor(currentYear),
      investedAmount: investmentAmount,
      estimatedReturns: Math.max(0, totalValue - investmentAmount),
      totalValue: totalValue,
    });
  }

  return breakdown;
}
