import { motion } from 'framer-motion';
import { SearchBar, SortFilter, ViewToggle, ActiveFilters } from '@/components/controls';
import { cardFadeUp } from '@/framer';
import { ControlsSectionProps } from '@/schema';

export default function ControlsSection({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterType,
  onFilterChange,
  showFilters,
  onToggleFilters,
  viewMode,
  onViewModeChange,
  itemCount,
  onClearSearch,
  onClearFilterType
}: ControlsSectionProps) {
  return (
    <motion.div
      className="space-y-4"
      variants={cardFadeUp}
    >
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
      />

      {/* Controls Row */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <SortFilter
          sortBy={sortBy}
          onSortChange={onSortChange}
          filterType={filterType}
          onFilterChange={onFilterChange}
          showFilters={showFilters}
          onToggleFilters={onToggleFilters}
        />

        <ViewToggle
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          itemCount={itemCount}
        />
      </div>

      {/* Active Filters Display */}
      <ActiveFilters
        searchQuery={searchQuery}
        filterType={filterType}
        onClearSearch={onClearSearch}
        onClearFilterType={onClearFilterType}
      />
    </motion.div>
  );
}
