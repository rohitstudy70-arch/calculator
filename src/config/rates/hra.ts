import { RateConfig } from './tax';

/**
 * HRA (House Rent Allowance) Exemption Rules under Rule 2A of Income Tax Rules
 */
export const hraConfig = {
  metroCityPercent: {
    value: 50.0, // 50% of (Basic + DA) for Delhi, Mumbai, Kolkata, Chennai
    lastVerified: '2026-09-30',
    source: 'Income Tax Rule 2A / CBDT',
  } as RateConfig<number>,
  nonMetroCityPercent: {
    value: 40.0, // 40% of (Basic + DA) for all other cities
    lastVerified: '2026-09-30',
    source: 'Income Tax Rule 2A / CBDT',
  } as RateConfig<number>,
  rentExcessPercent: {
    value: 10.0, // Rent paid in excess of 10% of (Basic + DA)
    lastVerified: '2026-09-30',
    source: 'Income Tax Rule 2A / CBDT',
  } as RateConfig<number>,
};
