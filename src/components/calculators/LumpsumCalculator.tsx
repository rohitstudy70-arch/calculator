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
  calculateLumpsum, 
  generateLumpsumYearlyBreakdown
} from '@/lib/calculators/lumpsum';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const LumpsumPieChart = dynamic(() => import('@/components/charts/LumpsumPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

const InvestmentGrowthChart = dynamic(() => import('@/components/charts/InvestmentGrowthChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[400px] w-full" />,
});

function CalculatorInstance({ 
  id, 
  initialAmount = 500000, 
  initialRate = 12, 
  initialTenure = 10,
}: { 
  id: string;
  initialAmount?: number;
  initialRate?: number;
  initialTenure?: number;
}) {
  const [investmentAmount, setInvestmentAmount] = useState(initialAmount);
  const [expectedReturnRate, setExpectedReturnRate] = useState(initialRate);
  const [tenureYears, setTenureYears] = useState(initialTenure);

  const input = useMemo(() => ({ 
    investmentAmount, 
    expectedReturnRate, 
    timePeriodYears: tenureYears 
  }), [investmentAmount, expectedReturnRate, tenureYears]);

  const result = useMemo(() => calculateLumpsum(input), [input]);
  const breakdown = useMemo(() => generateLumpsumYearlyBreakdown(input), [input]);

  const tableHeaders = ['Year', 'Invested Amount', 'Estimated Returns', 'Total Value'];
  const tableData = useMemo(() => breakdown.map(y => [
    y.year,
    formatINR(y.investedAmount),
    formatINR(y.estimatedReturns),
    formatINR(y.totalValue),
  ]), [breakdown]);

  const handlePdfExport = () => {
    exportToPDF(
      'Lumpsum Calculator Report',
      [
        { label: 'Investment Amount', value: formatINR(investmentAmount) },
        { label: 'Expected Return', value: `${expectedReturnRate}%` },
        { label: 'Time Period', value: `${tenureYears} Years` },
        { label: 'Total Invested', value: formatINR(result.investmentAmount) },
        { label: 'Estimated Returns', value: formatINR(result.estimatedReturns) },
        { label: 'Total Value', value: formatINR(result.totalValue) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Lumpsum_Schedule');
  };

  const shareUrl = generateShareableLink('/lumpsum-calculator', {
    a: investmentAmount,
    r: expectedReturnRate,
    t: tenureYears,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Total Investment"
            value={investmentAmount}
            onChange={setInvestmentAmount}
            min={1000}
            max={100000000}
            step={10000}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Expected Return Rate (p.a)"
            value={expectedReturnRate}
            onChange={setExpectedReturnRate}
            min={1}
            max={30}
            step={0.1}
            suffix="%"
          />
          <InputGroup
            label="Time Period"
            value={tenureYears}
            onChange={setTenureYears}
            min={1}
            max={30}
            step={1}
            suffix=" Yr"
          />
          <div className="flex justify-end mt-2">
             <ShareActions 
               shareUrl={shareUrl}
               onDownloadPDF={handlePdfExport}
               onDownloadExcel={handleExcelExport}
             />
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            items={[
              { label: 'Invested Amount', value: formatINR(result.investmentAmount) },
              { label: 'Est. Returns', value: formatINR(result.estimatedReturns) },
              { label: 'Total Value', value: formatINR(result.totalValue), highlight: true },
            ]}
          />
          <ChartWrapper title="Investment Breakup" height={300}>
            <LumpsumPieChart investedAmount={result.investmentAmount} estimatedReturns={result.estimatedReturns} />
          </ChartWrapper>
        </div>
      </div>

      <ChartWrapper title="Investment Growth" height={400}>
        <InvestmentGrowthChart data={breakdown} />
      </ChartWrapper>

      <div className="mt-8">
        <DataTable
          caption="Yearly Growth Schedule"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function LumpsumCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initA = searchParams.get('a') ? Number(searchParams.get('a')) : 500000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 12;
  const initT = searchParams.get('t') ? Number(searchParams.get('t')) : 10;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance id="main" initialAmount={initA} initialRate={initR} initialTenure={initT} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1</h3>
            <CalculatorInstance id="comp1" initialAmount={initA} initialRate={initR} initialTenure={initT} />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2</h3>
            <CalculatorInstance id="comp2" initialAmount={initA} initialRate={initR + 2} initialTenure={initT} />
          </div>
        </div>
      )}
    </div>
  );
}
