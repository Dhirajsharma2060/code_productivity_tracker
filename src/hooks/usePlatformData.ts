import { useState, useEffect } from 'react';
import { Platform, ActivityData } from '../types';
import { fetchPlatformData } from '../services/api';

export function usePlatformData(platforms: Platform[]) {
  const [data, setData] = useState<Record<string, ActivityData[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchData(platform: Platform) {
      if (!platform.connected || data[platform.id]) return;

      setLoading(prev => ({ ...prev, [platform.id]: true }));
      setError(prev => ({ ...prev, [platform.id]: '' }));

      try {
        const platformData = await fetchPlatformData(platform);
        setData(prev => ({ ...prev, [platform.id]: platformData }));
      } catch (err) {
        setError(prev => ({
          ...prev,
          [platform.id]: 'Failed to fetch platform data'
        }));
      } finally {
        setLoading(prev => ({ ...prev, [platform.id]: false }));
      }
    }

    platforms.forEach(platform => {
      if (platform.connected && !data[platform.id]) {
        fetchData(platform);
      }
    });
  }, [platforms]);

  const clearPlatformData = (platformId: string) => {
    setData(prev => {
      const newData = { ...prev };
      delete newData[platformId];
      return newData;
    });
  };

  return { data, loading, error, clearPlatformData };
}