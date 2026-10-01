"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { formatINR } from '@/lib/formatters';
import { 
  calculateIncomeTax, 
  generateSlabBreakdown, 
  compareRegimes, 
  IncomeTaxInput,
  TaxRegime
} from '@/lib/calculators/income-tax';
import { InputGroup } from '@/components/ui/InputGroup';
import { ResultCard } from '@/components/ui/ResultCard';
import { ShareActions } from '@/components/ui/ShareActions';

const IncomeTaxPieChart = dynamic(() => import('@/components/charts/IncomeTaxPieChart'), { ssr: false });
const IncomeTaxComparisonChart = dynamic(() => import('@/components/charts/IncomeTaxComparisonChart'), { ssr: false });

export default function IncomeTaxCalculator() {
  const searchParams = useSearchParams();

  // State initialization from URL params or defaults
  const [input, setInput] = useState<IncomeTaxInput>({
    grossIncome: Number(searchParams.get('grossIncome')) || 1200000,
    regime: (searchParams.get('regime') as TaxRegime) || 'new',
    age: (searchParams.get('age') as any) || 'below60',
    deduction80C: Number(searchParams.get('deduction80C')) || 0,
    deduction80D: Number(searchParams.get('deduction80D')) || 0,
    deduction80CCD: Number(searchParams.get('deduction80CCD')) || 0,
    hraExemption: Number(searchParams.get('hraExemption')) || 0,
    homeLoanInterest: Number(searchParams.get('homeLoanInterest')) || 0,
    otherDeductions: Number(searchParams.get('otherDeductions')) || 0,
  });

  const handleInputChange = (field: keyof IncomeTaxInput, value: string | number) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  // Calculations
  const result = useMemo(() => calculateIncomeTax(input), [input]);
  const slabBreakdown = useMemo(() => generateSlabBreakdown(input), [input]);
  const comparison = useMemo(() => compareRegimes(input), [input]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-indigo-600">📊</span>
              Tax Details
            </h2>

            {/* Regime Toggle */}
            <div className="bg-slate-100 p-1 rounded-lg flex mb-6">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${input.regime === 'new' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => handleInputChange('regime', 'new')}
              >
                New Regime (Default)
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${input.regime === 'old' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => handleInputChange('regime', 'old')}
              >
                Old Regime
              </button>
            </div>

            <div className="space-y-5">
              <InputGroup
                label="Gross Annual Income"
                value={input.grossIncome}
                onChange={(val) => handleInputChange('grossIncome', val)}
                min={0}
                max={100000000}
                step={50000}
                prefix="₹"
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Age Group</label>
                <select
                  value={input.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm sm:text-sm"
                >
                  <option value="below60">Below 60 Years</option>
                  <option value="60to80">60 to 80 Years (Senior Citizen)</option>
                  <option value="above80">Above 80 Years (Super Senior)</option>
                </select>
              </div>

              {input.regime === 'old' && (
                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900">Deductions (Old Regime)</h3>
                  
                  <InputGroup
                    label="Section 80C (Max ₹1.5L)"
                    value={input.deduction80C}
                    onChange={(val) => handleInputChange('deduction80C', val)}
                    min={0}
                    max={150000}
                    step={10000}
                    prefix="₹"
                  />
                  <InputGroup
                    label="Section 80D (Health Insurance)"
                    value={input.deduction80D}
                    onChange={(val) => handleInputChange('deduction80D', val)}
                    min={0}
                    max={100000}
                    step={5000}
                    prefix="₹"
                  />
                  <InputGroup
                    label="Section 80CCD(1B) NPS"
                    value={input.deduction80CCD}
                    onChange={(val) => handleInputChange('deduction80CCD', val)}
                    min={0}
                    max={50000}
                    step={5000}
                    prefix="₹"
                  />
                  <InputGroup
                    label="HRA Exemption"
                    value={input.hraExemption}
                    onChange={(val) => handleInputChange('hraExemption', val)}
                    min={0}
                    max={2000000}
                    step={10000}
                    prefix="₹"
                  />
                  <InputGroup
                    label="Home Loan Interest (Sec 24b)"
                    value={input.homeLoanInterest}
                    onChange={(val) => handleInputChange('homeLoanInterest', val)}
                    min={0}
                    max={200000}
                    step={10000}
                    prefix="₹"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top Summary Cards */}
          <ResultCard
            title="Tax Summary"
            items={[
              { label: "Total Tax Payable", value: formatINR(result.totalTax), highlight: true, color: "#4f46e5" },
              { label: "Take Home Salary", value: formatINR(result.grossIncome - result.totalTax), color: "#22c55e" },
              { label: "Taxable Income", value: formatINR(result.taxableIncome), color: "#f59e0b" }
            ]}
          />

          {/* Regime Comparison Alert */}
          <div className={`p-4 rounded-xl border flex items-start gap-4 ${comparison.betterRegime === input.regime ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className={`text-2xl mt-0.5 ${comparison.betterRegime === input.regime ? 'text-green-600' : 'text-amber-600'}`}>
              {comparison.betterRegime === input.regime ? '✓' : '!'}
            </div>
            <div>
              <h4 className={`font-semibold ${comparison.betterRegime === input.regime ? 'text-green-900' : 'text-amber-900'}`}>
                {comparison.betterRegime === input.regime 
                  ? `You are using the better tax regime.`
                  : `You can save ${formatINR(comparison.savings)} by switching to the ${comparison.betterRegime === 'new' ? 'New' : 'Old'} Regime!`}
              </h4>
              <p className={`text-sm mt-1 ${comparison.betterRegime === input.regime ? 'text-green-800' : 'text-amber-800'}`}>
                New Regime Tax: <strong>{formatINR(comparison.newRegimeTax)}</strong> • Old Regime Tax: <strong>{formatINR(comparison.oldRegimeTax)}</strong>
              </p>
            </div>
          </div>

          {/* Charts & Breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Tax Breakdown & Comparison</h3>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-4 text-center">Income vs Tax (Selected Regime)</h4>
                <IncomeTaxPieChart grossIncome={result.grossIncome} totalTax={result.totalTax} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-4 text-center">New vs Old Regime Tax</h4>
                <IncomeTaxComparisonChart newTax={comparison.newRegimeTax} oldTax={comparison.oldRegimeTax} grossIncome={result.grossIncome} />
              </div>
            </div>

            {/* Slab Breakdown Table */}
            <div className="border-t border-slate-200 p-6">
              <h4 className="text-md font-semibold text-slate-900 mb-4">Tax Calculation Details ({input.regime === 'new' ? 'New' : 'Old'} Regime)</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-600 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Tax Slab</th>
                      <th className="px-4 py-3">Tax Rate</th>
                      <th className="px-4 py-3 text-right">Taxable Amount</th>
                      <th className="px-4 py-3 text-right">Tax Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slabBreakdown.map((slab, index) => (
                      <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{slab.slab}</td>
                        <td className="px-4 py-3 text-slate-600">{slab.rate}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatINR(slab.taxableAmount)}</td>
                        <td className="px-4 py-3 text-right font-medium text-slate-900">{formatINR(slab.taxAmount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-200 font-semibold text-slate-900">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right">Tax Before Rebate:</td>
                      <td className="px-4 py-3 text-right">{formatINR(result.taxBeforeRebate)}</td>
                    </tr>
                    {result.rebate87A > 0 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right text-green-600">Less: Sec 87A Rebate:</td>
                        <td className="px-4 py-3 text-right text-green-600">-{formatINR(result.rebate87A)}</td>
                      </tr>
                    )}
                    {result.surcharge > 0 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right">Add: Surcharge:</td>
                        <td className="px-4 py-3 text-right">{formatINR(result.surcharge)}</td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right">Add: Health & Education Cess (4%):</td>
                      <td className="px-4 py-3 text-right">{formatINR(result.cess)}</td>
                    </tr>
                    <tr className="text-base text-indigo-700">
                      <td colSpan={3} className="px-4 py-4 text-right">Total Tax Payable:</td>
                      <td className="px-4 py-4 text-right">{formatINR(result.totalTax)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <ShareActions
            shareUrl={`https://calculator-kappa-one-10.vercel.app/income-tax-calculator?grossIncome=${input.grossIncome}&regime=${input.regime}&age=${input.age}&deduction80C=${input.deduction80C}`}
            onDownloadPDF={() => {}}
            onDownloadExcel={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
