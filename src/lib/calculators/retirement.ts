export interface RetirementInput {
  currentAge: number; // e.g. 30
  retirementAge: number; // e.g. 60
  lifeExpectancyYears: number; // e.g. 85
  currentMonthlyExpenses: number; // in INR (e.g. ₹50,000)
  inflationRate: number; // Annual inflation % (e.g. 6%)
  preRetirementReturnRate: number; // Expected return before retirement % (e.g. 12% equity)
  postRetirementReturnRate: number; // Expected safe return after retirement % (e.g. 7% debt/hybrid)
  existingRetirementSavings?: number; // Starting portfolio in INR (default 0)
}

export interface RetirementResult {
  currentAge: number;
  retirementAge: number;
  yearsToRetirement: number;
  yearsInRetirement: number;
  monthlyExpenseAtRetirement: number; // Future inflated monthly expense
  annualExpenseAtRetirement: number;
  requiredRetirementCorpus: number; // Total corpus needed at retirement age
  futureValueOfExistingSavings: number; // Compounded existing savings
  netAdditionalCorpusNeeded: number; // Gap to be funded
  monthlySIPRequired: number; // Monthly SIP needed from today until retirement
  realReturnRatePostRetirement: number; // Inflation-adjusted return %
}

export interface RetirementTimelineRow {
  age: number;
  phase: 'Accumulation' | 'Retirement';
  annualExpenses: number;
  corpusBalance: number;
  annualSIPContribution: number;
}

