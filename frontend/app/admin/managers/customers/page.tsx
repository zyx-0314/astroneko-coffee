'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RoleGuard } from '@/components/guards';
import { managerRoles } from '@/lib/auth';
import { CustomerManagementSection } from './sections/CustomerManagementSection';

export default function CustomersPage() {
  return (
    <RoleGuard allowedRoles={managerRoles}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Customer Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">View customer analytics and manage customer information</p>
          </motion.div>
          
          <CustomerManagementSection />
        </div>
      </motion.div>
    </RoleGuard>
  );
}
