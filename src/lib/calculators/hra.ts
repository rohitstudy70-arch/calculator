import { RATES } from '@/config/rates';

export interface HRAInput {
  basicSalaryMonthly: number; // Basic Salary per month
  daMonthly?: number; // Dearness Allowance per month (optional, default 0)
  hraReceivedMonthly: number; // HRA received from employer per month
  rentPaidMonthly: number; // Actual rent paid per month
  isMetroCity: boolean; // True for Delhi, Mumbai, Kolkata, Chennai (50%), False for others (40%)
}

export interface HRAResult {
  monthlyExemptHRA: number;
  monthlyTaxableHRA: number;
  annualExemptHRA: number;
  annualTaxableHRA: number;
  actualHRAReceived: number;
  cityLimitAmount: number;
  rentExcessAmount: number;
  appliedLimitType: 'actual_hra' | 'city_percentage' | 'rent_excess';
  appliedLimitDescription: string;
  appliedLimitDescriptionHi: string;
  estimatedTaxSavedAnnual: number; // Estimated tax saved in 30% old regime bracket
}

export function validateHRAInput(input: HRAInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.basicSalaryMonthly < 0 || isNaN(input.basicSalaryMonthly)) {
    errors.basicSalaryMonthly = 'Basic salary must be non-negative';
  }
  if (input.daMonthly !== undefined && (input.daMonthly < 0 || isNaN(input.daMonthly))) {
    errors.daMonthly = 'DA must be non-negative';
  }
  if (input.hraReceivedMonthly < 0 || isNaN(input.hraReceivedMonthly)) {
    errors.hraReceivedMonthly = 'HRA received must be non-negative';
  }
  if (input.rentPaidMonthly < 0 || isNaN(input.rentPaidMonthly)) {
    errors.rentPaidMonthly = 'Rent paid must be non-negative';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates HRA exemption under Section 10(13A) and Rule 2A of the Income Tax Act.
 * Exemption is the LEAST of three limits:
 * 1. Actual HRA received
 * 2. 50% of (Basic + DA) for Metro cities OR 40% of (Basic + DA) for Non-Metro cities
 * 3. Actual Rent Paid minus 10% of (Basic + DA)
 */
export function calculateHRA(input: HRAInput): HRAResult {
  const basicPlusDA = Math.max(0, input.basicSalaryMonthly) + Math.max(0, input.daMonthly ?? 0);
  const hraReceived = Math.max(0, input.hraReceivedMonthly);
  const rentPaid = Math.max(0, input.rentPaidMonthly);

  // Condition 1: Actual HRA received
  const limit1 = hraReceived;

  // Condition 2: 50% for Metro, 40% for Non-Metro
  const cityPercent = input.isMetroCity
    ? RATES.hra.metroCityPercent.value
    : RATES.hra.nonMetroCityPercent.value;
  const limit2 = (basicPlusDA * cityPercent) / 100;

  // Condition 3: Rent paid in excess of 10% of salary
  const tenPercentSalary = (basicPlusDA * RATES.hra.rentExcessPercent.value) / 100;
  const limit3 = Math.max(0, rentPaid - tenPercentSalary);

  // If rent paid is 0 or less than 10% of salary, exemption is 0
  let monthlyExempt = 0;
  let appliedType: 'actual_hra' | 'city_percentage' | 'rent_excess' = 'actual_hra';
  let descEn = '';
  let descHi = '';

  if (rentPaid === 0 || rentPaid <= tenPercentSalary) {
    monthlyExempt = 0;
    appliedType = 'rent_excess';
    descEn = 'Rent paid is less than or equal to 10% of Basic salary, resulting in ₹0 exemption.';
    descHi = 'चुकाया गया किराया मूल वेतन के 10% से कम या बराबर है, इसलिए ₹0 छूट लागू होती है।';
  } else {
    const minVal = Math.min(limit1, limit2, limit3);
    monthlyExempt = minVal;

    if (minVal === limit1) {
      appliedType = 'actual_hra';
      descEn = `Condition 1 Applied: Actual HRA received (₹${Math.round(limit1).toLocaleString('en-IN')}) is the lowest limit.`;
      descHi = `शर्त 1 लागू: प्राप्त वास्तविक एचआरए (₹${Math.round(limit1).toLocaleString('en-IN')}) सबसे कम सीमा है।`;
    } else if (minVal === limit2) {
      appliedType = 'city_percentage';
      descEn = `Condition 2 Applied: ${cityPercent}% of (Basic + DA) for ${input.isMetroCity ? 'Metro' : 'Non-Metro'} (₹${Math.round(limit2).toLocaleString('en-IN')}) is the lowest limit.`;
      descHi = `शर्त 2 लागू: ${input.isMetroCity ? 'मेट्रो' : 'गैर-मेट्रो'} के लिए (मूल + महंगाई भत्ता) का ${cityPercent}% (₹${Math.round(limit2).toLocaleString('en-IN')}) सबसे कम सीमा है।`;
    } else {
      appliedType = 'rent_excess';
      descEn = `Condition 3 Applied: Rent paid excess over 10% of salary (₹${Math.round(limit3).toLocaleString('en-IN')}) is the lowest limit.`;
      descHi = `शर्त 3 लागू: वेतन के 10% से अधिक चुकाया गया किराया (₹${Math.round(limit3).toLocaleString('en-IN')}) सबसे कम सीमा है।`;
    }
  }

  const monthlyTaxable = Math.max(0, hraReceived - monthlyExempt);
  const annualExempt = monthlyExempt * 12;
  const annualTaxable = monthlyTaxable * 12;
  const estimatedTaxSaved = Math.round(annualExempt * 0.312); // ~30% bracket + 4% cess

  return {
    monthlyExemptHRA: Math.round(monthlyExempt),
    monthlyTaxableHRA: Math.round(monthlyTaxable),
    annualExemptHRA: Math.round(annualExempt),
    annualTaxableHRA: Math.round(annualTaxable),
    actualHRAReceived: Math.round(hraReceived * 12),
    cityLimitAmount: Math.round(limit2 * 12),
    rentExcessAmount: Math.round(limit3 * 12),
    appliedLimitType: appliedType,
    appliedLimitDescription: descEn,
    appliedLimitDescriptionHi: descHi,
    estimatedTaxSavedAnnual: estimatedTaxSaved,
  };
}
