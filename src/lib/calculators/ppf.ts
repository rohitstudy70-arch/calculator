export interface PPFInput {
  annualDeposit: number;
  interestRate: number;
  timePeriodYears: number;
}

export interface PPFResult {
  totalDeposited: number;
  totalInterest: number;
  maturityAmount: number;
  taxSaved80C: number;
}

export interface PPFYearlyBreakdown {
  year: number;
  deposit: number;
  interestEarned: number;
  balance: number;
}

export function validatePPFInput(input: PPFInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.annualDeposit < 500) {
    errors.annualDeposit = 'Minimum annual deposit is ₹500.';
  } else if (input.annualDeposit > 150000) {
    errors.annualDeposit = 'Maximum annual deposit is ₹1,50,000.';
  }

  if (input.interestRate <= 0) {
    errors.interestRate = 'Interest rate must be greater than zero.';
  } else if (input.interestRate > 15) {
    errors.interestRate = 'Interest rate seems unusually high (max 15%).';
  }

  if (input.timePeriodYears < 15) {
    errors.timePeriodYears = 'Minimum time period is 15 years.';
  } else if (!Number.isInteger(input.timePeriodYears)) {
    errors.timePeriodYears = 'Time period must be in whole years.';
  } else if (input.timePeriodYears > 50) {
    errors.timePeriodYears = 'Maximum time period is 50 years.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculatePPF(input: PPFInput): PPFResult {
  const { annualDeposit, interestRate, timePeriodYears } = input;
  const r = interestRate / 100;
  const n = timePeriodYears;
  const P = annualDeposit;

  // Formula for annuity due (deposit at beginning of year)
  // FV = P * [((1 + r)^n - 1) / r] * (1 + r)
  let maturityAmount = 0;
  if (r === 0) {
    maturityAmount = P * n;
  } else {
    maturityAmount = P * (Math.pow(1 + r, n) - 1) / r * (1 + r);
  }

  const totalDeposited = P * n;
  const totalInterest = maturityAmount - totalDeposited;
  
  // Max 80C deduction is 1.5L. Assuming 30% tax bracket + 4% cess = 31.2%
  // Or simply 30% as per standard. Let's use 30%.
  const eligible80C = Math.min(P, 150000);
  const taxSaved80C = eligible80C * 0.30;

  return {
    totalDeposited,
    totalInterest,
    maturityAmount,
    taxSaved80C,
  };
}

export function generatePPFYearlyBreakdown(input: PPFInput): PPFYearlyBreakdown[] {
  const { annualDeposit, interestRate, timePeriodYears } = input;
  const r = interestRate / 100;
  
  const schedule: PPFYearlyBreakdown[] = [];
  let balance = 0;

  for (let year = 1; year <= timePeriodYears; year++) {
    // Deposit at start of year
    balance += annualDeposit;
    // Interest calculated on balance
    const interestEarned = balance * r;
    // Balance at end of year
    balance += interestEarned;

    schedule.push({
      year,
      deposit: annualDeposit,
      interestEarned,
      balance,
    });
  }

  return schedule;
}
