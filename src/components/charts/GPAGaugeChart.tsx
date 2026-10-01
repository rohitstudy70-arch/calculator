'use client';

import React from 'react';

interface GPAGaugeChartProps {
  gpa: number;
  maxScale: number;
  percentage: number;
  divisionHonors: string;
}

export default function GPAGaugeChart({
  gpa,
  maxScale,
  percentage,
  divisionHonors,
}: GPAGaugeChartProps) {
  const progressPct = Math.min(100, Math.max(0, (gpa / maxScale) * 100));

  return (
    <div className="w-full flex flex-col gap-6 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Academic Standing
          </span>
          <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">{divisionHonors}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 dark:text-gray-400">Equiv. Score</span>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{percentage}%</p>
        </div>
      </div>

      {/* Progress Track */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-gray-400 font-mono">
          <span>0.0</span>
          <span>{(maxScale * 0.4).toFixed(1)} (Pass)</span>
          <span>{(maxScale * 0.65).toFixed(1)} (First Class)</span>
          <span>{(maxScale * 0.8).toFixed(1)} (Distinction)</span>
          <span>{maxScale.toFixed(1)}</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs">
        <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl">
          <span className="text-blue-600 dark:text-blue-400 block mb-1">GPA / Scale</span>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            {gpa} / {maxScale.toFixed(1)}
          </span>
        </div>
        <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl">
          <span className="text-emerald-600 dark:text-emerald-400 block mb-1">Equivalent Percentage</span>
          <span className="text-base font-bold text-emerald-950 dark:text-emerald-100">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
