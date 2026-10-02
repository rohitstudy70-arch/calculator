'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { CompareToggle } from '@/components/ui/CompareToggle';
import { calculateSarkariAge, Category, EXAM_PRESETS, SarkariAgeInput } from '@/lib/calculators/sarkari-age';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

function CalculatorInstance({
  id,
  initialBirthDate = '1995-05-15',
  initialPresetIndex = 0,
}: {
  id: string;
  initialBirthDate?: string;
  initialPresetIndex?: number;
}) {
  const [birthDate, setBirthDate] = useState<string>(initialBirthDate);
  const [presetIndex, setPresetIndex] = useState<number>(initialPresetIndex);
  
  const preset = EXAM_PRESETS[presetIndex] || EXAM_PRESETS[0];
  const [cutoffDate, setCutoffDate] = useState<string>(preset.cutoffDate);
  const [minAge, setMinAge] = useState<number>(preset.minAge);
  const [maxAge, setMaxAge] = useState<number>(preset.maxAge);
  const [category, setCategory] = useState<Category>('general');

  // Sync inputs with preset when preset changes
  useEffect(() => {
    const currentPreset = EXAM_PRESETS[presetIndex];
    if (currentPreset && currentPreset.name !== 'Custom / Other Exam') {
      setCutoffDate(currentPreset.cutoffDate);
      setMinAge(currentPreset.minAge);
      setMaxAge(currentPreset.maxAge);
    }
  }, [presetIndex]);

  const isCustom = EXAM_PRESETS[presetIndex]?.name === 'Custom / Other Exam';

  const input: SarkariAgeInput = useMemo(
    () => ({
      birthDate,
      cutoffDate,
      category,
      minAge,
      maxAge,
    }),
    [birthDate, cutoffDate, category, minAge, maxAge]
  );

  const result = useMemo(() => {
    try {
      if (new Date(birthDate).getTime() > new Date(cutoffDate).getTime()) {
         return null;
      }
      return calculateSarkariAge(input);
    } catch {
      return null;
    }
  }, [input, birthDate, cutoffDate]);

  const tableHeaders = ['Criteria', 'Your Value', 'Details'];
  const tableData = useMemo(() => {
    if (!result) return [];
    return [
      ['Target Exam / Post', EXAM_PRESETS[presetIndex]?.name || 'Custom', EXAM_PRESETS[presetIndex]?.description || 'Custom Limits'],
      ['Cutoff Date', cutoffDate, 'Age is calculated as of this date'],
      ['Exact Age', `${result.ageOnCutoff.years} Y, ${result.ageOnCutoff.months} M, ${result.ageOnCutoff.days} D`, `${result.ageInYearsDecimal.toFixed(2)} years total`],
      ['Category', result.categoryLabel, `${result.relaxationYears} years relaxation`],
      ['Required Minimum Age', `${minAge} Years`, result.isTooYoung ? 'Too young' : 'Satisfied'],
      ['Effective Maximum Age', `${result.effectiveMaxAge} Years`, `Base ${maxAge} + ${result.relaxationYears} (relaxation)`],
      ['Eligibility Status', result.message, result.isEligible ? 'Eligible to apply' : 'Not eligible'],
      ['Years Remaining', `${result.yearsRemaining} Years`, 'Approx. years left to apply'],
    ];
  }, [result, presetIndex, cutoffDate, minAge, maxAge]);

  const handlePdfExport = () => {
    if (!result) return;
    exportToPDF(
      'Sarkari Exam Eligibility Report',
      [
        { label: 'Exam Name', value: EXAM_PRESETS[presetIndex]?.name || 'Custom' },
        { label: 'Date of Birth', value: birthDate },
        { label: 'Cutoff Date', value: cutoffDate },
        { label: 'Category', value: result.categoryLabel },
        { label: 'Exact Age', value: `${result.ageOnCutoff.years} Y, ${result.ageOnCutoff.months} M, ${result.ageOnCutoff.days} D` },
        { label: 'Status', value: result.message },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Sarkari_Eligibility_Report');
  };

  const shareUrl = generateShareableLink('/sarkari-exam-age-calculator', {
    dob: birthDate,
    cat: category,
    exam: presetIndex.toString()
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Select Exam
            </label>
            <select
              value={presetIndex}
              onChange={(e) => setPresetIndex(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {EXAM_PRESETS.map((p, idx) => (
                <option key={idx} value={idx}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Date of Birth (DOB)
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="general">General (UR)</option>
              <option value="obc">OBC (Non-Creamy Layer)</option>
              <option value="sc_st">SC / ST</option>
              <option value="pwd">PwD (General)</option>
              <option value="pwd_obc">PwD + OBC</option>
              <option value="pwd_sc_st">PwD + SC / ST</option>
              <option value="ex_serviceman">Ex-Serviceman</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Min Age Limit
              </label>
              <input
                type="number"
                step="0.5"
                value={minAge}
                onChange={(e) => setMinAge(Number(e.target.value))}
                disabled={!isCustom}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 disabled:opacity-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Max Age Limit (Gen)
              </label>
              <input
                type="number"
                step="0.5"
                value={maxAge}
                onChange={(e) => setMaxAge(Number(e.target.value))}
                disabled={!isCustom}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 disabled:opacity-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Exam Cutoff Date
            </label>
            <input
              type="date"
              value={cutoffDate}
              onChange={(e) => setCutoffDate(e.target.value)}
              disabled={!isCustom}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 disabled:opacity-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {!isCustom && <p className="text-xs text-gray-500">Auto-filled based on exam preset. Select "Custom" to edit.</p>}
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
        <div className="lg:col-span-6 flex flex-col gap-6">
          {!result ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl border border-red-200 dark:border-red-800 text-center font-medium">
              Invalid date combination. Cutoff date must be after Date of Birth.
            </div>
          ) : (
            <>
              <div className={`p-8 rounded-2xl border-2 text-center transform transition-all ${
                result.isEligible ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-300' :
                result.isTooYoung ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-700 dark:text-amber-300' :
                'bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-700 dark:text-rose-300'
              }`}>
                <h2 className="text-3xl font-bold mb-2">{result.message}</h2>
                <p className="text-lg opacity-80">
                  Age on {new Date(cutoffDate).toLocaleDateString('en-GB')}:
                </p>
                <p className="text-2xl font-bold mt-2">
                  {result.ageOnCutoff.years} Years, {result.ageOnCutoff.months} Months, {result.ageOnCutoff.days} Days
                </p>
              </div>

              <ResultCard
                title="Eligibility Details"
                items={[
                  { label: 'Category & Relaxation', value: `${result.categoryLabel} (+${result.relaxationYears} Years)` },
                  { label: 'Effective Max Age', value: `${result.effectiveMaxAge} Years` },
                  { label: 'Remaining Attempts/Years', value: result.isTooOld ? 'None' : `~${result.yearsRemaining} Years Left` },
                  { label: 'Last Date Under Age Limit', value: result.isTooOld ? 'Passed' : new Date(result.lastDateToApply).toLocaleDateString('en-GB') },
                ]}
              />
            </>
          )}
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Comprehensive Eligibility Breakdown"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function SarkariAgeCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initDob = searchParams.get('dob') || '1995-05-15';
  const initExam = parseInt(searchParams.get('exam') || '0', 10);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialBirthDate={initDob}
          initialPresetIndex={initExam}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Exam Option 1</h3>
            <CalculatorInstance
              id="comp1"
              initialBirthDate={initDob}
              initialPresetIndex={initExam}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Exam Option 2</h3>
            <CalculatorInstance
              id="comp2"
              initialBirthDate={initDob}
              initialPresetIndex={initExam === 0 ? 1 : 0}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SarkariAgeCalculator;
