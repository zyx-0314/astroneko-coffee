'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CategoryFilter, StatusFilter } from '@/schema/roadmap.schema';

interface RoadmapFiltersSectionProps {
  categories: CategoryFilter[];
  statuses: StatusFilter[];
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

export default function RoadmapFiltersSection({
  categories,
  statuses,
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange
}: RoadmapFiltersSectionProps) {
  return (
    <div className="mb-8 space-y-4">
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Category:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => onCategoryChange(category.key)}
                    className={selectedCategory === category.key ? "bg-[#6B4E37] hover:bg-[#5a3f2d]" : ""}
                  >
                    <category.icon className={`h-4 w-4 mr-1 ${category.color || ''}`} />
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Status:</h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <Button
                    key={status.key}
                    variant={selectedStatus === status.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => onStatusChange(status.key)}
                    className={selectedStatus === status.key ? "bg-[#6B4E37] hover:bg-[#5a3f2d]" : ""}
                  >
                    <status.icon className={`h-4 w-4 mr-1 ${status.color || ''}`} />
                    {status.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
