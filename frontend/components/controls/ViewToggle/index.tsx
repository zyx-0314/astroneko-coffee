'use client';

import { Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewToggleProps } from '@/schema';
import { useViewToggle } from './ViewToggle.hook';

export default function ViewToggle({ viewMode, onViewModeChange, itemCount }: ViewToggleProps) {
  const { handleGridClick, handleListClick } = useViewToggle({ onViewModeChange });

  return (
    <div className="flex gap-2">
      {/* View Mode Toggle */}
      <div className="flex border rounded-md">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={handleGridClick}
          className="rounded-r-none"
        >
          <Grid3X3 className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={handleListClick}
          className="rounded-l-none border-l"
        >
          <List className="w-4 h-4" />
        </Button>
      </div>

      {/* Results count */}
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md">
        {itemCount} items
      </div>
    </div>
  );
}
