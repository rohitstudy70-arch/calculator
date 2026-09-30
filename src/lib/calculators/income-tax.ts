export type TaxRegime = 'old' | 'new';

export interface IncomeTaxInput {
  grossIncome: number;
  regime: TaxRegime;
  deduction80C: number;
  deduction80D: number;
  deduction80CCD: number;
  hraExemption: number;
  homeLoanInterest: number;
  otherDeductions: number;
  age: 'below60' | '60to80' | 'above80';
}

export interface IncomeTaxResult {
  grossIncome: number;
  standardDeduction: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate87A: number;
  taxAfterRebate: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveTaxRate: number;
  monthlyTax: number;
  monthlyIncomeAfterTax: number;
}

export interface TaxSlabBreakdown {
  slab: string;
  rate: string;
  taxableAmount: number;
  taxAmount: number;
}

export interface RegimeComparison {
  oldRegimeTax: number;
  newRegimeTax: number;
  savings: number;
  betterRegime: TaxRegime;
}

export function validateIncomeTaxInput(input: IncomeTaxInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.grossIncome < 0) {
    errors.grossIncome = 'Gross income cannot be negative';
  }
  if (input.deduction80C < 0 || input.deduction80C > 150000) {
    errors.deduction80C = '80C deduction must be between 0 and 1,50,000';
  }
  if (input.deduction80D < 0) {
    errors.deduction80D = '80D deduction cannot be negative';
  }
  if (input.deduction80CCD < 0 || input.deduction80CCD > 50000) {
    errors.deduction80CCD = '80CCD(1B) deduction must be between 0 and 50,000';
  }
  if (input.hraExemption < 0) {
    errors.hraExemption = 'HRA exemption cannot be negative';
  }
  if (input.homeLoanInterest < 0) {
    errors.homeLoanInterest = 'Home loan interest cannot be negative';
  }
  if (input.otherDeductions < 0) {
    errors.otherDeductions = 'Other deductions cannot be negative';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function calculateIncomeTax(input: IncomeTaxInput): IncomeTaxResult {
  let standardDeduction = 0;
  let customDeductions = 0;

  if (input.regime === 'new') {
    standardDeduction = 75000;
  } else {
    standardDeduction = 50000;
    customDeductions =
      Math.min(input.deduction80C, 150000) +
      input.deduction80D +
      Math.min(input.deduction80CCD, 50000) +
      input.hraExemption +
      input.homeLoanInterest +
      input.otherDeductions;
  }

  // Calculate taxable income
  const totalDeductions = standardDeduction + customDeductions;
  let taxableIncome = input.grossIncome - totalDeductions;
  if (taxableIncome < 0) taxableIncome = 0;

  let taxBeforeRebate = 0;
  let rebate87A = 0;

  const slabs = generateSlabBreakdown({ ...input, grossIncome: taxableIncome + totalDeductions }); // Calculate tax through slab breakdown
  taxBeforeRebate = slabs.reduce((sum, slab) => sum + slab.taxAmount, 0);

  // Calculate rebate
  if (input.regime === 'new') {
    if (taxableIncome <= 700000) {
      rebate87A = taxBeforeRebate;
    }
  } else {
    if (taxableIncome <= 500000) {
      rebate87A = Math.min(taxBeforeRebate, 12500);
    }
  }

  const taxAfterRebate = taxBeforeRebate - rebate87A;

  // Calculate Surcharge
  let surchargeRate = 0;
  if (taxableIncome > 50000000) { // 5Cr+
    surchargeRate = 0.37;
  } else if (taxableIncome > 20000000) { // 2Cr - 5Cr
    surchargeRate = 0.25;
  } else if (taxableIncome > 10000000) { // 1Cr - 2Cr
    surchargeRate = 0.15;
  } else if (taxableIncome > 5000000) { // 50L - 1Cr
    surchargeRate = 0.10;
  }

  // NOTE: Simple surcharge calculation (without marginal relief for simplicity based on prompt)
  const surcharge = taxAfterRebate * surchargeRate;

  // Health and Education Cess
  const cess = (taxAfterRebate + surcharge) * 0.04;

  const totalTax = taxAfterRebate + surcharge + cess;
  
  // Prevent effective tax rate NaN if gross income is 0
  const effectiveTaxRate = input.grossIncome > 0 ? (totalTax / input.grossIncome) * 100 : 0;
  
  return {
    grossIncome: input.grossIncome,
    standardDeduction,
    totalDeductions,
    taxableIncome,
    taxBeforeRebate,
    rebate87A,
    taxAfterRebate,
    surcharge,
    cess,
    totalTax,
    effectiveTaxRate,
    monthlyTax: totalTax / 12,
    monthlyIncomeAfterTax: (input.grossIncome - totalTax) / 12
  };
}

export function generateSlabBreakdown(input: IncomeTaxInput): TaxSlabBreakdown[] {
  let standardDeduction = input.regime === 'new' ? 75000 : 50000;
  let customDeductions = 0;
  
  if (input.regime === 'old') {
    customDeductions =
      Math.min(input.deduction80C, 150000) +
      input.deduction80D +
      Math.min(input.deduction80CCD, 50000) +
      input.hraExemption +
      input.homeLoanInterest +
      input.otherDeductions;
  }

  let taxableIncome = input.grossIncome - (standardDeduction + customDeductions);
  if (taxableIncome < 0) taxableIncome = 0;

  const breakdown: TaxSlabBreakdown[] = [];
  let remainingIncome = taxableIncome;

  if (input.regime === 'new') {
    // New Regime Slabs (FY 2025-26)
    const newSlabs = [
      { limit: 300000, rate: 0, label: 'Up to ₹3L' },
      { limit: 400000, rate: 0.05, label: '₹3L to ₹7L' },
      { limit: 300000, rate: 0.10, label: '₹7L to ₹10L' },
      { limit: 200000, rate: 0.15, label: '₹10L to ₹12L' },
      { limit: 300000, rate: 0.20, label: '₹12L to ₹15L' },
      { limit: Infinity, rate: 0.30, label: 'Above ₹15L' }
    ];

    for (const slab of newSlabs) {
      if (remainingIncome <= 0) break;
      const taxableInThisSlab = Math.min(remainingIncome, slab.limit);
      const taxAmount = taxableInThisSlab * slab.rate;
      
      breakdown.push({
        slab: slab.label,
        rate: `${slab.rate * 100}%`,
        taxableAmount: taxableInThisSlab,
        taxAmount
      });
      remainingIncome -= taxableInThisSlab;
    }
  } else {
    // Old Regime Slabs (Depends on age)
    let exemptionLimit = 250000;
    if (input.age === '60to80') exemptionLimit = 300000;
    if (input.age === 'above80') exemptionLimit = 500000;

    const oldSlabs = [];
    
    // First slab (exempt)
    oldSlabs.push({ limit: exemptionLimit, rate: 0, label: `Up to ₹${exemptionLimit / 100000}L` });
    
    // Second slab (up to 5L)
    if (exemptionLimit < 500000) {
      oldSlabs.push({ limit: 500000 - exemptionLimit, rate: 0.05, label: `₹${exemptionLimit / 100000}L to ₹5L` });
    }
    
    // Third slab (5L to 10L)
    oldSlabs.push({ limit: 500000, rate: 0.20, label: '₹5L to ₹10L' });
    
    // Final slab (Above 10L)
    oldSlabs.push({ limit: Infinity, rate: 0.30, label: 'Above ₹10L' });

    for (const slab of oldSlabs) {
      if (remainingIncome <= 0) break;
      const taxableInThisSlab = Math.min(remainingIncome, slab.limit);
      const taxAmount = taxableInThisSlab * slab.rate;
      
      breakdown.push({
        slab: slab.label,
        rate: `${slab.rate * 100}%`,
        taxableAmount: taxableInThisSlab,
        taxAmount
      });
      remainingIncome -= taxableInThisSlab;
    }
  }

  return breakdown;
}

export function compareRegimes(input: IncomeTaxInput): RegimeComparison {
  const newRegimeInput: IncomeTaxInput = { ...input, regime: 'new' };
  const oldRegimeInput: IncomeTaxInput = { ...input, regime: 'old' };

  const newTaxResult = calculateIncomeTax(newRegimeInput);
  const oldTaxResult = calculateIncomeTax(oldRegimeInput);

  const savings = Math.abs(oldTaxResult.totalTax - newTaxResult.totalTax);
  const betterRegime = newTaxResult.totalTax <= oldTaxResult.totalTax ? 'new' : 'old';

  return {
    newRegimeTax: newTaxResult.totalTax,
    oldRegimeTax: oldTaxResult.totalTax,
    savings,
    betterRegime
  };
}
