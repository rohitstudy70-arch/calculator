import { calculateSimpleInterest, generateSIBreakdown, validateSimpleInterestInput } from '@/lib/calculators/simple-interest';

describe('Simple Interest Calculator', () => {
  // Case 1: Standard SI formula SI = (P * R * T) / 100
  // P = ₹50,000, R = 8%, T = 3 years -> SI = (50000 * 8 * 3)/100 = ₹12,000, Amount = ₹62,000
  it('calculates standard simple interest in years', () => {
    const res = calculateSimpleInterest({
      mode: 'calculate_interest',
      principal: 50000,
      annualRate: 8,
      timeValue: 3,
      timeUnit: 'years',
    });

    expect(res.principal).toBe(50000);
    expect(res.interestEarned).toBe(12000);
    expect(res.totalAmount).toBe(62000);
    expect(res.yearlyInterest).toBe(4000);
    expect(res.monthlyInterest).toBeCloseTo(333.33, 1);
  });

  // Case 2: Time in months
  // P = ₹1,00,000, R = 12%, T = 18 months (1.5 years) -> SI = (100000 * 12 * 1.5)/100 = ₹18,000
  it('calculates simple interest for tenure in months', () => {
    const res = calculateSimpleInterest({
      mode: 'calculate_interest',
      principal: 100000,
      annualRate: 12,
      timeValue: 18,
      timeUnit: 'months',
    });

    expect(res.timeInYears).toBe(1.5);
    expect(res.interestEarned).toBe(18000);
    expect(res.totalAmount).toBe(118000);
  });

  // Case 3: Reverse Mode - Find Rate
  // P = ₹50,000, T = 2 years, Target Interest = ₹10,000 -> Rate = (10000 * 100)/(50000 * 2) = 10%
  it('finds interest rate in reverse mode given principal, time, and target interest', () => {
    const res = calculateSimpleInterest({
      mode: 'find_rate',
      principal: 50000,
      annualRate: 0,
      timeValue: 2,
      timeUnit: 'years',
      targetInterest: 10000,
    });

    expect(res.annualRate).toBe(10);
    expect(res.interestEarned).toBe(10000);
  });

  // Case 4: Reverse Mode - Find Time
  // P = ₹1,00,000, R = 10%, Target Interest = ₹30,000 -> Time = (30000 * 100)/(100000 * 10) = 3 years
  it('finds time period in reverse mode given principal, rate, and target interest', () => {
    const res = calculateSimpleInterest({
      mode: 'find_time',
      principal: 100000,
      annualRate: 10,
      timeValue: 0,
      timeUnit: 'years',
      targetInterest: 30000,
    });

    expect(res.timeInYears).toBe(3);
  });

  // Case 5: Reverse Mode - Find Principal
  // R = 12%, T = 2 years, Target Interest = ₹24,000 -> P = (24000 * 100)/(12 * 2) = ₹1,00,000
  it('finds principal in reverse mode given rate, time, and target interest', () => {
    const res = calculateSimpleInterest({
      mode: 'find_principal',
      principal: 0,
      annualRate: 12,
      timeValue: 2,
      timeUnit: 'years',
      targetInterest: 24000,
    });

    expect(res.principal).toBe(100000);
    expect(res.totalAmount).toBe(124000);
  });

  // Case 6: Input validation
  it('validates invalid inputs properly', () => {
    expect(validateSimpleInterestInput({ principal: -100, annualRate: 10, timeValue: 2, timeUnit: 'years' }).valid).toBe(false);
    expect(validateSimpleInterestInput({ principal: 1000, annualRate: -2, timeValue: 2, timeUnit: 'years' }).valid).toBe(false);
    expect(validateSimpleInterestInput({ principal: 1000, annualRate: 10, timeValue: 0, timeUnit: 'years' }).valid).toBe(false);
  });
});
