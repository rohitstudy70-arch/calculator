'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { InputGroup } from '@/components/ui/InputGroup';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { CompareToggle } from '@/components/ui/CompareToggle';
import { ChartWrapper } from '@/components/ui/ChartWrapper';
import {
  calculateGPA,
  GPAInput,
  GPASystem,
  CourseEntry,
  GRADE_PRESETS_10,
  GRADE_PRESETS_4,
} from '@/lib/calculators/gpa';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const GPAGaugeChart = dynamic(() => import('@/components/charts/GPAGaugeChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

const DEFAULT_COURSES_10: CourseEntry[] = [
  { id: '1', name: 'Engineering Mathematics', credits: 4, gradePoints: 9 },
  { id: '2', name: 'Data Structures & Algorithms', credits: 4, gradePoints: 8 },
  { id: '3', name: 'Database Management Systems', credits: 3, gradePoints: 10 },
  { id: '4', name: 'Technical Communication & Lab', credits: 2, gradePoints: 8 },
];

function CalculatorInstance({
  id,
  initialSystem = 'cgpa10',
  initialFactor = 9.5,
}: {
  id: string;
  initialSystem?: GPASystem;
  initialFactor?: number;
}) {
  const [system, setSystem] = useState<GPASystem>(initialSystem);
  const [conversionFactor, setConversionFactor] = useState<number>(initialFactor);
  const [courses, setCourses] = useState<CourseEntry[]>(DEFAULT_COURSES_10);

  const input: GPAInput = useMemo(
    () => ({
      system,
      courses,
      conversionFactor,
    }),
    [system, courses, conversionFactor]
  );

  const result = useMemo(() => calculateGPA(input), [input]);

  const addCourse = () => {
    const newId = String(Date.now());
    setCourses((prev) => [
      ...prev,
      {
        id: newId,
        name: `Course ${prev.length + 1}`,
        credits: 3,
        gradePoints: system === 'cgpa10' ? 8 : 3.0,
      },
    ]);
  };

  const removeCourse = (cId: string) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== cId));
  };

  const updateCourse = (cId: string, field: keyof CourseEntry, val: any) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === cId ? { ...c, [field]: val } : c))
    );
  };

  const tableHeaders = ['Course / Subject', 'Credits', 'Grade Points', 'Weighted Points (Credits × Grade)'];
  const tableData = useMemo(
    () =>
      courses.map((c) => [
        c.name,
        `${c.credits}`,
        `${c.gradePoints}`,
        `${(c.credits * c.gradePoints).toFixed(2)}`,
      ]),
    [courses]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Academic GPA / CGPA & Percentage Grade Card Report',
      [
        { label: 'Grading System', value: system === 'cgpa10' ? 'Indian 10-Point CGPA' : 'US 4.0 GPA Scale' },
        { label: 'Calculated Cumulative GPA/CGPA', value: `${result.gpa} / ${result.maxScale}` },
        { label: 'Total Credits Earned', value: `${result.totalCredits}` },
        { label: 'Total Weighted Grade Points', value: `${result.totalGradePoints}` },
        { label: 'Equivalent Percentage', value: `${result.equivalentPercentage}%` },
        { label: 'Academic Honors Division', value: result.divisionHonors },
        { label: 'Conversion Formula Used', value: `${conversionFactor} × CGPA` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'GPA_CGPA_Grade_Card');
  };

  const shareUrl = generateShareableLink('/gpa-calculator', {
    sys: system,
    fac: conversionFactor,
  });

  const gradePresets = system === 'cgpa10' ? GRADE_PRESETS_10 : GRADE_PRESETS_4;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* System Selection */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Select Grading Scale
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSystem('cgpa10')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  system === 'cgpa10'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Indian 10-Point CGPA (UGC / AICTE)
              </button>
              <button
                type="button"
                onClick={() => setSystem('gpa4')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  system === 'gpa4'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                US 4.0 GPA Scale
              </button>
            </div>
          </div>

          {system === 'cgpa10' && (
            <InputGroup
              label="CGPA to % Conversion Multiplier (Default: 9.5)"
              value={conversionFactor}
              onChange={setConversionFactor}
              min={7}
              max={12}
              step={0.1}
            />
          )}

          {/* Courses Dynamic Table */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Courses & Subjects</h3>
              <button
                type="button"
                onClick={addCourse}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
              >
                + Add Subject
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {courses.map((course, idx) => (
                <div
                  key={course.id}
                  className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 grid grid-cols-12 gap-2 items-center"
                >
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      placeholder={`Course ${idx + 1}`}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="col-span-3">
                    <input
                      type="number"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                      placeholder="Credits"
                      min={1}
                      max={20}
                      className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="col-span-3">
                    <select
                      value={course.gradePoints}
                      onChange={(e) => updateCourse(course.id, 'gradePoints', Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {gradePresets.map((gp) => (
                        <option key={gp.points} value={gp.points}>
                          {gp.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-1 flex justify-center">
                    {courses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCourse(course.id)}
                        className="text-gray-400 hover:text-rose-600 text-sm font-bold"
                        title="Remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Results & Visualizations Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ResultCard
            title="Academic Performance Summary"
            items={[
              {
                label: system === 'cgpa10' ? 'Cumulative CGPA' : 'Weighted GPA',
                value: `${result.gpa} / ${result.maxScale.toFixed(1)}`,
                highlight: true,
                color: '#2563EB',
              },
              {
                label: 'Equivalent Percentage',
                value: `${result.equivalentPercentage}%`,
                highlight: true,
                color: '#10B981',
              },
              { label: 'Academic Honors Class', value: result.divisionHonors },
              { label: 'Total Credits Earned', value: `${result.totalCredits} credits` },
              { label: 'Total Grade Points', value: `${result.totalGradePoints} pts` },
            ]}
          />

          <ChartWrapper title="GPA Standing & Division Scale">
            <GPAGaugeChart
              gpa={result.gpa}
              maxScale={result.maxScale}
              percentage={result.equivalentPercentage}
              divisionHonors={result.divisionHonors}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Detailed Subject-Wise Grade Point & Credit Breakdown"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function GPACalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initSys = (searchParams.get('sys') as GPASystem) || 'cgpa10';
  const initFac = searchParams.get('fac') ? Number(searchParams.get('fac')) : 9.5;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialSystem={initSys}
          initialFactor={initFac}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Semester A Profile</h3>
            <CalculatorInstance
              id="comp1"
              initialSystem={initSys}
              initialFactor={initFac}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Semester B Profile</h3>
            <CalculatorInstance
              id="comp2"
              initialSystem={initSys}
              initialFactor={10.0}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GPACalculator;
