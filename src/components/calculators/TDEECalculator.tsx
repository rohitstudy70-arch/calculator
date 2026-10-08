'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { InputGroup } from '@/components/ui/InputGroup';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { CompareToggle } from '@/components/ui/CompareToggle';
import { DisclaimerNote } from '@/components/ui/DisclaimerNote';
import {
  calculateTDEE,
  TDEEInput,
  Gender,
  ActivityLevel,
  ACTIVITY_MULTIPLIERS,
} from '@/lib/calculators/tdee';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

function CalculatorInstance({
  id,
  initialGender = 'male',
  initialAge = 28,
  initialHeight = 172,
  initialWeight = 70,
  initialActivity = 'moderate',
  initialBodyFat = 0,
}: {
  id: string;
  initialGender?: Gender;
  initialAge?: number;
  initialHeight?: number;
  initialWeight?: number;
  initialActivity?: ActivityLevel;
  initialBodyFat?: number;
}) {
  const [gender, setGender] = useState<Gender>(initialGender);
  const [age, setAge] = useState<number>(initialAge);
  const [heightCm, setHeightCm] = useState<number>(initialHeight);
  const [weightKg, setWeightKg] = useState<number>(initialWeight);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(initialActivity);
  const [useBodyFat, setUseBodyFat] = useState<boolean>(initialBodyFat > 0);
  const [bodyFatPercent, setBodyFatPercent] = useState<number>(initialBodyFat || 18);
  const [selectedMacroTab, setSelectedMacroTab] = useState<'moderate' | 'low' | 'high'>('moderate');

  const input: TDEEInput = useMemo(
    () => ({
      gender,
      age,
      heightCm,
      weightKg,
      activityLevel,
      bodyFatPercent: useBodyFat && bodyFatPercent > 0 ? bodyFatPercent : undefined,
    }),
    [gender, age, heightCm, weightKg, activityLevel, useBodyFat, bodyFatPercent]
  );

  const result = useMemo(() => calculateTDEE(input), [input]);

  const activeMacro = useMemo(() => {
    if (selectedMacroTab === 'low') return result.macros.lowerCarb;
    if (selectedMacroTab === 'high') return result.macros.higherCarb;
    return result.macros.moderateCarb;
  }, [result, selectedMacroTab]);

  const tableHeaders = ['Goal / Strategy', 'Daily Target', 'Weekly Calorie Deficit/Surplus', 'Expected Rate of Change'];
  const tableData = useMemo(
    () => [
      ['Maintenance (Stay Same Weight)', `${result.calorieGoals.maintenance.toLocaleString('en-IN')} kcal/day`, '0 kcal', 'Maintain Current Weight'],
      ['Mild Fat Loss (-0.25 kg / wk)', `${result.calorieGoals.mildLoss.toLocaleString('en-IN')} kcal/day`, '-1,750 kcal/week', '-0.25 kg / week (Slow & steady)'],
      ['Standard Fat Loss (-0.5 kg / wk)', `${result.calorieGoals.weightLoss.toLocaleString('en-IN')} kcal/day`, '-3,500 kcal/week', '-0.50 kg / week (Recommended)'],
      ['Aggressive Cut (-1.0 kg / wk)', `${result.calorieGoals.extremeLoss.toLocaleString('en-IN')} kcal/day`, '-7,000 kcal/week', '-1.00 kg / week (Strict discipline)'],
      ['Lean Bulking (+0.25 kg / wk)', `${result.calorieGoals.mildGain.toLocaleString('en-IN')} kcal/day`, '+1,750 kcal/week', '+0.25 kg / week (Clean muscle gain)'],
      ['Muscle Mass Building (+0.5 kg / wk)', `${result.calorieGoals.muscleGain.toLocaleString('en-IN')} kcal/day`, '+3,500 kcal/week', '+0.50 kg / week (Hypertrophy bulk)'],
    ],
    [result]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'TDEE & Caloric Expenditure Fitness Report',
      [
        { label: 'Biological Sex', value: gender.toUpperCase() },
        { label: 'Age', value: `${age} years` },
        { label: 'Height', value: `${heightCm} cm` },
        { label: 'Weight', value: `${weightKg} kg` },
        { label: 'Activity Multiplier', value: `${result.activityLabel} (${result.activityMultiplier}x)` },
        { label: 'Basal Metabolic Rate (BMR)', value: `${result.bmr.toLocaleString('en-IN')} kcal/day` },
        { label: 'TDEE Maintenance Calories', value: `${result.tdee.toLocaleString('en-IN')} kcal/day` },
        { label: 'BMI Status', value: `${result.bmi} (${result.bmiCategory})` },
        { label: 'Healthy Weight Range', value: `${result.idealWeightKg.min} – ${result.idealWeightKg.max} kg` },
        { label: 'Weight Loss Target (-0.5kg/wk)', value: `${result.calorieGoals.weightLoss.toLocaleString('en-IN')} kcal/day` },
        { label: 'Lean Bulk Target (+0.25kg/wk)', value: `${result.calorieGoals.mildGain.toLocaleString('en-IN')} kcal/day` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(
      tableHeaders,
      tableData,
      'TDEE_Calorie_Expenditure_CalcMaster'
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🔥</span> Enter Physical Metrics
          </h2>

          {/* Gender Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Biological Sex
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2.5 px-4 rounded-xl font-semibold text-sm transition-all border ${
                  gender === 'male'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                👨 Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2.5 px-4 rounded-xl font-semibold text-sm transition-all border ${
                  gender === 'female'
                    ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-pink-400'
                }`}
              >
                👩 Female
              </button>
            </div>
          </div>

          {/* Age */}
          <InputGroup
            label="Age"
            value={age}
            onChange={setAge}
            min={15}
            max={100}
            step={1}
            suffix=" yrs"
          />

          {/* Weight */}
          <InputGroup
            label="Weight"
            value={weightKg}
            onChange={setWeightKg}
            min={30}
            max={250}
            step={0.5}
            suffix=" kg"
          />

          {/* Height */}
          <InputGroup
            label="Height"
            value={heightCm}
            onChange={setHeightCm}
            min={100}
            max={250}
            step={1}
            suffix=" cm"
          />

          {/* Activity Level Selector */}
          <div>
            <label
              htmlFor={`activity-${id}`}
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Daily Physical Activity Level
            </label>
            <select
              id={`activity-${id}`}
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {(Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[]).map((level) => (
                <option key={level} value={level}>
                  {ACTIVITY_MULTIPLIERS[level].label} ({ACTIVITY_MULTIPLIERS[level].multiplier}x)
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
              {ACTIVITY_MULTIPLIERS[activityLevel].description}
            </p>
          </div>

          {/* Optional Body Fat % */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor={`bodyfat-toggle-${id}`}
                className="text-xs font-semibold text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                Optional: Known Body Fat % (Katch-McArdle)
              </label>
              <input
                id={`bodyfat-toggle-${id}`}
                type="checkbox"
                checked={useBodyFat}
                onChange={(e) => setUseBodyFat(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
            </div>
            {useBodyFat && (
              <InputGroup
                label="Body Fat Percentage"
                value={bodyFatPercent}
                onChange={setBodyFatPercent}
                min={5}
                max={50}
                step={0.5}
                suffix="%"
              />
            )}
          </div>
        </div>

        {/* Right Column: Key Results & Goal Targets */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Hero Card: Maintenance Calories */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                  Daily Energy Expenditure (TDEE)
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {result.tdee.toLocaleString('en-IN')} <span className="text-xl font-normal text-blue-100">calories / day</span>
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  Energy required to strictly maintain current weight of {weightKg} kg.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 min-w-[140px]">
                <div className="text-xs uppercase tracking-wide text-blue-100 font-medium">BMR (At Rest)</div>
                <div className="text-2xl font-bold mt-0.5">{result.bmr.toLocaleString('en-IN')}</div>
                <div className="text-[11px] text-blue-200">kcal burned sleeping</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap gap-4 text-xs text-blue-100">
              <div>
                <span className="font-semibold text-white">BMI: </span> {result.bmi} ({result.bmiCategory})
              </div>
              <div>
                <span className="font-semibold text-white">Healthy Weight: </span> {result.idealWeightKg.min}–{result.idealWeightKg.max} kg
              </div>
              <div>
                <span className="font-semibold text-white">Activity: </span> {result.activityLabel}
              </div>
            </div>
          </div>

          {/* Goal Targets Grid */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🎯</span> Calorie Targets for Your Goal
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* Weight Loss */}
              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20">
                <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  Fat Loss (-0.5 kg/wk)
                </span>
                <div className="text-2xl font-bold text-emerald-950 dark:text-emerald-200 mt-1">
                  {result.calorieGoals.weightLoss.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-emerald-700 dark:text-emerald-400"> kcal</span>
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  Deficit: -500 kcal/day
                </div>
              </div>

              {/* Mild Loss */}
              <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/60 dark:bg-teal-950/20">
                <span className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
                  Mild Cut (-0.25 kg/wk)
                </span>
                <div className="text-2xl font-bold text-teal-950 dark:text-teal-200 mt-1">
                  {result.calorieGoals.mildLoss.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-teal-700 dark:text-teal-400"> kcal</span>
                </div>
                <div className="text-xs text-teal-600 dark:text-teal-400 mt-1">
                  Deficit: -250 kcal/day
                </div>
              </div>

              {/* Aggressive Loss */}
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20">
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                  Intense Cut (-1 kg/wk)
                </span>
                <div className="text-2xl font-bold text-amber-950 dark:text-amber-200 mt-1">
                  {result.calorieGoals.extremeLoss.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-amber-700 dark:text-amber-400"> kcal</span>
                </div>
                <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  Deficit: -1,000 kcal/day
                </div>
              </div>

              {/* Maintenance */}
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20">
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
                  Maintain Weight
                </span>
                <div className="text-2xl font-bold text-blue-950 dark:text-blue-200 mt-1">
                  {result.calorieGoals.maintenance.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-blue-700 dark:text-blue-400"> kcal</span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Zero deficit / surplus
                </div>
              </div>

              {/* Lean Bulk */}
              <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/60 dark:bg-indigo-950/20">
                <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-400">
                  Lean Bulk (+0.25 kg/wk)
                </span>
                <div className="text-2xl font-bold text-indigo-950 dark:text-indigo-200 mt-1">
                  {result.calorieGoals.mildGain.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-indigo-700 dark:text-indigo-400"> kcal</span>
                </div>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                  Surplus: +250 kcal/day
                </div>
              </div>

              {/* Muscle Gain */}
              <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/40 bg-purple-50/60 dark:bg-purple-950/20">
                <span className="text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-400">
                  Muscle Gain (+0.5 kg/wk)
                </span>
                <div className="text-2xl font-bold text-purple-950 dark:text-purple-200 mt-1">
                  {result.calorieGoals.muscleGain.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-purple-700 dark:text-purple-400"> kcal</span>
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  Surplus: +500 kcal/day
                </div>
              </div>
            </div>
          </div>

          {/* Macronutrient Distribution Split */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🥗</span> Daily Macro Split (Maintenance: {result.tdee} kcal)
              </h3>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSelectedMacroTab('moderate')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedMacroTab === 'moderate'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Balanced
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMacroTab('low')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedMacroTab === 'low'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Lower Carb
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMacroTab('high')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedMacroTab === 'high'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Higher Carb
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="text-xs uppercase font-semibold text-blue-600 dark:text-blue-400">Protein</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {activeMacro.proteinGrams} <span className="text-xs font-normal">g</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {(activeMacro.proteinGrams * 4).toLocaleString('en-IN')} kcal
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                <div className="text-xs uppercase font-semibold text-amber-600 dark:text-amber-400">Fats</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {activeMacro.fatGrams} <span className="text-xs font-normal">g</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {(activeMacro.fatGrams * 9).toLocaleString('en-IN')} kcal
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                <div className="text-xs uppercase font-semibold text-emerald-600 dark:text-emerald-400">Carbs</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {activeMacro.carbsGrams} <span className="text-xs font-normal">g</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {(activeMacro.carbsGrams * 4).toLocaleString('en-IN')} kcal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Strategies Table */}
      <DataTable
        caption="Comprehensive Calorie & Weight Target Schedule"
        headers={tableHeaders}
        data={tableData}
      />

      {/* Export Actions & Sharing */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <ShareActions
          title="Share TDEE Caloric Calculation"
          shareUrl={generateShareableLink('/tdee-calculator', {
            gender,
            age,
            height: heightCm,
            weight: weightKg,
            activity: activityLevel,
          })}
          onDownloadPdf={handlePdfExport}
          onDownloadExcel={handleExcelExport}
        />
      </div>

      <DisclaimerNote
        type="health"
        sourceNote="TDEE calculations utilize the Mifflin-St Jeor & Katch-McArdle equations. Consult a physician or sports dietitian before starting any aggressive caloric deficit."
      />
    </div>
  );
}

export function TDEECalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);

  // URL query params
  const paramGender = (searchParams.get('gender') as Gender) || 'male';
  const paramAge = Number(searchParams.get('age')) || 28;
  const paramHeight = Number(searchParams.get('height')) || 172;
  const paramWeight = Number(searchParams.get('weight')) || 70;
  const paramActivity = (searchParams.get('activity') as ActivityLevel) || 'moderate';

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <CompareToggle
          isComparing={isComparing}
          onToggle={setIsComparing}
        />
      </div>

      <div className={`grid grid-cols-1 ${isComparing ? 'xl:grid-cols-2 gap-10' : ''}`}>
        <CalculatorInstance
          id="primary"
          initialGender={paramGender}
          initialAge={paramAge}
          initialHeight={paramHeight}
          initialWeight={paramWeight}
          initialActivity={paramActivity}
        />

        {isComparing && (
          <div className="pt-8 xl:pt-0 border-t xl:border-t-0 xl:border-l xl:pl-10 border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Comparison Scenario
            </h3>
            <CalculatorInstance
              id="secondary"
              initialGender="male"
              initialAge={paramAge}
              initialHeight={paramHeight}
              initialWeight={Math.max(30, paramWeight - 5)}
              initialActivity="heavy"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TDEECalculator;
