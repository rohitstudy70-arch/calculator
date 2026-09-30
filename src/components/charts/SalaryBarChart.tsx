'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCompactINR, formatINR } from '@/lib/formatters';
import { SalaryBreakdown } from '@/lib/calculators/salary';

interface SalaryBarChartProps {
  breakdown: SalaryBreakdown[];
}

export default function SalaryBarChart({ breakdown }: SalaryBarChartProps) {
  const data = breakdown.map(item => ({
    name: item.component,
    value: item.annual,
    type: item.type
  }));

  const earnings = data.filter(d => d.type === 'earning');
  const deductions = data.filter(d => d.type === 'deduction');

  const combinedData = [
    {
      name: 'Earnings vs Deductions',
      Earnings: earnings.reduce((sum, item) => sum + item.value, 0),
      Deductions: deductions.reduce((sum, item) => sum + item.value, 0)
    }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={combinedData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickFormatter={formatCompactINR} />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip formatter={(value: number) => formatINR(value)} />
          <Legend />
          <Bar dataKey="Earnings" stackId="a" fill="#10b981" />
          <Bar dataKey="Deductions" stackId="a" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
