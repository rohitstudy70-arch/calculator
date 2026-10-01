'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface TipPieChartProps {
  billAmount: number;
  tipAmount: number;
}

export default function TipPieChart({ billAmount, tipAmount }: TipPieChartProps) {
  const data = [
    { name: 'Base Bill Amount', value: billAmount, color: '#2563EB' },
    { name: 'Tip / Gratuity', value: tipAmount, color: '#10B981' },
  ];

  const total = billAmount + tipAmount;

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any) => [
                `₹${Number(val).toLocaleString('en-IN')} (${total > 0 ? ((val / total) * 100).toFixed(1) : 0}%)`,
                'Share',
              ]}
              contentStyle={{
                backgroundColor: '#1E293B',
                color: '#fff',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full pt-3 border-t border-gray-100 dark:border-gray-700 text-center">
        <div>
          <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 block">Bill Proportion</span>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            {total > 0 ? ((billAmount / total) * 100).toFixed(1) : 0}%
          </span>
        </div>
        <div>
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 block">Tip Proportion</span>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            {total > 0 ? ((tipAmount / total) * 100).toFixed(1) : 0}%
          </span>
        </div>
      </div>
    </div>
  );
}
