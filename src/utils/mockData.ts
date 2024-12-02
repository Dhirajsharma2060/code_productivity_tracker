import { addDays, format } from 'date-fns';
import { ActivityData } from '../types';

const generateMockData = (days: number, type: 'github' | 'leetcode'): ActivityData[] => {
  const data: ActivityData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = addDays(startDate, i);
    const count = Math.floor(Math.random() * 10);
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      count,
      type,
      details: type === 'github'
        ? {
            commits: Math.floor(Math.random() * 8),
            pullRequests: Math.floor(Math.random() * 3),
          }
        : {
            problems: Math.floor(Math.random() * 5),
            contests: Math.floor(Math.random() * 2),
          },
    });
  }

  return data;
};

export const mockData = {
  github: generateMockData(365, 'github'),
  leetcode: generateMockData(365, 'leetcode'),
};