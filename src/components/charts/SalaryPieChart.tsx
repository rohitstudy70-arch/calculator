'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatINR } from '@/lib/formatters';
import { SalaryBreakdown } from '@/lib/calculators/salary';

interface SalaryPieChartProps {
  breakdown: SalaryBreakdown[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

export default function SalaryPieChart({ breakdown }: SalaryPieChartProps) {
  const data = breakdown
    .filter(item => item.annual > 0)
    .map(item => ({
      name: item.component,
      value: item.annual
    }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatINR(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
