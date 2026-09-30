const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function write(file, content) {
  ensureDir(file);
  fs.writeFileSync(file, content.trim() + '\n', 'utf8');
}

// 1. GST Calc TS
write('d:\\calculator\\src\\lib\\calculators\\gst.ts', `
export type GSTMode = 'add' | 'remove';
export type TaxType = 'igst' | 'cgst_sgst';

export interface GSTInput {
  amount: number;
  gstRate: number;
  mode: GSTMode;
  taxType: TaxType;
}

export interface GSTResult {
  basePrice: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalPrice: number;
  gstRate: number;
}

export function validateGSTInput(input: GSTInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.amount < 0) {
    errors.amount = 'Amount cannot be negative.';
  } else if (input.amount === 0) {
    errors.amount = 'Amount must be greater than zero.';
  }

  if (input.gstRate < 0) {
    errors.gstRate = 'GST rate cannot be negative.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateGST(input: GSTInput): GSTResult {
  const { amount, gstRate, mode, taxType } = input;
  let basePrice = 0;
  let gstAmount = 0;
  let totalPrice = 0;

  if (mode === 'add') {
    basePrice = amount;
    gstAmount = basePrice * (gstRate / 100);
    totalPrice = basePrice + gstAmount;
  } else {
    totalPrice = amount;
    basePrice = totalPrice / (1 + gstRate / 100);
    gstAmount = totalPrice - basePrice;
  }

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (taxType === 'cgst_sgst') {
    cgst = gstAmount / 2;
    sgst = gstAmount / 2;
  } else {
    igst = gstAmount;
  }

  return {
    basePrice,
    gstAmount,
    cgst,
    sgst,
    igst,
    totalPrice,
    gstRate,
  };
}
`);

// 2. GST Tests
write('d:\\calculator\\__tests__\\calculators\\gst.test.ts', `
import { calculateGST, validateGSTInput } from '@/lib/calculators/gst';

describe('GST Calculator', () => {
  it('adds 18% to ₹1,000 correctly', () => {
    const res = calculateGST({ amount: 1000, gstRate: 18, mode: 'add', taxType: 'cgst_sgst' });
    expect(res.basePrice).toBe(1000);
    expect(res.gstAmount).toBeCloseTo(180);
    expect(res.totalPrice).toBe(1180);
    expect(res.cgst).toBeCloseTo(90);
    expect(res.sgst).toBeCloseTo(90);
    expect(res.igst).toBe(0);
  });

  it('adds 12% to ₹50,000 correctly', () => {
    const res = calculateGST({ amount: 50000, gstRate: 12, mode: 'add', taxType: 'igst' });
    expect(res.basePrice).toBe(50000);
    expect(res.gstAmount).toBeCloseTo(6000);
    expect(res.totalPrice).toBe(56000);
    expect(res.igst).toBeCloseTo(6000);
  });

  it('removes 18% from ₹1,180 correctly', () => {
    const res = calculateGST({ amount: 1180, gstRate: 18, mode: 'remove', taxType: 'cgst_sgst' });
    expect(res.basePrice).toBeCloseTo(1000);
    expect(res.gstAmount).toBeCloseTo(180);
    expect(res.totalPrice).toBe(1180);
  });

  it('removes 28% from ₹12,800 correctly', () => {
    const res = calculateGST({ amount: 12800, gstRate: 28, mode: 'remove', taxType: 'igst' });
    expect(res.basePrice).toBeCloseTo(10000);
    expect(res.gstAmount).toBeCloseTo(2800);
  });

  it('adds 5% to ₹10,000 correctly', () => {
    const res = calculateGST({ amount: 10000, gstRate: 5, mode: 'add', taxType: 'cgst_sgst' });
    expect(res.basePrice).toBe(10000);
    expect(res.gstAmount).toBeCloseTo(500);
    expect(res.totalPrice).toBe(10500);
  });

  it('handles 0% GST', () => {
    const res = calculateGST({ amount: 10000, gstRate: 0, mode: 'add', taxType: 'cgst_sgst' });
    expect(res.gstAmount).toBe(0);
    expect(res.totalPrice).toBe(10000);
  });

  it('validates negative inputs', () => {
    const res = validateGSTInput({ amount: -100, gstRate: -5, mode: 'add', taxType: 'igst' });
    expect(res.valid).toBe(false);
    expect(res.errors.amount).toBeDefined();
    expect(res.errors.gstRate).toBeDefined();
  });
});
`);

