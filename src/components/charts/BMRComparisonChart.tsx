'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface BMRComparisonChartProps {
  mifflin: number;
  harris: number;
  katch: number | null;
}

export default function BMRComparisonChart({ mifflin, harris, katch }: BMRComparisonChartProps) {
  const data = [
    { name: 'Mifflin-St Jeor', calories: mifflin, color: '#1E40AF' },
    { name: 'Harris-Benedict', calories: harris, color: '#D97706' },
  ];

  if (katch !== null && katch > 0) {
    data.push({ name: 'Katch-McArdle', calories: katch, color: '#059669' });
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis
          domain={['dataMin - 200', 'dataMax + 200']}
          tickFormatter={(val) => `${val} kcal`}
          tick={{ fontSize: 11 }}
        />
        <Tooltip formatter={(val: number) => [`${val} kcal/day`, 'Basal Burn']} />
        <Bar dataKey="calories" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
