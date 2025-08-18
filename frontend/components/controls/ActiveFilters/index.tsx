'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ActiveFiltersProps } from '@/schema';
import { useActiveFilters } from './ActiveFilters.hook';

export default function ActiveFilters({
  searchQuery,
  filterType,
  onClearSearch,
  onClearFilterType
}: ActiveFiltersProps) {
  const { shouldShow, getFilterTypeLabel } = useActiveFilters({ filterType });

  if (!shouldShow(searchQuery, filterType)) {
    return null;
  }

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {searchQuery && (
        <Badge variant="secondary" className="gap-1">
          Search: &ldquo;{searchQuery}&rdquo;
          <button onClick={onClearSearch} className="ml-1 hover:text-red-500">×</button>
        </Badge>
      )}
      {filterType !== 'all' && (
        <Badge variant="secondary" className="gap-1">
          Type: {getFilterTypeLabel(filterType)}
          <button onClick={onClearFilterType} className="ml-1 hover:text-red-500">×</button>
        </Badge>
      )}
    </motion.div>
  );
}
