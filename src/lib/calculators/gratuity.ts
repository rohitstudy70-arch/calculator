import { RATES } from '@/config/rates';

export interface GratuityInput {
  monthlyBasicSalary: number; // Last drawn basic salary + DA
  yearsOfService: number; // Number of completed years (e.g., 5.8 years)
  isCoveredUnderAct: boolean; // Covered under Payment of Gratuity Act 1972 (default true)
}

export interface GratuityResult {
  totalGratuity: number;
  taxExemptGratuity: number;
  taxableGratuity: number;
  statutoryLimit: number;
  formulaUsed: string;
  formulaUsedHi: string;
  isEligibleForGratuity: boolean; // Must have completed min 5 years (except death/disability)
  effectiveTenureYears: number; // Rounded years used in formula
}

export function validateGratuityInput(input: GratuityInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.monthlyBasicSalary <= 0 || isNaN(input.monthlyBasicSalary)) {
    errors.monthlyBasicSalary = 'Last drawn salary must be greater than 0';
  }
  if (input.yearsOfService <= 0 || input.yearsOfService > 60 || isNaN(input.yearsOfService)) {
    errors.yearsOfService = 'Years of service must be between 1 and 60';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates statutory gratuity payout and tax-exempt portion under Section 10(10).
 *
 * Case A: Covered under Payment of Gratuity Act 1972:
 * Gratuity = (15 * Last Drawn Basic+DA * Tenure in Years) / 26
 * Rule: Service > 6 months in a year is rounded up to the next full year (e.g. 5 yrs 7 mos = 6 yrs).
 *
 * Case B: Not covered under the Act:
 * Gratuity = (15 * Last Drawn Basic+DA * Completed Years) / 30 = (0.5 * Basic+DA * Completed Years)
 * Rule: Only fully completed years are counted (fractional months ignored).
 *
 * Statutory Tax-Free Limit = ₹20,00,000 (from config/rates.ts)
 */
export function calculateGratuity(input: GratuityInput): GratuityResult {
  const salary = Math.max(0, input.monthlyBasicSalary);
  const rawYears = Math.max(0, input.yearsOfService);
  const minYears = RATES.gratuity.minServiceYears.value;
  const statutoryLimit = RATES.gratuity.taxExemptLimit.value;

  const isEligible = rawYears >= minYears;

  let effectiveYears = 0;
  let gratuityAmount = 0;
  let formulaEn = '';
  let formulaHi = '';

  if (input.isCoveredUnderAct) {
    // Rounding rule: fraction >= 0.5 (or > 6 months) rounds up to next full integer year
    const fullYears = Math.floor(rawYears);
    const fraction = rawYears - fullYears;
    effectiveYears = fraction >= 0.5 ? fullYears + 1 : fullYears;

    gratuityAmount = (15 * salary * effectiveYears) / RATES.gratuity.workingDaysPerMonth.value; // / 26
    formulaEn = `(15 × Last Drawn Salary ₹${salary.toLocaleString('en-IN')} × ${effectiveYears} Years) ÷ 26`;
    formulaHi = `(15 × अंतिम आहरित वेतन ₹${salary.toLocaleString('en-IN')} × ${effectiveYears} वर्ष) ÷ 26`;
  } else {
    // Only completed full years count
    effectiveYears = Math.floor(rawYears);
    gratuityAmount = 0.5 * salary * effectiveYears; // or (15 * salary * effectiveYears) / 30
    formulaEn = `(15 × Last Drawn Salary ₹${salary.toLocaleString('en-IN')} × ${effectiveYears} Completed Years) ÷ 30`;
    formulaHi = `(15 × अंतिम आहरित वेतन ₹${salary.toLocaleString('en-IN')} × ${effectiveYears} पूर्ण वर्ष) ÷ 30`;
  }

  const roundedGratuity = Math.round(gratuityAmount);
  const taxExemptGratuity = Math.min(roundedGratuity, statutoryLimit);
  const taxableGratuity = Math.max(0, roundedGratuity - taxExemptGratuity);

  return {
    totalGratuity: roundedGratuity,
    taxExemptGratuity,
    taxableGratuity,
    statutoryLimit,
    formulaUsed: formulaEn,
    formulaUsedHi: formulaHi,
    isEligibleForGratuity: isEligible,
    effectiveTenureYears: effectiveYears,
  };
}
