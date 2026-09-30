'use client';

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
import { formatCompactINR, formatINR } from '@/lib/formatters';

interface RDBarChartProps {
  data: Array<{
    name: string;
    'Deposited': number;
    'Interest': number;
  }>;
}

export default function RDBarChart({ data }: RDBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
        <YAxis 
          tickFormatter={(val) => formatCompactINR(val)} 
          tick={{ fill: '#6B7280' }}
        />
        <Tooltip 
          formatter={(value: number) => formatINR(value)}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend />
        <Bar dataKey="Deposited" stackId="a" fill="#10B981" />
        <Bar dataKey="Interest" stackId="a" fill="#34D399" />
      </BarChart>
    </ResponsiveContainer>
  );
}
