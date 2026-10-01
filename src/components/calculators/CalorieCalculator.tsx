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
  calculateCalories,
  CalorieInput,
  ActivityLevel,
} from '@/lib/calculators/calorie';
import { Gender, UnitSystem } from '@/lib/calculators/bmi';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

const CalorieTargetChart = dynamic(() => import('@/components/charts/CalorieTargetChart'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-[240px] w-full" />,
});

function CalculatorInstance({
  id,
  initialGender = 'male',
  initialAge = 28,
  initialUnit = 'metric',
  initialCm = 175,
  initialKg = 72,
  initialFeet = 5,
  initialInches = 9,
  initialLbs = 158,
  initialActivity = 'moderately_active',
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
  initialActivity?: ActivityLevel;
}) {
  const [gender, setGender] = useState<Gender>(initialGender);
  const [age, setAge] = useState(initialAge);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(initialUnit);
  const [heightCm, setHeightCm] = useState(initialCm);
  const [weightKg, setWeightKg] = useState(initialKg);
  const [heightFeet, setHeightFeet] = useState(initialFeet);
  const [heightInches, setHeightInches] = useState(initialInches);
  const [weightLbs, setWeightLbs] = useState(initialLbs);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(initialActivity);

  const input: CalorieInput = useMemo(
    () => ({
      gender,
      age,
      unitSystem,
      heightCm,
      weightKg,
      heightFeet,
      heightInches,
      weightLbs,
      activityLevel,
    }),
    [gender, age, unitSystem, heightCm, weightKg, heightFeet, heightInches, weightLbs, activityLevel]
  );

  const result = useMemo(() => calculateCalories(input), [input]);

  const tableHeaders = ['Fitness Goal', 'Daily Calorie Target', 'Weekly Pace', 'Protein (g)', 'Carbs (g)', 'Fats (g)'];
  const tableData = useMemo(() => {
    const t = result.targets;
    return [
      ['Maintenance (No Weight Change)', `${t.maintenance.dailyCalories} kcal`, '0.0 kg/wk', `${t.maintenance.macros.balanced.proteinGrams}g`, `${t.maintenance.macros.balanced.carbsGrams}g`, `${t.maintenance.macros.balanced.fatGrams}g`],
      ['Mild Weight Loss (-250 kcal)', `${t.mildWeightLoss.dailyCalories} kcal`, '-0.25 kg/wk', `${t.mildWeightLoss.macros.balanced.proteinGrams}g`, `${t.mildWeightLoss.macros.balanced.carbsGrams}g`, `${t.mildWeightLoss.macros.balanced.fatGrams}g`],
      ['Steady Weight Loss (-500 kcal)', `${t.weightLoss.dailyCalories} kcal`, '-0.50 kg/wk', `${t.weightLoss.macros.balanced.proteinGrams}g`, `${t.weightLoss.macros.balanced.carbsGrams}g`, `${t.weightLoss.macros.balanced.fatGrams}g`],
      ['Accelerated Fat Loss (-1000 kcal)', `${t.extremeWeightLoss.dailyCalories} kcal`, '-1.0 kg/wk', `${t.extremeWeightLoss.macros.balanced.proteinGrams}g`, `${t.extremeWeightLoss.macros.balanced.carbsGrams}g`, `${t.extremeWeightLoss.macros.balanced.fatGrams}g`],
      ['Mild Weight Gain (+250 kcal)', `${t.mildWeightGain.dailyCalories} kcal`, '+0.25 kg/wk', `${t.mildWeightGain.macros.balanced.proteinGrams}g`, `${t.mildWeightGain.macros.balanced.carbsGrams}g`, `${t.mildWeightGain.macros.balanced.fatGrams}g`],
      ['Muscle Building (+500 kcal)', `${t.weightGain.dailyCalories} kcal`, '+0.50 kg/wk', `${t.weightGain.macros.balanced.proteinGrams}g`, `${t.weightGain.macros.balanced.carbsGrams}g`, `${t.weightGain.macros.balanced.fatGrams}g`],
    ];
  }, [result]);

  const handlePdfExport = () => {
    exportToPDF(
      'Daily Caloric Requirements & TDEE Target Report',
      [
        { label: 'Gender', value: gender.toUpperCase() },
        { label: 'Age', value: `${age} Years` },
        { label: 'Physical Activity Level', value: result.activityLevelLabel },
        { label: 'Basal Metabolic Rate (BMR)', value: `${result.bmr} kcal/day` },
        { label: 'Total Daily Energy Expenditure (TDEE)', value: `${result.tdee} kcal/day` },
        { label: 'Weight Loss Target (-500 kcal)', value: `${result.targets.weightLoss.dailyCalories} kcal/day` },
        { label: 'Weight Gain Target (+500 kcal)', value: `${result.targets.weightGain.dailyCalories} kcal/day` },
        { label: 'Safe Calorie Floor', value: `${result.safeFloor} kcal/day minimum` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Daily_Calorie_TDEE_Targets');
  };

  const shareUrl = generateShareableLink('/calorie-calculator', {
    g: gender,
    a: age,
    u: unitSystem,
    cm: heightCm,
    kg: weightKg,
    act: activityLevel,
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

          {/* Activity Level Selector */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Daily Physical Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedentary">Sedentary (Little or no exercise, desk job - 1.2x)</option>
              <option value="lightly_active">Lightly Active (Light exercise 1-3 days/week - 1.375x)</option>
              <option value="moderately_active">Moderately Active (Moderate workout 3-5 days/week - 1.55x)</option>
              <option value="very_active">Very Active (Hard exercise 6-7 days/week - 1.725x)</option>
              <option value="extra_active">Extra Active (Heavy physical job or 2x daily training - 1.9x)</option>
            </select>
          </div>

          <DisclaimerNote
            type="health"
            sourceNote={`Calorie intake should not drop below ${result.safeFloor} kcal/day without direct medical supervision.`}
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
            title="Total Daily Energy Expenditure (TDEE)"
            items={[
              { label: 'Maintain Current Weight', value: `${result.tdee} kcal`, highlight: true, color: '#1E40AF' },
              { label: 'Weight Loss (-0.5 kg/wk)', value: `${result.targets.weightLoss.dailyCalories} kcal`, highlight: true, color: '#DC2626' },
              { label: 'Mild Deficit (-0.25 kg/wk)', value: `${result.targets.mildWeightLoss.dailyCalories} kcal` },
              { label: 'Muscle Gain (+0.5 kg/wk)', value: `${result.targets.weightGain.dailyCalories} kcal` },
              { label: 'Basal Metabolic Rate (BMR)', value: `${result.bmr} kcal` },
              { label: 'Activity Multiplier', value: `${result.activityMultiplier}x` },
            ]}
          />

          <ChartWrapper title="Calorie Target Comparison Across Weight Goals">
            <CalorieTargetChart
              maintenance={result.tdee}
              weightLoss={result.targets.weightLoss.dailyCalories}
              mildLoss={result.targets.mildWeightLoss.dailyCalories}
              weightGain={result.targets.weightGain.dailyCalories}
            />
          </ChartWrapper>
        </div>
      </div>

      {/* Target Breakdown Table */}
      <div className="w-full">
        <DataTable
          caption="Daily Calorie Goals & Recommended Macronutrient Distributions (Balanced Split)"
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function CalorieCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initG = (searchParams.get('g') as Gender) || 'male';
  const initA = searchParams.get('a') ? Number(searchParams.get('a')) : 28;
  const initU = (searchParams.get('u') as UnitSystem) || 'metric';
  const initCm = searchParams.get('cm') ? Number(searchParams.get('cm')) : 175;
  const initKg = searchParams.get('kg') ? Number(searchParams.get('kg')) : 72;
  const initAct = (searchParams.get('act') as ActivityLevel) || 'moderately_active';

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
          initialActivity={initAct}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Current Activity Routine</h3>
            <CalculatorInstance
              id="comp1"
              initialGender={initG}
              initialAge={initA}
              initialUnit={initU}
              initialCm={initCm}
              initialKg={initKg}
              initialActivity={initAct}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Increased Activity / Higher Training</h3>
            <CalculatorInstance
              id="comp2"
              initialGender={initG}
              initialAge={initA}
              initialUnit={initU}
              initialCm={initCm}
              initialKg={initKg}
              initialActivity="very_active"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CalorieCalculator;
