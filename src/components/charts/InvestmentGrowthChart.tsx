'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCompactINR, formatINR } from '@/lib/formatters';

interface ChartProps {
  data: Array<{
    year: number;
    investedAmount: number;
    totalValue: number;
  }>;
}

const InvestmentGrowthChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis 
          dataKey="year" 
          tickFormatter={(val) => `Yr ${val}`}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          tickFormatter={(val) => formatCompactINR(val)}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip 
          formatter={(val: number) => formatINR(val)}
          labelFormatter={(val) => `Year ${val}`}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="totalValue" 
          name="Total Value" 
          stroke="#10b981" 
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 8 }}
        />
        <Line 
          type="monotone" 
          dataKey="investedAmount" 
          name="Invested Amount" 
          stroke="#6366f1" 
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default InvestmentGrowthChart;
