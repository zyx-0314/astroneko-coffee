import { useMemo } from 'react';
import {
  Calendar,
  Coffee,
  DollarSign,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { SortOption, UseSortFilterProps } from '@/schema';

export const useSortFilter = ({ sortBy }: UseSortFilterProps) => {
  const sortOptions: SortOption[] = useMemo(() => [
    { value: 'name-asc', label: 'Name (A-Z)', icon: <Coffee className="w-4 h-4" /> },
    { value: 'name-desc', label: 'Name (Z-A)', icon: <Coffee className="w-4 h-4" /> },
    { value: 'rating-desc', label: 'Highest Rated', icon: <Star className="w-4 h-4" /> },
    { value: 'rating-asc', label: 'Lowest Rated', icon: <Star className="w-4 h-4" /> },
    { value: 'reviews-month-desc', label: 'Most Reviews (Month)', icon: <Users className="w-4 h-4" /> },
    { value: 'reviews-week-desc', label: 'Most Reviews (Week)', icon: <Calendar className="w-4 h-4" /> },
    { value: 'buys-week-desc', label: 'Most Bought (Week)', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'buys-month-desc', label: 'Most Bought (Month)', icon: <ShoppingCart className="w-4 h-4" /> },
    { value: 'price-asc', label: 'Price (Low to High)', icon: <DollarSign className="w-4 h-4" /> },
    { value: 'price-desc', label: 'Price (High to Low)', icon: <DollarSign className="w-4 h-4" /> },
    { value: 'positive-month-desc', label: 'Most Positive (Month)', icon: <Star className="w-4 h-4" /> },
    { value: 'positive-week-desc', label: 'Most Positive (Week)', icon: <Star className="w-4 h-4" /> }
  ], []);

  const typeOptions = useMemo(() => [
    { value: 'all', label: 'All Types' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'pastries', label: 'Pastries' },
    { value: 'drinks', label: 'Drinks' },
    { value: 'bundles', label: 'Bundles' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'instant', label: 'Instant' },
    { value: 'combo', label: 'Combo Deals' },
    { value: 'promo', label: 'Promos' }
  ], []);

  const selectedSortOption = useMemo(() => 
    sortOptions.find(option => option.value === sortBy), 
    [sortOptions, sortBy]
  );

  return {
    sortOptions,
    typeOptions,
    selectedSortOption
  };
};
