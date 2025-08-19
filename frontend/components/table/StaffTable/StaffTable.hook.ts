'use client';

import { useState, useEffect } from 'react';

interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  role: 'MANAGER' | 'FRONT_DESK' | 'KITCHEN' | 'BARISTA';
  status: 'active' | 'break' | 'offline';
  shift: string;
  phone: string;
  email: string;
  avatar?: string;
  lastActive: string;
  department: string;
  hireDate: string;
  salary: number;
}

export const useStaffTable = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockStaff: StaffMember[] = [
      {
        id: '1',
        employeeId: 'EMP001',
        name: 'Sarah Johnson',
        role: 'MANAGER',
        status: 'active',
        shift: '9:00 AM - 6:00 PM',
        phone: '+1-555-0123',
        email: 'sarah.johnson@astro-neko.com',
        lastActive: '2 minutes ago',
        department: 'Management',
        hireDate: '2023-01-15',
        salary: 65000
      },
      {
        id: '2',
        employeeId: 'EMP002',
        name: 'Mike Chen',
        role: 'BARISTA',
        status: 'active',
        shift: '7:00 AM - 3:00 PM',
        phone: '+1-555-0124',
        email: 'mike.chen@astro-neko.com',
        lastActive: '15 minutes ago',
        department: 'Coffee Services',
        hireDate: '2023-03-20',
        salary: 35000
      },
      {
        id: '3',
        employeeId: 'EMP003',
        name: 'Emma Rodriguez',
        role: 'FRONT_DESK',
        status: 'break',
        shift: '11:00 AM - 8:00 PM',
        phone: '+1-555-0125',
        email: 'emma.rodriguez@astro-neko.com',
        lastActive: '5 minutes ago',
        department: 'Customer Service',
        hireDate: '2023-02-10',
        salary: 32000
      },
      {
        id: '4',
        employeeId: 'EMP004',
        name: 'David Kim',
        role: 'KITCHEN',
        status: 'active',
        shift: '6:00 AM - 2:00 PM',
        phone: '+1-555-0126',
        email: 'david.kim@astro-neko.com',
        lastActive: '1 hour ago',
        department: 'Kitchen',
        hireDate: '2023-04-05',
        salary: 38000
      },
      {
        id: '5',
        employeeId: 'EMP005',
        name: 'Lisa Thompson',
        role: 'BARISTA',
        status: 'offline',
        shift: '2:00 PM - 10:00 PM',
        phone: '+1-555-0127',
        email: 'lisa.thompson@astro-neko.com',
        lastActive: '3 hours ago',
        department: 'Coffee Services',
        hireDate: '2023-05-12',
        salary: 34000
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setStaffMembers(mockStaff);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (staffId: string) => {
    console.log('Edit staff member:', staffId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (staffId: string) => {
    console.log('Delete staff member:', staffId);
    // TODO: Implement delete functionality with confirmation
  };

  const handleView = (staffId: string) => {
    console.log('View staff member:', staffId);
    // TODO: Implement view details functionality
  };

  return {
    staffMembers,
    isLoading,
    handleEdit,
    handleDelete,
    handleView
  };
};
