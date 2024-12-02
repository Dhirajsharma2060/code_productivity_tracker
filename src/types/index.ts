export interface Platform {
  id: string;
  name: string;
  url: string;
  username?: string;
  connected: boolean;
}

export interface ActivityData {
  date: string;
  count: number;
  type: 'github' | 'leetcode';
  details?: {
    commits?: number;
    pullRequests?: number;
    problems?: number;
    contests?: number;
  };
}

export interface UserProfile {
  platforms: Platform[];
  activities: ActivityData[];
}

export interface PlatformFormData {
  platform: string;
  username: string;
}