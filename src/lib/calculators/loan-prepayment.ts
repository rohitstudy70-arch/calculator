export type PrepaymentFrequency = 'one-time' | 'monthly' | 'annually';
export type PrepaymentAdjustment = 'reduce_tenure' | 'reduce_emi';

export interface LoanPrepaymentInput {
  loanAmount: number; // Current remaining principal or original loan
  annualRate: number; // Annual interest rate in %
  tenureMonths: number; // Remaining tenure in months
  prepaymentType: PrepaymentFrequency; // 'one-time' | 'monthly' | 'annually'
  prepaymentAmount: number; // Lump sum or recurring prepayment amount
  prepaymentStartMonth?: number; // Starting month for prepayment (default 1)
  prepaymentAdjustment?: PrepaymentAdjustment; // 'reduce_tenure' (default) or 'reduce_emi'
}

export interface LoanPrepaymentResult {
  originalEMI: number;
  newEMI: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  totalInterestSaved: number;
  originalTenureMonths: number;
  newTenureMonths: number;
  tenureMonthsSaved: number;
  tenureYearsSaved: number;
  totalPrepaymentsMade: number;
}

export interface PrepaymentScheduleComparisonRow {
  year: number;
  originalBalance: number;
  prepaidBalance: number;
  originalInterestPaid: number;
  prepaidInterestPaid: number;
  prepaymentMadeThisYear: number;
}

