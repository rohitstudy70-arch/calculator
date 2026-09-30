import { calculateHomeLoan, validateHomeLoanInput } from '@/lib/calculators/home-loan';

describe('Home Loan Calculator', () => {
  describe('calculateHomeLoan', () => {
    it('should correctly calculate for ₹75L property, 20% down, 8.5%, 20 years', () => {
      const result = calculateHomeLoan({ propertyValue: 7500000, downPaymentPercent: 20, annualRate: 8.5, tenureMonths: 240, processingFeePercent: 0.5 });
      expect(result.loanAmount).toBe(6000000);
      expect(Math.round(result.emi)).toBe(52069);
    });

    it('should correctly calculate for ₹1Cr property, 25% down, 7.5%, 25 years', () => {
      const result = calculateHomeLoan({ propertyValue: 10000000, downPaymentPercent: 25, annualRate: 7.5, tenureMonths: 300, processingFeePercent: 0.5 });
      expect(result.loanAmount).toBe(7500000);
      expect(Math.round(result.emi)).toBe(55424);
    });

    it('should correctly calculate for ₹40L property, 10% down, 9%, 15 years', () => {
      const result = calculateHomeLoan({ propertyValue: 4000000, downPaymentPercent: 10, annualRate: 9, tenureMonths: 180, processingFeePercent: 0.5 });
      expect(result.loanAmount).toBe(3600000);
      expect(Math.round(result.emi)).toBe(36514);
    });

    it('should correctly calculate for ₹50L property, 20% down, 8%, 20 years', () => {
      const result = calculateHomeLoan({ propertyValue: 5000000, downPaymentPercent: 20, annualRate: 8, tenureMonths: 240, processingFeePercent: 0.5 });
      expect(result.loanAmount).toBe(4000000);
      expect(Math.round(result.emi)).toBe(33458);
    });

    it('should correctly calculate for ₹2Cr property, 30% down, 7%, 30 years', () => {
      const result = calculateHomeLoan({ propertyValue: 20000000, downPaymentPercent: 30, annualRate: 7, tenureMonths: 360, processingFeePercent: 0.5 });
      expect(result.loanAmount).toBe(14000000);
      expect(Math.round(result.emi)).toBe(93142); // 93,111 in prompt, but let's test within margin or just exact
      // Let's test loose boundary
      expect(result.emi).toBeGreaterThan(90000);
    });
  });

  describe('validateHomeLoanInput', () => {
    it('should pass valid input', () => {
      const result = validateHomeLoanInput({ propertyValue: 7500000, downPaymentPercent: 20, annualRate: 8.5, tenureMonths: 240, processingFeePercent: 0.5 });
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should fail on invalid property value', () => {
      const result = validateHomeLoanInput({ propertyValue: 0, downPaymentPercent: 20, annualRate: 8.5, tenureMonths: 240, processingFeePercent: 0.5 });
      expect(result.valid).toBe(false);
      expect(result.errors.propertyValue).toBeDefined();
    });
  });
});
