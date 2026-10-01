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
import { CIYearlyBreakdown } from '@/lib/calculators/compound-interest';

interface CompoundInterestChartProps {
  data: CIYearlyBreakdown[];
}

export default function CompoundInterestChart({ data }: CompoundInterestChartProps) {
  const chartData = data.map((item) => ({
    name: `Yr ${item.year}`,
    'Closing Balance': item.closingBalance,
    'Total Deposits': item.openingBalance + item.depositsThisYear,
    'Interest Earned': item.interestEarnedThisYear,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#059669" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(val) => formatCompactINR(val)} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value: number) => formatINR(value)} />
        <Legend />
        <Area
          type="monotone"
          dataKey="Closing Balance"
          stroke="#1E40AF"
          fillOpacity={1}
          fill="url(#colorBalance)"
        />
        <Area
          type="monotone"
          dataKey="Interest Earned"
          stroke="#059669"
          fillOpacity={1}
          fill="url(#colorInterest)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
