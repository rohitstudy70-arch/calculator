import { calculateGratuity, validateGratuityInput } from '@/lib/calculators/gratuity';

describe('Gratuity Calculator', () => {
  // Case 1: Covered under Act - 10 years service, ₹50,000 last drawn basic+DA
  // Formula: (15 * 50,000 * 10) / 26 = 7,500,000 / 26 = ₹2,88,461.53 -> ₹2,88,462
  // Source: Payment of Gratuity Act 1972 Section 4(2)
  it('calculates gratuity for covered employee with 10 years of service', () => {
    const res = calculateGratuity({
      monthlyBasicSalary: 50000,
      yearsOfService: 10,
      isCoveredUnderAct: true,
    });

    expect(res.isEligibleForGratuity).toBe(true);
    expect(res.effectiveTenureYears).toBe(10);
    expect(res.totalGratuity).toBe(288462);
    expect(res.taxExemptGratuity).toBe(288462);
    expect(res.taxableGratuity).toBe(0);
  });

  // Case 2: Covered under Act with 6-month rounding (e.g. 5 years 8 months = 5.67 years -> rounded to 6 years)
  // Formula: (15 * 60,000 * 6) / 26 = 5,400,000 / 26 = ₹2,07,692.30 -> ₹2,07,692
  it('rounds up service > 6 months to next full year for covered employees', () => {
    const res = calculateGratuity({
      monthlyBasicSalary: 60000,
      yearsOfService: 5.67, // > 5.5 years (5 years 8 months)
      isCoveredUnderAct: true,
    });

    expect(res.effectiveTenureYears).toBe(6);
    expect(res.totalGratuity).toBe(207692);
  });

  // Case 3: Not covered under Act with 10.8 years -> only 10 completed years counted
  // Formula: 0.5 * 50,000 * 10 = ₹2,50,000
  // Source: Income Tax Act Section 10(10)(iii)
  it('calculates gratuity for non-covered employee using completed full years only', () => {
    const res = calculateGratuity({
      monthlyBasicSalary: 50000,
      yearsOfService: 10.8,
      isCoveredUnderAct: false,
    });

    expect(res.effectiveTenureYears).toBe(10);
    expect(res.totalGratuity).toBe(250000);
    expect(res.taxExemptGratuity).toBe(250000);
    expect(res.taxableGratuity).toBe(0);
  });

  // Case 4: High earner exceeding statutory exemption limit (₹20,00,000)
  // Salary = ₹2,00,000, 30 years service -> (15 * 200,000 * 30) / 26 = 90,000,000 / 26 = ₹34,61,538
  // Tax exempt = ₹20,00,000, Taxable = ₹14,61,538
  it('caps tax-exempt gratuity at statutory ₹20 Lakhs limit and identifies taxable portion', () => {
    const res = calculateGratuity({
      monthlyBasicSalary: 200000,
      yearsOfService: 30,
      isCoveredUnderAct: true,
    });

    expect(res.totalGratuity).toBe(3461538);
    expect(res.taxExemptGratuity).toBe(2000000);
    expect(res.taxableGratuity).toBe(1461538);
  });

  // Case 5: Ineligible (< 5 years continuous service)
  it('flags ineligibility when service is less than 5 statutory years', () => {
    const res = calculateGratuity({
      monthlyBasicSalary: 40000,
      yearsOfService: 3.5,
      isCoveredUnderAct: true,
    });

    expect(res.isEligibleForGratuity).toBe(false);
  });

  // Case 6: Input validation
  it('validates invalid inputs', () => {
    expect(validateGratuityInput({ monthlyBasicSalary: -5000, yearsOfService: 10, isCoveredUnderAct: true }).valid).toBe(false);
    expect(validateGratuityInput({ monthlyBasicSalary: 50000, yearsOfService: 0, isCoveredUnderAct: true }).valid).toBe(false);
  });
});
