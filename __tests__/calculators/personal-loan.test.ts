import { calculatePersonalLoan, generatePersonalLoanSchedule, validatePersonalLoanInput } from '@/lib/calculators/personal-loan';

describe('Personal Loan Calculator', () => {
  // Case 1: Standard ₹5 Lakh loan at 13.5% for 3 years (36 months) with 2% processing fee
  // EMI = 500,000 * (0.01125 * (1.01125)^36) / ((1.01125)^36 - 1) = ₹16,966
  // Total Interest = (16966 * 36) - 500,000 = ₹1,10,776
  // Fee = 2% of 5L = ₹10,000 + 18% GST (₹1,800) = ₹11,800
  it('calculates Personal Loan EMI and fees for ₹5L at 13.5% for 3 years', () => {
    const res = calculatePersonalLoan({
      loanAmount: 500000,
      annualRate: 13.5,
      tenureMonths: 36,
      processingFeePercent: 2.0,
      gstOnFeePercent: 18.0,
    });

    expect(res.monthlyEMI).toBeCloseTo(16968, -1);
    expect(res.totalInterest).toBeCloseTo(110835, -2);
    expect(res.processingFee).toBe(10000);
    expect(res.gstOnProcessingFee).toBe(1800);
    expect(res.totalProcessingCharges).toBe(11800);
    expect(res.totalCostOfLoan).toBeGreaterThan(600000);
    expect(res.effectiveAPR).toBeGreaterThan(13.5);
  });

  // Case 2: ₹10 Lakhs at 11% for 5 years (60 months)
  // EMI = 1,000,000 * (0.0091666 * (1.0091666)^60) / ((1.0091666)^60 - 1) = ₹21,742
  it('calculates ₹10 Lakhs personal loan at 11% for 5 years', () => {
    const res = calculatePersonalLoan({
      loanAmount: 1000000,
      annualRate: 11,
      tenureMonths: 60,
    });

    expect(res.monthlyEMI).toBeCloseTo(21742, -1);
    expect(res.totalInterest).toBeCloseTo(304545, -2);
  });

  // Case 3: 0% Interest Rate Edge Case
  it('handles 0% interest rate without dividing by zero', () => {
    const res = calculatePersonalLoan({
      loanAmount: 120000,
      annualRate: 0,
      tenureMonths: 12,
      processingFeePercent: 0,
    });

    expect(res.monthlyEMI).toBe(10000);
    expect(res.totalInterest).toBe(0);
    expect(res.totalRepaymentAmount).toBe(120000);
  });

  // Case 4: Schedule generation
  it('generates correct amortization schedule', () => {
    const schedule = generatePersonalLoanSchedule({
      loanAmount: 100000,
      annualRate: 12,
      tenureMonths: 12,
    });

    expect(schedule.length).toBe(12);
    expect(schedule[0].openingBalance).toBe(100000);
    expect(schedule[11].closingBalance).toBe(0);
  });

  // Case 5: Validation
  it('validates invalid inputs', () => {
    expect(validatePersonalLoanInput({ loanAmount: -5000, annualRate: 12, tenureMonths: 12 }).valid).toBe(false);
    expect(validatePersonalLoanInput({ loanAmount: 50000, annualRate: -2, tenureMonths: 12 }).valid).toBe(false);
  });
});
