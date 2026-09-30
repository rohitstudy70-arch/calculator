'use client';

import React from 'react';
import { Slider } from './Slider';
import { NumberInput } from './NumberInput';

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  formatValue?: (val: number) => string;
}

export function InputGroup({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  formatValue,
}: InputGroupProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
      <div className="flex flex-col md:flex-row md:items-end gap-6">
        <div className="w-full md:w-3/5">
          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            label={label}
            formatValue={formatValue}
            prefix={prefix}
            suffix={suffix}
          />
        </div>
        <div className="w-full md:w-2/5">
          <NumberInput
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            prefix={prefix}
            suffix={suffix}
          />
        </div>
      </div>
    </div>
  );
}
