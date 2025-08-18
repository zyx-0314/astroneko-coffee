'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInContainer } from '@/framer';
import { mockMenuItems } from '@/lib/data/menu';
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
  const [isLoading] = useState(false);

  // Filtered and sorted menu items
  const filteredAndSortedItems = useMemo(() => {
    const filtered = mockMenuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = filterType === 'all' ||
        item.type === filterType ||
        (filterType === 'promo' && (item.promoType === 'neekogust' || item.promoType === 'welcome-back-school'));

      return matchesSearch && matchesType;
    });

    // Sort the filtered items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating-desc':
          return b.rating - a.rating;
        case 'rating-asc':
          return a.rating - b.rating;
        case 'reviews-month-desc':
          return b.monthlyReviews - a.monthlyReviews;
        case 'reviews-week-desc':
          return b.weeklyReviews - a.weeklyReviews;
        case 'buys-week-desc':
          return b.weeklyBuys - a.weeklyBuys;
        case 'buys-month-desc':
          return b.monthlyBuys - a.monthlyBuys;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'positive-month-desc':
          return b.positiveReviewsMonthly - a.positiveReviewsMonthly;
        case 'positive-week-desc':
          return b.positiveReviewsWeekly - a.positiveReviewsWeekly;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, filterType]);

  // Event handlers
  const handleFilterTypeChange = (type: string) => {
    setFilterType(type);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearFilterType = () => {
    setFilterType('all');
  };

  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
  };

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
          onSortChange={setSortBy}
          filterType={filterType}
          onFilterChange={setFilterType}
          showFilters={showFilters}
          onToggleFilters={handleToggleFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          itemCount={filteredAndSortedItems.length}
          onClearSearch={handleClearSearch}
          onClearFilterType={handleClearFilterType}
        />

        {/* Menu Display Section */}
        <MenuDisplaySection
          filteredItems={filteredAndSortedItems}
          isLoading={isLoading}
          viewMode={viewMode}
          searchQuery={searchQuery}
        />
      </div>
    </motion.div>
  );
}