export function validateRetirementInput(input: RetirementInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.currentAge < 18 || input.currentAge >= 80 || isNaN(input.currentAge)) {
    errors.currentAge = 'Current age must be between 18 and 80';
  }
  if (input.retirementAge <= input.currentAge || input.retirementAge > 85 || isNaN(input.retirementAge)) {
    errors.retirementAge = `Retirement age must be greater than current age (${input.currentAge}) and up to 85`;
  }
  if (input.lifeExpectancyYears <= input.retirementAge || input.lifeExpectancyYears > 105 || isNaN(input.lifeExpectancyYears)) {
    errors.lifeExpectancyYears = `Life expectancy must be greater than retirement age (${input.retirementAge}) and up to 105`;
  }
  if (input.currentMonthlyExpenses <= 0 || isNaN(input.currentMonthlyExpenses)) {
    errors.currentMonthlyExpenses = 'Monthly expenses must be greater than 0';
  }
  if (input.inflationRate < 0 || input.inflationRate > 25 || isNaN(input.inflationRate)) {
    errors.inflationRate = 'Inflation rate must be between 0% and 25%';
  }
  if (input.preRetirementReturnRate <= 0 || input.preRetirementReturnRate > 40 || isNaN(input.preRetirementReturnRate)) {
    errors.preRetirementReturnRate = 'Pre-retirement return must be between 0.1% and 40%';
  }
  if (input.postRetirementReturnRate < 0 || input.postRetirementReturnRate > 30 || isNaN(input.postRetirementReturnRate)) {
    errors.postRetirementReturnRate = 'Post-retirement return must be between 0% and 30%';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates retirement corpus and required monthly SIP using real inflation-adjusted cash flows.
 *
 * 1. Future Annual Expense at Retirement = Current Annual Expense * (1 + inf)^yearsToRet
 * 2. Real post-retirement rate g = (1 + r_post) / (1 + inf) - 1
 * 3. Required Corpus at Retirement = PV of an annuity growing with inflation
 *    If g === 0: Corpus = Future Annual Expense * yearsInRet
 *    If g !== 0: Corpus = Future Annual Expense * [(1 - (1 + g)^(-yearsInRet)) / g] * (1 + g)
 * 4. Future Value of Existing Savings = Existing * (1 + r_pre)^yearsToRet
 * 5. Net Corpus Gap = Max(0, Required Corpus - FV Existing)
 * 6. Monthly SIP Required = Gap / [(( (1 + r_m)^n - 1 ) / r_m) * (1 + r_m)]
 */
export function calculateRetirement(input: RetirementInput): RetirementResult {
  const currentAge = input.currentAge;
  const retirementAge = input.retirementAge;
  const lifeExp = input.lifeExpectancyYears;
  const currentExpenses = Math.max(0, input.currentMonthlyExpenses);
  const inf = input.inflationRate / 100;
  const rPre = input.preRetirementReturnRate / 100;
  const rPost = input.postRetirementReturnRate / 100;
  const existingSavings = Math.max(0, input.existingRetirementSavings ?? 0);

  const yearsToRet = Math.max(0, retirementAge - currentAge);
  const yearsInRet = Math.max(1, lifeExp - retirementAge);

  // Inflated monthly and annual expenses at retirement
  const futureMonthlyExpense = currentExpenses * Math.pow(1 + inf, yearsToRet);
  const futureAnnualExpense = futureMonthlyExpense * 12;

  // Real post-retirement rate
  const realPostRate = (1 + rPost) / (1 + inf) - 1;

  let requiredCorpus = 0;
  if (Math.abs(realPostRate) < 0.0001) {
    requiredCorpus = futureAnnualExpense * yearsInRet;
  } else {
    // Annuity due for inflation-adjusted withdrawals at beginning of each year
    requiredCorpus =
      futureAnnualExpense *
      ((1 - Math.pow(1 + realPostRate, -yearsInRet)) / realPostRate) *
      (1 + realPostRate);
  }

  // Future value of existing savings
  const fvExistingSavings = existingSavings * Math.pow(1 + rPre, yearsToRet);
  const netCorpusGap = Math.max(0, requiredCorpus - fvExistingSavings);

  // Required monthly SIP
  const monthsToRet = yearsToRet * 12;
  const monthlyPreRate = rPre / 12;
  let monthlySIP = 0;

  if (netCorpusGap > 0 && monthsToRet > 0) {
    if (monthlyPreRate === 0) {
      monthlySIP = netCorpusGap / monthsToRet;
    } else {
      monthlySIP =
        netCorpusGap /
        (((Math.pow(1 + monthlyPreRate, monthsToRet) - 1) / monthlyPreRate) *
          (1 + monthlyPreRate));
    }
  }

  return {
    currentAge,
    retirementAge,
    yearsToRetirement: yearsToRet,
    yearsInRetirement: yearsInRet,
    monthlyExpenseAtRetirement: Math.round(futureMonthlyExpense),
    annualExpenseAtRetirement: Math.round(futureAnnualExpense),
    requiredRetirementCorpus: Math.round(requiredCorpus),
    futureValueOfExistingSavings: Math.round(fvExistingSavings),
    netAdditionalCorpusNeeded: Math.round(netCorpusGap),
    monthlySIPRequired: Math.round(monthlySIP),
    realReturnRatePostRetirement: parseFloat((realPostRate * 100).toFixed(2)),
  };
}

export function generateRetirementTimeline(input: RetirementInput): RetirementTimelineRow[] {
  const res = calculateRetirement(input);
  const timeline: RetirementTimelineRow[] = [];

  const yearsToRet = res.yearsToRetirement;
  const yearsInRet = res.yearsInRetirement;
  const inf = input.inflationRate / 100;
  const rPre = input.preRetirementReturnRate / 100;
  const rPost = input.postRetirementReturnRate / 100;
  const annualSIP = res.monthlySIPRequired * 12;

  let balance = input.existingRetirementSavings ?? 0;
  let expense = input.currentMonthlyExpenses * 12;

  // Phase 1: Accumulation
  for (let y = 1; y <= yearsToRet; y++) {
    const age = input.currentAge + y;
    balance = (balance + annualSIP) * (1 + rPre);
    expense = expense * (1 + inf);

    timeline.push({
      age,
      phase: 'Accumulation',
      annualExpenses: Math.round(expense),
      corpusBalance: Math.round(balance),
      annualSIPContribution: Math.round(annualSIP),
    });
  }

  // Phase 2: Retirement Distribution
  for (let y = 1; y <= yearsInRet; y++) {
    const age = input.retirementAge + y;
    balance = (balance - expense) * (1 + rPost);
    expense = expense * (1 + inf);

    timeline.push({
      age,
      phase: 'Retirement',
      annualExpenses: Math.round(expense),
      corpusBalance: Math.max(0, Math.round(balance)),
      annualSIPContribution: 0,
    });
  }

  return timeline;
}
