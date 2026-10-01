export type WorkWeekType = '5days' | '6days'; // 5-day (Mon-Fri) or 6-day (Mon-Sat)

export interface DateDifferenceInput {
  startDate: string; // ISO YYYY-MM-DD
  endDate: string; // ISO YYYY-MM-DD
  includeEndDate?: boolean; // default false
  workWeekType?: WorkWeekType; // default '5days'
}

export interface DateDifferenceResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  workingDays: number;
  weekendDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  formattedDifference: string;
  isSameDate: boolean;
  isReversed: boolean;
}

export function validateDateDifferenceInput(input: DateDifferenceInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.startDate || isNaN(new Date(input.startDate).getTime())) {
    errors.startDate = 'Please select a valid start date';
  }
  if (!input.endDate || isNaN(new Date(input.endDate).getTime())) {
    errors.endDate = 'Please select a valid end date';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function parseDateParts(dStr: string): Date {
  const parts = dStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }
  const d = new Date(dStr);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Calculates calendar duration, calendar days, and working/business days between two dates.
 */
export function calculateDateDifference(input: DateDifferenceInput): DateDifferenceResult {
  let start = parseDateParts(input.startDate);
  let end = parseDateParts(input.endDate);
  const includeEnd = input.includeEndDate ?? false;
  const workWeek = input.workWeekType ?? '5days';

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const isReversed = end.getTime() < start.getTime();
  if (isReversed) {
    const temp = start;
    start = end;
    end = temp;
  }

  // Adjust end date if inclusive
  const calcEnd = new Date(end);
  if (includeEnd) {
    calcEnd.setDate(calcEnd.getDate() + 1);
  }

  const sYear = start.getFullYear();
  const sMonth = start.getMonth();
  const sDay = start.getDate();

  const eYear = calcEnd.getFullYear();
  const eMonth = calcEnd.getMonth();
  const eDay = calcEnd.getDate();

  let years = eYear - sYear;
  let months = eMonth - sMonth;
  let days = eDay - sDay;

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(eYear, eMonth, 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Total calendar days
  const diffMs = calcEnd.getTime() - start.getTime();
  const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const totalWeeks = parseFloat((totalDays / 7).toFixed(1));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  // Calculate working days & weekend days iteration
  let workingDays = 0;
  let weekendDays = 0;

  const cur = new Date(start);
  while (cur.getTime() < calcEnd.getTime()) {
    const dayOfWeek = cur.getDay(); // 0 = Sun, 6 = Sat
    if (workWeek === '5days') {
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        workingDays++;
      }
    } else {
      // 6 days work week (Mon - Sat, only Sunday off)
      if (dayOfWeek === 0) {
        weekendDays++;
      } else {
        workingDays++;
      }
    }
    cur.setDate(cur.getDate() + 1);
  }

  const isSameDate = totalDays === 0;

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalDays,
    workingDays,
    weekendDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    formattedDifference: isSameDate
      ? '0 Days'
      : `${years > 0 ? `${years} Year${years > 1 ? 's' : ''}, ` : ''}${
          months > 0 ? `${months} Month${months > 1 ? 's' : ''}, ` : ''
        }${days} Day${days !== 1 ? 's' : ''}`,
    isSameDate,
    isReversed,
  };
}
