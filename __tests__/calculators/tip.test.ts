import { calculateTip, validateTipInput } from '@/lib/calculators/tip';

describe('Tip Calculator Tests', () => {
  // Test Case 1: Standard restaurant bill tip (₹2,500 bill, 10% tip, 4 people)
  // Tip = ₹250. Total = ₹2,750. Tip per person = ₹62.50. Total per person = ₹687.50
  test('Standard bill tip with 4 people split (₹2,500, 10%)', () => {
    const res = calculateTip({
      billAmount: 2500,
      tipPercentage: 10,
      numberOfPeople: 4,
      rounding: 'none',
    });

    expect(res.tipAmount).toBe(250);
    expect(res.totalAmount).toBe(2750);
    expect(res.tipPerPerson).toBe(62.5);
    expect(res.totalPerPerson).toBe(687.5);
  });

  // Test Case 2: Rounding per person up
  // Bill = ₹1,850, Tip = 15% -> raw tip = 277.5, total = 2127.5. Split between 3 = 709.17 per person.
  // Round per person up -> Math.ceil(709.17) = 710. Total = 2130, Tip = 280.
  test('Rounding per person up option', () => {
    const res = calculateTip({
      billAmount: 1850,
      tipPercentage: 15,
      numberOfPeople: 3,
      rounding: 'round_per_person',
    });

    expect(res.totalPerPerson).toBe(710);
    expect(res.totalAmount).toBe(2130);
    expect(res.tipAmount).toBe(280);
  });

  // Test Case 3: Zero tip (0%)
  test('Zero percent tip (only split bill)', () => {
    const res = calculateTip({
      billAmount: 1200,
      tipPercentage: 0,
      numberOfPeople: 2,
    });

    expect(res.tipAmount).toBe(0);
    expect(res.totalAmount).toBe(1200);
    expect(res.totalPerPerson).toBe(600);
  });

  // Test Case 4: Validation
  test('Validation catches negative bills and invalid person counts', () => {
    expect(validateTipInput({ billAmount: -100, tipPercentage: 10 }).valid).toBe(false);
    expect(validateTipInput({ billAmount: 1000, tipPercentage: 150 }).valid).toBe(false);
    expect(validateTipInput({ billAmount: 1000, tipPercentage: 10, numberOfPeople: 0 }).valid).toBe(false);
    expect(validateTipInput({ billAmount: 1000, tipPercentage: 10, numberOfPeople: 4 }).valid).toBe(true);
  });
});
