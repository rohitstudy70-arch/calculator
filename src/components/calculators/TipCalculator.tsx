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
  calculateTip,
  TipInput,
  RoundingOption,
} from '@/lib/calculators/tip';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const TipPieChart = dynamic(() => import('@/components/charts/TipPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

function CalculatorInstance({
  id,
  initialBill = 2500,
  initialTipPct = 10,
  initialPeople = 4,
  initialRounding = 'none',
}: {
  id: string;
  initialBill?: number;
  initialTipPct?: number;
  initialPeople?: number;
  initialRounding?: RoundingOption;
}) {
  const [billAmount, setBillAmount] = useState<number>(initialBill);
  const [tipPercentage, setTipPercentage] = useState<number>(initialTipPct);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(initialPeople);
  const [rounding, setRounding] = useState<RoundingOption>(initialRounding);

  const input: TipInput = useMemo(
    () => ({
      billAmount,
      tipPercentage,
      numberOfPeople,
      rounding,
    }),
    [billAmount, tipPercentage, numberOfPeople, rounding]
  );

  const result = useMemo(() => calculateTip(input), [input]);

  const tableHeaders = ['Payment Component', 'Total Amount (₹)', 'Per Person Share (₹)'];
  const tableData = useMemo(
    () => [
      ['Base Food & Beverage Bill', `₹${result.billAmount.toLocaleString('en-IN')}`, `₹${(result.billAmount / result.numberOfPeople).toFixed(2)}`],
      ['Tip / Gratuity', `₹${result.tipAmount.toLocaleString('en-IN')}`, `₹${result.tipPerPerson.toFixed(2)}`],
      ['Total Payable Amount', `₹${result.totalAmount.toLocaleString('en-IN')}`, `₹${result.totalPerPerson.toFixed(2)}`],
    ],
    [result]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Restaurant Bill Splitting & Tip Calculation Report',
      [
        { label: 'Food & Beverage Subtotal', value: `₹${result.billAmount.toLocaleString('en-IN')}` },
        { label: 'Tip Percentage', value: `${result.tipPercentage}%` },
        { label: 'Total Tip Amount', value: `₹${result.tipAmount.toLocaleString('en-IN')}` },
        { label: 'Total Payable Bill', value: `₹${result.totalAmount.toLocaleString('en-IN')}` },
        { label: 'Number of Diners', value: `${result.numberOfPeople} people` },
        { label: 'Each Person Pays', value: `₹${result.totalPerPerson.toLocaleString('en-IN')}` },
        { label: 'Each Person Tip Share', value: `₹${result.tipPerPerson.toLocaleString('en-IN')}` },
        { label: 'Rounding Applied', value: rounding.replace(/_/g, ' ').toUpperCase() },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Bill_Tip_Split_Report');
  };

  const shareUrl = generateShareableLink('/tip-calculator', {
    b: billAmount,
    t: tipPercentage,
    p: numberOfPeople,
    r: rounding,
  });

  const tipPresets = [0, 5, 10, 12, 15, 18, 20];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Total Bill Amount"
            value={billAmount}
            onChange={setBillAmount}
            min={10}
            max={500000}
            step={50}
            prefix="₹"
          />

          {/* Tip Presets & Custom Slider */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tip Percentage ({tipPercentage}%)
            </label>
            <div className="flex flex-wrap gap-2">
              {tipPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTipPercentage(preset)}
                  className={`py-1.5 px-3 text-xs font-bold rounded-lg border transition-all ${
                    tipPercentage === preset
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <InputGroup
              label="Custom Tip Rate"
              value={tipPercentage}
              onChange={setTipPercentage}
              min={0}
              max={50}
              step={1}
              suffix="%"
            />
          </div>

          <InputGroup
            label="Number of People (Split Bill)"
            value={numberOfPeople}
            onChange={setNumberOfPeople}
            min={1}
            max={50}
            step={1}
            suffix=" people"
          />

          {/* Rounding Options */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Smart Rounding (UPI Friendly)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRounding('none')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  rounding === 'none'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                }`}
              >
                Exact (No Rounding)
              </button>
              <button
                type="button"
                onClick={() => setRounding('round_per_person')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  rounding === 'round_per_person'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                }`}
              >
                Round Per Person Up
              </button>
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
            title="Bill Splitting Summary"
            items={[
              {
                label: 'Total Per Person',
                value: `₹${result.totalPerPerson.toLocaleString('en-IN')}`,
                highlight: true,
                color: '#2563EB',
              },
              {
                label: 'Total Payable Amount',
                value: `₹${result.totalAmount.toLocaleString('en-IN')}`,
                highlight: true,
                color: '#16A34A',
              },
              { label: 'Total Tip Amount', value: `₹${result.tipAmount.toLocaleString('en-IN')}` },
              { label: 'Tip Per Person', value: `₹${result.tipPerPerson.toLocaleString('en-IN')}` },
              { label: 'Split Count', value: `${result.numberOfPeople} Diners` },
              { label: 'Effective Tip Rate', value: `${result.effectiveTipPercentage}%` },
            ]}
          />

          <ChartWrapper title="Bill vs Tip Proportion">
            <TipPieChart
              billAmount={result.billAmount}
              tipAmount={result.tipAmount}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Group Expense & Tip Breakdown"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function TipCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initBill = searchParams.get('b') ? Number(searchParams.get('b')) : 2500;
  const initTip = searchParams.get('t') ? Number(searchParams.get('t')) : 10;
  const initP = searchParams.get('p') ? Number(searchParams.get('p')) : 4;
  const initR = (searchParams.get('r') as RoundingOption) || 'none';

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialBill={initBill}
          initialTipPct={initTip}
          initialPeople={initP}
          initialRounding={initR}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Option 1 (10% Tip)</h3>
            <CalculatorInstance
              id="comp1"
              initialBill={initBill}
              initialTipPct={10}
              initialPeople={initP}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Option 2 (15% Tip)</h3>
            <CalculatorInstance
              id="comp2"
              initialBill={initBill}
              initialTipPct={15}
              initialPeople={initP}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TipCalculator;
