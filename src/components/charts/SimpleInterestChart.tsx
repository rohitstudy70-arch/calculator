'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatINR } from '@/lib/formatters';

const COLORS = ['#1E40AF', '#059669'];

interface SimpleInterestChartProps {
  principal: number;
  totalInterest: number;
}

export default function SimpleInterestChart({ principal, totalInterest }: SimpleInterestChartProps) {
  const data = [
    { name: 'Principal Amount', value: principal },
    { name: 'Simple Interest', value: totalInterest },
  ].filter((item) => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => formatINR(value)} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
