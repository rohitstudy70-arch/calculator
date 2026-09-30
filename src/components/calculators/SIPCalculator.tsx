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
  calculateSIP, 
  generateSIPYearlyBreakdown
} from '@/lib/calculators/sip';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const SIPPieChart = dynamic(() => import('@/components/charts/SIPPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

const InvestmentGrowthChart = dynamic(() => import('@/components/charts/InvestmentGrowthChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[400px] w-full" />,
});

function CalculatorInstance({ 
  id, 
  initialMonthly = 10000, 
  initialRate = 12, 
  initialTenure = 10,
}: { 
  id: string;
  initialMonthly?: number;
  initialRate?: number;
  initialTenure?: number;
}) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(initialMonthly);
  const [expectedReturnRate, setExpectedReturnRate] = useState(initialRate);
  const [tenureYears, setTenureYears] = useState(initialTenure);

  const input = useMemo(() => ({ 
    monthlyInvestment, 
    expectedReturnRate, 
    timePeriodMonths: tenureYears * 12 
  }), [monthlyInvestment, expectedReturnRate, tenureYears]);

  const result = useMemo(() => calculateSIP(input), [input]);
  const breakdown = useMemo(() => generateSIPYearlyBreakdown(input), [input]);

  const tableHeaders = ['Year', 'Invested Amount', 'Estimated Returns', 'Total Value'];
  const tableData = useMemo(() => breakdown.map(y => [
    y.year,
    formatINR(y.investedAmount),
    formatINR(y.estimatedReturns),
    formatINR(y.totalValue),
  ]), [breakdown]);

  const handlePdfExport = () => {
    exportToPDF(
      'SIP Calculator Report',
      [
        { label: 'Monthly Investment', value: formatINR(monthlyInvestment) },
        { label: 'Expected Return', value: `${expectedReturnRate}%` },
        { label: 'Time Period', value: `${tenureYears} Years` },
        { label: 'Total Invested', value: formatINR(result.totalInvestment) },
        { label: 'Estimated Returns', value: formatINR(result.estimatedReturns) },
        { label: 'Total Value', value: formatINR(result.totalValue) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'SIP_Schedule');
  };

  const shareUrl = generateShareableLink('/sip-calculator', {
    m: monthlyInvestment,
    r: expectedReturnRate,
    t: tenureYears,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Monthly Investment"
            value={monthlyInvestment}
            onChange={setMonthlyInvestment}
            min={500}
            max={1000000}
            step={500}
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
            max={40}
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
              { label: 'Invested Amount', value: formatINR(result.totalInvestment) },
              { label: 'Est. Returns', value: formatINR(result.estimatedReturns) },
              { label: 'Total Value', value: formatINR(result.totalValue), highlight: true },
            ]}
          />
          <ChartWrapper title="Investment Breakup" height={300}>
            <SIPPieChart investedAmount={result.totalInvestment} estimatedReturns={result.estimatedReturns} />
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

export function SIPCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initM = searchParams.get('m') ? Number(searchParams.get('m')) : 10000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 12;
  const initT = searchParams.get('t') ? Number(searchParams.get('t')) : 10;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance id="main" initialMonthly={initM} initialRate={initR} initialTenure={initT} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1</h3>
            <CalculatorInstance id="comp1" initialMonthly={initM} initialRate={initR} initialTenure={initT} />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2</h3>
            <CalculatorInstance id="comp2" initialMonthly={initM} initialRate={initR + 2} initialTenure={initT} />
          </div>
        </div>
      )}
    </div>
  );
}
