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
  calculateCarLoan,
  generateCarLoanYearlySummary,
  CarLoanInput,
} from '@/lib/calculators/car-loan';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const CarLoanPieChart = dynamic(() => import('@/components/charts/CarLoanPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialPrice = 1200000,
  initialDownPaymentPercent = 20,
  initialRate = 8.75,
  initialTenureMonths = 60,
  initialFee = 3500,
}: {
  id: string;
  initialPrice?: number;
  initialDownPaymentPercent?: number;
  initialRate?: number;
  initialTenureMonths?: number;
  initialFee?: number;
}) {
  const [onRoadPrice, setOnRoadPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(initialDownPaymentPercent);
  const [annualRate, setAnnualRate] = useState(initialRate);
  const [tenureMonths, setTenureMonths] = useState(initialTenureMonths);
  const [processingFeeAmount, setProcessingFeeAmount] = useState(initialFee);

  const input: CarLoanInput = useMemo(
    () => ({
      onRoadPrice,
      downPaymentPercent,
      annualRate,
      tenureMonths,
      processingFeeAmount,
    }),
    [onRoadPrice, downPaymentPercent, annualRate, tenureMonths, processingFeeAmount]
  );

  const result = useMemo(() => calculateCarLoan(input), [input]);
  const summary = useMemo(() => generateCarLoanYearlySummary(input), [input]);

  const tableHeaders = ['Year', 'Opening Balance', 'Principal Paid', 'Interest Paid', 'Total Outgo', 'Closing Balance'];
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
      'Car Loan EMI & Acquisition Cost Report',
      [
        { label: 'Vehicle On-Road Price', value: formatINR(onRoadPrice) },
        { label: 'Down Payment Amount', value: `${formatINR(result.downPaymentAmount)} (${downPaymentPercent}%)` },
        { label: 'Loan Principal Amount', value: formatINR(result.loanAmount) },
        { label: 'Interest Rate (% p.a.)', value: `${annualRate}%` },
        { label: 'Loan Tenure', value: `${tenureMonths} months (${(tenureMonths / 12).toFixed(1)} yrs)` },
        { label: 'Processing Fee', value: formatINR(processingFeeAmount) },
        { label: 'Monthly EMI', value: formatINR(result.monthlyEMI) },
        { label: 'Total Interest Payable', value: formatINR(result.totalInterest) },
        { label: 'Total Cost of Car', value: formatINR(result.totalCostOfCar) },
        { label: 'Loan-to-Value (LTV)', value: `${result.ltvRatio}%` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Car_Loan_Amortization_Schedule');
  };

  const shareUrl = generateShareableLink('/car-loan-calculator', {
    p: onRoadPrice,
    dp: downPaymentPercent,
    r: annualRate,
    t: tenureMonths,
    f: processingFeeAmount,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="On-Road Vehicle Price"
            value={onRoadPrice}
            onChange={setOnRoadPrice}
            min={100000}
            max={10000000}
            step={25000}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          <InputGroup
            label="Down Payment (%)"
            value={downPaymentPercent}
            onChange={setDownPaymentPercent}
            min={0}
            max={80}
            step={1}
            suffix="%"
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
            label="Loan Tenure (Months)"
            value={tenureMonths}
            onChange={setTenureMonths}
            min={12}
            max={84}
            step={6}
            suffix=" Mos"
          />

          <InputGroup
            label="Processing Fee & Documentation"
            value={processingFeeAmount}
            onChange={setProcessingFeeAmount}
            min={0}
            max={25000}
            step={500}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          <DisclaimerNote sourceNote="Auto loan interest rates, road tax, and registration charges vary across Indian states and lenders." />

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
            title="Car Loan Summary"
            items={[
              { label: 'Monthly EMI', value: formatINR(result.monthlyEMI), highlight: true, color: '#1E40AF' },
              { label: 'Total Interest', value: formatINR(result.totalInterest), highlight: true, color: '#D97706' },
              { label: 'Loan Amount (Principal)', value: formatINR(result.loanAmount) },
              { label: 'Down Payment', value: formatINR(result.downPaymentAmount) },
              { label: 'Total Cost of Car', value: formatINR(result.totalCostOfCar) },
              { label: 'Loan-to-Value (LTV)', value: `${result.ltvRatio}%` },
            ]}
          />

          <ChartWrapper title="Total Car Acquisition Cost Breakdown">
            <CarLoanPieChart
              downPayment={result.downPaymentAmount}
              loanAmount={result.loanAmount}
              totalInterest={result.totalInterest}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Yearly Amortization Table */}
      <div className="w-full">
        <DataTable
          caption="Year-on-Year Car Loan Repayment Schedule"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function CarLoanCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initP = searchParams.get('p') ? Number(searchParams.get('p')) : 1200000;
  const initDP = searchParams.get('dp') ? Number(searchParams.get('dp')) : 20;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 8.75;
  const initT = searchParams.get('t') ? Number(searchParams.get('t')) : 60;
  const initF = searchParams.get('f') ? Number(searchParams.get('f')) : 3500;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialPrice={initP}
          initialDownPaymentPercent={initDP}
          initialRate={initR}
          initialTenureMonths={initT}
          initialFee={initF}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (20% Down, 5 Yrs)</h3>
            <CalculatorInstance
              id="comp1"
              initialPrice={initP}
              initialDownPaymentPercent={initDP}
              initialRate={initR}
              initialTenureMonths={initT}
              initialFee={initF}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (30% Down, 4 Yrs)</h3>
            <CalculatorInstance
              id="comp2"
              initialPrice={initP}
              initialDownPaymentPercent={30}
              initialRate={initR - 0.25}
              initialTenureMonths={48}
              initialFee={initF}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CarLoanCalculator;
