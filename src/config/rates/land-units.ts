/**
 * State-wise Traditional Indian Land Measurement Units
 * Initial states: Bihar, Uttar Pradesh, Delhi, Maharashtra
 * Reference base: Square Feet (sq ft)
 */

export interface StateLandUnits {
  stateName: string;
  stateNameHi: string;
  units: {
    unitKey: string;
    nameEn: string;
    nameHi: string;
    sqFtPerUnit: number;
    notes?: string;
  }[];
  lastVerified: string;
  source: string;
}

export const landUnitsByState: Record<string, StateLandUnits> = {
  bihar: {
    stateName: 'Bihar',
    stateNameHi: 'बिहार',
    lastVerified: '2026-09-30',
    source: 'Revenue and Land Reforms Department, Government of Bihar (Bhu-Abhilekh)',
    units: [
      { unitKey: 'bigha_pucca', nameEn: 'Pucca Bigha', nameHi: 'पक्का बीघा', sqFtPerUnit: 27225, notes: 'Standard 20 Katha = 1 Bigha (1 Katha = 1,361.25 sq ft)' },
      { unitKey: 'katha', nameEn: 'Katha', nameHi: 'कट्ठा', sqFtPerUnit: 1361.25, notes: '20 Dhur = 1 Katha' },
      { unitKey: 'dhur', nameEn: 'Dhur', nameHi: 'धूर', sqFtPerUnit: 68.06, notes: '20 Dhurki = 1 Dhur' },
      { unitKey: 'dhurki', nameEn: 'Dhurki', nameHi: 'धुरकी', sqFtPerUnit: 3.403 },
      { unitKey: 'acre', nameEn: 'Acre', nameHi: 'एकड़', sqFtPerUnit: 43560, notes: '1.6 Bigha in Bihar' },
      { unitKey: 'decimal', nameEn: 'Dismil / Decimal', nameHi: 'डिसमिल', sqFtPerUnit: 435.6, notes: '1/100th of an Acre' },
    ],
  },
  uttar_pradesh: {
    stateName: 'Uttar Pradesh',
    stateNameHi: 'उत्तर प्रदेश',
    lastVerified: '2026-09-30',
    source: 'UP Revenue Code / Board of Revenue Uttar Pradesh (Bhulekh UP)',
    units: [
      { unitKey: 'bigha_pucca', nameEn: 'Pucca Bigha', nameHi: 'पक्का बीघा', sqFtPerUnit: 27225, notes: '1 Bigha = 20 Biswa = 3,025 sq yards' },
      { unitKey: 'bigha_kaccha', nameEn: 'Kaccha Bigha (Western UP)', nameHi: 'कच्चा बीघा', sqFtPerUnit: 9075, notes: '1/3 of a Pucca Bigha = 1,008.33 sq yards' },
      { unitKey: 'biswa', nameEn: 'Biswa', nameHi: 'बिस्वा', sqFtPerUnit: 1361.25, notes: '1/20th of a Pucca Bigha' },
      { unitKey: 'biswansi', nameEn: 'Biswansi', nameHi: 'बिस्वांसी', sqFtPerUnit: 68.06, notes: '1/20th of a Biswa' },
      { unitKey: 'acre', nameEn: 'Acre', nameHi: 'एकड़', sqFtPerUnit: 43560, notes: '1 Acre = 1.6 Pucca Bigha = 4.8 Kaccha Bigha' },
      { unitKey: 'hectare', nameEn: 'Hectare', nameHi: 'हेक्टेयर', sqFtPerUnit: 107639, notes: 'Official revenue records standard (Khatauni)' },
    ],
  },
  delhi: {
    stateName: 'Delhi',
    stateNameHi: 'दिल्ली',
    lastVerified: '2026-09-30',
    source: 'Delhi Land Reforms Act / Revenue Department Govt of NCT of Delhi',
    units: [
      { unitKey: 'bigha', nameEn: 'Bigha', nameHi: 'बीघा', sqFtPerUnit: 9000, notes: 'Delhi standard: 1 Bigha = 1,000 sq yards (approx 9,000 sq ft) or 20 Biswa' },
      { unitKey: 'biswa', nameEn: 'Biswa', nameHi: 'बिस्वा', sqFtPerUnit: 450, notes: '1/20th of a Delhi Bigha = 50 sq yards = 450 sq ft' },
      { unitKey: 'biswansi', nameEn: 'Biswansi', nameHi: 'बिस्वांसी', sqFtPerUnit: 22.5 },
      { unitKey: 'acre', nameEn: 'Acre', nameHi: 'एकड़', sqFtPerUnit: 43560, notes: '1 Acre = 4.84 Delhi Bigha' },
      { unitKey: 'sq_yards', nameEn: 'Gaj (Square Yards)', nameHi: 'गज (वर्ग गज)', sqFtPerUnit: 9 },
    ],
  },
  maharashtra: {
    stateName: 'Maharashtra',
    stateNameHi: 'महाराष्ट्र',
    lastVerified: '2026-09-30',
    source: 'Maharashtra Land Revenue Code (MLRC) / Mahabhulekh (7/12 Extract)',
    units: [
      { unitKey: 'guntha', nameEn: 'Guntha', nameHi: 'गुंठा', sqFtPerUnit: 1089, notes: '1 Guntha = 121 sq yards = 1,089 sq ft (1/40th of an Acre)' },
      { unitKey: 'acre', nameEn: 'Acre', nameHi: 'एकड़', sqFtPerUnit: 43560, notes: '1 Acre = 40 Guntha' },
      { unitKey: 'hectare', nameEn: 'Hectare (Ha)', nameHi: 'हेक्टेयर', sqFtPerUnit: 107639, notes: '1 Hectare = 2.471 Acres = 98.84 Guntha' },
      { unitKey: 'sq_meter', nameEn: 'Square Meter (Sq M)', nameHi: 'वर्ग मीटर', sqFtPerUnit: 10.764 },
      { unitKey: 'bigha_vidarbha', nameEn: 'Bigha (Vidarbha region)', nameHi: 'बीघा (विदर्भ)', sqFtPerUnit: 27225, notes: 'Used in eastern Maharashtra' },
    ],
  },
};
