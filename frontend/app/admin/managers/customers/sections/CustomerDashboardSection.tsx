'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserX, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { customerAPI } from '@/lib/api/customer.api';
import { purchaseHistoryAPI } from '@/lib/api/purchase-history.api';

interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  newCustomersThisMonth: number;
  totalRevenue: number;
  averageOrderValue: number;
  topSpender: {
    name: string;
    spent: number;
  } | null;
}

export function CustomerDashboardSection() {
  const [stats, setStats] = useState<CustomerStats>({
    totalCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
    newCustomersThisMonth: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    topSpender: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomerStats();
  }, []);

  const loadCustomerStats = async () => {
    setLoading(true);
    try {
      const [allCustomersResponse, activeCustomersResponse] = await Promise.all([
        customerAPI.getAllCustomers(),
        customerAPI.getAllActiveCustomers()
      ]);

      if (allCustomersResponse.success && activeCustomersResponse.success) {
        const allCustomers = allCustomersResponse.data || [];
        const activeCustomers = activeCustomersResponse.data || [];
        
        // Calculate basic stats
        const totalCustomers = allCustomers.length;
        const activeCount = activeCustomers.length;
        const inactiveCount = totalCustomers - activeCount;

        // Calculate new customers this month
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const newCustomersThisMonth = allCustomers.filter(customer => 
          new Date(customer.registrationDate) >= firstDayOfMonth
        ).length;

        // Calculate revenue and order stats for active customers
        let totalRevenue = 0;
        let totalOrders = 0;
        let topSpender = { name: '', spent: 0 };

        const enrichedCustomers = await Promise.all(
          activeCustomers.map(async (customer) => {
            try {
              const [orderCountResponse, totalSpentResponse] = await Promise.all([
                purchaseHistoryAPI.getCustomerOrderCount(customer.id),
                purchaseHistoryAPI.getCustomerTotalSpent(customer.id)
              ]);

              const spent = totalSpentResponse.success ? totalSpentResponse.data || 0 : 0;
              const orders = orderCountResponse.success ? orderCountResponse.data || 0 : 0;

              totalRevenue += spent;
              totalOrders += orders;

              // Track top spender
              if (spent > topSpender.spent) {
                topSpender = {
                  name: `${customer.firstName} ${customer.lastName}`,
                  spent: spent
                };
              }

              return { ...customer, spent, orders };
            } catch (error) {
              console.error(`Error fetching stats for customer ${customer.id}:`, error);
              return { ...customer, spent: 0, orders: 0 };
            }
          })
        );

        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        setStats({
          totalCustomers,
          activeCustomers: activeCount,
          inactiveCustomers: inactiveCount,
          newCustomersThisMonth,
          totalRevenue,
          averageOrderValue,
          topSpender: topSpender.spent > 0 ? topSpender : null
        });
      }
    } catch (error) {
      console.error('Failed to load customer stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Active Customers',
      value: stats.activeCustomers.toString(),
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Inactive Customers',
      value: stats.inactiveCustomers.toString(),
      icon: UserX,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      title: 'New This Month',
      value: stats.newCustomersThisMonth.toString(),
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      title: 'Avg Order Value',
      value: `$${stats.averageOrderValue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {loading ? (
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Spender Card */}
      {stats.topSpender && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-[#6B4E37] to-[#8B4513] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Customer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{stats.topSpender.name}</p>
                  <p className="text-sm opacity-90">Highest lifetime value</p>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 text-lg px-3 py-1">
                  ${stats.topSpender.spent.toFixed(2)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
