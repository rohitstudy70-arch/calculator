import { calculatePregnancy, validatePregnancyInput } from '@/lib/calculators/pregnancy';
import { eddContent } from '@/data/calculator-content/edd';

describe('EDD Calculator & Tracker Tests', () => {
  test('Standard EDD calculation from LMP (40 completed weeks / 280 days)', () => {
    const res = calculatePregnancy({
      method: 'lmp',
      date: '2026-02-01',
      cycleLengthDays: 28,
    });

    expect(res.estimatedDueDate).toBe('2026-11-08');
    expect(res.formattedDueDate).toContain('November 8, 2026');
    expect(res.trimesters.length).toBe(3);
  });

  test('EDD with longer 32-day menstrual cycle (+4 days adjustment)', () => {
    const res = calculatePregnancy({
      method: 'lmp',
      date: '2026-01-10',
      cycleLengthDays: 32,
    });

    expect(res.estimatedDueDate).toBe('2026-10-21');
  });

  test('EDD from exact conception date (+266 days)', () => {
    const res = calculatePregnancy({
      method: 'conception',
      date: '2026-03-01',
    });

    expect(res.estimatedDueDate).toBe('2026-11-22');
  });

  test('EDD from IVF Day 5 blastocyst embryo transfer (+261 days)', () => {
    const res = calculatePregnancy({
      method: 'ivf',
      date: '2026-03-15',
      ivfType: 'day5',
    });

    expect(res.estimatedDueDate).toBe('2026-12-01');
  });

  test('EDD content SEO constraints (Title <= 60, Desc <= 155)', () => {
    expect(eddContent.en.pageTitle.length).toBeLessThanOrEqual(60);
    expect(eddContent.en.metaDescription.length).toBeLessThanOrEqual(155);
    expect(eddContent.en.faqs.length).toBeGreaterThanOrEqual(6);
  });

  test('Input validation works correctly for EDD', () => {
    expect(validatePregnancyInput({ date: 'invalid' }).valid).toBe(false);
    expect(validatePregnancyInput({ date: '2026-01-01', cycleLengthDays: 28 }).valid).toBe(true);
  });
});
