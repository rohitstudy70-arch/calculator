import { calculateCompoundInterest, generateCIYearlyBreakdown, validateCompoundInterestInput } from '@/lib/calculators/compound-interest';

describe('Compound Interest Calculator', () => {
  // Case 1: Standard Quarterly Compounding (Indian Bank FD / Standard formula)
  // P = ₹1,00,000, R = 10%, T = 5 years, Compounding = Quarterly (n = 4)
  // A = 100,000 * (1 + 0.10/4)^(4*5) = 100,000 * (1.025)^20 = 100,000 * 1.63861644 = ₹1,63,862
  // Interest = ₹63,862
  it('calculates quarterly compound interest for ₹1,00,000 at 10% for 5 years', () => {
    const res = calculateCompoundInterest({
      principal: 100000,
      annualRate: 10,
      tenureYears: 5,
      compoundingFrequency: 'quarterly',
    });

    expect(res.initialPrincipal).toBe(100000);
    expect(res.maturityAmount).toBeCloseTo(163862, -1);
    expect(res.totalInterestEarned).toBeCloseTo(63862, -1);
    expect(res.effectiveAnnualRate).toBe(10.38); // (1 + 0.10/4)^4 - 1 = 10.38%
  });

  // Case 2: Annual Compounding
  // P = ₹5,00,000, R = 8%, T = 10 years, Compounding = Yearly (n = 1)
  // A = 500,000 * (1.08)^10 = 500,000 * 2.158925 = ₹10,79,462
  it('calculates annual compounding accurately', () => {
    const res = calculateCompoundInterest({
      principal: 500000,
      annualRate: 8,
      tenureYears: 10,
      compoundingFrequency: 'yearly',
    });

    expect(res.maturityAmount).toBeCloseTo(1079462, -1);
    expect(res.totalInterestEarned).toBeCloseTo(579462, -1);
    expect(res.effectiveAnnualRate).toBe(8.0);
  });

  // Case 3: Compound interest with monthly regular additions
  // P = ₹1,00,000, Regular deposit = ₹5,000/mo, 10% annual rate, 5 years, monthly compounding
  it('calculates compound interest with monthly regular additions', () => {
    const res = calculateCompoundInterest({
      principal: 100000,
      annualRate: 10,
      tenureYears: 5,
      compoundingFrequency: 'monthly',
      regularDepositAmount: 5000,
      regularDepositFrequency: 'monthly',
      depositTiming: 'end',
    });

    expect(res.totalRegularDeposits).toBe(300000); // 5000 * 60
    expect(res.totalPrincipal).toBe(400000);
    expect(res.maturityAmount).toBeGreaterThan(500000);
    expect(res.totalInterestEarned).toBeGreaterThan(100000);
  });

  // Case 4: 0% Interest Rate edge case
  it('handles 0% interest rate without errors', () => {
    const res = calculateCompoundInterest({
      principal: 50000,
      annualRate: 0,
      tenureYears: 5,
      compoundingFrequency: 'yearly',
    });

    expect(res.totalInterestEarned).toBe(0);
    expect(res.maturityAmount).toBe(50000);
    expect(res.effectiveAnnualRate).toBe(0);
  });

  // Case 5: Breakdown generation
  it('generates yearly breakdown correctly', () => {
    const breakdown = generateCIYearlyBreakdown({
      principal: 100000,
      annualRate: 7,
      tenureYears: 3,
      compoundingFrequency: 'yearly',
    });

    expect(breakdown.length).toBe(3);
    expect(breakdown[0].year).toBe(1);
    expect(breakdown[2].closingBalance).toBeGreaterThan(breakdown[0].closingBalance);
  });

  // Case 6: Input validation
  it('validates invalid inputs', () => {
    expect(validateCompoundInterestInput({ principal: -100, annualRate: 10, tenureYears: 5, compoundingFrequency: 'yearly' }).valid).toBe(false);
    expect(validateCompoundInterestInput({ principal: 1000, annualRate: -5, tenureYears: 5, compoundingFrequency: 'yearly' }).valid).toBe(false);
    expect(validateCompoundInterestInput({ principal: 1000, annualRate: 10, tenureYears: 0, compoundingFrequency: 'yearly' }).valid).toBe(false);
  });
});