// 3. GST Content
write('d:\\calculator\\src\\data\\calculator-content\\gst.ts', `
export const gstCalculatorContent = {
  pageTitle: "GST Calculator - Add or Remove GST Online | CalcMaster",
  metaDescription: "Free Indian GST Calculator to easily add or remove Goods and Services Tax. Calculate CGST, SGST, IGST with latest 3%, 5%, 12%, 18% and 28% tax slabs.",
  h1: "GST Calculator India",
  introText: "Use our accurate GST Calculator to quickly figure out the Goods and Services Tax (GST) for your invoices. Whether you need to add GST to a base amount or extract the original price from a GST-inclusive total, our tool simplifies the process. It supports all current Indian GST slabs: 0%, 3%, 5%, 12%, 18%, and 28%, and provides a detailed breakdown of CGST, SGST, and IGST for both inter-state and intra-state transactions.",
  howToUse: [
    { title: "Select Mode", description: "Choose whether you want to 'Add GST' to a base price or 'Remove GST' from a total price." },
    { title: "Enter Amount", description: "Input the transaction amount in INR. This is your base amount if adding GST, or total amount if removing GST." },
    { title: "Choose GST Rate", description: "Select the applicable GST slab (3%, 5%, 12%, 18%, or 28%) from the dropdown." },
    { title: "Select Transaction Type", description: "Choose whether the transaction is within the same state (CGST + SGST) or between different states (IGST)." },
    { title: "View Breakdown", description: "Instantly see the base price, total GST amount, separated tax components, and the final total price." }
  ],
  formulaExplanation: "GST is calculated differently based on whether you are adding it to an exclusive amount or removing it from an inclusive amount. \\n\\n**Adding GST:** \\nGST Amount = (Base Price × GST Rate) / 100 \\nTotal Price = Base Price + GST Amount \\n\\n**Removing GST:** \\nBase Price = Total Price / [1 + (GST Rate / 100)] \\nGST Amount = Total Price - Base Price",
  solvedExamples: [
    { title: "Adding 18% GST to ₹10,000", calculation: "Base Price: ₹10,000\\nGST Rate: 18%\\nGST Amount = 10,000 × (18/100) = ₹1,800\\nTotal Price = 10,000 + 1,800 = ₹11,800" },
    { title: "Removing 12% GST from ₹56,000", calculation: "Total Price: ₹56,000\\nGST Rate: 12%\\nBase Price = 56,000 / (1 + 12/100) = 56,000 / 1.12 = ₹50,000\\nGST Amount = 56,000 - 50,000 = ₹6,000" },
    { title: "Inter-state vs Intra-state", calculation: "For a ₹1,800 GST amount:\\nIntra-state: CGST = ₹900, SGST = ₹900\\nInter-state: IGST = ₹1,800" }
  ],
  tips: [
    "Always double-check the applicable HSN/SAC code to confirm the correct GST rate for your goods or services.",
    "For intra-state sales (within the same state), GST is divided equally into CGST (Central GST) and SGST (State GST).",
    "For inter-state sales (between different states), the full tax amount goes to IGST (Integrated GST).",
    "If your vendor gives you a final price and says 'GST included', use the 'Remove GST' option to find the base cost.",
    "Keep track of your purchase invoices to claim Input Tax Credit (ITC) against your tax liability."
  ],
  commonMistakes: [
    "Applying the GST rate to the total inclusive amount instead of calculating backward to find the base price.",
    "Charging IGST on a local sale instead of splitting it into CGST and SGST.",
    "Forgetting to update billing systems when the government changes the GST slab for a particular item.",
    "Assuming all essential goods have a 0% GST rate—always verify the latest government notification."
  ],
  faqs: [
    { question: "What is GST?", answer: "GST stands for Goods and Services Tax. It is an indirect tax used in India on the supply of goods and services, replacing multiple overlapping taxes like excise duty, VAT, and service tax." },
    { question: "What are the different GST slabs in India?", answer: "The primary GST tax slabs in India currently are 0% (exempted goods), 5%, 12%, 18%, and 28%. Additionally, there is a special 3% rate for gold and certain precious stones, and 0.25% for rough diamonds." },
    { question: "What is the difference between CGST, SGST, and IGST?", answer: "CGST is the Central GST collected by the central government, SGST is the State GST collected by the state government. Both apply to intra-state sales. IGST is the Integrated GST collected by the central government on inter-state sales." },
    { question: "How do I calculate GST backward from the total?", answer: "To find the base amount from a GST-inclusive total, divide the total amount by (1 + GST Rate/100). The difference between the total and the base amount is the GST component." },
    { question: "Who needs to register for GST?", answer: "Generally, businesses with an annual turnover exceeding ₹40 lakhs for goods (₹20 lakhs for special category states) or ₹20 lakhs for services must register for GST. Inter-state suppliers must register regardless of turnover." },
    { question: "Can I claim a refund on GST paid?", answer: "Yes, businesses can claim Input Tax Credit (ITC) for the GST paid on purchases used for business purposes, which offsets the GST they collect on sales." },
    { question: "Is GST applicable on salary?", answer: "No, salaries paid to employees are not considered a supply of services under the GST act, hence no GST is levied on employment income." },
    { question: "What is an HSN code?", answer: "HSN stands for Harmonized System of Nomenclature. It is an internationally accepted coding system used to classify goods under GST and determine the applicable tax rate." }
  ],
  relatedCalculators: [
    { title: "EMI Calculator", link: "/emi-calculator" },
    { title: "Income Tax Calculator", link: "/income-tax-calculator" },
    { title: "Salary Calculator", link: "/salary-calculator" }
  ]
};
`);

