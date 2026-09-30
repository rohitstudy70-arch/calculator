export type GSTMode = 'add' | 'remove';
export type TaxType = 'igst' | 'cgst_sgst';

export interface GSTInput {
  amount: number;
  gstRate: number;
  mode: GSTMode;
  taxType: TaxType;
}

export interface GSTResult {
  basePrice: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalPrice: number;
  gstRate: number;
}

export function validateGSTInput(input: GSTInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.amount < 0) {
    errors.amount = 'Amount cannot be negative.';
  } else if (input.amount === 0) {
    errors.amount = 'Amount must be greater than zero.';
  }

  if (input.gstRate < 0) {
    errors.gstRate = 'GST rate cannot be negative.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateGST(input: GSTInput): GSTResult {
  const { amount, gstRate, mode, taxType } = input;
  let basePrice = 0;
  let gstAmount = 0;
  let totalPrice = 0;

  if (mode === 'add') {
    basePrice = amount;
    gstAmount = basePrice * (gstRate / 100);
    totalPrice = basePrice + gstAmount;
  } else {
    totalPrice = amount;
    basePrice = totalPrice / (1 + gstRate / 100);
    gstAmount = totalPrice - basePrice;
  }

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (taxType === 'cgst_sgst') {
    cgst = gstAmount / 2;
    sgst = gstAmount / 2;
  } else {
    igst = gstAmount;
  }

  return {
    basePrice,
    gstAmount,
    cgst,
    sgst,
    igst,
    totalPrice,
    gstRate,
  };
}
