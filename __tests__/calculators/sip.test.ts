import { calculateSIP, validateSIPInput } from '@/lib/calculators/sip';

describe('SIP Calculator', () => {
  it('should calculate ₹10,000/month at 12% for 10 years correctly', () => {
    const res = calculateSIP({ monthlyInvestment: 10000, expectedReturnRate: 12, timePeriodMonths: 120 });
    // Approx ~23.23L
    expect(res.totalInvestment).toBe(1200000);
    expect(res.totalValue).toBeCloseTo(2323390.8, -2); 
  });

  it('should calculate ₹5,000/month at 15% for 15 years correctly', () => {
    const res = calculateSIP({ monthlyInvestment: 5000, expectedReturnRate: 15, timePeriodMonths: 180 });
    expect(res.totalValue).toBeCloseTo(3384351, -4); // ~33.84L depending on exact precision
  });

  it('should calculate ₹25,000/month at 10% for 5 years correctly', () => {
    const res = calculateSIP({ monthlyInvestment: 25000, expectedReturnRate: 10, timePeriodMonths: 60 });
    expect(res.totalValue).toBeCloseTo(1952060, -3); // ~19.52L
  });

  it('should calculate 0% edge case: ₹1,000/month at 0% for 12 months', () => {
    const res = calculateSIP({ monthlyInvestment: 1000, expectedReturnRate: 0, timePeriodMonths: 12 });
    expect(res.totalValue).toBe(12000);
    expect(res.estimatedReturns).toBe(0);
  });

  it('should calculate ₹50,000/month at 8% for 20 years correctly', () => {
    const res = calculateSIP({ monthlyInvestment: 50000, expectedReturnRate: 8, timePeriodMonths: 240 });
    expect(res.totalValue).toBeCloseTo(29647361, -5); // ~2.96Cr
  });

  it('should validate inputs correctly', () => {
    const res = validateSIPInput({ monthlyInvestment: -100, expectedReturnRate: 10, timePeriodMonths: 12 });
    expect(res.valid).toBe(false);
    expect(res.errors.monthlyInvestment).toBeDefined();
  });
});
