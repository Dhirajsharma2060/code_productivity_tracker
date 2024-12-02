import React, { ReactNode } from 'react';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change: string;
}

export function StatsCard({ title, value, icon, change }: StatsCardProps) {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        {icon}
      </div>
      <div className="mt-4">
        <span
          className={clsx(
            'inline-flex items-center text-sm font-medium',
            isPositive ? 'text-green-600' : 'text-red-600'
          )}
        >
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last period</span>
      </div>
    </div>
  );
}