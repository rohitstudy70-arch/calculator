'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatINR } from '@/lib/formatters';

interface GSTPieChartProps {
  basePrice: number;
  gstAmount: number;
}

const COLORS = ['#3b82f6', '#f59e0b'];

export default function GSTPieChart({ basePrice, gstAmount }: GSTPieChartProps) {
  const data = [
    { name: 'Base Price', value: basePrice },
    { name: 'Total Tax', value: gstAmount }
  ];

  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            dataKey="value"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatINR(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
