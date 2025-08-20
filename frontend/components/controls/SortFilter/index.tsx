'use client';

import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortOption, SortFilterProps } from '@/schema';
import { useSortFilter } from './SortFilter.hook';

export default function SortFilter({
  sortBy,
  onSortChange,
  filterType,
  onFilterChange,
  showFilters,
  onToggleFilters
}: SortFilterProps) {
  const { sortOptions, typeOptions, selectedSortOption } = useSortFilter({ sortBy });

  return (
    <div className="flex flex-wrap gap-2">
      {/* Sort Dropdown */}
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[200px]">
          <div className="flex items-center gap-2">
            <SelectValue placeholder="Sort by..." />
          </div>
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option: SortOption) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {option.icon}
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select value={filterType} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map((option: { value: string; label: string }) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Filter Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleFilters}
        className={showFilters ? 'bg-[#2CA6A4] text-white' : ''}
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
      </Button>
    </div>
  );
}
