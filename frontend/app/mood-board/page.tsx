import React from 'react';
import { MoodBoardColors } from '@/components/MoodBoard/Colors';
import { MoodBoardTypography } from '@/components/MoodBoard/Typography';
import { MoodBoardUIElements } from '@/components/MoodBoard/UIElements';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function MoodBoardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-8">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Astroneko Coffee</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                🎨 Shuffle
                <span className="text-xs opacity-70">C</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Design system and mood board for our cosmic coffee experience
          </p>
        </header>

        <div className="space-y-12">
          <MoodBoardColors />
          <MoodBoardTypography />
          <MoodBoardUIElements />
        </div>
      </div>
    </div>
  );
}
