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
  calculateCAGR,
  generateCAGRYearlyBreakdown,
  CAGRInput,
  CAGRMode,
} from '@/lib/calculators/cagr';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const CAGRChart = dynamic(() => import('@/components/charts/CAGRChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialMode = 'calculate_cagr',
  initialStartVal = 100000,
  initialEndVal = 250000,
  initialTargetCagr = 15.0,
  initialYears = 5,
}: {
  id: string;
  initialMode?: CAGRMode;
  initialStartVal?: number;
  initialEndVal?: number;
  initialTargetCagr?: number;
  initialYears?: number;
}) {
  const [mode, setMode] = useState<CAGRMode>(initialMode);
  const [initialValue, setInitialValue] = useState(initialStartVal);
  const [finalValue, setFinalValue] = useState(initialEndVal);
  const [targetCAGRPercent, setTargetCAGRPercent] = useState(initialTargetCagr);
  const [durationYears, setDurationYears] = useState(initialYears);

  const input: CAGRInput = useMemo(
    () => ({
      mode,
      initialValue,
      finalValue: mode === 'calculate_cagr' ? finalValue : undefined,
      targetCAGRPercent: mode === 'future_value_from_cagr' ? targetCAGRPercent : undefined,
      durationYears,
    }),
    [mode, initialValue, finalValue, targetCAGRPercent, durationYears]
  );

  const result = useMemo(() => calculateCAGR(input), [input]);
  const breakdown = useMemo(() => generateCAGRYearlyBreakdown(input), [input]);

  const tableHeaders = ['Year', 'Portfolio Value', 'Gain During Year', 'Cumulative Wealth Gain'];
  const tableData = useMemo(
    () =>
      breakdown.map((row) => [
        `Year ${row.year}`,
        formatINR(row.portfolioValue),
        `+${formatINR(row.absoluteGainThisYear)}`,
        `+${formatINR(row.cumulativeGain)}`,
      ]),
    [breakdown]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'CAGR & Annualized Growth Analysis Report',
      [
        { label: 'Initial Investment Value', value: formatINR(result.initialValue) },
        { label: 'Final Value / Target Value', value: formatINR(result.finalValue) },
        { label: 'Investment Duration', value: `${result.durationYears} Years` },
        { label: 'Compound Annual Growth Rate (CAGR)', value: `${result.cagrPercentage}%` },
        { label: 'Total Absolute Gain Amount', value: `+${formatINR(result.totalAbsoluteGainAmount)}` },
        { label: 'Total Absolute Return (%)', value: `+${result.totalAbsoluteGainPercentage}%` },
        { label: 'Doubling Period (Rule of 72)', value: `${result.doublingTimeYears} Years` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'CAGR_Growth_Trajectory');
  };

  const shareUrl = generateShareableLink('/cagr-calculator', {
    m: mode,
    v0: initialValue,
    vn: finalValue,
    r: targetCAGRPercent,
    y: durationYears,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Mode Switcher */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Calculation Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('calculate_cagr')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  mode === 'calculate_cagr'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Find CAGR from Final Value
              </button>
              <button
                type="button"
                onClick={() => setMode('future_value_from_cagr')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  mode === 'future_value_from_cagr'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Find Future Value from CAGR
              </button>
            </div>
          </div>

          <InputGroup
            label="Initial Investment Value"
            value={initialValue}
            onChange={setInitialValue}
            min={1000}
            max={50000000}
            step={5000}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          {mode === 'calculate_cagr' ? (
            <InputGroup
              label="Final Portfolio / Exit Value"
              value={finalValue}
              onChange={setFinalValue}
              min={1000}
              max={100000000}
              step={10000}
              prefix="₹"
              formatValue={formatCompactINR}
            />
          ) : (
            <InputGroup
              label="Target Annual CAGR (% p.a.)"
              value={targetCAGRPercent}
              onChange={setTargetCAGRPercent}
              min={1.0}
              max={50.0}
              step={0.5}
              suffix="%"
            />
          )}

          <InputGroup
            label="Holding Duration (Years)"
            value={durationYears}
            onChange={setDurationYears}
            min={1}
            max={40}
            step={1}
            suffix=" Yrs"
          />

          <DisclaimerNote sourceNote="CAGR is an annualized geometric average and does not account for intra-year market volatility." />

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
            title="CAGR Growth Summary"
            items={[
              { label: 'Annualized CAGR', value: `${result.cagrPercentage}%`, highlight: true, color: '#16A34A' },
              { label: 'Final Portfolio Value', value: formatINR(result.finalValue), highlight: true, color: '#1E40AF' },
              { label: 'Total Absolute Gain', value: `+${formatINR(result.totalAbsoluteGainAmount)}` },
              { label: 'Absolute Return (%)', value: `+${result.totalAbsoluteGainPercentage}%` },
              { label: 'Doubling Period (Rule of 72)', value: `${result.doublingTimeYears} Yrs` },
            ]}
          />

          <ChartWrapper title="Annualized Portfolio Growth Trajectory">
            <CAGRChart data={breakdown} />
          </ChartWrapper>
        </div>
      </div>

      {/* Yearly Table */}
      <div className="w-full">
        <DataTable
          caption="Yearly Compounded Portfolio Trajectory"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function CAGRCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initM = (searchParams.get('m') as CAGRMode) || 'calculate_cagr';
  const initV0 = searchParams.get('v0') ? Number(searchParams.get('v0')) : 100000;
  const initVn = searchParams.get('vn') ? Number(searchParams.get('vn')) : 250000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 15.0;
  const initY = searchParams.get('y') ? Number(searchParams.get('y')) : 5;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialMode={initM}
          initialStartVal={initV0}
          initialEndVal={initVn}
          initialTargetCagr={initR}
          initialYears={initY}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (Target ₹2.5 Lakhs in 5 Yrs)</h3>
            <CalculatorInstance
              id="comp1"
              initialMode={initM}
              initialStartVal={initV0}
              initialEndVal={initVn}
              initialTargetCagr={initR}
              initialYears={initY}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (Higher Returns / Longer Horizon)</h3>
            <CalculatorInstance
              id="comp2"
              initialMode={initM}
              initialStartVal={initV0}
              initialEndVal={initVn * 1.5}
              initialTargetCagr={initR + 3.0}
              initialYears={initY + 2}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CAGRCalculator;
