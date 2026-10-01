'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatINR } from '@/lib/formatters';

const COLORS = ['#1E40AF', '#059669', '#D97706'];

interface EPFPieChartProps {
  employeeContribution: number;
  employerContribution: number;
  totalInterest: number;
}

export default function EPFPieChart({
  employeeContribution,
  employerContribution,
  totalInterest,
}: EPFPieChartProps) {
  const data = [
    { name: 'Employee Contribution', value: employeeContribution },
    { name: 'Employer EPF (3.67%)', value: employerContribution },
    { name: 'Total Interest Earned', value: totalInterest },
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
