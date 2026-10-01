/**
 * Centralized Government & Statutory Financial Rates / Limits for India
 * All calculators must reference these rates instead of hardcoding.
 */

export interface RateConfig<T> {
  value: T;
  lastVerified: string; // ISO date string (YYYY-MM-DD)
  source: string;
  notes?: string;
}

export const RATES = {
  // EPF (Employees' Provident Fund)
  epf: {
    interestRate: {
      value: 8.25, // % per annum for FY 2023-24 / FY 2024-25 / FY 2025-26
      lastVerified: '2026-09-30',
      source: 'EPFO Central Board of Trustees (CBT) Notification',
      notes: 'Compounded annually, calculated on monthly running balances.',
    },
    employeeContributionPercent: {
      value: 12.0, // 12% of (Basic + DA)
      lastVerified: '2026-09-30',
      source: 'EPF Scheme 1952',
    },
    employerEPFPercent: {
      value: 3.67, // % of Basic + DA to EPF
      lastVerified: '2026-09-30',
      source: 'EPF Scheme 1952',
    },
    employerEPSPercent: {
      value: 8.33, // % of Basic + DA to EPS (capped at ₹15,000 wage ceiling = ₹1,250/mo)
      lastVerified: '2026-09-30',
      source: 'Employees Pension Scheme 1995',
    },
    epsWageCeiling: {
      value: 15000, // ₹15,000 per month
      lastVerified: '2026-09-30',
      source: 'Ministry of Labour & Employment',
    },
  },

  // NPS (National Pension System)
  nps: {
    minAnnuityPercent: {
      value: 40.0, // Minimum 40% of corpus must be used to purchase annuity at age 60
      lastVerified: '2026-09-30',
      source: 'PFRDA (Exit and Withdrawal under NPS) Regulations',
      notes: 'Up to 60% can be withdrawn tax-free as lump sum.',
    },
    maxLumpsumPercent: {
      value: 60.0, // Up to 60% lump sum withdrawal
      lastVerified: '2026-09-30',
      source: 'PFRDA / Income Tax Act Section 10(12A)',
    },
    defaultExpectedReturnRate: {
      value: 10.0, // Average blended historical return
      lastVerified: '2026-09-30',
      source: 'Historical average across NPS Tier-1 Aggressive & Moderate Auto/Active choices',
    },
    defaultAnnuityReturnRate: {
      value: 6.0, // Typical annuity return from ASPs (LIC, SBI Life, HDFC Life)
      lastVerified: '2026-09-30',
      source: 'Average Annuity Service Provider (ASP) rates',
    },
  },

  // Gratuity
  gratuity: {
    taxExemptLimit: {
      value: 2000000, // ₹20,00,000 (₹20 Lakhs) under Section 10(10)
      lastVerified: '2026-09-30',
      source: 'Payment of Gratuity Act, 1972 (Amendment notification S.O. 1420(E))',
      notes: 'Maximum statutory tax-free limit for private and government non-exempt employees.',
    },
    workingDaysPerMonth: {
      value: 26, // Statutory 26 working days used for calculating 15 days wages
      lastVerified: '2026-09-30',
      source: 'Payment of Gratuity Act, 1972 Section 4(2)',
    },
    daysPerYearService: {
      value: 15, // 15 days of last drawn salary per completed year of service
      lastVerified: '2026-09-30',
      source: 'Payment of Gratuity Act, 1972 Section 4(2)',
    },
    halfMonthFactorNotCovered: {
      value: 0.5, // 15/30 = 0.5 month wages per completed year for establishments not covered
      lastVerified: '2026-09-30',
      source: 'Income Tax Act Section 10(10)(iii)',
    },
    minServiceYears: {
      value: 5, // Minimum 5 years of continuous service required (except in case of death/disability)
      lastVerified: '2026-09-30',
      source: 'Payment of Gratuity Act Section 4(1)',
    },
  },

  // HRA (House Rent Allowance) Exemption
  hra: {
    metroCityPercent: {
      value: 50.0, // 50% of (Basic + DA) for Delhi, Mumbai, Kolkata, Chennai
      lastVerified: '2026-09-30',
      source: 'Income Tax Rule 2A',
    },
    nonMetroCityPercent: {
      value: 40.0, // 40% of (Basic + DA) for all other cities
      lastVerified: '2026-09-30',
      source: 'Income Tax Rule 2A',
    },
    rentExcessPercent: {
      value: 10.0, // Rent paid in excess of 10% of (Basic + DA)
      lastVerified: '2026-09-30',
      source: 'Income Tax Rule 2A',
    },
  },

  // PPF & Small Savings
  ppf: {
    interestRate: {
      value: 7.1, // % per annum
      lastVerified: '2026-09-30',
      source: 'Ministry of Finance, DEA notification',
      notes: 'Compounded annually, EEE tax status under Section 80C.',
    },
    minDeposit: {
      value: 500,
      lastVerified: '2026-09-30',
      source: 'Public Provident Fund Scheme 2019',
    },
    maxDeposit: {
      value: 150000,
      lastVerified: '2026-09-30',
      source: 'Public Provident Fund Scheme 2019 / Section 80C',
    },
    tenureYears: {
      value: 15,
      lastVerified: '2026-09-30',
      source: 'Public Provident Fund Scheme 2019',
    },
  },

  // Statutory disclaimer message required across all calculator pages
  disclaimerNote: {
    en: 'Rates, limits and rules are updated periodically; verify with official sources before making financial decisions.',
    hi: 'दरें, सीमाएं और नियम समय-समय पर अपडेट किए जाते हैं; वित्तीय निर्णय लेने से पहले आधिकारिक स्रोतों से पुष्टि करें।',
  },
} as const;
