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
  calculateAge,
  AgeInput,
  calculateDOBFromAge,
  validateDOBFromAgeInput,
} from '@/lib/calculators/age';
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

function StandardAgeCalculatorInstance({
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

function ReverseDOBCalculatorInstance({
  initialYears = 25,
  initialMonths = 0,
  initialDays = 0,
  initialAsOfDate,
}: {
  initialYears?: number;
  initialMonths?: number;
  initialDays?: number;
  initialAsOfDate?: string;
}) {
  const [years, setYears] = useState<number>(initialYears);
  const [months, setMonths] = useState<number>(initialMonths);
  const [days, setDays] = useState<number>(initialDays);
  const [asOfDate, setAsOfDate] = useState<string>(initialAsOfDate || getTodayISO());

  const result = useMemo(
    () =>
      calculateDOBFromAge({
        years: Number(years) || 0,
        months: Number(months) || 0,
        days: Number(days) || 0,
        asOfDate,
      }),
    [years, months, days, asOfDate]
  );

  const presets = [
    { label: '18 Years (Voting)', y: 18, m: 0, d: 0 },
    { label: '21 Years (Civil Services)', y: 21, m: 0, d: 0 },
    { label: '25 Years (Quarter Century)', y: 25, m: 0, d: 0 },
    { label: '30 Years', y: 30, m: 0, d: 0 },
    { label: '60 Years (Senior Citizen)', y: 60, m: 0, d: 0 },
  ];

  const tableHeaders = ['Measurement Detail', 'Calculated Value', 'Verification & Context'];
  const tableData = useMemo(
    () => [
      ['Date of Birth (DOB)', result.formattedBirthDate, `ISO: ${result.birthDateISO}`],
      ['Day of the Week Born', result.dayOfWeek, 'Weekday of birth'],
      ['Astrological Zodiac Sign', result.zodiacSign, 'Sun sign based on calendar DOB'],
      ['Birth Year Classification', `${result.birthYear} (${result.isLeapYear ? 'Leap Year - 366 days' : 'Common Year - 365 days'})`, 'Leap year calendar accuracy'],
      ['Total Elapsed Days Lived', `${result.totalDaysLived.toLocaleString('en-IN')} Days`, `Days elapsed up to ${asOfDate}`],
      ['Reference Date Used', asOfDate, 'As-of comparison date'],
      ['Input Age Stated', result.inputAgeSummary, 'Years, Months & Days entered'],
    ],
    [result, asOfDate]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Reverse DOB Verification Assessment Report',
      [
        { label: 'Entered Age', value: result.inputAgeSummary },
        { label: 'Reference Date', value: asOfDate },
        { label: 'Calculated DOB', value: result.formattedBirthDate },
        { label: 'Day of Week', value: result.dayOfWeek },
        { label: 'Zodiac Sign', value: result.zodiacSign },
        { label: 'Total Days Lived', value: `${result.totalDaysLived.toLocaleString('en-IN')} days` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'DOB_From_Age_Report');
  };

  const shareUrl = generateShareableLink('/calculate-dob-from-age', {
    years: String(years),
    months: String(months),
    days: String(days),
    at: asOfDate,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-900/60">
            <p className="text-sm text-blue-900 dark:text-blue-200 font-medium">
              💡 <strong>Quick Presets:</strong> Click any common milestone to instantly test:
            </p>
            <div className="flex flex-wrap gap-2 mt-2.5">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setYears(p.y);
                    setMonths(p.m);
                    setDays(p.d);
                  }}
                  className="text-xs px-2.5 py-1 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors shadow-sm"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Years <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="150"
                value={years}
                onChange={(e) => setYears(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg font-bold"
                placeholder="25"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Months
              </label>
              <input
                type="number"
                min="0"
                max="11"
                value={months}
                onChange={(e) => setMonths(Math.min(11, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg font-bold"
                placeholder="0"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Days
              </label>
              <input
                type="number"
                min="0"
                max="31"
                value={days}
                onChange={(e) => setDays(Math.min(31, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg font-bold"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              As of Date (Reference Date)
            </label>
            <input
              type="date"
              value={asOfDate}
              onChange={(e) => setAsOfDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500">
              Defaults to today. Set to an exam notification date (e.g., 1st August) to find exact eligible birth dates.
            </p>
          </div>

          <div className="flex justify-end mt-2">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Results Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-lg border border-emerald-500/20">
            <div className="text-xs uppercase tracking-wider font-semibold text-emerald-100 mb-1">
              Exact Calculated Date of Birth
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {result.formattedBirthDate}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium">
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                🗓️ Born on a {result.dayOfWeek}
              </span>
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                ⭐ Zodiac: {result.zodiacSign}
              </span>
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                {result.isLeapYear ? '✨ Leap Year' : '📅 Normal Year'}
              </span>
            </div>
          </div>

          <ResultCard
            title="Reverse DOB Analysis"
            items={[
              { label: 'Date of Birth (ISO)', value: result.birthDateISO, highlight: true, color: '#059669' },
              { label: 'Day of Week', value: result.dayOfWeek, highlight: true, color: '#2563EB' },
              { label: 'Astrological Sign', value: result.zodiacSign },
              { label: 'Total Days Lived', value: `${result.totalDaysLived.toLocaleString('en-IN')} days` },
              { label: 'Birth Year', value: `${result.birthYear}` },
              { label: 'Input Age', value: result.inputAgeSummary },
            ]}
          />
        </div>
      </div>

      {/* Detailed Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Reverse DOB & Astrological Reference Breakdown"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export interface AgeCalculatorProps {
  defaultMode?: 'ageFromDob' | 'dobFromAge';
}

export function AgeCalculator({ defaultMode = 'ageFromDob' }: AgeCalculatorProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'ageFromDob' | 'dobFromAge'>(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'dobFromAge' || urlMode === 'reverse') return 'dobFromAge';
    return defaultMode;
  });
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initDob = searchParams.get('dob') || '1995-05-15';
  const initAt = searchParams.get('at') || getTodayISO();
  const initYears = parseInt(searchParams.get('years') || '25', 10);
  const initMonths = parseInt(searchParams.get('months') || '0', 10);
  const initDays = parseInt(searchParams.get('days') || '0', 10);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setActiveTab('ageFromDob')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'ageFromDob'
                ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span>📅</span>
            <span>Calculate Age from DOB</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dobFromAge')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'dobFromAge'
                ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span>🔄</span>
            <span>Calculate DOB from Age</span>
          </button>
        </div>

        {activeTab === 'ageFromDob' && (
          <div className="flex justify-end">
            <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
          </div>
        )}
      </div>

      {activeTab === 'ageFromDob' ? (
        !isComparing ? (
          <StandardAgeCalculatorInstance
            id="main"
            initialBirthDate={initDob}
            initialTargetDate={initAt}
          />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Person 1</h3>
              <StandardAgeCalculatorInstance
                id="comp1"
                initialBirthDate={initDob}
                initialTargetDate={initAt}
              />
            </div>
            <div className="xl:pl-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Person 2</h3>
              <StandardAgeCalculatorInstance
                id="comp2"
                initialBirthDate="1998-11-20"
                initialTargetDate={initAt}
              />
            </div>
          </div>
        )
      ) : (
        <ReverseDOBCalculatorInstance
          initialYears={initYears}
          initialMonths={initMonths}
          initialDays={initDays}
          initialAsOfDate={initAt}
        />
      )}
    </div>
  );
}

export default AgeCalculator;
