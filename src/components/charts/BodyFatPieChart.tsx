'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface BodyFatPieChartProps {
  fatMassKg: number;
  leanMassKg: number;
}

export default function BodyFatPieChart({ fatMassKg, leanMassKg }: BodyFatPieChartProps) {
  const data = [
    { name: 'Lean Muscle & Skeletal Mass', value: leanMassKg, color: '#1E40AF' },
    { name: 'Body Fat Mass', value: fatMassKg, color: '#D97706' },
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
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`${value} kg`, 'Mass Weight']} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
