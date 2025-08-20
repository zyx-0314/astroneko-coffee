'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserX, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { Staff, UserRole, EmploymentType } from '@/schema/staff.schema';

interface StaffStats {
  totalStaff: number;
  activeStaff: number;
  inactiveStaff: number;
  newThisMonth: number;
  byRole: Record<UserRole, number>;
  byEmploymentType: Record<EmploymentType, number>;
  averagePerformance: number;
  totalHoursThisWeek: number;
}

interface StaffDashboardSectionProps {
  staff: Staff[];
  loading: boolean;
}

export function StaffDashboardSection({ staff, loading }: StaffDashboardSectionProps) {
  const [stats, setStats] = useState<StaffStats>({
    totalStaff: 0,
    activeStaff: 0,
    inactiveStaff: 0,
    newThisMonth: 0,
    byRole: {
      [UserRole.MANAGER]: 0,
      [UserRole.CASHIER]: 0,
      [UserRole.HELPER]: 0,
      [UserRole.COOK]: 0,
      [UserRole.BARISTA]: 0,
      [UserRole.CLIENT]: 0,
      [UserRole.OWNER]: 0,
    },
    byEmploymentType: {
      [EmploymentType.FULL_TIME]: 0,
      [EmploymentType.PART_TIME]: 0,
      [EmploymentType.CONTRACT]: 0,
      [EmploymentType.INTERN]: 0,
    },
    averagePerformance: 0,
    totalHoursThisWeek: 0,
  });

  useEffect(() => {
    if (!staff.length) return;

    // Calculate stats from actual staff data
    const totalStaff = staff.length;
    const activeStaff = staff.filter(s => s.isActive && s.isUserActive).length;
    const inactiveStaff = totalStaff - activeStaff;

    // Calculate new staff this month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const newThisMonth = staff.filter(s => 
      s.hireDate && new Date(s.hireDate) >= firstDayOfMonth
    ).length;

    // Calculate role distribution
    const byRole = staff.reduce((acc, s) => {
      acc[s.role] = (acc[s.role] || 0) + 1;
      return acc;
    }, {} as Record<UserRole, number>);

    // Calculate employment type distribution
    const byEmploymentType = staff.reduce((acc, s) => {
      if (s.employmentType) {
        acc[s.employmentType] = (acc[s.employmentType] || 0) + 1;
      }
      return acc;
    }, {} as Record<EmploymentType, number>);

    // Mock calculations for performance and hours (would come from actual tracking systems)
    const averagePerformance = 85 + Math.random() * 10;
    const totalHoursThisWeek = activeStaff * 35; // Assuming average 35 hours per week

    setStats({
      totalStaff,
      activeStaff,
      inactiveStaff,
      newThisMonth,
      byRole: {
        [UserRole.MANAGER]: byRole[UserRole.MANAGER] || 0,
        [UserRole.CASHIER]: byRole[UserRole.CASHIER] || 0,
        [UserRole.HELPER]: byRole[UserRole.HELPER] || 0,
        [UserRole.COOK]: byRole[UserRole.COOK] || 0,
        [UserRole.BARISTA]: byRole[UserRole.BARISTA] || 0,
        [UserRole.CLIENT]: byRole[UserRole.CLIENT] || 0,
        [UserRole.OWNER]: byRole[UserRole.OWNER] || 0,
      },
      byEmploymentType: {
        [EmploymentType.FULL_TIME]: byEmploymentType[EmploymentType.FULL_TIME] || 0,
        [EmploymentType.PART_TIME]: byEmploymentType[EmploymentType.PART_TIME] || 0,
        [EmploymentType.CONTRACT]: byEmploymentType[EmploymentType.CONTRACT] || 0,
        [EmploymentType.INTERN]: byEmploymentType[EmploymentType.INTERN] || 0,
      },
      averagePerformance,
      totalHoursThisWeek,
    });
  }, [staff]);

  const statCards = [
    {
      title: 'Total Staff',
      value: loading ? '...' : stats.totalStaff.toString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      description: 'All employees'
    },
    {
      title: 'Active Staff',
      value: loading ? '...' : stats.activeStaff.toString(),
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      description: 'Currently active'
    },
    {
      title: 'Inactive Staff',
      value: loading ? '...' : stats.inactiveStaff.toString(),
      icon: UserX,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      description: 'Not currently active'
    },
    {
      title: 'New This Month',
      value: loading ? '...' : stats.newThisMonth.toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      description: 'Recently hired'
    },
    {
      title: 'Avg Performance',
      value: loading ? '...' : `${stats.averagePerformance.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      description: 'Performance score'
    },
    {
      title: 'Hours This Week',
      value: loading ? '...' : `${stats.totalHoursThisWeek}h`,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      description: 'Total scheduled hours'
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {card.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${card.bgColor}`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Role and Employment Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Staff by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.byRole).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {role.charAt(0) + role.slice(1).toLowerCase()}
                  </span>
                  <Badge variant="secondary" className="ml-2">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Employment Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.byEmploymentType).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <Badge variant="secondary" className="ml-2">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
