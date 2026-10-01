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
import { calculateNPS, generateNPSYearlyBreakdown, NPSInput } from '@/lib/calculators/nps';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';
import { RATES } from '@/config/rates';

const NPSPieChart = dynamic(() => import('@/components/charts/NPSPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialMonthly = 10000,
  initialAge = 30,
  initialRetirementAge = 60,
  initialReturn = 10,
  initialAnnuityPercent = 40,
}: {
  id: string;
  initialMonthly?: number;
  initialAge?: number;
  initialRetirementAge?: number;
  initialReturn?: number;
  initialAnnuityPercent?: number;
}) {
  const [monthly, setMonthly] = useState(initialMonthly);
  const [age, setAge] = useState(initialAge);
  const [retirementAge, setRetirementAge] = useState(initialRetirementAge);
  const [returnRate, setReturnRate] = useState(initialReturn);
  const [annuityPercent, setAnnuityPercent] = useState(initialAnnuityPercent);
  const [annuityRate, setAnnuityRate] = useState<number>(RATES.nps.defaultAnnuityReturnRate.value);

  const input: NPSInput = useMemo(
    () => ({
      monthlyInvestment: monthly,
      currentAge: age,
      retirementAge,
      expectedReturnRate: returnRate,
      annuityPercent,
      expectedAnnuityReturnRate: annuityRate,
    }),
    [monthly, age, retirementAge, returnRate, annuityPercent, annuityRate]
  );

  const result = useMemo(() => calculateNPS(input), [input]);
  const breakdown = useMemo(() => generateNPSYearlyBreakdown(input), [input]);

  const tableHeaders = ['Year', 'Age', 'Total Invested', 'Interest Earned', 'Accumulated Corpus'];
  const tableData = useMemo(
    () =>
      breakdown.map((row) => [
        `Year ${row.year}`,
        `${row.age} yrs`,
        formatINR(row.totalInvested),
        formatINR(row.interestEarned),
        formatINR(row.totalCorpus),
      ]),
    [breakdown]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'NPS Pension & Wealth Projection Report',
      [
        { label: 'Monthly Investment', value: formatINR(monthly) },
        { label: 'Current Age', value: `${age} years` },
        { label: 'Retirement Age', value: `${retirementAge} years` },
        { label: 'Expected Return', value: `${returnRate}% p.a.` },
        { label: 'Annuity Percentage', value: `${annuityPercent}%` },
        { label: 'Total Investment', value: formatINR(result.totalInvestment) },
        { label: 'Total Interest Earned', value: formatINR(result.totalInterestEarned) },
        { label: 'Total Maturity Corpus', value: formatINR(result.totalCorpus) },
        { label: 'Tax-Free Lumpsum (60%)', value: formatINR(result.lumpsumAmount) },
        { label: 'Annuity Reinvestment (40%)', value: formatINR(result.annuityAmount) },
        { label: 'Estimated Monthly Pension', value: formatINR(result.estimatedMonthlyPension) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'NPS_Accumulation_Schedule');
  };

  const shareUrl = generateShareableLink('/nps-calculator', {
    m: monthly,
    a: age,
    r: retirementAge,
    ret: returnRate,
    ann: annuityPercent,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Monthly Contribution"
            value={monthly}
            onChange={setMonthly}
            min={500}
            max={200000}
            step={500}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Current Age"
            value={age}
            onChange={setAge}
            min={18}
            max={59}
            step={1}
            suffix=" Yrs"
          />
          <InputGroup
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={age + 1}
            max={75}
            step={1}
            suffix=" Yrs"
          />
          <InputGroup
            label="Expected ROI (Return on Investment)"
            value={returnRate}
            onChange={setReturnRate}
            min={5}
            max={20}
            step={0.5}
            suffix="%"
          />
          <InputGroup
            label="Percentage Reinvested in Annuity"
            value={annuityPercent}
            onChange={setAnnuityPercent}
            min={40}
            max={100}
            step={5}
            suffix="%"
          />
          <InputGroup
            label="Expected Annuity Rate (Pension Yield)"
            value={annuityRate}
            onChange={setAnnuityRate}
            min={4}
            max={12}
            step={0.5}
            suffix="%"
          />

          <DisclaimerNote sourceNote="PFRDA mandates minimum 40% annuity purchase upon superannuation at age 60." />

          <div className="flex justify-end mt-2">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Results & Pie Chart */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            title="NPS Maturity & Pension Payout"
            items={[
              { label: 'Total Retirement Corpus', value: formatINR(result.totalCorpus), highlight: true, color: '#1E40AF' },
              { label: 'Est. Monthly Pension', value: formatINR(result.estimatedMonthlyPension), highlight: true, color: '#059669' },
              { label: 'Tax-Free Lumpsum (60%)', value: formatINR(result.lumpsumAmount) },
              { label: 'Annuity Corpus (40%)', value: formatINR(result.annuityAmount) },
              { label: 'Total Invested', value: formatINR(result.totalInvestment) },
              { label: 'Interest / Capital Gain', value: formatINR(result.totalInterestEarned) },
            ]}
          />

          <ChartWrapper title="Retirement Corpus Allocation" height={300}>
            <NPSPieChart
              totalInvestment={result.totalInvestment}
              totalInterest={result.totalInterestEarned}
              lumpsumAmount={result.lumpsumAmount}
              annuityAmount={result.annuityAmount}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Yearly Table */}
      <div className="mt-8">
        <DataTable
          caption="Yearly NPS Corpus Growth Breakdown"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function NPSCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initM = searchParams.get('m') ? Number(searchParams.get('m')) : 10000;
  const initA = searchParams.get('a') ? Number(searchParams.get('a')) : 30;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 60;
  const initRet = searchParams.get('ret') ? Number(searchParams.get('ret')) : 10;
  const initAnn = searchParams.get('ann') ? Number(searchParams.get('ann')) : 40;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialMonthly={initM}
          initialAge={initA}
          initialRetirementAge={initR}
          initialReturn={initRet}
          initialAnnuityPercent={initAnn}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (Moderate 10% Return)</h3>
            <CalculatorInstance
              id="comp1"
              initialMonthly={initM}
              initialAge={initA}
              initialRetirementAge={initR}
              initialReturn={initRet}
              initialAnnuityPercent={initAnn}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (Higher Equity 12% Return)</h3>
            <CalculatorInstance
              id="comp2"
              initialMonthly={initM}
              initialAge={initA}
              initialRetirementAge={initR}
              initialReturn={initRet + 2}
              initialAnnuityPercent={initAnn}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NPSCalculator;
