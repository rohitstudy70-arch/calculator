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
  calculateBodyFat,
  BodyFatInput,
} from '@/lib/calculators/body-fat';
import { Gender, UnitSystem } from '@/lib/calculators/bmi';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const BodyFatPieChart = dynamic(() => import('@/components/charts/BodyFatPieChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

function CalculatorInstance({
  id,
  initialGender = 'male',
  initialAge = 30,
  initialUnit = 'metric',
  initialCm = 175,
  initialKg = 75,
  initialFeet = 5,
  initialInches = 9,
  initialLbs = 165,
  initialNeck = 38,
  initialWaist = 85,
  initialHip = 95,
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
  initialNeck?: number;
  initialWaist?: number;
  initialHip?: number;
}) {
  const [gender, setGender] = useState<Gender>(initialGender);
  const [age, setAge] = useState(initialAge);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(initialUnit);
  const [heightCm, setHeightCm] = useState(initialCm);
  const [weightKg, setWeightKg] = useState(initialKg);
  const [heightFeet, setHeightFeet] = useState(initialFeet);
  const [heightInches, setHeightInches] = useState(initialInches);
  const [weightLbs, setWeightLbs] = useState(initialLbs);
  const [neckCm, setNeckCm] = useState(initialNeck);
  const [waistCm, setWaistCm] = useState(initialWaist);
  const [hipCm, setHipCm] = useState(initialHip);

  const input: BodyFatInput = useMemo(
    () => ({
      gender,
      age,
      unitSystem,
      heightCm,
      weightKg,
      heightFeet,
      heightInches,
      weightLbs,
      neckCm,
      waistCm,
      hipCm,
      neckInches: unitSystem === 'imperial' ? parseFloat((neckCm / 2.54).toFixed(1)) : undefined,
      waistInches: unitSystem === 'imperial' ? parseFloat((waistCm / 2.54).toFixed(1)) : undefined,
      hipInches: unitSystem === 'imperial' ? parseFloat((hipCm / 2.54).toFixed(1)) : undefined,
    }),
    [gender, age, unitSystem, heightCm, weightKg, heightFeet, heightInches, weightLbs, neckCm, waistCm, hipCm]
  );

  const result = useMemo(() => calculateBodyFat(input), [input]);

  const tableHeaders = ['Body Composition Metric', 'Value', 'Reference / Target Range'];
  const tableData = useMemo(
    () => [
      ['Estimated Body Fat %', `${result.bodyFatPercentage}%`, `${result.idealBodyFatMin}% – ${result.idealBodyFatMax}% (Healthy Target)`],
      ['ACE Classification Category', result.category, 'Fitness / Athletic Tier'],
      ['Fat Mass Weight', `${result.fatMassKg} kg`, 'Essential storage & visceral fat'],
      ['Lean Body Mass (LBM)', `${result.leanMassKg} kg`, 'Muscle, bone, water, and organs'],
      [
        'Excess Fat to Reach Ideal Boundary',
        result.fatToLoseForIdealKg > 0 ? `${result.fatToLoseForIdealKg} kg` : 'Within Ideal Boundary',
        `Targeting ${result.idealBodyFatMax}% maximum body fat`,
      ],
    ],
    [result]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'US Navy Body Fat & Composition Analysis Report',
      [
        { label: 'Gender', value: gender.toUpperCase() },
        { label: 'Age', value: `${age} Years` },
        { label: 'Body Fat Percentage', value: `${result.bodyFatPercentage}%` },
        { label: 'ACE Body Fat Category', value: result.category },
        { label: 'Lean Muscle Mass', value: `${result.leanMassKg} kg` },
        { label: 'Total Fat Mass', value: `${result.fatMassKg} kg` },
        { label: 'Ideal Body Fat Target', value: `${result.idealBodyFatMin}% – ${result.idealBodyFatMax}%` },
        { label: 'Fat Mass to Lose for Target', value: result.fatToLoseForIdealKg > 0 ? `${result.fatToLoseForIdealKg} kg` : '0 kg' },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Body_Fat_Composition_Report');
  };

  const shareUrl = generateShareableLink('/body-fat-calculator', {
    g: gender,
    a: age,
    u: unitSystem,
    cm: heightCm,
    kg: weightKg,
    n: neckCm,
    w: waistCm,
    h: hipCm,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
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
            label="Neck Circumference (Just below Adam's apple)"
            value={neckCm}
            onChange={setNeckCm}
            min={25}
            max={65}
            step={0.5}
            suffix=" cm"
          />

          <InputGroup
            label={gender === 'male' ? 'Waist Circumference (At navel level)' : 'Waist Circumference (Narrowest natural waist)'}
            value={waistCm}
            onChange={setWaistCm}
            min={50}
            max={160}
            step={0.5}
            suffix=" cm"
          />

          {gender === 'female' && (
            <InputGroup
              label="Hip Circumference (Widest point of buttocks)"
              value={hipCm}
              onChange={setHipCm}
              min={60}
              max={180}
              step={0.5}
              suffix=" cm"
            />
          )}

          <DisclaimerNote
            type="health"
            sourceNote="The US Navy method provides a validated estimation (±3-4% margin of error compared to clinical DEXA scans)."
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
            title="Body Composition Summary"
            items={[
              { label: 'Body Fat Percentage', value: `${result.bodyFatPercentage}%`, highlight: true, color: '#D97706' },
              { label: 'Body Fat Category', value: result.category, highlight: true, color: '#1E40AF' },
              { label: 'Lean Body Mass (LBM)', value: `${result.leanMassKg} kg` },
              { label: 'Total Fat Mass', value: `${result.fatMassKg} kg` },
              { label: 'Target Range', value: `${result.idealBodyFatMin}% – ${result.idealBodyFatMax}%` },
              { label: 'Excess Fat to Ideal', value: `${result.fatToLoseForIdealKg} kg` },
            ]}
          />

          <ChartWrapper title="Body Composition Breakdown (Lean Mass vs Fat Mass)">
            <BodyFatPieChart fatMassKg={result.fatMassKg} leanMassKg={result.leanMassKg} />
          </ChartWrapper>
        </div>
      </div>

      {/* Amortization Table */}
      <div className="w-full">
        <DataTable
          caption="Detailed Body Composition Metrics"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function BodyFatCalculator() {
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
  const initKg = searchParams.get('kg') ? Number(searchParams.get('kg')) : 75;
  const initN = searchParams.get('n') ? Number(searchParams.get('n')) : 38;
  const initW = searchParams.get('w') ? Number(searchParams.get('w')) : 85;
  const initH = searchParams.get('h') ? Number(searchParams.get('h')) : 95;

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
          initialNeck={initN}
          initialWaist={initW}
          initialHip={initH}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Current Measurements</h3>
            <CalculatorInstance
              id="comp1"
              initialGender={initG}
              initialAge={initA}
              initialUnit={initU}
              initialCm={initCm}
              initialKg={initKg}
              initialNeck={initN}
              initialWaist={initW}
              initialHip={initH}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Target Goal (-4 cm Waist)</h3>
            <CalculatorInstance
              id="comp2"
              initialGender={initG}
              initialAge={initA}
              initialUnit={initU}
              initialCm={initCm}
              initialKg={initKg - 3}
              initialNeck={initN}
              initialWaist={initW - 4}
              initialHip={initH - 3}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BodyFatCalculator;
