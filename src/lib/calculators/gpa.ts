export type GPASystem = 'cgpa10' | 'gpa4';

export interface CourseEntry {
  id: string;
  name: string;
  credits: number;
  gradePoints: number; // 0 to 10 for 10-point, or 0 to 4.0 for 4.0 scale
}

export interface GPAInput {
  system: GPASystem;
  courses: CourseEntry[];
  conversionFactor?: number; // default 9.5 for Indian 10-point CGPA
}

export interface GPAResult {
  system: GPASystem;
  gpa: number;
  totalCredits: number;
  totalGradePoints: number;
  equivalentPercentage: number;
  divisionHonors: string;
  conversionFactorUsed: number;
  maxScale: number;
}

export const GRADE_PRESETS_10: { letter: string; points: number; label: string }[] = [
  { letter: 'O / S (Outstanding)', points: 10, label: 'Outstanding (10)' },
  { letter: 'A+ (Excellent)', points: 9, label: 'Excellent (9)' },
  { letter: 'A (Very Good)', points: 8, label: 'Very Good (8)' },
  { letter: 'B+ (Good)', points: 7, label: 'Good (7)' },
  { letter: 'B (Above Average)', points: 6, label: 'Above Average (6)' },
  { letter: 'C (Average)', points: 5, label: 'Average (5)' },
  { letter: 'P (Pass)', points: 4, label: 'Pass (4)' },
  { letter: 'F (Fail)', points: 0, label: 'Fail (0)' },
];

export const GRADE_PRESETS_4: { letter: string; points: number; label: string }[] = [
  { letter: 'A+ / A (4.0)', points: 4.0, label: 'A (4.0)' },
  { letter: 'A- (3.7)', points: 3.7, label: 'A- (3.7)' },
  { letter: 'B+ (3.3)', points: 3.3, label: 'B+ (3.3)' },
  { letter: 'B (3.0)', points: 3.0, label: 'B (3.0)' },
  { letter: 'B- (2.7)', points: 2.7, label: 'B- (2.7)' },
  { letter: 'C+ (2.3)', points: 2.3, label: 'C+ (2.3)' },
  { letter: 'C (2.0)', points: 2.0, label: 'C (2.0)' },
  { letter: 'D (1.0)', points: 1.0, label: 'D (1.0)' },
  { letter: 'F (0.0)', points: 0.0, label: 'F (0.0)' },
];

export function validateGPAInput(input: GPAInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.courses || input.courses.length === 0) {
    errors.courses = 'Please enter at least one course / subject';
  } else {
    for (let i = 0; i < input.courses.length; i++) {
      const c = input.courses[i];
      if (c.credits <= 0 || isNaN(c.credits)) {
        errors[`course_${i}_credits`] = 'Credits must be greater than 0';
      }
      if (c.gradePoints < 0 || isNaN(c.gradePoints)) {
        errors[`course_${i}_grade`] = 'Grade points must be >= 0';
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates weighted GPA / CGPA, total credits, percentage, and honors class.
 */
export function calculateGPA(input: GPAInput): GPAResult {
  const system = input.system ?? 'cgpa10';
  const factor = input.conversionFactor ?? 9.5;
  const maxScale = system === 'cgpa10' ? 10 : 4.0;

  let totalWeightedPoints = 0;
  let totalCredits = 0;

  for (const c of input.courses) {
    const cred = Math.max(0, c.credits || 0);
    const pts = Math.min(maxScale, Math.max(0, c.gradePoints || 0));
    totalWeightedPoints += cred * pts;
    totalCredits += cred;
  }

  const gpa = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;
  const roundedGPA = parseFloat(gpa.toFixed(2));

  let equivalentPercentage = 0;
  if (system === 'cgpa10') {
    // CBSE / AICTE standard: Percentage = CGPA * factor (default 9.5)
    equivalentPercentage = parseFloat((roundedGPA * factor).toFixed(2));
  } else {
    // US 4.0 scale percentage approximation: (GPA / 4.0) * 100 or ((GPA * 20) + 20)
    equivalentPercentage = parseFloat(((roundedGPA / 4.0) * 100).toFixed(2));
  }

  // Academic Division Classification (Indian University Standard)
  let division = 'Pass Class';
  if (system === 'cgpa10') {
    if (roundedGPA >= 8.0) division = 'First Class with Distinction (Honors)';
    else if (roundedGPA >= 6.5) division = 'First Class';
    else if (roundedGPA >= 5.5) division = 'Higher Second Class';
    else if (roundedGPA >= 5.0) division = 'Second Class';
    else if (roundedGPA >= 4.0) division = 'Pass Class';
    else division = 'Fail / Backlog';
  } else {
    if (roundedGPA >= 3.8) division = 'Summa Cum Laude (Distinction)';
    else if (roundedGPA >= 3.5) division = 'Magna Cum Laude';
    else if (roundedGPA >= 3.0) division = 'Cum Laude (First Class)';
    else if (roundedGPA >= 2.0) division = 'Satisfactory (Good Standing)';
    else division = 'Academic Probation';
  }

  return {
    system,
    gpa: roundedGPA,
    totalCredits,
    totalGradePoints: parseFloat(totalWeightedPoints.toFixed(2)),
    equivalentPercentage: Math.min(100, equivalentPercentage),
    divisionHonors: division,
    conversionFactorUsed: factor,
    maxScale,
  };
}

/**
 * Direct helper: Convert single CGPA to percentage using customizable factor
 */
export function cgpaToPercentage(cgpa: number, factor = 9.5): number {
  return parseFloat((cgpa * factor).toFixed(2));
}

/**
 * Direct helper: Convert Percentage to approximate 10-point CGPA
 */
export function percentageToCGPA(percentage: number, factor = 9.5): number {
  return parseFloat((percentage / factor).toFixed(2));
}
