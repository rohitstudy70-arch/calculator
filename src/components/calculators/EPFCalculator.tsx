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
import { calculateEPF, generateEPFYearlyBreakdown, EPFInput } from '@/lib/calculators/epf';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';
import { RATES } from '@/config/rates';

const EPFPieChart = dynamic(() => import('@/components/charts/EPFPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialSalary = 35000,
  initialAge = 25,
  initialRetirementAge = 58,
  initialGrowth = 5,
  initialBalance = 0,
}: {
  id: string;
  initialSalary?: number;
  initialAge?: number;
  initialRetirementAge?: number;
  initialGrowth?: number;
  initialBalance?: number;
}) {
  const [salary, setSalary] = useState(initialSalary);
  const [age, setAge] = useState(initialAge);
  const [retirementAge, setRetirementAge] = useState(initialRetirementAge);
  const [growth, setGrowth] = useState(initialGrowth);
  const [balance, setBalance] = useState(initialBalance);
  const [interestRate, setInterestRate] = useState<number>(RATES.epf.interestRate.value);

  const input: EPFInput = useMemo(
    () => ({
      monthlyBasicSalary: salary,
      currentAge: age,
      retirementAge,
      annualSalaryGrowthPercent: growth,
      epfInterestRate: interestRate,
      currentEPFBalance: balance,
    }),
    [salary, age, retirementAge, growth, interestRate, balance]
  );

  const result = useMemo(() => calculateEPF(input), [input]);
  const breakdown = useMemo(() => generateEPFYearlyBreakdown(input), [input]);

  const tableHeaders = ['Year', 'Age', 'Monthly Basic', 'Employee Contrib (12%)', 'Employer EPF (3.67%)', 'Interest Earned', 'Closing Balance'];
  const tableData = useMemo(
    () =>
      breakdown.map((row) => [
        `Year ${row.year}`,
        `${row.age} yrs`,
        formatINR(row.monthlySalary),
        formatINR(row.annualEmployeeContrib),
        formatINR(row.annualEmployerContrib),
        formatINR(row.interestEarned),
        formatINR(row.closingBalance),
      ]),
    [breakdown]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'EPF Retirement Corpus Report',
      [
        { label: 'Monthly Basic Salary', value: formatINR(salary) },
        { label: 'Current Age', value: `${age} years` },
        { label: 'Retirement Age', value: `${retirementAge} years` },
        { label: 'Annual Salary Growth', value: `${growth}%` },
        { label: 'EPF Interest Rate', value: `${interestRate}%` },
        { label: 'Total Employee Contribution', value: formatINR(result.totalEmployeeContribution) },
        { label: 'Total Employer Contribution', value: formatINR(result.totalEmployerContribution) },
        { label: 'Total Interest Earned', value: formatINR(result.totalInterestEarned) },
        { label: 'Total EPF Maturity Corpus', value: formatINR(result.totalCorpus) },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'EPF_Yearly_Schedule');
  };

  const shareUrl = generateShareableLink('/epf-calculator', {
    s: salary,
    a: age,
    r: retirementAge,
    g: growth,
    b: balance,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Monthly Basic Salary + DA"
            value={salary}
            onChange={setSalary}
            min={5000}
            max={500000}
            step={1000}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Current Age"
            value={age}
            onChange={setAge}
            min={18}
            max={57}
            step={1}
            suffix=" Yrs"
          />
          <InputGroup
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={age + 1}
            max={70}
            step={1}
            suffix=" Yrs"
          />
          <InputGroup
            label="Expected Annual Salary Hike"
            value={growth}
            onChange={setGrowth}
            min={0}
            max={25}
            step={0.5}
            suffix="%"
          />
          <InputGroup
            label="EPF Interest Rate (Official Rate)"
            value={interestRate}
            onChange={setInterestRate}
            min={5}
            max={12}
            step={0.05}
            suffix="%"
          />
          <InputGroup
            label="Existing EPF Balance (Optional)"
            value={balance}
            onChange={setBalance}
            min={0}
            max={5000000}
            step={10000}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          <DisclaimerNote sourceNote="EPFO statutory interest rate is 8.25% p.a. (FY 2023-24/2024-25/2025-26)." />

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
            title="EPF Retirement Corpus Summary"
            items={[
              { label: 'Total EPF Corpus', value: formatINR(result.totalCorpus), highlight: true, color: '#1E40AF' },
              { label: 'Total Interest Earned', value: formatINR(result.totalInterestEarned), highlight: true, color: '#059669' },
              { label: 'Employee Contribution (12%)', value: formatINR(result.totalEmployeeContribution) },
              { label: 'Employer Contribution (3.67%)', value: formatINR(result.totalEmployerContribution) },
            ]}
          />

          <ChartWrapper title="Corpus Wealth Breakup" height={300}>
            <EPFPieChart
              employeeContribution={result.totalEmployeeContribution}
              employerContribution={result.totalEmployerContribution}
              totalInterest={result.totalInterestEarned}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Yearly Schedule Table */}
      <div className="mt-8">
        <DataTable
          caption="Year-by-Year EPF Balance Accumulation Schedule"
          headers={tableHeaders}
          data={tableData}
          highlightLastRow={true}
        />
      </div>
    </div>
  );
}

export function EPFCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initS = searchParams.get('s') ? Number(searchParams.get('s')) : 35000;
  const initA = searchParams.get('a') ? Number(searchParams.get('a')) : 25;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 58;
  const initG = searchParams.get('g') ? Number(searchParams.get('g')) : 5;
  const initB = searchParams.get('b') ? Number(searchParams.get('b')) : 0;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialSalary={initS}
          initialAge={initA}
          initialRetirementAge={initR}
          initialGrowth={initG}
          initialBalance={initB}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (Current Plan)</h3>
            <CalculatorInstance
              id="comp1"
              initialSalary={initS}
              initialAge={initA}
              initialRetirementAge={initR}
              initialGrowth={initG}
              initialBalance={initB}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (Higher Salary Hike / VPF)</h3>
            <CalculatorInstance
              id="comp2"
              initialSalary={initS}
              initialAge={initA}
              initialRetirementAge={initR}
              initialGrowth={initG + 3}
              initialBalance={initB}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EPFCalculator;
