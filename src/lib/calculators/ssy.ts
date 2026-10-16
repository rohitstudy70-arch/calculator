/**
 * Sukanya Samriddhi Yojana (SSY) Calculation Engine
 * 
 * Rules as per Ministry of Finance & Post Office (India):
 * - Account matures in 21 years from account opening.
 * - Deposits are mandatory for the first 15 years only.
 * - Years 16 to 21 (6 years): No deposits required; interest continues to compound annually.
 * - Current interest rate: 8.2% p.a. (FY 2024-25 / FY 2025-26, compounded annually).
 * - Minimum deposit: ₹250/year. Maximum deposit: ₹1,50,000/year (Section 80C exempt).
 * - Triple tax exemption: EEE (Exempt on investment, interest, and maturity withdrawal).
 */

export type SSYDepositFrequency = 'yearly' | 'monthly';

export interface SSYInput {
  depositAmount: number;         // Amount per deposit (yearly or monthly)
  frequency: SSYDepositFrequency; // 'yearly' | 'monthly'
  girlAge: number;               // Girl child age at opening (0 to 10 years)
  startYear?: number;            // Opening year (default current year)
  interestRate?: number;         // Annual interest rate % (default 8.2)
}

export interface SSYYearlyBreakdown {
  year: number;                  // 1 to 21
  calendarYear: number;          // e.g. 2026
  girlAge: number;               // Age in that year
  openingBalance: number;        // Start of year balance
  depositAmount: number;         // Deposit during that year (0 for years 16-21)
  deposit: number;               // Convenience alias for depositAmount
  interestEarned: number;        // Interest accrued in that year
  closingBalance: number;        // Balance at end of year
}

export interface SSYResult {
  totalDeposited: number;        // Total money deposited over 15 years
  totalInvested: number;         // Convenience alias for totalDeposited
  totalInterest: number;         // Total compound interest earned across 21 years
  maturityAmount: number;        // Final maturity payout at year 21
  maturityYear: number;          // Calendar year when 21 years complete
  depositEndYear: number;        // Calendar year when 15 years of deposits end
  depositTenureYears: number;    // 15
  maturityYears: number;         // 21
  girlAgeAtMaturity: number;     // Girl's age at maturity (girlAge + 21)
  annualTaxSaving80C: number;    // Annual 80C tax saved (up to ₹1.5L @ 30% bracket)
  taxSaved80C: number;           // Convenience alias for annualTaxSaving80C
  interestRateApplied: number;   // Rate used (e.g. 8.2)
}

export const SSY_DEFAULT_RATE = 8.2;
export const SSY_MIN_ANNUAL = 250;
export const SSY_MAX_ANNUAL = 150000;
export const SSY_DEPOSIT_YEARS = 15;
export const SSY_MATURITY_YEARS = 21;

export function validateSSYInput(input: SSYInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const annualEquivalent = input.frequency === 'monthly' ? input.depositAmount * 12 : input.depositAmount;

  if (annualEquivalent < SSY_MIN_ANNUAL) {
    errors.depositAmount = `Minimum deposit is ₹${SSY_MIN_ANNUAL} per year.`;
  } else if (annualEquivalent > SSY_MAX_ANNUAL) {
    errors.depositAmount = `Maximum allowable deposit is ₹1,50,000 per financial year under Section 80C.`;
  }

  if (input.girlAge < 0 || input.girlAge > 10) {
    errors.girlAge = 'Eligible girl child age for SSY is from 0 to 10 years at account opening.';
  }

  const rate = input.interestRate ?? SSY_DEFAULT_RATE;
  if (rate <= 0 || rate > 15) {
    errors.interestRate = 'Interest rate must be between 1% and 15%.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateSSY(input: SSYInput): SSYResult {
  const rate = input.interestRate ?? SSY_DEFAULT_RATE;
  const r = rate / 100;
  const startYear = input.startYear ?? new Date().getFullYear();
  const annualDeposit = input.frequency === 'monthly' ? input.depositAmount * 12 : input.depositAmount;

  let balance = 0;
  let totalDeposited = 0;

  for (let year = 1; year <= SSY_MATURITY_YEARS; year++) {
    const isDepositYear = year <= SSY_DEPOSIT_YEARS;
    const yearDeposit = isDepositYear ? annualDeposit : 0;
    totalDeposited += yearDeposit;

    // Annual deposit made at beginning of year / compounded annually
    // Interest earned in this year on (balance + deposit)
    const effectivePrincipal = balance + yearDeposit;
    const yearInterest = Math.round(effectivePrincipal * r);
    balance = effectivePrincipal + yearInterest;
  }

  const maturityAmount = balance;
  const totalInterest = maturityAmount - totalDeposited;
  const eligible80C = Math.min(annualDeposit, SSY_MAX_ANNUAL);
  const annualTaxSaving80C = Math.round(eligible80C * 0.312); // 30% tax slab + 4% cess

  return {
    totalDeposited,
    totalInvested: totalDeposited,
    totalInterest,
    maturityAmount,
    maturityYear: startYear + SSY_MATURITY_YEARS,
    depositEndYear: startYear + SSY_DEPOSIT_YEARS,
    depositTenureYears: SSY_DEPOSIT_YEARS,
    maturityYears: SSY_MATURITY_YEARS,
    girlAgeAtMaturity: input.girlAge + SSY_MATURITY_YEARS,
    annualTaxSaving80C,
    taxSaved80C: annualTaxSaving80C,
    interestRateApplied: rate,
  };
}

export function generateSSYYearlyBreakdown(input: SSYInput): SSYYearlyBreakdown[] {
  const rate = input.interestRate ?? SSY_DEFAULT_RATE;
  const r = rate / 100;
  const startYear = input.startYear ?? new Date().getFullYear();
  const annualDeposit = input.frequency === 'monthly' ? input.depositAmount * 12 : input.depositAmount;

  const breakdown: SSYYearlyBreakdown[] = [];
  let balance = 0;

  for (let year = 1; year <= SSY_MATURITY_YEARS; year++) {
    const openingBalance = balance;
    const isDepositYear = year <= SSY_DEPOSIT_YEARS;
    const depositAmount = isDepositYear ? annualDeposit : 0;

    const effectivePrincipal = openingBalance + depositAmount;
    const interestEarned = Math.round(effectivePrincipal * r);
    const closingBalance = effectivePrincipal + interestEarned;
    balance = closingBalance;

    breakdown.push({
      year,
      calendarYear: startYear + year - 1,
      girlAge: input.girlAge + year,
      openingBalance,
      depositAmount,
      deposit: depositAmount,
      interestEarned,
      closingBalance,
    });
  }

  return breakdown;
}
