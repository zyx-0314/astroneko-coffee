'use client';

import React from 'react';
import { 
  RoadmapHeaderSection,
  RoadmapStatsSection,
  RoadmapFiltersSection,
  CurrentPhasesSection,
  FuturePhasesSection,
  RoadmapFooterSection
} from './sections';
import { categories, statuses } from '@/lib/data/roadmap';
import { useRoadmapData } from './useRoadmapData';

export default function RoadmapPage() {
  const {
    futurePhases,
    selectedCategory,
    selectedStatus,
    setSelectedCategory,
    setSelectedStatus,
    filteredItems,
    stats
  } = useRoadmapData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header Section */}
      <RoadmapHeaderSection />

      {/* Stats Section */}
      <RoadmapStatsSection stats={stats} />

      {/* Filters Section */}
      <RoadmapFiltersSection
        categories={categories}
        statuses={statuses}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
      />

      {/* Current Phases Section */}
      <CurrentPhasesSection filteredItems={filteredItems} />

      {/* Future Phases Section */}
      <FuturePhasesSection futurePhases={futurePhases} />

      {/* Footer Section */}
      <RoadmapFooterSection />
    </div>
  );
}
