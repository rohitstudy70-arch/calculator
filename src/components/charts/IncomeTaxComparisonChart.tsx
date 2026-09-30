"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatCompactINR } from '@/lib/formatters';

interface IncomeTaxComparisonChartProps {
  newTax: number;
  oldTax: number;
  grossIncome: number;
}

export default function IncomeTaxComparisonChart({ newTax, oldTax, grossIncome }: IncomeTaxComparisonChartProps) {
  const data = [
    {
      name: 'New Regime',
      Tax: newTax,
      'Take Home': Math.max(0, grossIncome - newTax)
    },
    {
      name: 'Old Regime',
      Tax: oldTax,
      'Take Home': Math.max(0, grossIncome - oldTax)
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
          <p className="font-medium text-slate-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center gap-4 mb-1">
              <span className="text-sm" style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-semibold text-slate-700">{formatCompactINR(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b' }}
            tickFormatter={(value) => formatCompactINR(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Take Home" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} maxBarSize={60} />
          <Bar dataKey="Tax" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
