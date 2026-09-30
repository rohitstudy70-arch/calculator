import {
  calculateEMI,
  generateAmortizationSchedule,
  generateYearlySummary,
  validateEMIInput,
} from '../../src/lib/calculators/emi';

describe('EMI Calculator', () => {
  describe('calculateEMI', () => {
    it('calculates correct EMI for 10 Lakhs at 8.5% for 20 years', () => {
      const result = calculateEMI({
        principal: 1000000,
        annualRate: 8.5,
        tenureMonths: 240,
      });
      expect(Math.round(result.emi)).toBe(8678);
      expect(result.totalPayment).toBeCloseTo(result.emi * 240, 0);
      expect(result.totalInterest).toBeCloseTo(result.totalPayment - 1000000, 0);
    });

    it('calculates correct EMI for 50 Lakhs at 7% for 15 years', () => {
      const result = calculateEMI({
        principal: 5000000,
        annualRate: 7,
        tenureMonths: 180,
      });
      expect(Math.round(result.emi)).toBe(44941);
    });

    it('calculates correct EMI for 25 Lakhs at 9.5% for 10 years', () => {
      const result = calculateEMI({
        principal: 2500000,
        annualRate: 9.5,
        tenureMonths: 120,
      });
      expect(Math.round(result.emi)).toBe(32349);
    });

    it('calculates correct EMI for 1 Lakh at 0% for 12 months', () => {
      const result = calculateEMI({
        principal: 100000,
        annualRate: 0,
        tenureMonths: 12,
      });
      expect(Math.round(result.emi)).toBe(8333);
      expect(result.totalInterest).toBe(0);
      expect(result.totalPayment).toBe(100000);
    });

    it('calculates correct EMI for 30 Lakhs at 8% for 30 years', () => {
      const result = calculateEMI({
        principal: 3000000,
        annualRate: 8,
        tenureMonths: 360,
      });
      expect(Math.round(result.emi)).toBe(22013);
    });
  });

  describe('generateAmortizationSchedule', () => {
    const input = {
      principal: 1000000,
      annualRate: 10,
      tenureMonths: 12,
    };
    
    it('has the correct number of rows', () => {
      const schedule = generateAmortizationSchedule(input);
      expect(schedule.length).toBe(12);
    });

    it('first month interest is principal * monthlyRate', () => {
      const schedule = generateAmortizationSchedule(input);
      const expectedInterest = 1000000 * (10 / 12 / 100);
      expect(schedule[0].interest).toBeCloseTo(expectedInterest, 2);
    });

    it('last month balance is roughly 0', () => {
      const schedule = generateAmortizationSchedule(input);
      expect(schedule[11].balance).toBeCloseTo(0, 1);
    });

    it('sum of principal components equals original principal', () => {
      const schedule = generateAmortizationSchedule(input);
      const totalPrincipalPaid = schedule.reduce((sum, row) => sum + row.principal, 0);
      expect(totalPrincipalPaid).toBeCloseTo(input.principal, 1);
    });
  });

  describe('generateYearlySummary', () => {
    it('aggregates schedule data correctly into yearly chunks', () => {
      const input = {
        principal: 240000,
        annualRate: 12,
        tenureMonths: 24,
      };
      const summary = generateYearlySummary(input);
      expect(summary.length).toBe(2);
      expect(summary[0].year).toBe(1);
      expect(summary[1].year).toBe(2);
      
      const totalPaidYear1 = summary[0].totalPaid;
      const totalPaidYear2 = summary[1].totalPaid;
      
      const { emi } = calculateEMI(input);
      expect(totalPaidYear1).toBeCloseTo(emi * 12, 1);
      expect(totalPaidYear2).toBeCloseTo(emi * 12, 1);
      expect(summary[1].balance).toBeCloseTo(0, 1);
    });
  });

  describe('validateEMIInput', () => {
    it('validates a correct input', () => {
      const result = validateEMIInput({ principal: 10000, annualRate: 10, tenureMonths: 12 });
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('invalidates negative principal', () => {
      const result = validateEMIInput({ principal: -10000, annualRate: 10, tenureMonths: 12 });
      expect(result.valid).toBe(false);
      expect(result.errors.principal).toBeDefined();
    });

    it('invalidates zero principal', () => {
      const result = validateEMIInput({ principal: 0, annualRate: 10, tenureMonths: 12 });
      expect(result.valid).toBe(false);
      expect(result.errors.principal).toBeDefined();
    });

    it('invalidates negative interest rate', () => {
      const result = validateEMIInput({ principal: 10000, annualRate: -5, tenureMonths: 12 });
      expect(result.valid).toBe(false);
      expect(result.errors.annualRate).toBeDefined();
    });

    it('invalidates negative or zero tenure', () => {
      const result1 = validateEMIInput({ principal: 10000, annualRate: 10, tenureMonths: 0 });
      expect(result1.valid).toBe(false);
      expect(result1.errors.tenureMonths).toBeDefined();

      const result2 = validateEMIInput({ principal: 10000, annualRate: 10, tenureMonths: -12 });
      expect(result2.valid).toBe(false);
      expect(result2.errors.tenureMonths).toBeDefined();
    });

    it('invalidates non-integer tenure', () => {
      const result = validateEMIInput({ principal: 10000, annualRate: 10, tenureMonths: 12.5 });
      expect(result.valid).toBe(false);
      expect(result.errors.tenureMonths).toBeDefined();
    });
  });
});
