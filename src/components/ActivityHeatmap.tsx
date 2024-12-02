import React from 'react';
import { format } from 'date-fns';
import { ActivityData } from '../types';
import { Tooltip } from './Tooltip';

interface ActivityHeatmapProps {
  data: ActivityData[];
  type: 'github' | 'leetcode';
}

export function ActivityHeatmap({ data, type }: ActivityHeatmapProps) {
  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 2) return 'bg-green-100';
    if (count <= 5) return 'bg-green-300';
    if (count <= 8) return 'bg-green-500';
    return 'bg-green-700';
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {type === 'github' ? 'GitHub Activity' : 'LeetCode Progress'}
      </h3>
      <div className="grid grid-cols-53 gap-1">
        {data.map((day) => (
          <Tooltip
            key={day.date}
            content={
              <div className="text-sm">
                <div>{format(new Date(day.date), 'MMM d, yyyy')}</div>
                <div>{day.count} contributions</div>
                {day.details && (
                  <div className="mt-1">
                    {type === 'github' ? (
                      <>
                        <div>{day.details.commits} commits</div>
                        <div>{day.details.pullRequests} pull requests</div>
                      </>
                    ) : (
                      <>
                        <div>{day.details.problems} problems</div>
                        <div>{day.details.contests} contests</div>
                      </>
                    )}
                  </div>
                )}
              </div>
            }
          >
            <div
              className={`w-3 h-3 rounded-sm ${getIntensityClass(day.count)}`}
              data-date={day.date}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
}