'use client';

import { useState, useMemo } from 'react';
import { RoadmapStats } from '@/schema/roadmap.schema';
import { futurePhases, roadmapData } from '@/lib/data/roadmap';

export function useRoadmapData() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredItems = useMemo(() => {
    return roadmapData.filter(item => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
      return categoryMatch && statusMatch;
    });
  }, [selectedCategory, selectedStatus]);

  const stats: RoadmapStats = useMemo(() => ({
    completed: roadmapData.filter(item => item.status === 'completed').length,
    inProgress: roadmapData.filter(item => item.status === 'in-progress').length,
    planned: roadmapData.filter(item => item.status === 'planned').length + futurePhases.length,
    total: roadmapData.length + futurePhases.length
  }), []);

  return {
    roadmapData,
    futurePhases,
    selectedCategory,
    selectedStatus,
    setSelectedCategory,
    setSelectedStatus,
    filteredItems,
    stats
  };
}
