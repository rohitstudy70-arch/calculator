'use client';

import React from 'react';
import { TrimesterMilestone } from '@/lib/calculators/pregnancy';

interface PregnancyMilestoneChartProps {
  progressPercentage: number;
  currentWeeks: number;
  currentDays: number;
  daysRemaining: number;
  trimesters: TrimesterMilestone[];
}

export default function PregnancyMilestoneChart({
  progressPercentage,
  currentWeeks,
  currentDays,
  daysRemaining,
  trimesters,
}: PregnancyMilestoneChartProps) {
  return (
    <div className="w-full flex flex-col gap-5 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Gestational Timeline
          </span>
          <p className="text-base font-bold text-gray-900 dark:text-white">
            Week {currentWeeks} <span className="text-sm font-normal text-gray-500">+{currentDays} days</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 dark:text-gray-400">Remaining</span>
          <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{daysRemaining} days</p>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative pt-4 pb-2">
        <div
          className="absolute top-0 transition-all duration-300 transform -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${Math.min(98, Math.max(2, progressPercentage))}%` }}
        >
          <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-rose-600 rounded shadow">
            {progressPercentage}%
          </span>
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-rose-600" />
        </div>

        <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-gray-400 dark:text-gray-500 mt-1.5 font-mono">
          <span>0 wks (LMP)</span>
          <span>13 wks</span>
          <span>27 wks</span>
          <span>40 wks (Due)</span>
        </div>
      </div>

      {/* Trimester Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {trimesters.map((t) => (
          <div
            key={t.name}
            className={`p-3 rounded-xl border text-xs flex flex-col justify-between transition-colors ${
              t.isCurrent
                ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
                : 'bg-gray-50 dark:bg-gray-700/40 border-gray-100 dark:border-gray-700 opacity-80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${t.isCurrent ? 'bg-rose-600 animate-pulse' : 'bg-gray-400'}`}
                  />
                  {t.name}
                </span>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/70 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  {t.weeksRange}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[11px] mb-2">{t.description}</p>
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-mono border-t border-gray-200/50 dark:border-gray-600/50 pt-1.5 mt-auto">
              {t.startDate} to {t.endDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
