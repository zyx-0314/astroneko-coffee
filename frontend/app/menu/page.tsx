'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fadeInContainer } from '@/framer';
import { menuApi } from '@/lib/api/menu.api';
import { MenuItemResponse } from '@/schema/menuItem.schema';
import {
  MenuHeaderSection,
  PromotionalSection,
  ControlsSection,
  MenuDisplaySection
} from './sections';

export default function MenuPage() {
  // State for filters and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Lazy loading state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(20); // Larger page size for better performance
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  
  // Menu items from API (accumulated)
  const [menuItems, setMenuItems] = useState<MenuItemResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Helper function to map frontend sort keys to backend field names
  const mapSortByToBackend = (sortBy: string) => {
    const fieldMapping: { [key: string]: { field: string; direction: string } } = {
      'reviews-month-desc': { field: 'monthlyReviews', direction: 'desc' },
      'reviews-month-asc': { field: 'monthlyReviews', direction: 'asc' },
      'reviews-week-desc': { field: 'weeklyReviews', direction: 'desc' },
      'reviews-week-asc': { field: 'weeklyReviews', direction: 'asc' },
      'buys-week-desc': { field: 'weeklyBuys', direction: 'desc' },
      'buys-week-asc': { field: 'weeklyBuys', direction: 'asc' },
      'buys-month-desc': { field: 'monthlyBuys', direction: 'desc' },
      'buys-month-asc': { field: 'monthlyBuys', direction: 'asc' },
      'positive-month-desc': { field: 'positiveReviewsMonthly', direction: 'desc' },
      'positive-month-asc': { field: 'positiveReviewsMonthly', direction: 'asc' },
      'positive-week-desc': { field: 'positiveReviewsWeekly', direction: 'desc' },
      'positive-week-asc': { field: 'positiveReviewsWeekly', direction: 'asc' },
      'rating-desc': { field: 'rating', direction: 'desc' },
      'rating-asc': { field: 'rating', direction: 'asc' },
      'name-desc': { field: 'name', direction: 'desc' },
      'name-asc': { field: 'name', direction: 'asc' },
      'price-desc': { field: 'price', direction: 'desc' },
      'price-asc': { field: 'price', direction: 'asc' }
    };
    
    return fieldMapping[sortBy] || { field: 'name', direction: 'asc' };
  };

  // Fetch initial menu items
  const fetchInitialMenuItems = async (resetItems = true) => {
    setIsInitialLoading(true);
    setError(null);
    try {
      const { field, direction } = mapSortByToBackend(sortBy);
      const params = {
        page: 0,
        size: pageSize,
        sortBy: field,
        sortDir: direction,
        ...(filterType !== 'all' && { type: filterType })
      };

      const response = await menuApi.getPublicMenu(params);
      
      if (resetItems) {
        setMenuItems(response.content);
      }
      
      setTotalItems(response.totalElements);
      setHasMoreItems(response.content.length === pageSize && response.totalElements > pageSize);
      setCurrentPage(0);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
      const errorMessage = error instanceof Error && error.message.includes('API Error') 
        ? 'Server error occurred while loading menu items. Please try again.'
        : 'Failed to load menu items. Please check your connection and try again.';
      setError(errorMessage);
      setMenuItems([]);
      setHasMoreItems(false);
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Load more items for infinite scroll
  const loadMoreItems = async () => {
    if (isLoadingMore || !hasMoreItems) return;
    
    setIsLoadingMore(true);
    try {
      const { field, direction } = mapSortByToBackend(sortBy);
      const nextPage = currentPage + 1;
      const params = {
        page: nextPage,
        size: pageSize,
        sortBy: field,
        sortDir: direction,
        ...(filterType !== 'all' && { type: filterType })
      };

      const response = await menuApi.getPublicMenu(params);
      
      if (response.content.length > 0) {
        setMenuItems(prev => [...prev, ...response.content]);
        setCurrentPage(nextPage);
        setHasMoreItems(response.content.length === pageSize && (nextPage + 1) * pageSize < response.totalElements);
      } else {
        setHasMoreItems(false);
      }
    } catch (error) {
      console.error('Failed to load more items:', error);
      // Don't show error for load more failures, just stop loading
      setHasMoreItems(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMoreItems && !isLoadingMore) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    const loadMoreTrigger = document.getElementById('load-more-trigger');
    if (loadMoreTrigger) {
      observer.observe(loadMoreTrigger);
    }

    return () => {
      if (loadMoreTrigger) {
        observer.unobserve(loadMoreTrigger);
      }
    };
  }, [hasMoreItems, isLoadingMore]);

  // Fetch data on component mount and when dependencies change
  useEffect(() => {
    fetchInitialMenuItems(true);
  }, [sortBy, filterType]);

  // Client-side search filtering (since API doesn't support search yet)
  const filteredAndSortedItems = useMemo(() => {
    if (!searchQuery) return menuItems;
    
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [menuItems, searchQuery]);

  // Event handlers with useCallback for performance
  const handleFilterTypeChange = useCallback((type: string) => {
    setFilterType(type);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleClearFilterType = useCallback(() => {
    setFilterType('all');
  }, []);

  const handleToggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  const handleSortChange = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors"
      initial="hidden"
      animate="visible"
      variants={fadeInContainer}
    >
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <MenuHeaderSection 
          title="Cosmic Menu"
          subtitle="Discover our intergalactic coffee creations and stellar treats"
        />

        {/* Promotional Section */}
        <PromotionalSection 
          onViewCombos={() => handleFilterTypeChange('combo')}
          onViewPromos={() => handleFilterTypeChange('promo')}
        />

        {/* Controls Section */}
        <ControlsSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          filterType={filterType}
          onFilterChange={setFilterType}
          showFilters={showFilters}
          onToggleFilters={handleToggleFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          itemCount={searchQuery ? filteredAndSortedItems.length : totalItems}
          onClearSearch={handleClearSearch}
          onClearFilterType={handleClearFilterType}
        />

        {/* Error Display */}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="font-medium">Oops! Something went wrong</p>
              <p className="text-sm mt-1">{error}</p>
              <button 
                onClick={() => fetchInitialMenuItems(true)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Menu Display Section */}
        {!error && (
          <MenuDisplaySection
            filteredItems={filteredAndSortedItems}
            isLoading={isInitialLoading}
            viewMode={viewMode}
            searchQuery={searchQuery}
          />
        )}

        {/* Load More trigger for infinite scroll */}
        {!error && !searchQuery && hasMoreItems && (
          <div id="load-more-trigger" className="flex justify-center py-8">
            {isLoadingMore ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span>Loading more items...</span>
              </div>
            ) : (
              <div className="text-muted-foreground">
                <span>Scroll to load more items</span>
              </div>
            )}
          </div>
        )}

        {/* End of results indicator */}
        {!error && !searchQuery && !hasMoreItems && menuItems.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="text-muted-foreground text-center">
              <p>You&apos;ve reached the end of our menu!</p>
              <p className="text-sm mt-1">Showing all {totalItems} items</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
