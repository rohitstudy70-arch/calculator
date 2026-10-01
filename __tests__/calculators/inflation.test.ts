import { calculateInflation, generateInflationYearlyBreakdown, validateInflationInput } from '@/lib/calculators/inflation';

describe('Inflation Calculator', () => {
  // Case 1: Standard Indian CPI: ₹1,00,000 at 6% inflation for 10 years
  // FV = 100,000 * (1.06)^10 = 100,000 * 1.790847 = ₹1,79,085
  // Future purchasing power of ₹1,00,000 = 100,000 / 1.790847 = ₹55,839 (44.2% purchasing power loss)
  it('calculates future cost and purchasing power erosion for 10 years at 6%', () => {
    const res = calculateInflation({
      currentAmount: 100000,
      inflationRate: 6.0,
      timePeriodYears: 10,
    });

    expect(res.currentAmount).toBe(100000);
    expect(res.futureCost).toBeCloseTo(179085, -1);
    expect(res.futurePurchasingPower).toBeCloseTo(55839, -1);
    expect(res.multiplierFactor).toBe(1.79);
    expect(res.costIncreasePercentage).toBe(79.1);
  });

  // Case 2: Long term 30 years (Retirement Horizon) at 7% inflation
  // FV = 50,000 * (1.07)^30 = 50,000 * 7.612255 = ₹3,80,613
  it('calculates 30-year long-term retirement inflation impact', () => {
    const res = calculateInflation({
      currentAmount: 50000,
      inflationRate: 7.0,
      timePeriodYears: 30,
    });

    expect(res.futureCost).toBeCloseTo(380613, -2);
    expect(res.multiplierFactor).toBeCloseTo(7.61, 1);
  });

  // Case 3: 0% Inflation edge case
  it('handles 0% inflation without cost escalation', () => {
    const res = calculateInflation({
      currentAmount: 25000,
      inflationRate: 0,
      timePeriodYears: 5,
    });

    expect(res.futureCost).toBe(25000);
    expect(res.futurePurchasingPower).toBe(25000);
    expect(res.costIncreasePercentage).toBe(0);
    expect(res.multiplierFactor).toBe(1.0);
  });

  // Case 4: Breakdown generation
  it('generates yearly inflation breakdown', () => {
    const breakdown = generateInflationYearlyBreakdown({
      currentAmount: 100000,
      inflationRate: 5.0,
      timePeriodYears: 5,
    });

    expect(breakdown.length).toBe(5);
    expect(breakdown[0].year).toBe(1);
    expect(breakdown[4].futureEquivalentCost).toBeGreaterThan(breakdown[0].futureEquivalentCost);
  });

  // Case 5: Validation
  it('validates invalid inputs', () => {
    expect(validateInflationInput({ currentAmount: -50, inflationRate: 6, timePeriodYears: 5 }).valid).toBe(false);
    expect(validateInflationInput({ currentAmount: 1000, inflationRate: -2, timePeriodYears: 5 }).valid).toBe(false);
    expect(validateInflationInput({ currentAmount: 1000, inflationRate: 6, timePeriodYears: 0 }).valid).toBe(false);
  });
});
