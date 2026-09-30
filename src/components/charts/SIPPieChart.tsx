'use client';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatINR } from '@/lib/formatters';

interface PieChartProps {
  investedAmount: number;
  estimatedReturns: number;
}

const SIPPieChart: React.FC<PieChartProps> = ({ investedAmount, estimatedReturns }) => {
  const data = [
    { name: 'Invested Amount', value: investedAmount },
    { name: 'Est. Returns', value: estimatedReturns },
  ];
  const COLORS = ['#6366f1', '#10b981'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(val: number) => formatINR(val)} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default SIPPieChart;
