import { calculateNPS, generateNPSYearlyBreakdown, validateNPSInput } from '@/lib/calculators/nps';

describe('NPS Calculator', () => {
  // Case 1: Standard PFRDA benchmark: ₹10,000/mo, Age 30 to 60 (30 yrs), 10% return, 40% annuity, 6% annuity rate
  // Hand Calculation: Total invested = 10,000 * 360 = ₹36,00,000
  // FV of monthly annuity at 10% for 30 yrs = ~₹2.28 Crore
  // Lumpsum (60%) = ~₹1.37 Crore, Annuity (40%) = ~₹91 Lakhs, Monthly pension at 6% = ~₹45,000/mo
  it('calculates NPS corpus and monthly pension for standard 30-year horizon', () => {
    const res = calculateNPS({
      monthlyInvestment: 10000,
      currentAge: 30,
      retirementAge: 60,
      expectedReturnRate: 10,
      annuityPercent: 40,
      expectedAnnuityReturnRate: 6,
    });

    expect(res.totalInvestment).toBe(3600000);
    expect(res.totalCorpus).toBeGreaterThan(20000000); // > ₹2 Cr
    expect(res.lumpsumAmount).toBeCloseTo(res.totalCorpus * 0.6, -1);
    expect(res.annuityAmount).toBeCloseTo(res.totalCorpus * 0.4, -1);
    expect(res.estimatedMonthlyPension).toBeGreaterThan(40000);
  });

  // Case 2: Short term: ₹5,000/mo, Age 50 to 60 (10 yrs = 120 mos) at 10% return
  // Total invested = ₹6,00,000. Maturity corpus ≈ ₹10.32 Lakhs
  it('calculates short term 10 year horizon accurately', () => {
    const res = calculateNPS({
      monthlyInvestment: 5000,
      currentAge: 50,
      retirementAge: 60,
      expectedReturnRate: 10,
      annuityPercent: 40,
      expectedAnnuityReturnRate: 6,
    });

    expect(res.totalInvestment).toBe(600000);
    expect(res.totalCorpus).toBeCloseTo(1032760, -3);
    expect(res.lumpsumAmount).toBeCloseTo(res.totalCorpus * 0.6, -2);
    expect(res.annuityAmount).toBeCloseTo(res.totalCorpus * 0.4, -2);
  });

  // Case 3: 100% Annuity selection
  it('handles 100% annuity reinvestment without lump sum', () => {
    const res = calculateNPS({
      monthlyInvestment: 10000,
      currentAge: 40,
      retirementAge: 60,
      expectedReturnRate: 10,
      annuityPercent: 100,
      expectedAnnuityReturnRate: 6,
    });

    expect(res.lumpsumAmount).toBe(0);
    expect(res.annuityAmount).toBe(res.totalCorpus);
    expect(res.estimatedMonthlyPension).toBeGreaterThan(0);
  });

  // Case 4: 0% return edge case
  it('handles 0% expected return rate edge case', () => {
    const res = calculateNPS({
      monthlyInvestment: 2000,
      currentAge: 30,
      retirementAge: 40,
      expectedReturnRate: 0,
      annuityPercent: 40,
      expectedAnnuityReturnRate: 6,
    });

    expect(res.totalInvestment).toBe(240000);
    expect(res.totalCorpus).toBe(240000);
    expect(res.totalInterestEarned).toBe(0);
  });

  // Case 5: Breakdown generator
  it('generates yearly breakdown correctly', () => {
    const breakdown = generateNPSYearlyBreakdown({
      monthlyInvestment: 5000,
      currentAge: 35,
      retirementAge: 45,
      expectedReturnRate: 10,
    });

    expect(breakdown.length).toBe(10);
    expect(breakdown[0].age).toBe(36);
    expect(breakdown[9].age).toBe(45);
  });

  // Case 6: Input validation
  it('validates invalid NPS inputs', () => {
    expect(validateNPSInput({ monthlyInvestment: 200, currentAge: 30 }).valid).toBe(false);
    expect(validateNPSInput({ monthlyInvestment: 5000, currentAge: 62 }).valid).toBe(false);
    expect(validateNPSInput({ monthlyInvestment: 5000, currentAge: 30, annuityPercent: 30 }).valid).toBe(false); // min 40%
  });
});