// 4. GST Pie Chart
write('d:\\calculator\\src\\components\\charts\\GSTPieChart.tsx', `
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
              <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatINR(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
`);

// 5. GST Bar Chart
write('d:\\calculator\\src\\components\\charts\\GSTBarChart.tsx', `
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
              <Cell key={\`cell-\${index}\`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
`);

// 6. GST Calculator Component
write('d:\\calculator\\src\\components\\calculators\\GSTCalculator.tsx', `
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
                  className={\`py-2 text-sm rounded-md border font-medium transition-colors \${input.mode === 'add' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}\`}
                >
                  Add GST
                </button>
                <button 
                  onClick={() => setInput({ ...input, mode: 'remove' })}
                  className={\`py-2 text-sm rounded-md border font-medium transition-colors \${input.mode === 'remove' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}\`}
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
                  className={\`py-2 text-sm rounded-md border font-medium transition-colors \${input.taxType === 'cgst_sgst' ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}\`}
                >
                  CGST + SGST
                </button>
                <button 
                  onClick={() => setInput({ ...input, taxType: 'igst' })}
                  className={\`py-2 text-sm rounded-md border font-medium transition-colors \${input.taxType === 'igst' ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}\`}
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
`);

// 7. GST Page
write('d:\\calculator\\src\\app\\gst-calculator\\page.tsx', `
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { gstCalculatorContent } from '@/data/calculator-content/gst';
import GSTCalculator from '@/components/calculators/GSTCalculator';

export const metadata: Metadata = {
  title: gstCalculatorContent.pageTitle,
  description: gstCalculatorContent.metaDescription,
};

export default function GSTCalculatorPage() {
  const { h1, introText, howToUse, formulaExplanation, solvedExamples, tips, commonMistakes, faqs } = gstCalculatorContent;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{h1}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{introText}</p>
      </div>

      <div className="mb-12">
        <Suspense fallback={<div className="h-96 flex items-center justify-center bg-gray-50 rounded-xl border animate-pulse">Loading calculator...</div>}>
          <GSTCalculator />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the GST Calculator</h2>
          <div className="space-y-6">
            {howToUse.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">GST Calculation Formula</h2>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="prose prose-blue max-w-none text-sm text-gray-700 whitespace-pre-line">
              {formulaExplanation}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Solved Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solvedExamples.map((example, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">{example.title}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">{example.calculation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips</h2>
          <ul className="space-y-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid</h2>
          <ul className="space-y-3">
            {commonMistakes.map((mistake, i) => (
              <li key={i} className="flex gap-3 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-16 bg-gray-50 p-8 rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-bold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
`);


