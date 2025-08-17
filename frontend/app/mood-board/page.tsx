import React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MoodBoardColors, MoodBoardTypography, MoodBoardUIElements } from '@/components/MoodBoard';

// Interactive design system showcase - use CSR for theme toggling and copy interactions
export default function MoodBoardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-8">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Astroneko Coffee</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
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
