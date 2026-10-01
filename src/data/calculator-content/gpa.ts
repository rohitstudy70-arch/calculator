export const gpaContent = {
  en: {
    pageTitle: 'GPA to Percentage Calculator - 10-Point CGPA | CalcMaster',
    metaDescription:
      'Convert 10-point Indian CGPA to percentage using standard university formula (9.5 multiplier). Calculate semester SGPA, cumulative CGPA, and 4.0 scale GPA.',
    h1: 'GPA & CGPA to Percentage Calculator – India & Global Scales',
    introText:
      'Calculate your weighted semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA). Supports both the Indian UGC/AICTE 10-point scale and the international 4.0 scale, with configurable CGPA-to-percentage conversion.',
    howToUse: [
      'Select your grading system: Indian 10-Point CGPA (UGC / AICTE / CBSE) or US 4.0 GPA Scale.',
      'Enter course/subject names, their assigned credit hours, and select letter grades or grade points.',
      'Click "+ Add Subject" to add more courses for your semester.',
      'If using the 10-point scale, customize the CGPA-to-percentage multiplier if your university specifies a custom factor (standard default: 9.5).',
      'View your weighted GPA/CGPA, total credits earned, equivalent percentage (%), and academic honors division.',
      'Export your full semester grade card as a PDF or Excel document.',
    ],
    formulaExplanation: `Grade Point Average is calculated as a credit-weighted arithmetic mean:

1. Weighted GPA / CGPA Formula:
• CGPA = ∑ (Course Credits × Grade Points Earned) / ∑ (Total Course Credits)

2. Indian CGPA to Percentage Conversion Formulas:
• Standard National Formula (CBSE / AICTE / Mumbai University):
  Percentage (%) = CGPA × 9.5
• Anna University (Tamil Nadu):
  Percentage (%) = CGPA × 10
• VTU (Visvesvaraya Technological University, Karnataka):
  Percentage (%) = (CGPA - 0.75) × 10
• GTU (Gujarat Technological University):
  Percentage (%) = (CGPA - 0.5) × 10

3. US 4.0 GPA Scale:
• Maximum GPA = 4.0. Grades: A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0.`,
    solvedExamples: [
      {
        title: 'Example 1: Engineering Semester SGPA (10-Point Scale)',
        inputs: '4 Subjects: Math (4 cred, 9 pts), DS (4 cred, 8 pts), DBMS (3 cred, 10 pts), Comm (2 cred, 7 pts)',
        calculation: 'Points = (4×9) + (4×8) + (3×10) + (2×7) = 36 + 32 + 30 + 14 = 112\nTotal Credits = 4 + 4 + 3 + 2 = 13\nSGPA = 112 ÷ 13 = 8.62\nPercentage = 8.62 × 9.5 = 81.89%',
        result: 'CGPA = 8.62 | Percentage = 81.89% (First Class with Distinction)',
      },
      {
        title: 'Example 2: US University 4.0 GPA Scale',
        inputs: '3 Courses: Physics (3 cred, 4.0), Chemistry (3 cred, 3.7), Calculus (4 cred, 3.3)',
        calculation: 'Points = (3×4.0) + (3×3.7) + (4×3.3) = 12 + 11.1 + 13.2 = 36.3\nTotal Credits = 10\nGPA = 36.3 ÷ 10 = 3.63',
        result: 'GPA = 3.63 / 4.0 (Magna Cum Laude)',
      },
      {
        title: 'Example 3: Direct CGPA to Percentage (9.2 CGPA)',
        inputs: 'CGPA: 9.2 | Standard Multiplier: 9.5',
        calculation: 'Percentage = 9.2 × 9.5 = 87.4%',
        result: 'Equivalent Percentage = 87.40%',
      },
    ],
    tips: [
      'Always verify your specific university guidelines on marks transcripts; while CBSE, AICTE, and central universities use 9.5, autonomous state universities may use 10.0 or (CGPA - 0.75) × 10.',
      'Higher credit subjects (e.g. 4-credit core subjects or major projects) impact your cumulative CGPA significantly more than 1-2 credit labs.',
      'For studying abroad (MS in US/Europe/UK), World Education Services (WES) uses evaluated transcript course-by-course conversion rather than linear percentage multiplication.',
      'Keep track of backlog / arrear grade points: un-cleared subjects with 0 grade points lower your average until cleared.',
    ],
    commonMistakes: [
      'Calculating simple unweighted average of grades rather than multiplying by subject credit hours.',
      'Applying a generic 9.5 formula when your university transcript explicitly mandates a different conversion rule.',
      'Assuming 10-point CGPA is directly 100% (e.g. 7.5 CGPA is 71.25%, not 75%).',
      'Confusing SGPA (Semester Grade Point Average) with CGPA (Cumulative across all completed semesters).',
    ],
    faqs: [
      {
        question: 'Why does CBSE and AICTE multiply CGPA by 9.5 instead of 10?',
        answer:
          'CBSE established 9.5 as the multiplier after statistical analysis of top 5 years of board scores. A 9.5 multiplier ensures fair parity between absolute percentage grading and 10-point relative grading.',
      },
      {
        question: 'What is the difference between SGPA and CGPA?',
        answer:
          'SGPA (Semester Grade Point Average) measures your performance in a single semester. CGPA (Cumulative Grade Point Average) is the credit-weighted average across all completed semesters from Year 1 to graduation.',
      },
      {
        question: 'How do different Indian universities convert CGPA to percentage?',
        answer:
          'Standard AICTE/CBSE uses 9.5 × CGPA. Anna University and Mumbai University use 10 × CGPA or 7.1 + 12 × CGPA. VTU Karnataka uses (CGPA - 0.75) × 10. GTU Gujarat uses (CGPA - 0.5) × 10.',
      },
      {
        question: 'How do I convert a 10-point CGPA to a 4.0 US GPA for master’s applications?',
        answer:
          'US universities typically require a certified WES (World Education Services) course-by-course evaluation. A rough estimate is: 9.0+ = 4.0, 8.0-8.9 = 3.5-3.9, 7.0-7.9 = 3.0-3.4, 6.0-6.9 = 2.5-2.9.',
      },
      {
        question: 'What CGPA is required for First Class with Distinction in India?',
        answer:
          'In most Indian engineering and degree universities, a CGPA of 8.0 and above (or 75% equivalent) without standing backlogs qualifies for First Class with Distinction.',
      },
      {
        question: 'Can I add multiple semesters and elective courses?',
        answer:
          'Yes. You can dynamically add as many subjects, labs, projects, and elective courses as needed to evaluate your complete academic profile.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Percentage Calculator',
        slug: 'percentage-calculator',
        description: 'Calculate percentages, percentage differences, and fractions.',
      },
      {
        name: 'Scientific Calculator',
        slug: 'scientific-calculator',
        description: 'Advanced engineering math, roots, and trigonometry.',
      },
      {
        name: 'Salary Calculator',
        slug: 'salary-calculator',
        description: 'Calculate monthly take-home salary from CTC package.',
      },
    ],
  },
  hi: {
    pageTitle: 'GPA & CGPA Calculator - 10-पॉइंट और 4.0 स्केल से प्रतिशत निकालें',
    metaDescription: 'SGPA और CGPA निकालें, और 9.5 फॉर्मूले से CGPA को प्रतिशत (%) में बदलें।',
    h1: 'GPA और CGPA कैलकुलेटर (GPA / CGPA Calculator) – प्रतिशत परिवर्तक',
    introText: 'भारतीय विश्वविद्यालयों (UGC / AICTE / CBSE 10-Point Scale) और अंतरराष्ट्रीय 4.0 GPA स्केल पर अपने ग्रेड और प्रतिशत की गणना करें।',
  },
};
