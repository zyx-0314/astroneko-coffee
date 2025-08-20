'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Circle, Star } from 'lucide-react';
import { RoadmapStats } from '@/schema/roadmap.schema';

interface RoadmapStatsSectionProps {
  stats: RoadmapStats;
}

export default function RoadmapStatsSection({ stats }: RoadmapStatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6 text-center">
          <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">In Progress</div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6 text-center">
          <Circle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.planned}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Planned</div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6 text-center">
          <Star className="h-8 w-8 text-[#6B4E37] mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Features</div>
        </CardContent>
      </Card>
    </div>
  );
}
