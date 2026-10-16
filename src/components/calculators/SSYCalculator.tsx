'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { InputGroup } from '@/components/ui/InputGroup';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import {
  calculateSSY,
  generateSSYYearlyBreakdown,
  SSYDepositFrequency,
  SSY_DEFAULT_RATE,
} from '@/lib/calculators/ssy';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

export default function SSYCalculator() {
  const searchParams = useSearchParams();
  const initFreq = (searchParams.get('freq') as SSYDepositFrequency) || 'yearly';
  const initDeposit = Number(searchParams.get('d')) || (initFreq === 'yearly' ? 150000 : 12500);
  const initAge = Number(searchParams.get('age')) || 1;
  const initRate = Number(searchParams.get('r')) || SSY_DEFAULT_RATE;

  const [frequency, setFrequency] = useState<SSYDepositFrequency>(initFreq);
  const [depositAmount, setDepositAmount] = useState<number>(initDeposit);
  const [girlAge, setGirlAge] = useState<number>(initAge);
  const [startYear] = useState<number>(new Date().getFullYear());
  const [interestRate, setInterestRate] = useState<number>(initRate);
  const [showSchedule, setShowSchedule] = useState<boolean>(true);

  const handleFrequencyChange = (newFreq: SSYDepositFrequency) => {
    setFrequency(newFreq);
    if (newFreq === 'yearly' && depositAmount < 5000) {
      setDepositAmount(150000);
    } else if (newFreq === 'monthly' && depositAmount > 12500) {
      setDepositAmount(12500);
    }
  };

  const input = useMemo(
    () => ({
      depositAmount,
      frequency,
      girlAge,
      startYear,
      interestRate,
    }),
    [depositAmount, frequency, girlAge, startYear, interestRate]
  );

  const result = useMemo(() => calculateSSY(input), [input]);
  const schedule = useMemo(() => generateSSYYearlyBreakdown(input), [input]);

  const maxDepositAllowed = frequency === 'yearly' ? 150000 : 12500;
  const minDepositAllowed = frequency === 'yearly' ? 250 : 250;
  const stepAmount = frequency === 'yearly' ? 1000 : 500;

  const investedPercent = result.maturityAmount > 0 
    ? Math.round((result.totalDeposited / result.maturityAmount) * 100) 
    : 30;
  const interestPercent = 100 - investedPercent;

  const tableHeaders = ['Year', 'Calendar', 'Girl Age', 'Deposit', 'Interest', 'Balance'];
  const tableData = useMemo(
    () =>
      schedule.map((s) => [
        `Yr ${s.year}${s.year > 15 ? ' (No Deposit)' : ''}`,
        String(s.calendarYear),
        `${s.girlAge} yrs`,
        s.depositAmount > 0 ? formatINR(s.depositAmount) : '₹0',
        formatINR(s.interestEarned),
        formatINR(s.closingBalance),
      ]),
    [schedule]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Sukanya Samriddhi Yojana (SSY) Calculation Report',
      [
        { label: 'Deposit Frequency', value: frequency === 'yearly' ? 'Yearly' : 'Monthly' },
        { label: 'Deposit Amount', value: formatINR(depositAmount) },
        { label: "Girl Child's Current Age", value: `${girlAge} years` },
        { label: 'Government Interest Rate', value: `${interestRate}% p.a.` },
        { label: 'Deposit Duration', value: '15 Years' },
        { label: 'Account Maturity', value: '21 Years' },
        { label: 'Total Invested Amount', value: formatINR(result.totalDeposited) },
        { label: 'Total Interest Earned', value: formatINR(result.totalInterest) },
        { label: 'Final Maturity Payout', value: formatINR(result.maturityAmount) },
        { label: 'Maturity Year', value: String(result.maturityYear) },
        { label: "Girl's Age at Maturity", value: `${result.girlAgeAtMaturity} years` },
        { label: 'Annual 80C Tax Savings', value: formatINR(result.annualTaxSaving80C) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(
      tableHeaders,
      tableData,
      'sukanya-samriddhi-schedule'
    );
  };

  const shareableUrl = generateShareableLink('sukanya-samriddhi-calculator', {
    d: depositAmount,
    freq: frequency,
    age: girlAge,
    r: interestRate,
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Section */}
        <div className="lg:col-span-6 space-y-6">
          {/* Frequency Toggle */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Deposit Frequency
            </label>
            <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => handleFrequencyChange('yearly')}
                className={`py-2 text-sm font-medium rounded-lg transition-all ${
                  frequency === 'yearly'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Annual Deposit
              </button>
              <button
                type="button"
                onClick={() => handleFrequencyChange('monthly')}
                className={`py-2 text-sm font-medium rounded-lg transition-all ${
                  frequency === 'monthly'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Monthly Deposit
              </button>
            </div>
          </div>

          {/* Deposit Amount */}
          <div>
            <InputGroup
              label={frequency === 'yearly' ? 'Annual Investment Amount' : 'Monthly Investment Amount'}
              value={depositAmount}
              onChange={setDepositAmount}
              min={minDepositAllowed}
              max={maxDepositAllowed}
              step={stepAmount}
              prefix="₹"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 px-1">
              {frequency === 'yearly'
                ? 'Min ₹250 to Max ₹1,50,000 per financial year (Section 80C exempt).'
                : 'Min ₹250 to Max ₹12,500 per month (₹1.5 Lakh/year max).'}
            </p>
          </div>

          {/* Girl Child Age */}
          <div>
            <InputGroup
              label="Girl Child Age at Account Opening"
              value={girlAge}
              onChange={setGirlAge}
              min={0}
              max={10}
              step={1}
              suffix="Years"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 px-1">
              Eligible from birth (0 years) up to 10 years of age.
            </p>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Government Interest Rate
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Current Govt Rate: 8.2%
              </span>
            </div>
            <InputGroup
              label="Annual Rate"
              value={interestRate}
              onChange={setInterestRate}
              min={6}
              max={12}
              step={0.1}
              suffix="%"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 px-1">
              Compounded annually as notified quarterly by the Ministry of Finance.
            </p>
          </div>

          {/* Policy Rule Pill */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-300 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <span>📌</span> SSY 15-Year vs 21-Year Rule:
            </p>
            <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
              Deposits are required only for the first <strong>15 years</strong>. For the remaining <strong>6 years</strong> (Years 16 to 21), you deposit ₹0, while the entire accumulated corpus continues to earn 8.2% compound interest until final maturity!
            </p>
          </div>
        </div>

        {/* Right Results Section */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Main Maturity Card */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="text-xs uppercase font-bold tracking-widest text-blue-200 mb-1">
              Tax-Free Maturity Amount (At Year 21)
            </div>
            <div className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
              {formatINR(result.maturityAmount)}
            </div>
            <p className="text-xs md:text-sm text-blue-100/90 font-medium">
              Matures in <span className="font-bold text-white">{result.maturityYear}</span> when your daughter turns <span className="font-bold text-white">{result.girlAgeAtMaturity} years</span> old.
            </p>

            {/* Split Bar */}
            <div className="mt-6 pt-5 border-t border-white/20">
              <div className="flex justify-between text-xs font-semibold mb-2 text-blue-100">
                <span>Principal Deposited: {investedPercent}%</span>
                <span>Interest Gain: {interestPercent}%</span>
              </div>
              <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden flex">
                <div style={{ width: `${investedPercent}%` }} className="bg-sky-300 h-full" />
                <div style={{ width: `${interestPercent}%` }} className="bg-emerald-300 h-full" />
              </div>
            </div>
          </div>

          {/* Key Output Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Total Deposited (15 Yrs)</span>
              <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                {formatCompactINR(result.totalDeposited)}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Ends in {result.depositEndYear}</span>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/40">
              <span className="text-xs text-emerald-800 dark:text-emerald-400 block mb-1">Total Interest Earned</span>
              <span className="text-lg md:text-xl font-bold text-emerald-700 dark:text-emerald-300">
                {formatCompactINR(result.totalInterest)}
              </span>
              <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 block mt-0.5">100% Tax-Free (EEE)</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Annual 80C Tax Saved</span>
              <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                {formatINR(result.annualTaxSaving80C)}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Under Old Tax Regime</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Maturity Tenure</span>
              <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                21 Years
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Or on marriage (≥18 yrs)</span>
            </div>
          </div>

          {/* Action Buttons: Export & Share */}
          <div className="pt-2">
            <ShareActions
              title="Sukanya Samriddhi Yojana (SSY) Calculation - CalcMaster"
              shareUrl={shareableUrl}
              onDownloadPdf={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>
      </div>

      {/* 21-Year Yearly Amortization Schedule Table */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              21-Year Year-by-Year Growth Schedule
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Notice how compounding accelerates between Years 16 and 21 even with zero ongoing deposits.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSchedule(!showSchedule)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            {showSchedule ? 'Hide Schedule' : 'Show Schedule'}
          </button>
        </div>

        {showSchedule && (
          <div className="overflow-x-auto">
            <DataTable headers={tableHeaders} data={tableData} />
          </div>
        )}
      </div>
    </div>
  );
}