// SALARY FILES
// 1. Salary Calc TS
write('d:\\calculator\\src\\lib\\calculators\\salary.ts', `
export interface SalaryInput {
  annualCTC: number;
  basicPercent: number;
  hraPercent: number;
  epfContribution: boolean;
  professionalTax: number;
  includeGratuity: boolean;
  taxRegime: 'old' | 'new';
}

export interface SalaryResult {
  monthlyCTC: number;
  monthlyBasic: number;
  monthlyHRA: number;
  monthlySpecialAllowance: number;
  monthlyEPFEmployee: number;
  monthlyEPFEmployer: number;
  monthlyProfessionalTax: number;
  monthlyGratuity: number;
  monthlyIncomeTax: number;
  monthlyInHand: number;
  annualInHand: number;
  annualTax: number;
  effectiveTaxRate: number;
}

export interface SalaryBreakdown {
  component: string;
  monthly: number;
  annual: number;
  type: 'earning' | 'deduction';
}

export function validateSalaryInput(input: SalaryInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (input.annualCTC <= 0) errors.annualCTC = 'Annual CTC must be greater than zero.';
  if (input.basicPercent < 0 || input.basicPercent > 100) errors.basicPercent = 'Basic percentage must be between 0 and 100.';
  if (input.hraPercent < 0 || input.hraPercent > 100) errors.hraPercent = 'HRA percentage must be between 0 and 100.';
  
  return { valid: Object.keys(errors).length === 0, errors };
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { annualCTC, basicPercent, hraPercent, epfContribution, professionalTax, includeGratuity, taxRegime } = input;
  
  const monthlyCTC = annualCTC / 12;
  const monthlyBasic = monthlyCTC * (basicPercent / 100);
  const monthlyHRA = monthlyBasic * (hraPercent / 100);
  
  // EPF Calculation
  let monthlyEPFEmployer = 0;
  let monthlyEPFEmployee = 0;
  if (epfContribution) {
    // Standard capped at 1800 (12% of 15000), or actual 12% if basic is lower
    const epfBase = Math.min(monthlyBasic, 15000);
    monthlyEPFEmployer = epfBase * 0.12;
    monthlyEPFEmployee = epfBase * 0.12;
  }
  
  // Gratuity
  const monthlyGratuity = includeGratuity ? (monthlyBasic * 4.81) / 100 : 0;
  
  // Special Allowance
  const monthlySpecialAllowance = Math.max(0, monthlyCTC - monthlyBasic - monthlyHRA - monthlyEPFEmployer - monthlyGratuity);
  
  // Gross Salary
  const monthlyGross = monthlyBasic + monthlyHRA + monthlySpecialAllowance;
  const annualGross = monthlyGross * 12;
  
  // Income Tax Calculation (Simplified for New Regime FY 25-26)
  let annualTax = 0;
  if (taxRegime === 'new') {
    const standardDeduction = 75000;
    const taxableIncome = Math.max(0, annualGross - standardDeduction);
    
    if (taxableIncome <= 700000) {
      annualTax = 0; // Rebate 87A
    } else {
      if (taxableIncome > 300000) annualTax += Math.min(taxableIncome - 300000, 400000) * 0.05;
      if (taxableIncome > 700000) annualTax += Math.min(taxableIncome - 700000, 300000) * 0.10;
      if (taxableIncome > 1000000) annualTax += Math.min(taxableIncome - 1000000, 200000) * 0.15;
      if (taxableIncome > 1200000) annualTax += Math.min(taxableIncome - 1200000, 300000) * 0.20;
      if (taxableIncome > 1500000) annualTax += (taxableIncome - 1500000) * 0.30;
      
      // Cess
      annualTax = annualTax * 1.04;
    }
  } else {
    // Old regime simplified fallback (Standard deduction 50k)
    const standardDeduction = 50000;
    const ptYearly = professionalTax * 12;
    // Assume full HRA exemption and 80C 1.5L for simplicity in this fallback mode if old regime
    let exemption = standardDeduction + ptYearly + 150000 + (monthlyHRA * 12);
    const taxableIncome = Math.max(0, annualGross - exemption);
    if (taxableIncome <= 500000) {
      annualTax = 0; // 87A
    } else {
      if (taxableIncome > 250000) annualTax += Math.min(taxableIncome - 250000, 250000) * 0.05;
      if (taxableIncome > 500000) annualTax += Math.min(taxableIncome - 500000, 500000) * 0.20;
      if (taxableIncome > 1000000) annualTax += (taxableIncome - 1000000) * 0.30;
      annualTax = annualTax * 1.04;
    }
  }
  
  const monthlyIncomeTax = annualTax / 12;
  const monthlyProfessionalTax = professionalTax;
  
  const monthlyInHand = monthlyGross - monthlyEPFEmployee - monthlyProfessionalTax - monthlyIncomeTax;
  const annualInHand = monthlyInHand * 12;
  const effectiveTaxRate = (annualTax / annualCTC) * 100;
  
  return {
    monthlyCTC,
    monthlyBasic,
    monthlyHRA,
    monthlySpecialAllowance,
    monthlyEPFEmployee,
    monthlyEPFEmployer,
    monthlyProfessionalTax,
    monthlyGratuity,
    monthlyIncomeTax,
    monthlyInHand,
    annualInHand,
    annualTax,
    effectiveTaxRate
  };
}

export function generateSalaryBreakdown(input: SalaryInput): SalaryBreakdown[] {
  const result = calculateSalary(input);
  return [
    { component: 'Basic Salary', monthly: result.monthlyBasic, annual: result.monthlyBasic * 12, type: 'earning' },
    { component: 'House Rent Allowance (HRA)', monthly: result.monthlyHRA, annual: result.monthlyHRA * 12, type: 'earning' },
    { component: 'Special Allowance', monthly: result.monthlySpecialAllowance, annual: result.monthlySpecialAllowance * 12, type: 'earning' },
    { component: 'Employee Provident Fund (EPF)', monthly: result.monthlyEPFEmployee, annual: result.monthlyEPFEmployee * 12, type: 'deduction' },
    { component: 'Professional Tax', monthly: result.monthlyProfessionalTax, annual: result.monthlyProfessionalTax * 12, type: 'deduction' },
    { component: 'Income Tax (TDS)', monthly: result.monthlyIncomeTax, annual: result.annualTax, type: 'deduction' }
  ];
}
`);

