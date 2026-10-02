import { calculateSarkariAge, validateSarkariAgeInput, getCategoryLabel } from '@/lib/calculators/sarkari-age';

describe('Sarkari Exam Age Calculator Tests', () => {
  test('Eligible general candidate (1995-05-15 to 2026-08-01)', () => {
    const res = calculateSarkariAge({
      birthDate: '1995-05-15',
      cutoffDate: '2026-08-01',
      category: 'general',
      minAge: 21,
      maxAge: 32,
    });
    
    expect(res.ageOnCutoff.years).toBe(31);
    expect(res.ageOnCutoff.months).toBe(2);
    expect(res.ageOnCutoff.days).toBe(17);
    expect(res.isEligible).toBe(true);
    expect(res.isTooOld).toBe(false);
    expect(res.isTooYoung).toBe(false);
  });

  test('Over-age general candidate (1990-01-01 to 2026-01-01)', () => {
    const res = calculateSarkariAge({
      birthDate: '1990-01-01',
      cutoffDate: '2026-01-01',
      category: 'general',
      minAge: 18,
      maxAge: 32,
    });
    
    expect(res.ageOnCutoff.years).toBe(36);
    expect(res.isEligible).toBe(false);
    expect(res.isTooOld).toBe(true);
  });

  test('Under-age general candidate (2010-06-15 to 2026-07-01)', () => {
    const res = calculateSarkariAge({
      birthDate: '2010-06-15',
      cutoffDate: '2026-07-01',
      category: 'general',
      minAge: 18,
      maxAge: 35,
    });
    
    expect(res.ageOnCutoff.years).toBe(16);
    expect(res.isEligible).toBe(false);
    expect(res.isTooYoung).toBe(true);
  });

  test('Over-age OBC candidate with relaxation (1990-01-01 to 2026-01-01)', () => {
    const res = calculateSarkariAge({
      birthDate: '1990-01-01',
      cutoffDate: '2026-01-01',
      category: 'obc',
      minAge: 18,
      maxAge: 32,
    });
    
    expect(res.effectiveMaxAge).toBe(35);
    expect(res.ageOnCutoff.years).toBe(36);
    expect(res.isEligible).toBe(false);
  });

  test('Eligible OBC candidate due to relaxation (1993-01-05 to 2026-01-01)', () => {
    const res = calculateSarkariAge({
      birthDate: '1993-01-05',
      cutoffDate: '2026-01-01',
      category: 'obc',
      minAge: 18,
      maxAge: 32,
    });
    
    expect(res.effectiveMaxAge).toBe(35);
    expect(res.ageOnCutoff.years).toBe(32);
    expect(res.isEligible).toBe(true);
  });

  test('Eligible SC/ST candidate due to relaxation (1991-01-01 to 2026-01-01)', () => {
    const res = calculateSarkariAge({
      birthDate: '1991-01-01',
      cutoffDate: '2026-01-01',
      category: 'sc_st',
      minAge: 18,
      maxAge: 32,
    });
    
    expect(res.effectiveMaxAge).toBe(37);
    expect(res.ageOnCutoff.years).toBe(35);
    expect(res.isEligible).toBe(true);
  });

  test('Validation catches future birth date', () => {
    const val = validateSarkariAgeInput({
      birthDate: '2030-01-01',
      cutoffDate: '2026-01-01',
      category: 'general',
      minAge: 18,
      maxAge: 32,
    });
    expect(val.valid).toBe(false);
    expect(val.errors.cutoffDate).toBe('Cutoff date cannot be before date of birth');
  });

  test('getCategoryLabel returns correct label', () => {
    expect(getCategoryLabel('obc')).toBe('OBC (Non-Creamy Layer)');
    expect(getCategoryLabel('sc_st')).toBe('SC/ST');
  });
});
