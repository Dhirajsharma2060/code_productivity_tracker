import React from 'react';
import { Code2, Github, Trophy } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">CodeTracker</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a href="#" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <Trophy className="h-5 w-5" />
              <span>LeetCode</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}