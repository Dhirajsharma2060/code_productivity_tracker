import React from 'react';
import { ExternalLink, Check, X, Loader2 } from 'lucide-react';
import { Platform } from '../../types';

interface PlatformCardProps {
  platform: Platform;
  onConnect: (platform: Platform) => void;
  onDisconnect: (platformId: string) => void;
  loading?: boolean;
  error?: string;
}

export function PlatformCard({ 
  platform, 
  onConnect, 
  onDisconnect,
  loading,
  error
}: PlatformCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
        {loading ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            Loading
          </span>
        ) : platform.connected ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-4 h-4 mr-1" />
            Connected
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <X className="w-4 h-4 mr-1" />
            Not Connected
          </span>
        )}
      </div>
      
      {platform.username && (
        <p className="text-sm text-gray-600 mb-4">
          Username: {platform.username}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 mb-4">{error}</p>
      )}
      
      <div className="flex justify-between items-center">
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:text-indigo-800 inline-flex items-center"
        >
          Visit Platform
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
        
        {platform.connected ? (
          <button
            onClick={() => onDisconnect(platform.id)}
            disabled={loading}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={() => onConnect(platform)}
            disabled={loading}
            className="px-3 py-1 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
}