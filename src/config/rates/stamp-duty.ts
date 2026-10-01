import { RateConfig } from './tax';

/**
 * State-wise Stamp Duty & Property Registration Charges (India)
 * Initial coverage: Bihar, Uttar Pradesh, Delhi, Maharashtra
 */

export interface StateStampDuty {
  stateName: string;
  stateNameHi: string;
  maleStampDutyPercent: number;
  femaleStampDutyPercent: number;
  jointStampDutyPercent: number;
  registrationFeePercent: number;
  registrationFeeCap?: number; // In INR if capped
  metroCessOrSurchargePercent?: number;
  lastVerified: string;
  source: string;
  notes?: string;
}

export const stampDutyByState: Record<string, StateStampDuty> = {
  bihar: {
    stateName: 'Bihar',
    stateNameHi: 'बिहार',
    maleStampDutyPercent: 6.0,
    femaleStampDutyPercent: 5.7, // 0.3% concession for women
    jointStampDutyPercent: 5.85,
    registrationFeePercent: 2.0,
    lastVerified: '2026-09-30',
    source: 'Registration, Excise & Prohibition Department, Govt of Bihar',
    notes: 'Stamp duty: 6% for male, 5.7% for female buyers across urban & rural areas.',
  },
  uttar_pradesh: {
    stateName: 'Uttar Pradesh',
    stateNameHi: 'उत्तर प्रदेश',
    maleStampDutyPercent: 7.0,
    femaleStampDutyPercent: 6.0, // 1% concession (up to ₹10,000 max rebate on property value up to ₹10L)
    jointStampDutyPercent: 6.5,
    registrationFeePercent: 1.0,
    registrationFeeCap: 20000, // Capped at ₹20,000 under recent IGRS UP reforms
    lastVerified: '2026-09-30',
    source: 'IGRS Uttar Pradesh (Stamps and Registration Department)',
    notes: 'Standard 7% stamp duty; 1% rebate for female purchasers.',
  },
  delhi: {
    stateName: 'Delhi',
    stateNameHi: 'दिल्ली',
    maleStampDutyPercent: 6.0,
    femaleStampDutyPercent: 4.0, // 2% concession for women
    jointStampDutyPercent: 5.0,
    registrationFeePercent: 1.0,
    lastVerified: '2026-09-30',
    source: 'Department of Revenue, Govt of NCT of Delhi',
    notes: 'Male: 6% (4% stamp duty + 2% municipal transfer duty). Female: 4% (3% + 1%). Joint: 5%.',
  },
  maharashtra: {
    stateName: 'Maharashtra',
    stateNameHi: 'महाराष्ट्र',
    maleStampDutyPercent: 6.0, // 5% base + 1% metro cess/LBT in Mumbai/Pune
    femaleStampDutyPercent: 5.0, // 1% concession for female home buyers
    jointStampDutyPercent: 6.0,
    registrationFeePercent: 1.0,
    registrationFeeCap: 30000, // Capped at ₹30,000 for residential properties > ₹30 Lakhs
    metroCessOrSurchargePercent: 1.0,
    lastVerified: '2026-09-30',
    source: 'Department of Registration and Stamps (IGR Maharashtra)',
    notes: 'Mumbai/Pune: 5% stamp duty + 1% Metro Cess = 6%. Women get 1% concession on residential.',
  },
};
