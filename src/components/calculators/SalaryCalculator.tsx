'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { calculateSalary, generateSalaryBreakdown, SalaryInput } from '@/lib/calculators/salary';
import { formatINR } from '@/lib/formatters';

const SalaryPieChart = dynamic(() => import('@/components/charts/SalaryPieChart'), { ssr: false });
const SalaryBarChart = dynamic(() => import('@/components/charts/SalaryBarChart'), { ssr: false });

export default function SalaryCalculator() {
  const [input, setInput] = useState<SalaryInput>({
    annualCTC: 1200000,
    basicPercent: 40,
    hraPercent: 50,
    epfContribution: true,
    professionalTax: 200,
    includeGratuity: true,
    taxRegime: 'new'
  });

  const result = useMemo(() => calculateSalary(input), [input]);
  const breakdown = useMemo(() => generateSalaryBreakdown(input), [input]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 lg:col-span-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Salary Details</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual CTC (₹)</label>
              <input
                type="number"
                value={input.annualCTC || ''}
                onChange={(e) => setInput({ ...input, annualCTC: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                min="0"
                step="50000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Basic (% of CTC)</label>
                <input
                  type="number"
                  value={input.basicPercent}
                  onChange={(e) => setInput({ ...input, basicPercent: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  min="0" max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">HRA (% of Basic)</label>
                <input
                  type="number"
                  value={input.hraPercent}
                  onChange={(e) => setInput({ ...input, hraPercent: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  min="0" max="100"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-gray-100">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={input.epfContribution}
                  onChange={(e) => setInput({ ...input, epfContribution: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Include EPF (12%)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={input.includeGratuity}
                  onChange={(e) => setInput({ ...input, includeGratuity: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Include Gratuity Provision</span>
              </label>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Professional Tax</label>
              <select
                value={input.professionalTax}
                onChange={(e) => setInput({ ...input, professionalTax: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="0">₹0 (Not applicable)</option>
                <option value="150">₹150</option>
                <option value="200">₹200</option>
                <option value="208">₹208 (Maharashtra)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Income Tax Regime</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setInput({ ...input, taxRegime: 'new' })}
                  className={`py-2 text-sm rounded-md border font-medium transition-colors ${input.taxRegime === 'new' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  New Regime
                </button>
                <button 
                  onClick={() => setInput({ ...input, taxRegime: 'old' })}
                  className={`py-2 text-sm rounded-md border font-medium transition-colors ${input.taxRegime === 'old' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Old Regime
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Results */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
              <p className="text-sm font-medium text-gray-500 mb-1">Monthly In-Hand</p>
              <p className="text-3xl font-bold text-green-600">{formatINR(result.monthlyInHand)}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
              <p className="text-sm font-medium text-gray-500 mb-1">Annual Take Home</p>
              <p className="text-2xl font-bold text-gray-900">{formatINR(result.annualInHand)}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
              <p className="text-sm font-medium text-gray-500 mb-1">Estimated Tax (Yearly)</p>
              <p className="text-2xl font-bold text-red-500">{formatINR(result.annualTax)}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Salary Breakdown</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200">
                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Component</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Monthly (₹)</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Annual (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdown.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${item.type === 'earning' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-sm font-medium text-gray-800">{item.component}</span>
                        </div>
                      </td>
                      <td className={`py-3 px-4 text-right text-sm ${item.type === 'earning' ? 'text-green-600' : 'text-red-600'}`}>
                        {formatINR(item.monthly)}
                      </td>
                      <td className={`py-3 px-4 text-right text-sm font-medium ${item.type === 'earning' ? 'text-gray-900' : 'text-red-600'}`}>
                        {formatINR(item.annual)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 border-t-2 border-blue-200">
                    <td className="py-4 px-4 font-bold text-blue-900">Net In-Hand Salary</td>
                    <td className="py-4 px-4 text-right font-bold text-blue-900">{formatINR(result.monthlyInHand)}</td>
                    <td className="py-4 px-4 text-right font-bold text-blue-900">{formatINR(result.annualInHand)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 text-center">CTC Breakup</h3>
              <SalaryPieChart breakdown={breakdown} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 text-center">Earnings vs Deductions</h3>
              <SalaryBarChart breakdown={breakdown} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
