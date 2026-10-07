import { calculateAge, validateAgeInput } from '@/lib/calculators/age';

describe('Age Calculator Tests', () => {
  // Test Case 1: Standard Age calculation
  // Birth: 1995-05-15, Target: 2026-10-01
  // Years: 2026 - 1995 = 31. Target month Oct (10) > May (5). Months = 10 - 5 = 5. Days = 1 - 15 -> borrow Sept (30 days) -> 30 + 1 - 15 = 16 days, Months = 4.
  // Result: 31 Years, 4 Months, 16 Days.
  test('Standard exact age calculation (1995-05-15 to 2026-10-01)', () => {
    const res = calculateAge({
      birthDate: '1995-05-15',
      targetDate: '2026-10-01',
    });

    expect(res.years).toBe(31);
    expect(res.months).toBe(4);
    expect(res.days).toBe(16);
    expect(res.totalDays).toBeGreaterThan(11400);
    expect(res.zodiacSign).toBe('Taurus');
  });

  // Test Case 2: Leap year birthdate
  // Birth: 2000-02-29, Target: 2026-03-01
  // Age: 26 Years, 0 Months, 1 Day (borrow Feb 2026 28 days)
  test('Leap year birthdate calculation (2000-02-29 to 2026-03-01)', () => {
    const res = calculateAge({
      birthDate: '2000-02-29',
      targetDate: '2026-03-01',
    });

    expect(res.years).toBe(26);
    expect(res.months).toBe(0);
    expect(res.days).toBe(1);
    expect(res.zodiacSign).toBe('Pisces');
  });

  // Test Case 3: Same day (birthday today)
  test('Birthday today exact match (1990-10-01 to 2026-10-01)', () => {
    const res = calculateAge({
      birthDate: '1990-10-01',
      targetDate: '2026-10-01',
    });

    expect(res.years).toBe(36);
    expect(res.months).toBe(0);
    expect(res.days).toBe(0);
    expect(res.nextBirthdayDays).toBe(0);
  });

  // Test Case 4: Validation test
  test('Validation catches future dates and invalid strings', () => {
    expect(validateAgeInput({ birthDate: '' }).valid).toBe(false);
    expect(validateAgeInput({ birthDate: '2030-01-01', targetDate: '2026-10-01' }).valid).toBe(false);
    expect(validateAgeInput({ birthDate: '1995-05-15', targetDate: '2026-10-01' }).valid).toBe(true);
  });

  // Test Case 5: Reverse calculate DOB from Age (25 years exact)
  test('Reverse calculate DOB from exact years (25 years old on 2026-10-07)', () => {
    const { calculateDOBFromAge, validateDOBFromAgeInput } = require('@/lib/calculators/age');
    const res = calculateDOBFromAge({
      years: 25,
      months: 0,
      days: 0,
      asOfDate: '2026-10-07',
    });

    expect(res.birthDateISO).toBe('2001-10-07');
    expect(res.birthYear).toBe(2001);
    expect(res.dayOfWeek).toBe('Sunday');
    expect(res.zodiacSign).toBe('Libra');

    expect(validateDOBFromAgeInput({ years: -5 }).valid).toBe(false);
    expect(validateDOBFromAgeInput({ years: 25, months: 14 }).valid).toBe(false);
    expect(validateDOBFromAgeInput({ years: 25, months: 6, days: 10 }).valid).toBe(true);
  });
});

