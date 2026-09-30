import { calculateLumpsum, validateLumpsumInput } from '@/lib/calculators/lumpsum';

describe('Lumpsum Calculator', () => {
  it('should calculate ₹5L at 12% for 10 years correctly', () => {
    const res = calculateLumpsum({ investmentAmount: 500000, expectedReturnRate: 12, timePeriodYears: 10 });
    expect(res.totalValue).toBeCloseTo(1552924, 0);
  });

  it('should calculate ₹10L at 15% for 20 years correctly', () => {
    const res = calculateLumpsum({ investmentAmount: 1000000, expectedReturnRate: 15, timePeriodYears: 20 });
    expect(res.totalValue).toBeCloseTo(16366537, -1);
  });

  it('should calculate ₹1L at 8% for 5 years correctly', () => {
    const res = calculateLumpsum({ investmentAmount: 100000, expectedReturnRate: 8, timePeriodYears: 5 });
    expect(res.totalValue).toBeCloseTo(146933, 0);
  });

  it('should calculate 0% edge case: ₹50L at 0% for 10 years', () => {
    const res = calculateLumpsum({ investmentAmount: 5000000, expectedReturnRate: 0, timePeriodYears: 10 });
    expect(res.totalValue).toBe(5000000);
    expect(res.estimatedReturns).toBe(0);
  });

  it('should calculate ₹25L at 10% for 15 years correctly', () => {
    const res = calculateLumpsum({ investmentAmount: 2500000, expectedReturnRate: 10, timePeriodYears: 15 });
    expect(res.totalValue).toBeCloseTo(10443117, -1);
  });

  it('should validate inputs correctly', () => {
    const res = validateLumpsumInput({ investmentAmount: 1000, expectedReturnRate: -5, timePeriodYears: 10 });
    expect(res.valid).toBe(false);
    expect(res.errors.expectedReturnRate).toBeDefined();
  });
});
