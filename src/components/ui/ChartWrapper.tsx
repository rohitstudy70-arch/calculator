'use client';

import React, { Suspense } from 'react';

interface ChartWrapperProps {
  children: React.ReactNode;
  title?: string;
  height?: number;
}

export function ChartWrapper({ children, title, height = 300 }: ChartWrapperProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm flex flex-col">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <div 
        className="w-full relative" 
        style={{ height: `${height}px` }}
      >
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-pulse">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-800 rounded-full animate-spin"></div>
          </div>
        }>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
