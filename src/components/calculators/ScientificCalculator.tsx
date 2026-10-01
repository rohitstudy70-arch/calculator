'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShareActions } from '@/components/ui/ShareActions';
import { DataTable } from '@/components/ui/DataTable';
import {
  calculateScientific,
  AngleUnit,
  CalculationHistoryItem,
} from '@/lib/calculators/scientific';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

export function ScientificCalculator() {
  const searchParams = useSearchParams();
  const [expression, setExpression] = useState<string>(searchParams.get('expr') || '10 + 5 * 2^3');
  const [angleUnit, setAngleUnit] = useState<AngleUnit>((searchParams.get('deg') as AngleUnit) || 'deg');
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const result = useMemo(
    () => calculateScientific({ expression, angleUnit }),
    [expression, angleUnit]
  );

  const handleEvaluate = useCallback(() => {
    if (!expression.trim()) return;
    const res = calculateScientific({ expression, angleUnit });
    if (res.isValid) {
      setHistory((prev) => [
        {
          expression: res.expression,
          result: res.formattedResult,
          timestamp: new Date().toLocaleTimeString(),
        },
        ...prev.slice(0, 19),
      ]);
    }
  }, [expression, angleUnit]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        handleEvaluate();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setExpression('');
      } else if (e.key === 'Backspace') {
        setExpression((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEvaluate]);

  const insert = (val: string) => {
    setExpression((prev) => prev + val);
  };

  const clear = () => {
    setExpression('');
  };

  const backspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const tableHeaders = ['Time', 'Mathematical Expression', 'Evaluated Result'];
  const tableData = useMemo(
    () => history.map((item) => [item.timestamp, item.expression, item.result]),
    [history]
  );

  const handlePdfExport = () => {
    exportToPDF(
      'Scientific Calculation & Session History Log',
      [
        { label: 'Current Expression', value: expression },
        { label: 'Calculated Result', value: result.formattedResult },
        { label: 'Angle Mode', value: angleUnit.toUpperCase() },
        { label: 'Evaluation Status', value: result.isValid ? 'Valid' : 'Syntax Error' },
      ],
      tableHeaders,
      tableData.length > 0 ? tableData : [['Current', expression, result.formattedResult]]
    );
  };

  const handleExcelExport = () => {
    exportToExcel(
      tableHeaders,
      tableData.length > 0 ? tableData : [['Current', expression, result.formattedResult]],
      'Scientific_Calculations_History'
    );
  };

  const shareUrl = generateShareableLink('/scientific-calculator', {
    expr: expression,
    deg: angleUnit,
  });

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Keypad & Input Screen */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Display Screen */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-800 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => setAngleUnit((prev) => (prev === 'deg' ? 'rad' : 'deg'))}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold uppercase transition-colors"
                >
                  {angleUnit}
                </button>
                <span>Angle Mode</span>
              </div>
              <span>{result.isValid ? 'Ready' : 'Error'}</span>
            </div>

            {/* Editable Expression Field */}
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Enter equation (e.g., sin(30) + 5^2)"
              className="w-full bg-transparent text-xl md:text-2xl font-mono text-white placeholder-slate-500 focus:outline-none text-right py-1"
            />

            {/* Result Preview Line */}
            <div className="text-right text-2xl md:text-3xl font-bold font-mono text-emerald-400 overflow-x-auto">
              = {result.formattedResult}
            </div>
            {!result.isValid && result.errorMessage && (
              <div className="text-xs text-rose-400 text-right font-mono">{result.errorMessage}</div>
            )}
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-5 gap-2 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700">
            {/* Row 1 */}
            <button
              onClick={() => setAngleUnit((prev) => (prev === 'deg' ? 'rad' : 'deg'))}
              className="p-3 text-xs font-bold rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:opacity-90"
            >
              {angleUnit === 'deg' ? 'RAD' : 'DEG'}
            </button>
            <button
              onClick={() => insert('sin(')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              sin
            </button>
            <button
              onClick={() => insert('cos(')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              cos
            </button>
            <button
              onClick={() => insert('tan(')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              tan
            </button>
            <button
              onClick={clear}
              className="p-3 text-xs font-bold rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 hover:bg-rose-200"
            >
              AC
            </button>

            {/* Row 2 */}
            <button
              onClick={() => insert('asin(')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              sin⁻¹
            </button>
            <button
              onClick={() => insert('acos(')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              cos⁻¹
            </button>
            <button
              onClick={() => insert('atan(')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              tan⁻¹
            </button>
            <button
              onClick={() => insert('(')}
              className="p-3 text-xs font-bold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              (
            </button>
            <button
              onClick={() => insert(')')}
              className="p-3 text-xs font-bold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              )
            </button>

            {/* Row 3 */}
            <button
              onClick={() => insert('log(')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              log
            </button>
            <button
              onClick={() => insert('ln(')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              ln
            </button>
            <button
              onClick={() => insert('sqrt(')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              √x
            </button>
            <button
              onClick={() => insert('^')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              xʸ
            </button>
            <button
              onClick={backspace}
              className="p-3 text-xs font-bold rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 hover:bg-amber-200"
            >
              ⌫
            </button>

            {/* Row 4 (Numbers 7, 8, 9 & Ops) */}
            <button
              onClick={() => insert('pi')}
              className="p-3 text-xs font-semibold rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:opacity-90"
            >
              π
            </button>
            <button
              onClick={() => insert('7')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              7
            </button>
            <button
              onClick={() => insert('8')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              8
            </button>
            <button
              onClick={() => insert('9')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              9
            </button>
            <button
              onClick={() => insert('/')}
              className="p-3 text-base font-bold rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
            >
              ÷
            </button>

            {/* Row 5 (Numbers 4, 5, 6 & Ops) */}
            <button
              onClick={() => insert('e')}
              className="p-3 text-xs font-semibold rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:opacity-90"
            >
              e
            </button>
            <button
              onClick={() => insert('4')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              4
            </button>
            <button
              onClick={() => insert('5')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              5
            </button>
            <button
              onClick={() => insert('6')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              6
            </button>
            <button
              onClick={() => insert('*')}
              className="p-3 text-base font-bold rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
            >
              ×
            </button>

            {/* Row 6 (Numbers 1, 2, 3 & Ops) */}
            <button
              onClick={() => insert('!')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              n!
            </button>
            <button
              onClick={() => insert('1')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              1
            </button>
            <button
              onClick={() => insert('2')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              2
            </button>
            <button
              onClick={() => insert('3')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              3
            </button>
            <button
              onClick={() => insert('-')}
              className="p-3 text-base font-bold rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
            >
              −
            </button>

            {/* Row 7 (0, ., %, +, =) */}
            <button
              onClick={() => insert('%')}
              className="p-3 text-xs font-semibold rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            >
              %
            </button>
            <button
              onClick={() => insert('0')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              0
            </button>
            <button
              onClick={() => insert('.')}
              className="p-3 text-base font-bold rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100"
            >
              .
            </button>
            <button
              onClick={handleEvaluate}
              className="p-3 text-base font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
            >
              =
            </button>
            <button
              onClick={() => insert('+')}
              className="p-3 text-base font-bold rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
            >
              +
            </button>
          </div>

          <div className="flex justify-end mt-2">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Column: History & Shortcuts */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                <span>Calculation History</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {history.length}
                </span>
              </h3>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-xs">
                No previous calculations in this session. Press &quot;=&quot; or Enter to log items.
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setExpression(item.expression)}
                    className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono overflow-x-auto">
                      {item.expression}
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white font-mono text-right">
                      = {item.result}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Data Table */}
      {history.length > 0 && (
        <div className="w-full">
          <DataTable
            caption="Recent Session Calculation History"
            headers={tableHeaders}
            data={tableData}
          />
        </div>
      )}
    </div>
  );
}

export default ScientificCalculator;