export function validateLoanPrepaymentInput(input: LoanPrepaymentInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.loanAmount <= 0 || isNaN(input.loanAmount)) {
    errors.loanAmount = 'Loan amount must be greater than 0';
  }
  if (input.annualRate <= 0 || input.annualRate > 40 || isNaN(input.annualRate)) {
    errors.annualRate = 'Interest rate must be between 0.1% and 40%';
  }
  if (input.tenureMonths <= 0 || input.tenureMonths > 360 || isNaN(input.tenureMonths)) {
    errors.tenureMonths = 'Tenure must be between 1 and 360 months';
  }
  if (input.prepaymentAmount < 0 || isNaN(input.prepaymentAmount)) {
    errors.prepaymentAmount = 'Prepayment amount cannot be negative';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates interest savings and tenure/EMI reduction from loan prepayments.
 */
export function calculateLoanPrepayment(input: LoanPrepaymentInput): LoanPrepaymentResult {
  const P = Math.max(0, input.loanAmount);
  const annualRate = Math.max(0, input.annualRate);
  const n = Math.max(1, input.tenureMonths);
  const prepayAmt = Math.max(0, input.prepaymentAmount);
  const prepayType = input.prepaymentType ?? 'one-time';
  const startMonth = Math.max(1, input.prepaymentStartMonth ?? 1);
  const adjustment = input.prepaymentAdjustment ?? 'reduce_tenure';

  const r = annualRate / 12 / 100;
  const originalEMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const originalTotalInterest = originalEMI * n - P;

  if (prepayAmt === 0) {
    return {
      originalEMI: Math.round(originalEMI),
      newEMI: Math.round(originalEMI),
      originalTotalInterest: Math.round(originalTotalInterest),
      newTotalInterest: Math.round(originalTotalInterest),
      totalInterestSaved: 0,
      originalTenureMonths: n,
      newTenureMonths: n,
      tenureMonthsSaved: 0,
      tenureYearsSaved: 0,
      totalPrepaymentsMade: 0,
    };
  }

  // Simulation
  let balance = P;
  let totalNewInterest = 0;
  let totalPrepaid = 0;
  let monthsElapsed = 0;
  let currentEMI = originalEMI;

  if (adjustment === 'reduce_tenure') {
    while (balance > 0.01 && monthsElapsed < n) {
      monthsElapsed++;
      const interest = balance * r;
      let principalPaid = currentEMI - interest;

      let extra = 0;
      if (monthsElapsed >= startMonth) {
        if (prepayType === 'one-time' && monthsElapsed === startMonth) {
          extra = prepayAmt;
        } else if (prepayType === 'monthly') {
          extra = prepayAmt;
        } else if (prepayType === 'annually' && (monthsElapsed - startMonth) % 12 === 0) {
          extra = prepayAmt;
        }
      }

      const totalPrincipalPayment = Math.min(balance, principalPaid + extra);
      const actualExtra = Math.max(0, totalPrincipalPayment - principalPaid);
      totalPrepaid += actualExtra;
      totalNewInterest += interest;

      balance = Math.max(0, balance - totalPrincipalPayment);
    }

    const savedInterest = Math.max(0, originalTotalInterest - totalNewInterest);
    const monthsSaved = Math.max(0, n - monthsElapsed);

    return {
      originalEMI: Math.round(originalEMI),
      newEMI: Math.round(originalEMI),
      originalTotalInterest: Math.round(originalTotalInterest),
      newTotalInterest: Math.round(totalNewInterest),
      totalInterestSaved: Math.round(savedInterest),
      originalTenureMonths: n,
      newTenureMonths: monthsElapsed,
      tenureMonthsSaved: monthsSaved,
      tenureYearsSaved: parseFloat((monthsSaved / 12).toFixed(1)),
      totalPrepaymentsMade: Math.round(totalPrepaid),
    };
  } else {
    // Reduce EMI mode
    // If one-time prepayment happens at startMonth, recalculate EMI on reduced balance
    let newCalculatedEMI = originalEMI;
    for (let m = 1; m <= n; m++) {
      if (balance <= 0.01) break;
      monthsElapsed++;

      const interest = balance * r;
      totalNewInterest += interest;

      let extra = 0;
      if (m === startMonth && prepayType === 'one-time') {
        extra = Math.min(balance, prepayAmt);
        totalPrepaid += extra;
        balance -= extra;
        // Recalculate remaining EMI
        const remMonths = Math.max(1, n - m);
        newCalculatedEMI = (balance * r * Math.pow(1 + r, remMonths)) / (Math.pow(1 + r, remMonths) - 1);
      }

      const principalPaid = Math.min(balance, newCalculatedEMI - interest);
      balance = Math.max(0, balance - principalPaid);
    }

    const savedInterest = Math.max(0, originalTotalInterest - totalNewInterest);

    return {
      originalEMI: Math.round(originalEMI),
      newEMI: Math.round(newCalculatedEMI),
      originalTotalInterest: Math.round(originalTotalInterest),
      newTotalInterest: Math.round(totalNewInterest),
      totalInterestSaved: Math.round(savedInterest),
      originalTenureMonths: n,
      newTenureMonths: n,
      tenureMonthsSaved: 0,
      tenureYearsSaved: 0,
      totalPrepaymentsMade: Math.round(totalPrepaid),
    };
  }
}

export function generatePrepaymentComparisonSchedule(input: LoanPrepaymentInput): PrepaymentScheduleComparisonRow[] {
  const P = Math.max(0, input.loanAmount);
  const annualRate = Math.max(0, input.annualRate);
  const n = Math.max(1, input.tenureMonths);
  const prepayAmt = Math.max(0, input.prepaymentAmount);
  const prepayType = input.prepaymentType ?? 'one-time';
  const startMonth = Math.max(1, input.prepaymentStartMonth ?? 1);

  const r = annualRate / 12 / 100;
  const originalEMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const totalYears = Math.ceil(n / 12);
  const comparison: PrepaymentScheduleComparisonRow[] = [];

  let origBalance = P;
  let prepBalance = P;

  for (let y = 1; y <= totalYears; y++) {
    const startM = (y - 1) * 12 + 1;
    const endM = Math.min(n, y * 12);

    let origYearInt = 0;
    let prepYearInt = 0;
    let prepYearExtra = 0;

    for (let m = startM; m <= endM; m++) {
      // Original track
      if (origBalance > 0.01) {
        const intO = origBalance * r;
        const princO = Math.min(origBalance, originalEMI - intO);
        origYearInt += intO;
        origBalance = Math.max(0, origBalance - princO);
      }

      // Prepaid track
      if (prepBalance > 0.01) {
        const intP = prepBalance * r;
        let princP = originalEMI - intP;

        let extra = 0;
        if (m >= startMonth) {
          if (prepayType === 'one-time' && m === startMonth) extra = prepayAmt;
          else if (prepayType === 'monthly') extra = prepayAmt;
          else if (prepayType === 'annually' && (m - startMonth) % 12 === 0) extra = prepayAmt;
        }

        const totalP = Math.min(prepBalance, princP + extra);
        const actualExtra = Math.max(0, totalP - princP);
        prepYearExtra += actualExtra;
        prepYearInt += intP;
        prepBalance = Math.max(0, prepBalance - totalP);
      }
    }

    comparison.push({
      year: y,
      originalBalance: Math.round(origBalance),
      prepaidBalance: Math.round(prepBalance),
      originalInterestPaid: Math.round(origYearInt),
      prepaidInterestPaid: Math.round(prepYearInt),
      prepaymentMadeThisYear: Math.round(prepYearExtra),
    });
  }

  return comparison;
}
