import React, { useState } from 'react';
import { BarChart, Calendar, GitBranch } from 'lucide-react';
import { ActivityHeatmap } from './ActivityHeatmap';
import { StatsCard } from './StatsCard';
import { PlatformList } from './platforms/PlatformList';
import { usePlatformData } from '../hooks/usePlatformData';

export function Dashboard() {
  const [dateRange, setDateRange] = useState('year');
  const [platform, setPlatform] = useState('all');
  const { data } = usePlatformData([]);

  const filterDataByPlatform = () => {
    if (platform === 'all') {
      return {
        github: data.github || [],
        leetcode: data.leetcode || []
      };
    }
    return {
      github: platform === 'github' ? data.github || [] : [],
      leetcode: platform === 'leetcode' ? data.leetcode || [] : []
    };
  };

  const calculateStats = () => {
    const stats = {
      commits: 0,
      problems: 0,
      rating: 0
    };

    if (data.github) {
      stats.commits = data.github.reduce((sum, day) => 
        sum + (day.details?.commits || 0), 0);
    }

    if (data.leetcode) {
      stats.problems = data.leetcode.reduce((sum, day) => 
        sum + (day.details?.problems || 0), 0);
      stats.rating = 1842; // Mock rating for demo
    }

    return stats;
  };

  const stats = calculateStats();
  const filteredData = filterDataByPlatform();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Coding Journey</h2>
        <div className="flex space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="year">Last Year</option>
            <option value="month">Last Month</option>
            <option value="week">Last Week</option>
          </select>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="all">All Platforms</option>
            <option value="github">GitHub</option>
            <option value="leetcode">LeetCode</option>
          </select>
        </div>
      </div>

      <div className="mb-8">
        <PlatformList />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Commits"
          value={stats.commits.toString()}
          icon={<GitBranch className="h-6 w-6 text-indigo-600" />}
          change="+12%"
        />
        <StatsCard
          title="Problems Solved"
          value={stats.problems.toString()}
          icon={<Calendar className="h-6 w-6 text-green-600" />}
          change="+8%"
        />
        <StatsCard
          title="Contest Rating"
          value={stats.rating.toString()}
          icon={<BarChart className="h-6 w-6 text-purple-600" />}
          change="+15%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivityHeatmap data={filteredData.github} type="github" />
        <ActivityHeatmap data={filteredData.leetcode} type="leetcode" />
      </div>
    </div>
  );
}