// 2. Salary Tests
write('d:\\calculator\\__tests__\\calculators\\salary.test.ts', `
import { calculateSalary, validateSalaryInput } from '@/lib/calculators/salary';

describe('Salary Calculator', () => {
  it('calculates 12L CTC correctly', () => {
    const res = calculateSalary({
      annualCTC: 1200000,
      basicPercent: 40,
      hraPercent: 50,
      epfContribution: true,
      professionalTax: 200,
      includeGratuity: true,
      taxRegime: 'new'
    });
    // In hand should be around 82k-85k
    expect(res.monthlyInHand).toBeGreaterThan(80000);
    expect(res.monthlyInHand).toBeLessThan(90000);
  });

  it('calculates 6L CTC correctly', () => {
    const res = calculateSalary({
      annualCTC: 600000,
      basicPercent: 40,
      hraPercent: 50,
      epfContribution: true,
      professionalTax: 200,
      includeGratuity: true,
      taxRegime: 'new'
    });
    // Tax should be 0, inhand ~ 44k
    expect(res.annualTax).toBe(0);
    expect(res.monthlyInHand).toBeGreaterThan(43000);
    expect(res.monthlyInHand).toBeLessThan(46000);
  });

  it('validates negative inputs', () => {
    const res = validateSalaryInput({
      annualCTC: -10,
      basicPercent: 150,
      hraPercent: -5,
      epfContribution: false,
      professionalTax: 0,
      includeGratuity: false,
      taxRegime: 'new'
    });
    expect(res.valid).toBe(false);
    expect(res.errors.annualCTC).toBeDefined();
    expect(res.errors.basicPercent).toBeDefined();
    expect(res.errors.hraPercent).toBeDefined();
  });
});
`);

