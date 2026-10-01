export type PregnancyCalcMethod = 'lmp' | 'conception' | 'ivf' | 'ultrasound';
export type IVFType = 'day3' | 'day5';

export interface PregnancyInput {
  method?: PregnancyCalcMethod; // default 'lmp'
  date: string; // ISO date string YYYY-MM-DD
  cycleLengthDays?: number; // default 28 (20 - 45)
  ivfType?: IVFType; // 'day3' | 'day5'
  ultrasoundWeeks?: number; // for ultrasound mode
  ultrasoundDays?: number; // for ultrasound mode
  targetDate?: string; // default today
}

export interface TrimesterMilestone {
  name: string;
  startDate: string;
  endDate: string;
  weeksRange: string;
  description: string;
  isCurrent: boolean;
}

export interface PregnancyResult {
  estimatedDueDate: string; // ISO YYYY-MM-DD
  formattedDueDate: string; // e.g., "October 15, 2026"
  currentGestationalAgeWeeks: number;
  currentGestationalAgeDays: number;
  totalGestationalDays: number;
  progressPercentage: number;
  daysRemaining: number;
  weeksRemaining: number;
  conceptionDateEstimated: string;
  currentTrimester: 'First Trimester' | 'Second Trimester' | 'Third Trimester' | 'Post-Term';
  trimesters: TrimesterMilestone[];
  isFullTerm: boolean;
  methodUsed: string;
}

