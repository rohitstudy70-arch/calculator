'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { calculateSIP, generateSIPYearlyBreakdown } from '@/lib/calculators/sip';
import { calculateLumpsum, generateLumpsumYearlyBreakdown } from '@/lib/calculators/lumpsum';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { formatCurrency, formatINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

type MutualFundMode = 'sip' | 'lumpsum' | 'goal';

export function MutualFundCalculator() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const [mode, setMode] = useState<MutualFundMode>(() => {
    const qMode = searchParams.get('mode');
    if (qMode === 'lumpsum') return 'lumpsum';
    if (qMode === 'goal') return 'goal';
    return 'sip';
  });

  // SIP State
  const [monthlySIP, setMonthlySIP] = useState<number>(
    Number(searchParams.get('sip')) || 10000
  );
  const [sipReturnRate, setSipReturnRate] = useState<number>(
    Number(searchParams.get('rate')) || 12
  );
  const [sipTenureYears, setSipTenureYears] = useState<number>(
    Number(searchParams.get('years')) || 10
  );

  // Lumpsum State
  const [lumpsumAmount, setLumpsumAmount] = useState<number>(
    Number(searchParams.get('lumpsum')) || 100000
  );
  const [lumpsumReturnRate, setLumpsumReturnRate] = useState<number>(
    Number(searchParams.get('rate')) || 12
  );
  const [lumpsumTenureYears, setLumpsumTenureYears] = useState<number>(
    Number(searchParams.get('years')) || 10
  );

  // Goal Planner State
  const [targetGoal, setTargetGoal] = useState<number>(10000000); // ₹1 Crore
  const [goalReturnRate, setGoalReturnRate] = useState<number>(12);
  const [goalYears, setGoalYears] = useState<number>(15);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute SIP Results
  const sipResult = useMemo(() => {
    return calculateSIP({
      monthlyInvestment: monthlySIP,
      expectedReturnRate: sipReturnRate,
      timePeriodMonths: sipTenureYears * 12,
    });
  }, [monthlySIP, sipReturnRate, sipTenureYears]);

  const sipBreakdown = useMemo(() => {
    return generateSIPYearlyBreakdown({
      monthlyInvestment: monthlySIP,
      expectedReturnRate: sipReturnRate,
      timePeriodMonths: sipTenureYears * 12,
    });
  }, [monthlySIP, sipReturnRate, sipTenureYears]);

  // Compute Lumpsum Results
  const lumpsumResult = useMemo(() => {
    return calculateLumpsum({
      investmentAmount: lumpsumAmount,
      expectedReturnRate: lumpsumReturnRate,
      timePeriodYears: lumpsumTenureYears,
    });
  }, [lumpsumAmount, lumpsumReturnRate, lumpsumTenureYears]);

  const lumpsumBreakdown = useMemo(() => {
    return generateLumpsumYearlyBreakdown({
      investmentAmount: lumpsumAmount,
      expectedReturnRate: lumpsumReturnRate,
      timePeriodYears: lumpsumTenureYears,
    });
  }, [lumpsumAmount, lumpsumReturnRate, lumpsumTenureYears]);

  // Compute Goal Required SIP: P = M / [((1 + i)^n - 1) / i * (1 + i)]
  const goalRequiredSIP = useMemo(() => {
    const i = goalReturnRate / 12 / 100;
    const n = goalYears * 12;
    if (i === 0) return Math.round(targetGoal / n);
    const compoundFactor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    return Math.round(targetGoal / compoundFactor);
  }, [targetGoal, goalReturnRate, goalYears]);

  // Active breakdown table data
  const tableHeaders = ['Year', 'Invested Amount', 'Estimated Returns', 'Total Corpus Value'];
  const tableData = useMemo(() => {
    if (mode === 'sip' || mode === 'goal') {
      return sipBreakdown.map((item) => [
        `Year ${item.year}`,
        formatINR(item.investedAmount),
        formatINR(item.estimatedReturns),
        formatINR(item.totalValue),
      ]);
    }
    return lumpsumBreakdown.map((item) => [
      `Year ${item.year}`,
      formatINR(item.investedAmount),
      formatINR(item.estimatedReturns),
      formatINR(item.totalValue),
    ]);
  }, [mode, sipBreakdown, lumpsumBreakdown]);

  const handlePdfExport = () => {
    const title =
      mode === 'sip'
        ? 'Mutual Fund SIP Wealth Accumulation Report'
        : mode === 'lumpsum'
        ? 'Mutual Fund Lumpsum Investment Report'
        : 'Mutual Fund Financial Goal Planner Report';

    const summary =
      mode === 'sip'
        ? [
            { label: 'Monthly SIP Amount', value: formatINR(monthlySIP) },
            { label: 'Expected Return', value: `${sipReturnRate}% p.a.` },
            { label: 'Tenure', value: `${sipTenureYears} Years` },
            { label: 'Total Invested', value: formatINR(sipResult.totalInvestment) },
            { label: 'Estimated Returns', value: formatINR(sipResult.estimatedReturns) },
            { label: 'Total Maturity Value', value: formatINR(sipResult.totalValue) },
          ]
        : mode === 'lumpsum'
        ? [
            { label: 'One-Time Lumpsum', value: formatINR(lumpsumAmount) },
            { label: 'Expected Return', value: `${lumpsumReturnRate}% p.a.` },
            { label: 'Tenure', value: `${lumpsumTenureYears} Years` },
            { label: 'Estimated Wealth Gain', value: formatINR(lumpsumResult.estimatedReturns) },
            { label: 'Total Maturity Value', value: formatINR(lumpsumResult.totalValue) },
          ]
        : [
            { label: 'Target Financial Goal', value: formatINR(targetGoal) },
            { label: 'Time Horizon', value: `${goalYears} Years` },
            { label: 'Expected Return', value: `${goalReturnRate}% p.a.` },
            { label: 'Required Monthly SIP', value: formatINR(goalRequiredSIP) },
          ];

    exportToPDF(title, summary, tableHeaders, tableData);
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, `Mutual_Fund_${mode.toUpperCase()}_Report`);
  };

  const shareUrl = generateShareableLink('/mutual-fund-calculator', {
    mode,
    sip: String(monthlySIP),
    lumpsum: String(lumpsumAmount),
  });

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Mode Switcher Tabs */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-md">
        <button
          type="button"
          onClick={() => setMode('sip')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
            mode === 'sip'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          📈 Monthly SIP
        </button>
        <button
          type="button"
          onClick={() => setMode('lumpsum')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
            mode === 'lumpsum'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          💰 One-Time Lumpsum
        </button>
        <button
          type="button"
          onClick={() => setMode('goal')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
            mode === 'goal'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          🎯 Goal Planner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6">
          {mode === 'sip' && (
            <>
              {/* Monthly Investment */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Monthly SIP Amount (मासिक निवेश)
                  </label>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {formatINR(monthlySIP)}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="200000"
                  step="500"
                  value={monthlySIP}
                  onChange={(e) => setMonthlySIP(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                  <input
                    type="number"
                    min="500"
                    value={monthlySIP}
                    onChange={(e) => setMonthlySIP(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              {/* Expected Return Rate */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Expected Annual Return (% p.a.)
                  </label>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {sipReturnRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={sipReturnRate}
                  onChange={(e) => setSipReturnRate(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Time Period */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Investment Period (समय सीमा)
                  </label>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {sipTenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={sipTenureYears}
                  onChange={(e) => setSipTenureYears(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </>
          )}

          {mode === 'lumpsum' && (
            <>
              {/* Lumpsum Amount */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    One-Time Investment (एकमुश्त राशि)
                  </label>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {formatINR(lumpsumAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="5000000"
                  step="5000"
                  value={lumpsumAmount}
                  onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                  <input
                    type="number"
                    min="1000"
                    value={lumpsumAmount}
                    onChange={(e) => setLumpsumAmount(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              {/* Expected Return Rate */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Expected Return (% p.a.)
                  </label>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {lumpsumReturnRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={lumpsumReturnRate}
                  onChange={(e) => setLumpsumReturnRate(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Time Period */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Investment Period
                  </label>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {lumpsumTenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={lumpsumTenureYears}
                  onChange={(e) => setLumpsumTenureYears(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            </>
          )}

          {mode === 'goal' && (
            <>
              {/* Target Goal */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Target Wealth Corpus (लक्ष्य राशि)
                  </label>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {formatINR(targetGoal)}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[2500000, 5000000, 10000000, 20000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTargetGoal(amt)}
                      className={`text-xs px-2.5 py-1 rounded-lg border cursor-pointer ${
                        targetGoal === amt
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {formatINR(amt)}
                    </button>
                  ))}
                </div>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                  <input
                    type="number"
                    min="50000"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(Math.max(10000, Number(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              {/* Goal Years */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Time to Achieve Goal
                  </label>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {goalYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  value={goalYears}
                  onChange={(e) => setGoalYears(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Goal Return Rate */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Expected Return (% p.a.)
                  </label>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {goalReturnRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={goalReturnRate}
                  onChange={(e) => setGoalReturnRate(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </>
          )}

          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Results Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {mode === 'sip' && (
            <>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg flex flex-col gap-2">
                <div className="text-xs uppercase font-semibold text-blue-100 tracking-wider">
                  Total Expected Corpus ({sipTenureYears} Years)
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {formatINR(sipResult.totalValue)}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="px-2.5 py-1 bg-white/20 rounded-lg">
                    💰 Invested: {formatINR(sipResult.totalInvestment)}
                  </span>
                  <span className="px-2.5 py-1 bg-white/20 rounded-lg">
                    📈 Wealth Gain: +{formatINR(sipResult.estimatedReturns)}
                  </span>
                </div>
              </div>

              <ResultCard
                title="SIP Growth Summary"
                items={[
                  { label: 'Total Maturity Value', value: formatINR(sipResult.totalValue), highlight: true, color: '#2563EB' },
                  { label: 'Estimated Returns', value: `+${formatINR(sipResult.estimatedReturns)}`, highlight: true, color: '#059669' },
                  { label: 'Total Investment', value: formatINR(sipResult.totalInvestment) },
                  { label: 'Wealth Gain %', value: `+${sipResult.wealthGainPercentage.toFixed(1)}%` },
                ]}
              />
            </>
          )}

          {mode === 'lumpsum' && (
            <>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg flex flex-col gap-2">
                <div className="text-xs uppercase font-semibold text-emerald-100 tracking-wider">
                  Total Expected Maturity ({lumpsumTenureYears} Years)
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {formatINR(lumpsumResult.totalValue)}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="px-2.5 py-1 bg-white/20 rounded-lg">
                    💰 Principal: {formatINR(lumpsumResult.investmentAmount)}
                  </span>
                  <span className="px-2.5 py-1 bg-white/20 rounded-lg">
                    📈 Returns: +{formatINR(lumpsumResult.estimatedReturns)}
                  </span>
                </div>
              </div>

              <ResultCard
                title="Lumpsum Growth Summary"
                items={[
                  { label: 'Total Maturity Value', value: formatINR(lumpsumResult.totalValue), highlight: true, color: '#059669' },
                  { label: 'Estimated Returns', value: `+${formatINR(lumpsumResult.estimatedReturns)}`, highlight: true, color: '#2563EB' },
                  { label: 'Initial Investment', value: formatINR(lumpsumResult.investmentAmount) },
                  { label: 'Wealth Gain %', value: `+${lumpsumResult.wealthGainPercentage.toFixed(1)}%` },
                ]}
              />
            </>
          )}

          {mode === 'goal' && (
            <>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-lg flex flex-col gap-2">
                <div className="text-xs uppercase font-semibold text-indigo-100 tracking-wider">
                  Required Monthly SIP to reach {formatINR(targetGoal)}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {formatINR(goalRequiredSIP)} / month
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="px-2.5 py-1 bg-white/20 rounded-lg">
                    🎯 Goal: {formatINR(targetGoal)}
                  </span>
                  <span className="px-2.5 py-1 bg-white/20 rounded-lg">
                    ⏳ Duration: {goalYears} Years ({goalYears * 12} Installments)
                  </span>
                </div>
              </div>

              <ResultCard
                title="Financial Goal Feasibility"
                items={[
                  { label: 'Required Monthly SIP', value: `${formatINR(goalRequiredSIP)}/mo`, highlight: true, color: '#4F46E5' },
                  { label: 'Total Principal Invested', value: formatINR(goalRequiredSIP * goalYears * 12) },
                  { label: 'Expected Corpus at Maturity', value: formatINR(targetGoal) },
                  { label: 'Compounding Benefit', value: formatINR(targetGoal - goalRequiredSIP * goalYears * 12) },
                ]}
              />
            </>
          )}
        </div>
      </div>

      {/* Yearly Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Mutual Fund Yearly Wealth Compounding Schedule"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export default MutualFundCalculator;
