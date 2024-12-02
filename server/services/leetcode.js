import axios from 'axios';
import { formatLeetCodeData } from '../utils/dataFormatters.js';

export class LeetCodeService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://leetcode.com/graphql'
    });
  }

  async connectUser(username) {
    try {
      const { data } = await this.api.post('', {
        query: `
          query userProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                reputation
                ranking
              }
            }
          }
        `,
        variables: { username }
      });

      if (!data.data.matchedUser) {
        throw new Error('User not found');
      }

      return {
        success: true,
        user: {
          username: data.data.matchedUser.username,
          ranking: data.data.matchedUser.profile.ranking
        }
      };
    } catch (error) {
      throw new Error('Invalid LeetCode username');
    }
  }

  async getActivityData(username) {
    try {
      const { data } = await this.api.post('', {
        query: `
          query userCalendar($username: String!) {
            matchedUser(username: $username) {
              userCalendar {
                activeYears
                submissionCalendar
              }
            }
          }
        `,
        variables: { username }
      });

      return formatLeetCodeData(data.data.matchedUser.userCalendar.submissionCalendar);
    } catch (error) {
      throw new Error('Failed to fetch LeetCode activity data');
    }
  }
}