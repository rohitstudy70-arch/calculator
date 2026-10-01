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
import { InflationYearlyBreakdown } from '@/lib/calculators/inflation';

interface InflationChartProps {
  data: InflationYearlyBreakdown[];
}

export default function InflationChart({ data }: InflationChartProps) {
  const chartData = data.map((item) => ({
    name: `Yr ${item.year}`,
    'Future Equivalent Cost': item.futureEquivalentCost,
    'Purchasing Power of Cash': item.purchasingPowerOfFixedAmount,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
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
          dataKey="Future Equivalent Cost"
          stroke="#EF4444"
          fillOpacity={1}
          fill="url(#colorCost)"
        />
        <Area
          type="monotone"
          dataKey="Purchasing Power of Cash"
          stroke="#059669"
          fillOpacity={1}
          fill="url(#colorPower)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
