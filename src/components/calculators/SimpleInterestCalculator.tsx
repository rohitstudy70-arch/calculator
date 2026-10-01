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
  calculateSimpleInterest,
  generateSIBreakdown,
  SimpleInterestInput,
  SIMode,
  SITimeUnit,
} from '@/lib/calculators/simple-interest';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const SimpleInterestChart = dynamic(() => import('@/components/charts/SimpleInterestChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialPrincipal = 50000,
  initialRate = 8,
  initialTime = 3,
  initialUnit = 'years',
  initialMode = 'calculate_interest',
}: {
  id: string;
  initialPrincipal?: number;
  initialRate?: number;
  initialTime?: number;
  initialUnit?: SITimeUnit;
  initialMode?: SIMode;
}) {
  const [mode, setMode] = useState<SIMode>(initialMode);
  const [principal, setPrincipal] = useState(initialPrincipal);
  const [rate, setRate] = useState(initialRate);
  const [timeValue, setTimeValue] = useState(initialTime);
  const [timeUnit, setTimeUnit] = useState<SITimeUnit>(initialUnit);
  const [targetInterest, setTargetInterest] = useState(12000);

  const input: SimpleInterestInput = useMemo(
    () => ({
      mode,
      principal,
      annualRate: rate,
      timeValue,
      timeUnit,
      targetInterest,
    }),
    [mode, principal, rate, timeValue, timeUnit, targetInterest]
  );

  const result = useMemo(() => calculateSimpleInterest(input), [input]);
  const breakdown = useMemo(() => generateSIBreakdown(input), [input]);

  const tableHeaders = ['Period', 'Principal', 'Interest in Period', 'Cumulative Interest', 'Total Balance'];
  const tableData = useMemo(
    () =>
      breakdown.map((row) => [
        row.period,
        formatINR(row.openingPrincipal),
        formatINR(row.interestEarned),
        formatINR(row.cumulativeInterest),
        formatINR(row.totalAmount),
      ]),
    [breakdown]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Simple Interest Calculation Report',
      [
        { label: 'Principal Amount', value: formatINR(result.principal) },
        { label: 'Annual Interest Rate', value: `${result.annualRate}% p.a.` },
        { label: 'Time Period', value: `${timeValue} ${timeUnit}` },
        { label: 'Total Simple Interest', value: formatINR(result.interestEarned) },
        { label: 'Total Repayment / Maturity', value: formatINR(result.totalAmount) },
        { label: 'Yearly Interest', value: formatINR(result.yearlyInterest) },
        { label: 'Monthly Interest', value: formatINR(result.monthlyInterest) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Simple_Interest_Schedule');
  };

  const shareUrl = generateShareableLink('/simple-interest-calculator', {
    m: mode,
    p: principal,
    r: rate,
    t: timeValue,
    u: timeUnit,
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl max-w-fit">
        {[
          { key: 'calculate_interest', label: 'Calculate Interest' },
          { key: 'find_rate', label: 'Find Rate (%)' },
          { key: 'find_time', label: 'Find Time' },
          { key: 'find_principal', label: 'Find Principal' },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setMode(item.key as SIMode)}
            className={`py-2 px-4 text-xs font-semibold rounded-lg transition-all ${
              mode === item.key
                ? 'bg-white dark:bg-gray-900 text-blue-700 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {mode !== 'find_principal' && (
            <InputGroup
              label="Principal Amount"
              value={principal}
              onChange={setPrincipal}
              min={1000}
              max={10000000}
              step={1000}
              prefix="₹"
              formatValue={formatCompactINR}
            />
          )}

          {mode !== 'find_rate' && (
            <InputGroup
              label="Annual Interest Rate"
              value={rate}
              onChange={setRate}
              min={1}
              max={40}
              step={0.1}
              suffix="%"
            />
          )}

          {mode !== 'find_time' && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Duration Unit</span>
                <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-0.5">
                  {(['years', 'months', 'days'] as SITimeUnit[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setTimeUnit(u)}
                      className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                        timeUnit === u
                          ? 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <InputGroup
                label={`Time (${timeUnit})`}
                value={timeValue}
                onChange={setTimeValue}
                min={1}
                max={timeUnit === 'days' ? 3650 : timeUnit === 'months' ? 360 : 30}
                step={1}
                suffix={` ${timeUnit}`}
              />
            </div>
          )}

          {mode !== 'calculate_interest' && (
            <InputGroup
              label="Target Simple Interest"
              value={targetInterest}
              onChange={setTargetInterest}
              min={500}
              max={5000000}
              step={500}
              prefix="₹"
              formatValue={formatCompactINR}
            />
          )}

          <DisclaimerNote sourceNote="Simple interest calculation formula: SI = (P × R × T) / 100." />

          <div className="flex justify-end mt-2">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Summary & Pie Chart */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            title="Simple Interest Result"
            items={[
              { label: 'Total Simple Interest', value: formatINR(result.interestEarned), highlight: true, color: '#1E40AF' },
              { label: 'Total Amount (P + SI)', value: formatINR(result.totalAmount), highlight: true, color: '#059669' },
              { label: 'Calculated Principal', value: formatINR(result.principal) },
              { label: 'Annual Interest Rate', value: `${result.annualRate}%` },
              { label: 'Yearly Interest', value: formatINR(result.yearlyInterest) },
              { label: 'Monthly Interest', value: formatINR(result.monthlyInterest) },
            ]}
          />

          <ChartWrapper title="Principal vs Interest Breakdown" height={280}>
            <SimpleInterestChart principal={result.principal} totalInterest={result.interestEarned} />
          </ChartWrapper>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="mt-8">
        <DataTable
          caption="Period-by-Period Simple Interest Accumulation"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function SimpleInterestCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initP = searchParams.get('p') ? Number(searchParams.get('p')) : 50000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 8;
  const initT = searchParams.get('t') ? Number(searchParams.get('t')) : 3;
  const initU = (searchParams.get('u') as SITimeUnit) || 'years';
  const initM = (searchParams.get('m') as SIMode) || 'calculate_interest';

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialPrincipal={initP}
          initialRate={initR}
          initialTime={initT}
          initialUnit={initU}
          initialMode={initM}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (Rate 8%)</h3>
            <CalculatorInstance
              id="comp1"
              initialPrincipal={initP}
              initialRate={initR}
              initialTime={initT}
              initialUnit={initU}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (Rate 12%)</h3>
            <CalculatorInstance
              id="comp2"
              initialPrincipal={initP}
              initialRate={initR + 4}
              initialTime={initT}
              initialUnit={initU}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SimpleInterestCalculator;
