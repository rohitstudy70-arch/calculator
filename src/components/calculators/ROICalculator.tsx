'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { CompareToggle } from '@/components/ui/CompareToggle';
import {
  calculateROI,
  ROIInput,
  generateROIYearlyProgression,
} from '@/lib/calculators/roi';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

function CalculatorInstance({
  id,
  initialInvested = 100000,
  initialReturned = 150000,
  initialYears = 3,
  initialMonths = 0,
}: {
  id: string;
  initialInvested?: number;
  initialReturned?: number;
  initialYears?: number;
  initialMonths?: number;
}) {
  const [amountInvested, setAmountInvested] = useState<number>(initialInvested);
  const [amountReturned, setAmountReturned] = useState<number>(initialReturned);
  const [investmentPeriodYears, setInvestmentPeriodYears] = useState<number>(initialYears);
  const [investmentPeriodMonths, setInvestmentPeriodMonths] = useState<number>(initialMonths);

  const input: ROIInput = useMemo(
    () => ({
      amountInvested,
      amountReturned,
      investmentPeriodYears,
      investmentPeriodMonths,
    }),
    [amountInvested, amountReturned, investmentPeriodYears, investmentPeriodMonths]
  );

  const result = useMemo(() => calculateROI(input), [input]);
  const progression = useMemo(() => generateROIYearlyProgression(input), [input]);

  const presets = [
    { label: '50% Gain (3 Yrs)', inv: 100000, ret: 150000, y: 3, m: 0 },
    { label: '2x Return (5 Yrs)', inv: 100000, ret: 200000, y: 5, m: 0 },
    { label: '10% Short-term (1 Yr)', inv: 500000, ret: 550000, y: 1, m: 0 },
    { label: '20% Loss (2 Yrs)', inv: 200000, ret: 160000, y: 2, m: 0 },
  ];

  const tableHeaders = ['Year', 'Compounded Value', 'Cumulative ROI (%)'];
  const tableData = useMemo(
    () =>
      progression.map((item) => [
        `Year ${item.year}`,
        formatCurrency(item.estimatedValue),
        `${item.cumulativeReturnPercent >= 0 ? '+' : ''}${item.cumulativeReturnPercent.toFixed(2)}%`,
      ]),
    [progression]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Return on Investment (ROI) Assessment Report',
      [
        { label: 'Amount Invested', value: formatCurrency(result.amountInvested) },
        { label: 'Amount Returned', value: formatCurrency(result.amountReturned) },
        { label: 'Net Profit / Loss', value: `${result.isProfit ? '+' : ''}${formatCurrency(result.netProfit)}` },
        { label: 'Total ROI', value: result.formattedROI },
        { label: 'Annualized ROI (CAGR)', value: result.formattedAnnualizedROI },
        { label: 'Investment Multiple', value: `${result.investmentMultiple}x` },
        { label: 'Holding Period', value: `${result.totalYears} Years` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'ROI_Calculation_Report');
  };

  const shareUrl = generateShareableLink('/roi-calculator', {
    inv: String(amountInvested),
    ret: String(amountReturned),
    y: String(investmentPeriodYears),
    m: String(investmentPeriodMonths),
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60">
            <p className="text-sm text-emerald-900 dark:text-emerald-200 font-medium">
              💡 <strong>Quick Scenarios:</strong> Choose a standard portfolio return:
            </p>
            <div className="flex flex-wrap gap-2 mt-2.5">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setAmountInvested(p.inv);
                    setAmountReturned(p.ret);
                    setInvestmentPeriodYears(p.y);
                    setInvestmentPeriodMonths(p.m);
                  }}
                  className="text-xs px-2.5 py-1 bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors shadow-sm"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Invested */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Amount Invested (Initial Capital)
              </label>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {formatCurrency(amountInvested)}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000000"
              step="5000"
              value={amountInvested}
              onChange={(e) => setAmountInvested(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
              <input
                type="number"
                min="1"
                value={amountInvested}
                onChange={(e) => setAmountInvested(Math.max(1, Number(e.target.value) || 0))}
                className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Amount Returned */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Amount Returned (Final Value / Proceeds)
              </label>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {formatCurrency(amountReturned)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100000000"
              step="5000"
              value={amountReturned}
              onChange={(e) => setAmountReturned(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
              <input
                type="number"
                min="0"
                value={amountReturned}
                onChange={(e) => setAmountReturned(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Investment Tenure */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tenure (Years)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={investmentPeriodYears}
                onChange={(e) => setInvestmentPeriodYears(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tenure (Months)
              </label>
              <input
                type="number"
                min="0"
                max="11"
                value={investmentPeriodMonths}
                onChange={(e) => setInvestmentPeriodMonths(Math.min(11, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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

        {/* Right Results Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div
            className={`p-6 rounded-2xl shadow-lg border text-white ${
              result.isProfit
                ? 'bg-gradient-to-br from-emerald-600 to-teal-700 border-emerald-500/20'
                : 'bg-gradient-to-br from-rose-600 to-red-700 border-rose-500/20'
            }`}
          >
            <div className="text-xs uppercase tracking-wider font-semibold opacity-90 mb-1">
              {result.isProfit ? 'Total Investment Profit' : 'Total Investment Loss'}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {result.isProfit ? '+' : ''}
              {formatCurrency(result.netProfit)}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium">
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                📈 Total ROI: {result.formattedROI}
              </span>
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                ⚡ Annualized: {result.formattedAnnualizedROI}
              </span>
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                🎯 {result.investmentMultiple}x Multiple
              </span>
            </div>
          </div>

          <ResultCard
            title="ROI Performance Summary"
            items={[
              {
                label: 'Total ROI',
                value: result.formattedROI,
                highlight: true,
                color: result.isProfit ? '#059669' : '#DC2626',
              },
              {
                label: 'Annualized ROI (CAGR)',
                value: result.formattedAnnualizedROI,
                highlight: true,
                color: '#2563EB',
              },
              { label: 'Amount Invested', value: formatCurrency(result.amountInvested) },
              { label: 'Amount Returned', value: formatCurrency(result.amountReturned) },
              { label: 'Investment Multiple', value: `${result.investmentMultiple}x` },
              { label: 'Holding Duration', value: `${result.totalYears} Years` },
            ]}
          />
        </div>
      </div>

      {/* Progression Table */}
      {progression.length > 0 && (
        <div className="w-full">
          <DataTable
            caption="Yearly Compound Growth & ROI Progression"
            headers={tableHeaders}
            data={tableData}
          />
        </div>
      )}
    </div>
  );
}

export function ROICalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initInv = Number(searchParams.get('inv')) || 100000;
  const initRet = Number(searchParams.get('ret')) || 150000;
  const initY = parseInt(searchParams.get('y') || '3', 10);
  const initM = parseInt(searchParams.get('m') || '0', 10);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-2">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialInvested={initInv}
          initialReturned={initRet}
          initialYears={initY}
          initialMonths={initM}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Investment A</h3>
            <CalculatorInstance
              id="comp1"
              initialInvested={initInv}
              initialReturned={initRet}
              initialYears={initY}
              initialMonths={initM}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Investment B</h3>
            <CalculatorInstance
              id="comp2"
              initialInvested={200000}
              initialReturned={360000}
              initialYears={3}
              initialMonths={0}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ROICalculator;