// 3. Salary Content
write('d:\\calculator\\src\\data\\calculator-content\\salary.ts', `
export const salaryCalculatorContent = {
  pageTitle: "Salary Calculator - CTC to In-Hand Salary Calculator India | CalcMaster",
  metaDescription: "Calculate your take-home monthly salary from your annual CTC. Break down Basic, HRA, EPF, and tax deductions with our Indian Salary Calculator.",
  h1: "Salary Calculator India (CTC to In-Hand)",
  introText: "Planning a job switch or received a new offer? Our Salary Calculator helps you convert your Cost to Company (CTC) into your actual monthly take-home salary. By accounting for components like Basic Salary, HRA, EPF, Professional Tax, Gratuity, and Income Tax (New Regime FY 2025-26), you can get a transparent and accurate view of your earnings.",
  howToUse: [
    { title: "Enter Annual CTC", description: "Input your total Cost to Company package in INR." },
    { title: "Adjust Percentages", description: "Set the percentage of your CTC that goes to Basic Salary (usually 40-50%) and the HRA percentage (usually 40-50% of Basic)." },
    { title: "Toggle Deductions", description: "Select if EPF and Gratuity are part of your CTC, and enter your state's monthly Professional Tax." },
    { title: "Select Tax Regime", description: "Choose between the Old and New tax regimes to estimate your monthly TDS." },
    { title: "Review Take-Home", description: "Check the comprehensive breakdown of your gross earnings, total deductions, and net monthly in-hand salary." }
  ],
  formulaExplanation: "Understanding the difference between CTC and take-home salary is crucial.\\n\\n**Gross Salary** = CTC - Employer EPF - Gratuity Provision\\n**In-Hand Salary** = Gross Salary - Employee EPF - Professional Tax - Income Tax (TDS)\\n\\n*EPF Calculation:* Typically 12% of Basic Salary (often capped at ₹1,800/month if Basic is above ₹15,000).\\n*Gratuity:* Calculated as 4.81% of Basic Salary per year, accrued by the employer.",
  solvedExamples: [
    { title: "₹6 Lakhs CTC", calculation: "With 40% Basic, EPF, and New Tax Regime:\\nGross Monthly: ~₹48,150\\nIncome Tax: ₹0 (Rebate applies)\\nEPF Deduction: ₹1,800\\nIn-Hand Salary: ~₹46,150/month" },
    { title: "₹12 Lakhs CTC", calculation: "With 40% Basic, EPF, and New Tax Regime:\\nGross Monthly: ~₹96,300\\nIncome Tax Deducted: ~₹6,300\\nEPF Deduction: ₹1,800\\nIn-Hand Salary: ~₹88,000/month" },
    { title: "₹25 Lakhs CTC", calculation: "With 40% Basic, EPF, and New Tax Regime:\\nGross Monthly: ~₹2,00,000\\nIncome Tax Deducted: ~₹33,000\\nIn-Hand Salary: ~₹1,65,000/month" }
  ],
  tips: [
    "A higher Basic Salary means higher EPF contributions and Gratuity, but might increase your tax liability depending on HRA claims.",
    "If you opt for the New Tax Regime, you cannot claim HRA exemption. Evaluate both regimes before submitting your investment declaration.",
    "EPF is technically an earning, but it's a forced saving, so it acts as a deduction from your monthly cash flow.",
    "Special Allowance is typically the balancing figure in your CTC structure and is fully taxable."
  ],
  commonMistakes: [
    "Assuming CTC divided by 12 equals your monthly take-home salary.",
    "Forgetting that the employer's share of EPF is usually part of the CTC.",
    "Not factoring in TDS (Income Tax) which significantly reduces take-home pay for higher income brackets.",
    "Ignoring the fact that Gratuity is often included in CTC but is only paid out when you leave the company after 5 years."
  ],
  faqs: [
    { question: "What is CTC?", answer: "CTC stands for Cost to Company. It is the total amount a company spends on an employee in a year, including gross salary, employer provident fund contributions, gratuity, and insurance." },
    { question: "Why is my take-home salary much lower than my CTC?", answer: "Your take-home salary deducts employer EPF, employee EPF, professional tax, income tax (TDS), and gratuity from the CTC. These deductions cause the visible gap between CTC and in-hand pay." },
    { question: "Is EPF mandatory?", answer: "EPF is mandatory if your Basic Salary is less than ₹15,000 per month. For basic salaries above that, it is technically optional, but most employers include it as a standard practice." },
    { question: "What is Professional Tax?", answer: "Professional Tax is a direct tax levied by state governments on income earned by professionals and salaried employees. It usually ranges from ₹150 to ₹200 per month (max ₹2,500 per year)." },
    { question: "How does the New Tax Regime affect my take-home?", answer: "The New Regime generally has lower tax rates but does not allow standard deductions like HRA, LTA, and 80C. For most incomes up to ₹7 Lakhs, tax is zero under the new regime." },
    { question: "Can I opt out of Gratuity to increase take-home?", answer: "No, Gratuity is a statutory requirement under the Payment of Gratuity Act for eligible establishments. If an employer factors it into CTC, it cannot be opted out of to increase monthly cash flow." },
    { question: "What is HRA and can I claim it?", answer: "HRA is House Rent Allowance. If you live in a rented house and opt for the Old Tax Regime, you can claim a portion of your HRA as tax-exempt. It is fully taxable under the New Tax Regime." },
    { question: "Is this calculator exact?", answer: "This calculator provides a very close estimate. Exact figures may vary slightly by a few rupees based on your employer's specific rounding policies, meal coupons, health insurance premiums, or precise tax declarations." }
  ],
  relatedCalculators: [
    { title: "Income Tax Calculator", link: "/income-tax-calculator" },
    { title: "EMI Calculator", link: "/emi-calculator" },
    { title: "GST Calculator", link: "/gst-calculator" }
  ]
};
`);

