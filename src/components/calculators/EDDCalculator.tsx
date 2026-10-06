'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { ChartWrapper } from '@/components/ui/ChartWrapper';
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

export function EDDCalculator() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const [method, setMethod] = useState<PregnancyCalcMethod>(
    (searchParams.get('method') as PregnancyCalcMethod) || 'lmp'
  );
  const [date, setDate] = useState<string>(
    searchParams.get('date') || getDefaultDate()
  );
  const [cycleLengthDays, setCycleLengthDays] = useState(
    parseInt(searchParams.get('cycle') || '28', 10)
  );
  const [ivfType, setIvfType] = useState<IVFType>(
    (searchParams.get('ivf') as IVFType) || 'day5'
  );
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState(
    parseInt(searchParams.get('usw') || '12', 10)
  );
  const [ultrasoundDays, setUltrasoundDays] = useState(
    parseInt(searchParams.get('usd') || '0', 10)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const scheduleHeaders = ['Prenatal Milestone / Test', 'Recommended Gestational Window', 'Clinical Purpose & Details'];
  const scheduleData = useMemo(() => {
    const lmpBase = new Date(result.conceptionDateEstimated);
    lmpBase.setDate(lmpBase.getDate() - 14);

    const addWeeks = (w: number) => {
      const d = new Date(lmpBase);
      d.setDate(d.getDate() + w * 7);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return [
      ['Dating / Viability Ultrasound', 'Weeks 6 – 9 (' + addWeeks(7) + ')', 'Confirms intrauterine pregnancy, heartbeat & accurate gestational baseline.'],
      ['Nuchal Translucency (NT) Scan', 'Weeks 11 – 13 (' + addWeeks(12) + ')', 'Screens for chromosomal conditions (Down syndrome) and structural anatomy.'],
      ['Non-Invasive Prenatal Testing (NIPT)', 'Weeks 10 – 14 (' + addWeeks(11) + ')', 'Maternal cell-free DNA blood screen for trisomies and optional fetal sex.'],
      ['Fetal Anomaly Scan (Level II / TIFFA)', 'Weeks 18 – 20 (' + addWeeks(19) + ')', 'Comprehensive detailed anatomical evaluation of brain, heart, spine & limbs.'],
      ['Glucose Tolerance Test (OGTT)', 'Weeks 24 – 28 (' + addWeeks(26) + ')', 'Standard screening for gestational diabetes mellitus (GDM).'],
      ['Third Trimester Growth Ultrasound', 'Weeks 28 – 32 (' + addWeeks(30) + ')', 'Monitors fetal growth percentile, amniotic fluid index (AFI) & placental position.'],
      ['Full-Term Gestational Milestone', 'Week 37 (' + addWeeks(37) + ')', 'Baby is medically considered early term; lungs & organs fully developed for delivery.'],
      ['Estimated Due Date (EDD)', 'Week 40 (' + result.formattedDueDate + ')', 'Estimated 40-week delivery target based on clinical obstetric dating.'],
    ];
  }, [result]);

  const trimesterHeaders = ['Trimester Phase', 'Gestational Span', 'Calendar Window', 'Status'];
  const trimesterData = useMemo(
    () =>
      result.trimesters.map((t) => [
        t.name,
        t.weeksRange,
        `${t.startDate} to ${t.endDate}`,
        t.isCurrent ? 'Current Trimester ⭐' : 'Scheduled',
      ]),
    [result]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Estimated Due Date (EDD) & Prenatal Schedule Report',
      [
        { label: 'Calculation Method', value: result.methodUsed },
        { label: 'Estimated Due Date (EDD)', value: result.formattedDueDate },
        { label: 'Current Gestational Age', value: `${result.currentGestationalAgeWeeks} Weeks, ${result.currentGestationalAgeDays} Days` },
        { label: 'Estimated Conception Date', value: result.conceptionDateEstimated },
        { label: 'Pregnancy Progress', value: `${result.progressPercentage}% Completed` },
        { label: 'Days Until Delivery', value: `${result.daysRemaining} Days` },
        { label: 'Current Phase', value: result.currentTrimester },
      ],
      scheduleHeaders,
      scheduleData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(scheduleHeaders, scheduleData, 'EDD_Pregnancy_Timeline_Report');
  };

  const shareUrl = generateShareableLink('/edd-calculator', {
    method,
    date,
    cycle: String(cycleLengthDays),
    ivf: ivfType,
  });

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Top Controls & Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 flex flex-col gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Select Calculation Method (गणना का तरीका)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'lmp', label: 'LMP (Period)' },
                { id: 'conception', label: 'Conception' },
                { id: 'ivf', label: 'IVF Transfer' },
                { id: 'ultrasound', label: 'Ultrasound' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id as PregnancyCalcMethod)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                    method === m.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Input based on selected method */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {method === 'lmp' && 'First Day of Last Menstrual Period (LMP)'}
              {method === 'conception' && 'Exact Conception / Ovulation Date'}
              {method === 'ivf' && 'IVF Embryo Transfer Date'}
              {method === 'ultrasound' && 'Date of Ultrasound Scan'}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {method === 'lmp' && 'Default calculation based on standard clinical Naegele’s rule.'}
              {method === 'conception' && 'Adds 266 days (38 full weeks) from fertilization.'}
              {method === 'ivf' && 'Precise calculation factoring blastocyst developmental day.'}
              {method === 'ultrasound' && 'Calculated from gestational crown-rump length dating.'}
            </p>
          </div>

          {/* Method-specific sub-inputs */}
          {method === 'lmp' && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                <span>Average Menstrual Cycle Length</span>
                <span className="text-blue-600 font-bold">{cycleLengthDays} Days</span>
              </div>
              <input
                type="range"
                min="20"
                max="45"
                value={cycleLengthDays}
                onChange={(e) => setCycleLengthDays(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>20 Days (Short)</span>
                <span>28 Days (Standard)</span>
                <span>45 Days (Long)</span>
              </div>
            </div>
          )}

          {method === 'ivf' && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Embryo Transfer Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="ivfType"
                    checked={ivfType === 'day5'}
                    onChange={() => setIvfType('day5')}
                    className="accent-blue-600"
                  />
                  <span>Day 5 Blastocyst (+261 Days)</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="ivfType"
                    checked={ivfType === 'day3'}
                    onChange={() => setIvfType('day3')}
                    className="accent-blue-600"
                  />
                  <span>Day 3 Embryo (+263 Days)</span>
                </label>
              </div>
            </div>
          )}

          {method === 'ultrasound' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Weeks at Scan</label>
                <input
                  type="number"
                  min="4"
                  max="36"
                  value={ultrasoundWeeks}
                  onChange={(e) => setUltrasoundWeeks(parseInt(e.target.value, 10) || 0)}
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Days at Scan</label>
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={ultrasoundDays}
                  onChange={(e) => setUltrasoundDays(parseInt(e.target.value, 10) || 0)}
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Column: EDD Results & Milestone Visuals */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            title="Estimated Due Date (EDD) Summary"
            items={[
              {
                label: 'Calculated EDD (Delivery Date)',
                value: result.formattedDueDate,
                highlight: true,
                color: '#2563EB',
              },
              {
                label: 'Current Gestational Age',
                value: `${result.currentGestationalAgeWeeks} Weeks, ${result.currentGestationalAgeDays} Days`,
                highlight: true,
                color: '#059669',
              },
              {
                label: 'Pregnancy Progress',
                value: `${result.progressPercentage}% Completed`,
              },
              {
                label: 'Days Remaining Until EDD',
                value: `${result.daysRemaining} Days (${result.weeksRemaining} Weeks)`,
              },
              {
                label: 'Current Phase',
                value: result.currentTrimester,
              },
              {
                label: 'Estimated Conception Date',
                value: result.conceptionDateEstimated,
              },
            ]}
          />

          {/* Gestational Progress Bar */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Gestational Progress (Week {result.currentGestationalAgeWeeks} of 40)</span>
              <span className="text-blue-600 dark:text-blue-400">{result.progressPercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
              <div
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(2, result.progressPercentage))}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Conception</span>
              <span>1st Trimester</span>
              <span>2nd Trimester</span>
              <span>Full Term (Week 37)</span>
              <span>EDD</span>
            </div>
          </div>

          <ChartWrapper title="Trimester Timeline & Milestones">
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

      {/* Comprehensive Prenatal Scan & Test Schedule */}
      <div className="w-full space-y-6">
        <DataTable
          caption="Clinical Prenatal Milestone & Ultrasound Scan Schedule (EDD Tracker)"
          headers={scheduleHeaders}
          data={scheduleData}
        />

        <DataTable
          caption="Trimester Breakdown & Gestational Weeks Window"
          headers={trimesterHeaders}
          data={trimesterData}
        />
      </div>
    </div>
  );
}

export default EDDCalculator;
