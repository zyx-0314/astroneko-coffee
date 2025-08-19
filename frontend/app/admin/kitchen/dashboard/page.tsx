'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RoleGuard from '@/components/guards/RoleGuard';
import { 
  Coffee, 
  Clock, 
  ChefHat,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Timer,
  Package,
  Bell,
  Users
} from 'lucide-react';

export default function KitchenDashboardPage() {
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  const FeatureModal = () => (
    <Dialog open={isFeatureModalOpen} onOpenChange={setIsFeatureModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-[#6B4E37]" />
            Feature Under Development
          </DialogTitle>
          <DialogDescription>
            This kitchen management system is currently being developed. 
            It will include order queue management, inventory alerts, 
            and real-time communication with front desk staff.
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

  return (
    <RoleGuard allowedRoles={['cook', 'barista', 'manager', 'owner']}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Kitchen Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Order preparation and kitchen operations center
            </p>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Orders in Queue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                </div>
                <Clock className="h-8 w-8 text-[#6B4E37]" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Avg Prep Time</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">6m</p>
                </div>
                <Timer className="h-8 w-8 text-[#2CA6A4]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Completed Today</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">79</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Equipment Alerts</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Queue & Equipment Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Order Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: '#087', items: 'Cappuccino, Blueberry Muffin', priority: 'high', time: '3m ago' },
                  { id: '#088', items: 'Iced Latte', priority: 'normal', time: '1m ago' },
                  { id: '#089', items: 'Americano x2, Croissant', priority: 'high', time: '30s ago' },
                  { id: '#090', items: 'Green Tea Latte', priority: 'normal', time: 'just now' }
                ].map((order, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    order.priority === 'high' 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{order.items}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.priority === 'high'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {order.priority}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Equipment Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Espresso Machine #1', status: 'online', temp: '195°F' },
                  { name: 'Espresso Machine #2', status: 'maintenance', temp: 'N/A' },
                  { name: 'Coffee Grinder', status: 'online', temp: 'Normal' },
                  { name: 'Steamer', status: 'alert', temp: '210°F' }
                ].map((equipment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{equipment.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{equipment.temp}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      equipment.status === 'online' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : equipment.status === 'alert'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {equipment.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => setIsFeatureModalOpen(true)}
          >
            <CheckCircle className="h-6 w-6 mb-2 text-green-600" />
            <span className="text-sm">Mark Complete</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => setIsFeatureModalOpen(true)}
          >
            <Package className="h-6 w-6 mb-2 text-[#6B4E37]" />
            <span className="text-sm">Inventory Alert</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => setIsFeatureModalOpen(true)}
          >
            <Users className="h-6 w-6 mb-2 text-[#2CA6A4]" />
            <span className="text-sm">Call Front Desk</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => setIsFeatureModalOpen(true)}
          >
            <AlertTriangle className="h-6 w-6 mb-2 text-red-500" />
            <span className="text-sm">Report Issue</span>
          </Button>
        </div>

        <FeatureModal />
      </div>
    </RoleGuard>
  );
}
