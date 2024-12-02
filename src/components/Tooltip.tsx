import React, { ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white p-2 rounded shadow-lg text-sm -mt-2 -ml-2 transform -translate-y-full">
        {content}
      </div>
    </div>
  );
}