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
  calculateBMR,
  BMRInput,
  BMRFormula,
} from '@/lib/calculators/bmr';
import { Gender, UnitSystem } from '@/lib/calculators/bmi';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const BMRComparisonChart = dynamic(() => import('@/components/charts/BMRComparisonChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

function CalculatorInstance({
  id,
  initialGender = 'male',
  initialAge = 30,
  initialUnit = 'metric',
  initialCm = 175,
  initialKg = 70,
  initialFeet = 5,
  initialInches = 9,
  initialLbs = 154,
  initialBf = 18,
  initialFormula = 'mifflin_st_jeor',
}: {
  id: string;
  initialGender?: Gender;
  initialAge?: number;
  initialUnit?: UnitSystem;
  initialCm?: number;
  initialKg?: number;
  initialFeet?: number;
  initialInches?: number;
  initialLbs?: number;
  initialBf?: number;
  initialFormula?: BMRFormula;
}) {
  const [gender, setGender] = useState<Gender>(initialGender);
  const [age, setAge] = useState(initialAge);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(initialUnit);
  const [heightCm, setHeightCm] = useState(initialCm);
  const [weightKg, setWeightKg] = useState(initialKg);
  const [heightFeet, setHeightFeet] = useState(initialFeet);
  const [heightInches, setHeightInches] = useState(initialInches);
  const [weightLbs, setWeightLbs] = useState(initialLbs);
  const [bodyFatPercent, setBodyFatPercent] = useState(initialBf);
  const [formula, setFormula] = useState<BMRFormula>(initialFormula);

  const input: BMRInput = useMemo(
    () => ({
      gender,
      age,
      unitSystem,
      heightCm,
      weightKg,
      heightFeet,
      heightInches,
      weightLbs,
      bodyFatPercent,
      formula,
    }),
    [gender, age, unitSystem, heightCm, weightKg, heightFeet, heightInches, weightLbs, bodyFatPercent, formula]
  );

  const result = useMemo(() => calculateBMR(input), [input]);

  const tableHeaders = ['BMR Formula', 'Calculated Daily Calorie Burn', 'Hourly Resting Burn', 'Clinical Application'];
  const tableData = useMemo(
    () => [
      ['Mifflin-St Jeor (Recommended)', `${result.mifflinStJeor} kcal/day`, `${(result.mifflinStJeor / 24).toFixed(1)} kcal/hr`, 'Gold standard for general populations'],
      ['Revised Harris-Benedict (1984)', `${result.harrisBenedict} kcal/day`, `${(result.harrisBenedict / 24).toFixed(1)} kcal/hr`, 'Classic clinical metabolic formula'],
      [
        'Katch-McArdle (LBM)',
        result.katchMcardle ? `${result.katchMcardle} kcal/day` : 'Enter body fat %',
        result.katchMcardle ? `${(result.katchMcardle / 24).toFixed(1)} kcal/hr` : '—',
        'Based on lean body mass (best for athletes)',
      ],
    ],
    [result]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Basal Metabolic Rate (BMR) Assessment Report',
      [
        { label: 'Gender', value: gender.toUpperCase() },
        { label: 'Age', value: `${age} Years` },
        { label: 'Height', value: unitSystem === 'metric' ? `${heightCm} cm` : `${heightFeet} ft ${heightInches} in` },
        { label: 'Weight', value: unitSystem === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs (${result.weightKg} kg)` },
        { label: 'Primary Formula BMR', value: `${result.primaryBMR} kcal/day` },
        { label: 'Hourly Resting Burn', value: `${result.hourlyRestingCalories} kcal/hour` },
        { label: 'Mifflin-St Jeor BMR', value: `${result.mifflinStJeor} kcal/day` },
        { label: 'Harris-Benedict BMR', value: `${result.harrisBenedict} kcal/day` },
        { label: 'Katch-McArdle BMR', value: result.katchMcardle ? `${result.katchMcardle} kcal/day` : 'N/A' },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'BMR_Metabolic_Rate_Report');
  };

  const shareUrl = generateShareableLink('/bmr-calculator', {
    g: gender,
    a: age,
    u: unitSystem,
    cm: heightCm,
    kg: weightKg,
    bf: bodyFatPercent,
    f: formula,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Gender & Unit selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Biological Gender
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    gender === 'male'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    gender === 'female'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Unit System
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setUnitSystem('metric')}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    unitSystem === 'metric'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  Metric
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem('imperial')}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    unitSystem === 'imperial'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  Imperial
                </button>
              </div>
            </div>
          </div>

          <InputGroup
            label="Age (Years)"
            value={age}
            onChange={setAge}
            min={15}
            max={90}
            step={1}
            suffix=" Yrs"
          />

          {unitSystem === 'metric' ? (
            <>
              <InputGroup
                label="Height (Centimeters)"
                value={heightCm}
                onChange={setHeightCm}
                min={100}
                max={230}
                step={1}
                suffix=" cm"
              />
              <InputGroup
                label="Weight (Kilograms)"
                value={weightKg}
                onChange={setWeightKg}
                min={30}
                max={220}
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
                min={66}
                max={480}
                step={1}
                suffix=" lbs"
              />
            </>
          )}

          <InputGroup
            label="Body Fat % (Optional, for Katch-McArdle formula)"
            value={bodyFatPercent}
            onChange={setBodyFatPercent}
            min={5}
            max={50}
            step={1}
            suffix="%"
          />

          <DisclaimerNote
            type="health"
            sourceNote="BMR represents resting calories only. Multiply by your activity factor (1.2 to 1.9) to find total daily burn."
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
            title="Basal Metabolic Rate (BMR)"
            items={[
              { label: 'Daily BMR Calories', value: `${result.primaryBMR} kcal`, highlight: true, color: '#1E40AF' },
              { label: 'Hourly Resting Burn', value: `${result.hourlyRestingCalories} kcal/hr`, highlight: true, color: '#D97706' },
              { label: 'Mifflin-St Jeor', value: `${result.mifflinStJeor} kcal` },
              { label: 'Harris-Benedict', value: `${result.harrisBenedict} kcal` },
              { label: 'Katch-McArdle', value: result.katchMcardle ? `${result.katchMcardle} kcal` : 'N/A' },
              { label: 'Lean Body Mass', value: result.leanBodyMassKg ? `${result.leanBodyMassKg} kg` : 'N/A' },
            ]}
          />

          <ChartWrapper title="Clinical Formula Comparison (Daily Rest Calories)">
            <BMRComparisonChart
              mifflin={result.mifflinStJeor}
              harris={result.harrisBenedict}
              katch={result.katchMcardle}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Amortization Table */}
      <div className="w-full">
        <DataTable
          caption="Clinical BMR Equation Comparison"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function BMRCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initG = (searchParams.get('g') as Gender) || 'male';
  const initA = searchParams.get('a') ? Number(searchParams.get('a')) : 30;
  const initU = (searchParams.get('u') as UnitSystem) || 'metric';
  const initCm = searchParams.get('cm') ? Number(searchParams.get('cm')) : 175;
  const initKg = searchParams.get('kg') ? Number(searchParams.get('kg')) : 70;
  const initBf = searchParams.get('bf') ? Number(searchParams.get('bf')) : 18;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialGender={initG}
          initialAge={initA}
          initialUnit={initU}
          initialCm={initCm}
          initialKg={initKg}
          initialBf={initBf}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Profile 1 (Current Weight {initKg} kg)</h3>
            <CalculatorInstance
              id="comp1"
              initialGender={initG}
              initialAge={initA}
              initialUnit={initU}
              initialCm={initCm}
              initialKg={initKg}
              initialBf={initBf}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Profile 2 (Target Weight / Muscle Gain)</h3>
            <CalculatorInstance
              id="comp2"
              initialGender={initG}
              initialAge={initA}
              initialUnit={initU}
              initialCm={initCm}
              initialKg={initKg + 5}
              initialBf={initBf - 3}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BMRCalculator;
