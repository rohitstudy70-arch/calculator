import { calculateSalary, validateSalaryInput } from '@/lib/calculators/salary';

describe('Salary Calculator', () => {
  it('calculates 12L CTC correctly', () => {
    const res = calculateSalary({
      annualCTC: 1200000,
      basicPercent: 40,
      hraPercent: 50,
      epfContribution: true,
      professionalTax: 200,
      includeGratuity: true,
      taxRegime: 'new'
    });
    // In hand should be around 82k-85k
    expect(res.monthlyInHand).toBeGreaterThan(80000);
    expect(res.monthlyInHand).toBeLessThan(90000);
  });

  it('calculates 6L CTC correctly', () => {
    const res = calculateSalary({
      annualCTC: 600000,
      basicPercent: 40,
      hraPercent: 50,
      epfContribution: true,
      professionalTax: 200,
      includeGratuity: true,
      taxRegime: 'new'
    });
    // Tax should be 0, inhand ~ 44k
    expect(res.annualTax).toBe(0);
    expect(res.monthlyInHand).toBeGreaterThan(43000);
    expect(res.monthlyInHand).toBeLessThan(46000);
  });

  it('validates negative inputs', () => {
    const res = validateSalaryInput({
      annualCTC: -10,
      basicPercent: 150,
      hraPercent: -5,
      epfContribution: false,
      professionalTax: 0,
      includeGratuity: false,
      taxRegime: 'new'
    });
    expect(res.valid).toBe(false);
    expect(res.errors.annualCTC).toBeDefined();
    expect(res.errors.basicPercent).toBeDefined();
    expect(res.errors.hraPercent).toBeDefined();
  });
});
