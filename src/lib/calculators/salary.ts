export interface SalaryInput {
  annualCTC: number;
  basicPercent: number;
  hraPercent: number;
  epfContribution: boolean;
  professionalTax: number;
  includeGratuity: boolean;
  taxRegime: 'old' | 'new';
}

export interface SalaryResult {
  monthlyCTC: number;
  monthlyBasic: number;
  monthlyHRA: number;
  monthlySpecialAllowance: number;
  monthlyEPFEmployee: number;
  monthlyEPFEmployer: number;
  monthlyProfessionalTax: number;
  monthlyGratuity: number;
  monthlyIncomeTax: number;
  monthlyInHand: number;
  annualInHand: number;
  annualTax: number;
  effectiveTaxRate: number;
}

export interface SalaryBreakdown {
  component: string;
  monthly: number;
  annual: number;
  type: 'earning' | 'deduction';
}

export function validateSalaryInput(input: SalaryInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.annualCTC <= 0) errors.annualCTC = 'Annual CTC must be greater than zero.';
  if (input.basicPercent < 0 || input.basicPercent > 100) errors.basicPercent = 'Basic percentage must be between 0 and 100.';
  if (input.hraPercent < 0 || input.hraPercent > 100) errors.hraPercent = 'HRA percentage must be between 0 and 100.';
  
  return { valid: Object.keys(errors).length === 0, errors };
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { annualCTC, basicPercent, hraPercent, epfContribution, professionalTax, includeGratuity, taxRegime } = input;
  
  const monthlyCTC = annualCTC / 12;
  const monthlyBasic = monthlyCTC * (basicPercent / 100);
  const monthlyHRA = monthlyBasic * (hraPercent / 100);
  
  // EPF Calculation
  let monthlyEPFEmployer = 0;
  let monthlyEPFEmployee = 0;
  if (epfContribution) {
    // Standard capped at 1800 (12% of 15000), or actual 12% if basic is lower
    const epfBase = Math.min(monthlyBasic, 15000);
    monthlyEPFEmployer = epfBase * 0.12;
    monthlyEPFEmployee = epfBase * 0.12;
  }
  
  // Gratuity
  const monthlyGratuity = includeGratuity ? (monthlyBasic * 4.81) / 100 : 0;
  
  // Special Allowance
  const monthlySpecialAllowance = Math.max(0, monthlyCTC - monthlyBasic - monthlyHRA - monthlyEPFEmployer - monthlyGratuity);
  
  // Gross Salary
  const monthlyGross = monthlyBasic + monthlyHRA + monthlySpecialAllowance;
  const annualGross = monthlyGross * 12;
  
  // Income Tax Calculation (Simplified for New Regime FY 25-26)
  let annualTax = 0;
  if (taxRegime === 'new') {
    const standardDeduction = 75000;
    const taxableIncome = Math.max(0, annualGross - standardDeduction);
    
    if (taxableIncome <= 700000) {
      annualTax = 0; // Rebate 87A
    } else {
      if (taxableIncome > 300000) annualTax += Math.min(taxableIncome - 300000, 400000) * 0.05;
      if (taxableIncome > 700000) annualTax += Math.min(taxableIncome - 700000, 300000) * 0.10;
      if (taxableIncome > 1000000) annualTax += Math.min(taxableIncome - 1000000, 200000) * 0.15;
      if (taxableIncome > 1200000) annualTax += Math.min(taxableIncome - 1200000, 300000) * 0.20;
      if (taxableIncome > 1500000) annualTax += (taxableIncome - 1500000) * 0.30;
      
      // Cess
      annualTax = annualTax * 1.04;
    }
  } else {
    // Old regime simplified fallback (Standard deduction 50k)
    const standardDeduction = 50000;
    const ptYearly = professionalTax * 12;
    // Assume full HRA exemption and 80C 1.5L for simplicity in this fallback mode if old regime
    let exemption = standardDeduction + ptYearly + 150000 + (monthlyHRA * 12);
    const taxableIncome = Math.max(0, annualGross - exemption);
    if (taxableIncome <= 500000) {
      annualTax = 0; // 87A
    } else {
      if (taxableIncome > 250000) annualTax += Math.min(taxableIncome - 250000, 250000) * 0.05;
      if (taxableIncome > 500000) annualTax += Math.min(taxableIncome - 500000, 500000) * 0.20;
      if (taxableIncome > 1000000) annualTax += (taxableIncome - 1000000) * 0.30;
      annualTax = annualTax * 1.04;
    }
  }
  
  const monthlyIncomeTax = annualTax / 12;
  const monthlyProfessionalTax = professionalTax;
  
  const monthlyInHand = monthlyGross - monthlyEPFEmployee - monthlyProfessionalTax - monthlyIncomeTax;
  const annualInHand = monthlyInHand * 12;
  const effectiveTaxRate = (annualTax / annualCTC) * 100;
  
  return {
    monthlyCTC,
    monthlyBasic,
    monthlyHRA,
    monthlySpecialAllowance,
    monthlyEPFEmployee,
    monthlyEPFEmployer,
    monthlyProfessionalTax,
    monthlyGratuity,
    monthlyIncomeTax,
    monthlyInHand,
    annualInHand,
    annualTax,
    effectiveTaxRate
  };
}

export function generateSalaryBreakdown(input: SalaryInput): SalaryBreakdown[] {
  const result = calculateSalary(input);
  return [
    { component: 'Basic Salary', monthly: result.monthlyBasic, annual: result.monthlyBasic * 12, type: 'earning' },
    { component: 'House Rent Allowance (HRA)', monthly: result.monthlyHRA, annual: result.monthlyHRA * 12, type: 'earning' },
    { component: 'Special Allowance', monthly: result.monthlySpecialAllowance, annual: result.monthlySpecialAllowance * 12, type: 'earning' },
    { component: 'Employee Provident Fund (EPF)', monthly: result.monthlyEPFEmployee, annual: result.monthlyEPFEmployee * 12, type: 'deduction' },
    { component: 'Professional Tax', monthly: result.monthlyProfessionalTax, annual: result.monthlyProfessionalTax * 12, type: 'deduction' },
    { component: 'Income Tax (TDS)', monthly: result.monthlyIncomeTax, annual: result.annualTax, type: 'deduction' }
  ];
}
