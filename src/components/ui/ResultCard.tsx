import React from 'react';

export interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
  color?: string; // Hex color for the border
  fullWidth?: boolean;
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
        className={`flex flex-col justify-between p-4 sm:p-5 rounded-2xl transition-all duration-200 min-w-0 ${
          highlight
            ? 'bg-blue-50/80 dark:bg-blue-900/20 border-l-4 shadow-sm'
            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm'
        }`}
        style={
          highlight && color
            ? { borderLeftColor: color }
            : highlight
            ? { borderLeftColor: '#2563EB' }
            : {}
        }
      >
        <span
          className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5 leading-snug line-clamp-1"
          title={label}
        >
          {label}
        </span>
        <span
          className={`font-bold tracking-tight text-gray-900 dark:text-white truncate ${
            highlight ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
          }`}
          title={value}
        >
          {value}
        </span>
      </div>
    );
  }

  const itemList = items || [];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 sm:p-6 overflow-hidden">
      {title && (
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-5">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {itemList.map((item, index) => {
          // Determine if this item should span full 2 columns:
          // 1. Explicitly requested via fullWidth
          // 2. If 3 items total:
          //    - If item 0 is highlight and item 2 is not, item 0 spans full width
          //    - Otherwise item 2 (last item) spans full width
          // 3. For any other odd count (e.g. 5 items), the last item spans full width
          let spanFull = item.fullWidth || false;
          if (itemList.length === 3) {
            if (itemList[0].highlight && !itemList[2].highlight) {
              if (index === 0) spanFull = true;
            } else if (index === 2) {
              spanFull = true;
            }
          } else if (itemList.length % 2 === 1 && index === itemList.length - 1) {
            spanFull = true;
          }

          return (
            <div
              key={index}
              className={`flex flex-col justify-between p-3.5 sm:p-4 rounded-xl transition-all duration-200 min-w-0 ${
                spanFull ? 'col-span-2' : 'col-span-1'
              } ${
                item.highlight
                  ? 'bg-blue-50/70 dark:bg-blue-900/15 border-l-4 shadow-sm'
                  : 'bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/60'
              }`}
              style={
                item.highlight && item.color
                  ? { borderLeftColor: item.color }
                  : item.highlight
                  ? { borderLeftColor: '#2563EB' }
                  : {}
              }
            >
              <span
                className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 leading-snug line-clamp-1"
                title={item.label}
              >
                {item.label}
              </span>
              <span
                className={`font-bold tracking-tight text-gray-900 dark:text-white truncate ${
                  item.highlight
                    ? 'text-xl sm:text-2xl'
                    : 'text-base sm:text-lg'
                }`}
                title={item.value}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
