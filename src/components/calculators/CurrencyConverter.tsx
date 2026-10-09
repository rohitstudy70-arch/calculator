'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  DEFAULT_CURRENCIES,
  convertCurrency,
  generateDenominationTable,
  Currency,
} from '@/lib/calculators/currency';
import { ResultCard } from '@/components/ui/ResultCard';
import { DataTable } from '@/components/ui/DataTable';
import { ShareActions } from '@/components/ui/ShareActions';
import { generateShareableLink } from '@/lib/url-params';
import { exportToPDF, exportToExcel } from '@/lib/export-utils';

interface CurrencyConverterProps {
  initialFrom?: string;
  initialTo?: string;
  initialAmount?: number;
}

/**
 * Robust multi-endpoint fetch for 100% Free Live Forex Rates (No API Key Required).
 * Primary: open.er-api.com
 * Fallback 1: api.frankfurter.app (European Central Bank)
 * Fallback 2: currency-api.pages.dev (Free CDN)
 */
async function fetchFreeLiveForexRates(
  forceRefresh = false
): Promise<{ rates: Record<string, number>; source: string; timestamp: number } | null> {
  const cacheKey = 'calcmaster_live_forex_rates_v2';
  const cacheTimeKey = 'calcmaster_live_forex_time_v2';
  const now = Date.now();

  // 5-minute client-side cache unless user explicitly requests refresh
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(cacheTimeKey);
      if (cached && cachedTime && now - parseInt(cachedTime, 10) < 300000) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object' && parsed.INR) {
          return { rates: parsed, source: 'Cached Live Feed', timestamp: parseInt(cachedTime, 10) };
        }
      }
    } catch {}
  }

  // 1. Primary Free Source: open.er-api.com
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates.INR) {
        try {
          localStorage.setItem(cacheKey, JSON.stringify(data.rates));
          localStorage.setItem(cacheTimeKey, String(now));
        } catch {}
        return { rates: data.rates, source: 'Real-Time Interbank API', timestamp: now };
      }
    }
  } catch {}

  // 2. Free Fallback 1: api.frankfurter.app
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates.INR) {
        const fullRates = { ...data.rates, USD: 1.0 };
        try {
          localStorage.setItem(cacheKey, JSON.stringify(fullRates));
          localStorage.setItem(cacheTimeKey, String(now));
        } catch {}
        return { rates: fullRates, source: 'European Central Bank Feed', timestamp: now };
      }
    }
  } catch {}

  // 3. Free Fallback 2: currency-api CDN
  try {
    const res = await fetch('https://latest.currency-api.pages.dev/v1/currencies/usd.json', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.usd && data.usd.inr) {
        const normalized: Record<string, number> = { USD: 1.0 };
        for (const [k, v] of Object.entries(data.usd)) {
          normalized[k.toUpperCase()] = Number(v);
        }
        try {
          localStorage.setItem(cacheKey, JSON.stringify(normalized));
          localStorage.setItem(cacheTimeKey, String(now));
        } catch {}
        return { rates: normalized, source: 'Global FX CDN Feed', timestamp: now };
      }
    }
  } catch {}

  return null;
}

