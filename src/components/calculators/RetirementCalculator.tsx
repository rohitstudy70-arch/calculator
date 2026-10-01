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
  calculateRetirement,
  generateRetirementTimeline,
  RetirementInput,
} from '@/lib/calculators/retirement';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const RetirementTimelineChart = dynamic(() => import('@/components/charts/RetirementTimelineChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialAge = 30,
  initialRetAge = 60,
  initialLifeExp = 85,
  initialExpenses = 50000,
  initialInf = 6.0,
  initialPreRet = 12.0,
  initialPostRet = 7.0,
  initialSavings = 500000,
}: {
  id: string;
  initialAge?: number;
  initialRetAge?: number;
  initialLifeExp?: number;
  initialExpenses?: number;
  initialInf?: number;
  initialPreRet?: number;
  initialPostRet?: number;
  initialSavings?: number;
}) {
  const [currentAge, setCurrentAge] = useState(initialAge);
  const [retirementAge, setRetirementAge] = useState(initialRetAge);
  const [lifeExpectancyYears, setLifeExpectancyYears] = useState(initialLifeExp);
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState(initialExpenses);
  const [inflationRate, setInflationRate] = useState(initialInf);
  const [preRetirementReturnRate, setPreRetirementReturnRate] = useState(initialPreRet);
  const [postRetirementReturnRate, setPostRetirementReturnRate] = useState(initialPostRet);
  const [existingRetirementSavings, setExistingRetirementSavings] = useState(initialSavings);

  const input: RetirementInput = useMemo(
    () => ({
      currentAge,
      retirementAge,
      lifeExpectancyYears,
      currentMonthlyExpenses,
      inflationRate,
      preRetirementReturnRate,
      postRetirementReturnRate,
      existingRetirementSavings,
    }),
    [
      currentAge,
      retirementAge,
      lifeExpectancyYears,
      currentMonthlyExpenses,
      inflationRate,
      preRetirementReturnRate,
      postRetirementReturnRate,
      existingRetirementSavings,
    ]
  );

  const result = useMemo(() => calculateRetirement(input), [input]);
  const timeline = useMemo(() => generateRetirementTimeline(input), [input]);

  const tableHeaders = ['Age', 'Phase', 'Annual Expenses', 'Corpus Balance', 'Annual SIP Contribution'];
  const tableData = useMemo(
    () =>
      timeline.map((row) => [
        `Age ${row.age}`,
        row.phase,
        formatINR(row.annualExpenses),
        formatINR(row.corpusBalance),
        row.annualSIPContribution > 0 ? formatINR(row.annualSIPContribution) : '—',
      ]),
    [timeline]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Retirement Financial Freedom & Corpus Planning Report',
      [
        { label: 'Current Age', value: `${currentAge} Years` },
        { label: 'Retirement Age', value: `${retirementAge} Years (${result.yearsToRetirement} yrs to retire)` },
        { label: 'Life Expectancy', value: `${lifeExpectancyYears} Years (${result.yearsInRetirement} yrs in retirement)` },
        { label: 'Current Monthly Expenses', value: formatINR(currentMonthlyExpenses) },
        { label: 'Future Monthly Expense at Retirement', value: formatINR(result.monthlyExpenseAtRetirement) },
        { label: 'Required Retirement Corpus', value: formatINR(result.requiredRetirementCorpus) },
        { label: 'Future Value of Existing Savings', value: formatINR(result.futureValueOfExistingSavings) },
        { label: 'Net Corpus Gap to Fund', value: formatINR(result.netAdditionalCorpusNeeded) },
        { label: 'Required Monthly SIP Today', value: formatINR(result.monthlySIPRequired) },
        { label: 'Post-Retirement Real Rate', value: `${result.realReturnRatePostRetirement}%` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Retirement_Corpus_Amortization_Timeline');
  };

  const shareUrl = generateShareableLink('/retirement-calculator', {
    ca: currentAge,
    ra: retirementAge,
    le: lifeExpectancyYears,
    exp: currentMonthlyExpenses,
    inf: inflationRate,
    pre: preRetirementReturnRate,
    post: postRetirementReturnRate,
    sav: existingRetirementSavings,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup
              label="Current Age"
              value={currentAge}
              onChange={setCurrentAge}
              min={18}
              max={70}
              step={1}
              suffix=" Yrs"
            />
            <InputGroup
              label="Desired Retirement Age"
              value={retirementAge}
              onChange={setRetirementAge}
              min={Math.max(30, currentAge + 1)}
              max={80}
              step={1}
              suffix=" Yrs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup
              label="Life Expectancy"
              value={lifeExpectancyYears}
              onChange={setLifeExpectancyYears}
              min={Math.max(70, retirementAge + 1)}
              max={100}
              step={1}
              suffix=" Yrs"
            />
            <InputGroup
              label="Inflation Rate (% p.a.)"
              value={inflationRate}
              onChange={setInflationRate}
              min={3.0}
              max={15.0}
              step={0.5}
              suffix="%"
            />
          </div>

          <InputGroup
            label="Current Monthly Living Expenses"
            value={currentMonthlyExpenses}
            onChange={setCurrentMonthlyExpenses}
            min={10000}
            max={1000000}
            step={5000}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          <InputGroup
            label="Existing Retirement Savings / EPF / NPS"
            value={existingRetirementSavings}
            onChange={setExistingRetirementSavings}
            min={0}
            max={50000000}
            step={50000}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup
              label="Pre-Retirement Return (%)"
              value={preRetirementReturnRate}
              onChange={setPreRetirementReturnRate}
              min={6.0}
              max={20.0}
              step={0.5}
              suffix="%"
            />
            <InputGroup
              label="Post-Retirement Return (%)"
              value={postRetirementReturnRate}
              onChange={setPostRetirementReturnRate}
              min={4.0}
              max={12.0}
              step={0.5}
              suffix="%"
            />
          </div>

          <DisclaimerNote sourceNote="Retirement estimates assume uninterrupted SIPs and annual compounding until the chosen life expectancy." />

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
            title="Retirement Corpus Summary"
            items={[
              { label: 'Required Target Corpus', value: formatINR(result.requiredRetirementCorpus), highlight: true, color: '#1E40AF' },
              { label: 'Monthly SIP Needed Today', value: formatINR(result.monthlySIPRequired), highlight: true, color: '#16A34A' },
              { label: 'Future Monthly Expense', value: formatINR(result.monthlyExpenseAtRetirement) },
              { label: 'Existing Savings at Retirement', value: formatINR(result.futureValueOfExistingSavings) },
              { label: 'Years to Retirement', value: `${result.yearsToRetirement} Years` },
              { label: 'Years in Retirement', value: `${result.yearsInRetirement} Years` },
            ]}
          />

          <ChartWrapper title="Retirement Wealth Timeline: Accumulation & Distribution">
            <RetirementTimelineChart data={timeline} />
          </ChartWrapper>
        </div>
      </div>

      {/* Amortization Table */}
      <div className="w-full">
        <DataTable
          caption="Year-by-Year Lifetime Cashflow & Corpus Schedule"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function RetirementCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initAge = searchParams.get('ca') ? Number(searchParams.get('ca')) : 30;
  const initRetAge = searchParams.get('ra') ? Number(searchParams.get('ra')) : 60;
  const initLifeExp = searchParams.get('le') ? Number(searchParams.get('le')) : 85;
  const initExp = searchParams.get('exp') ? Number(searchParams.get('exp')) : 50000;
  const initInf = searchParams.get('inf') ? Number(searchParams.get('inf')) : 6.0;
  const initPre = searchParams.get('pre') ? Number(searchParams.get('pre')) : 12.0;
  const initPost = searchParams.get('post') ? Number(searchParams.get('post')) : 7.0;
  const initSav = searchParams.get('sav') ? Number(searchParams.get('sav')) : 500000;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialAge={initAge}
          initialRetAge={initRetAge}
          initialLifeExp={initLifeExp}
          initialExpenses={initExp}
          initialInf={initInf}
          initialPreRet={initPre}
          initialPostRet={initPost}
          initialSavings={initSav}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (Retire at 60)</h3>
            <CalculatorInstance
              id="comp1"
              initialAge={initAge}
              initialRetAge={initRetAge}
              initialLifeExp={initLifeExp}
              initialExpenses={initExp}
              initialInf={initInf}
              initialPreRet={initPre}
              initialPostRet={initPost}
              initialSavings={initSav}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (Early Retirement at 50)</h3>
            <CalculatorInstance
              id="comp2"
              initialAge={initAge}
              initialRetAge={50}
              initialLifeExp={initLifeExp}
              initialExpenses={initExp}
              initialInf={initInf}
              initialPreRet={initPre}
              initialPostRet={initPost}
              initialSavings={initSav}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RetirementCalculator;
