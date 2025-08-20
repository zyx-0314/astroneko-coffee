'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staffAPI } from '@/lib/api/staff.api';
import { Staff } from '@/schema/staff.schema';
import { StaffDashboardSection } from './StaffDashboardSection';
import EnhancedStaffTable from './EnhancedStaffTable';

interface EnhancedStaff extends Staff {
  totalHours?: number;
  performance?: number;
}

export function StaffManagementSection() {
  const [staff, setStaff] = useState<EnhancedStaff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    setLoading(true);
    try { 
      // For now, we'll use the existing API but later we can enhance it
      const staffData = await staffAPI.getAllStaff(false); // Get all staff including inactive
      
      // Transform and enrich staff data
      const enrichedStaff = staffData.map((member) => ({
        ...member,
        totalHours: 0, // This would come from a time tracking system
        performance: 85 + Math.random() * 15, // Mock performance score
      }));
      
      setStaff(enrichedStaff);
    } catch (error) {
      console.error('Failed to load staff:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <StaffDashboardSection staff={staff} loading={loading} />
      </motion.div>

      {/* Staff Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <EnhancedStaffTable staff={staff} onStaffUpdate={loadStaff} />
      </motion.div>
    </div>
  );
}
