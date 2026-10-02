'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { CompareToggle } from '@/components/ui/CompareToggle';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';
import {
  getAvailableStates,
  getUnitsForState,
  convertLandUnit,
  generateConversionTable,
  LandConverterInput,
} from '@/lib/calculators/land-converter';

function CalculatorInstance({
  id,
  initialState = 'uttar_pradesh',
  initialFromUnit = 'bigha_pucca',
  initialToUnit = 'sq_ft',
  initialValue = 1,
}: {
  id: string;
  initialState?: string;
  initialFromUnit?: string;
  initialToUnit?: string;
  initialValue?: number;
}) {
  const states = useMemo(() => getAvailableStates(), []);
  const [selectedState, setSelectedState] = useState(initialState);
  const [value, setValue] = useState(initialValue);
  const [fromUnit, setFromUnit] = useState(initialFromUnit);
  const [toUnit, setToUnit] = useState(initialToUnit);

  const units = useMemo(() => getUnitsForState(selectedState), [selectedState]);

  // Reset units when state changes if current ones don't exist
  useEffect(() => {
    const fromExists = units.some(u => u.unitKey === fromUnit);
    const toExists = units.some(u => u.unitKey === toUnit);
    if (!fromExists) setFromUnit(units[0]?.unitKey || '');
    if (!toExists) setToUnit(units.find(u => u.unitKey === 'sq_ft')?.unitKey || units[1]?.unitKey || '');
  }, [selectedState, units]);

  const input: LandConverterInput = useMemo(() => ({
    value,
    fromUnit,
    toUnit,
    state: selectedState,
  }), [value, fromUnit, toUnit, selectedState]);

  const result = useMemo(() => {
    try {
      if (value >= 0 && fromUnit && toUnit && selectedState) {
        return convertLandUnit(input);
      }
    } catch { /* invalid input */ }
    return null;
  }, [input, value, fromUnit, toUnit, selectedState]);

  const conversionTable = useMemo(() => {
    try {
      if (value >= 0 && fromUnit && selectedState) {
        return generateConversionTable(selectedState, fromUnit, value);
      }
    } catch { /* invalid */ }
    return null;
  }, [selectedState, fromUnit, value]);

  const tableHeaders = ['Unit', 'Converted Value'];
  const tableData = useMemo(() => {
    if (!conversionTable) return [];
    return conversionTable.conversions.map(c => [
      c.toUnitName,
      c.value.toLocaleString('en-IN', { maximumFractionDigits: 4 }),
    ]);
  }, [conversionTable]);

  const handlePdfExport = () => {
    if (!result) return;
    exportToPDF(
      'Land Unit Conversion Report',
      [
        { label: 'State', value: result.stateName },
        { label: 'Input', value: `${result.inputValue} ${result.fromUnitName}` },
        { label: 'Result', value: `${result.outputValue.toLocaleString('en-IN', { maximumFractionDigits: 4 })} ${result.toUnitName}` },
        { label: 'Square Feet Equivalent', value: `${result.sqFtEquivalent.toLocaleString('en-IN', { maximumFractionDigits: 2 })} sq ft` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Land_Conversion_Report');
  };

  const shareUrl = generateShareableLink('/land-unit-converter', {
    state: selectedState,
    from: fromUnit,
    to: toUnit,
    val: String(value),
  });

  const fromUnitName = units.find(u => u.unitKey === fromUnit)?.nameEn || fromUnit;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* State Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Select State (राज्य चुनें)
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {states.map(s => (
                <option key={s.key} value={s.key}>{s.name} ({s.nameHi})</option>
              ))}
            </select>
          </div>

          {/* Value Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Value (मूल्य)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={value === 0 ? '' : value}
              onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
              placeholder="Enter value"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* From / To Units */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                From Unit (इससे)
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {units.map(u => (
                  <option key={u.unitKey} value={u.unitKey}>{u.nameEn} ({u.nameHi})</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                To Unit (इसमें)
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {units.map(u => (
                  <option key={u.unitKey} value={u.unitKey}>{u.nameEn} ({u.nameHi})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {result && (
            <ResultCard
              title="Conversion Result (रूपांतरण परिणाम)"
              items={[
                {
                  label: `${result.inputValue} ${result.fromUnitName}`,
                  value: `${result.outputValue.toLocaleString('en-IN', { maximumFractionDigits: 4 })} ${result.toUnitName}`,
                  highlight: true,
                  color: '#2563EB',
                },
                {
                  label: 'Square Feet Equivalent',
                  value: `${result.sqFtEquivalent.toLocaleString('en-IN', { maximumFractionDigits: 2 })} sq ft`,
                  highlight: true,
                  color: '#7C3AED',
                },
                {
                  label: 'State',
                  value: result.stateName,
                },
                {
                  label: 'Conversion Factor',
                  value: `1 ${result.fromUnitName} = ${result.conversionFactor.toLocaleString('en-IN', { maximumFractionDigits: 4 })} ${result.toUnitName}`,
                },
              ]}
            />
          )}

          {!result && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center text-gray-500 dark:text-gray-400">
              Enter a value and select units to see conversion results
            </div>
          )}
        </div>
      </div>

      {/* Full Conversion Table */}
      {conversionTable && tableData.length > 0 && (
        <div className="w-full">
          <DataTable
            caption={`Full Conversion Table: ${value} ${fromUnitName} in ${result?.stateName || ''}`}
            headers={tableHeaders}
            data={tableData}
          />
        </div>
      )}
    </div>
  );
}

export function LandConverterCalculator() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initState = searchParams.get('state') || 'uttar_pradesh';
  const initFrom = searchParams.get('from') || 'bigha_pucca';
  const initTo = searchParams.get('to') || 'sq_ft';
  const initVal = parseFloat(searchParams.get('val') || '1') || 1;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialState={initState}
          initialFromUnit={initFrom}
          initialToUnit={initTo}
          initialValue={initVal}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">State 1</h3>
            <CalculatorInstance
              id="comp1"
              initialState="uttar_pradesh"
              initialFromUnit="bigha_pucca"
              initialToUnit="sq_ft"
              initialValue={1}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">State 2</h3>
            <CalculatorInstance
              id="comp2"
              initialState="bihar"
              initialFromUnit="bigha_pucca"
              initialToUnit="sq_ft"
              initialValue={1}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LandConverterCalculator;
