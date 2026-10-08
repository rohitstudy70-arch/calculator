'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  performBasicOperation,
  calculateBasicPercentage,
  formatBasicNumber,
} from '@/lib/calculators/basic-calculator';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';
import { ShareActions } from '@/components/ui/ShareActions';
import { generateShareableLink } from '@/lib/url-params';

interface HistoryItem {
  expression: string;
  result: string;
  timestamp: string;
}

export function BasicCalculator() {
  const [display, setDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [equationPreview, setEquationPreview] = useState<string>('');
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Input Digit
  const inputDigit = useCallback(
    (digit: string) => {
      if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else {
        setDisplay((prev) => (prev === '0' ? digit : prev + digit));
      }
    },
    [waitingForOperand]
  );

  // Input Decimal Point
  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  }, [display, waitingForOperand]);

  // All Clear (AC)
  const clearAll = useCallback(() => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setEquationPreview('');
  }, []);

  // Backspace (⌫)
  const handleBackspace = useCallback(() => {
    if (waitingForOperand) return;
    setDisplay((prev) => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  }, [waitingForOperand]);

  // Toggle Sign (+/-)
  const toggleSign = useCallback(() => {
    const val = parseFloat(display);
    if (!isNaN(val) && val !== 0) {
      setDisplay(String(-val));
    }
  }, [display]);

  // Percentage (%)
  const handlePercent = useCallback(() => {
    const current = parseFloat(display);
    if (isNaN(current)) return;
    const res = calculateBasicPercentage(current, prevValue !== null ? prevValue : undefined);
    setDisplay(String(res));
  }, [display, prevValue]);

  // Perform Operation (+, -, ×, ÷)
  const handleOperator = useCallback(
    (nextOp: string) => {
      const current = parseFloat(display);

      if (prevValue === null) {
        setPrevValue(current);
        setEquationPreview(`${display} ${nextOp}`);
      } else if (operation) {
        if (!waitingForOperand) {
          const res = performBasicOperation(operation, prevValue, current);
          if (!res.isValid) {
            setDisplay(res.error || 'Error');
            setPrevValue(null);
            setOperation(null);
            setWaitingForOperand(true);
            return;
          }
          setDisplay(String(res.value));
          setPrevValue(res.value);
          setEquationPreview(`${formatBasicNumber(res.value)} ${nextOp}`);
        } else {
          setEquationPreview(`${formatBasicNumber(prevValue)} ${nextOp}`);
        }
      }

      setWaitingForOperand(true);
      setOperation(nextOp);
    },
    [display, prevValue, operation, waitingForOperand]
  );

  // Equals (=)
  const handleEquals = useCallback(() => {
    if (prevValue === null || !operation) return;

    const current = parseFloat(display);
    const res = performBasicOperation(operation, prevValue, current);

    const fullExpr = `${formatBasicNumber(prevValue)} ${operation} ${formatBasicNumber(current)}`;

    if (!res.isValid) {
      setDisplay(res.error || 'Error');
    } else {
      setDisplay(String(res.value));
      setHistory((prev) => [
        {
          expression: fullExpr,
          result: res.formatted,
          timestamp: new Date().toLocaleTimeString(),
        },
        ...prev.slice(0, 19),
      ]);
    }

    setEquationPreview(`${fullExpr} =`);
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  }, [display, prevValue, operation]);

  // Memory Functions
  const memoryAdd = () => {
    const val = parseFloat(display) || 0;
    setMemory((m) => m + val);
    setWaitingForOperand(true);
  };

  const memorySub = () => {
    const val = parseFloat(display) || 0;
    setMemory((m) => m - val);
    setWaitingForOperand(true);
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(false);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDecimal();
      } else if (e.key === '+') {
        handleOperator('+');
      } else if (e.key === '-') {
        handleOperator('-');
      } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
        handleOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Escape') {
        clearAll();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === '%') {
        handlePercent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    inputDigit,
    inputDecimal,
    handleOperator,
    handleEquals,
    clearAll,
    handleBackspace,
    handlePercent,
  ]);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePdfExport = () => {
    exportToPDF(
      'Online Calculator History Tape Report',
      [
        { label: 'Current Value', value: display },
        { label: 'Memory Register', value: String(memory) },
        { label: 'Total Operations Recorded', value: `${history.length}` },
      ],
      ['Calculation Expression', 'Computed Result'],
      history.map((h) => [h.expression, h.result])
    );
  };

  const handleExcelExport = () => {
    exportToExcel(
      ['Expression', 'Result'],
      history.map((h) => [h.expression, h.result]),
      'Calculator_History_Tape'
    );
  };

  const shareUrl = generateShareableLink('/calculator', {});

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calculator Body (Left) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl max-w-lg mx-auto w-full">
          {/* Top Status Bar: Memory status & Keyboard indicator */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2 px-1">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[11px] ${memory !== 0 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 font-bold' : 'opacity-40'}`}>
                M {memory !== 0 ? `(${memory})` : ''}
              </span>
              <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                ⌨️ Keyboard Enabled
              </span>
            </div>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 font-bold transition-colors cursor-pointer"
            >
              Reset (Esc)
            </button>
          </div>

          {/* LCD Digital Display */}
          <div className="bg-slate-950 text-white rounded-2xl p-5 mb-6 shadow-inner border border-slate-800 flex flex-col justify-end min-h-[110px] text-right font-mono">
            <div className="text-xs sm:text-sm text-slate-400 h-5 overflow-hidden text-ellipsis whitespace-nowrap">
              {equationPreview || ' '}
            </div>
            <div
              className={`font-bold tracking-tight text-white transition-all overflow-x-auto whitespace-nowrap no-scrollbar ${
                display.length > 12 ? 'text-2xl sm:text-3xl' : display.length > 8 ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
              }`}
            >
              {display}
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3 select-none">
            {/* Memory Row */}
            <button
              type="button"
              onClick={memoryClear}
              className="h-12 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              MC
            </button>
            <button
              type="button"
              onClick={memoryRecall}
              className="h-12 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              MR
            </button>
            <button
              type="button"
              onClick={memorySub}
              className="h-12 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              M-
            </button>
            <button
              type="button"
              onClick={memoryAdd}
              className="h-12 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              M+
            </button>

            {/* Row 1: Clear, Sign, Percent, Divide */}
            <button
              type="button"
              onClick={clearAll}
              className="h-14 rounded-2xl text-base sm:text-lg font-bold bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/60 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              AC
            </button>
            <button
              type="button"
              onClick={toggleSign}
              className="h-14 rounded-2xl text-base sm:text-lg font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              +/-
            </button>
            <button
              type="button"
              onClick={handlePercent}
              className="h-14 rounded-2xl text-base sm:text-lg font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              %
            </button>
            <button
              type="button"
              onClick={() => handleOperator('÷')}
              className={`h-14 rounded-2xl text-xl font-bold transition-all active:scale-95 cursor-pointer shadow-sm ${
                operation === '÷'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/50'
              }`}
            >
              ÷
            </button>

            {/* Row 2: 7, 8, 9, Multiply */}
            <button
              type="button"
              onClick={() => inputDigit('7')}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => inputDigit('8')}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => inputDigit('9')}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              9
            </button>
            <button
              type="button"
              onClick={() => handleOperator('×')}
              className={`h-14 rounded-2xl text-xl font-bold transition-all active:scale-95 cursor-pointer shadow-sm ${
                operation === '×'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/50'
              }`}
            >
              ×
            </button>

            {/* Row 3: 4, 5, 6, Subtract */}
            <button
              type="button"
              onClick={() => inputDigit('4')}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => inputDigit('5')}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => inputDigit('6')}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              6
            </button>
            <button
              type="button"
              onClick={() => handleOperator('-')}
              className={`h-14 rounded-2xl text-xl font-bold transition-all active:scale-95 cursor-pointer shadow-sm ${
                operation === '-'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/50'
              }`}
            >
              -
            </button>

            {/* Row 4: 1, 2, 3, Add */}
            <button
              type="button"
              onClick={() => inputDigit('1')}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => inputDigit('2')}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => inputDigit('3')}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => handleOperator('+')}
              className={`h-14 rounded-2xl text-xl font-bold transition-all active:scale-95 cursor-pointer shadow-sm ${
                operation === '+'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/50'
              }`}
            >
              +
            </button>

            {/* Row 5: 0, Decimal, Backspace, Equals */}
            <button
              type="button"
              onClick={() => inputDigit('0')}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              0
            </button>
            <button
              type="button"
              onClick={inputDecimal}
              className="h-14 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              .
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="h-14 rounded-2xl text-base font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
              title="Backspace"
            >
              ⌫
            </button>
            <button
              type="button"
              onClick={handleEquals}
              className="h-14 rounded-2xl text-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-95 cursor-pointer shadow-md"
            >
              =
            </button>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <span>Tip: Enter for =, Esc for AC</span>
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Calculation Tape & History Log (Right) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🧾</span>
              <span>Calculation Tape (इतिहास)</span>
            </h3>
            {history.length > 0 && (
              <button
                type="button"
                onClick={() => setHistory([])}
                className="text-xs text-rose-500 hover:text-rose-600 font-semibold cursor-pointer"
              >
                Clear History
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
              <p className="text-2xl mb-2">🧮</p>
              <p>No calculations yet.</p>
              <p className="text-xs mt-1">Your calculation history will appear here in real-time.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-blue-300 dark:hover:border-blue-700 transition-all font-mono"
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.expression} =
                    </span>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {item.result}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(item.result, idx)}
                    className="text-xs px-2.5 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer shadow-sm"
                  >
                    {copiedIndex === idx ? 'Copied! ✅' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BasicCalculator;
