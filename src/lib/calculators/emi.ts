export interface EMIInput {
  principal: number;
  annualRate: number;
  tenureMonths: number;
}

export interface EMIResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  principalPercentage: number;
  interestPercentage: number;
}

export interface EMIScheduleRow {
  month: number;
  year: number;
  emi: number;
  principal: number;
  interest: number;
  totalPrincipalPaid: number;
  totalInterestPaid: number;
  balance: number;
}

export interface YearlyEMISummary {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  balance: number;
}

export function validateEMIInput(input: EMIInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.principal < 0) {
    errors.principal = 'Principal amount cannot be negative.';
  } else if (input.principal === 0) {
    errors.principal = 'Principal amount must be greater than zero.';
  }

  if (input.annualRate < 0) {
    errors.annualRate = 'Annual interest rate cannot be negative.';
  }

  if (input.tenureMonths <= 0) {
    errors.tenureMonths = 'Tenure must be greater than zero.';
  } else if (!Number.isInteger(input.tenureMonths)) {
    errors.tenureMonths = 'Tenure must be in whole months.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateEMI(input: EMIInput): EMIResult {
  const { principal, annualRate, tenureMonths } = input;

  if (annualRate === 0) {
    const emi = principal / tenureMonths;
    return {
      emi,
      totalPayment: principal,
      totalInterest: 0,
      principalPercentage: 100,
      interestPercentage: 0,
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  const principalPercentage = (principal / totalPayment) * 100;
  const interestPercentage = (totalInterest / totalPayment) * 100;

  return {
    emi,
    totalPayment,
    totalInterest,
    principalPercentage,
    interestPercentage,
  };
}

export function generateAmortizationSchedule(input: EMIInput): EMIScheduleRow[] {
  const { principal, annualRate, tenureMonths } = input;
  const schedule: EMIScheduleRow[] = [];
  
  const { emi } = calculateEMI(input);
  const monthlyRate = annualRate / 12 / 100;
  
  let balance = principal;
  let totalPrincipalPaid = 0;
  let totalInterestPaid = 0;
  let currentYear = 1;

  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * monthlyRate;
    let principalComponent = emi - interest;
    
    // In the last month, adjust for rounding errors
    if (month === tenureMonths) {
      principalComponent = balance;
    }
    
    balance = Math.max(0, balance - principalComponent);
    totalPrincipalPaid += principalComponent;
    totalInterestPaid += interest;

    schedule.push({
      month,
      year: currentYear,
      emi: principalComponent + interest,
      principal: principalComponent,
      interest,
      totalPrincipalPaid,
      totalInterestPaid,
      balance,
    });

    if (month % 12 === 0) {
      currentYear++;
    }
  }

  return schedule;
}

export function generateYearlySummary(input: EMIInput): YearlyEMISummary[] {
  const schedule = generateAmortizationSchedule(input);
  const yearlySummaryMap = new Map<number, YearlyEMISummary>();

  schedule.forEach((row) => {
    const existing = yearlySummaryMap.get(row.year);
    if (existing) {
      existing.principalPaid += row.principal;
      existing.interestPaid += row.interest;
      existing.totalPaid += row.emi;
      existing.balance = row.balance; // Balance at the end of the year
    } else {
      yearlySummaryMap.set(row.year, {
        year: row.year,
        principalPaid: row.principal,
        interestPaid: row.interest,
        totalPaid: row.emi,
        balance: row.balance,
      });
    }
  });

  return Array.from(yearlySummaryMap.values());
}
