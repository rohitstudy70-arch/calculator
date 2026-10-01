'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { InputGroup } from '@/components/ui/InputGroup';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { CompareToggle } from '@/components/ui/CompareToggle';
import {
  convertUnit,
  UNIT_DATABASE,
  UnitCategory,
  UnitConversionInput,
} from '@/lib/calculators/unit-converter';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

function CalculatorInstance({
  id,
  initialCategory = 'area',
  initialFrom = 'acre',
  initialTo = 'guntha',
  initialValue = 1,
}: {
  id: string;
  initialCategory?: UnitCategory;
  initialFrom?: string;
  initialTo?: string;
  initialValue?: number;
}) {
  const [category, setCategory] = useState<UnitCategory>(initialCategory);
  const [fromUnit, setFromUnit] = useState<string>(initialFrom);
  const [toUnit, setToUnit] = useState<string>(initialTo);
  const [value, setValue] = useState<number>(initialValue);

  // Sync valid units when category changes
  const currentUnits = useMemo(() => Object.values(UNIT_DATABASE[category]?.units || {}), [category]);

  useEffect(() => {
    if (!UNIT_DATABASE[category]?.units[fromUnit]) {
      setFromUnit(currentUnits[0]?.id || 'meter');
    }
    if (!UNIT_DATABASE[category]?.units[toUnit]) {
      setToUnit(currentUnits[1]?.id || currentUnits[0]?.id || 'kilometer');
    }
  }, [category, fromUnit, toUnit, currentUnits]);

  const input: UnitConversionInput = useMemo(
    () => ({
      category,
      fromUnit,
      toUnit,
      value,
    }),
    [category, fromUnit, toUnit, value]
  );

  const result = useMemo(() => convertUnit(input), [input]);

  const tableHeaders = ['Target Unit Name', 'Unit Symbol', 'Equivalent Value'];
  const tableData = useMemo(
    () =>
      result.allUnitConversions.map((item) => [
        item.unitName,
        item.symbol,
        item.formattedValue,
      ]),
    [result]
  );

  const fromObj = UNIT_DATABASE[category]?.units[fromUnit];
  const toObj = UNIT_DATABASE[category]?.units[toUnit];

  const handlePdfExport = () => {
    exportToPDF(
      'Unit Conversion & Multi-Unit Matrix Report',
      [
        { label: 'Category', value: UNIT_DATABASE[category]?.name || category },
        { label: 'Source Value Entered', value: `${value} ${fromObj?.symbol || fromUnit}` },
        { label: 'Converted Output Value', value: `${result.formattedOutput} ${toObj?.symbol || toUnit}` },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(tableHeaders, tableData, 'Unit_Conversion_Matrix');
  };

  const shareUrl = generateShareableLink('/unit-converter', {
    cat: category,
    from: fromUnit,
    to: toUnit,
    val: value,
  });

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Category Tabs */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Measurement Category
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
              {(Object.keys(UNIT_DATABASE) as UnitCategory[]).map((catKey) => (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setCategory(catKey)}
                  className={`py-2 px-2 text-[11px] font-bold rounded-lg border transition-all truncate ${
                    category === catKey
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100'
                  }`}
                  title={UNIT_DATABASE[catKey].name}
                >
                  {catKey === 'indian_number'
                    ? 'Lakh / Crore'
                    : catKey.charAt(0).toUpperCase() + catKey.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <InputGroup
            label="Value to Convert"
            value={value}
            onChange={setValue}
            min={-10000000}
            max={1000000000}
            step={0.1}
          />

          {/* Unit Dropdowns & Swap Button */}
          <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-center">
            <div className="sm:col-span-5 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              >
                {currentUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-1 flex justify-center pt-5">
              <button
                type="button"
                onClick={swapUnits}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors"
                title="Swap Units"
              >
                ⇄
              </button>
            </div>

            <div className="sm:col-span-5 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              >
                {currentUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
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

        {/* Right Results Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ResultCard
            title="Conversion Result"
            items={[
              {
                label: 'Converted Value',
                value: `${result.formattedOutput} ${toObj?.symbol || ''}`,
                highlight: true,
                color: '#2563EB',
              },
              {
                label: 'Conversion Formula',
                value: `1 ${fromObj?.name} = ${(
                  (toObj?.fromBase(fromObj?.toBase(1) || 1) || 1)
                ).toFixed(6)} ${toObj?.symbol}`,
              },
              { label: 'Category', value: UNIT_DATABASE[category]?.name || category },
              { label: 'Base Unit', value: UNIT_DATABASE[category]?.baseUnit || '' },
            ]}
          />

          {/* Quick Snapshot of top 4 alternate units */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Equivalent in Other Units
            </h4>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {result.allUnitConversions
                .filter((item) => item.unitId !== toUnit && item.unitId !== fromUnit)
                .slice(0, 4)
                .map((item) => (
                  <div key={item.unitId} className="p-2.5 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
                    <span className="text-gray-500 dark:text-gray-400 block text-[11px] truncate">
                      {item.unitName}
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                      {item.formattedValue} {item.symbol}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Unit Matrix Table */}
      <div className="w-full">
        <DataTable
          caption={`All Unit Equivalents for ${value} ${fromObj?.name || fromUnit}`}
          headers={tableHeaders}
          data={tableData}
        />
      </div>
    </div>
  );
}

export function UnitConverter() {
  const searchParams = useSearchParams();
  const [isComparing, setIsComparing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initCat = (searchParams.get('cat') as UnitCategory) || 'area';
  const initFrom = searchParams.get('from') || 'acre';
  const initTo = searchParams.get('to') || 'guntha';
  const initVal = searchParams.get('val') ? Number(searchParams.get('val')) : 1;

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <CompareToggle isComparing={isComparing} onToggle={setIsComparing} />
      </div>

      {!isComparing ? (
        <CalculatorInstance
          id="main"
          initialCategory={initCat}
          initialFrom={initFrom}
          initialTo={initTo}
          initialValue={initVal}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="border-r-0 xl:border-r border-gray-200 dark:border-gray-700 xl:pr-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Unit Conversion A</h3>
            <CalculatorInstance
              id="comp1"
              initialCategory={initCat}
              initialFrom={initFrom}
              initialTo={initTo}
              initialValue={initVal}
            />
          </div>
          <div className="xl:pl-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Unit Conversion B</h3>
            <CalculatorInstance
              id="comp2"
              initialCategory="weight"
              initialFrom="tola"
              initialTo="gram"
              initialValue={10}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UnitConverter;
