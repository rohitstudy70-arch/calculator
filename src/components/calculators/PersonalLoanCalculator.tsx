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
  calculatePersonalLoan,
  generatePersonalLoanYearlySummary,
  PersonalLoanInput,
} from '@/lib/calculators/personal-loan';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const PersonalLoanPieChart = dynamic(() => import('@/components/charts/PersonalLoanPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialAmount = 500000,
  initialRate = 13.5,
  initialTenureMonths = 36,
  initialFee = 2.0,
}: {
  id: string;
  initialAmount?: number;
  initialRate?: number;
  initialTenureMonths?: number;
  initialFee?: number;
}) {
  const [loanAmount, setLoanAmount] = useState(initialAmount);
  const [annualRate, setAnnualRate] = useState(initialRate);
  const [tenureMonths, setTenureMonths] = useState(initialTenureMonths);
  const [feePercent, setFeePercent] = useState(initialFee);

  const input: PersonalLoanInput = useMemo(
    () => ({
      loanAmount,
      annualRate,
      tenureMonths,
      processingFeePercent: feePercent,
      gstOnFeePercent: 18.0,
    }),
    [loanAmount, annualRate, tenureMonths, feePercent]
  );

  const result = useMemo(() => calculatePersonalLoan(input), [input]);
  const summary = useMemo(() => generatePersonalLoanYearlySummary(input), [input]);

  const tableHeaders = ['Year', 'Opening Balance', 'Principal Paid', 'Interest Paid', 'Total Annual Outgo', 'Closing Balance'];
  const tableData = useMemo(
    () =>
      summary.map((row) => [
        `Year ${row.year}`,
        formatINR(row.openingBalance),
        formatINR(row.principalPaid),
        formatINR(row.interestPaid),
        formatINR(row.totalPayment),
        formatINR(row.closingBalance),
      ]),
    [summary]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Personal Loan Repayment & Fee Schedule Report',
      [
        { label: 'Loan Principal Amount', value: formatINR(loanAmount) },
        { label: 'Interest Rate (% p.a.)', value: `${annualRate}%` },
        { label: 'Loan Tenure', value: `${tenureMonths} months (${(tenureMonths / 12).toFixed(1)} yrs)` },
        { label: 'Processing Fee + GST', value: `${formatINR(result.totalProcessingCharges)} (${feePercent}% + 18% GST)` },
        { label: 'Monthly EMI', value: formatINR(result.monthlyEMI) },
        { label: 'Total Interest Payable', value: formatINR(result.totalInterest) },
        { label: 'Effective APR', value: `${result.effectiveAPR}%` },
        { label: 'Total Cost of Loan', value: formatINR(result.totalCostOfLoan) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Personal_Loan_Amortization');
  };

  const shareUrl = generateShareableLink('/personal-loan-calculator', {
    a: loanAmount,
    r: annualRate,
    t: tenureMonths,
    f: feePercent,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Personal Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            min={25000}
            max={5000000}
            step={5000}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Annual Interest Rate (% p.a.)"
            value={annualRate}
            onChange={setAnnualRate}
            min={9.5}
            max={36}
            step={0.25}
            suffix="%"
          />
          <InputGroup
            label="Loan Tenure (Months)"
            value={tenureMonths}
            onChange={setTenureMonths}
            min={12}
            max={84}
            step={6}
            suffix=" Mos"
          />
          <InputGroup
            label="Processing Fee (% of Loan)"
            value={feePercent}
            onChange={setFeePercent}
            min={0}
            max={5}
            step={0.25}
            suffix="%"
          />

          <DisclaimerNote sourceNote="Banks levy 18% GST on all loan processing and administrative fees." />

          <div className="flex justify-end mt-2">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Summary & Pie Chart */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            title="Personal Loan EMI & Cost"
            items={[
              { label: 'Monthly EMI', value: formatINR(result.monthlyEMI), highlight: true, color: '#1E40AF' },
              { label: 'Total Interest Payable', value: formatINR(result.totalInterest), highlight: true, color: '#D97706' },
              { label: 'Upfront Fees (inc. GST)', value: formatINR(result.totalProcessingCharges) },
              { label: 'Effective APR', value: `${result.effectiveAPR}%` },
              { label: 'Total Cost of Loan', value: formatINR(result.totalCostOfLoan) },
            ]}
          />

          <ChartWrapper title="Loan Cost Breakup" height={280}>
            <PersonalLoanPieChart
              loanAmount={result.loanAmount}
              totalInterest={result.totalInterest}
              totalProcessingCharges={result.totalProcessingCharges}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Yearly Table */}
      <div className="mt-8">
        <DataTable
          caption="Year-by-Year Loan Amortization Schedule"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function PersonalLoanCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initA = searchParams.get('a') ? Number(searchParams.get('a')) : 500000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 13.5;
  const initT = searchParams.get('t') ? Number(searchParams.get('t')) : 36;
  const initF = searchParams.get('f') ? Number(searchParams.get('f')) : 2.0;

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
          initialFee={initF}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (Rate 13.5%, 3 Yrs)</h3>
            <CalculatorInstance
              id="comp1"
              initialAmount={initA}
              initialRate={initR}
              initialTenureMonths={initT}
              initialFee={initF}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (Longer 5 Yrs / Lower Rate)</h3>
            <CalculatorInstance
              id="comp2"
              initialAmount={initA}
              initialRate={initR - 1.5}
              initialTenureMonths={60}
              initialFee={initF}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalLoanCalculator;
