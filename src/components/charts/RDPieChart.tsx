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

const COLORS = ['#10B981', '#34D399'];

interface RDPieChartProps {
  totalDeposited: number;
  totalInterest: number;
}

export default function RDPieChart({ totalDeposited, totalInterest }: RDPieChartProps) {
  const data = [
    { name: 'Total Investment', value: totalDeposited },
    { name: 'Total Returns', value: totalInterest },
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
