import { RateConfig } from './tax';

/**
 * Small Savings Schemes & Provident Fund Interest Rates (Ministry of Finance / EPFO)
 */
export const smallSavingsConfig = {
  // PPF (Public Provident Fund)
  ppf: {
    interestRate: {
      value: 7.1,
      lastVerified: '2026-09-30',
      source: 'Ministry of Finance, Department of Economic Affairs notification',
      notes: 'Compounded annually, calculated on minimum balance between 5th and end of month.',
    } as RateConfig<number>,
    minDeposit: {
      value: 500,
      lastVerified: '2026-09-30',
      source: 'Public Provident Fund Scheme 2019',
    } as RateConfig<number>,
    maxDeposit: {
      value: 150000,
      lastVerified: '2026-09-30',
      source: 'Public Provident Fund Scheme 2019 / Section 80C',
    } as RateConfig<number>,
    tenureYears: {
      value: 15,
      lastVerified: '2026-09-30',
      source: 'Public Provident Fund Scheme 2019',
    } as RateConfig<number>,
    minAnnualDeposit: {
      value: 500,
      lastVerified: '2026-09-30',
      source: 'Public Provident Fund Scheme 2019',
    } as RateConfig<number>,
    maxAnnualDeposit: {
      value: 150000,
      lastVerified: '2026-09-30',
      source: 'Section 80C / PPF Scheme 2019',
    } as RateConfig<number>,
    lockInYears: {
      value: 15,
      lastVerified: '2026-09-30',
      source: 'PPF Scheme 2019 (Extendable in 5-year blocks)',
    } as RateConfig<number>,
  },

  // EPF (Employees' Provident Fund)
  epf: {
    interestRate: {
      value: 8.25,
      lastVerified: '2026-09-30',
      source: 'EPFO Central Board of Trustees (CBT) Notification',
      notes: 'Compounded annually, calculated on monthly running balances.',
    } as RateConfig<number>,
    employeeContributionPercent: {
      value: 12.0,
      lastVerified: '2026-09-30',
      source: 'EPF Scheme 1952',
    } as RateConfig<number>,
    employerEPFPercent: {
      value: 3.67,
      lastVerified: '2026-09-30',
      source: 'EPF Scheme 1952',
    } as RateConfig<number>,
    employerEPSPercent: {
      value: 8.33,
      lastVerified: '2026-09-30',
      source: 'Employees Pension Scheme 1995 (Capped at ₹15,000 wage ceiling)',
    } as RateConfig<number>,
    epsWageCeiling: {
      value: 15000,
      lastVerified: '2026-09-30',
      source: 'Ministry of Labour & Employment',
    } as RateConfig<number>,
  },

  // SSY (Sukanya Samriddhi Yojana)
  ssy: {
    interestRate: {
      value: 8.2,
      lastVerified: '2026-09-30',
      source: 'Ministry of Finance, Small Savings Scheme notification',
      notes: 'Compounded annually, dedicated scheme for girl child.',
    } as RateConfig<number>,
    minAnnualDeposit: {
      value: 250,
      lastVerified: '2026-09-30',
      source: 'Sukanya Samriddhi Account Rules 2019',
    } as RateConfig<number>,
    maxAnnualDeposit: {
      value: 150000,
      lastVerified: '2026-09-30',
      source: 'Sukanya Samriddhi Account Rules 2019',
    } as RateConfig<number>,
    maturityYears: {
      value: 21,
      lastVerified: '2026-09-30',
      source: '21 years from account opening or marriage after age 18',
    } as RateConfig<number>,
  },

  // NSC (National Savings Certificate - VIII Issue)
  nsc: {
    interestRate: {
      value: 7.7,
      lastVerified: '2026-09-30',
      source: 'Ministry of Finance Small Savings Rates',
      notes: 'Compounded annually, 5-year lock-in.',
    } as RateConfig<number>,
    tenureYears: {
      value: 5,
      lastVerified: '2026-09-30',
      source: 'NSC VIII Issue Scheme Rules',
    } as RateConfig<number>,
  },

  // SCSS (Senior Citizen Savings Scheme)
  scss: {
    interestRate: {
      value: 8.2,
      lastVerified: '2026-09-30',
      source: 'Ministry of Finance Small Savings Rates',
      notes: 'Quarterly interest payout.',
    } as RateConfig<number>,
    maxDepositLimit: {
      value: 3000000, // ₹30 Lakhs
      lastVerified: '2026-09-30',
      source: 'Finance Act 2023 limit enhancement',
    } as RateConfig<number>,
  },

  // Post Office MIS (Monthly Income Scheme)
  pomis: {
    interestRate: {
      value: 7.4,
      lastVerified: '2026-09-30',
      source: 'Ministry of Finance Small Savings Rates',
      notes: 'Monthly interest payout, 5-year tenure.',
    } as RateConfig<number>,
    singleAccountLimit: {
      value: 900000, // ₹9 Lakhs
      lastVerified: '2026-09-30',
      source: 'Post Office (Monthly Income Account) Amendment Rules 2023',
    } as RateConfig<number>,
    jointAccountLimit: {
      value: 1500000, // ₹15 Lakhs
      lastVerified: '2026-09-30',
      source: 'Post Office (Monthly Income Account) Amendment Rules 2023',
    } as RateConfig<number>,
  },
};
