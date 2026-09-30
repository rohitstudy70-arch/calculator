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
  calculateFD, 
  generateFDYearlyBreakdown,
  CompoundingFrequency
} from '@/lib/calculators/fd';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

// Lazy-load chart components
const FDPieChart = dynamic(() => import('@/components/charts/FDPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

const FDBarChart = dynamic(() => import('@/components/charts/FDBarChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[400px] w-full" />,
});

function CalculatorInstance({ 
  id, 
  initialPrincipal = 100000, 
  initialRate = 7, 
  initialTenureMonths = 60,
  initialCompounding = 'quarterly'
}: { 
  id: string;
  initialPrincipal?: number;
  initialRate?: number;
  initialTenureMonths?: number;
  initialCompounding?: CompoundingFrequency;
}) {
  const [principal, setPrincipal] = useState(initialPrincipal);
  const [annualRate, setAnnualRate] = useState(initialRate);
  const [tenure, setTenure] = useState(initialTenureMonths);
  const [compounding, setCompounding] = useState<CompoundingFrequency>(initialCompounding);
  const [isYears, setIsYears] = useState(true);

  const displayTenure = isYears ? tenure / 12 : tenure;
  
  const handleTenureChange = (val: number) => {
    setTenure(isYears ? val * 12 : val);
  };

  const input = useMemo(() => ({ principal, annualRate, tenureMonths: tenure, compounding }), [principal, annualRate, tenure, compounding]);

  const result = useMemo(() => calculateFD(input), [input]);
  const yearlySummary = useMemo(() => generateFDYearlyBreakdown(input), [input]);

  const barData = useMemo(() => yearlySummary.map(y => ({
    name: `Year ${y.year}`,
    Balance: y.closingBalance,
    Interest: y.interestEarned,
  })), [yearlySummary]);

  const tableHeaders = ['Year', 'Opening Balance', 'Interest Earned', 'Closing Balance'];
  const tableData = useMemo(() => yearlySummary.map(y => [
    y.year,
    formatINR(y.openingBalance),
    formatINR(y.interestEarned),
    formatINR(y.closingBalance),
  ]), [yearlySummary]);

  const handlePdfExport = () => {
    exportToPDF(
      'FD Calculator Report',
      [
        { label: 'Deposit Amount', value: formatINR(principal) },
        { label: 'Interest Rate', value: `${annualRate}%` },
        { label: 'Tenure', value: `${tenure} months` },
        { label: 'Compounding', value: compounding },
        { label: 'Maturity Amount', value: formatINR(result.maturityAmount) },
        { label: 'Total Interest', value: formatINR(result.totalInterest) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'FD_Schedule');
  };

  const shareUrl = generateShareableLink('/fd-calculator', {
    p: principal,
    r: annualRate,
    t: tenure,
    c: compounding,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Deposit Amount"
            value={principal}
            onChange={setPrincipal}
            min={1000}
            max={100000000}
            step={10000}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Interest Rate (p.a)"
            value={annualRate}
            onChange={setAnnualRate}
            min={1}
            max={15}
            step={0.1}
            suffix="%"
          />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tenure in</span>
              <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${isYears ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
                  onClick={() => setIsYears(true)}
                >
                  Years
                </button>
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${!isYears ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
                  onClick={() => setIsYears(false)}
                >
                  Months
                </button>
              </div>
            </div>
            <InputGroup
              label="FD Tenure"
              value={displayTenure}
              onChange={handleTenureChange}
              min={isYears ? 1 : 1}
              max={isYears ? 30 : 360}
              step={1}
              suffix={isYears ? ' Yr' : ' Mo'}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-4">Compounding Frequency</span>
            <select
              value={compounding}
              onChange={(e) => setCompounding(e.target.value as CompoundingFrequency)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="half-yearly">Half-Yearly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          
          <div className="flex justify-end mt-2">
             <ShareActions 
               shareUrl={shareUrl}
               onDownloadPDF={handlePdfExport}
               onDownloadExcel={handleExcelExport}
             />
          </div>
        </div>

        {/* Results + Pie chart */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            items={[
              { label: 'Maturity Amount', value: formatINR(result.maturityAmount), highlight: true },
              { label: 'Principal Amount', value: formatINR(principal) },
              { label: 'Total Interest', value: formatINR(result.totalInterest) },
            ]}
          />
          
          <ChartWrapper title="Investment Breakup" height={300}>
            <FDPieChart principal={principal} totalInterest={result.totalInterest} />
          </ChartWrapper>
        </div>
      </div>

      {/* Yearly bar chart */}
      <ChartWrapper title="Balance Growth" height={400}>
        <FDBarChart data={barData} />
      </ChartWrapper>

      {/* Schedule table */}
      <div className="mt-8">
        <DataTable
          caption="Yearly Breakdown"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function FDCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initP = searchParams.get('p') ? Number(searchParams.get('p')) : 100000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 7;
  const initT = searchParams.get('t') ? Number(searchParams.get('t')) : 60;
  const initC = searchParams.get('c') as CompoundingFrequency || 'quarterly';

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance id="main" initialPrincipal={initP} initialRate={initR} initialTenureMonths={initT} initialCompounding={initC} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1</h3>
            <CalculatorInstance id="comp1" initialPrincipal={initP} initialRate={initR} initialTenureMonths={initT} initialCompounding={initC} />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2</h3>
            <CalculatorInstance id="comp2" initialPrincipal={initP} initialRate={initR + 1} initialTenureMonths={initT} initialCompounding={initC} />
          </div>
        </div>
      )}
    </div>
  );
}
