/**
 * State-wise Domestic Electricity Tariff Slabs (India)
 * Initial coverage: Bihar, Uttar Pradesh, Delhi, Maharashtra
 */

export interface ElectricitySlab {
  minUnits: number;
  maxUnits: number | null;
  ratePerUnit: number; // in INR
}

export interface StateElectricityTariff {
  stateName: string;
  stateNameHi: string;
  fixedMonthlyCharge: number; // In INR per kW or per connection
  slabs: ElectricitySlab[];
  electricityDutyPercent: number; // State electricity tax %
  subsidyNote?: string;
  lastVerified: string;
  source: string;
}

export const electricityTariffsByState: Record<string, StateElectricityTariff> = {
  bihar: {
    stateName: 'Bihar',
    stateNameHi: 'बिहार (NBPDCL / SBPDCL)',
    fixedMonthlyCharge: 40,
    electricityDutyPercent: 6.0,
    lastVerified: '2026-09-30',
    source: 'Bihar Electricity Regulatory Commission (BERC) Tariff Order',
    subsidyNote: 'State government offers direct tariff subsidy reflected in net billing.',
    slabs: [
      { minUnits: 0, maxUnits: 100, ratePerUnit: 4.27 },
      { minUnits: 100, maxUnits: 200, ratePerUnit: 5.12 },
      { minUnits: 200, maxUnits: null, ratePerUnit: 6.22 },
    ],
  },
  uttar_pradesh: {
    stateName: 'Uttar Pradesh',
    stateNameHi: 'उत्तर प्रदेश (UPPCL)',
    fixedMonthlyCharge: 110, // ₹110 per kW per month
    electricityDutyPercent: 5.0,
    lastVerified: '2026-09-30',
    source: 'UP Electricity Regulatory Commission (UPERC) Multi-Year Tariff Order',
    slabs: [
      { minUnits: 0, maxUnits: 150, ratePerUnit: 5.50 },
      { minUnits: 150, maxUnits: 300, ratePerUnit: 6.00 },
      { minUnits: 300, maxUnits: 500, ratePerUnit: 6.50 },
      { minUnits: 500, maxUnits: null, ratePerUnit: 7.00 },
    ],
  },
  delhi: {
    stateName: 'Delhi',
    stateNameHi: 'दिल्ली (BRPL / BYPL / TPDDL)',
    fixedMonthlyCharge: 40,
    electricityDutyPercent: 5.0,
    subsidyNote: 'Zero bill for consumption up to 200 units under Delhi Govt electricity subsidy scheme; 50% subsidy up to ₹800 for 201-400 units.',
    lastVerified: '2026-09-30',
    source: 'Delhi Electricity Regulatory Commission (DERC) Tariff Schedule',
    slabs: [
      { minUnits: 0, maxUnits: 200, ratePerUnit: 3.00 },
      { minUnits: 200, maxUnits: 400, ratePerUnit: 4.50 },
      { minUnits: 400, maxUnits: 800, ratePerUnit: 6.50 },
      { minUnits: 800, maxUnits: 1200, ratePerUnit: 7.00 },
      { minUnits: 1200, maxUnits: null, ratePerUnit: 8.00 },
    ],
  },
  maharashtra: {
    stateName: 'Maharashtra',
    stateNameHi: 'महाराष्ट्र (MSEDCL / Mahavitaran)',
    fixedMonthlyCharge: 128,
    electricityDutyPercent: 16.0,
    lastVerified: '2026-09-30',
    source: 'Maharashtra Electricity Regulatory Commission (MERC) Tariff Order',
    slabs: [
      { minUnits: 0, maxUnits: 100, ratePerUnit: 5.88 },
      { minUnits: 100, maxUnits: 300, ratePerUnit: 11.26 },
      { minUnits: 300, maxUnits: 500, ratePerUnit: 15.72 },
      { minUnits: 500, maxUnits: null, ratePerUnit: 17.81 },
    ],
  },
};
