'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { formatINR, formatCompactINR } from '@/lib/formatters';

interface GratuityBarChartProps {
  taxExemptGratuity: number;
  taxableGratuity: number;
}

export default function GratuityBarChart({ taxExemptGratuity, taxableGratuity }: GratuityBarChartProps) {
  const data = [
    {
      name: 'Tax-Free Portion',
      amount: taxExemptGratuity,
      fill: '#059669',
    },
    {
      name: 'Taxable Portion',
      amount: taxableGratuity,
      fill: '#EF4444',
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
        <Bar dataKey="amount" name="Gratuity Amount (₹)">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
