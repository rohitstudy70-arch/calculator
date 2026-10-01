'use client';

import React from 'react';
import { AgeMilestone } from '@/lib/calculators/age';

interface AgeMilestoneChartProps {
  years: number;
  months: number;
  days: number;
  nextBirthdayDays: number;
  zodiacSign: string;
  milestones: AgeMilestone[];
}

export default function AgeMilestoneChart({
  years,
  months,
  days,
  nextBirthdayDays,
  zodiacSign,
  milestones,
}: AgeMilestoneChartProps) {
  return (
    <div className="w-full flex flex-col gap-6 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
            Next Birthday
          </span>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
            {nextBirthdayDays} <span className="text-xs font-normal text-gray-500">days left</span>
          </p>
        </div>

        <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50">
          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
            Zodiac Sign
          </span>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">{zodiacSign}</p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
            Current Stage
          </span>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
            {years < 18 ? 'Adolescent' : years < 60 ? 'Adult' : 'Senior Citizen'}
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Life Milestones Timeline
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {milestones.map((m) => (
            <div
              key={m.ageYears}
              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                m.isPassed
                  ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'
                  : 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200'
              }`}
            >
              <div>
                <span className="font-bold block">Age {m.ageYears}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">{m.date}</span>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  m.isPassed
                    ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {m.isPassed ? 'Passed' : m.dayOfWeek.slice(0, 3)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
