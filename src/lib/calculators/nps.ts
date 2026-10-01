import { RATES } from '@/config/rates';

export interface NPSInput {
  monthlyInvestment: number; // Monthly contribution in INR (e.g. ₹5,000)
  currentAge: number; // e.g. 30
  retirementAge?: number; // default 60 (PFRDA standard)
  expectedReturnRate?: number; // annual return % (default 10%)
  annuityPercent?: number; // % to reinvest in annuity (min 40%, default 40%)
  expectedAnnuityReturnRate?: number; // annual return on annuity % (default 6%)
}

export interface NPSResult {
  totalInvestment: number; // Total principal invested
  totalInterestEarned: number; // Wealth gain from market
  totalCorpus: number; // Total maturity corpus at retirement
  lumpsumAmount: number; // Tax-free lump sum withdrawal (e.g. 60%)
  annuityAmount: number; // Reinvested in annuity plan (e.g. 40%)
  estimatedMonthlyPension: number; // Monthly pension payout from annuity
  yearsToRetirement: number;
}

export interface NPSYearlyBreakdown {
  year: number;
  age: number;
  totalInvested: number;
  interestEarned: number;
  totalCorpus: number;
}

export function validateNPSInput(input: NPSInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.monthlyInvestment < 500 || input.monthlyInvestment > 10000000 || isNaN(input.monthlyInvestment)) {
    errors.monthlyInvestment = 'Monthly investment must be at least ₹500';
  }
  if (input.currentAge < 18 || input.currentAge >= 60 || isNaN(input.currentAge)) {
    errors.currentAge = 'Current age must be between 18 and 59 years';
  }
  const retirementAge = input.retirementAge ?? 60;
  if (retirementAge <= input.currentAge || retirementAge > 75) {
    errors.retirementAge = `Retirement age must be greater than current age (${input.currentAge}) and up to 75`;
  }
  const expectedReturn = input.expectedReturnRate ?? RATES.nps.defaultExpectedReturnRate.value;
  if (expectedReturn < 0 || expectedReturn > 30 || isNaN(expectedReturn)) {
    errors.expectedReturnRate = 'Expected return rate must be between 0% and 30%';
  }
  const annuityPercent = input.annuityPercent ?? RATES.nps.minAnnuityPercent.value;
  if (annuityPercent < RATES.nps.minAnnuityPercent.value || annuityPercent > 100 || isNaN(annuityPercent)) {
    errors.annuityPercent = `Annuity percentage must be at least ${RATES.nps.minAnnuityPercent.value}% and up to 100%`;
  }
  const annuityRate = input.expectedAnnuityReturnRate ?? RATES.nps.defaultAnnuityReturnRate.value;
  if (annuityRate < 0 || annuityRate > 20 || isNaN(annuityRate)) {
    errors.expectedAnnuityReturnRate = 'Annuity return rate must be between 0% and 20%';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates NPS accumulation and pension using standard monthly annuity compounding.
 * Total Corpus = P * [((1 + r)^n - 1) / r] * (1 + r)
 * where P = monthly deposit, r = monthly rate, n = total months
 */
export function calculateNPS(input: NPSInput): NPSResult {
  const retirementAge = input.retirementAge ?? 60;
  const returnRate = input.expectedReturnRate ?? RATES.nps.defaultExpectedReturnRate.value;
  const annuityPercent = input.annuityPercent ?? RATES.nps.minAnnuityPercent.value;
  const annuityReturnRate = input.expectedAnnuityReturnRate ?? RATES.nps.defaultAnnuityReturnRate.value;

  const years = Math.max(0, retirementAge - input.currentAge);
  const months = years * 12;

  if (months === 0 || input.monthlyInvestment <= 0) {
    return {
      totalInvestment: 0,
      totalInterestEarned: 0,
      totalCorpus: 0,
      lumpsumAmount: 0,
      annuityAmount: 0,
      estimatedMonthlyPension: 0,
      yearsToRetirement: 0,
    };
  }

  const monthlyRate = returnRate / 100 / 12;
  let totalCorpus = 0;

  if (monthlyRate === 0) {
    totalCorpus = input.monthlyInvestment * months;
  } else {
    totalCorpus =
      input.monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
  }

  const totalInvestment = input.monthlyInvestment * months;
  const totalInterestEarned = Math.max(0, totalCorpus - totalInvestment);
  const annuityAmount = (totalCorpus * annuityPercent) / 100;
  const lumpsumAmount = totalCorpus - annuityAmount;

  // Monthly pension = (Annuity Corpus * Annual Annuity Rate) / 12
  const estimatedMonthlyPension = (annuityAmount * (annuityReturnRate / 100)) / 12;

  return {
    totalInvestment: Math.round(totalInvestment),
    totalInterestEarned: Math.round(totalInterestEarned),
    totalCorpus: Math.round(totalCorpus),
    lumpsumAmount: Math.round(lumpsumAmount),
    annuityAmount: Math.round(annuityAmount),
    estimatedMonthlyPension: Math.round(estimatedMonthlyPension),
    yearsToRetirement: years,
  };
}

export function generateNPSYearlyBreakdown(input: NPSInput): NPSYearlyBreakdown[] {
  const retirementAge = input.retirementAge ?? 60;
  const returnRate = input.expectedReturnRate ?? RATES.nps.defaultExpectedReturnRate.value;
  const years = Math.max(0, retirementAge - input.currentAge);
  const monthlyRate = returnRate / 100 / 12;

  const breakdown: NPSYearlyBreakdown[] = [];
  let cumulativeInvested = 0;
  let currentBalance = 0;

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      cumulativeInvested += input.monthlyInvestment;
      currentBalance = (currentBalance + input.monthlyInvestment) * (1 + monthlyRate);
    }

    breakdown.push({
      year: y,
      age: input.currentAge + y,
      totalInvested: Math.round(cumulativeInvested),
      interestEarned: Math.round(Math.max(0, currentBalance - cumulativeInvested)),
      totalCorpus: Math.round(currentBalance),
    });
  }

  return breakdown;
}
