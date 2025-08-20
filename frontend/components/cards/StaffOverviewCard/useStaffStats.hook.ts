'use client';

import { useState, useEffect } from 'react';
import { staffAPI } from '@/lib/api/staff.api';
import { Staff } from '@/schema/staff.schema';
import { StaffStats } from '@/schema/hooks.schema';

export const useStaffStats = () => {
  const [stats, setStats] = useState<StaffStats>({
    totalStaff: 0,
    activeToday: 0,
    onBreak: 0,
    offDuty: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaffStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get all staff (both active and inactive)
        const allStaff = await staffAPI.getAllStaff(false);
        
        // Calculate statistics
        const totalStaff = allStaff.length;
        const activeStaff = allStaff.filter((staff: Staff) => staff.isActive && staff.isUserActive);
        const activeToday = activeStaff.length;
        
        // For now, we'll simulate break/off duty status since we don't have real-time data
        // In a real application, this would come from a separate API or be based on actual status
        const onBreak = Math.floor(activeToday * 0.15); // Assume ~15% are on break
        const offDuty = totalStaff - activeToday;

        setStats({
          totalStaff,
          activeToday,
          onBreak,
          offDuty
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch staff statistics');
        console.error('Error fetching staff stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffStats();
  }, []);

  const refreshStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const allStaff = await staffAPI.getAllStaff(false);
      
      const totalStaff = allStaff.length;
      const activeStaff = allStaff.filter((staff: Staff) => staff.isActive && staff.isUserActive);
      const activeToday = activeStaff.length;
      const onBreak = Math.floor(activeToday * 0.15);
      const offDuty = totalStaff - activeToday;

      setStats({
        totalStaff,
        activeToday,
        onBreak,
        offDuty
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh staff statistics');
      console.error('Error refreshing staff stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stats,
    isLoading,
    error,
    refreshStats
  };
};
