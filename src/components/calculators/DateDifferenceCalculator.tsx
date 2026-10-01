'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { CompareToggle } from '@/components/ui/CompareToggle';
import { ChartWrapper } from '@/components/ui/ChartWrapper';
import {
  calculateDateDifference,
  DateDifferenceInput,
  WorkWeekType,
} from '@/lib/calculators/date-difference';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const DateDifferencePieChart = dynamic(() => import('@/components/charts/DateDifferencePieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

function getOffsetDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function CalculatorInstance({
  id,
  initialStart,
  initialEnd,
  initialIncludeEnd = false,
  initialWorkWeek = '5days',
}: {
  id: string;
  initialStart?: string;
  initialEnd?: string;
  initialIncludeEnd?: boolean;
  initialWorkWeek?: WorkWeekType;
}) {
  const [startDate, setStartDate] = useState<string>(initialStart || getOffsetDate(0));
  const [endDate, setEndDate] = useState<string>(initialEnd || getOffsetDate(30));
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(initialIncludeEnd);
  const [workWeekType, setWorkWeekType] = useState<WorkWeekType>(initialWorkWeek);

  const input: DateDifferenceInput = useMemo(
    () => ({
      startDate,
      endDate,
      includeEndDate,
      workWeekType,
    }),
    [startDate, endDate, includeEndDate, workWeekType]
  );

  const result = useMemo(() => calculateDateDifference(input), [input]);

  const tableHeaders = ['Metric / Component', 'Duration Value', 'Details & Breakdown'];
  const tableData = useMemo(
    () => [
      ['Calendar Duration', result.formattedDifference, `${result.years} Years, ${result.months} Months, ${result.days} Days`],
      ['Total Calendar Days', `${result.totalDays.toLocaleString('en-IN')} Days`, includeEndDate ? 'Includes final end date' : 'Excludes final end date'],
      ['Working Business Days', `${result.workingDays.toLocaleString('en-IN')} Days`, workWeekType === '5days' ? 'Monday – Friday (Sat/Sun off)' : 'Monday – Saturday (Sun off)'],
      ['Weekend Days Off', `${result.weekendDays.toLocaleString('en-IN')} Days`, `${result.totalDays > 0 ? ((result.weekendDays / result.totalDays) * 100).toFixed(1) : 0}% of total time`],
      ['Total Weeks', `${result.totalWeeks.toLocaleString('en-IN')} Weeks`, `${Math.floor(result.totalWeeks)} full completed weeks`],
      ['Total Hours', `${result.totalHours.toLocaleString('en-IN')} Hours`, 'Total elapsed hours'],
      ['Total Minutes', `${result.totalMinutes.toLocaleString('en-IN')} Minutes`, 'Total elapsed minutes'],
    ],
    [result, includeEndDate, workWeekType]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Date Interval & Working Days Assessment Report',
      [
        { label: 'Start Date', value: startDate },
        { label: 'End Date', value: endDate },
        { label: 'Include End Date', value: includeEndDate ? 'Yes (Inclusive)' : 'No (Exclusive)' },
        { label: 'Work Week Schedule', value: workWeekType === '5days' ? '5-Day Week (Mon-Fri)' : '6-Day Week (Mon-Sat)' },
        { label: 'Calendar Duration', value: result.formattedDifference },
        { label: 'Total Calendar Days', value: `${result.totalDays.toLocaleString('en-IN')} days` },
        { label: 'Working Business Days', value: `${result.workingDays.toLocaleString('en-IN')} days` },
        { label: 'Weekend Days', value: `${result.weekendDays.toLocaleString('en-IN')} days` },
        { label: 'Total Weeks', value: `${result.totalWeeks.toLocaleString('en-IN')} weeks` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Date_Difference_Report');
  };

  const shareUrl = generateShareableLink('/date-difference-calculator', {
    s: startDate,
    e: endDate,
    inc: includeEndDate ? 1 : 0,
    w: workWeekType,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* End Date Inclusion Toggle */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <input
              type="checkbox"
              id={`include-end-${id}`}
              checked={includeEndDate}
              onChange={(e) => setIncludeEndDate(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor={`include-end-${id}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
              Include End Date in Calculation (+1 day)
            </label>
          </div>

          {/* Work Week Selection */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Work Week Schedule (For Business Days)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setWorkWeekType('5days')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  workWeekType === '5days'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                }`}
              >
                5-Day Week (Mon–Fri)
              </button>
              <button
                type="button"
                onClick={() => setWorkWeekType('6days')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  workWeekType === '6days'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                }`}
              >
                6-Day Week (Mon–Sat)
              </button>
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
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            title="Date Difference Summary"
            items={[
              { label: 'Calendar Duration', value: result.formattedDifference, highlight: true, color: '#2563EB' },
              { label: 'Total Calendar Days', value: `${result.totalDays.toLocaleString('en-IN')} days`, highlight: true, color: '#16A34A' },
              { label: 'Working Business Days', value: `${result.workingDays.toLocaleString('en-IN')} days` },
              { label: 'Weekend Days (Off)', value: `${result.weekendDays.toLocaleString('en-IN')} days` },
              { label: 'Total Weeks', value: `${result.totalWeeks.toLocaleString('en-IN')} wks` },
              { label: 'Total Hours', value: `${result.totalHours.toLocaleString('en-IN')} hrs` },
            ]}
          />

          <ChartWrapper title="Working Days vs Weekend Days Proportion">
            <DateDifferencePieChart
              workingDays={result.workingDays}
              weekendDays={result.weekendDays}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Comprehensive Date & Time Duration Breakdown"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function DateDifferenceCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initStart = searchParams.get('s') || getOffsetDate(0);
  const initEnd = searchParams.get('e') || getOffsetDate(45);
  const initInc = searchParams.get('inc') === '1';
  const initW = (searchParams.get('w') as WorkWeekType) || '5days';

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialStart={initStart}
          initialEnd={initEnd}
          initialIncludeEnd={initInc}
          initialWorkWeek={initW}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Date Range A</h3>
            <CalculatorInstance
              id="comp1"
              initialStart={initStart}
              initialEnd={initEnd}
              initialIncludeEnd={initInc}
              initialWorkWeek={initW}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Date Range B</h3>
            <CalculatorInstance
              id="comp2"
              initialStart={initStart}
              initialEnd={getOffsetDate(90)}
              initialIncludeEnd={initInc}
              initialWorkWeek="6days"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DateDifferenceCalculator;
