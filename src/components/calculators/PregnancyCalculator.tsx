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
import { DisclaimerNote } from '@/components/ui/DisclaimerNote';
import {
  calculatePregnancy,
  PregnancyInput,
  PregnancyCalcMethod,
  IVFType,
} from '@/lib/calculators/pregnancy';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const PregnancyMilestoneChart = dynamic(() => import('@/components/charts/PregnancyMilestoneChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

function getDefaultDate(offsetDays = -70): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function CalculatorInstance({
  id,
  initialMethod = 'lmp',
  initialDate,
  initialCycle = 28,
  initialIvf = 'day5',
  initialUltrasoundWeeks = 12,
  initialUltrasoundDays = 0,
}: {
  id: string;
  initialMethod?: PregnancyCalcMethod;
  initialDate?: string;
  initialCycle?: number;
  initialIvf?: IVFType;
  initialUltrasoundWeeks?: number;
  initialUltrasoundDays?: number;
}) {
  const [method, setMethod] = useState<PregnancyCalcMethod>(initialMethod);
  const [date, setDate] = useState<string>(initialDate || getDefaultDate());
  const [cycleLengthDays, setCycleLengthDays] = useState(initialCycle);
  const [ivfType, setIvfType] = useState<IVFType>(initialIvf);
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState(initialUltrasoundWeeks);
  const [ultrasoundDays, setUltrasoundDays] = useState(initialUltrasoundDays);

  const input: PregnancyInput = useMemo(
    () => ({
      method,
      date,
      cycleLengthDays,
      ivfType,
      ultrasoundWeeks,
      ultrasoundDays,
    }),
    [method, date, cycleLengthDays, ivfType, ultrasoundWeeks, ultrasoundDays]
  );

  const result = useMemo(() => calculatePregnancy(input), [input]);

  const tableHeaders = ['Trimester Phase', 'Gestational Span', 'Calendar Window', 'Key Clinical Milestones'];
  const tableData = useMemo(
    () =>
      result.trimesters.map((t) => [
        t.name,
        t.weeksRange,
        `${t.startDate} to ${t.endDate}`,
        t.description,
      ]),
    [result]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Pregnancy Gestational Age & Due Date Assessment Report',
      [
        { label: 'Calculation Method', value: result.methodUsed },
        { label: 'Reference Date Entered', value: date },
        { label: 'Estimated Due Date (EDD)', value: result.formattedDueDate },
        { label: 'Gestational Progress', value: `Week ${result.currentGestationalAgeWeeks} + ${result.currentGestationalAgeDays} days` },
        { label: 'Total Gestational Days', value: `${result.totalGestationalDays} days completed` },
        { label: 'Days Remaining to Term', value: `${result.daysRemaining} days` },
        { label: 'Estimated Conception Date', value: result.conceptionDateEstimated },
        { label: 'Current Trimester', value: result.currentTrimester },
        { label: 'Full Term Status (37+ Weeks)', value: result.isFullTerm ? 'Full Term' : 'Pre-Term Growth Phase' },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Pregnancy_Due_Date_Schedule');
  };

  const shareUrl = generateShareableLink('/pregnancy-due-date-calculator', {
    m: method,
    d: date,
    c: cycleLengthDays,
    ivf: ivfType,
    uw: ultrasoundWeeks,
    ud: ultrasoundDays,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Method Selection */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Calculation Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod('lmp')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  method === 'lmp'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Last Period (LMP)
              </button>
              <button
                type="button"
                onClick={() => setMethod('conception')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  method === 'conception'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Conception Date
              </button>
              <button
                type="button"
                onClick={() => setMethod('ivf')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  method === 'ivf'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                IVF Transfer
              </button>
              <button
                type="button"
                onClick={() => setMethod('ultrasound')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  method === 'ultrasound'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Ultrasound Scan
              </button>
            </div>
          </div>

          {/* Date Picker Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {method === 'lmp' && 'First Day of Last Menstrual Period'}
              {method === 'conception' && 'Estimated Date of Conception'}
              {method === 'ivf' && 'Date of Embryo Transfer'}
              {method === 'ultrasound' && 'Date of Ultrasound Scan'}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          {/* Method-Specific Inputs */}
          {method === 'lmp' && (
            <InputGroup
              label="Average Menstrual Cycle Length (Days)"
              value={cycleLengthDays}
              onChange={setCycleLengthDays}
              min={21}
              max={40}
              step={1}
              suffix=" days"
            />
          )}

          {method === 'ivf' && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Embryo Transfer Stage
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIvfType('day5')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    ivfType === 'day5'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  Day 5 Blastocyst (+261 d)
                </button>
                <button
                  type="button"
                  onClick={() => setIvfType('day3')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    ivfType === 'day3'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  Day 3 Embryo (+263 d)
                </button>
              </div>
            </div>
          )}

          {method === 'ultrasound' && (
            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="Scan Age (Weeks)"
                value={ultrasoundWeeks}
                onChange={setUltrasoundWeeks}
                min={4}
                max={36}
                step={1}
                suffix=" wks"
              />
              <InputGroup
                label="Scan Age (Days)"
                value={ultrasoundDays}
                onChange={setUltrasoundDays}
                min={0}
                max={6}
                step={1}
                suffix=" days"
              />
            </div>
          )}

          <DisclaimerNote
            type="health"
            sourceNote="Calculations use ACOG (American College of Obstetricians and Gynecologists) & Naegele's clinical guidelines."
          />

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
          <ResultCard
            title="Estimated Due Date Summary"
            items={[
              { label: 'Estimated Due Date (EDD)', value: result.formattedDueDate, highlight: true, color: '#E11D48' },
              {
                label: 'Gestational Progress',
                value: `Week ${result.currentGestationalAgeWeeks} + ${result.currentGestationalAgeDays} days`,
                highlight: true,
                color: '#2563EB',
              },
              { label: 'Current Phase', value: result.currentTrimester },
              { label: 'Days Remaining', value: `${result.daysRemaining} days (${result.weeksRemaining} weeks)` },
              { label: 'Estimated Conception Date', value: result.conceptionDateEstimated },
              { label: 'Full Term Status (37+ wks)', value: result.isFullTerm ? 'Full Term Reached' : 'Developing' },
            ]}
          />

          <ChartWrapper title="Trimester Timeline & Progress Tracker">
            <PregnancyMilestoneChart
              progressPercentage={result.progressPercentage}
              currentWeeks={result.currentGestationalAgeWeeks}
              currentDays={result.currentGestationalAgeDays}
              daysRemaining={result.daysRemaining}
              trimesters={result.trimesters}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Trimester Milestones & Clinical Timeline"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function PregnancyCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initMethod = (searchParams.get('m') as PregnancyCalcMethod) || 'lmp';
  const initDate = searchParams.get('d') || getDefaultDate(-70);
  const initCycle = searchParams.get('c') ? Number(searchParams.get('c')) : 28;
  const initIvf = (searchParams.get('ivf') as IVFType) || 'day5';
  const initUw = searchParams.get('uw') ? Number(searchParams.get('uw')) : 12;
  const initUd = searchParams.get('ud') ? Number(searchParams.get('ud')) : 0;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialMethod={initMethod}
          initialDate={initDate}
          initialCycle={initCycle}
          initialIvf={initIvf}
          initialUltrasoundWeeks={initUw}
          initialUltrasoundDays={initUd}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Method 1 (LMP Rule)</h3>
            <CalculatorInstance
              id="comp1"
              initialMethod="lmp"
              initialDate={initDate}
              initialCycle={initCycle}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Method 2 (Ultrasound / Conception)</h3>
            <CalculatorInstance
              id="comp2"
              initialMethod="conception"
              initialDate={getDefaultDate(-56)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PregnancyCalculator;
