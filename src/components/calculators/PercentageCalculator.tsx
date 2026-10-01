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
  calculatePercentage,
  PercentageInput,
  PercentageMode,
} from '@/lib/calculators/percentage';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const PercentageVisualChart = dynamic(() => import('@/components/charts/PercentageVisualChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

function CalculatorInstance({
  id,
  initialMode = 'percent_of',
  initialVal1 = 18,
  initialVal2 = 5000,
  initialChangeType = 'increase',
}: {
  id: string;
  initialMode?: PercentageMode;
  initialVal1?: number;
  initialVal2?: number;
  initialChangeType?: 'increase' | 'decrease';
}) {
  const [mode, setMode] = useState<PercentageMode>(initialMode);
  const [val1, setVal1] = useState<number>(initialVal1);
  const [val2, setVal2] = useState<number>(initialVal2);
  const [changeType, setChangeType] = useState<'increase' | 'decrease'>(initialChangeType);

  const input: PercentageInput = useMemo(
    () => ({
      mode,
      val1,
      val2,
      changeType,
    }),
    [mode, val1, val2, changeType]
  );

  const result = useMemo(() => calculatePercentage(input), [input]);

  const tableHeaders = ['Step Number', 'Calculation Description / Arithmetic Operation'];
  const tableData = useMemo(
    () => result.steps.map((step, idx) => [`Step ${idx + 1}`, step]),
    [result]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Percentage Calculation & Formula Working Report',
      [
        { label: 'Calculation Mode', value: mode.replace(/_/g, ' ').toUpperCase() },
        { label: 'Input Value X', value: `${val1}` },
        { label: 'Input Value Y', value: `${val2}` },
        { label: 'Result Summary', value: result.formattedResult },
        { label: 'Mathematical Formula', value: result.formulaUsed },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Percentage_Calculation_Report');
  };

  const shareUrl = generateShareableLink('/percentage-calculator', {
    m: mode,
    v1: val1,
    v2: val2,
    ct: changeType,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Mode Selector */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Select Percentage Calculation Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('percent_of')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  mode === 'percent_of'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                What is X% of Y?
              </button>
              <button
                type="button"
                onClick={() => setMode('is_what_percent')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  mode === 'is_what_percent'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                X is what % of Y?
              </button>
              <button
                type="button"
                onClick={() => setMode('percent_change')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  mode === 'percent_change'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                % Change (X to Y)
              </button>
              <button
                type="button"
                onClick={() => setMode('increase_decrease')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  mode === 'increase_decrease'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Increase / Decrease X by Y%
              </button>
            </div>
          </div>

          {/* Dynamic Inputs based on mode */}
          {mode === 'percent_of' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup
                label="Percentage (X)"
                value={val1}
                onChange={setVal1}
                min={0}
                max={1000}
                step={0.5}
                suffix="%"
              />
              <InputGroup
                label="Base Value (Y)"
                value={val2}
                onChange={setVal2}
                min={0}
                max={10000000}
                step={10}
              />
            </div>
          )}

          {mode === 'is_what_percent' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup
                label="Numerator / Part (X)"
                value={val1}
                onChange={setVal1}
                min={0}
                max={10000000}
                step={1}
              />
              <InputGroup
                label="Denominator / Whole (Y)"
                value={val2}
                onChange={setVal2}
                min={1}
                max={10000000}
                step={1}
              />
            </div>
          )}

          {mode === 'percent_change' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup
                label="Initial Value (From X)"
                value={val1}
                onChange={setVal1}
                min={1}
                max={10000000}
                step={1}
              />
              <InputGroup
                label="Final Value (To Y)"
                value={val2}
                onChange={setVal2}
                min={0}
                max={10000000}
                step={1}
              />
            </div>
          )}

          {mode === 'increase_decrease' && (
            <div className="flex flex-col gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name={`changeType-${id}`}
                    value="increase"
                    checked={changeType === 'increase'}
                    onChange={() => setChangeType('increase')}
                    className="text-blue-600"
                  />
                  Increase (+)
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name={`changeType-${id}`}
                    value="decrease"
                    checked={changeType === 'decrease'}
                    onChange={() => setChangeType('decrease')}
                    className="text-blue-600"
                  />
                  Decrease / Discount (-)
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputGroup
                  label="Initial Amount (X)"
                  value={val1}
                  onChange={setVal1}
                  min={0}
                  max={10000000}
                  step={10}
                />
                <InputGroup
                  label="Percentage Rate (Y)"
                  value={val2}
                  onChange={setVal2}
                  min={0}
                  max={500}
                  step={0.5}
                  suffix="%"
                />
              </div>
            </div>
          )}

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
            title="Percentage Calculation Result"
            items={[
              {
                label: 'Result Value',
                value: `${result.resultValue}`,
                highlight: true,
                color: result.resultValue >= 0 ? '#2563EB' : '#DC2626',
              },
              { label: 'Equation Summary', value: result.formattedResult },
              { label: 'Formula Applied', value: result.formulaUsed },
              ...(result.secondaryInfo ? [{ label: 'Absolute Difference', value: result.secondaryInfo }] : []),
            ]}
          />

          <ChartWrapper title="Proportional Representation">
            <PercentageVisualChart
              mode={mode}
              resultValue={result.resultValue}
              val1={val1}
              val2={val2}
              changeType={changeType}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Step-by-Step Mathematical Working"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function PercentageCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initM = (searchParams.get('m') as PercentageMode) || 'percent_of';
  const initV1 = searchParams.get('v1') ? Number(searchParams.get('v1')) : 18;
  const initV2 = searchParams.get('v2') ? Number(searchParams.get('v2')) : 5000;
  const initCt = (searchParams.get('ct') as 'increase' | 'decrease') || 'increase';

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
          initialVal1={initV1}
          initialVal2={initV2}
          initialChangeType={initCt}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario A</h3>
            <CalculatorInstance
              id="comp1"
              initialMode={initM}
              initialVal1={initV1}
              initialVal2={initV2}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario B</h3>
            <CalculatorInstance
              id="comp2"
              initialMode={initM}
              initialVal1={initV1 * 1.5}
              initialVal2={initV2}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PercentageCalculator;
