export interface InflationInput {
  currentAmount: number; // Present value / current cost (e.g., ₹1,00,000)
  inflationRate: number; // Annual inflation rate % (e.g., 6.0%)
  timePeriodYears: number; // Horizon in years (e.g., 10)
}

export interface InflationResult {
  currentAmount: number;
  futureCost: number; // What ₹X today will cost in N years: FV = PV * (1+i)^n
  futurePurchasingPower: number; // What ₹X in N years will buy in today's money: PV = FV / (1+i)^n
  costIncreasePercentage: number;
  purchasingPowerLossPercentage: number;
  multiplierFactor: number;
}

export interface InflationYearlyBreakdown {
  year: number;
  futureEquivalentCost: number;
  purchasingPowerOfFixedAmount: number;
  cumulativeInflationPercent: number;
}

export function validateInflationInput(input: InflationInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.currentAmount <= 0 || isNaN(input.currentAmount)) {
    errors.currentAmount = 'Amount must be greater than 0';
  }
  if (input.inflationRate < 0 || input.inflationRate > 50 || isNaN(input.inflationRate)) {
    errors.inflationRate = 'Inflation rate must be between 0% and 50%';
  }
  if (input.timePeriodYears <= 0 || input.timePeriodYears > 100 || isNaN(input.timePeriodYears)) {
    errors.timePeriodYears = 'Time period must be between 1 and 100 years';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates future cost of living, purchasing power degradation, and inflation multipliers.
 * Future Cost: FV = PV * (1 + i)^n
 * Present Value: PV = FV / (1 + i)^n
 */
export function calculateInflation(input: InflationInput): InflationResult {
  const PV = Math.max(0, input.currentAmount);
  const i = Math.max(0, input.inflationRate) / 100;
  const n = Math.max(0, input.timePeriodYears);

  const multiplier = Math.pow(1 + i, n);
  const FV = PV * multiplier;
  const purchasingPower = multiplier === 0 ? 0 : PV / multiplier;

  const costIncrease = multiplier > 0 ? (multiplier - 1) * 100 : 0;
  const powerLoss = multiplier > 0 ? (1 - 1 / multiplier) * 100 : 0;

  return {
    currentAmount: Math.round(PV),
    futureCost: Math.round(FV),
    futurePurchasingPower: Math.round(purchasingPower),
    costIncreasePercentage: parseFloat(costIncrease.toFixed(1)),
    purchasingPowerLossPercentage: parseFloat(powerLoss.toFixed(1)),
    multiplierFactor: parseFloat(multiplier.toFixed(2)),
  };
}

export function generateInflationYearlyBreakdown(input: InflationInput): InflationYearlyBreakdown[] {
  const PV = Math.max(0, input.currentAmount);
  const i = Math.max(0, input.inflationRate) / 100;
  const n = Math.ceil(input.timePeriodYears);

  const breakdown: InflationYearlyBreakdown[] = [];

  for (let y = 1; y <= n; y++) {
    const factor = Math.pow(1 + i, y);
    const fv = PV * factor;
    const pp = PV / factor;
    const cumRate = (factor - 1) * 100;

    breakdown.push({
      year: y,
      futureEquivalentCost: Math.round(fv),
      purchasingPowerOfFixedAmount: Math.round(pp),
      cumulativeInflationPercent: parseFloat(cumRate.toFixed(1)),
    });
  }

  return breakdown;
}
