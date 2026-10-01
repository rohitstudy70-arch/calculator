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
  calculateFraction,
  FractionInput,
  FractionOperation,
} from '@/lib/calculators/fraction';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const FractionVisualChart = dynamic(() => import('@/components/charts/FractionVisualChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

function CalculatorInstance({
  id,
  initialOp = 'add',
  initialW1 = 0,
  initialN1 = 1,
  initialD1 = 2,
  initialW2 = 0,
  initialN2 = 2,
  initialD2 = 3,
}: {
  id: string;
  initialOp?: FractionOperation;
  initialW1?: number;
  initialN1?: number;
  initialD1?: number;
  initialW2?: number;
  initialN2?: number;
  initialD2?: number;
}) {
  const [op, setOp] = useState<FractionOperation>(initialOp);
  const [whole1, setWhole1] = useState<number>(initialW1);
  const [num1, setNum1] = useState<number>(initialN1);
  const [den1, setDen1] = useState<number>(initialD1);

  const [whole2, setWhole2] = useState<number>(initialW2);
  const [num2, setNum2] = useState<number>(initialN2);
  const [den2, setDen2] = useState<number>(initialD2);

  const input: FractionInput = useMemo(
    () => ({
      op,
      whole1,
      num1,
      den1: den1 === 0 ? 1 : den1,
      whole2,
      num2,
      den2: den2 === 0 ? 1 : den2,
    }),
    [op, whole1, num1, den1, whole2, num2, den2]
  );

  const result = useMemo(() => calculateFraction(input), [input]);

  const tableHeaders = ['Step', 'Arithmetic Operation / Mathematical Step'];
  const tableData = useMemo(
    () => result.steps.map((step, idx) => [`Step ${idx + 1}`, step]),
    [result]
  );

  const opSymbols: Record<FractionOperation, string> = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
  };

  const fraction1Str = `${whole1 !== 0 ? `${whole1} ` : ''}${num1}/${den1}`;
  const fraction2Str = `${whole2 !== 0 ? `${whole2} ` : ''}${num2}/${den2}`;

  const handlePdfExport = () => {
    exportToPDF(
      'Fraction Arithmetic & Step-by-Step Solution Report',
      [
        { label: 'Equation Solved', value: `${fraction1Str} ${opSymbols[op]} ${fraction2Str}` },
        { label: 'Simplified Fraction', value: result.formattedFraction },
        { label: 'Mixed Number Representation', value: result.formattedMixed },
        { label: 'Decimal Equivalent', value: `${result.decimalValue}` },
        { label: 'Greatest Common Divisor (GCD)', value: `${result.gcdValue}` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Fraction_Calculation_Report');
  };

  const shareUrl = generateShareableLink('/fraction-calculator', {
    op,
    w1: whole1,
    n1: num1,
    d1: den1,
    w2: whole2,
    n2: num2,
    d2: den2,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Operation Selector */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Select Arithmetic Operation
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['add', 'subtract', 'multiply', 'divide'] as FractionOperation[]).map((operation) => (
                <button
                  key={operation}
                  type="button"
                  onClick={() => setOp(operation)}
                  className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${
                    op === operation
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {operation === 'add' && '+ Add'}
                  {operation === 'subtract' && '− Subtract'}
                  {operation === 'multiply' && '× Multiply'}
                  {operation === 'divide' && '÷ Divide'}
                </button>
              ))}
            </div>
          </div>

          {/* Fraction 1 Input */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Fraction 1</h4>
            <div className="grid grid-cols-3 gap-3 items-center">
              <InputGroup
                label="Whole"
                value={whole1}
                onChange={setWhole1}
                min={-100}
                max={100}
                step={1}
              />
              <InputGroup
                label="Numerator"
                value={num1}
                onChange={setNum1}
                min={-1000}
                max={1000}
                step={1}
              />
              <InputGroup
                label="Denominator"
                value={den1}
                onChange={setDen1}
                min={1}
                max={1000}
                step={1}
              />
            </div>
          </div>

          {/* Fraction 2 Input */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Fraction 2</h4>
            <div className="grid grid-cols-3 gap-3 items-center">
              <InputGroup
                label="Whole"
                value={whole2}
                onChange={setWhole2}
                min={-100}
                max={100}
                step={1}
              />
              <InputGroup
                label="Numerator"
                value={num2}
                onChange={setNum2}
                min={-1000}
                max={1000}
                step={1}
              />
              <InputGroup
                label="Denominator"
                value={den2}
                onChange={setDen2}
                min={1}
                max={1000}
                step={1}
              />
            </div>
          </div>

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
            title="Fraction Result Summary"
            items={[
              {
                label: 'Simplified Result',
                value: result.formattedFraction,
                highlight: true,
                color: '#2563EB',
              },
              { label: 'Mixed Number Form', value: result.formattedMixed, highlight: true, color: '#7C3AED' },
              { label: 'Decimal Equivalent', value: `${result.decimalValue}` },
              { label: 'Equation', value: `${fraction1Str} ${opSymbols[op]} ${fraction2Str}` },
            ]}
          />

          <ChartWrapper title="Fraction Representations & Decimal Scale">
            <FractionVisualChart
              formattedFraction={result.formattedFraction}
              formattedMixed={result.formattedMixed}
              decimalValue={result.decimalValue}
              numerator={result.numerator}
              denominator={result.denominator}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Step-by-Step Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Step-by-Step Mathematical Solution Working"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function FractionCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initOp = (searchParams.get('op') as FractionOperation) || 'add';
  const initW1 = searchParams.get('w1') ? Number(searchParams.get('w1')) : 0;
  const initN1 = searchParams.get('n1') ? Number(searchParams.get('n1')) : 1;
  const initD1 = searchParams.get('d1') ? Number(searchParams.get('d1')) : 2;
  const initW2 = searchParams.get('w2') ? Number(searchParams.get('w2')) : 0;
  const initN2 = searchParams.get('n2') ? Number(searchParams.get('n2')) : 2;
  const initD2 = searchParams.get('d2') ? Number(searchParams.get('d2')) : 3;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialOp={initOp}
          initialW1={initW1}
          initialN1={initN1}
          initialD1={initD1}
          initialW2={initW2}
          initialN2={initN2}
          initialD2={initD2}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Expression A</h3>
            <CalculatorInstance
              id="comp1"
              initialOp={initOp}
              initialW1={initW1}
              initialN1={initN1}
              initialD1={initD1}
              initialW2={initW2}
              initialN2={initN2}
              initialD2={initD2}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Expression B</h3>
            <CalculatorInstance
              id="comp2"
              initialOp="multiply"
              initialW1={0}
              initialN1={3}
              initialD1={4}
              initialW2={0}
              initialN2={2}
              initialD2={5}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FractionCalculator;
