'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { formatINR } from '@/lib/formatters';

const COLORS = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD'];

interface HomeLoanPieChartProps {
  principal: number;
  totalInterest: number;
  downPayment: number;
  otherCosts: number;
}

export default function HomeLoanPieChart({ principal, totalInterest, downPayment, otherCosts }: HomeLoanPieChartProps) {
  const data = [
    { name: 'Loan Principal', value: principal },
    { name: 'Total Interest', value: totalInterest },
    { name: 'Down Payment', value: downPayment },
    { name: 'Other Costs', value: otherCosts },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
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
