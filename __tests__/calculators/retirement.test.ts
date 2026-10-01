import { calculateRetirement, generateRetirementTimeline, validateRetirementInput } from '@/lib/calculators/retirement';

describe('Retirement Calculator', () => {
  // Case 1: Standard Indian Benchmark: Age 30, Retirement 60 (30 yrs), Life 85 (25 yrs in retirement)
  // Monthly Expenses = ₹50,000, Inflation = 6%, Pre-ret return = 12% (SIP), Post-ret return = 7%
  // Future monthly expense at 60 = 50,000 * (1.06)^30 = ₹2,87,175/mo (Annual: ₹34,46,095)
  // Required corpus at 60 is multi-crore (~₹5 to 8 Crores), requiring affordable monthly SIP.
  it('calculates retirement corpus and required monthly SIP for 30-year accumulation horizon', () => {
    const res = calculateRetirement({
      currentAge: 30,
      retirementAge: 60,
      lifeExpectancyYears: 85,
      currentMonthlyExpenses: 50000,
      inflationRate: 6.0,
      preRetirementReturnRate: 12.0,
      postRetirementReturnRate: 7.0,
      existingRetirementSavings: 500000,
    });

    expect(res.yearsToRetirement).toBe(30);
    expect(res.yearsInRetirement).toBe(25);
    expect(res.monthlyExpenseAtRetirement).toBeCloseTo(287175, -2);
    expect(res.requiredRetirementCorpus).toBeGreaterThan(50000000); // > ₹5 Crores
    expect(res.monthlySIPRequired).toBeGreaterThan(5000);
    expect(res.monthlySIPRequired).toBeLessThan(50000);
  });

  // Case 2: Starting late (Age 45, Retirement 60) with existing ₹25 Lakhs portfolio
  it('calculates late retirement planning with higher existing savings', () => {
    const res = calculateRetirement({
      currentAge: 45,
      retirementAge: 60,
      lifeExpectancyYears: 80,
      currentMonthlyExpenses: 70000,
      inflationRate: 6.0,
      preRetirementReturnRate: 11.0,
      postRetirementReturnRate: 7.5,
      existingRetirementSavings: 2500000,
    });

    expect(res.yearsToRetirement).toBe(15);
    expect(res.futureValueOfExistingSavings).toBeGreaterThan(10000000);
    expect(res.requiredRetirementCorpus).toBeGreaterThan(res.futureValueOfExistingSavings);
  });

  // Case 3: Fully funded existing portfolio (No additional SIP needed)
  it('handles scenario where existing savings exceed required retirement corpus', () => {
    const res = calculateRetirement({
      currentAge: 50,
      retirementAge: 55,
      lifeExpectancyYears: 70,
      currentMonthlyExpenses: 30000,
      inflationRate: 5.0,
      preRetirementReturnRate: 10.0,
      postRetirementReturnRate: 8.0,
      existingRetirementSavings: 50000000, // ₹5 Crores existing
    });

    expect(res.netAdditionalCorpusNeeded).toBe(0);
    expect(res.monthlySIPRequired).toBe(0);
  });

  // Case 4: Timeline generation
  it('generates retirement accumulation and distribution timeline', () => {
    const timeline = generateRetirementTimeline({
      currentAge: 50,
      retirementAge: 55,
      lifeExpectancyYears: 60,
      currentMonthlyExpenses: 40000,
      inflationRate: 5.0,
      preRetirementReturnRate: 10.0,
      postRetirementReturnRate: 6.0,
    });

    expect(timeline.length).toBe(10); // 5 yrs accumulation + 5 yrs retirement
    expect(timeline[0].phase).toBe('Accumulation');
    expect(timeline[5].phase).toBe('Retirement');
  });

  // Case 5: Validation
  it('validates invalid inputs', () => {
    expect(validateRetirementInput({ currentAge: 65, retirementAge: 60, lifeExpectancyYears: 85, currentMonthlyExpenses: 50000, inflationRate: 6, preRetirementReturnRate: 12, postRetirementReturnRate: 7 }).valid).toBe(false);
    expect(validateRetirementInput({ currentAge: 30, retirementAge: 60, lifeExpectancyYears: 55, currentMonthlyExpenses: 50000, inflationRate: 6, preRetirementReturnRate: 12, postRetirementReturnRate: 7 }).valid).toBe(false);
  });
});