export function validatePregnancyInput(input: PregnancyInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.date || isNaN(new Date(input.date).getTime())) {
    errors.date = 'Please select a valid date';
  }

  const cycle = input.cycleLengthDays ?? 28;
  if (cycle < 20 || cycle > 45) {
    errors.cycleLengthDays = 'Cycle length must be between 20 and 45 days';
  }

  if (input.method === 'ultrasound') {
    const w = input.ultrasoundWeeks ?? 0;
    const d = input.ultrasoundDays ?? 0;
    if (w < 4 || w > 36) errors.ultrasoundWeeks = 'Ultrasound gestational age must be between 4 and 36 weeks';
    if (d < 0 || d > 6) errors.ultrasoundDays = 'Days must be between 0 and 6';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function formatDateDisplay(d: Date): string {
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateISO(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateInput(dateStr: string): Date {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(dateStr);
}

/**
 * Calculates Estimated Due Date (EDD), gestational progress, and trimester dates
 * using ACOG & Naegele's clinical rules.
 */
export function calculatePregnancy(input: PregnancyInput): PregnancyResult {
  const method = input.method ?? 'lmp';
  const baseDate = parseDateInput(input.date);
  const targetDate = input.targetDate ? parseDateInput(input.targetDate) : new Date();

  // Reset time portions for pure date math
  baseDate.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  let edd = new Date(baseDate);
  let lmpEstimated = new Date(baseDate);
  let conceptionEstimated = new Date(baseDate);
  let methodLabel = "Naegele's Rule (Last Menstrual Period)";

  if (method === 'lmp') {
    const cycle = input.cycleLengthDays ?? 28;
    const cycleAdjustment = cycle - 28;
    // EDD = LMP + 280 days + cycle adjustment
    edd.setDate(baseDate.getDate() + 280 + cycleAdjustment);
    conceptionEstimated.setDate(baseDate.getDate() + 14 + cycleAdjustment);
  } else if (method === 'conception') {
    // EDD = Conception + 266 days
    edd.setDate(baseDate.getDate() + 266);
    lmpEstimated.setDate(baseDate.getDate() - 14);
    conceptionEstimated = new Date(baseDate);
    methodLabel = 'Estimated Conception Date (+266 days)';
  } else if (method === 'ivf') {
    const ivfType = input.ivfType ?? 'day5';
    const offset = ivfType === 'day5' ? 261 : 263;
    edd.setDate(baseDate.getDate() + offset);
    conceptionEstimated.setDate(baseDate.getDate() - (ivfType === 'day5' ? 5 : 3));
    lmpEstimated.setDate(conceptionEstimated.getDate() - 14);
    methodLabel = `IVF Transfer (${ivfType === 'day5' ? 'Day 5 Blastocyst' : 'Day 3 Embryo'})`;
  } else if (method === 'ultrasound') {
    const weeks = input.ultrasoundWeeks ?? 10;
    const days = input.ultrasoundDays ?? 0;
    const totalScanDays = weeks * 7 + days;
    const daysToEDD = 280 - totalScanDays;
    edd.setDate(baseDate.getDate() + daysToEDD);
    lmpEstimated.setDate(baseDate.getDate() - totalScanDays);
    conceptionEstimated.setDate(lmpEstimated.getDate() + 14);
    methodLabel = `Ultrasound Dating (${weeks}w ${days}d at scan)`;
  }

  // Calculate gestational age today
  // Gestational start is 280 days before EDD
  const gestationalStart = new Date(edd);
  gestationalStart.setDate(edd.getDate() - 280);

  const diffMs = targetDate.getTime() - gestationalStart.getTime();
  const totalGestationalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  const currentWeeks = Math.floor(totalGestationalDays / 7);
  const currentDays = totalGestationalDays % 7;

  const msToEDD = edd.getTime() - targetDate.getTime();
  const daysRemaining = Math.max(0, Math.floor(msToEDD / (1000 * 60 * 60 * 24)));
  const weeksRemaining = Math.max(0, Math.floor(daysRemaining / 7));

  const progressPct = Math.min(100, Math.max(0, parseFloat(((totalGestationalDays / 280) * 100).toFixed(1))));

  // Trimesters calculation
  const t1End = new Date(gestationalStart);
  t1End.setDate(gestationalStart.getDate() + 13 * 7);

  const t2Start = new Date(t1End);
  t2Start.setDate(t1End.getDate() + 1);

  const t2End = new Date(gestationalStart);
  t2End.setDate(gestationalStart.getDate() + 27 * 7);

  const t3Start = new Date(t2End);
  t3Start.setDate(t2End.getDate() + 1);

  let currentTrimester: 'First Trimester' | 'Second Trimester' | 'Third Trimester' | 'Post-Term' = 'First Trimester';
  if (currentWeeks <= 13) currentTrimester = 'First Trimester';
  else if (currentWeeks <= 27) currentTrimester = 'Second Trimester';
  else if (currentWeeks <= 41) currentTrimester = 'Third Trimester';
  else currentTrimester = 'Post-Term';

  const isFullTerm = currentWeeks >= 37;

  const trimesters: TrimesterMilestone[] = [
    {
      name: 'First Trimester',
      startDate: formatDateISO(gestationalStart),
      endDate: formatDateISO(t1End),
      weeksRange: 'Weeks 1 – 13',
      description: 'Major organogenesis, embryonic heartbeat detection, and early genetic screening window.',
      isCurrent: currentTrimester === 'First Trimester',
    },
    {
      name: 'Second Trimester',
      startDate: formatDateISO(t2Start),
      endDate: formatDateISO(t2End),
      weeksRange: 'Weeks 14 – 27',
      description: 'Anatomy anomaly scan (TIFFA, 18-20 wks), fetal movement detection, rapid growth.',
      isCurrent: currentTrimester === 'Second Trimester',
    },
    {
      name: 'Third Trimester',
      startDate: formatDateISO(t3Start),
      endDate: formatDateISO(edd),
      weeksRange: 'Weeks 28 – 40',
      description: 'Lung maturation, rapid weight gain, fetal positioning, and full term readiness (37+ weeks).',
      isCurrent: currentTrimester === 'Third Trimester' || currentTrimester === 'Post-Term',
    },
  ];

  return {
    estimatedDueDate: formatDateISO(edd),
    formattedDueDate: formatDateDisplay(edd),
    currentGestationalAgeWeeks: currentWeeks,
    currentGestationalAgeDays: currentDays,
    totalGestationalDays,
    progressPercentage: progressPct,
    daysRemaining,
    weeksRemaining,
    conceptionDateEstimated: formatDateISO(conceptionEstimated),
    currentTrimester,
    trimesters,
    isFullTerm,
    methodUsed: methodLabel,
  };
}
