export interface AgeInput {
  birthDate: string; // ISO date YYYY-MM-DD
  targetDate?: string; // ISO date YYYY-MM-DD (defaults to today)
}

export interface AgeMilestone {
  ageYears: number;
  date: string;
  dayOfWeek: string;
  isPassed: boolean;
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthdayDays: number;
  nextBirthdayMonths: number;
  nextBirthdayDate: string;
  nextBirthdayDayOfWeek: string;
  zodiacSign: string;
  formattedSummary: string;
  milestones: AgeMilestone[];
}

export function validateAgeInput(input: AgeInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.birthDate || isNaN(new Date(input.birthDate).getTime())) {
    errors.birthDate = 'Please select a valid birth date';
  } else {
    const birth = parseDate(input.birthDate);
    const target = input.targetDate ? parseDate(input.targetDate) : new Date();
    target.setHours(0, 0, 0, 0);

    if (birth.getTime() > target.getTime()) {
      errors.birthDate = 'Date of birth cannot be in the future relative to the target date';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
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

function formatDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getZodiac(month: number, day: number): string {
  // month: 1 - 12
  const cutoffs = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  const signs = [
    'Capricorn', // Dec 22 - Jan 19 (index 0)
    'Aquarius',  // Jan 20 - Feb 18 (index 1)
    'Pisces',    // Feb 19 - Mar 20 (index 2)
    'Aries',     // Mar 21 - Apr 19 (index 3)
    'Taurus',    // Apr 20 - May 20 (index 4)
    'Gemini',    // May 21 - Jun 20 (index 5)
    'Cancer',    // Jun 21 - Jul 22 (index 6)
    'Leo',       // Jul 23 - Aug 22 (index 7)
    'Virgo',     // Aug 23 - Sep 22 (index 8)
    'Libra',     // Sep 23 - Oct 22 (index 9)
    'Scorpio',   // Oct 23 - Nov 21 (index 10)
    'Sagittarius', // Nov 22 - Dec 21 (index 11)
  ];
  const idx = day < cutoffs[month - 1] ? month - 1 : month % 12;
  return signs[idx];
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Calculates exact age in years, months, days, cumulative units, and next birthday countdown.
 */
export function calculateAge(input: AgeInput): AgeResult {
  const birth = parseDate(input.birthDate);
  const target = input.targetDate ? parseDate(input.targetDate) : new Date();

  birth.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const bYear = birth.getFullYear();
  const bMonth = birth.getMonth();
  const rawBDay = birth.getDate();

  const tYear = target.getFullYear();
  const tMonth = target.getMonth();
  const tDay = target.getDate();

  // Handle Feb 29 birthdates in non-leap target years
  const maxDaysInBirthMonthOfTargetYear = new Date(tYear, bMonth + 1, 0).getDate();
  const bDay = Math.min(rawBDay, maxDaysInBirthMonthOfTargetYear);

  let years = tYear - bYear;
  let months = tMonth - bMonth;
  let days = tDay - bDay;

  if (days < 0) {
    // Borrow days from previous month
    months -= 1;
    // Number of days in previous month relative to target
    const prevMonthLastDay = new Date(tYear, tMonth, 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Total differences
  const diffMs = Math.max(0, target.getTime() - birth.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = parseFloat((totalDays / 7).toFixed(1));
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  // Next Birthday Calculation
  let nextBdayYear = tYear;
  let nextBday = new Date(nextBdayYear, bMonth, bDay);
  if (nextBday.getTime() < target.getTime()) {
    nextBdayYear += 1;
    nextBday = new Date(nextBdayYear, bMonth, bDay);
  }

  const msToNextBday = nextBday.getTime() - target.getTime();
  const nextBirthdayDays = Math.floor(msToNextBday / (1000 * 60 * 60 * 24));
  const nextBirthdayMonths = parseFloat((nextBirthdayDays / 30.4375).toFixed(1));
  const nextBirthdayDayOfWeek = DAYS_OF_WEEK[nextBday.getDay()];

  // Zodiac
  const zodiacSign = getZodiac(bMonth + 1, bDay);

  // Key life milestones
  const milestoneYears = [18, 21, 25, 30, 40, 50, 60, 75, 100];
  const milestones: AgeMilestone[] = milestoneYears.map((y) => {
    const mDate = new Date(bYear + y, bMonth, bDay);
    return {
      ageYears: y,
      date: formatDateISO(mDate),
      dayOfWeek: DAYS_OF_WEEK[mDate.getDay()],
      isPassed: mDate.getTime() <= target.getTime(),
    };
  });

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    totalMinutes,
    nextBirthdayDays,
    nextBirthdayMonths,
    nextBirthdayDate: formatDateISO(nextBday),
    nextBirthdayDayOfWeek,
    zodiacSign,
    formattedSummary: `${years} Years, ${months} Months, and ${days} Days`,
    milestones,
  };
}
