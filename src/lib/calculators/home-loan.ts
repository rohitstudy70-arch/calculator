import { calculateEMI, validateEMIInput } from './emi';

export interface HomeLoanInput {
  propertyValue: number;
  downPaymentPercent: number;
  annualRate: number;
  tenureMonths: number;
  processingFeePercent: number;
}

export interface HomeLoanResult {
  loanAmount: number;
  downPayment: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  processingFee: number;
  stampDutyEstimate: number;
  registrationCharges: number;
  totalCostOfOwnership: number;
  taxSaving80C: number;
  taxSaving24b: number;
}

export interface HomeLoanYearlySummary {
  year: number;
  principalPaid: number;
  interestPaid: number;
  taxBenefit80C: number;
  taxBenefit24b: number;
  balance: number;
}

export function validateHomeLoanInput(input: HomeLoanInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than zero.';
  }

  if (input.downPaymentPercent < 0 || input.downPaymentPercent >= 100) {
    errors.downPaymentPercent = 'Down payment must be between 0% and 99.99%.';
  }

  if (input.annualRate < 0) {
    errors.annualRate = 'Annual interest rate cannot be negative.';
  }

  if (input.tenureMonths <= 0 || !Number.isInteger(input.tenureMonths)) {
    errors.tenureMonths = 'Tenure must be a positive integer in months.';
  }

  if (input.processingFeePercent < 0) {
    errors.processingFeePercent = 'Processing fee cannot be negative.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateHomeLoan(input: HomeLoanInput): HomeLoanResult {
  const downPayment = input.propertyValue * (input.downPaymentPercent / 100);
  const loanAmount = input.propertyValue - downPayment;
  
  const emiInput = {
    principal: loanAmount,
    annualRate: input.annualRate,
    tenureMonths: input.tenureMonths,
  };
  
  const emiResult = calculateEMI(emiInput);
  
  const processingFee = loanAmount * (input.processingFeePercent / 100);
  const stampDutyEstimate = input.propertyValue * 0.06; // Assuming average 6%
  const registrationCharges = input.propertyValue * 0.01; // Assuming 1%
  
  const totalCostOfOwnership = downPayment + emiResult.totalPayment + processingFee + stampDutyEstimate + registrationCharges;
  
  // Tax savings estimates per year (max limits)
  // Section 80C: Max 1.5L
  // Section 24(b): Max 2L
  // For estimation, assuming standard limits, we just take the first year values or max possible.
  // We'll calculate it properly in the yearly summary and just return the max theoretical for Result.
  // Actually, let's just return the theoretical maximum for a typical year.
  // Better yet, generate the first year's summary and use those.
  const yearlySummary = generateHomeLoanYearlySummary(input);
  const firstYear = yearlySummary[0] || { principalPaid: 0, interestPaid: 0 };
  
  const taxSaving80C = Math.min(firstYear.principalPaid, 150000) * 0.30;
  const taxSaving24b = Math.min(firstYear.interestPaid, 200000) * 0.30;
  
  return {
    loanAmount,
    downPayment,
    emi: emiResult.emi,
    totalPayment: emiResult.totalPayment,
    totalInterest: emiResult.totalInterest,
    processingFee,
    stampDutyEstimate,
    registrationCharges,
    totalCostOfOwnership,
    taxSaving80C,
    taxSaving24b,
  };
}

export function generateHomeLoanYearlySummary(input: HomeLoanInput): HomeLoanYearlySummary[] {
  const loanAmount = input.propertyValue * (1 - input.downPaymentPercent / 100);
  
  const emiInput = {
    principal: loanAmount,
    annualRate: input.annualRate,
    tenureMonths: input.tenureMonths,
  };
  
  const { emi } = calculateEMI(emiInput);
  const monthlyRate = input.annualRate / 12 / 100;
  
  const schedule: HomeLoanYearlySummary[] = [];
  
  let balance = loanAmount;
  let currentYear = 1;
  let yearlyPrincipal = 0;
  let yearlyInterest = 0;

  for (let month = 1; month <= input.tenureMonths; month++) {
    const interest = balance * monthlyRate;
    let principal = emi - interest;
    
    if (month === input.tenureMonths) {
      principal = balance;
    }
    
    balance = Math.max(0, balance - principal);
    yearlyPrincipal += principal;
    yearlyInterest += interest;
    
    if (month % 12 === 0 || month === input.tenureMonths) {
      schedule.push({
        year: currentYear,
        principalPaid: yearlyPrincipal,
        interestPaid: yearlyInterest,
        taxBenefit80C: Math.min(yearlyPrincipal, 150000) * 0.30,
        taxBenefit24b: Math.min(yearlyInterest, 200000) * 0.30,
        balance,
      });
      currentYear++;
      yearlyPrincipal = 0;
      yearlyInterest = 0;
    }
  }

  return schedule;
}
