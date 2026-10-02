export type Category = 'general' | 'obc' | 'sc_st' | 'pwd' | 'pwd_obc' | 'pwd_sc_st' | 'ex_serviceman';

export interface ExamPreset {
  name: string;
  nameHi: string;
  cutoffDate: string;
  minAge: number;
  maxAge: number;
  relaxation: Record<Category, number>;
  description: string;
}

export interface SarkariAgeInput {
  birthDate: string;
  cutoffDate: string;
  category: Category;
  minAge: number;
  maxAge: number;
}

export interface SarkariAgeResult {
  ageOnCutoff: { years: number; months: number; days: number };
  ageInYearsDecimal: number;
  totalDays: number;
  isEligible: boolean;
  isTooYoung: boolean;
  isTooOld: boolean;
  category: Category;
  categoryLabel: string;
  relaxationYears: number;
  effectiveMaxAge: number;
  yearsRemaining: number;
  lastDateToApply: string;
  message: string;
}

export const EXAM_PRESETS: ExamPreset[] = [
  {
    name: 'UPSC CSE (IAS/IPS)',
    nameHi: 'यूपीएससी सिविल सेवा (IAS/IPS)',
    cutoffDate: '2026-08-01',
    minAge: 21,
    maxAge: 32,
    relaxation: { general: 0, obc: 3, sc_st: 5, pwd: 10, pwd_obc: 13, pwd_sc_st: 15, ex_serviceman: 5 },
    description: 'Union Public Service Commission Civil Services Examination',
  },
  {
    name: 'SSC CGL',
    nameHi: 'एसएससी सीजीएल',
    cutoffDate: '2026-01-01',
    minAge: 18,
    maxAge: 32,
    relaxation: { general: 0, obc: 3, sc_st: 5, pwd: 10, pwd_obc: 13, pwd_sc_st: 15, ex_serviceman: 3 },
    description: 'Staff Selection Commission Combined Graduate Level',
  },
  {
    name: 'SSC CHSL',
    nameHi: 'एसएससी सीएचएसएल',
    cutoffDate: '2026-01-01',
    minAge: 18,
    maxAge: 27,
    relaxation: { general: 0, obc: 3, sc_st: 5, pwd: 10, pwd_obc: 13, pwd_sc_st: 15, ex_serviceman: 3 },
    description: 'Staff Selection Commission Combined Higher Secondary Level',
  },
  {
    name: 'IBPS PO',
    nameHi: 'आईबीपीएस पीओ',
    cutoffDate: '2026-08-01',
    minAge: 20,
    maxAge: 30,
    relaxation: { general: 0, obc: 3, sc_st: 5, pwd: 10, pwd_obc: 13, pwd_sc_st: 15, ex_serviceman: 5 },
    description: 'Institute of Banking Personnel Selection Probationary Officers',
  },
  {
    name: 'IBPS Clerk',
    nameHi: 'आईबीपीएस क्लर्क',
    cutoffDate: '2026-08-01',
    minAge: 20,
    maxAge: 28,
    relaxation: { general: 0, obc: 3, sc_st: 5, pwd: 10, pwd_obc: 13, pwd_sc_st: 15, ex_serviceman: 3 },
    description: 'Institute of Banking Personnel Selection Clerical Cadre',
  },
  {
    name: 'RRB NTPC',
    nameHi: 'आरआरबी एनटीपीसी',
    cutoffDate: '2026-07-01',
    minAge: 18,
    maxAge: 33,
    relaxation: { general: 0, obc: 3, sc_st: 5, pwd: 10, pwd_obc: 13, pwd_sc_st: 15, ex_serviceman: 3 },
    description: 'Railway Recruitment Board Non Technical Popular Categories',
  },
  {
    name: 'NDA',
    nameHi: 'एनडीए',
    cutoffDate: '2026-07-01',
    minAge: 16.5,
    maxAge: 19.5,
    relaxation: { general: 0, obc: 0, sc_st: 0, pwd: 0, pwd_obc: 0, pwd_sc_st: 0, ex_serviceman: 0 },
    description: 'National Defence Academy',
  },
  {
    name: 'Custom / Other Exam',
    nameHi: 'कस्टम / अन्य परीक्षा',
    cutoffDate: '2026-07-01',
    minAge: 18,
    maxAge: 35,
    relaxation: { general: 0, obc: 3, sc_st: 5, pwd: 10, pwd_obc: 13, pwd_sc_st: 15, ex_serviceman: 5 },
    description: 'Enter custom age limits for any exam',
  },
];

