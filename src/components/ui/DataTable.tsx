'use client';

import React, { useState } from 'react';

interface DataTableProps {
  headers: string[];
  data: (string | number)[][];
  caption?: string;
  highlightLastRow?: boolean;
  maxRows?: number;
}

export function DataTable({ headers, data, caption, highlightLastRow, maxRows }: DataTableProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedData = maxRows && !showAll ? data.slice(0, maxRows) : data;
  const isTruncated = maxRows && data.length > maxRows;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {caption && (
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              {caption}
            </caption>
          )}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300 sticky top-0 z-10">
            <tr>
              {headers.map((header, index) => (
                <th key={index} scope="col" className="px-6 py-3 whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((row, rowIndex) => {
              const isLast = rowIndex === data.length - 1;
              const shouldHighlight = highlightLastRow && isLast;
              return (
                <tr 
                  key={rowIndex} 
                  className={`border-b dark:border-gray-700 transition-colors ${
                    shouldHighlight 
                      ? 'bg-blue-50 dark:bg-blue-900/20 font-semibold' 
                      : 'bg-white even:bg-gray-50 dark:bg-gray-800 dark:even:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isTruncated && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 px-4 py-2 rounded-full transition-colors"
          >
            {showAll ? 'Show less' : `Show all ${data.length} rows`}
          </button>
        </div>
      )}
    </div>
  );
}
