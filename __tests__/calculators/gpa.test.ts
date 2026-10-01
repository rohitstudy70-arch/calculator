import { calculateGPA, validateGPAInput, cgpaToPercentage, percentageToCGPA } from '@/lib/calculators/gpa';

describe('GPA / CGPA Calculator Tests', () => {
  // Test Case 1: Indian 10-Point CGPA Scale with weighted credits
  // Course 1: 4 credits, Grade 9 (36 pts)
  // Course 2: 4 credits, Grade 8 (32 pts)
  // Course 3: 3 credits, Grade 10 (30 pts)
  // Course 4: 2 credits, Grade 7 (14 pts)
  // Total Credits: 13, Total Points: 112. CGPA = 112 / 13 = 8.615 -> 8.62
  // Percentage = 8.62 * 9.5 = 81.89%
  test('Indian 10-point CGPA calculation with credit weights', () => {
    const res = calculateGPA({
      system: 'cgpa10',
      courses: [
        { id: '1', name: 'Mathematics', credits: 4, gradePoints: 9 },
        { id: '2', name: 'Data Structures', credits: 4, gradePoints: 8 },
        { id: '3', name: 'Database Systems', credits: 3, gradePoints: 10 },
        { id: '4', name: 'Technical Communication', credits: 2, gradePoints: 7 },
      ],
      conversionFactor: 9.5,
    });

    expect(res.gpa).toBe(8.62);
    expect(res.totalCredits).toBe(13);
    expect(res.equivalentPercentage).toBeCloseTo(81.89, 1);
    expect(res.divisionHonors).toContain('Distinction');
  });

  // Test Case 2: US 4.0 GPA Scale
  // Course 1: 3 credits, 4.0 (A) -> 12
  // Course 2: 3 credits, 3.7 (A-) -> 11.1
  // Course 3: 4 credits, 3.3 (B+) -> 13.2
  // Total Credits: 10, Total Points: 36.3. GPA = 3.63
  test('US 4.0 GPA scale calculation', () => {
    const res = calculateGPA({
      system: 'gpa4',
      courses: [
        { id: '1', name: 'Physics', credits: 3, gradePoints: 4.0 },
        { id: '2', name: 'Chemistry', credits: 3, gradePoints: 3.7 },
        { id: '3', name: 'Calculus', credits: 4, gradePoints: 3.3 },
      ],
    });

    expect(res.gpa).toBe(3.63);
    expect(res.totalCredits).toBe(10);
    expect(res.divisionHonors).toContain('Magna Cum Laude');
  });

  // Test Case 3: Conversion Helpers (CBSE 9.5 factor & custom 10.0 / VTU 10.0-0.75 factor)
  test('CGPA to Percentage conversion helpers', () => {
    expect(cgpaToPercentage(8.0, 9.5)).toBe(76);
    expect(cgpaToPercentage(9.2, 9.5)).toBe(87.4);
    expect(percentageToCGPA(76, 9.5)).toBe(8.0);
  });

  // Test Case 4: Validation
  test('Validation catches invalid courses', () => {
    expect(validateGPAInput({ system: 'cgpa10', courses: [] }).valid).toBe(false);
    expect(validateGPAInput({ system: 'cgpa10', courses: [{ id: '1', name: 'Math', credits: 0, gradePoints: 8 }] }).valid).toBe(false);
    expect(validateGPAInput({ system: 'cgpa10', courses: [{ id: '1', name: 'Math', credits: 4, gradePoints: 8 }] }).valid).toBe(true);
  });
});
