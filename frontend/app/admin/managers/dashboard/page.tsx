'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';
import RoleGuard from '@/components/guards/RoleGuard';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  Coffee, 
  BarChart3, 
  TrendingUp, 
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function ManagersDashboardPage() {
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  const FeatureModal = () => (
    <Dialog open={isFeatureModalOpen} onOpenChange={setIsFeatureModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#6B4E37]" />
            Feature Under Development
          </DialogTitle>
          <DialogDescription>
            This dashboard feature is currently being developed. 
            It will include real-time analytics, performance metrics, 
            and comprehensive management tools for coffee shop operations.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={() => setIsFeatureModalOpen(false)}>
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const managementAreas = [
    {
      title: 'Staff Management',
      description: 'Manage team members, schedules, and performance',
      icon: Users,
      color: 'text-[#6B4E37]',
      href: '/admin/managers/staff',
      stats: { active: 24, total: 28 }
    },
    {
      title: 'Inventory Management',
      description: 'Track stock levels and manage suppliers',
      icon: Package,
      color: 'text-[#2CA6A4]',
      href: '/admin/managers/inventory',
      stats: { low: 12, total: 245 }
    },
    {
      title: 'Orders Management',
      description: 'Process and track customer orders',
      icon: ShoppingCart,
      color: 'text-[#E1B168]',
      href: '/admin/managers/orders',
      stats: { pending: 8, today: 87 }
    },
    {
      title: 'Menu Management',
      description: 'Create and update menu items and pricing',
      icon: Coffee,
      color: 'text-green-600',
      href: '/admin/managers/menu',
      stats: { items: 42, categories: 8 }
    }
  ];

  return (
    <RoleGuard allowedRoles={['manager', 'owner']}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Managers Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Overview of all management areas and key metrics
            </p>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Today&apos;s Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$1,247</p>
                </div>
                <DollarSign className="h-8 w-8 text-[#6B4E37]" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Active Staff</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">18/24</p>
                </div>
                <Users className="h-8 w-8 text-[#2CA6A4]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Orders Today</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">87</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-[#E1B168]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Low Stock Items</p>
                  <p className="text-2xl font-bold text-red-600">12</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {managementAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={area.href}>
                <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <area.icon className={`h-8 w-8 ${area.color}`} />
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                          {area.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {Object.entries(area.stats).map(([key, value]) => (
                          <span key={key} className="mr-4">
                            {key}: <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                          </span>
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'warning', message: 'Coffee beans running low', time: '5 min ago' },
                  { type: 'info', message: 'New staff member onboarded', time: '1 hour ago' },
                  { type: 'success', message: 'Daily sales target reached', time: '2 hours ago' }
                ].map((alert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {alert.type === 'info' && <Clock className="h-4 w-4 text-blue-500" />}
                    {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-[#6B4E37] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Analytics dashboard coming soon
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Detailed performance metrics and analytics will be available here
                </p>
                <Button 
                  className="bg-[#6B4E37] hover:bg-[#5a3f2d] text-white"
                  onClick={() => setIsFeatureModalOpen(true)}
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <FeatureModal />
      </div>
    </RoleGuard>
  );
}
