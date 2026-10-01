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

interface CalorieTargetChartProps {
  maintenance: number;
  weightLoss: number;
  mildLoss: number;
  weightGain: number;
}

export default function CalorieTargetChart({
  maintenance,
  weightLoss,
  mildLoss,
  weightGain,
}: CalorieTargetChartProps) {
  const data = [
    { name: 'Weight Loss (-0.5kg/wk)', calories: weightLoss, color: '#DC2626' },
    { name: 'Mild Loss (-0.25kg/wk)', calories: mildLoss, color: '#EA580C' },
    { name: 'Maintain Weight', calories: maintenance, color: '#1E40AF' },
    { name: 'Muscle Gain (+0.5kg/wk)', calories: weightGain, color: '#16A34A' },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis type="number" domain={[0, 'dataMax + 400']} tick={{ fontSize: 11 }} />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 11 }}
          width={130}
        />
        <Tooltip formatter={(val: number) => [`${val} kcal/day`, 'Target Intake']} />
        <Bar dataKey="calories" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