// 4. Salary Bar Chart
write('d:\\calculator\\src\\components\\charts\\SalaryBarChart.tsx', `
'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCompactINR, formatINR } from '@/lib/formatters';
import { SalaryBreakdown } from '@/lib/calculators/salary';

interface SalaryBarChartProps {
  breakdown: SalaryBreakdown[];
}

export default function SalaryBarChart({ breakdown }: SalaryBarChartProps) {
  const data = breakdown.map(item => ({
    name: item.component,
    value: item.annual,
    type: item.type
  }));

  const earnings = data.filter(d => d.type === 'earning');
  const deductions = data.filter(d => d.type === 'deduction');

  const combinedData = [
    {
      name: 'Earnings vs Deductions',
      Earnings: earnings.reduce((sum, item) => sum + item.value, 0),
      Deductions: deductions.reduce((sum, item) => sum + item.value, 0)
    }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={combinedData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickFormatter={formatCompactINR} />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip formatter={(value: number) => formatINR(value)} />
          <Legend />
          <Bar dataKey="Earnings" stackId="a" fill="#10b981" />
          <Bar dataKey="Deductions" stackId="a" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
`);

// 5. Salary Pie Chart
write('d:\\calculator\\src\\components\\charts\\SalaryPieChart.tsx', `
'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatINR } from '@/lib/formatters';
import { SalaryBreakdown } from '@/lib/calculators/salary';

interface SalaryPieChartProps {
  breakdown: SalaryBreakdown[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

export default function SalaryPieChart({ breakdown }: SalaryPieChartProps) {
  const data = breakdown
    .filter(item => item.annual > 0)
    .map(item => ({
      name: item.component,
      value: item.annual
    }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatINR(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
`);

