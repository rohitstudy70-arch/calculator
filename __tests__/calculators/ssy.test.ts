import {
  calculateSSY,
  generateSSYYearlyBreakdown,
  validateSSYInput,
  SSY_DEFAULT_RATE,
  SSY_DEPOSIT_YEARS,
  SSY_MATURITY_YEARS,
} from '@/lib/calculators/ssy';

describe('SSY Calculator', () => {
  describe('calculateSSY', () => {
    it('should correctly calculate maturity for standard maximum deposit (₹1.5L/year at 8.2%)', () => {
      const result = calculateSSY({
        depositAmount: 150000,
        frequency: 'yearly',
        girlAge: 1,
        interestRate: 8.2,
      });

      expect(result.totalInvested).toBe(2250000);
      expect(result.depositTenureYears).toBe(15);
      expect(result.maturityYears).toBe(21);
      // Expected maturity around ₹71.77 Lakhs
      expect(result.maturityAmount).toBeGreaterThan(7100000);
      expect(result.maturityAmount).toBeLessThan(7300000);
      expect(result.totalInterest).toBe(result.maturityAmount - result.totalInvested);
      expect(result.taxSaved80C).toBe(46800); // 30% slab + 4% cess on ₹1.5L
    });

    it('should correctly calculate for ₹50,000/year at 8.2%', () => {
      const result = calculateSSY({
        depositAmount: 50000,
        frequency: 'yearly',
        girlAge: 2,
        interestRate: 8.2,
      });

      expect(result.totalInvested).toBe(750000);
      expect(result.maturityAmount).toBeGreaterThan(2300000);
      expect(result.maturityAmount).toBeLessThan(2500000);
    });

    it('should handle monthly frequency inputs correctly', () => {
      const result = calculateSSY({
        depositAmount: 5000,
        frequency: 'monthly',
        girlAge: 3,
        interestRate: 8.2,
      });

      // 5000 * 12 * 15 = 900000
      expect(result.totalInvested).toBe(900000);
      expect(result.maturityAmount).toBeGreaterThan(2700000);
      expect(result.maturityAmount).toBeLessThan(3000000);
    });

    it('should calculate for minimum deposit ₹250/year', () => {
      const result = calculateSSY({
        depositAmount: 250,
        frequency: 'yearly',
        girlAge: 0,
        interestRate: 8.2,
      });

      expect(result.totalInvested).toBe(3750);
      expect(result.maturityAmount).toBeGreaterThan(11000);
    });
  });

  describe('generateSSYYearlyBreakdown', () => {
    it('should produce exactly 21 rows of breakdown', () => {
      const breakdown = generateSSYYearlyBreakdown({
        depositAmount: 100000,
        frequency: 'yearly',
        girlAge: 1,
        interestRate: 8.2,
      });

      expect(breakdown.length).toBe(21);
      expect(breakdown[0].year).toBe(1);
      expect(breakdown[20].year).toBe(21);

      // Years 1-15 should have deposit
      for (let i = 0; i < 15; i++) {
        expect(breakdown[i].deposit).toBe(100000);
      }

      // Years 16-21 should have ZERO deposit
      for (let i = 15; i < 21; i++) {
        expect(breakdown[i].deposit).toBe(0);
        expect(breakdown[i].interestEarned).toBeGreaterThan(0);
      }

      // Final closing balance equals maturity amount
      const finalRow = breakdown[20];
      const summary = calculateSSY({
        depositAmount: 100000,
        frequency: 'yearly',
        girlAge: 1,
        interestRate: 8.2,
      });
      expect(finalRow.closingBalance).toBe(summary.maturityAmount);
    });
  });

  describe('validateSSYInput', () => {
    it('should validate valid yearly input', () => {
      const v = validateSSYInput({
        depositAmount: 100000,
        frequency: 'yearly',
        girlAge: 5,
        interestRate: 8.2,
      });
      expect(v.valid).toBe(true);
      expect(v.errors).toEqual({});
    });

    it('should fail if yearly deposit exceeds ₹1,50,000', () => {
      const v = validateSSYInput({
        depositAmount: 200000,
        frequency: 'yearly',
        girlAge: 5,
      });
      expect(v.valid).toBe(false);
      expect(v.errors.depositAmount).toBeDefined();
    });

    it('should fail if deposit is below ₹250', () => {
      const v = validateSSYInput({
        depositAmount: 200,
        frequency: 'yearly',
        girlAge: 5,
      });
      expect(v.valid).toBe(false);
      expect(v.errors.depositAmount).toBeDefined();
    });

    it('should fail if girl age is above 10 years', () => {
      const v = validateSSYInput({
        depositAmount: 50000,
        frequency: 'yearly',
        girlAge: 11,
      });
      expect(v.valid).toBe(false);
      expect(v.errors.girlAge).toBeDefined();
    });
  });
});
