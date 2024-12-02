export function formatContributionData(contributions) {
  return contributions.map(contribution => ({
    date: contribution.date,
    count: contribution.count,
    type: 'github',
    details: {
      commits: Math.floor(contribution.count * 0.7),
      pullRequests: Math.floor(contribution.count * 0.3)
    }
  }));
}

export function formatLeetCodeData(submissionCalendar) {
  return Object.entries(submissionCalendar).map(([timestamp, count]) => ({
    date: new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0],
    count: count,
    type: 'leetcode',
    details: {
      problems: Math.floor(count * 0.8),
      contests: Math.floor(count * 0.2)
    }
  }));
}