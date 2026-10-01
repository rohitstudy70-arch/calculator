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

interface PrepaymentComparisonChartProps {
  originalInterest: number;
  newInterest: number;
  interestSaved: number;
}

export default function PrepaymentComparisonChart({
  originalInterest,
  newInterest,
  interestSaved,
}: PrepaymentComparisonChartProps) {
  const data = [
    {
      name: 'Interest Outgo',
      'Without Prepayment': originalInterest,
      'With Prepayment': newInterest,
      'Total Interest Saved': interestSaved,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(val) => formatCompactINR(val)} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value: number) => formatINR(value)} />
        <Legend />
        <Bar dataKey="Without Prepayment" fill="#EF4444" radius={[4, 4, 0, 0]} />
        <Bar dataKey="With Prepayment" fill="#1E40AF" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Total Interest Saved" fill="#059669" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
