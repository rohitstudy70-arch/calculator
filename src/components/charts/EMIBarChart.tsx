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
  ResponsiveContainer,
} from 'recharts';
import { formatINR, formatCompactINR } from '@/lib/formatters';

const COLORS = ['#1E40AF', '#60A5FA'];

interface YearlyBarData {
  name: string;
  Principal: number;
  Interest: number;
}

interface EMIBarChartProps {
  data: YearlyBarData[];
}

export default function EMIBarChart({ data }: EMIBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(val) => formatCompactINR(val)} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value: number) => formatINR(value)} />
        <Legend />
        <Bar dataKey="Principal" stackId="a" fill={COLORS[0]} />
        <Bar dataKey="Interest" stackId="a" fill={COLORS[1]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
