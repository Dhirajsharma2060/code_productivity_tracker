import React, { useState } from 'react';
import { Platform } from '../../types';
import { PlatformCard } from './PlatformCard';
import { PlatformModal } from './PlatformModal';
import { usePlatformData } from '../../hooks/usePlatformData';

const initialPlatforms: Platform[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com',
    connected: false
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    url: 'https://leetcode.com',
    connected: false
  }
];

export function PlatformList() {
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const { data, loading, error, clearPlatformData } = usePlatformData(platforms);

  const handleConnect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setIsModalOpen(true);
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(platforms.map(p => 
      p.id === platformId 
        ? { ...p, connected: false, username: undefined }
        : p
    ));
    clearPlatformData(platformId);
  };

  const handleSubmit = (platformId: string, username: string) => {
    setPlatforms(platforms.map(p =>
      p.id === platformId
        ? { ...p, connected: true, username }
        : p
    ));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Connected Platforms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map(platform => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            loading={loading[platform.id]}
            error={error[platform.id]}
          />
        ))}
      </div>
      
      {isModalOpen && selectedPlatform && (
        <PlatformModal
          platform={selectedPlatform}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}