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
  calculateLoanPrepayment,
  generatePrepaymentComparisonSchedule,
  LoanPrepaymentInput,
  PrepaymentFrequency,
  PrepaymentAdjustment,
} from '@/lib/calculators/loan-prepayment';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const PrepaymentComparisonChart = dynamic(() => import('@/components/charts/PrepaymentComparisonChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialAmount = 4000000,
  initialRate = 8.5,
  initialTenureMonths = 240,
  initialPrepayType = 'monthly',
  initialPrepayAmount = 5000,
  initialStartMonth = 12,
  initialAdjustment = 'reduce_tenure',
}: {
  id: string;
  initialAmount?: number;
  initialRate?: number;
  initialTenureMonths?: number;
  initialPrepayType?: PrepaymentFrequency;
  initialPrepayAmount?: number;
  initialStartMonth?: number;
  initialAdjustment?: PrepaymentAdjustment;
}) {
  const [loanAmount, setLoanAmount] = useState(initialAmount);
  const [annualRate, setAnnualRate] = useState(initialRate);
  const [tenureMonths, setTenureMonths] = useState(initialTenureMonths);
  const [prepaymentType, setPrepaymentType] = useState<PrepaymentFrequency>(initialPrepayType);
  const [prepaymentAmount, setPrepaymentAmount] = useState(initialPrepayAmount);
  const [prepaymentStartMonth, setPrepaymentStartMonth] = useState(initialStartMonth);
  const [prepaymentAdjustment, setPrepaymentAdjustment] = useState<PrepaymentAdjustment>(initialAdjustment);

  const input: LoanPrepaymentInput = useMemo(
    () => ({
      loanAmount,
      annualRate,
      tenureMonths,
      prepaymentType,
      prepaymentAmount,
      prepaymentStartMonth,
      prepaymentAdjustment,
    }),
    [loanAmount, annualRate, tenureMonths, prepaymentType, prepaymentAmount, prepaymentStartMonth, prepaymentAdjustment]
  );

  const result = useMemo(() => calculateLoanPrepayment(input), [input]);
  const schedule = useMemo(() => generatePrepaymentComparisonSchedule(input), [input]);

  const tableHeaders = ['Year', 'Original Balance', 'Prepaid Balance', 'Original Interest', 'Prepaid Interest', 'Prepayment Paid'];
  const tableData = useMemo(
    () =>
      schedule.map((row) => [
        `Year ${row.year}`,
        formatINR(row.originalBalance),
        formatINR(row.prepaidBalance),
        formatINR(row.originalInterestPaid),
        formatINR(row.prepaidInterestPaid),
        formatINR(row.prepaymentMadeThisYear),
      ]),
    [schedule]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Loan Prepayment & Interest Savings Analysis Report',
      [
        { label: 'Loan Principal Balance', value: formatINR(loanAmount) },
        { label: 'Interest Rate (% p.a.)', value: `${annualRate}%` },
        { label: 'Original Tenure', value: `${tenureMonths} months (${(tenureMonths / 12).toFixed(1)} yrs)` },
        { label: 'Prepayment Type', value: prepaymentType.toUpperCase() },
        { label: 'Prepayment Amount', value: formatINR(prepaymentAmount) },
        { label: 'Original EMI', value: formatINR(result.originalEMI) },
        { label: 'Revised EMI', value: formatINR(result.newEMI) },
        { label: 'Total Interest Saved', value: formatINR(result.totalInterestSaved) },
        { label: 'Tenure Reduced By', value: `${result.tenureMonthsSaved} months (${result.tenureYearsSaved} yrs)` },
        { label: 'Total Prepayments Invested', value: formatINR(result.totalPrepaymentsMade) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Loan_Prepayment_Schedule_Comparison');
  };

  const shareUrl = generateShareableLink('/loan-prepayment-calculator', {
    a: loanAmount,
    r: annualRate,
    t: tenureMonths,
    pt: prepaymentType,
    pa: prepaymentAmount,
    sm: prepaymentStartMonth,
    adj: prepaymentAdjustment,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Outstanding Loan Balance"
            value={loanAmount}
            onChange={setLoanAmount}
            min={100000}
            max={50000000}
            step={50000}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          <InputGroup
            label="Interest Rate (% p.a.)"
            value={annualRate}
            onChange={setAnnualRate}
            min={5.0}
            max={20.0}
            step={0.1}
            suffix="%"
          />

          <InputGroup
            label="Remaining Tenure (Months)"
            value={tenureMonths}
            onChange={setTenureMonths}
            min={12}
            max={360}
            step={12}
            suffix=" Mos"
          />

          {/* Prepayment frequency selector */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Prepayment Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['one-time', 'monthly', 'annually'] as PrepaymentFrequency[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPrepaymentType(type)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    prepaymentType === type
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type === 'one-time' ? 'One-Time Lump Sum' : type === 'monthly' ? 'Extra Monthly EMI' : 'Annual Prepayment'}
                </button>
              ))}
            </div>
          </div>

          <InputGroup
            label={
              prepaymentType === 'one-time'
                ? 'One-Time Lump Sum Prepayment'
                : prepaymentType === 'monthly'
                ? 'Extra Monthly Prepayment'
                : 'Annual Prepayment Amount'
            }
            value={prepaymentAmount}
            onChange={setPrepaymentAmount}
            min={1000}
            max={10000000}
            step={2000}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          <InputGroup
            label="Prepayment Starts From (Month)"
            value={prepaymentStartMonth}
            onChange={setPrepaymentStartMonth}
            min={1}
            max={Math.min(120, tenureMonths)}
            step={1}
            suffix=" Mo"
          />

          {/* Adjustment mode selector */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Prepayment Impact Target
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPrepaymentAdjustment('reduce_tenure')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  prepaymentAdjustment === 'reduce_tenure'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Reduce Tenure (Save Max Interest)
              </button>
              <button
                type="button"
                onClick={() => setPrepaymentAdjustment('reduce_emi')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  prepaymentAdjustment === 'reduce_emi'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Reduce Monthly EMI
              </button>
            </div>
          </div>

          <DisclaimerNote sourceNote="RBI mandates zero prepayment penalties on floating rate home loans for individual borrowers." />

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
            title="Prepayment Savings Summary"
            items={[
              { label: 'Total Interest Saved', value: formatINR(result.totalInterestSaved), highlight: true, color: '#16A34A' },
              { label: 'Tenure Reduced By', value: `${result.tenureMonthsSaved} Mos (${result.tenureYearsSaved} Yrs)`, highlight: true, color: '#1E40AF' },
              { label: 'Revised Interest Payable', value: formatINR(result.newTotalInterest) },
              { label: 'Original Total Interest', value: formatINR(result.originalTotalInterest) },
              { label: 'Total Prepayments Invested', value: formatINR(result.totalPrepaymentsMade) },
              { label: prepaymentAdjustment === 'reduce_emi' ? 'New Monthly EMI' : 'Original EMI', value: formatINR(result.newEMI) },
            ]}
          />

          <ChartWrapper title="Loan Amortization: Original vs Prepayment Strategy">
            <PrepaymentComparisonChart
              originalInterest={result.originalTotalInterest}
              newInterest={result.newTotalInterest}
              interestSaved={result.totalInterestSaved}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="w-full">
        <DataTable
          caption="Year-by-Year Amortization Comparison"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function LoanPrepaymentCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initA = searchParams.get('a') ? Number(searchParams.get('a')) : 4000000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 8.5;
  const initT = searchParams.get('t') ? Number(searchParams.get('t')) : 240;
  const initPT = (searchParams.get('pt') as PrepaymentFrequency) || 'monthly';
  const initPA = searchParams.get('pa') ? Number(searchParams.get('pa')) : 5000;
  const initSM = searchParams.get('sm') ? Number(searchParams.get('sm')) : 12;
  const initAdj = (searchParams.get('adj') as PrepaymentAdjustment) || 'reduce_tenure';

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
          initialTenureMonths={initT}
          initialPrepayType={initPT}
          initialPrepayAmount={initPA}
          initialStartMonth={initSM}
          initialAdjustment={initAdj}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Strategy 1 (Extra Monthly ₹5,000)</h3>
            <CalculatorInstance
              id="comp1"
              initialAmount={initA}
              initialRate={initR}
              initialTenureMonths={initT}
              initialPrepayType={initPT}
              initialPrepayAmount={initPA}
              initialStartMonth={initSM}
              initialAdjustment={initAdj}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Strategy 2 (Annual Prepayment ₹1 Lakh)</h3>
            <CalculatorInstance
              id="comp2"
              initialAmount={initA}
              initialRate={initR}
              initialTenureMonths={initT}
              initialPrepayType="annually"
              initialPrepayAmount={100000}
              initialStartMonth={12}
              initialAdjustment="reduce_tenure"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanPrepaymentCalculator;
