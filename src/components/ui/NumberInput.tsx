'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  prefix?: string;
  suffix?: string;
  helpText?: string;
  error?: string;
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  prefix = '',
  suffix = '',
  helpText,
  error,
}: NumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState<string>('');

  const formatIndianNumber = (num: number) => {
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    }).format(num);
  };

  useEffect(() => {
    if (!isFocused) {
      setLocalValue(formatIndianNumber(value));
    } else {
      setLocalValue(value.toString());
    }
  }, [value, isFocused]);

  const handleBlur = () => {
    setIsFocused(false);
    let parsed = parseFloat(localValue.replace(/,/g, ''));
    if (isNaN(parsed)) parsed = 0;
    
    if (min !== undefined && parsed < min) parsed = min;
    if (max !== undefined && parsed > max) parsed = max;
    
    onChange(parsed);
    setLocalValue(formatIndianNumber(parsed));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setLocalValue(value.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow numbers and decimal points
    if (/^[0-9.,]*$/.test(val)) {
      setLocalValue(val);
      if (isFocused) {
          const parsed = parseFloat(val.replace(/,/g, ''));
          if (!isNaN(parsed)) {
              onChange(parsed);
          }
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-gray-500 dark:text-gray-400 select-none z-10">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          className={`w-full bg-white dark:bg-gray-800 border rounded-md py-2 px-3 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
            prefix ? 'pl-8' : ''
          } ${suffix ? 'pr-12' : ''} ${
            error
              ? 'border-red-500 focus:ring-red-500 dark:border-red-500'
              : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {suffix && (
          <span className="absolute right-3 text-gray-500 dark:text-gray-400 select-none z-10">
            {suffix}
          </span>
        )}
      </div>
      {(error || helpText) && (
        <p className={`text-xs ${error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          {error || helpText}
        </p>
      )}
    </div>
  );
}
