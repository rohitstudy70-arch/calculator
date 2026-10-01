export interface PersonalLoanInput {
  loanAmount: number; // Principal in INR (₹10,000 to ₹50,00,000)
  annualRate: number; // Interest rate in % (e.g., 12.5%)
  tenureMonths: number; // Duration in months (e.g., 36)
  processingFeePercent?: number; // Processing fee % (default 1.5% - 2%)
  gstOnFeePercent?: number; // 18% GST on processing fee
}

export interface PersonalLoanResult {
  loanAmount: number;
  monthlyEMI: number;
  totalInterest: number;
  processingFee: number;
  gstOnProcessingFee: number;
  totalProcessingCharges: number;
  totalRepaymentAmount: number; // Principal + Interest
  totalCostOfLoan: number; // Principal + Interest + Fees
  effectiveAPR: number; // Annual Percentage Rate accounting for upfront fees
}

export interface PersonalLoanScheduleRow {
  month: number;
  openingBalance: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}

export interface PersonalLoanYearlySummary {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  totalPayment: number;
  closingBalance: number;
}

export function validatePersonalLoanInput(input: PersonalLoanInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.loanAmount <= 0 || isNaN(input.loanAmount)) {
    errors.loanAmount = 'Loan amount must be greater than 0';
  }
  if (input.annualRate < 0 || input.annualRate > 50 || isNaN(input.annualRate)) {
    errors.annualRate = 'Interest rate must be between 0% and 50%';
  }
  if (input.tenureMonths <= 0 || input.tenureMonths > 120 || isNaN(input.tenureMonths)) {
    errors.tenureMonths = 'Tenure must be between 1 and 120 months';
  }
  if (input.processingFeePercent !== undefined && (input.processingFeePercent < 0 || input.processingFeePercent > 10)) {
    errors.processingFeePercent = 'Processing fee must be between 0% and 10%';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates reducing-balance Personal Loan EMI, processing fees, and effective APR.
 * EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
 */
export function calculatePersonalLoan(input: PersonalLoanInput): PersonalLoanResult {
  const P = Math.max(0, input.loanAmount);
  const annualRate = Math.max(0, input.annualRate);
  const n = Math.max(1, input.tenureMonths);
  const feePercent = Math.max(0, input.processingFeePercent ?? 2.0);
  const gstPercent = Math.max(0, input.gstOnFeePercent ?? 18.0);

  const r = annualRate / 12 / 100;

  let emi = 0;
  if (r === 0) {
    emi = P / n;
  } else {
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalRepayment = emi * n;
  const totalInterest = Math.max(0, totalRepayment - P);

  const rawFee = (P * feePercent) / 100;
  const feeGST = (rawFee * gstPercent) / 100;
  const totalFees = rawFee + feeGST;
  const totalCost = totalRepayment + totalFees;

  // Approximate Effective APR = Annual Rate + (Total Fees / Net Disbursed / Years) * 100
  const netDisbursed = Math.max(1, P - totalFees);
  const years = n / 12;
  const aprEstimate = annualRate + (totalFees / netDisbursed / years) * 100;

  return {
    loanAmount: Math.round(P),
    monthlyEMI: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    processingFee: Math.round(rawFee),
    gstOnProcessingFee: Math.round(feeGST),
    totalProcessingCharges: Math.round(totalFees),
    totalRepaymentAmount: Math.round(totalRepayment),
    totalCostOfLoan: Math.round(totalCost),
    effectiveAPR: parseFloat(aprEstimate.toFixed(2)),
  };
}

export function generatePersonalLoanSchedule(input: PersonalLoanInput): PersonalLoanScheduleRow[] {
  const P = Math.max(0, input.loanAmount);
  const annualRate = Math.max(0, input.annualRate);
  const n = Math.max(1, input.tenureMonths);
  const r = annualRate / 12 / 100;

  let emi = 0;
  if (r === 0) {
    emi = P / n;
  } else {
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const schedule: PersonalLoanScheduleRow[] = [];
  let balance = P;

  for (let m = 1; m <= n; m++) {
    const interest = r === 0 ? 0 : balance * r;
    const principal = Math.min(balance, emi - interest);
    const closing = Math.max(0, balance - principal);

    schedule.push({
      month: m,
      openingBalance: Math.round(balance),
      emi: Math.round(emi),
      principalPaid: Math.round(principal),
      interestPaid: Math.round(interest),
      closingBalance: Math.round(closing),
    });

    balance = closing;
  }

  return schedule;
}

export function generatePersonalLoanYearlySummary(input: PersonalLoanInput): PersonalLoanYearlySummary[] {
  const schedule = generatePersonalLoanSchedule(input);
  const totalYears = Math.ceil(schedule.length / 12);
  const summary: PersonalLoanYearlySummary[] = [];

  for (let y = 1; y <= totalYears; y++) {
    const yearRows = schedule.filter((row) => Math.ceil(row.month / 12) === y);
    if (yearRows.length === 0) continue;

    const opening = yearRows[0].openingBalance;
    const closing = yearRows[yearRows.length - 1].closingBalance;
    const principal = yearRows.reduce((acc, row) => acc + row.principalPaid, 0);
    const interest = yearRows.reduce((acc, row) => acc + row.interestPaid, 0);

    summary.push({
      year: y,
      openingBalance: opening,
      principalPaid: principal,
      interestPaid: interest,
      totalPayment: principal + interest,
      closingBalance: closing,
    });
  }

  return summary;
}
