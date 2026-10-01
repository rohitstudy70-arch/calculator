import { calculateEPF, generateEPFYearlyBreakdown, validateEPFInput } from '@/lib/calculators/epf';

describe('EPF Calculator', () => {
  // Case 1: Basic ₹25,000, Age 25 to 58 (33 yrs), 5% growth, 8.25% interest rate
  // Source: EPFO compounding formula simulation
  it('calculates EPF corpus for ₹25,000 basic at 8.25% interest with 5% salary growth', () => {
    const res = calculateEPF({
      monthlyBasicSalary: 25000,
      currentAge: 25,
      retirementAge: 58,
      annualSalaryGrowthPercent: 5,
      epfInterestRate: 8.25,
      currentEPFBalance: 0,
    });

    expect(res.yearsToRetirement).toBe(33);
    expect(res.totalEmployeeContribution).toBeGreaterThan(2000000);
    expect(res.totalEmployerContribution).toBeGreaterThan(600000);
    expect(res.totalCorpus).toBeGreaterThan(12000000); // ~1.31 Crore corpus over 33 years
    expect(res.totalCorpus).toBeCloseTo(13113187, -4);
  });

  // Case 2: Constant salary (0% growth), 1 year verification
  // Monthly Basic = ₹10,000
  // Employee 12% = ₹1,200/mo, Employer 3.67% = ₹367/mo => Total ₹1,567/mo
  // 12 months total deposit = ₹18,804
  // Plus monthly interest on running balance at 8.25%/yr
  it('calculates 1 year basic case accurately with constant salary', () => {
    const res = calculateEPF({
      monthlyBasicSalary: 10000,
      currentAge: 57,
      retirementAge: 58,
      annualSalaryGrowthPercent: 0,
      epfInterestRate: 8.25,
      currentEPFBalance: 0,
    });

    expect(res.yearsToRetirement).toBe(1);
    expect(res.totalEmployeeContribution).toBe(14400); // 1200 * 12
    expect(res.totalEmployerContribution).toBe(4404); // 367 * 12
    expect(res.totalCorpus).toBeGreaterThan(18804);
    expect(res.totalInterestEarned).toBeGreaterThan(800);
  });

  // Case 3: Starting with existing balance of ₹5,00,000
  it('incorporates existing balance with interest accumulation', () => {
    const withBal = calculateEPF({
      monthlyBasicSalary: 50000,
      currentAge: 30,
      retirementAge: 58,
      annualSalaryGrowthPercent: 7,
      epfInterestRate: 8.25,
      currentEPFBalance: 500000,
    });

    const withoutBal = calculateEPF({
      monthlyBasicSalary: 50000,
      currentAge: 30,
      retirementAge: 58,
      annualSalaryGrowthPercent: 7,
      epfInterestRate: 8.25,
      currentEPFBalance: 0,
    });

    expect(withBal.totalCorpus).toBeGreaterThan(withoutBal.totalCorpus);
  });

  // Case 4: Edge Case - 0% interest rate
  it('handles 0% interest rate edge case', () => {
    const res = calculateEPF({
      monthlyBasicSalary: 20000,
      currentAge: 40,
      retirementAge: 45,
      annualSalaryGrowthPercent: 0,
      epfInterestRate: 0,
      currentEPFBalance: 0,
    });

    expect(res.totalInterestEarned).toBe(0);
    expect(res.totalCorpus).toBe(res.totalEmployeeContribution + res.totalEmployerContribution);
  });

  // Case 5: Yearly breakdown generation
  it('generates correct number of breakdown rows', () => {
    const breakdown = generateEPFYearlyBreakdown({
      monthlyBasicSalary: 30000,
      currentAge: 30,
      retirementAge: 40,
      annualSalaryGrowthPercent: 5,
      epfInterestRate: 8.25,
    });

    expect(breakdown.length).toBe(10);
    expect(breakdown[0].age).toBe(31);
    expect(breakdown[9].age).toBe(40);
  });

  // Case 6: Input validation
  it('validates invalid inputs properly', () => {
    expect(validateEPFInput({ monthlyBasicSalary: -1000, currentAge: 25, annualSalaryGrowthPercent: 5 }).valid).toBe(false);
    expect(validateEPFInput({ monthlyBasicSalary: 25000, currentAge: 15, annualSalaryGrowthPercent: 5 }).valid).toBe(false);
    expect(validateEPFInput({ monthlyBasicSalary: 25000, currentAge: 60, retirementAge: 55, annualSalaryGrowthPercent: 5 }).valid).toBe(false);
  });
});
