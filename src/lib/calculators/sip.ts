export interface SIPInput {
  monthlyInvestment: number;
  expectedReturnRate: number; // Annual %
  timePeriodMonths: number;
}

export interface SIPResult {
  totalInvestment: number;
  estimatedReturns: number;
  totalValue: number;
  wealthGainPercentage: number;
}

export interface SIPYearlyBreakdown {
  year: number;
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
}

export function validateSIPInput(input: SIPInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.monthlyInvestment < 0) {
    errors.monthlyInvestment = 'Monthly investment cannot be negative.';
  } else if (input.monthlyInvestment === 0) {
    errors.monthlyInvestment = 'Monthly investment must be greater than zero.';
  }

  if (input.expectedReturnRate < 0) {
    errors.expectedReturnRate = 'Expected return rate cannot be negative.';
  }

  if (input.timePeriodMonths <= 0) {
    errors.timePeriodMonths = 'Time period must be greater than zero.';
  } else if (!Number.isInteger(input.timePeriodMonths)) {
    errors.timePeriodMonths = 'Time period must be in whole months.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateSIP(input: SIPInput): SIPResult {
  const { monthlyInvestment, expectedReturnRate, timePeriodMonths } = input;
  const totalInvestment = monthlyInvestment * timePeriodMonths;

  if (expectedReturnRate === 0) {
    return {
      totalInvestment,
      estimatedReturns: 0,
      totalValue: totalInvestment,
      wealthGainPercentage: 0,
    };
  }

  const monthlyRate = expectedReturnRate / 12 / 100;
  // Formula: M = P × [{(1 + r)^n - 1} / r] × (1 + r)
  const totalValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, timePeriodMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);

  const estimatedReturns = Math.max(0, totalValue - totalInvestment);
  const wealthGainPercentage = totalInvestment > 0 ? (estimatedReturns / totalInvestment) * 100 : 0;

  return {
    totalInvestment,
    estimatedReturns,
    totalValue,
    wealthGainPercentage,
  };
}

export function generateSIPYearlyBreakdown(input: SIPInput): SIPYearlyBreakdown[] {
  const breakdown: SIPYearlyBreakdown[] = [];
  const { monthlyInvestment, expectedReturnRate, timePeriodMonths } = input;
  
  let currentInvestment = 0;
  let currentTotalValue = 0;
  const monthlyRate = expectedReturnRate / 12 / 100;
  const totalYears = Math.ceil(timePeriodMonths / 12);

  for (let year = 1; year <= totalYears; year++) {
    const monthsInThisYear = Math.min(12, timePeriodMonths - (year - 1) * 12);
    
    for (let month = 1; month <= monthsInThisYear; month++) {
      currentInvestment += monthlyInvestment;
      if (monthlyRate === 0) {
        currentTotalValue += monthlyInvestment;
      } else {
        // Value at end of this month
        currentTotalValue = (currentTotalValue + monthlyInvestment) * (1 + monthlyRate);
      }
    }

    breakdown.push({
      year,
      investedAmount: currentInvestment,
      estimatedReturns: Math.max(0, currentTotalValue - currentInvestment),
      totalValue: currentTotalValue,
    });
  }

  return breakdown;
}
