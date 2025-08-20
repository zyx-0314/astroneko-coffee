'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, UserX, Clock, RefreshCw } from 'lucide-react';
import { useStaffStats } from './useStaffStats.hook';

export default function StaffOverviewCard() {
  const { stats, isLoading, error, refreshStats } = useStaffStats();

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-red-600 dark:text-red-400">
            Failed to load staff statistics: {error}
          </div>
          <Button 
            onClick={refreshStats}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry</span>
          </Button>
        </div>
      </div>
    );
  }

  const statsConfig = [
    {
      title: 'Total Staff',
      value: isLoading ? '...' : stats.totalStaff.toString(),
      change: '+0', // Could be calculated from historical data
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
      icon: Users,
      color: '#6B4E37'
    },
    {
      title: 'Active Today',
      value: isLoading ? '...' : stats.activeToday.toString(),
      change: '+0', // Could be calculated from yesterday's data
      changeType: 'positive' as 'positive' | 'negative' | 'neutral',
      icon: UserCheck,
      color: '#2CA6A4'
    },
    {
      title: 'On Break',
      value: isLoading ? '...' : stats.onBreak.toString(),
      change: '+0', // Could be calculated from previous period
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
      icon: Clock,
      color: '#E1B168'
    },
    {
      title: 'Off Duty',
      value: isLoading ? '...' : stats.offDuty.toString(),
      change: '+0', // Could be calculated from previous period
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
      icon: UserX,
      color: '#6C757D'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === 'positive'
                          ? 'text-green-600 dark:text-green-400'
                          : stat.changeType === 'negative'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {stat.change} from yesterday
                    </span>
                  </div>
                </div>
                <div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon
                    className="h-6 w-6"
                    style={{ color: stat.color }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
