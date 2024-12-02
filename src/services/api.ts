import axios from 'axios';
import { Platform, ActivityData } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export async function fetchPlatformData(platform: Platform): Promise<ActivityData[]> {
  try {
    const response = await api.get(`/platforms/${platform.id}/activity/${platform.username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${platform.id} data:`, error);
    throw new Error(`Failed to fetch ${platform.name} data`);
  }
}

export async function connectPlatform(platform: Platform): Promise<{ success: boolean; user: any }> {
  try {
    const response = await api.post(`/platforms/${platform.id}/connect`, {
      username: platform.username
    });
    return response.data;
  } catch (error) {
    console.error(`Error connecting to ${platform.id}:`, error);
    throw new Error(`Failed to connect to ${platform.name}`);
  }
}