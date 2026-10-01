import { calculateHRA, validateHRAInput } from '@/lib/calculators/hra';

describe('HRA Exemption Calculator', () => {
  // Case 1: Standard Metro Case (Delhi/Mumbai/Kolkata/Chennai)
  // Monthly Basic = ₹50,000, DA = ₹0, HRA Received = ₹20,000, Rent Paid = ₹25,000
  // Limits:
  // 1. Actual HRA = ₹20,000
  // 2. 50% of Basic = ₹25,000
  // 3. Rent - 10% Basic = ₹25,000 - ₹5,000 = ₹20,000
  // Least = ₹20,000 => Exempt = ₹20,000/mo, Taxable = ₹0
  it('calculates full exemption when rent minus 10% basic equals actual HRA in Metro', () => {
    const res = calculateHRA({
      basicSalaryMonthly: 50000,
      daMonthly: 0,
      hraReceivedMonthly: 20000,
      rentPaidMonthly: 25000,
      isMetroCity: true,
    });

    expect(res.monthlyExemptHRA).toBe(20000);
    expect(res.monthlyTaxableHRA).toBe(0);
    expect(res.annualExemptHRA).toBe(240000);
    expect(res.annualTaxableHRA).toBe(0);
  });

  // Case 2: Non-Metro Case where City Percentage (40%) is the lowest limit
  // Monthly Basic = ₹1,00,000, HRA Received = ₹50,000, Rent Paid = ₹60,000, Non-Metro (40%)
  // Limits:
  // 1. Actual HRA = ₹50,000
  // 2. 40% of Basic = ₹40,000
  // 3. Rent - 10% of Basic = ₹60,000 - ₹10,000 = ₹50,000
  // Least = ₹40,000 => Exempt = ₹40,000, Taxable = ₹10,000
  it('correctly applies 40% non-metro limit when it is the minimum', () => {
    const res = calculateHRA({
      basicSalaryMonthly: 100000,
      hraReceivedMonthly: 50000,
      rentPaidMonthly: 60000,
      isMetroCity: false,
    });

    expect(res.monthlyExemptHRA).toBe(40000);
    expect(res.monthlyTaxableHRA).toBe(10000);
    expect(res.appliedLimitType).toBe('city_percentage');
  });

  // Case 3: Zero rent paid -> Zero exemption
  it('gives 0 exemption when living in self-owned home (₹0 rent)', () => {
    const res = calculateHRA({
      basicSalaryMonthly: 60000,
      hraReceivedMonthly: 24000,
      rentPaidMonthly: 0,
      isMetroCity: true,
    });

    expect(res.monthlyExemptHRA).toBe(0);
    expect(res.monthlyTaxableHRA).toBe(24000);
    expect(res.annualTaxableHRA).toBe(288000);
  });

  // Case 4: Rent paid is less than 10% of basic -> Exemption is 0
  // Basic = ₹50,000 (10% = ₹5,000), Rent = ₹4,000
  it('gives 0 exemption when rent is below 10% of basic salary', () => {
    const res = calculateHRA({
      basicSalaryMonthly: 50000,
      hraReceivedMonthly: 15000,
      rentPaidMonthly: 4000,
      isMetroCity: true,
    });

    expect(res.monthlyExemptHRA).toBe(0);
    expect(res.monthlyTaxableHRA).toBe(15000);
  });

  // Case 5: Validation tests
  it('validates invalid inputs', () => {
    expect(validateHRAInput({ basicSalaryMonthly: -100, hraReceivedMonthly: 1000, rentPaidMonthly: 1000, isMetroCity: true }).valid).toBe(false);
    expect(validateHRAInput({ basicSalaryMonthly: 50000, hraReceivedMonthly: 20000, rentPaidMonthly: 25000, isMetroCity: true }).valid).toBe(true);
  });
});
