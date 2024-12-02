import express from 'express';
import { GithubService } from '../services/github.js';
import { LeetCodeService } from '../services/leetcode.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = express.Router();
const githubService = new GithubService();
const leetcodeService = new LeetCodeService();

router.post('/github/connect', catchAsync(async (req, res) => {
  const { username } = req.body;
  const data = await githubService.connectUser(username);
  res.json(data);
}));

router.post('/leetcode/connect', catchAsync(async (req, res) => {
  const { username } = req.body;
  const data = await leetcodeService.connectUser(username);
  res.json(data);
}));

router.get('/github/activity/:username', catchAsync(async (req, res) => {
  const { username } = req.params;
  const data = await githubService.getActivityData(username);
  res.json(data);
}));

router.get('/leetcode/activity/:username', catchAsync(async (req, res) => {
  const { username } = req.params;
  const data = await leetcodeService.getActivityData(username);
  res.json(data);
}));

export { router as platformRoutes };