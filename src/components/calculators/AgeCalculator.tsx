'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { CompareToggle } from '@/components/ui/CompareToggle';
import { ChartWrapper } from '@/components/ui/ChartWrapper';
import { calculateAge, AgeInput } from '@/lib/calculators/age';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const AgeMilestoneChart = dynamic(() => import('@/components/charts/AgeMilestoneChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

function getTodayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function CalculatorInstance({
  id,
  initialBirthDate = '1995-05-15',
  initialTargetDate,
}: {
  id: string;
  initialBirthDate?: string;
  initialTargetDate?: string;
}) {
  const [birthDate, setBirthDate] = useState<string>(initialBirthDate);
  const [targetDate, setTargetDate] = useState<string>(initialTargetDate || getTodayISO());

  const input: AgeInput = useMemo(
    () => ({
      birthDate,
      targetDate,
    }),
    [birthDate, targetDate]
  );

  const result = useMemo(() => calculateAge(input), [input]);

  const tableHeaders = ['Measurement Unit', 'Exact Value', 'Equivalence & Context'];
  const tableData = useMemo(
    () => [
      ['Exact Age', `${result.years} Years, ${result.months} Months, ${result.days} Days`, 'Full Gregorian calendar precision'],
      ['Total Months', `${result.totalMonths} Months`, `${(result.totalMonths / 12).toFixed(2)} years total`],
      ['Total Weeks', `${result.totalWeeks.toLocaleString('en-IN')} Weeks`, `${Math.floor(result.totalWeeks)} completed full weeks`],
      ['Total Days', `${result.totalDays.toLocaleString('en-IN')} Days`, 'Days elapsed since birth'],
      ['Total Hours', `${result.totalHours.toLocaleString('en-IN')} Hours`, 'Hours lived'],
      ['Total Minutes', `${result.totalMinutes.toLocaleString('en-IN')} Minutes`, 'Minutes lived'],
      ['Next Birthday Countdown', `${result.nextBirthdayDays} Days`, `${result.nextBirthdayDate} (${result.nextBirthdayDayOfWeek})`],
      ['Zodiac Sun Sign', result.zodiacSign, 'Tropical astrological sign'],
    ],
    [result]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Chronological Age & Milestone Assessment Report',
      [
        { label: 'Date of Birth', value: birthDate },
        { label: 'Calculated Age At Date', value: targetDate },
        { label: 'Exact Age', value: result.formattedSummary },
        { label: 'Total Days Lived', value: `${result.totalDays.toLocaleString('en-IN')} days` },
        { label: 'Total Weeks Lived', value: `${result.totalWeeks.toLocaleString('en-IN')} weeks` },
        { label: 'Total Hours Lived', value: `${result.totalHours.toLocaleString('en-IN')} hours` },
        { label: 'Next Birthday', value: `${result.nextBirthdayDate} (${result.nextBirthdayDays} days away on ${result.nextBirthdayDayOfWeek})` },
        { label: 'Western Zodiac Sign', value: result.zodiacSign },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Age_Calculation_Report');
  };

  const shareUrl = generateShareableLink('/age-calculator', {
    dob: birthDate,
    at: targetDate,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
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
              Age on Date (Reference Date)
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500">Defaults to today. Change to check age on exam cutoffs or retirement dates.</p>
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
            title="Chronological Age Summary"
            items={[
              { label: 'Exact Age', value: `${result.years} Y, ${result.months} M, ${result.days} D`, highlight: true, color: '#2563EB' },
              { label: 'Total Days Lived', value: `${result.totalDays.toLocaleString('en-IN')} days`, highlight: true, color: '#7C3AED' },
              { label: 'Total Weeks', value: `${result.totalWeeks.toLocaleString('en-IN')} weeks` },
              { label: 'Total Hours', value: `${result.totalHours.toLocaleString('en-IN')} hrs` },
              { label: 'Next Birthday Countdown', value: `${result.nextBirthdayDays} days left` },
              { label: 'Zodiac Sign', value: result.zodiacSign },
            ]}
          />

          <ChartWrapper title="Age Milestones & Birthday Countdown">
            <AgeMilestoneChart
              years={result.years}
              months={result.months}
              days={result.days}
              nextBirthdayDays={result.nextBirthdayDays}
              zodiacSign={result.zodiacSign}
              milestones={result.milestones}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Comprehensive Age Units Breakdown"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function AgeCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initDob = searchParams.get('dob') || '1995-05-15';
  const initAt = searchParams.get('at') || getTodayISO();

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
          initialTargetDate={initAt}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Person 1</h3>
            <CalculatorInstance
              id="comp1"
              initialBirthDate={initDob}
              initialTargetDate={initAt}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Person 2</h3>
            <CalculatorInstance
              id="comp2"
              initialBirthDate="1998-11-20"
              initialTargetDate={initAt}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AgeCalculator;
