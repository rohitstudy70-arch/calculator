/**
 * Return on Investment (ROI) Calculator Engine
 * Formula:
 * Net Profit = Amount Returned - Amount Invested
 * Total ROI (%) = (Net Profit / Amount Invested) * 100
 * Annualized ROI (%) = ((1 + Total ROI / 100) ^ (1 / Time in Years) - 1) * 100
 */

export interface ROIInput {
  amountInvested: number; // Initial investment / cost
  amountReturned: number; // Final amount received
  investmentPeriodYears?: number; // Duration in years
  investmentPeriodMonths?: number; // Additional months
}

export interface ROIResult {
  amountInvested: number;
  amountReturned: number;
  netProfit: number;
  isProfit: boolean;
  totalROI: number; // In percentage, e.g. 50.00
  annualizedROI: number; // In percentage per year
  investmentMultiple: number; // e.g. 1.5x
  totalYears: number; // Normalized duration in years
  formattedROI: string;
  formattedAnnualizedROI: string;
}

export interface ROIYearlyProgression {
  year: number;
  estimatedValue: number;
  cumulativeReturnPercent: number;
}

export function validateROIInput(input: ROIInput): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (input.amountInvested === undefined || isNaN(input.amountInvested) || input.amountInvested <= 0) {
    errors.amountInvested = 'Amount invested must be greater than zero.';
  }

  if (input.amountReturned === undefined || isNaN(input.amountReturned) || input.amountReturned < 0) {
    errors.amountReturned = 'Amount returned cannot be negative.';
  }

  const years = input.investmentPeriodYears ?? 0;
  const months = input.investmentPeriodMonths ?? 0;
  if (years < 0 || months < 0) {
    errors.period = 'Investment period cannot be negative.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateROI(input: ROIInput): ROIResult {
  const invested = Math.max(0.01, input.amountInvested || 0);
  const returned = Math.max(0, input.amountReturned || 0);
  const years = Math.max(0, input.investmentPeriodYears || 0);
  const months = Math.max(0, input.investmentPeriodMonths || 0);

  const totalYears = years + months / 12;
  const netProfit = returned - invested;
  const isProfit = netProfit >= 0;

  const totalROI = (netProfit / invested) * 100;
  const investmentMultiple = returned / invested;

  let annualizedROI = 0;
  if (totalYears > 0 && returned > 0) {
    // Annualized ROI = ((Amount Returned / Amount Invested) ^ (1 / totalYears) - 1) * 100
    annualizedROI = (Math.pow(returned / invested, 1 / totalYears) - 1) * 100;
  } else if (totalYears > 0 && returned === 0) {
    annualizedROI = -100;
  } else {
    annualizedROI = totalROI;
  }

  return {
    amountInvested: invested,
    amountReturned: returned,
    netProfit,
    isProfit,
    totalROI: Number(totalROI.toFixed(2)),
    annualizedROI: Number(annualizedROI.toFixed(2)),
    investmentMultiple: Number(investmentMultiple.toFixed(2)),
    totalYears: Number(totalYears.toFixed(2)),
    formattedROI: `${totalROI >= 0 ? '+' : ''}${totalROI.toFixed(2)}%`,
    formattedAnnualizedROI: `${annualizedROI >= 0 ? '+' : ''}${annualizedROI.toFixed(2)}% p.a.`,
  };
}

export function generateROIYearlyProgression(input: ROIInput): ROIYearlyProgression[] {
  const invested = Math.max(0.01, input.amountInvested || 0);
  const returned = Math.max(0, input.amountReturned || 0);
  const years = Math.max(0, input.investmentPeriodYears || 0);
  const months = Math.max(0, input.investmentPeriodMonths || 0);
  const totalYears = Math.max(1, Math.ceil(years + months / 12));

  if (invested <= 0 || returned <= 0) return [];

  const cagr = Math.pow(returned / invested, 1 / totalYears) - 1;
  const schedule: ROIYearlyProgression[] = [];

  for (let y = 0; y <= totalYears; y++) {
    const val = invested * Math.pow(1 + cagr, y);
    const retPct = ((val - invested) / invested) * 100;
    schedule.push({
      year: y,
      estimatedValue: Math.round(val),
      cumulativeReturnPercent: Number(retPct.toFixed(2)),
    });
  }

  return schedule;
}
