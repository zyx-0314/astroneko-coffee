'use client';

import { useState, useEffect } from 'react';
import { staffAPI } from '@/lib/api/staff.api';
import { Staff, StaffSummary, formatShiftTime, getFullName, UserRole } from '@/schema/staff.schema';

export const useStaffTable = () => {
  const [staffMembers, setStaffMembers] = useState<StaffSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state management
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewStaffId, setViewStaffId] = useState<string | null>(null);
  const [editStaffId, setEditStaffId] = useState<string | null>(null);

  // Fetch staff data from API
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const staffData = await staffAPI.getAllStaff(true); // Get only active staff
        
        // Transform Staff data to StaffSummary
        const staffSummary: StaffSummary[] = staffData.map((staff: Staff): StaffSummary => ({
          id: staff.id,
          employeeId: staff.employeeId,
          name: getFullName(staff.firstName, staff.lastName),
          email: staff.email,
          role: staff.role,
          status: staff.isActive && staff.isUserActive ? 'active' : 'offline', // Simplified status logic
          shift: formatShiftTime(staff.shiftStart, staff.shiftEnd),
          phone: staff.phone,
          lastActive: 'Active now', // Placeholder - would need real-time data
          avatar: staff.avatar,
          department: staff.department,
          position: staff.position,
          isActive: staff.isActive && staff.isUserActive,
          sex: staff.sex
        }));

        setStaffMembers(staffSummary);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch staff data');
        console.error('Error fetching staff:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleEdit = (staffId: string) => {
    setEditStaffId(staffId);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (staffId: string) => {
    if (!confirm('Are you sure you want to delete this staff member? This action cannot be undone.')) {
      return;
    }

    try {
      await staffAPI.deleteStaff(parseInt(staffId));
      // Remove from local state
      setStaffMembers(prev => prev.filter(staff => staff.id.toString() !== staffId));
      alert('Staff member deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete staff member';
      alert(`Failed to delete staff member: ${errorMessage}`);
      console.error('Error deleting staff:', err);
    }
  };

  const handleView = (staffId: string) => {
    setViewStaffId(staffId);
    setIsViewModalOpen(true);
  };

  const handleDeactivate = async (staffId: string) => {
    if (!confirm('Are you sure you want to deactivate this staff member?')) {
      return;
    }

    try {
      await staffAPI.deactivateStaff(parseInt(staffId));
      // Update local state
      setStaffMembers(prev => 
        prev.map(staff => 
          staff.id.toString() === staffId 
            ? { ...staff, isActive: false, status: 'offline' as const }
            : staff
        )
      );
      alert('Staff member deactivated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to deactivate staff member';
      alert(`Failed to deactivate staff member: ${errorMessage}`);
      console.error('Error deactivating staff:', err);
    }
  };

  const refreshStaff = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const staffData = await staffAPI.getAllStaff(true);
      
      const staffSummary: StaffSummary[] = staffData.map((staff: Staff): StaffSummary => ({
        id: staff.id,
        employeeId: staff.employeeId,
        name: getFullName(staff.firstName, staff.lastName),
        email: staff.email,
        role: staff.role,
        status: staff.isActive && staff.isUserActive ? 'active' : 'offline',
        shift: formatShiftTime(staff.shiftStart, staff.shiftEnd),
        phone: staff.phone,
        lastActive: 'Active now',
        avatar: staff.avatar,
        department: staff.department,
        position: staff.position,
        isActive: staff.isActive && staff.isUserActive,
        sex: staff.sex
      }));

      setStaffMembers(staffSummary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh staff data');
      console.error('Error refreshing staff:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    staffMembers,
    isLoading,
    error,
    handleEdit,
    handleDelete,
    handleView,
    handleDeactivate,
    refreshStaff,
    // Modal state
    isViewModalOpen,
    setIsViewModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    viewStaffId,
    editStaffId
  };
};
