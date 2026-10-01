'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { InputGroup } from '@/components/ui/InputGroup';
import { ResultCard } from '@/components/ui/ResultCard';
import { ShareActions } from '@/components/ui/ShareActions';
import { CompareToggle } from '@/components/ui/CompareToggle';
import { ChartWrapper } from '@/components/ui/ChartWrapper';
import { DisclaimerNote } from '@/components/ui/DisclaimerNote';
import { calculateGratuity, GratuityInput } from '@/lib/calculators/gratuity';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const GratuityBarChart = dynamic(() => import('@/components/charts/GratuityBarChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialSalary = 60000,
  initialYears = 7.5,
  initialCovered = true,
}: {
  id: string;
  initialSalary?: number;
  initialYears?: number;
  initialCovered?: boolean;
}) {
  const [salary, setSalary] = useState(initialSalary);
  const [years, setYears] = useState(initialYears);
  const [isCovered, setIsCovered] = useState(initialCovered);

  const input: GratuityInput = useMemo(
    () => ({
      monthlyBasicSalary: salary,
      yearsOfService: years,
      isCoveredUnderAct: isCovered,
    }),
    [salary, years, isCovered]
  );

  const result = useMemo(() => calculateGratuity(input), [input]);

  const summaryRows = [
    { label: 'Last Drawn Basic + DA', value: formatINR(salary) },
    { label: 'Completed Service Tenure', value: `${years} Years (Counted as ${result.effectiveTenureYears} Years)` },
    { label: 'Establishment Category', value: isCovered ? 'Covered under Gratuity Act 1972 (26-day rule)' : 'Not Covered (30-day rule)' },
    { label: 'Calculation Formula', value: result.formulaUsed },
    { label: 'Total Calculated Gratuity', value: formatINR(result.totalGratuity) },
    { label: 'Tax-Exempt Gratuity (Section 10(10))', value: formatINR(result.taxExemptGratuity) },
    { label: 'Taxable Gratuity Surplus', value: formatINR(result.taxableGratuity) },
  ];

  const handlePdfExport = () => {
    exportToPDF(
      'Statutory Gratuity Benefit Calculation Report',
      [
        { label: 'Last Drawn Salary (Basic + DA)', value: formatINR(salary) },
        { label: 'Service Tenure', value: `${years} years` },
        { label: 'Gratuity Act Applicable', value: isCovered ? 'Yes (Covered)' : 'No (Not Covered)' },
        { label: 'Total Gratuity Payable', value: formatINR(result.totalGratuity) },
        { label: 'Tax-Exempt Gratuity', value: formatINR(result.taxExemptGratuity) },
        { label: 'Taxable Gratuity Surplus', value: formatINR(result.taxableGratuity) },
        { label: 'Statutory Max Exemption Limit', value: formatINR(result.statutoryLimit) },
      ],
      ['Gratuity Parameter', 'Details'],
      summaryRows.map((r) => [r.label, r.value])
    );
  };

  const handleExcelExport = () => {
    exportToExcel(
      ['Gratuity Parameter', 'Details'],
      summaryRows.map((r) => [r.label, r.value]),
      'Gratuity_Calculation'
    );
  };

  const shareUrl = generateShareableLink('/gratuity-calculator', {
    s: salary,
    y: years,
    c: isCovered ? 1 : 0,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Last Drawn Monthly Salary (Basic + DA)"
            value={salary}
            onChange={setSalary}
            min={10000}
            max={500000}
            step={1000}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Total Years of Continuous Service"
            value={years}
            onChange={setYears}
            min={1}
            max={45}
            step={0.5}
            suffix=" Yrs"
          />

          {/* Gratuity Act Covered Toggle */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gratuity Act Applicability</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                  isCovered
                    ? 'bg-blue-50 border-blue-600 text-blue-800 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsCovered(true)}
              >
                Covered under Act (1972)
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">Most private firms (10+ staff)</span>
              </button>
              <button
                type="button"
                className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                  !isCovered
                    ? 'bg-blue-50 border-blue-600 text-blue-800 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsCovered(false)}
              >
                Not Covered under Act
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">Special/Non-qualifying firms</span>
              </button>
            </div>
          </div>

          <DisclaimerNote sourceNote="Statutory tax-free gratuity limit is ₹20,00,000 under Section 10(10). Minimum 5 years service required." />

          <div className="flex justify-end mt-2">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Summary & Bar Chart */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            title="Gratuity Calculation Summary"
            items={[
              { label: 'Total Gratuity Amount', value: formatINR(result.totalGratuity), highlight: true, color: '#1E40AF' },
              { label: 'Tax-Exempt Portion', value: formatINR(result.taxExemptGratuity), highlight: true, color: '#059669' },
              { label: 'Taxable Gratuity Surplus', value: formatINR(result.taxableGratuity), color: result.taxableGratuity > 0 ? '#EF4444' : undefined },
              { label: 'Effective Service Count', value: `${result.effectiveTenureYears} Years` },
            ]}
          />

          {!result.isEligibleForGratuity && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200">
              <span className="font-bold">⚠️ Note on 5-Year Rule:</span> Gratuity is typically payable only after completing 5 continuous years of service (waived only in cases of employee death or permanent disability).
            </div>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-blue-900 dark:text-blue-200">
            <span className="font-bold block mb-1">Applied Formula:</span>
            <code>{result.formulaUsed}</code>
          </div>

          <ChartWrapper title="Taxability Breakdown" height={260}>
            <GratuityBarChart taxExemptGratuity={result.taxExemptGratuity} taxableGratuity={result.taxableGratuity} />
          </ChartWrapper>
        </div>
      </div>
    </div>
  );
}

export function GratuityCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initS = searchParams.get('s') ? Number(searchParams.get('s')) : 60000;
  const initY = searchParams.get('y') ? Number(searchParams.get('y')) : 7.5;
  const initC = searchParams.get('c') !== '0';

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialSalary={initS}
          initialYears={initY}
          initialCovered={initC}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (Current Tenure)</h3>
            <CalculatorInstance
              id="comp1"
              initialSalary={initS}
              initialYears={initY}
              initialCovered={initC}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (Longer Tenure / Increment)</h3>
            <CalculatorInstance
              id="comp2"
              initialSalary={initS + 20000}
              initialYears={initY + 5}
              initialCovered={initC}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GratuityCalculator;
