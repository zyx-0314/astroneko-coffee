'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee, Package, Star, TrendingUp } from 'lucide-react';

interface MenuStatsSectionProps {
  stats: {
    totalItems: number;
    categories: number;
    popularItems: number;
    avgRating: number;
  };
}

export default function MenuStatsSection({ stats }: MenuStatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Menu Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalItems}</p>
            </div>
            <Coffee className="h-8 w-8 text-[#6B4E37]" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Categories</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.categories}</p>
            </div>
            <Package className="h-8 w-8 text-[#2CA6A4]" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Popular Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.popularItems}</p>
            </div>
            <Star className="h-8 w-8 text-[#E1B168]" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgRating}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
