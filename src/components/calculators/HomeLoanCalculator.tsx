'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { InputGroup } from '@/components/ui/InputGroup';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { ChartWrapper } from '@/components/ui/ChartWrapper';
import { 
  calculateHomeLoan, 
  generateHomeLoanYearlySummary 
} from '@/lib/calculators/home-loan';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const HomeLoanPieChart = dynamic(() => import('@/components/charts/HomeLoanPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

export default function HomeLoanCalculator() {
  const searchParams = useSearchParams();
  const initProperty = Number(searchParams.get('p')) || 7500000;
  const initDownPayment = Number(searchParams.get('dp')) || 20;
  const initRate = Number(searchParams.get('r')) || 8.5;
  const initTenureYears = Number(searchParams.get('t')) || 20;
  const initProcessing = Number(searchParams.get('pf')) || 0.5;

  const [propertyValue, setPropertyValue] = useState(initProperty);
  const [downPaymentPercent, setDownPaymentPercent] = useState(initDownPayment);
  const [annualRate, setAnnualRate] = useState(initRate);
  const [tenureYears, setTenureYears] = useState(initTenureYears);
  const [processingFeePercent, setProcessingFeePercent] = useState(initProcessing);

  const input = useMemo(() => ({
    propertyValue,
    downPaymentPercent,
    annualRate,
    tenureMonths: tenureYears * 12,
    processingFeePercent
  }), [propertyValue, downPaymentPercent, annualRate, tenureYears, processingFeePercent]);

  const result = useMemo(() => calculateHomeLoan(input), [input]);
  const schedule = useMemo(() => generateHomeLoanYearlySummary(input), [input]);

  const tableHeaders = ['Year', 'Principal Paid', 'Interest Paid', 'Balance'];
  const tableData = useMemo(() => schedule.map(s => [
    s.year,
    formatINR(s.principalPaid),
    formatINR(s.interestPaid),
    formatINR(s.balance),
  ]), [schedule]);

  const handlePdfExport = () => {
    exportToPDF(
      'Home Loan Calculator Report',
      [
        { label: 'Property Value', value: formatINR(propertyValue) },
        { label: 'Loan Amount', value: formatINR(result.loanAmount) },
        { label: 'Interest Rate', value: `${annualRate}%` },
        { label: 'Tenure', value: `${tenureYears} years` },
        { label: 'Monthly EMI', value: formatINR(result.emi) },
        { label: 'Total Payment', value: formatINR(result.totalPayment) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'HomeLoan_Schedule');
  };

  const shareUrl = generateShareableLink('/home-loan-calculator', {
    p: propertyValue,
    dp: downPaymentPercent,
    r: annualRate,
    t: tenureYears,
    pf: processingFeePercent
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Property Value"
            value={propertyValue}
            onChange={setPropertyValue}
            min={1000000}
            max={100000000}
            step={100000}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Down Payment"
            value={downPaymentPercent}
            onChange={setDownPaymentPercent}
            min={0}
            max={90}
            step={1}
            suffix="%"
          />
          <InputGroup
            label="Interest Rate (p.a)"
            value={annualRate}
            onChange={setAnnualRate}
            min={1}
            max={20}
            step={0.1}
            suffix="%"
          />
          <InputGroup
            label="Tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={5}
            max={30}
            step={1}
            suffix=" Yr"
          />
          <InputGroup
            label="Processing Fee"
            value={processingFeePercent}
            onChange={setProcessingFeePercent}
            min={0}
            max={5}
            step={0.1}
            suffix="%"
          />
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <ResultCard label="Monthly EMI" value={formatINR(result.emi)} highlight />
            <ResultCard label="Loan Amount" value={formatINR(result.loanAmount)} />
            <ResultCard label="Down Payment" value={formatINR(result.downPayment)} />
            <ResultCard label="Total Interest" value={formatINR(result.totalInterest)} />
            <ResultCard label="Est. Stamp Duty (6%)" value={formatINR(result.stampDutyEstimate)} />
            <ResultCard label="Est. Registration (1%)" value={formatINR(result.registrationCharges)} />
            <ResultCard label="Tax Saving (80C, 1st yr)" value={formatINR(result.taxSaving80C)} />
            <ResultCard label="Tax Saving (24b, 1st yr)" value={formatINR(result.taxSaving24b)} />
          </div>

          <ChartWrapper title="Cost Breakdown">
            <div className="h-[300px]">
              <HomeLoanPieChart 
                principal={result.loanAmount} 
                totalInterest={result.totalInterest} 
                downPayment={result.downPayment} 
                otherCosts={result.processingFee + result.stampDutyEstimate + result.registrationCharges}
              />
            </div>
          </ChartWrapper>

          <ShareActions 
            shareUrl={shareUrl}
            title="My Home Loan Calculation"
            onDownloadPdf={handlePdfExport}
            onDownloadExcel={handleExcelExport}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Yearly Amortization Schedule</h3>
        <DataTable headers={tableHeaders} data={tableData} />
      </div>
    </div>
  );
}
