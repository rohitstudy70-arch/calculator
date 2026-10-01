/**
 * Income Tax Slabs & Deductions Configuration (FY 2025-26 / AY 2026-27)
 */

export interface RateConfig<T> {
  value: T;
  lastVerified: string;
  source: string;
  notes?: string;
}

export interface TaxSlab {
  min: number;
  max: number | null;
  rate: number;
}

export const incomeTaxConfig = {
  newRegime: {
    standardDeduction: {
      value: 75000,
      lastVerified: '2026-09-30',
      source: 'Finance Act 2024 / Union Budget FY 2024-25',
      notes: 'Increased from ₹50,000 to ₹75,000 under Section 16(ia)',
    },
    rebateLimit87A: {
      value: 700000,
      lastVerified: '2026-09-30',
      source: 'Section 87A Income Tax Act 1961',
      notes: 'Full tax rebate up to ₹25,000 for taxable income ≤ ₹7,00,000',
    },
    maxRebate87A: {
      value: 25000,
      lastVerified: '2026-09-30',
      source: 'Section 87A Income Tax Act 1961',
    },
    slabs: {
      value: [
        { min: 0, max: 300000, rate: 0 },
        { min: 300000, max: 700000, rate: 0.05 },
        { min: 700000, max: 1000000, rate: 0.10 },
        { min: 1000000, max: 1200000, rate: 0.15 },
        { min: 1200000, max: 1500000, rate: 0.20 },
        { min: 1500000, max: null, rate: 0.30 },
      ] as TaxSlab[],
      lastVerified: '2026-09-30',
      source: 'Income Tax Department (CBDT) Slabs FY 2025-26',
    },
  },
  oldRegime: {
    standardDeduction: {
      value: 50000,
      lastVerified: '2026-09-30',
      source: 'Section 16(ia) Income Tax Act 1961',
    },
    rebateLimit87A: {
      value: 500000,
      lastVerified: '2026-09-30',
      source: 'Section 87A Income Tax Act 1961',
      notes: 'Rebate up to ₹12,500 if taxable income ≤ ₹5,00,000',
    },
    maxRebate87A: {
      value: 12500,
      lastVerified: '2026-09-30',
      source: 'Section 87A Income Tax Act 1961',
    },
    limit80C: {
      value: 150000,
      lastVerified: '2026-09-30',
      source: 'Section 80C Income Tax Act 1961',
    },
    limit80CCD1B: {
      value: 50000,
      lastVerified: '2026-09-30',
      source: 'Section 80CCD(1B) Income Tax Act 1961',
      notes: 'Additional NPS deduction over and above Section 80C',
    },
    limit24bHomeLoanInterest: {
      value: 200000,
      lastVerified: '2026-09-30',
      source: 'Section 24(b) Income Tax Act 1961',
      notes: 'Max interest deduction for self-occupied residential property',
    },
    slabsGeneral: {
      value: [
        { min: 0, max: 250000, rate: 0 },
        { min: 250000, max: 500000, rate: 0.05 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: null, rate: 0.30 },
      ] as TaxSlab[],
      lastVerified: '2026-09-30',
      source: 'Income Tax Department (CBDT)',
    },
    slabsSeniorCitizen: {
      value: [
        { min: 0, max: 300000, rate: 0 },
        { min: 300000, max: 500000, rate: 0.05 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: null, rate: 0.30 },
      ] as TaxSlab[],
      lastVerified: '2026-09-30',
      source: 'Income Tax Department (CBDT) for age 60 to 79',
    },
    slabsSuperSeniorCitizen: {
      value: [
        { min: 0, max: 500000, rate: 0 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: null, rate: 0.30 },
      ] as TaxSlab[],
      lastVerified: '2026-09-30',
      source: 'Income Tax Department (CBDT) for age 80+',
    },
  },
  cessPercent: {
    value: 4.0,
    lastVerified: '2026-09-30',
    source: 'Finance Act 2018 (Health & Education Cess on Income Tax + Surcharge)',
  },
};