export function CurrencyConverter({
  initialFrom = 'USD',
  initialTo = 'INR',
  initialAmount = 1,
}: CurrencyConverterProps = {}) {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const [amount, setAmount] = useState<number>(
    parseFloat(searchParams.get('amount') || '') || initialAmount
  );
  const [fromCurrency, setFromCurrency] = useState<string>(
    searchParams.get('from')?.toUpperCase() || initialFrom
  );
  const [toCurrency, setToCurrency] = useState<string>(
    searchParams.get('to')?.toUpperCase() || initialTo
  );

  // Live rates state
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');
  const [apiSource, setApiSource] = useState<string>('Live Interbank Rates');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  // Fetch live exchange rates from 100% free open APIs
  const loadRates = useCallback(async (force = false) => {
    setIsRefreshing(true);
    try {
      const resultData = await fetchFreeLiveForexRates(force);
      if (resultData && resultData.rates) {
        setRates(resultData.rates);
        setIsLive(true);
        setApiSource(resultData.source);
        const timeStr = new Date(resultData.timestamp).toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setLastUpdatedTime(timeStr);
        if (force) {
          setFeedbackMessage('✅ Live rates updated!');
          setTimeout(() => setFeedbackMessage(''), 3000);
        }
      } else {
        setIsLive(false);
      }
    } catch {
      setIsLive(false);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadRates(false);

    // Auto-sync rates every 60 seconds
    const interval = setInterval(() => {
      loadRates(true);
    }, 60000);

    return () => clearInterval(interval);
  }, [loadRates]);

  // Handle 1-click Swap (⇄)
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Perform calculation
  const result = useMemo(() => {
    return convertCurrency(
      {
        amount,
        fromCurrency,
        toCurrency,
      },
      Object.keys(rates).length > 0 ? rates : undefined,
      isLive
    );
  }, [amount, fromCurrency, toCurrency, rates, isLive]);

  // Denomination table (1, 5, 10, 50, 100, 500, 1000...)
  const denominationData = useMemo(() => {
    const list = generateDenominationTable(fromCurrency, toCurrency, result.exchangeRate);
    return list.map((item) => [
      `${result.fromSymbol} ${item.fromAmount.toLocaleString()} ${fromCurrency}`,
      `${result.toSymbol} ${item.toAmount} ${toCurrency}`,
    ]);
  }, [fromCurrency, toCurrency, result]);

  // Top popular currency quick switchers
  const popularPairs = [
    { from: 'USD', to: 'INR', label: 'USD to INR', desc: 'Dollar to Rupee', flag: '🇺🇸' },
    { from: 'AED', to: 'INR', label: 'AED to INR', desc: 'Dirham to Rupee', flag: '🇦🇪' },
    { from: 'EUR', to: 'INR', label: 'EUR to INR', desc: 'Euro to Rupees', flag: '🇪🇺' },
    { from: 'GBP', to: 'INR', label: 'GBP to INR', desc: 'Pound to INR', flag: '🇬🇧' },
    { from: 'SAR', to: 'INR', label: 'SAR to INR', desc: 'Saudi Riyal to INR', flag: '🇸🇦' },
    { from: 'CAD', to: 'INR', label: 'CAD to INR', desc: 'Canada Dollar to INR', flag: '🇨🇦' },
    { from: 'AUD', to: 'INR', label: 'AUD to INR', desc: 'Aus Dollar to INR', flag: '🇦🇺' },
    { from: 'KWD', to: 'INR', label: 'KWD to INR', desc: 'Kuwaiti Dinar to INR', flag: '🇰🇼' },
  ];

  const handlePdfExport = () => {
    exportToPDF(
      `Currency Conversion: ${amount} ${fromCurrency} to ${toCurrency}`,
      [
        { label: 'Source Amount', value: `${amount} ${fromCurrency} (${result.fromCurrencyName})` },
        { label: 'Converted Value', value: result.formattedResult },
        { label: 'Exchange Rate', value: `1 ${fromCurrency} = ${result.exchangeRate} ${toCurrency}` },
        { label: 'Inverse Rate', value: `1 ${toCurrency} = ${result.inverseRate} ${fromCurrency}` },
        { label: 'Data Feed', value: isLive ? `Live Interbank Feed (${apiSource})` : 'Baseline Market Rate' },
        { label: 'Last Updated', value: lastUpdatedTime || 'Today' },
      ],
      [`${fromCurrency} Amount`, `${toCurrency} Equivalent`],
      denominationData
    );
  };

  const handleExcelExport = () => {
    exportToExcel(
      [`${fromCurrency} Units`, `${toCurrency} Value`],
      denominationData,
      `Forex_${fromCurrency}_to_${toCurrency}`
    );
  };

  const shareUrl = generateShareableLink('/currency-converter', {
    amount: String(amount),
    from: fromCurrency,
    to: toCurrency,
  });

  const currencyList = Object.values(DEFAULT_CURRENCIES);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Live Fluctuation Ticker Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-4 py-3 rounded-2xl shadow-sm border border-blue-800/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="text-xs font-bold tracking-wide uppercase text-blue-200">
            Real-Time Live Market Feed
          </div>
          <span className="text-xs bg-white/10 px-2 py-0.5 rounded-md font-mono text-emerald-300">
            1 USD = ₹{(rates['INR'] || result.exchangeRate).toFixed(2)} INR
          </span>
        </div>

        <div className="flex items-center gap-3">
          {feedbackMessage && (
            <span className="text-xs font-semibold text-emerald-300 animate-fade-in">
              {feedbackMessage}
            </span>
          )}
          <span className="text-xs text-blue-200 font-mono hidden sm:inline">
            Sync: {lastUpdatedTime || 'Connecting...'}
          </span>
          <button
            type="button"
            onClick={() => loadRates(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-semibold rounded-lg transition-all border border-white/20 cursor-pointer disabled:opacity-50"
            title="Click to fetch latest live exchange rates immediately"
          >
            <span className={`inline-block ${isRefreshing ? 'animate-spin' : ''}`}>🔄</span>
            <span>{isRefreshing ? 'Updating...' : 'Refresh Rates'}</span>
          </button>
        </div>
      </div>

      {/* Popular Currency Quick Chips */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>🔥 POPULAR CORRIDORS (लाइव विनिमय दरें)</span>
          {isLive ? (
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Rates Active ({lastUpdatedTime})
            </span>
          ) : (
            <span className="text-slate-400 text-[11px]">Interbank Mid-Market Baseline</span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {popularPairs.map((pair) => {
            const isActive = fromCurrency === pair.from && toCurrency === pair.to;
            const pairRate = convertCurrency(
              { amount: 1, fromCurrency: pair.from, toCurrency: pair.to },
              Object.keys(rates).length > 0 ? rates : undefined,
              isLive
            );

            return (
              <button
                key={pair.label}
                type="button"
                onClick={() => {
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                }}
                className={`flex flex-col p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{pair.flag} {pair.label}</span>
                </div>
                <div className={`text-xs font-mono font-semibold mt-1 ${isActive ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'}`}>
                  {pairRate.toSymbol} {pairRate.exchangeRate.toFixed(2)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Converter Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs & Swap Controls */}
        <div className="lg:col-span-7 flex flex-col gap-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Amount Field with Clean Symbol Box */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Amount to Convert (रकम दर्ज करें)
            </label>
            <div className="flex rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all shadow-sm">
              <span className="inline-flex items-center justify-center px-4 bg-slate-100 dark:bg-slate-700/60 border-r border-slate-300 dark:border-slate-700 text-xl font-bold text-blue-600 dark:text-blue-400 select-none min-w-[3.5rem]">
                {result.fromSymbol}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                value={amount || ''}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="100"
                className="w-full h-12 px-4 text-xl font-bold bg-transparent text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Currencies Selector with Swap Button */}
          <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
            {/* From Currency */}
            <div className="sm:col-span-5 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                From Currency (स्रोत मुद्रा)
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                aria-label="From Currency"
                className="w-full h-12 px-3 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currencyList.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} – {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* 1-Click Swap Button */}
            <div className="sm:col-span-1 flex justify-center pt-5 sm:pt-4">
              <button
                type="button"
                onClick={handleSwap}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Swap currencies"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            {/* To Currency */}
            <div className="sm:col-span-5 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                To Currency (लक्षित मुद्रा)
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                aria-label="To Currency"
                className="w-full h-12 px-3 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currencyList.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} – {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rate Summary banner with explicit symbols */}
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Current Live Interbank Exchange Rate:</span>
              </div>
              <div className="text-base font-extrabold text-blue-900 dark:text-blue-200 font-mono mt-0.5">
                1 {fromCurrency} ({result.fromSymbol}) = {result.toSymbol} {result.exchangeRate.toFixed(4)} {toCurrency}
              </div>
            </div>
            <div className="text-right text-xs text-slate-500 dark:text-slate-400 font-mono">
              1 {toCurrency} ({result.toSymbol}) = {result.fromSymbol} {result.inverseRate.toFixed(4)} {fromCurrency}
            </div>
          </div>

          {/* Actions: PDF, Excel, Share */}
          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
            <ShareActions
              shareUrl={shareUrl}
              onDownloadPDF={handlePdfExport}
              onDownloadExcel={handleExcelExport}
            />
          </div>
        </div>

        {/* Right Result Column: Big Hero Display + Detailed Breakdown */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Big Live Conversion Hero Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md flex flex-col gap-2">
            <div className="text-xs font-semibold tracking-wider uppercase text-blue-100 flex items-center justify-between">
              <span>{amount} {result.fromCurrencyName} ({fromCurrency}) =</span>
              {isLive && (
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/40">
                  ● Live Feed
                </span>
              )}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-baseline gap-2 flex-wrap">
              <span className="text-amber-300 font-sans text-3xl sm:text-4xl">{result.toSymbol}</span>
              <span className="font-mono">{result.convertedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className="text-base font-medium text-blue-200">{toCurrency}</span>
            </div>
            <div className="mt-2 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs text-blue-100 font-mono">
              <span>1 {fromCurrency} ({result.fromSymbol}) = {result.toSymbol} {result.exchangeRate.toFixed(4)} {toCurrency}</span>
              <span className="opacity-90">1 {toCurrency} ({result.toSymbol}) = {result.fromSymbol} {result.inverseRate.toFixed(4)} {fromCurrency}</span>
            </div>
          </div>

          <ResultCard
            title="Conversion Details (गणना विवरण)"
            items={[
              {
                label: `Converted Value (${toCurrency})`,
                value: `${result.toSymbol} ${result.convertedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`,
                highlight: true,
                color: '#2563EB',
              },
              {
                label: `Exchange Rate (1 ${fromCurrency} / ${result.fromSymbol})`,
                value: `${result.toSymbol} ${result.exchangeRate.toFixed(4)} ${toCurrency}`,
                highlight: true,
                color: '#059669',
              },
              {
                label: `Inverse Rate (1 ${toCurrency} / ${result.toSymbol})`,
                value: `${result.fromSymbol} ${result.inverseRate.toFixed(4)} ${fromCurrency}`,
              },
              {
                label: 'Source Amount',
                value: `${result.fromSymbol} ${amount} ${fromCurrency} (${result.fromCurrencyName})`,
              },
              {
                label: 'Market Feed Type',
                value: isLive ? `🟢 Live Free API (${apiSource})` : 'Standard Market Baseline',
              },
              {
                label: 'Last Synced',
                value: lastUpdatedTime ? `${lastUpdatedTime} (Auto-syncs)` : 'Today',
              },
            ]}
          />

          {/* Quick Info Box */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              💡 Pure Wholesale Mid-Market Rates (Zero Markup)
            </p>
            <p>
              CalcMaster uses 100% free, real-time interbank foreign exchange feeds without retail bank markups. Rates reflect wholesale market prices and fluctuate dynamically throughout the trading day.
            </p>
          </div>
        </div>
      </div>

      {/* Denomination Conversion Table */}
      <div className="w-full">
        <DataTable
          caption={`Standard ${fromCurrency} to ${toCurrency} Quick Conversion Table`}
          headers={[`${fromCurrency} (${result.fromCurrencyName})`, `${toCurrency} (${result.toCurrencyName})`]}
          data={denominationData}
        />
      </div>

      {/* Major Indian Cities Dollar Rate Reference */}
      <div className="w-full bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🇮🇳</span>
              <span>Major Indian Cities Dollar Rate Today (USD to INR)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live interbank benchmark vs typical physical cash exchange spreads across major metro centers
            </p>
          </div>
          <span className="text-xs font-mono bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-900/60 self-start sm:self-auto">
            Interbank Base: ₹{(rates['INR'] || 86.85).toFixed(2)} / $1 USD
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { city: 'New Delhi (NCR)', hindi: 'नई दिल्ली', zone: 'North Hub' },
            { city: 'Mumbai', hindi: 'मुंबई', zone: 'Financial Hub' },
            { city: 'Kolkata', hindi: 'कोलकाता', zone: 'East Hub' },
            { city: 'Bengaluru', hindi: 'बेंगलुरु', zone: 'IT Hub' },
            { city: 'Chennai', hindi: 'चेन्नई', zone: 'South Hub' },
            { city: 'Hyderabad', hindi: 'हैदराबाद', zone: 'Deccan Hub' },
          ].map((item) => {
            const baseRate = rates['INR'] || 86.85;
            const cashLow = (baseRate * 0.997).toFixed(2);
            const cashHigh = (baseRate * 1.006).toFixed(2);
            return (
              <div
                key={item.city}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.city} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">({item.hindi})</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    {item.zone}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Interbank Rate:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{baseRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Retail Cash Band:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">
                    ₹{cashLow} – ₹{cashHigh}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-amber-50 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/30">
          <strong>Note:</strong> Wholesale interbank electronic forex wire rates are uniform nationwide across Delhi, Kolkata, Mumbai, and all cities. The retail cash band reflects physical currency notes at local authorized money changers and airport counters with typical local retail margins (0.5%–2%).
        </p>
      </div>
    </div>
  );
}

export default CurrencyConverter;
