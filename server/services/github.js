import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { formatContributionData } from '../utils/dataFormatters.js';

export class GithubService {
  async connectUser(username) {
    try {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      await page.goto(`https://github.com/${username}`);

      const notFoundElement = await page.$('.js-site-search-form');
      if (notFoundElement) {
        await browser.close();
        throw new Error('User not found');
      }

      const avatarUrl = await page.$eval('.avatar-user', img => img.src);
      const name = await page.$eval('.vcard-names .p-name', el => el.textContent.trim());

      await browser.close();

      return {
        success: true,
        user: {
          username,
          name,
          avatarUrl
        }
      };
    } catch (error) {
      throw new Error('Invalid GitHub username');
    }
  }

  async getActivityData(username) {
    try {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      await page.goto(`https://github.com/${username}`);

      // Wait for the contributions graph to load
      await page.waitForSelector('.js-calendar-graph');
      const contributionsHtml = await page.$eval('.js-calendar-graph', el => el.outerHTML);
      
      const $ = cheerio.load(contributionsHtml);
      const contributions = [];

      $('rect.ContributionCalendar-day').each((_, el) => {
        const date = $(el).attr('data-date');
        const count = parseInt($(el).attr('data-count') || '0', 10);
        
        if (date) {
          contributions.push({
            date,
            count,
            type: 'github',
            details: {
              commits: Math.floor(count * 0.7),
              pullRequests: Math.floor(count * 0.3)
            }
          });
        }
      });

      await browser.close();
      return contributions;
    } catch (error) {
      console.error('Scraping error:', error);
      throw new Error('Failed to fetch GitHub activity data');
    }
  }

  async getDetailedUserData(username) {
    try {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      await page.goto(`https://github.com/${username}`);

      const userData = await page.evaluate(() => {
        const stats = {};
        document.querySelectorAll('.js-yearly-contributions .position-relative h2').forEach(el => {
          const text = el.textContent.trim();
          if (text.includes('contributions')) {
            stats.totalContributions = parseInt(text.split(' ')[0].replace(',', ''), 10);
          }
        });

        return stats;
      });

      await browser.close();
      return userData;
    } catch (error) {
      throw new Error('Failed to fetch detailed user data');
    }
  }
}