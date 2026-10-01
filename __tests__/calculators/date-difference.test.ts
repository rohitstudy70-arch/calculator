import { calculateDateDifference, validateDateDifferenceInput } from '@/lib/calculators/date-difference';

describe('Date Difference Calculator Tests', () => {
  // Test Case 1: Standard span between two dates (Exclude end date)
  // Start: 2026-01-01 (Thu), End: 2026-01-15 (Thu)
  // Total Days: 14 days (2 weeks). Working days (Mon-Fri): 10 days. Weekend days: 4 days (Jan 3,4, 10,11).
  test('Standard 14-day duration without end date', () => {
    const res = calculateDateDifference({
      startDate: '2026-01-01',
      endDate: '2026-01-15',
      includeEndDate: false,
      workWeekType: '5days',
    });

    expect(res.totalDays).toBe(14);
    expect(res.workingDays).toBe(10);
    expect(res.weekendDays).toBe(4);
    expect(res.totalWeeks).toBe(2);
  });

  // Test Case 2: Inclusive end date (+1 day)
  // Start: 2026-01-01, End: 2026-01-15, Include End Date = true
  // Total days = 15 days. Working days: 11 days (includes Thu Jan 15). Weekend: 4 days.
  test('Inclusive end date option (+1 day)', () => {
    const res = calculateDateDifference({
      startDate: '2026-01-01',
      endDate: '2026-01-15',
      includeEndDate: true,
      workWeekType: '5days',
    });

    expect(res.totalDays).toBe(15);
    expect(res.workingDays).toBe(11);
    expect(res.weekendDays).toBe(4);
  });

  // Test Case 3: 6-day work week mode
  // Start: 2026-01-01 (Thu), End: 2026-01-08 (Thu) -> 7 days
  // 5-day week: 5 working days (Thu, Fri, Mon, Tue, Wed), 2 weekend (Sat, Sun).
  // 6-day week: 6 working days (Thu, Fri, Sat, Mon, Tue, Wed), 1 weekend (Sun).
  test('6-day work week mode', () => {
    const res = calculateDateDifference({
      startDate: '2026-01-01',
      endDate: '2026-01-08',
      includeEndDate: false,
      workWeekType: '6days',
    });

    expect(res.totalDays).toBe(7);
    expect(res.workingDays).toBe(6);
    expect(res.weekendDays).toBe(1);
  });

  // Test Case 4: Long multi-year span
  // Start: 2020-01-01, End: 2026-01-01 -> 6 years exactly
  test('Multi-year span calculation', () => {
    const res = calculateDateDifference({
      startDate: '2020-01-01',
      endDate: '2026-01-01',
    });

    expect(res.years).toBe(6);
    expect(res.months).toBe(0);
    expect(res.days).toBe(0);
    expect(res.totalDays).toBe(2192); // Includes 2020 and 2024 leap days
  });

  // Test Case 5: Validation
  test('Validation test', () => {
    expect(validateDateDifferenceInput({ startDate: '', endDate: '2026-01-01' }).valid).toBe(false);
    expect(validateDateDifferenceInput({ startDate: '2026-01-01', endDate: '2026-05-01' }).valid).toBe(true);
  });
});
