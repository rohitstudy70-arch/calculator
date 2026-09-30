import React from 'react';

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
  color?: string; // Hex color for the border
}

interface ResultCardProps {
  title?: string;
  items?: ResultItem[];
  label?: string;
  value?: string;
  highlight?: boolean;
  color?: string;
}

export function ResultCard({ title, items, label, value, highlight, color }: ResultCardProps) {
  if (label !== undefined && value !== undefined) {
    return (
      <div
        className={`flex flex-col p-4 rounded-xl transition-all duration-200 ${
          highlight
            ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-4 shadow-sm'
            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm'
        }`}
        style={
          highlight && color
            ? { borderLeftColor: color }
            : highlight
            ? { borderLeftColor: '#1E40AF' }
            : {}
        }
      >
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {label}
        </span>
        <span
          className={`font-semibold text-gray-900 dark:text-white ${
            highlight ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          }`}
        >
          {value}
        </span>
      </div>
    );
  }

  const itemList = items || [];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 overflow-hidden">
      {title && (
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {itemList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-4 rounded-xl transition-all duration-200 ${
              item.highlight
                ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-4 shadow-sm'
                : 'bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50'
            }`}
            style={
              item.highlight && item.color
                ? { borderLeftColor: item.color }
                : item.highlight
                ? { borderLeftColor: '#1E40AF' }
                : {}
            }
          >
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {item.label}
            </span>
            <span
              className={`font-semibold text-gray-900 dark:text-white ${
                item.highlight ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
