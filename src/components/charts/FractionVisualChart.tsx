'use client';

import React from 'react';

interface FractionVisualChartProps {
  formattedFraction: string;
  formattedMixed: string;
  decimalValue: number;
  numerator: number;
  denominator: number;
}

export default function FractionVisualChart({
  formattedFraction,
  formattedMixed,
  decimalValue,
  numerator,
  denominator,
}: FractionVisualChartProps) {
  return (
    <div className="w-full flex flex-col gap-6 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Fraction Formats & Equivalence
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
          = {decimalValue}
        </span>
      </div>

      {/* Visual Fraction Render Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase font-semibold text-blue-600 dark:text-blue-400 mb-1">
            Simplified
          </span>
          <span className="text-lg font-bold text-blue-950 dark:text-blue-100 font-mono">
            {formattedFraction}
          </span>
        </div>

        <div className="p-3 bg-purple-50/70 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase font-semibold text-purple-600 dark:text-purple-400 mb-1">
            Mixed Number
          </span>
          <span className="text-lg font-bold text-purple-950 dark:text-purple-100 font-mono">
            {formattedMixed}
          </span>
        </div>

        <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            Decimal
          </span>
          <span className="text-lg font-bold text-emerald-950 dark:text-emerald-100 font-mono">
            {decimalValue}
          </span>
        </div>
      </div>

      {/* Visual Proportion Bar (if 0 to 1 range or clamp) */}
      <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Fraction Value on 0–2 Number Line</span>
          <span className="font-mono font-semibold">{decimalValue}</span>
        </div>
        <div className="h-3.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, (decimalValue / 2) * 100))}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-mono">
          <span>0.0</span>
          <span>0.5 (1/2)</span>
          <span>1.0 (1)</span>
          <span>1.5 (3/2)</span>
          <span>2.0 (2)</span>
        </div>
      </div>
    </div>
  );
}
