export interface CarLoanInput {
  onRoadPrice: number; // Vehicle on-road price in INR
  downPaymentPercent: number; // Down payment % (0% to 80%, default 20%)
  annualRate: number; // Interest rate % (e.g., 8.75%)
  tenureMonths: number; // Duration in months (e.g. 60 = 5 years)
  processingFeeAmount?: number; // Fixed processing charge in INR (default ₹3,500)
}

export interface CarLoanResult {
  onRoadPrice: number;
  downPaymentAmount: number;
  loanAmount: number; // Principal borrowed
  monthlyEMI: number;
  totalInterest: number;
  totalLoanPayment: number; // Principal + Interest
  totalCostOfCar: number; // Down Payment + Total Loan Payment + Processing Fee
  ltvRatio: number; // Loan-to-Value percentage
}

export interface CarLoanYearlySummary {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  totalPayment: number;
  closingBalance: number;
}

export function validateCarLoanInput(input: CarLoanInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.onRoadPrice <= 0 || isNaN(input.onRoadPrice)) {
    errors.onRoadPrice = 'On-road price must be greater than 0';
  }
  if (input.downPaymentPercent < 0 || input.downPaymentPercent >= 100 || isNaN(input.downPaymentPercent)) {
    errors.downPaymentPercent = 'Down payment must be between 0% and 99%';
  }
  if (input.annualRate < 0 || input.annualRate > 40 || isNaN(input.annualRate)) {
    errors.annualRate = 'Interest rate must be between 0% and 40%';
  }
  if (input.tenureMonths <= 0 || input.tenureMonths > 120 || isNaN(input.tenureMonths)) {
    errors.tenureMonths = 'Tenure must be between 1 and 120 months';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates auto/car loan EMI, down payment, total interest, and total on-road acquisition cost.
 */
export function calculateCarLoan(input: CarLoanInput): CarLoanResult {
  const price = Math.max(0, input.onRoadPrice);
  const dpPercent = Math.max(0, Math.min(99, input.downPaymentPercent));
  const rate = Math.max(0, input.annualRate);
  const n = Math.max(1, input.tenureMonths);
  const fee = Math.max(0, input.processingFeeAmount ?? 3500);

  const downPayment = (price * dpPercent) / 100;
  const P = Math.max(0, price - downPayment);
  const r = rate / 12 / 100;

  let emi = 0;
  if (r === 0) {
    emi = P / n;
  } else {
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalLoanRepayment = emi * n;
  const totalInterest = Math.max(0, totalLoanRepayment - P);
  const totalCost = downPayment + totalLoanRepayment + fee;
  const ltv = price > 0 ? (P / price) * 100 : 0;

  return {
    onRoadPrice: Math.round(price),
    downPaymentAmount: Math.round(downPayment),
    loanAmount: Math.round(P),
    monthlyEMI: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalLoanPayment: Math.round(totalLoanRepayment),
    totalCostOfCar: Math.round(totalCost),
    ltvRatio: parseFloat(ltv.toFixed(1)),
  };
}

export function generateCarLoanYearlySummary(input: CarLoanInput): CarLoanYearlySummary[] {
  const res = calculateCarLoan(input);
  const P = res.loanAmount;
  const rate = Math.max(0, input.annualRate);
  const n = Math.max(1, input.tenureMonths);
  const r = rate / 12 / 100;
  const emi = res.monthlyEMI;

  const totalYears = Math.ceil(n / 12);
  const summary: CarLoanYearlySummary[] = [];
  let balance = P;

  for (let y = 1; y <= totalYears; y++) {
    const opening = balance;
    let yearPrincipal = 0;
    let yearInterest = 0;

    const startMonth = (y - 1) * 12 + 1;
    const endMonth = Math.min(n, y * 12);

    for (let m = startMonth; m <= endMonth; m++) {
      const interest = r === 0 ? 0 : balance * r;
      const principalPaid = Math.min(balance, emi - interest);
      yearInterest += interest;
      yearPrincipal += principalPaid;
      balance = Math.max(0, balance - principalPaid);
    }

    summary.push({
      year: y,
      openingBalance: Math.round(opening),
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      totalPayment: Math.round(yearPrincipal + yearInterest),
      closingBalance: Math.round(balance),
    });
  }

  return summary;
}
