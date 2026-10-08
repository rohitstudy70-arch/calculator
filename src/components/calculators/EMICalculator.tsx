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
  calculateEMI, 
  generateAmortizationSchedule, 
  generateYearlySummary,
  validateEMIInput
} from '@/lib/calculators/emi';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

// Lazy-load chart components to reduce initial bundle size
const EMIPieChart = dynamic(() => import('@/components/charts/EMIPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

const EMIBarChart = dynamic(() => import('@/components/charts/EMIBarChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[400px] w-full" />,
});

function CalculatorInstance({ 
  id, 
  initialPrincipal = 2500000, 
  initialRate = 8.5, 
  initialTenureMonths = 240,
}: { 
  id: string;
  initialPrincipal?: number;
  initialRate?: number;
  initialTenureMonths?: number;
}) {
  const [principal, setPrincipal] = useState(initialPrincipal);
  const [annualRate, setAnnualRate] = useState(initialRate);
  const [tenure, setTenure] = useState(initialTenureMonths);
  const [isYears, setIsYears] = useState(true);

  const displayTenure = isYears ? tenure / 12 : tenure;
  
  const handleTenureChange = (val: number) => {
    setTenure(isYears ? val * 12 : val);
  };

  const input = useMemo(() => ({ principal, annualRate, tenureMonths: tenure }), [principal, annualRate, tenure]);

  const result = useMemo(() => calculateEMI(input), [input]);
  const yearlySummary = useMemo(() => generateYearlySummary(input), [input]);
  const schedule = useMemo(() => generateAmortizationSchedule(input), [input]);

  const barData = useMemo(() => yearlySummary.map(y => ({
    name: `Year ${y.year}`,
    Principal: y.principalPaid,
    Interest: y.interestPaid,
  })), [yearlySummary]);

  const tableHeaders = ['Year', 'Principal Paid', 'Interest Paid', 'Total Payment', 'Balance'];
  const tableData = useMemo(() => yearlySummary.map(y => [
    y.year,
    formatINR(y.principalPaid),
    formatINR(y.interestPaid),
    formatINR(y.totalPaid),
    formatINR(y.balance),
  ]), [yearlySummary]);

  const scheduleHeaders = ['Month', 'EMI', 'Principal', 'Interest', 'Balance'];
  const scheduleData = useMemo(() => schedule.map(s => [
    s.month,
    formatINR(s.emi),
    formatINR(s.principal),
    formatINR(s.interest),
    formatINR(s.balance),
  ]), [schedule]);

  const handlePdfExport = () => {
    exportToPDF(
      'EMI Calculator Report',
      [
        { label: 'Loan Amount', value: formatINR(principal) },
        { label: 'Interest Rate', value: `${annualRate}%` },
        { label: 'Tenure', value: `${tenure} months` },
        { label: 'Monthly EMI', value: formatINR(result.emi) },
        { label: 'Total Interest', value: formatINR(result.totalInterest) },
        { label: 'Total Payment', value: formatINR(result.totalPayment) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(scheduleHeaders, scheduleData, 'EMI_Schedule');
  };

  const shareUrl = generateShareableLink('/emi-calculator', {
    p: principal,
    r: annualRate,
    t: tenure,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Loan Amount"
            value={principal}
            onChange={setPrincipal}
            min={100000}
            max={100000000}
            step={100000}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Interest Rate (p.a)"
            value={annualRate}
            onChange={setAnnualRate}
            min={1}
            max={30}
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
              label="Loan Tenure"
              value={displayTenure}
              onChange={handleTenureChange}
              min={isYears ? 1 : 12}
              max={isYears ? 30 : 360}
              step={1}
              suffix={isYears ? ' Yr' : ' Mo'}
            />
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
              { label: 'Monthly EMI', value: formatINR(result.emi), highlight: true },
              { label: 'Yearly Payment (Annual)', value: formatINR(result.emi * 12) },
              { label: 'Principal Amount', value: formatINR(principal) },
              { label: 'Total Interest', value: formatINR(result.totalInterest) },
              { label: 'Total Payment', value: formatINR(result.totalPayment) },
            ]}
          />
          
          <ChartWrapper title="Payment Breakup" height={300}>
            <EMIPieChart principal={principal} totalInterest={result.totalInterest} />
          </ChartWrapper>
        </div>
      </div>

      {/* Yearly bar chart */}
      <ChartWrapper title="Yearly Payment Breakdown" height={400}>
        <EMIBarChart data={barData} />
      </ChartWrapper>

      {/* Amortization table */}
      <div className="mt-8">
        <DataTable
          caption="Yearly Amortization Schedule"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function EMICalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initP = searchParams.get('p') ? Number(searchParams.get('p')) : 2500000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 8.5;
  const initT = searchParams.get('t') ? Number(searchParams.get('t')) : 240;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance id="main" initialPrincipal={initP} initialRate={initR} initialTenureMonths={initT} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1</h3>
            <CalculatorInstance id="comp1" initialPrincipal={initP} initialRate={initR} initialTenureMonths={initT} />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2</h3>
            <CalculatorInstance id="comp2" initialPrincipal={initP} initialRate={initR + 1} initialTenureMonths={initT} />
          </div>
        </div>
      )}
    </div>
  );
}
