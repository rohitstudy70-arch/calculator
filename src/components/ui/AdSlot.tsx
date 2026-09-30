import React from 'react';

interface AdSlotProps {
  id: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  format?: string;
}

export function AdSlot({ id, width = '100%', height = 250, className = '' }: AdSlotProps) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div 
      id={id}
      className={`relative w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 ${
        isDev ? 'border-2 border-dashed border-gray-300 dark:border-gray-600' : ''
      } ${className}`}
      style={{ minHeight: typeof height === 'number' ? `${height}px` : height }}
    >
      {isDev && (
        <span className="text-sm text-gray-400 dark:text-gray-500 select-none">
          Reserved for advertisement ({id})
        </span>
      )}
    </div>
  );
}
