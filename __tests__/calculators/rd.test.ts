import { calculateRD, validateRDInput, RDInput } from '../../src/lib/calculators/rd';

describe('RD Calculator', () => {
  it('calculates quarterly compounding correctly 1', () => {
    const input: RDInput = { monthlyDeposit: 5000, annualRate: 6.5, tenureMonths: 60, compounding: 'quarterly' };
    const result = calculateRD(input);
    expect(result.maturityAmount).toBeCloseTo(354955, -3);
  });
  it('calculates quarterly compounding correctly 2', () => {
    const input: RDInput = { monthlyDeposit: 10000, annualRate: 7, tenureMonths: 36, compounding: 'quarterly' };
    const result = calculateRD(input);
    expect(result.maturityAmount).toBeCloseTo(401373, -3);
  });
  it('calculates quarterly compounding correctly 3', () => {
    const input: RDInput = { monthlyDeposit: 2000, annualRate: 5.5, tenureMonths: 120, compounding: 'quarterly' };
    const result = calculateRD(input);
    expect(result.maturityAmount).toBeCloseTo(320039, -3);
  });
  it('calculates 0% correctly', () => {
    const input: RDInput = { monthlyDeposit: 1000, annualRate: 0, tenureMonths: 12, compounding: 'quarterly' };
    const result = calculateRD(input);
    expect(result.maturityAmount).toBeCloseTo(12000, 0);
  });
  
  it('validates input correctly', () => {
    expect(validateRDInput({ monthlyDeposit: -100, annualRate: 5, tenureMonths: 12, compounding: 'quarterly' }).valid).toBe(false);
  });
});
