'use client';

import React from 'react';

interface CompareToggleProps {
  isComparing: boolean;
  onToggle: (comparing: boolean) => void;
}

export function CompareToggle({ isComparing, onToggle }: CompareToggleProps) {
  return (
    <label className="flex items-center cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isComparing}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <div className={`block w-12 h-6 rounded-full transition-colors ${isComparing ? 'bg-blue-800 dark:bg-blue-700' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${isComparing ? 'transform translate-x-6' : ''}`}></div>
      </div>
      <div className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        Compare two scenarios
      </div>
    </label>
  );
}
