'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { InputGroup } from '@/components/ui/InputGroup';
import { ResultCard } from '@/components/ui/ResultCard';
import { ShareActions } from '@/components/ui/ShareActions';
import { CompareToggle } from '@/components/ui/CompareToggle';
import { ChartWrapper } from '@/components/ui/ChartWrapper';
import { DisclaimerNote } from '@/components/ui/DisclaimerNote';
import { calculateHRA, HRAInput } from '@/lib/calculators/hra';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const HRAPieChart = dynamic(() => import('@/components/charts/HRAPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[300px] w-full" />,
});

function CalculatorInstance({
  id,
  initialBasic = 50000,
  initialDA = 0,
  initialHRA = 20000,
  initialRent = 25000,
  initialMetro = true,
}: {
  id: string;
  initialBasic?: number;
  initialDA?: number;
  initialHRA?: number;
  initialRent?: number;
  initialMetro?: boolean;
}) {
  const [basic, setBasic] = useState(initialBasic);
  const [da, setDA] = useState(initialDA);
  const [hraReceived, setHraReceived] = useState(initialHRA);
  const [rentPaid, setRentPaid] = useState(initialRent);
  const [isMetro, setIsMetro] = useState(initialMetro);

  const input: HRAInput = useMemo(
    () => ({
      basicSalaryMonthly: basic,
      daMonthly: da,
      hraReceivedMonthly: hraReceived,
      rentPaidMonthly: rentPaid,
      isMetroCity: isMetro,
    }),
    [basic, da, hraReceived, rentPaid, isMetro]
  );

  const result = useMemo(() => calculateHRA(input), [input]);

  const summaryRows = [
    { label: 'Condition 1: Actual HRA Received', value: formatINR(result.actualHRAReceived / 12) + '/mo (' + formatINR(result.actualHRAReceived) + '/yr)' },
    { label: `Condition 2: ${isMetro ? '50%' : '40%'} of (Basic + DA)`, value: formatINR(result.cityLimitAmount / 12) + '/mo (' + formatINR(result.cityLimitAmount) + '/yr)' },
    { label: 'Condition 3: Rent Paid minus 10% of Basic', value: formatINR(result.rentExcessAmount / 12) + '/mo (' + formatINR(result.rentExcessAmount) + '/yr)' },
    { label: 'Exempt HRA (Lowest Limit)', value: formatINR(result.annualExemptHRA) + '/yr' },
    { label: 'Taxable HRA Added to Income', value: formatINR(result.annualTaxableHRA) + '/yr' },
  ];

  const handlePdfExport = () => {
    exportToPDF(
      'HRA Tax Exemption Report (Section 10(13A))',
      [
        { label: 'Monthly Basic Salary', value: formatINR(basic) },
        { label: 'Monthly DA', value: formatINR(da) },
        { label: 'Monthly HRA Received', value: formatINR(hraReceived) },
        { label: 'Monthly Rent Paid', value: formatINR(rentPaid) },
        { label: 'City Category', value: isMetro ? 'Metro (50%)' : 'Non-Metro (40%)' },
        { label: 'Annual Exempt HRA', value: formatINR(result.annualExemptHRA) },
        { label: 'Annual Taxable HRA', value: formatINR(result.annualTaxableHRA) },
        { label: 'Estimated Tax Saved (30% Bracket)', value: formatINR(result.estimatedTaxSavedAnnual) },
      ],
      ['Exemption Rule Parameter', 'Calculated Amount'],
      summaryRows.map((r) => [r.label, r.value])
    );
  };

  const handleExcelExport = () => {
    exportToExcel(
      ['Exemption Rule Parameter', 'Calculated Amount'],
      summaryRows.map((r) => [r.label, r.value]),
      'HRA_Exemption_Calculation'
    );
  };

  const shareUrl = generateShareableLink('/hra-calculator', {
    b: basic,
    da,
    h: hraReceived,
    r: rentPaid,
    m: isMetro ? 1 : 0,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <InputGroup
            label="Monthly Basic Salary"
            value={basic}
            onChange={setBasic}
            min={5000}
            max={500000}
            step={1000}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Monthly Dearness Allowance (DA)"
            value={da}
            onChange={setDA}
            min={0}
            max={100000}
            step={1000}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Monthly HRA Received"
            value={hraReceived}
            onChange={setHraReceived}
            min={0}
            max={200000}
            step={500}
            prefix="₹"
            formatValue={formatCompactINR}
          />
          <InputGroup
            label="Actual Monthly Rent Paid"
            value={rentPaid}
            onChange={setRentPaid}
            min={0}
            max={300000}
            step={500}
            prefix="₹"
            formatValue={formatCompactINR}
          />

          {/* City Type Toggle */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rented Property Location</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                  isMetro
                    ? 'bg-blue-50 border-blue-600 text-blue-800 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMetro(true)}
              >
                Metro City (50%)
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">Delhi, Mumbai, Kolkata, Chennai</span>
              </button>
              <button
                type="button"
                className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                  !isMetro
                    ? 'bg-blue-50 border-blue-600 text-blue-800 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMetro(false)}
              >
                Non-Metro City (40%)
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">Bengaluru, Pune, Hyderabad, etc.</span>
              </button>
            </div>
          </div>

          <DisclaimerNote sourceNote="HRA exemption under Section 10(13A) is eligible under the Old Tax Regime." />

          <div className="flex justify-end mt-2">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Summary & Breakdown */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            title="HRA Tax Exemption Result"
            items={[
              { label: 'Exempt HRA (Annual)', value: formatINR(result.annualExemptHRA), highlight: true, color: '#059669' },
              { label: 'Taxable HRA (Annual)', value: formatINR(result.annualTaxableHRA), highlight: result.annualTaxableHRA > 0, color: '#EF4444' },
              { label: 'Exempt HRA (Monthly)', value: formatINR(result.monthlyExemptHRA) },
              { label: 'Tax Saved Estimate', value: formatINR(result.estimatedTaxSavedAnnual) },
            ]}
          />

          {/* Applied Rule Highlight Banner */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-sm text-emerald-900 dark:text-emerald-200">
            <span className="font-bold block mb-1">Applied Exemption Rule:</span>
            {result.appliedLimitDescription}
          </div>

          <ChartWrapper title="HRA Taxability Split" height={260}>
            <HRAPieChart exemptHRA={result.annualExemptHRA} taxableHRA={result.annualTaxableHRA} />
          </ChartWrapper>
        </div>
      </div>
    </div>
  );
}

export function HRACalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initB = searchParams.get('b') ? Number(searchParams.get('b')) : 50000;
  const initDA = searchParams.get('da') ? Number(searchParams.get('da')) : 0;
  const initH = searchParams.get('h') ? Number(searchParams.get('h')) : 20000;
  const initR = searchParams.get('r') ? Number(searchParams.get('r')) : 25000;
  const initM = searchParams.get('m') !== '0';

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialBasic={initB}
          initialDA={initDA}
          initialHRA={initH}
          initialRent={initR}
          initialMetro={initM}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 1 (Current Rent)</h3>
            <CalculatorInstance
              id="comp1"
              initialBasic={initB}
              initialDA={initDA}
              initialHRA={initH}
              initialRent={initR}
              initialMetro={initM}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Scenario 2 (Higher Rent / Metro Move)</h3>
            <CalculatorInstance
              id="comp2"
              initialBasic={initB}
              initialDA={initDA}
              initialHRA={initH}
              initialRent={initR + 10000}
              initialMetro={initM}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HRACalculator;
