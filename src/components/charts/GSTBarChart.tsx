'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCompactINR, formatINR } from '@/lib/formatters';

interface GSTBarChartProps {
  cgst: number;
  sgst: number;
  igst: number;
  taxType: 'igst' | 'cgst_sgst';
}

export default function GSTBarChart({ cgst, sgst, igst, taxType }: GSTBarChartProps) {
  const data = taxType === 'cgst_sgst' 
    ? [
        { name: 'CGST', value: cgst, color: '#10b981' },
        { name: 'SGST', value: sgst, color: '#8b5cf6' }
      ]
    : [
        { name: 'IGST', value: igst, color: '#f43f5e' }
      ];

  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatCompactINR} />
          <Tooltip formatter={(value: number) => formatINR(value)} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
