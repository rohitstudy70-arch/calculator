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
  calculateBMI,
  BMIInput,
  UnitSystem,
} from '@/lib/calculators/bmi';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const BMIGaugeChart = dynamic(() => import('@/components/charts/BMIGaugeChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

function CalculatorInstance({
  id,
  initialUnit = 'metric',
  initialCm = 170,
  initialKg = 68,
  initialFeet = 5,
  initialInches = 7,
  initialLbs = 150,
}: {
  id: string;
  initialUnit?: UnitSystem;
  initialCm?: number;
  initialKg?: number;
  initialFeet?: number;
  initialInches?: number;
  initialLbs?: number;
}) {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(initialUnit);
  const [heightCm, setHeightCm] = useState(initialCm);
  const [weightKg, setWeightKg] = useState(initialKg);
  const [heightFeet, setHeightFeet] = useState(initialFeet);
  const [heightInches, setHeightInches] = useState(initialInches);
  const [weightLbs, setWeightLbs] = useState(initialLbs);

  const input: BMIInput = useMemo(
    () => ({
      unitSystem,
      heightCm,
      weightKg,
      heightFeet,
      heightInches,
      weightLbs,
    }),
    [unitSystem, heightCm, weightKg, heightFeet, heightInches, weightLbs]
  );

  const result = useMemo(() => calculateBMI(input), [input]);

  const tableHeaders = ['Classification Standard', 'Category Status', 'Healthy Weight Range (For Entered Height)', 'Cardiometabolic Risk'];
  const tableData = useMemo(
    () => [
      [
        'Asian-Indian (ICMR / WHO Asia)',
        result.asianCategory,
        `${result.asianHealthyWeightMinKg} kg – ${result.asianHealthyWeightMaxKg} kg`,
        result.bmi > 22.9 ? 'Elevated Visceral & Diabetes Risk' : 'Normal / Low Risk',
      ],
      [
        'WHO International Standard',
        result.whoCategory,
        `${result.whoHealthyWeightMinKg} kg – ${result.whoHealthyWeightMaxKg} kg`,
        result.bmi > 24.9 ? 'Overweight / Increased Risk' : 'Normal Reference Range',
      ],
    ],
    [result]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Body Mass Index (BMI) & Weight Status Report',
      [
        { label: 'Measurement Units', value: unitSystem.toUpperCase() },
        { label: 'Height', value: unitSystem === 'metric' ? `${heightCm} cm (${result.heightMeters} m)` : `${heightFeet} ft ${heightInches} in` },
        { label: 'Weight', value: unitSystem === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs (${result.weightKg} kg)` },
        { label: 'BMI (Body Mass Index)', value: `${result.bmi} kg/m²` },
        { label: 'Asian-Indian (ICMR) Status', value: result.asianCategory },
        { label: 'WHO International Status', value: result.whoCategory },
        { label: 'Asian Healthy Target Weight', value: `${result.asianHealthyWeightMinKg} – ${result.asianHealthyWeightMaxKg} kg` },
        { label: 'WHO Healthy Target Weight', value: `${result.whoHealthyWeightMinKg} – ${result.whoHealthyWeightMaxKg} kg` },
        { label: 'Weight Variance from Healthy Midpoint', value: `${result.weightDifferenceKg > 0 ? '+' : ''}${result.weightDifferenceKg} kg` },
        { label: 'Ponderal Index', value: `${result.ponderalIndex} kg/m³` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'BMI_Weight_Classification_Report');
  };

  const shareUrl = generateShareableLink('/bmi-calculator', {
    u: unitSystem,
    cm: heightCm,
    kg: weightKg,
    ft: heightFeet,
    in: heightInches,
    lbs: weightLbs,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Unit Toggle */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Measurement System
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUnitSystem('metric')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  unitSystem === 'metric'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Metric (Centimeters & Kilograms)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem('imperial')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  unitSystem === 'imperial'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                }`}
              >
                Imperial (Feet, Inches & Pounds)
              </button>
            </div>
          </div>

          {unitSystem === 'metric' ? (
            <>
              <InputGroup
                label="Height (Centimeters)"
                value={heightCm}
                onChange={setHeightCm}
                min={90}
                max={240}
                step={1}
                suffix=" cm"
              />
              <InputGroup
                label="Weight (Kilograms)"
                value={weightKg}
                onChange={setWeightKg}
                min={20}
                max={250}
                step={0.5}
                suffix=" kg"
              />
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <InputGroup
                  label="Height (Feet)"
                  value={heightFeet}
                  onChange={setHeightFeet}
                  min={3}
                  max={8}
                  step={1}
                  suffix=" ft"
                />
                <InputGroup
                  label="Height (Inches)"
                  value={heightInches}
                  onChange={setHeightInches}
                  min={0}
                  max={11}
                  step={1}
                  suffix=" in"
                />
              </div>
              <InputGroup
                label="Weight (Pounds)"
                value={weightLbs}
                onChange={setWeightLbs}
                min={44}
                max={550}
                step={1}
                suffix=" lbs"
              />
            </>
          )}

          <DisclaimerNote
            type="health"
            sourceNote="Asian-Indian cutoffs defined by ICMR-NIN & WHO Western Pacific/South-East Asia Regional Guidelines."
          />

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
            title="Body Mass Index (BMI) Summary"
            items={[
              { label: 'Your BMI Value', value: `${result.bmi} kg/m²`, highlight: true, color: '#1E40AF' },
              {
                label: 'Asian-Indian Category',
                value: result.asianCategory,
                highlight: true,
                color: result.bmi > 22.9 ? '#DC2626' : '#16A34A',
              },
              { label: 'WHO Category', value: result.whoCategory },
              { label: 'Asian Healthy Target Weight', value: `${result.asianHealthyWeightMinKg} – ${result.asianHealthyWeightMaxKg} kg` },
              { label: 'WHO Healthy Target Weight', value: `${result.whoHealthyWeightMinKg} – ${result.whoHealthyWeightMaxKg} kg` },
              { label: 'Variance from Healthy Midpoint', value: `${result.weightDifferenceKg > 0 ? '+' : ''}${result.weightDifferenceKg} kg` },
            ]}
          />

          <ChartWrapper title="BMI Scale Spectrum & Cutoff Indicators">
            <BMIGaugeChart bmi={result.bmi} />
          </ChartWrapper>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="w-full">
        <DataTable
          caption="WHO vs Asian-Indian Health Classification Comparison"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function BMICalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initU = (searchParams.get('u') as UnitSystem) || 'metric';
  const initCm = searchParams.get('cm') ? Number(searchParams.get('cm')) : 170;
  const initKg = searchParams.get('kg') ? Number(searchParams.get('kg')) : 68;
  const initFt = searchParams.get('ft') ? Number(searchParams.get('ft')) : 5;
  const initIn = searchParams.get('in') ? Number(searchParams.get('in')) : 7;
  const initLbs = searchParams.get('lbs') ? Number(searchParams.get('lbs')) : 150;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialUnit={initU}
          initialCm={initCm}
          initialKg={initKg}
          initialFeet={initFt}
          initialInches={initIn}
          initialLbs={initLbs}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Current Weight Profile</h3>
            <CalculatorInstance
              id="comp1"
              initialUnit={initU}
              initialCm={initCm}
              initialKg={initKg}
              initialFeet={initFt}
              initialInches={initIn}
              initialLbs={initLbs}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Target Goal Weight Profile</h3>
            <CalculatorInstance
              id="comp2"
              initialUnit={initU}
              initialCm={initCm}
              initialKg={Math.round(initKg * 0.9)}
              initialFeet={initFt}
              initialInches={initIn}
              initialLbs={Math.round(initLbs * 0.9)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
