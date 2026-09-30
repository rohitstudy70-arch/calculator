'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { calculateGST, GSTInput } from '@/lib/calculators/gst';
import { formatINR } from '@/lib/formatters';

const GSTPieChart = dynamic(() => import('@/components/charts/GSTPieChart'), { ssr: false });
const GSTBarChart = dynamic(() => import('@/components/charts/GSTBarChart'), { ssr: false });

export default function GSTCalculator() {
  const [input, setInput] = useState<GSTInput>({
    amount: 10000,
    gstRate: 18,
    mode: 'add',
    taxType: 'cgst_sgst',
  });

  const result = useMemo(() => calculateGST(input), [input]);

  const gstRates = [0, 3, 5, 12, 18, 28];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 lg:col-span-1">
          <h2 className="text-xl font-bold mb-6 text-gray-800">GST Calculator</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setInput({ ...input, mode: 'add' })}
                  className={`py-2 text-sm rounded-md border font-medium transition-colors ${input.mode === 'add' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Add GST
                </button>
                <button 
                  onClick={() => setInput({ ...input, mode: 'remove' })}
                  className={`py-2 text-sm rounded-md border font-medium transition-colors ${input.mode === 'remove' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Remove GST
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {input.mode === 'add' ? 'Base Amount (₹)' : 'Total Amount (₹)'}
              </label>
              <input
                type="number"
                value={input.amount || ''}
                onChange={(e) => setInput({ ...input, amount: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter amount"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GST Rate (%)</label>
              <select
                value={input.gstRate}
                onChange={(e) => setInput({ ...input, gstRate: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                {gstRates.map(rate => (
                  <option key={rate} value={rate}>{rate}%</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setInput({ ...input, taxType: 'cgst_sgst' })}
                  className={`py-2 text-sm rounded-md border font-medium transition-colors ${input.taxType === 'cgst_sgst' ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  CGST + SGST
                </button>
                <button 
                  onClick={() => setInput({ ...input, taxType: 'igst' })}
                  className={`py-2 text-sm rounded-md border font-medium transition-colors ${input.taxType === 'igst' ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  IGST
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Calculation Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Base Price</p>
                <p className="text-2xl font-bold text-gray-900">{formatINR(result.basePrice)}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-sm text-orange-600 mb-1">Total GST Amount ({result.gstRate}%)</p>
                <p className="text-2xl font-bold text-orange-700">{formatINR(result.gstAmount)}</p>
              </div>
              <div className="col-span-2 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-600 mb-1">Total Price (Base + GST)</p>
                <p className="text-3xl font-bold text-blue-700">{formatINR(result.totalPrice)}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">Tax Breakdown</h4>
              <div className="grid grid-cols-2 gap-4">
                {input.taxType === 'cgst_sgst' ? (
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">CGST ({result.gstRate / 2}%)</span>
                      <span className="font-medium">{formatINR(result.cgst)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">SGST ({result.gstRate / 2}%)</span>
                      <span className="font-medium">{formatINR(result.sgst)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 col-span-2">
                    <span className="text-gray-600">IGST ({result.gstRate}%)</span>
                    <span className="font-medium">{formatINR(result.igst)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 text-center">Price vs Tax Breakdown</h3>
              <GSTPieChart basePrice={result.basePrice} gstAmount={result.gstAmount} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 text-center">Tax Components</h3>
              <GSTBarChart cgst={result.cgst} sgst={result.sgst} igst={result.igst} taxType={input.taxType} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
