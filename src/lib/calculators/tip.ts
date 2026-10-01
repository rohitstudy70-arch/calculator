export type RoundingOption = 'none' | 'round_tip' | 'round_total' | 'round_per_person';

export interface TipInput {
  billAmount: number;
  tipPercentage: number;
  numberOfPeople?: number; // default 1
  rounding?: RoundingOption; // default 'none'
}

export interface TipResult {
  billAmount: number;
  tipPercentage: number;
  tipAmount: number;
  totalAmount: number;
  numberOfPeople: number;
  tipPerPerson: number;
  totalPerPerson: number;
  effectiveTipPercentage: number;
  roundingApplied: RoundingOption;
}

export function validateTipInput(input: TipInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.billAmount || input.billAmount <= 0 || isNaN(input.billAmount)) {
    errors.billAmount = 'Bill amount must be greater than zero';
  }

  if (input.tipPercentage < 0 || input.tipPercentage > 100 || isNaN(input.tipPercentage)) {
    errors.tipPercentage = 'Tip percentage must be between 0% and 100%';
  }

  const people = input.numberOfPeople ?? 1;
  if (people < 1 || !Number.isInteger(people) || people > 100) {
    errors.numberOfPeople = 'Number of people must be an integer between 1 and 100';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates bill tip, split amount, and per-person breakdown with customizable rounding.
 */
export function calculateTip(input: TipInput): TipResult {
  const bill = Math.max(0, input.billAmount || 0);
  const tipPct = Math.max(0, input.tipPercentage || 0);
  const people = Math.max(1, input.numberOfPeople || 1);
  const rounding = input.rounding ?? 'none';

  let rawTip = (bill * tipPct) / 100;
  let total = bill + rawTip;
  let tipPerPerson = rawTip / people;
  let totalPerPerson = total / people;

  if (rounding === 'round_tip') {
    rawTip = Math.ceil(rawTip);
    total = bill + rawTip;
    tipPerPerson = rawTip / people;
    totalPerPerson = total / people;
  } else if (rounding === 'round_total') {
    total = Math.ceil(total);
    rawTip = total - bill;
    tipPerPerson = rawTip / people;
    totalPerPerson = total / people;
  } else if (rounding === 'round_per_person') {
    totalPerPerson = Math.ceil(totalPerPerson);
    total = totalPerPerson * people;
    rawTip = total - bill;
    tipPerPerson = rawTip / people;
  }

  const effectiveTipPct = bill > 0 ? parseFloat(((rawTip / bill) * 100).toFixed(2)) : tipPct;

  return {
    billAmount: parseFloat(bill.toFixed(2)),
    tipPercentage: tipPct,
    tipAmount: parseFloat(rawTip.toFixed(2)),
    totalAmount: parseFloat(total.toFixed(2)),
    numberOfPeople: people,
    tipPerPerson: parseFloat(tipPerPerson.toFixed(2)),
    totalPerPerson: parseFloat(totalPerPerson.toFixed(2)),
    effectiveTipPercentage: effectiveTipPct,
    roundingApplied: rounding,
  };
}
