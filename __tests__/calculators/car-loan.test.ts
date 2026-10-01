import { calculateCarLoan, generateCarLoanYearlySummary, validateCarLoanInput } from '@/lib/calculators/car-loan';

describe('Car Loan Calculator', () => {
  // Case 1: ₹12 Lakh on-road price, 20% down payment (₹2.4L), Loan ₹9.6 Lakhs, 9.0% for 5 years (60 months)
  // EMI on ₹9,60,000 at 9.0% for 60 mos = 960000 * (0.0075 * 1.0075^60)/(1.0075^60 - 1) = ₹19,928
  // Total Interest = (19928 * 60) - 960,000 = ₹2,35,680
  it('calculates car loan for ₹12L vehicle with 20% down payment at 9% for 5 years', () => {
    const res = calculateCarLoan({
      onRoadPrice: 1200000,
      downPaymentPercent: 20,
      annualRate: 9.0,
      tenureMonths: 60,
      processingFeeAmount: 3500,
    });

    expect(res.downPaymentAmount).toBe(240000);
    expect(res.loanAmount).toBe(960000);
    expect(res.monthlyEMI).toBeCloseTo(19928, -1);
    expect(res.totalInterest).toBeCloseTo(235680, -2);
    expect(res.ltvRatio).toBe(80.0);
  });

  // Case 2: 100% On-Road Funding (0% Down Payment)
  // Vehicle = ₹8,00,000, 8.5% for 7 years (84 months)
  it('handles 0% down payment full on-road financing', () => {
    const res = calculateCarLoan({
      onRoadPrice: 800000,
      downPaymentPercent: 0,
      annualRate: 8.5,
      tenureMonths: 84,
    });

    expect(res.downPaymentAmount).toBe(0);
    expect(res.loanAmount).toBe(800000);
    expect(res.ltvRatio).toBe(100.0);
    expect(res.monthlyEMI).toBeGreaterThan(12000);
  });

  // Case 3: 0% Interest promotional financing
  it('handles 0% interest rate promotional car loan', () => {
    const res = calculateCarLoan({
      onRoadPrice: 600000,
      downPaymentPercent: 50,
      annualRate: 0,
      tenureMonths: 36,
    });

    expect(res.downPaymentAmount).toBe(300000);
    expect(res.loanAmount).toBe(300000);
    expect(res.monthlyEMI).toBeCloseTo(8333.33, 0);
    expect(res.totalInterest).toBe(0);
  });

  // Case 4: Yearly summary
  it('generates yearly amortization summary for car loan', () => {
    const summary = generateCarLoanYearlySummary({
      onRoadPrice: 1000000,
      downPaymentPercent: 20,
      annualRate: 9.0,
      tenureMonths: 60,
    });

    expect(summary.length).toBe(5);
    expect(summary[0].openingBalance).toBe(800000);
    expect(summary[4].closingBalance).toBe(0);
  });

  // Case 5: Validation
  it('validates invalid inputs', () => {
    expect(validateCarLoanInput({ onRoadPrice: -1000, downPaymentPercent: 20, annualRate: 9, tenureMonths: 60 }).valid).toBe(false);
    expect(validateCarLoanInput({ onRoadPrice: 1000000, downPaymentPercent: 105, annualRate: 9, tenureMonths: 60 }).valid).toBe(false);
  });
});
