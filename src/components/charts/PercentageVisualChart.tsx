'use client';

import React from 'react';
import { PercentageMode } from '@/lib/calculators/percentage';

interface PercentageVisualChartProps {
  mode: PercentageMode;
  resultValue: number;
  val1: number;
  val2: number;
  changeType?: 'increase' | 'decrease';
}

export default function PercentageVisualChart({
  mode,
  resultValue,
  val1,
  val2,
  changeType,
}: PercentageVisualChartProps) {
  let progressPct = 0;
  if (mode === 'percent_of') {
    progressPct = Math.min(100, Math.max(0, val1));
  } else if (mode === 'is_what_percent') {
    progressPct = Math.min(100, Math.max(0, resultValue));
  } else if (mode === 'percent_change') {
    progressPct = Math.min(100, Math.max(0, Math.abs(resultValue)));
  } else {
    progressPct = Math.min(100, Math.max(0, val2));
  }

  return (
    <div className="w-full flex flex-col gap-6 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Visual Proportion
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {mode === 'is_what_percent' || mode === 'percent_change' ? `${resultValue}%` : `${progressPct}% Proportion`}
        </span>
      </div>

      {/* Visual Percentage Bar */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex shadow-inner">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              mode === 'percent_change' && resultValue < 0
                ? 'bg-rose-500'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600'
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-gray-400 font-mono">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Contextual Metric Cards */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs">
        <div className="p-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
          <span className="text-gray-500 dark:text-gray-400 block mb-1">Base / Input 1 (X)</span>
          <span className="text-base font-bold text-gray-900 dark:text-white">{val1}</span>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
          <span className="text-gray-500 dark:text-gray-400 block mb-1">Base / Input 2 (Y)</span>
          <span className="text-base font-bold text-gray-900 dark:text-white">{val2}</span>
        </div>
      </div>
    </div>
  );
}
