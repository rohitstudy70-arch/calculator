import { RateConfig } from './tax';

/**
 * GST (Goods and Services Tax) Slabs & Regulations (GST Council / CBIC)
 */
export const gstConfig = {
  standardSlabs: {
    value: [0, 3, 5, 12, 18, 28],
    lastVerified: '2026-09-30',
    source: 'GST Council / Central Board of Indirect Taxes and Customs (CBIC)',
    notes: '3% specifically for Gold and Precious metals; 18% standard services.',
  } as RateConfig<number[]>,
  defaultRate: {
    value: 18,
    lastVerified: '2026-09-30',
    source: 'CBIC Schedule of GST Rates for Services',
  } as RateConfig<number>,
  splitIntraState: {
    cgstPercent: 50, // 50% of total GST
    sgstPercent: 50, // 50% of total GST
    lastVerified: '2026-09-30',
    source: 'CGST Act 2017 / SGST Act 2017',
  },
  interState: {
    igstPercent: 100, // 100% of total GST
    lastVerified: '2026-09-30',
    source: 'IGST Act 2017',
  },
};
