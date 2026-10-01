import { calculateCAGR, generateCAGRYearlyBreakdown, validateCAGRInput } from '@/lib/calculators/cagr';

describe('CAGR Calculator', () => {
  // Case 1: Initial ₹1,00,000 to ₹2,00,000 in 5 years
  // CAGR = (200,000 / 100,000)^(1/5) - 1 = (2)^0.2 - 1 = 1.148698 - 1 = 14.87%
  it('calculates standard CAGR for doubling money in 5 years', () => {
    const res = calculateCAGR({
      mode: 'calculate_cagr',
      initialValue: 100000,
      finalValue: 200000,
      durationYears: 5,
    });

    expect(res.cagrPercentage).toBeCloseTo(14.87, 1);
    expect(res.totalAbsoluteGainAmount).toBe(100000);
    expect(res.totalAbsoluteGainPercentage).toBe(100);
    expect(res.doublingTimeYears).toBeCloseTo(4.8, 0);
  });

  // Case 2: Mutual Fund 10-Year Track Record: ₹5 Lakhs to ₹15.5 Lakhs in 10 years
  // CAGR = (15.5 / 5)^0.1 - 1 = (3.1)^0.1 - 1 = 11.98% ~ 12.0%
  it('calculates 10-year mutual fund CAGR accurately', () => {
    const res = calculateCAGR({
      mode: 'calculate_cagr',
      initialValue: 500000,
      finalValue: 1552924,
      durationYears: 10,
    });

    expect(res.cagrPercentage).toBeCloseTo(12.0, 0);
    expect(res.totalAbsoluteGainAmount).toBeCloseTo(1052924, -1);
  });

  // Case 3: Reverse Mode - Future Value from Target CAGR
  // Initial = ₹2,00,000, Target CAGR = 15%, Duration = 7 years
  // Final = 200,000 * (1.15)^7 = 200,000 * 2.66002 = ₹5,32,004
  it('calculates future portfolio value from target CAGR in reverse mode', () => {
    const res = calculateCAGR({
      mode: 'future_value_from_cagr',
      initialValue: 200000,
      targetCAGRPercent: 15,
      durationYears: 7,
    });

    expect(res.finalValue).toBeCloseTo(532004, -1);
    expect(res.cagrPercentage).toBe(15);
  });

  // Case 4: Negative CAGR (Investment Loss)
  // Initial = ₹1,00,000, Final = ₹60,000 in 3 years -> CAGR = (0.6)^(1/3) - 1 = -15.66%
  it('handles negative CAGR for declining investments', () => {
    const res = calculateCAGR({
      mode: 'calculate_cagr',
      initialValue: 100000,
      finalValue: 60000,
      durationYears: 3,
    });

    expect(res.cagrPercentage).toBeCloseTo(-15.66, 1);
    expect(res.totalAbsoluteGainAmount).toBe(-40000);
  });

  // Case 5: Breakdown generator
  it('generates yearly portfolio growth breakdown', () => {
    const breakdown = generateCAGRYearlyBreakdown({
      initialValue: 100000,
      finalValue: 150000,
      durationYears: 3,
    });

    expect(breakdown.length).toBe(3);
    expect(breakdown[2].portfolioValue).toBeCloseTo(150000, -2);
  });

  // Case 6: Validation
  it('validates invalid inputs', () => {
    expect(validateCAGRInput({ initialValue: -100, finalValue: 200, durationYears: 5 }).valid).toBe(false);
    expect(validateCAGRInput({ initialValue: 100, finalValue: -200, durationYears: 5 }).valid).toBe(false);
    expect(validateCAGRInput({ initialValue: 100, finalValue: 200, durationYears: 0 }).valid).toBe(false);
  });
});
