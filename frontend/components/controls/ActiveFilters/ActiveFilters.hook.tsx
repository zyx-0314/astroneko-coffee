import { useMemo } from 'react';

import { UseActiveFiltersProps } from '@/schema';

export const useActiveFilters = ({}: UseActiveFiltersProps) => {
  const typeOptions = useMemo(
    () => [
      { value: "all", label: "All Types" },
      { value: "coffee", label: "Coffee" },
      { value: "pastries", label: "Pastries" },
      { value: "drinks", label: "Drinks" },
      { value: "bundles", label: "Bundles" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "instant", label: "Instant" },
      { value: "combo", label: "Combo Deals" },
    ],
    []
  );

  const shouldShow = (searchQuery: string, filterType: string) => {
    return searchQuery || filterType !== "all";
  };

  const getFilterTypeLabel = (filterType: string) => {
    return (
      typeOptions.find((option) => option.value === filterType)?.label ||
      "Unknown"
    );
  };

  return {
    shouldShow,
    getFilterTypeLabel,
  };
};
