'use client';

import React from 'react';

interface BMIGaugeChartProps {
  bmi: number;
}

export default function BMIGaugeChart({ bmi }: BMIGaugeChartProps) {
  // Clamp display between 12 and 42
  const minBMI = 12;
  const maxBMI = 42;
  const clampedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
  const positionPercent = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;

  return (
    <div className="w-full flex flex-col gap-6 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">BMI Scale Visualizer</span>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Current: {bmi} kg/m²</span>
      </div>

      {/* Visual Bar */}
      <div className="relative pt-6 pb-2">
        {/* Pointer */}
        <div
          className="absolute top-0 transition-all duration-300 transform -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${positionPercent}%` }}
        >
          <span className="px-2 py-0.5 text-[11px] font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-md shadow">
            {bmi}
          </span>
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-gray-900 dark:border-t-white" />
        </div>

        {/* Multi-color Spectrum Bar */}
        <div className="h-4 w-full rounded-full flex overflow-hidden shadow-inner">
          <div className="bg-sky-400 h-full" style={{ width: '21.6%' }} title="Underweight (<18.5)" />
          <div className="bg-emerald-500 h-full" style={{ width: '14.7%' }} title="Asian Normal (18.5-22.9)" />
          <div className="bg-lime-500 h-full" style={{ width: '6.7%' }} title="WHO Normal / Asian Overweight (23.0-24.9)" />
          <div className="bg-amber-400 h-full" style={{ width: '16.7%' }} title="WHO Overweight / Asian Obese (25.0-29.9)" />
          <div className="bg-orange-500 h-full" style={{ width: '16.7%' }} title="Obese Class I (30.0-34.9)" />
          <div className="bg-rose-600 h-full" style={{ width: '23.6%' }} title="Obese Class II/III (35.0+)" />
        </div>

        {/* Asian vs WHO Cutoff Indicators */}
        <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-2 font-mono">
          <span>12</span>
          <span>18.5</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">23.0 (Asian)</span>
          <span className="text-lime-700 dark:text-lime-400 font-bold">25.0 (WHO)</span>
          <span>30.0</span>
          <span>42</span>
        </div>
      </div>

      {/* Comparison Legend Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-gray-100 dark:border-gray-700">
        <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <p className="font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            WHO International Standard
          </p>
          <ul className="space-y-0.5 text-gray-600 dark:text-gray-300">
            <li>Underweight: &lt; 18.5</li>
            <li className="text-emerald-700 dark:text-emerald-400 font-semibold">Normal Weight: 18.5 – 24.9</li>
            <li>Overweight: 25.0 – 29.9</li>
            <li>Obese: ≥ 30.0</li>
          </ul>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/50">
          <p className="font-bold text-emerald-900 dark:text-emerald-300 mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Asian-Indian (ICMR / WHO Asia)
          </p>
          <ul className="space-y-0.5 text-emerald-800 dark:text-emerald-200">
            <li>Underweight: &lt; 18.5</li>
            <li className="font-bold text-emerald-900 dark:text-white">Normal Weight: 18.5 – 22.9</li>
            <li className="text-amber-800 dark:text-amber-300 font-medium">Overweight: 23.0 – 24.9</li>
            <li className="text-rose-700 dark:text-rose-300 font-medium">Obese (High Risk): ≥ 25.0</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
