'use client';

import React, { useMemo } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  formatValue?: (val: number) => string;
  prefix?: string;
  suffix?: string;
}

export function Slider({
  min,
  max,
  step,
  value,
  onChange,
  label,
  formatValue,
  prefix = '',
  suffix = '',
}: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const displayValue = useMemo(() => {
    let val = value;
    let formatted = formatValue ? formatValue(val) : val.toString();
    return `${prefix}${formatted}${suffix}`;
  }, [value, formatValue, prefix, suffix]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      {(label || displayValue) && (
        <div className="flex justify-between items-end mb-2">
          {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
          <span className="text-sm font-semibold text-primary-900 dark:text-primary-100 bg-primary-100 dark:bg-primary-900/30 px-2 py-0.5 rounded">
            {displayValue}
          </span>
        </div>
      )}
      <div className="relative flex items-center h-5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          aria-label={label || 'Slider'}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 z-10"
          style={{
            background: `linear-gradient(to right, #1E40AF ${percentage}%, transparent ${percentage}%)`,
          }}
        />
        {/* We use inline styles for the track progress as it's dynamic */}
        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            background: #ffffff;
            border: 2px solid #1E40AF;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            transition: transform 0.1s ease;
          }
          input[type='range']::-webkit-slider-thumb:hover {
            transform: scale(1.1);
          }
          input[type='range']::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #ffffff;
            border: 2px solid #1E40AF;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            transition: transform 0.1s ease;
          }
          input[type='range']::-moz-range-thumb:hover {
            transform: scale(1.1);
          }
        `}</style>
      </div>
    </div>
  );
}
