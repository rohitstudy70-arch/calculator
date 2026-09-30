import {
  calculateIncomeTax,
  compareRegimes,
  generateSlabBreakdown,
  validateIncomeTaxInput,
  IncomeTaxInput
} from '../../src/lib/calculators/income-tax';

describe('Income Tax Calculator', () => {
  describe('New Regime', () => {
    const baseInput: IncomeTaxInput = {
      grossIncome: 0,
      regime: 'new',
      age: 'below60',
      deduction80C: 0,
      deduction80D: 0,
      deduction80CCD: 0,
      hraExemption: 0,
      homeLoanInterest: 0,
      otherDeductions: 0
    };

    it('₹5L income -> Tax = ₹0', () => {
      const result = calculateIncomeTax({ ...baseInput, grossIncome: 500000 });
      expect(result.taxableIncome).toBe(425000);
      expect(result.totalTax).toBe(0);
    });

    it('₹8L income -> Total Tax = ₹23,400', () => {
      const result = calculateIncomeTax({ ...baseInput, grossIncome: 800000 });
      expect(result.taxableIncome).toBe(725000); // 8L - 75k
      expect(result.rebate87A).toBe(0); // Taxable > 7L
      expect(result.taxBeforeRebate).toBe(22500); // (7L-3L)*5% + (7.25L-7L)*10%
      expect(result.cess).toBe(900);
      expect(result.totalTax).toBe(23400);
    });

    it('₹12L income -> Total Tax = ₹71,500', () => {
      const result = calculateIncomeTax({ ...baseInput, grossIncome: 1200000 });
      expect(result.taxableIncome).toBe(1125000);
      expect(result.taxBeforeRebate).toBe(68750);
      expect(result.cess).toBe(2750);
      expect(result.totalTax).toBe(71500);
    });

    it('₹25L income -> Total Tax = ₹4,34,200', () => {
      const result = calculateIncomeTax({ ...baseInput, grossIncome: 2500000 });
      expect(result.taxableIncome).toBe(2425000);
      expect(result.taxBeforeRebate).toBe(417500);
      expect(result.cess).toBe(16700);
      expect(result.totalTax).toBe(434200);
    });
  });

  describe('Old Regime', () => {
    const baseInput: IncomeTaxInput = {
      grossIncome: 0,
      regime: 'old',
      age: 'below60',
      deduction80C: 0,
      deduction80D: 0,
      deduction80CCD: 0,
      hraExemption: 0,
      homeLoanInterest: 0,
      otherDeductions: 0
    };

    it('₹5L income, 80C ₹1.5L -> Tax = 0', () => {
      const result = calculateIncomeTax({ ...baseInput, grossIncome: 500000, deduction80C: 150000 });
      expect(result.taxableIncome).toBe(300000); // 5L - 50k - 1.5L = 3L
      expect(result.totalTax).toBe(0); // Rebate
    });
  });

  describe('Regime Comparison', () => {
    it('₹12L income, 80C ₹1.5L, 80D ₹25K -> Compare', () => {
      const input: IncomeTaxInput = {
        grossIncome: 1200000,
        regime: 'old',
        age: 'below60',
        deduction80C: 150000,
        deduction80D: 25000,
        deduction80CCD: 0,
        hraExemption: 0,
        homeLoanInterest: 0,
        otherDeductions: 0
      };

      const comparison = compareRegimes(input);
      // New: 12L -> 71500
      // Old: 12L - 50K - 150K - 25K = 975000 -> Tax = 12500 + 95000 = 107500. Cess = 4300. Total = 111800
      expect(comparison.newRegimeTax).toBe(71500);
      expect(comparison.oldRegimeTax).toBe(111800);
      expect(comparison.betterRegime).toBe('new');
    });
  });

  describe('Validation', () => {
    it('catches negative inputs', () => {
      const result = validateIncomeTaxInput({
        grossIncome: -100,
        regime: 'new',
        age: 'below60',
        deduction80C: -10,
        deduction80D: -10,
        deduction80CCD: -10,
        hraExemption: -10,
        homeLoanInterest: -10,
        otherDeductions: -10
      });
      expect(result.valid).toBe(false);
      expect(result.errors.grossIncome).toBeDefined();
    });
  });
});
