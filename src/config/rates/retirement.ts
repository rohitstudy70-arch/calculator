import { RateConfig } from './tax';

/**
 * Gratuity & NPS Regulatory Limits
 */
export const retirementConfig = {
  // Gratuity
  gratuity: {
    taxExemptLimit: {
      value: 2000000, // ₹20 Lakhs under Section 10(10)
      lastVerified: '2026-09-30',
      source: 'Payment of Gratuity Act, 1972 (Amendment notification S.O. 1420(E)) / CBDT Notification',
      notes: 'Maximum statutory tax-free limit for private and government non-exempt employees.',
    } as RateConfig<number>,
    workingDaysPerMonth: {
      value: 26,
      lastVerified: '2026-09-30',
      source: 'Payment of Gratuity Act, 1972 Section 4(2)',
    } as RateConfig<number>,
    daysPerYearService: {
      value: 15,
      lastVerified: '2026-09-30',
      source: 'Payment of Gratuity Act, 1972 Section 4(2)',
    } as RateConfig<number>,
    halfMonthFactorNotCovered: {
      value: 0.5,
      lastVerified: '2026-09-30',
      source: 'Income Tax Act Section 10(10)(iii)',
    } as RateConfig<number>,
    minServiceYears: {
      value: 5,
      lastVerified: '2026-09-30',
      source: 'Payment of Gratuity Act Section 4(1)',
      notes: 'Minimum 5 continuous years of service required, except in case of death or disablement.',
    } as RateConfig<number>,
  },

  // NPS
  nps: {
    minAnnuityPercent: {
      value: 40.0,
      lastVerified: '2026-09-30',
      source: 'PFRDA (Exit and Withdrawal under NPS) Regulations',
      notes: 'Minimum 40% of corpus must be used to purchase annuity at age 60.',
    } as RateConfig<number>,
    maxLumpsumPercent: {
      value: 60.0,
      lastVerified: '2026-09-30',
      source: 'PFRDA / Income Tax Act Section 10(12A)',
      notes: 'Up to 60% can be withdrawn tax-free as lump sum.',
    } as RateConfig<number>,
    defaultExpectedReturnRate: {
      value: 10.0,
      lastVerified: '2026-09-30',
      source: 'Historical average across NPS Tier-1 Auto and Active choices',
    } as RateConfig<number>,
    defaultAnnuityReturnRate: {
      value: 6.0,
      lastVerified: '2026-09-30',
      source: 'Average Annuity Service Provider (ASP) rates',
    } as RateConfig<number>,
  },
};
