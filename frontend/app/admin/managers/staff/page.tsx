'use client';

import React from 'react';
import { motion } from 'framer-motion';
import RoleGuard from '@/components/guards/RoleGuard';
import StaffOverviewCard from '@/components/cards/StaffOverviewCard';
import StaffActionsCard from '@/components/cards/StaffActionsCard';
import StaffTable from '@/components/table/StaffTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StaffManagementPage() {
  return (
    <RoleGuard allowedRoles={['manager', 'owner']}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Staff Management
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Manage your coffee shop staff, schedules, and performance
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Overview Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <StaffOverviewCard />
            </motion.div>

            {/* Actions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <StaffActionsCard onStaffCreated={() => window.location.reload()} />
            </motion.div>

            {/* Staff List Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <StaffTable />
            </motion.div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
