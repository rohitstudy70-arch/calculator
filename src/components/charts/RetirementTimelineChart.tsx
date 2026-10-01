'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatINR, formatCompactINR } from '@/lib/formatters';
import { RetirementTimelineRow } from '@/lib/calculators/retirement';

interface RetirementTimelineChartProps {
  data: RetirementTimelineRow[];
}

export default function RetirementTimelineChart({ data }: RetirementTimelineChartProps) {
  const chartData = data.map((item) => ({
    name: `Age ${item.age}`,
    'Corpus Balance': item.corpusBalance,
    'Annual Expenses': item.annualExpenses,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCorpus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#D97706" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#D97706" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(val) => formatCompactINR(val)} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value: number) => formatINR(value)} />
        <Legend />
        <Area
          type="monotone"
          dataKey="Corpus Balance"
          stroke="#1E40AF"
          fillOpacity={1}
          fill="url(#colorCorpus)"
        />
        <Area
          type="monotone"
          dataKey="Annual Expenses"
          stroke="#D97706"
          fillOpacity={1}
          fill="url(#colorExpense)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
