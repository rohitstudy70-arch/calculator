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
  calculateInflation,
  generateInflationYearlyBreakdown,
  InflationInput,
} from '@/lib/calculators/inflation';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const InflationChart = dynamic(() => import('@/components/charts/InflationChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialAmount = 100000,
  initialRate = 6.0,
  initialYears = 15,
}: {
  id: string;
  initialAmount?: number;
  initialRate?: number;
  initialYears?: number;
}) {
  const [currentAmount, setCurrentAmount] = useState(initialAmount);
  const [inflationRate, setInflationRate] = useState(initialRate);
  const [timePeriodYears, setTimePeriodYears] = useState(initialYears);

  const input: InflationInput = useMemo(
    () => ({
      currentAmount,
      inflationRate,
      timePeriodYears,
    }),
    [currentAmount, inflationRate, timePeriodYears]
  );

  const result = useMemo(() => calculateInflation(input), [input]);
  const breakdown = useMemo(() => generateInflationYearlyBreakdown(input), [input]);

  const tableHeaders = ['Year', 'Future Equivalent Cost', 'Purchasing Power of Initial Amount', 'Cumulative Inflation'];
  const tableData = useMemo(
    () =>
      breakdown.map((row) => [
        `Year ${row.year}`,
        formatINR(row.futureEquivalentCost),
        formatINR(row.purchasingPowerOfFixedAmount),
        `+${row.cumulativeInflationPercent}%`,
      ]),
    [breakdown]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Inflation & Purchasing Power Impact Report',
      [
        { label: 'Current Base Amount', value: formatINR(currentAmount) },
        { label: 'Expected Annual Inflation', value: `${inflationRate}%` },
        { label: 'Time Horizon', value: `${timePeriodYears} Years` },
        { label: 'Future Required Amount', value: formatINR(result.futureCost) },
        { label: 'Future Value of Cash Today', value: formatINR(result.futurePurchasingPower) },
        { label: 'Total Price Multiplier', value: `${result.multiplierFactor}x (+${result.costIncreasePercentage}%)` },
        { label: 'Purchasing Power Loss', value: `-${result.purchasingPowerLossPercentage}%` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Inflation_Purchasing_Power_Schedule');
  };

  const shareUrl = generateShareableLink('/inflation-calculator', {
    a: currentAmount,
    r: inflationRate,
    y: timePeriodYears,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Current Expense / Asset Amount"
            value={currentAmount}
            onChange={setCurrentAmount}
            min={1000}
            max={50000000}
            step={5000}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          <InputGroup
            label="Expected Annual Inflation Rate (% p.a.)"
            value={inflationRate}
            onChange={setInflationRate}
            min={1.0}
            max={20.0}
            step={0.1}
            suffix="%"
          />

          <InputGroup
            label="Time Horizon (Years)"
            value={timePeriodYears}
            onChange={setTimePeriodYears}
            min={1}
            max={40}
            step={1}
            suffix=" Yrs"
          />

          <DisclaimerNote sourceNote="India long-term average CPI is ~5-7%; specialized healthcare & education inflation averages ~8-10%." />

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
            title="Inflation Impact Summary"
            items={[
              { label: 'Future Equivalent Cost', value: formatINR(result.futureCost), highlight: true, color: '#D97706' },
              { label: 'Purchasing Power Left', value: formatINR(result.futurePurchasingPower), highlight: true, color: '#DC2626' },
              { label: 'Price Multiplier', value: `${result.multiplierFactor}x (+${result.costIncreasePercentage}%)` },
              { label: 'Purchasing Power Erosion', value: `-${result.purchasingPowerLossPercentage}%` },
            ]}
          />

          <ChartWrapper title="Future Cost vs Real Purchasing Power Degradation">
            <InflationChart data={breakdown} />
          </ChartWrapper>
        </div>
      </div>

      {/* Yearly Table */}
      <div className="w-full">
        <DataTable
          caption="Year-by-Year Price Escalation & Purchasing Power Loss"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function InflationCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initA = searchParams.get('a') ? Number(searchParams.get('a')) : 100000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 6.0;
  const initY = searchParams.get('y') ? Number(searchParams.get('y')) : 15;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialAmount={initA}
          initialRate={initR}
          initialYears={initY}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (CPI 6% Inflation)</h3>
            <CalculatorInstance
              id="comp1"
              initialAmount={initA}
              initialRate={initR}
              initialYears={initY}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (Higher 9% Inflation)</h3>
            <CalculatorInstance
              id="comp2"
              initialAmount={initA}
              initialRate={initR + 3.0}
              initialYears={initY}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default InflationCalculator;
