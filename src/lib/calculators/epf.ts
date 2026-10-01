import { RATES } from '@/config/rates';

export interface EPFInput {
  monthlyBasicSalary: number; // Basic Salary + DA per month
  currentAge: number; // Employee's current age (e.g., 25)
  retirementAge?: number; // Default 58 (EPFO standard)
  annualSalaryGrowthPercent: number; // Expected annual salary hike (e.g., 5%)
  epfInterestRate?: number; // Annual EPF interest rate (default 8.25%)
  employeeContributionPercent?: number; // Default 12%
  currentEPFBalance?: number; // Starting accumulated EPF balance (default 0)
}

export interface EPFResult {
  totalEmployeeContribution: number;
  totalEmployerContribution: number;
  totalInterestEarned: number;
  totalCorpus: number;
  yearsToRetirement: number;
  finalMonthlySalary: number;
}

export interface EPFYearlyBreakdown {
  year: number;
  age: number;
  monthlySalary: number;
  annualEmployeeContrib: number;
  annualEmployerContrib: number;
  annualTotalContrib: number;
  interestEarned: number;
  closingBalance: number;
}

export function validateEPFInput(input: EPFInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.monthlyBasicSalary <= 0 || isNaN(input.monthlyBasicSalary)) {
    errors.monthlyBasicSalary = 'Monthly basic salary must be greater than 0';
  }
  if (input.currentAge < 18 || input.currentAge > 65 || isNaN(input.currentAge)) {
    errors.currentAge = 'Current age must be between 18 and 65 years';
  }
  const retirementAge = input.retirementAge ?? 58;
  if (retirementAge <= input.currentAge || retirementAge > 75) {
    errors.retirementAge = `Retirement age must be greater than current age (${input.currentAge}) and up to 75`;
  }
  if (input.annualSalaryGrowthPercent < 0 || input.annualSalaryGrowthPercent > 50 || isNaN(input.annualSalaryGrowthPercent)) {
    errors.annualSalaryGrowthPercent = 'Annual salary growth must be between 0% and 50%';
  }
  if (input.epfInterestRate !== undefined && (input.epfInterestRate < 0 || input.epfInterestRate > 20)) {
    errors.epfInterestRate = 'Interest rate must be between 0% and 20%';
  }
  if (input.currentEPFBalance !== undefined && input.currentEPFBalance < 0) {
    errors.currentEPFBalance = 'Current EPF balance cannot be negative';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates projected EPF corpus from current age to retirement age.
 * EPFO Rule:
 * - Employee contributes 12% of Basic + DA
 * - Employer contributes 12%: 3.67% goes to EPF, 8.33% goes to EPS (capped at ₹15,000 wage ceiling = ₹1,250/mo)
 *   If Basic > ₹15,000 and EPS is capped: Employer EPF = 12% of Basic - ₹1,250.
 *   Alternatively, if full 3.67% is taken: Employer EPF = 3.67% of Basic. Standard formula uses 3.67% to EPF.
 * - Interest is calculated monthly on running balance and credited annually.
 */
export function calculateEPF(input: EPFInput): EPFResult {
  const retirementAge = input.retirementAge ?? 58;
  const interestRate = input.epfInterestRate ?? RATES.epf.interestRate.value;
  const eePercent = input.employeeContributionPercent ?? RATES.epf.employeeContributionPercent.value;
  const erPercent = RATES.epf.employerEPFPercent.value; // 3.67%
  const salaryGrowthRate = input.annualSalaryGrowthPercent / 100;
  const monthlyInterestRate = interestRate / 100 / 12;

  let balance = Math.max(0, input.currentEPFBalance ?? 0);
  let currentMonthlySalary = Math.max(0, input.monthlyBasicSalary);
  const years = Math.max(0, retirementAge - input.currentAge);

  if (years === 0) {
    return {
      totalEmployeeContribution: 0,
      totalEmployerContribution: 0,
      totalInterestEarned: 0,
      totalCorpus: balance,
      yearsToRetirement: 0,
      finalMonthlySalary: currentMonthlySalary,
    };
  }

  let totalEeContrib = 0;
  let totalErContrib = 0;
  let totalInterest = 0;

  for (let y = 1; y <= years; y++) {
    const monthlyEe = (currentMonthlySalary * eePercent) / 100;
    const monthlyEr = (currentMonthlySalary * erPercent) / 100;
    const monthlyTotalContrib = monthlyEe + monthlyEr;

    let yearInterest = 0;
    for (let m = 1; m <= 12; m++) {
      balance += monthlyTotalContrib;
      totalEeContrib += monthlyEe;
      totalErContrib += monthlyEr;
      yearInterest += balance * monthlyInterestRate;
    }

    balance += yearInterest;
    totalInterest += yearInterest;

    if (y < years) {
      currentMonthlySalary *= 1 + salaryGrowthRate;
    }
  }

  return {
    totalEmployeeContribution: Math.round(totalEeContrib),
    totalEmployerContribution: Math.round(totalErContrib),
    totalInterestEarned: Math.round(totalInterest),
    totalCorpus: Math.round(balance),
    yearsToRetirement: years,
    finalMonthlySalary: Math.round(currentMonthlySalary),
  };
}

export function generateEPFYearlyBreakdown(input: EPFInput): EPFYearlyBreakdown[] {
  const retirementAge = input.retirementAge ?? 58;
  const interestRate = input.epfInterestRate ?? RATES.epf.interestRate.value;
  const eePercent = input.employeeContributionPercent ?? RATES.epf.employeeContributionPercent.value;
  const erPercent = RATES.epf.employerEPFPercent.value;
  const salaryGrowthRate = input.annualSalaryGrowthPercent / 100;
  const monthlyInterestRate = interestRate / 100 / 12;

  let balance = Math.max(0, input.currentEPFBalance ?? 0);
  let currentMonthlySalary = Math.max(0, input.monthlyBasicSalary);
  const years = Math.max(0, retirementAge - input.currentAge);
  const breakdown: EPFYearlyBreakdown[] = [];

  for (let y = 1; y <= years; y++) {
    const monthlyEe = (currentMonthlySalary * eePercent) / 100;
    const monthlyEr = (currentMonthlySalary * erPercent) / 100;
    const monthlyTotalContrib = monthlyEe + monthlyEr;

    const annualEe = monthlyEe * 12;
    const annualEr = monthlyEr * 12;
    const annualTotal = monthlyTotalContrib * 12;

    let yearInterest = 0;
    for (let m = 1; m <= 12; m++) {
      balance += monthlyTotalContrib;
      yearInterest += balance * monthlyInterestRate;
    }
    balance += yearInterest;

    breakdown.push({
      year: y,
      age: input.currentAge + y,
      monthlySalary: Math.round(currentMonthlySalary),
      annualEmployeeContrib: Math.round(annualEe),
      annualEmployerContrib: Math.round(annualEr),
      annualTotalContrib: Math.round(annualTotal),
      interestEarned: Math.round(yearInterest),
      closingBalance: Math.round(balance),
    });

    if (y < years) {
      currentMonthlySalary *= 1 + salaryGrowthRate;
    }
  }

  return breakdown;
}
