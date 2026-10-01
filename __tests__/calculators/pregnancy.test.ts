import { calculatePregnancy, validatePregnancyInput } from '@/lib/calculators/pregnancy';

describe('Pregnancy Due Date Calculator Tests', () => {
  // Test Case 1: Standard LMP 28-day cycle (LMP: 2026-01-01)
  // EDD = 2026-01-01 + 280 days = 2026-10-08
  test('Standard LMP 28-day cycle test (LMP: 2026-01-01)', () => {
    const res = calculatePregnancy({
      method: 'lmp',
      date: '2026-01-01',
      cycleLengthDays: 28,
      targetDate: '2026-04-01',
    });

    expect(res.estimatedDueDate).toBe('2026-10-08');
    expect(res.formattedDueDate).toContain('October 8, 2026');
    expect(res.trimesters.length).toBe(3);
    expect(res.currentGestationalAgeWeeks).toBeGreaterThanOrEqual(12);
  });

  // Test Case 2: Adjusted 32-day cycle (LMP: 2026-01-01, +4 days)
  // EDD = 2026-01-01 + 280 + 4 = 2026-10-12
  test('LMP with adjusted 32-day cycle length', () => {
    const res = calculatePregnancy({
      method: 'lmp',
      date: '2026-01-01',
      cycleLengthDays: 32,
    });

    expect(res.estimatedDueDate).toBe('2026-10-12');
  });

  // Test Case 3: Conception Date Mode (Conception: 2026-02-15)
  // EDD = 2026-02-15 + 266 days = 2026-11-08
  test('Conception date mode (+266 days)', () => {
    const res = calculatePregnancy({
      method: 'conception',
      date: '2026-02-15',
    });

    expect(res.estimatedDueDate).toBe('2026-11-08');
  });

  // Test Case 4: IVF Day 5 Blastocyst Transfer (Transfer: 2026-03-01)
  // EDD = 2026-03-01 + 261 days = 2026-11-17
  test('IVF Day 5 Blastocyst transfer mode', () => {
    const res = calculatePregnancy({
      method: 'ivf',
      date: '2026-03-01',
      ivfType: 'day5',
    });

    expect(res.estimatedDueDate).toBe('2026-11-17');
  });

  // Test Case 5: Validation
  test('Validation catches invalid dates and cycle lengths', () => {
    expect(validatePregnancyInput({ date: '' }).valid).toBe(false);
    expect(validatePregnancyInput({ date: '2026-01-01', cycleLengthDays: 15 }).valid).toBe(false);
    expect(validatePregnancyInput({ date: '2026-01-01', cycleLengthDays: 28 }).valid).toBe(true);
  });
});
