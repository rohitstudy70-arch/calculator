import { calculateGST, validateGSTInput } from '@/lib/calculators/gst';

describe('GST Calculator', () => {
  it('adds 18% to ₹1,000 correctly', () => {
    const res = calculateGST({ amount: 1000, gstRate: 18, mode: 'add', taxType: 'cgst_sgst' });
    expect(res.basePrice).toBe(1000);
    expect(res.gstAmount).toBeCloseTo(180);
    expect(res.totalPrice).toBe(1180);
    expect(res.cgst).toBeCloseTo(90);
    expect(res.sgst).toBeCloseTo(90);
    expect(res.igst).toBe(0);
  });

  it('adds 12% to ₹50,000 correctly', () => {
    const res = calculateGST({ amount: 50000, gstRate: 12, mode: 'add', taxType: 'igst' });
    expect(res.basePrice).toBe(50000);
    expect(res.gstAmount).toBeCloseTo(6000);
    expect(res.totalPrice).toBe(56000);
    expect(res.igst).toBeCloseTo(6000);
  });

  it('removes 18% from ₹1,180 correctly', () => {
    const res = calculateGST({ amount: 1180, gstRate: 18, mode: 'remove', taxType: 'cgst_sgst' });
    expect(res.basePrice).toBeCloseTo(1000);
    expect(res.gstAmount).toBeCloseTo(180);
    expect(res.totalPrice).toBe(1180);
  });

  it('removes 28% from ₹12,800 correctly', () => {
    const res = calculateGST({ amount: 12800, gstRate: 28, mode: 'remove', taxType: 'igst' });
    expect(res.basePrice).toBeCloseTo(10000);
    expect(res.gstAmount).toBeCloseTo(2800);
  });

  it('adds 5% to ₹10,000 correctly', () => {
    const res = calculateGST({ amount: 10000, gstRate: 5, mode: 'add', taxType: 'cgst_sgst' });
    expect(res.basePrice).toBe(10000);
    expect(res.gstAmount).toBeCloseTo(500);
    expect(res.totalPrice).toBe(10500);
  });

  it('handles 0% GST', () => {
    const res = calculateGST({ amount: 10000, gstRate: 0, mode: 'add', taxType: 'cgst_sgst' });
    expect(res.gstAmount).toBe(0);
    expect(res.totalPrice).toBe(10000);
  });

  it('validates negative inputs', () => {
    const res = validateGSTInput({ amount: -100, gstRate: -5, mode: 'add', taxType: 'igst' });
    expect(res.valid).toBe(false);
    expect(res.errors.amount).toBeDefined();
    expect(res.errors.gstRate).toBeDefined();
  });
});
