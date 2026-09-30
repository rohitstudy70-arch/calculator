"use client";

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatCompactINR } from '@/lib/formatters';

interface IncomeTaxPieChartProps {
  grossIncome: number;
  totalTax: number;
}

export default function IncomeTaxPieChart({ grossIncome, totalTax }: IncomeTaxPieChartProps) {
  const takeHome = Math.max(0, grossIncome - totalTax);

  const data = [
    { name: 'Take Home', value: takeHome, color: '#22c55e' }, // green-500
    { name: 'Total Tax', value: totalTax, color: '#ef4444' } // red-500
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
          <p className="font-medium text-slate-700">{payload[0].name}</p>
          <p className="text-lg font-bold text-slate-900">
            {formatCompactINR(payload[0].value)}
          </p>
          <p className="text-sm text-slate-500">
            {((payload[0].value / grossIncome) * 100).toFixed(1)}% of Gross
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
