import {
  calculateROI,
  validateROIInput,
  generateROIYearlyProgression,
} from '@/lib/calculators/roi';

describe('ROI Calculator Tests', () => {
  test('Standard profitable investment (₹1,00,000 invested, ₹1,50,000 returned in 3 years)', () => {
    const res = calculateROI({
      amountInvested: 100000,
      amountReturned: 150000,
      investmentPeriodYears: 3,
      investmentPeriodMonths: 0,
    });

    expect(res.netProfit).toBe(50000);
    expect(res.isProfit).toBe(true);
    expect(res.totalROI).toBe(50.0);
    // (1.5)^(1/3) - 1 = 1.1447 - 1 = 14.47%
    expect(res.annualizedROI).toBeCloseTo(14.47, 1);
    expect(res.investmentMultiple).toBe(1.5);
    expect(res.totalYears).toBe(3);
  });

  test('Loss investment (₹2,00,000 invested, ₹1,40,000 returned in 2 years)', () => {
    const res = calculateROI({
      amountInvested: 200000,
      amountReturned: 140000,
      investmentPeriodYears: 2,
    });

    expect(res.netProfit).toBe(-60000);
    expect(res.isProfit).toBe(false);
    expect(res.totalROI).toBe(-30.0);
    // (0.7)^(1/2) - 1 = 0.8366 - 1 = -16.33%
    expect(res.annualizedROI).toBeCloseTo(-16.33, 1);
    expect(res.investmentMultiple).toBe(0.7);
  });

  test('Instant zero-duration ROI', () => {
    const res = calculateROI({
      amountInvested: 50000,
      amountReturned: 75000,
    });

    expect(res.netProfit).toBe(25000);
    expect(res.totalROI).toBe(50.0);
    expect(res.annualizedROI).toBe(50.0);
  });

  test('100% loss scenario', () => {
    const res = calculateROI({
      amountInvested: 50000,
      amountReturned: 0,
      investmentPeriodYears: 2,
    });

    expect(res.netProfit).toBe(-50000);
    expect(res.totalROI).toBe(-100.0);
    expect(res.annualizedROI).toBe(-100.0);
  });

  test('Progression schedule generation', () => {
    const schedule = generateROIYearlyProgression({
      amountInvested: 100000,
      amountReturned: 150000,
      investmentPeriodYears: 3,
    });

    expect(schedule.length).toBe(4); // Years 0, 1, 2, 3
    expect(schedule[0].year).toBe(0);
    expect(schedule[0].estimatedValue).toBe(100000);
    expect(schedule[3].year).toBe(3);
    expect(schedule[3].estimatedValue).toBe(150000);
  });

  test('Input validation checks', () => {
    expect(validateROIInput({ amountInvested: 0, amountReturned: 100 }).valid).toBe(false);
    expect(validateROIInput({ amountInvested: -100, amountReturned: 100 }).valid).toBe(false);
    expect(validateROIInput({ amountInvested: 100, amountReturned: -10 }).valid).toBe(false);
    expect(validateROIInput({ amountInvested: 1000, amountReturned: 1500 }).valid).toBe(true);
  });
});
