'use client';

import React from 'react';
import { motion } from 'framer-motion';
import RoleGuard from '@/components/guards/RoleGuard';
import { PerformanceSection } from './sections/PerformanceSection';

export default function PerformancePage() {
  return (
    <RoleGuard allowedRoles={['manager', 'owner']}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Employee Performance & Payroll
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage employee performance reviews, payroll status, and team development
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <PerformanceSection />
        </motion.div>
      </div>
    </RoleGuard>
  );
}
