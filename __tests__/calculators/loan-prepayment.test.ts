import { calculateLoanPrepayment, generatePrepaymentComparisonSchedule, validateLoanPrepaymentInput } from '@/lib/calculators/loan-prepayment';

describe('Loan Prepayment Calculator', () => {
  // Case 1: ₹30 Lakh loan at 8.75% for 20 years (240 mos) with ₹3 Lakh one-time prepayment at month 12 (Reduce Tenure)
  // Original EMI = ₹26,511, Original Interest = ₹33,62,729
  // With ₹3L prepayment at month 12, tenure should reduce by ~35-45 months, saving massive interest.
  it('calculates interest savings and tenure reduction for one-time prepayment', () => {
    const res = calculateLoanPrepayment({
      loanAmount: 3000000,
      annualRate: 8.75,
      tenureMonths: 240,
      prepaymentType: 'one-time',
      prepaymentAmount: 300000,
      prepaymentStartMonth: 12,
      prepaymentAdjustment: 'reduce_tenure',
    });

    expect(res.originalEMI).toBeCloseTo(26511, -1);
    expect(res.newEMI).toBe(res.originalEMI);
    expect(res.totalInterestSaved).toBeGreaterThan(600000); // Saves > ₹6 Lakhs interest
    expect(res.tenureMonthsSaved).toBeGreaterThan(30);
    expect(res.totalPrepaymentsMade).toBe(300000);
  });

  // Case 2: Monthly Recurring Prepayment of ₹5,000
  // Monthly prepayment of ₹5,000 on a ₹25 Lakh loan at 9% for 15 years
  it('calculates recurring monthly prepayment savings', () => {
    const res = calculateLoanPrepayment({
      loanAmount: 2500000,
      annualRate: 9.0,
      tenureMonths: 180,
      prepaymentType: 'monthly',
      prepaymentAmount: 5000,
      prepaymentStartMonth: 1,
      prepaymentAdjustment: 'reduce_tenure',
    });

    expect(res.tenureMonthsSaved).toBeGreaterThan(36); // Saves 3+ years
    expect(res.totalInterestSaved).toBeGreaterThan(400000);
  });

  // Case 3: Reduce EMI Mode
  it('calculates reduce EMI mode keeping tenure constant', () => {
    const res = calculateLoanPrepayment({
      loanAmount: 2000000,
      annualRate: 8.5,
      tenureMonths: 120,
      prepaymentType: 'one-time',
      prepaymentAmount: 400000,
      prepaymentStartMonth: 12,
      prepaymentAdjustment: 'reduce_emi',
    });

    expect(res.newEMI).toBeLessThan(res.originalEMI);
    expect(res.totalInterestSaved).toBeGreaterThan(150000);
  });

  // Case 4: Zero prepayment
  it('handles zero prepayment without modifications', () => {
    const res = calculateLoanPrepayment({
      loanAmount: 1000000,
      annualRate: 8.0,
      tenureMonths: 60,
      prepaymentType: 'one-time',
      prepaymentAmount: 0,
    });

    expect(res.totalInterestSaved).toBe(0);
    expect(res.tenureMonthsSaved).toBe(0);
  });

  // Case 5: Comparison schedule
  it('generates comparison schedule between original and prepaid loan', () => {
    const comparison = generatePrepaymentComparisonSchedule({
      loanAmount: 2000000,
      annualRate: 9.0,
      tenureMonths: 120,
      prepaymentType: 'one-time',
      prepaymentAmount: 200000,
      prepaymentStartMonth: 12,
    });

    expect(comparison.length).toBe(10);
    expect(comparison[0].prepaidBalance).toBeLessThanOrEqual(comparison[0].originalBalance);
  });

  // Case 6: Validation
  it('validates invalid inputs', () => {
    expect(validateLoanPrepaymentInput({ loanAmount: -100, annualRate: 8, tenureMonths: 60, prepaymentType: 'one-time', prepaymentAmount: 1000 }).valid).toBe(false);
    expect(validateLoanPrepaymentInput({ loanAmount: 100000, annualRate: 8, tenureMonths: 0, prepaymentType: 'one-time', prepaymentAmount: 1000 }).valid).toBe(false);
  });
});
