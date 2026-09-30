import { calculateFD, validateFDInput, FDInput } from '../../src/lib/calculators/fd';

describe('FD Calculator', () => {
  it('calculates quarterly compounding correctly 1', () => {
    const input: FDInput = { principal: 100000, annualRate: 7, tenureMonths: 60, compounding: 'quarterly' };
    const result = calculateFD(input);
    expect(result.maturityAmount).toBeCloseTo(141477.8, 0);
  });
  it('calculates quarterly compounding correctly 2', () => {
    const input: FDInput = { principal: 500000, annualRate: 6.5, tenureMonths: 36, compounding: 'quarterly' };
    const result = calculateFD(input);
    expect(result.maturityAmount).toBeCloseTo(606704, -2);
  });
  it('calculates quarterly compounding correctly 3', () => {
    const input: FDInput = { principal: 1000000, annualRate: 8, tenureMonths: 120, compounding: 'quarterly' };
    const result = calculateFD(input);
    expect(result.maturityAmount).toBeCloseTo(2208039.66, 0);
  });
  it('calculates quarterly compounding correctly 4', () => {
    const input: FDInput = { principal: 50000, annualRate: 5, tenureMonths: 12, compounding: 'quarterly' };
    const result = calculateFD(input);
    expect(result.maturityAmount).toBeCloseTo(52547.2, 0);
  });
  it('calculates quarterly compounding correctly 5', () => {
    const input: FDInput = { principal: 2500000, annualRate: 7.5, tenureMonths: 84, compounding: 'quarterly' };
    const result = calculateFD(input);
    expect(result.maturityAmount).toBeCloseTo(4205653, -3);
  });

  it('validates input correctly', () => {
    expect(validateFDInput({ principal: -100, annualRate: 5, tenureMonths: 12, compounding: 'quarterly' }).valid).toBe(false);
  });
});