export function getCategoryLabel(category: Category): string {
  switch (category) {
    case 'general': return 'General (UR)';
    case 'obc': return 'OBC (Non-Creamy Layer)';
    case 'sc_st': return 'SC/ST';
    case 'pwd': return 'PwD (General)';
    case 'pwd_obc': return 'PwD + OBC';
    case 'pwd_sc_st': return 'PwD + SC/ST';
    case 'ex_serviceman': return 'Ex-Serviceman';
    default: return 'General';
  }
}

export function getRelaxation(category: Category, examPreset?: ExamPreset): number {
  if (examPreset) {
    return examPreset.relaxation[category] || 0;
  }
  return EXAM_PRESETS[7].relaxation[category] || 0; // fallback to Custom preset relaxation
}

function parseDate(dStr: string): Date {
  const parts = dStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }
  const d = new Date(dStr);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function validateSarkariAgeInput(input: SarkariAgeInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.birthDate || isNaN(new Date(input.birthDate).getTime())) {
    errors.birthDate = 'Please select a valid birth date';
  } else if (!input.cutoffDate || isNaN(new Date(input.cutoffDate).getTime())) {
    errors.cutoffDate = 'Please select a valid cutoff date';
  } else {
    const birth = parseDate(input.birthDate);
    const target = parseDate(input.cutoffDate);
    
    if (birth.getTime() > target.getTime()) {
      errors.cutoffDate = 'Cutoff date cannot be before date of birth';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function formatDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function calculateSarkariAge(input: SarkariAgeInput): SarkariAgeResult {
  const birth = parseDate(input.birthDate);
  const target = parseDate(input.cutoffDate);

  const bYear = birth.getFullYear();
  const bMonth = birth.getMonth();
  const rawBDay = birth.getDate();

  const tYear = target.getFullYear();
  const tMonth = target.getMonth();
  const tDay = target.getDate();

  const maxDaysInBirthMonthOfTargetYear = new Date(tYear, bMonth + 1, 0).getDate();
  const bDay = Math.min(rawBDay, maxDaysInBirthMonthOfTargetYear);

  let years = tYear - bYear;
  let months = tMonth - bMonth;
  let days = tDay - bDay;

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(tYear, tMonth, 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const ageInYearsDecimal = years + (months / 12) + (days / 365.25);
  
  const diffMs = Math.max(0, target.getTime() - birth.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const customPreset = EXAM_PRESETS.find(p => p.name === 'Custom / Other Exam')!;
  const preset = EXAM_PRESETS.find(p => p.cutoffDate === input.cutoffDate && p.minAge === input.minAge && p.maxAge === input.maxAge) || customPreset;
  
  const relaxationYears = getRelaxation(input.category, preset);
  const effectiveMaxAge = input.maxAge + relaxationYears;
  
  // They must not have attained the effective max age
  const isTooOld = ageInYearsDecimal >= effectiveMaxAge;
  const isTooYoung = ageInYearsDecimal < input.minAge;
  const isEligible = !isTooOld && !isTooYoung;
  
  let message = '';
  if (isEligible) {
    message = 'Eligible ✅';
  } else if (isTooOld) {
    message = 'Over-age ❌';
  } else {
    message = 'Under-age ⚠️';
  }

  // Calculate years remaining if eligible or young
  let yearsRemaining = 0;
  if (!isTooOld) {
    yearsRemaining = Math.max(0, Math.floor(effectiveMaxAge - ageInYearsDecimal));
  }

  // Last date to apply: the day before they hit the effectiveMaxAge
  // i.e., DOB + effectiveMaxAge years - 1 day
  // To handle fractional max age (like 19.5 for NDA):
  const maxAgeYearsFull = Math.floor(effectiveMaxAge);
  const maxAgeMonthsFull = Math.round((effectiveMaxAge - maxAgeYearsFull) * 12);
  
  const lastDateObj = new Date(bYear + maxAgeYearsFull, bMonth + maxAgeMonthsFull, rawBDay);
  lastDateObj.setDate(lastDateObj.getDate() - 1);
  const lastDateToApply = formatDateISO(lastDateObj);

  return {
    ageOnCutoff: { years, months, days },
    ageInYearsDecimal,
    totalDays,
    isEligible,
    isTooYoung,
    isTooOld,
    category: input.category,
    categoryLabel: getCategoryLabel(input.category),
    relaxationYears,
    effectiveMaxAge,
    yearsRemaining,
    lastDateToApply,
    message,
  };
}
