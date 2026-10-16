'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShareActions } from '@/components/ui/ShareActions';
import { DataTable } from '@/components/ui/DataTable';
import {
  generateGraphPoints,
  findRoots,
  generateValueTable,
  evaluateExpression,
  validateExpression,
  GRAPH_PRESETS,
  GraphPoint,
} from '@/lib/calculators/graphing';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

export function GraphingCalculator() {
  const searchParams = useSearchParams();
  const initExpr = searchParams.get('f1') || 'x^2 - 4';
  const initExpr2 = searchParams.get('f2') || '';
  const initXMin = Number(searchParams.get('xmin')) || -10;
  const initXMax = Number(searchParams.get('xmax')) || 10;
  const initYMin = Number(searchParams.get('ymin')) || -10;
  const initYMax = Number(searchParams.get('ymax')) || 10;

  const [expr1, setExpr1] = useState<string>(initExpr);
  const [expr2, setExpr2] = useState<string>(initExpr2);
  const [showExpr2, setShowExpr2] = useState<boolean>(Boolean(initExpr2));
  const [xMin, setXMin] = useState<number>(initXMin);
  const [xMax, setXMax] = useState<number>(initXMax);
  const [yMin, setYMin] = useState<number>(initYMin);
  const [yMax, setYMax] = useState<number>(initYMax);
  const [showTable, setShowTable] = useState<boolean>(true);
  const [tableStep, setTableStep] = useState<number>(1);
  const [showRoots, setShowRoots] = useState<boolean>(true);

  const svgRef = useRef<SVGSVGElement>(null);

  // Validate inputs
  const validation1 = useMemo(() => validateExpression(expr1), [expr1]);
  const validation2 = useMemo(
    () => (showExpr2 && expr2 ? validateExpression(expr2) : { valid: true, error: null }),
    [showExpr2, expr2]
  );

  // Calculate points
  const graph1 = useMemo(() => {
    if (!validation1.valid) return { points: [], hasErrors: true };
    return generateGraphPoints(expr1, xMin, xMax, 250);
  }, [expr1, xMin, xMax, validation1.valid]);

  const graph2 = useMemo(() => {
    if (!showExpr2 || !expr2 || !validation2.valid) return { points: [], hasErrors: false };
    return generateGraphPoints(expr2, xMin, xMax, 250);
  }, [showExpr2, expr2, xMin, xMax, validation2.valid]);

  // Roots of f1(x)
  const roots1 = useMemo(() => {
    if (!validation1.valid) return [];
    return findRoots(expr1, xMin, xMax);
  }, [expr1, xMin, xMax, validation1.valid]);

  // Y-intercept of f1(x)
  const yIntercept1 = useMemo(() => {
    if (!validation1.valid) return null;
    const val = evaluateExpression(expr1, 0);
    return isNaN(val) || !isFinite(val) ? null : Number(val.toFixed(2));
  }, [expr1, validation1.valid]);

  // Value Table for f1(x)
  const valueTable = useMemo(() => {
    if (!validation1.valid) return [];
    const start = Math.max(-10, Math.floor(xMin));
    const end = Math.min(10, Math.ceil(xMax));
    return generateValueTable(expr1, start, end, tableStep);
  }, [expr1, xMin, xMax, tableStep, validation1.valid]);

  // SVG Coordinate Conversion Helpers
  const width = 640;
  const height = 440;
  const padding = 40;
  const plotWidth = width - 2 * padding;
  const plotHeight = height - 2 * padding;

  const toSvgX = (x: number): number => {
    return padding + ((x - xMin) / (xMax - xMin)) * plotWidth;
  };

  const toSvgY = (y: number): number => {
    return height - padding - ((y - yMin) / (yMax - yMin)) * plotHeight;
  };

  // Convert points to SVG path
  const buildSvgPath = (points: GraphPoint[]): string => {
    if (points.length === 0) return '';
    let path = '';
    let isDrawing = false;

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      // Check if point is within visible Y limits plus boundary margin
      if (p.y >= yMin - 15 && p.y <= yMax + 15) {
        const sx = toSvgX(p.x);
        const sy = toSvgY(p.y);
        if (!isDrawing) {
          path += `M ${sx.toFixed(1)} ${sy.toFixed(1)}`;
          isDrawing = true;
        } else {
          path += ` L ${sx.toFixed(1)} ${sy.toFixed(1)}`;
        }
      } else {
        isDrawing = false; // discontinuity (e.g. asymptote or out-of-bounds)
      }
    }
    return path;
  };

  const path1 = useMemo(() => buildSvgPath(graph1.points), [graph1.points, xMin, xMax, yMin, yMax]);
  const path2 = useMemo(() => buildSvgPath(graph2.points), [graph2.points, xMin, xMax, yMin, yMax]);

  // Axis positions
  const originX = toSvgX(0);
  const originY = toSvgY(0);

  // Generate grid ticks
  const xTicks = useMemo(() => {
    const ticks: number[] = [];
    const step = Math.max(1, Math.round((xMax - xMin) / 10));
    const start = Math.ceil(xMin / step) * step;
    for (let t = start; t <= xMax; t += step) {
      if (Math.abs(t) < 0.001) continue; // skip origin
      ticks.push(t);
    }
    return ticks;
  }, [xMin, xMax]);

  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    const step = Math.max(1, Math.round((yMax - yMin) / 10));
    const start = Math.ceil(yMin / step) * step;
    for (let t = start; t <= yMax; t += step) {
      if (Math.abs(t) < 0.001) continue; // skip origin
      ticks.push(t);
    }
    return ticks;
  }, [yMin, yMax]);

  // Zoom / View handlers
  const handleZoom = (factor: number) => {
    setXMin((prev) => Math.round(prev * factor));
    setXMax((prev) => Math.round(prev * factor));
    setYMin((prev) => Math.round(prev * factor));
    setYMax((prev) => Math.round(prev * factor));
  };

  const handleResetView = () => {
    setXMin(-10);
    setXMax(10);
    setYMin(-10);
    setYMax(10);
  };

  const handlePresetSelect = (preset: (typeof GRAPH_PRESETS)[0]) => {
    setExpr1(preset.expression);
  };

  // Export handlers
  const handleExportPDF = () => {
    const tableHeaders = ['x (Input)', `f1(x) = ${expr1}`];
    if (showExpr2 && expr2) {
      tableHeaders.push(`f2(x) = ${expr2}`);
    }

    const tableData: (string | number)[][] = valueTable.map((row) => {
      const val2 = showExpr2 && expr2 ? evaluateExpression(expr2, row.x) : null;
      const cols: (string | number)[] = [
        row.x,
        row.y !== null ? row.y : 'Undefined',
      ];
      if (showExpr2 && expr2) {
        cols.push(val2 !== null && !isNaN(val2) && isFinite(val2) ? Number(val2.toFixed(4)) : 'Undefined');
      }
      return cols;
    });

    exportToPDF(
      'Graphing Calculator Report',
      [
        { label: 'Function 1', value: `f1(x) = ${expr1}` },
        { label: 'Function 2', value: showExpr2 && expr2 ? `f2(x) = ${expr2}` : 'None' },
        { label: 'X Range', value: `[${xMin}, ${xMax}]` },
        { label: 'Y Range', value: `[${yMin}, ${yMax}]` },
        { label: 'Real Roots', value: roots1.length > 0 ? roots1.join(', ') : 'None' },
        { label: 'Y-Intercept', value: yIntercept1 !== null ? String(yIntercept1) : 'Undefined' },
      ],
      tableHeaders,
      tableData
    );
  };

  const handleExportExcel = () => {
    const tableHeaders = ['x (Input)', `f1(x) = ${expr1}`];
    if (showExpr2 && expr2) {
      tableHeaders.push(`f2(x) = ${expr2}`);
    }

    const tableData: (string | number)[][] = valueTable.map((row) => {
      const val2 = showExpr2 && expr2 ? evaluateExpression(expr2, row.x) : null;
      const cols: (string | number)[] = [
        row.x,
        row.y !== null ? row.y : 'Undefined',
      ];
      if (showExpr2 && expr2) {
        cols.push(val2 !== null && !isNaN(val2) && isFinite(val2) ? Number(val2.toFixed(4)) : 'Undefined');
      }
      return cols;
    });

    exportToExcel(tableHeaders, tableData, `Function-Table-${expr1.replace(/[^a-zA-Z0-9]/g, '_')}`);
  };

  const shareParams: Record<string, string | number> = {
    f1: expr1,
    xmin: xMin,
    xmax: xMax,
    ymin: yMin,
    ymax: yMax,
  };
  if (showExpr2 && expr2) {
    shareParams.f2 = expr2;
  }

  const shareableUrl = generateShareableLink('/graphing-calculator', shareParams);

  return (
    <div id="graph-content" className="space-y-6">
      {/* Top Banner & Function Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="p-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-lg">
                📈
              </span>
              2D Graphing Calculator
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Plot algebraic, trigonometric, polynomial & calculus curves in real-time.
            </p>
          </div>

          {/* Quick Presets Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Presets:
            </span>
            <select
              className="text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => {
                const found = GRAPH_PRESETS.find((p) => p.name === e.target.value);
                if (found) handlePresetSelect(found);
              }}
              defaultValue="Quadratic Parabola"
            >
              {GRAPH_PRESETS.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} ({p.expression})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Function Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Function 1: <span className="font-mono text-indigo-600 dark:text-indigo-400">f₁(x) =</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={expr1}
                onChange={(e) => setExpr1(e.target.value)}
                placeholder="e.g. x^2 - 4, sin(x), 2x + 1, e^x, 1/x"
                className={`w-full font-mono text-base px-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                  validation1.valid
                    ? 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'
                    : 'border-red-400 focus:ring-red-400'
                }`}
              />
              <span className="absolute right-3 top-2.5 px-2 py-0.5 text-xs font-bold rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                f₁(x)
              </span>
            </div>
            {!validation1.valid && (
              <p className="text-xs text-red-500 mt-1">{validation1.error}</p>
            )}
          </div>

          {/* Optional Function 2 */}
          {showExpr2 ? (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Function 2: <span className="font-mono text-emerald-600 dark:text-emerald-400">f₂(x) =</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowExpr2(false)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove f₂(x)
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={expr2}
                  onChange={(e) => setExpr2(e.target.value)}
                  placeholder="e.g. 2x - 1, cos(x)"
                  className={`w-full font-mono text-base px-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                    validation2.valid
                      ? 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500'
                      : 'border-red-400 focus:ring-red-400'
                  }`}
                />
                <span className="absolute right-3 top-2.5 px-2 py-0.5 text-xs font-bold rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                  f₂(x)
                </span>
              </div>
              {!validation2.valid && (
                <p className="text-xs text-red-500 mt-1">{validation2.error}</p>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setShowExpr2(true);
                if (!expr2) setExpr2('2*x');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              + Add second function f₂(x) to compare curves
            </button>
          )}

          {/* Quick syntax reference chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-600 dark:text-gray-300">Supported:</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-mono">x^2</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-mono">sin(x)</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-mono">cos(x)</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-mono">tan(x)</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-mono">sqrt(x)</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-mono">ln(x)</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-mono">abs(x)</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-mono">pi</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-mono">e</span>
          </div>
        </div>
      </div>

      {/* Main Coordinate Grid & Graph Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6">
        {/* Controls Bar: Zoom & Window bounds */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleZoom(0.8)}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
              title="Zoom In"
            >
              🔍 + Zoom In
            </button>
            <button
              onClick={() => handleZoom(1.25)}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
              title="Zoom Out"
            >
              🔍 − Zoom Out
            </button>
            <button
              onClick={handleResetView}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
            >
              🔄 Reset [-10, 10]
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-gray-500 dark:text-gray-400">
              Window: X [{xMin}, {xMax}] × Y [{yMin}, {yMax}]
            </span>
            <label className="flex items-center gap-1.5 cursor-pointer text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={showRoots}
                onChange={(e) => setShowRoots(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Show Roots
            </label>
          </div>
        </div>

        {/* SVG Viewport */}
        <div className="relative w-full overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto max-h-[500px] select-none"
            aria-label="Interactive 2D Cartesian Coordinate Graph"
          >
            {/* Grid background lines */}
            <g stroke="currentColor" strokeOpacity="0.08" className="text-gray-900 dark:text-gray-100">
              {xTicks.map((x) => (
                <line
                  key={`gx-${x}`}
                  x1={toSvgX(x)}
                  y1={padding}
                  x2={toSvgX(x)}
                  y2={height - padding}
                  strokeDasharray="2,2"
                />
              ))}
              {yTicks.map((y) => (
                <line
                  key={`gy-${y}`}
                  x1={padding}
                  y1={toSvgY(y)}
                  x2={width - padding}
                  y2={toSvgY(y)}
                  strokeDasharray="2,2"
                />
              ))}
            </g>

            {/* X-Axis */}
            {originY >= padding && originY <= height - padding && (
              <g>
                <line
                  x1={padding}
                  y1={originY}
                  x2={width - padding}
                  y2={originY}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-500 dark:text-gray-400"
                />
                <text
                  x={width - padding + 15}
                  y={originY + 4}
                  fontSize="12"
                  fontWeight="bold"
                  className="fill-gray-600 dark:fill-gray-300"
                >
                  X
                </text>
              </g>
            )}

            {/* Y-Axis */}
            {originX >= padding && originX <= width - padding && (
              <g>
                <line
                  x1={originX}
                  y1={height - padding}
                  x2={originX}
                  y2={padding}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-500 dark:text-gray-400"
                />
                <text
                  x={originX}
                  y={padding - 12}
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="fill-gray-600 dark:fill-gray-300"
                >
                  Y
                </text>
              </g>
            )}

            {/* X Ticks & Labels */}
            {originY >= padding &&
              originY <= height - padding &&
              xTicks.map((x) => {
                const sx = toSvgX(x);
                return (
                  <g key={`tx-${x}`}>
                    <line
                      x1={sx}
                      y1={originY - 4}
                      x2={sx}
                      y2={originY + 4}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-gray-500 dark:text-gray-400"
                    />
                    <text
                      x={sx}
                      y={originY + 16}
                      fontSize="10"
                      textAnchor="middle"
                      className="fill-gray-500 dark:fill-gray-400"
                    >
                      {x}
                    </text>
                  </g>
                );
              })}

            {/* Y Ticks & Labels */}
            {originX >= padding &&
              originX <= width - padding &&
              yTicks.map((y) => {
                const sy = toSvgY(y);
                return (
                  <g key={`ty-${y}`}>
                    <line
                      x1={originX - 4}
                      y1={sy}
                      x2={originX + 4}
                      y2={sy}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-gray-500 dark:text-gray-400"
                    />
                    <text
                      x={originX - 8}
                      y={sy + 3}
                      fontSize="10"
                      textAnchor="end"
                      className="fill-gray-500 dark:fill-gray-400"
                    >
                      {y}
                    </text>
                  </g>
                );
              })}

            {/* Curve 1: f₁(x) */}
            {path1 && (
              <path
                d={path1}
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Curve 2: f₂(x) */}
            {showExpr2 && path2 && (
              <path
                d={path2}
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4,2"
              />
            )}

            {/* Real Roots Indicators for f1(x) */}
            {showRoots &&
              roots1.map((r, idx) => {
                const sx = toSvgX(r);
                const sy = toSvgY(0);
                if (sx < padding || sx > width - padding) return null;
                return (
                  <g key={`root-${idx}`}>
                    <circle cx={sx} cy={sy} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                    <text
                      x={sx}
                      y={sy - 9}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill="#ef4444"
                    >
                      ({r}, 0)
                    </text>
                  </g>
                );
              })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-indigo-600 rounded"></span>
              <span className="font-mono font-medium text-gray-700 dark:text-gray-300">
                f₁(x) = {expr1}
              </span>
            </div>
            {showExpr2 && expr2 && (
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-emerald-600 rounded"></span>
                <span className="font-mono font-medium text-gray-700 dark:text-gray-300">
                  f₂(x) = {expr2}
                </span>
              </div>
            )}
            {showRoots && roots1.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Roots (Zeros)</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              className="text-xs px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition"
            >
              Export PDF
            </button>
            <button
              onClick={handleExportExcel}
              className="text-xs px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition"
            >
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Real Roots */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            Real Roots / X-Intercepts
          </span>
          <div className="text-lg font-bold text-gray-900 dark:text-white font-mono">
            {roots1.length > 0 ? (
              roots1.map((r) => `x = ${r}`).join(', ')
            ) : (
              <span className="text-sm font-normal text-gray-500">None detected in range</span>
            )}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">Points where f₁(x) crosses 0</span>
        </div>

        {/* Y-Intercept */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            Y-Intercept [f₁(0)]
          </span>
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono">
            {yIntercept1 !== null ? `(0, ${yIntercept1})` : 'Undefined at x = 0'}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">Vertical axis crossing</span>
        </div>

        {/* Range Coverage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            Plotted Sample Points
          </span>
          <div className="text-lg font-bold text-gray-900 dark:text-white font-mono">
            {graph1.points.length} points
          </div>
          <span className="text-xs text-gray-400 mt-1 block">Smooth 2D continuous resolution</span>
        </div>
      </div>

      {/* Function Value Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Function Values Table (x vs f(x))
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Discrete coordinates calculated across the active interval
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Step:</span>
            <select
              value={tableStep}
              onChange={(e) => setTableStep(Number(e.target.value))}
              className="text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-gray-700 dark:text-gray-300"
            >
              <option value="0.5">0.5</option>
              <option value="1">1.0</option>
              <option value="2">2.0</option>
            </select>
            <button
              onClick={() => setShowTable(!showTable)}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline ml-2"
            >
              {showTable ? 'Hide Table' : 'Show Table'}
            </button>
          </div>
        </div>

        {showTable && (
          <div className="overflow-x-auto max-h-72 border border-gray-100 dark:border-gray-700 rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 sticky top-0">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">x (Input)</th>
                  <th className="py-2.5 px-4 font-semibold font-mono">f₁(x) = {expr1}</th>
                  {showExpr2 && expr2 && (
                    <th className="py-2.5 px-4 font-semibold font-mono">f₂(x) = {expr2}</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {valueTable.map((row) => {
                  const val2 = showExpr2 && expr2 ? evaluateExpression(expr2, row.x) : null;
                  return (
                    <tr
                      key={row.x}
                      className="hover:bg-gray-50 dark:hover:bg-gray-750 transition"
                    >
                      <td className="py-2 px-4 font-mono font-medium text-gray-900 dark:text-white">
                        {row.x}
                      </td>
                      <td className="py-2 px-4 font-mono text-indigo-600 dark:text-indigo-400">
                        {row.y !== null ? row.y : <span className="text-gray-400">Undefined</span>}
                      </td>
                      {showExpr2 && expr2 && (
                        <td className="py-2 px-4 font-mono text-emerald-600 dark:text-emerald-400">
                          {val2 !== null && !isNaN(val2) && isFinite(val2) ? (
                            Number(val2.toFixed(4))
                          ) : (
                            <span className="text-gray-400">Undefined</span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Share Actions */}
      <ShareActions
        title="2D Online Graphing Calculator - CalcMaster"
        shareUrl={shareableUrl}
        onDownloadPdf={handleExportPDF}
        onDownloadExcel={handleExportExcel}
      />
    </div>
  );
}

export default GraphingCalculator;