// 6. Salary Calculator Component
write('d:\\calculator\\src\\components\\calculators\\SalaryCalculator.tsx', `
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
                  className={\`py-2 text-sm rounded-md border font-medium transition-colors \${input.taxRegime === 'new' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}\`}
                >
                  New Regime
                </button>
                <button 
                  onClick={() => setInput({ ...input, taxRegime: 'old' })}
                  className={\`py-2 text-sm rounded-md border font-medium transition-colors \${input.taxRegime === 'old' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}\`}
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
                          <span className={\`w-2 h-2 rounded-full mr-2 \${item.type === 'earning' ? 'bg-green-500' : 'bg-red-500'}\`}></span>
                          <span className="text-sm font-medium text-gray-800">{item.component}</span>
                        </div>
                      </td>
                      <td className={\`py-3 px-4 text-right text-sm \${item.type === 'earning' ? 'text-green-600' : 'text-red-600'}\`}>
                        {formatINR(item.monthly)}
                      </td>
                      <td className={\`py-3 px-4 text-right text-sm font-medium \${item.type === 'earning' ? 'text-gray-900' : 'text-red-600'}\`}>
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
`);

// 7. Salary Page
write('d:\\calculator\\src\\app\\salary-calculator\\page.tsx', `
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { salaryCalculatorContent } from '@/data/calculator-content/salary';
import SalaryCalculator from '@/components/calculators/SalaryCalculator';

export const metadata: Metadata = {
  title: salaryCalculatorContent.pageTitle,
  description: salaryCalculatorContent.metaDescription,
};

export default function SalaryCalculatorPage() {
  const { h1, introText, howToUse, formulaExplanation, solvedExamples, tips, commonMistakes, faqs } = salaryCalculatorContent;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{h1}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{introText}</p>
      </div>

      <div className="mb-12">
        <Suspense fallback={<div className="h-[600px] flex items-center justify-center bg-gray-50 rounded-xl border animate-pulse">Loading calculator...</div>}>
          <SalaryCalculator />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the Salary Calculator</h2>
          <div className="space-y-6">
            {howToUse.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">CTC vs In-Hand Formula</h2>
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <div className="prose prose-emerald max-w-none text-sm text-gray-700 whitespace-pre-line">
              {formulaExplanation}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Solved Salary Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solvedExamples.map((example, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-3">{example.title}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{example.calculation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips for Maximizing Take-Home</h2>
          <ul className="space-y-4">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-gray-600 text-sm bg-white p-4 rounded-lg border border-gray-50 shadow-sm">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Myths & Mistakes</h2>
          <ul className="space-y-4">
            {commonMistakes.map((mistake, i) => (
              <li key={i} className="flex gap-3 text-gray-600 text-sm bg-white p-4 rounded-lg border border-gray-50 shadow-sm">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-16 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-bold text-gray-800 mb-2 flex items-start gap-2">
                <span className="text-blue-500">Q.</span> {faq.question}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed pl-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
`);
