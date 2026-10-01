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
  calculateCompoundInterest,
  generateCIYearlyBreakdown,
  CompoundInterestInput,
  DepositFrequency,
} from '@/lib/calculators/compound-interest';
import { CompoundingFrequency } from '@/lib/calculators/fd';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const CompoundInterestChart = dynamic(() => import('@/components/charts/CompoundInterestChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[340px] w-full" />,
});

function CalculatorInstance({
  id,
  initialPrincipal = 100000,
  initialRate = 8.5,
  initialYears = 5,
  initialFreq = 'quarterly',
  initialRegularDeposit = 0,
}: {
  id: string;
  initialPrincipal?: number;
  initialRate?: number;
  initialYears?: number;
  initialFreq?: CompoundingFrequency;
  initialRegularDeposit?: number;
}) {
  const [principal, setPrincipal] = useState(initialPrincipal);
  const [rate, setRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);
  const [freq, setFreq] = useState<CompoundingFrequency>(initialFreq);
  const [regularDeposit, setRegularDeposit] = useState(initialRegularDeposit);
  const [depositFreq, setDepositFreq] = useState<DepositFrequency>('monthly');

  const input: CompoundInterestInput = useMemo(
    () => ({
      principal,
      annualRate: rate,
      tenureYears: years,
      compoundingFrequency: freq,
      regularDepositAmount: regularDeposit,
      regularDepositFrequency: depositFreq,
    }),
    [principal, rate, years, freq, regularDeposit, depositFreq]
  );

  const result = useMemo(() => calculateCompoundInterest(input), [input]);
  const breakdown = useMemo(() => generateCIYearlyBreakdown(input), [input]);

  const tableHeaders = ['Year', 'Opening Balance', 'Deposits Made', 'Interest Earned', 'Closing Balance'];
  const tableData = useMemo(
    () =>
      breakdown.map((row) => [
        `Year ${row.year}`,
        formatINR(row.openingBalance),
        formatINR(row.depositsThisYear),
        formatINR(row.interestEarnedThisYear),
        formatINR(row.closingBalance),
      ]),
    [breakdown]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Compound Interest Investment Growth Report',
      [
        { label: 'Initial Principal', value: formatINR(principal) },
        { label: 'Annual Interest Rate', value: `${rate}%` },
        { label: 'Investment Tenure', value: `${years} years` },
        { label: 'Compounding Frequency', value: freq.toUpperCase() },
        { label: 'Effective Annual Rate (APY)', value: `${result.effectiveAnnualRate}%` },
        { label: 'Total Principal Invested', value: formatINR(result.totalPrincipal) },
        { label: 'Total Compound Interest', value: formatINR(result.totalInterestEarned) },
        { label: 'Final Maturity Amount', value: formatINR(result.maturityAmount) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Compound_Interest_Schedule');
  };

  const shareUrl = generateShareableLink('/compound-interest-calculator', {
    p: principal,
    r: rate,
    y: years,
    f: freq,
    d: regularDeposit,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Initial Principal Amount"
            value={principal}
            onChange={setPrincipal}
            min={1000}
            max={10000000}
            step={1000}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Annual Interest Rate (% p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.1}
            suffix="%"
          />
          <InputGroup
            label="Investment Duration / Tenure"
            value={years}
            onChange={setYears}
            min={1}
            max={50}
            step={1}
            suffix=" Yrs"
          />

          {/* Compounding Frequency Picker */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Compounding Frequency</span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(['daily', 'monthly', 'quarterly', 'half-yearly', 'yearly'] as CompoundingFrequency[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFreq(f)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border capitalize transition-all ${
                    freq === f
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <InputGroup
            label="Regular Additional Deposit (Optional)"
            value={regularDeposit}
            onChange={setRegularDeposit}
            min={0}
            max={100000}
            step={500}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          <DisclaimerNote sourceNote="Bank fixed deposits in India typically compound quarterly (4 times/year)." />

          <div className="flex justify-end mt-2">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Summary & Area Growth Chart */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            title="Compound Growth Summary"
            items={[
              { label: 'Final Maturity Amount', value: formatINR(result.maturityAmount), highlight: true, color: '#1E40AF' },
              { label: 'Total Interest Earned', value: formatINR(result.totalInterestEarned), highlight: true, color: '#059669' },
              { label: 'Total Principal Invested', value: formatINR(result.totalPrincipal) },
              { label: 'Effective Annual Rate (APY)', value: `${result.effectiveAnnualRate}%` },
            ]}
          />

          <ChartWrapper title="Compound Growth Timeline" height={320}>
            <CompoundInterestChart data={breakdown} />
          </ChartWrapper>
        </div>
      </div>

      {/* Yearly Table */}
      <div className="mt-8">
        <DataTable
          caption="Year-by-Year Compound Growth & Accrual Table"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function CompoundInterestCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initP = searchParams.get('p') ? Number(searchParams.get('p')) : 100000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 8.5;
  const initY = searchParams.get('y') ? Number(searchParams.get('y')) : 5;
  const initF = (searchParams.get('f') as CompoundingFrequency) || 'quarterly';
  const initD = searchParams.get('d') ? Number(searchParams.get('d')) : 0;

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
          initialYears={initY}
          initialFreq={initF}
          initialRegularDeposit={initD}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (Quarterly Compounding)</h3>
            <CalculatorInstance
              id="comp1"
              initialPrincipal={initP}
              initialRate={initR}
              initialYears={initY}
              initialFreq={initF}
              initialRegularDeposit={initD}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (Monthly Compounding / Higher Rate)</h3>
            <CalculatorInstance
              id="comp2"
              initialPrincipal={initP}
              initialRate={initR + 1.5}
              initialYears={initY}
              initialFreq="monthly"
              initialRegularDeposit={initD}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CompoundInterestCalculator;
