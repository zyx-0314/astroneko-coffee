'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RoleGuard from '@/components/guards/RoleGuard';
import { 
  Users, 
  ShoppingCart, 
  Coffee, 
  CreditCard,
  Clock,
  Phone,
  MessageSquare,
  UserCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function FrontDeskDashboardPage() {
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  const FeatureModal = () => (
    <Dialog open={isFeatureModalOpen} onOpenChange={setIsFeatureModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-[#6B4E37]" />
            Feature Under Development
          </DialogTitle>
          <DialogDescription>
            This front desk feature is currently being developed. 
            It will include order processing, customer service tools, 
            and real-time communication with kitchen staff.
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
    <RoleGuard allowedRoles={['cashier', 'manager', 'owner']}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Front Desk Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Customer service and order management center
            </p>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Orders Today</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">87</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-[#6B4E37]" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Customers Served</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">142</p>
                </div>
                <Users className="h-8 w-8 text-[#2CA6A4]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Avg Wait Time</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">8m</p>
                </div>
                <Clock className="h-8 w-8 text-[#E1B168]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Payment Issues</p>
                  <p className="text-2xl font-bold text-red-600">3</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
            <CardContent className="p-6 text-center">
              <ShoppingCart className="h-12 w-12 text-[#6B4E37] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                New Order
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Process walk-in customer orders
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 text-[#2CA6A4] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Phone Orders
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Handle phone and online orders
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
            <CardContent className="p-6 text-center">
              <UserCheck className="h-12 w-12 text-[#E1B168] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Customer Service
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Handle customer inquiries and issues
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Current Orders & Communication */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Active Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: '#087', customer: 'John D.', items: 'Cappuccino, Muffin', status: 'preparing', time: '3 min' },
                  { id: '#088', customer: 'Sarah M.', items: 'Latte', status: 'ready', time: '0 min' },
                  { id: '#089', customer: 'Mike R.', items: 'Americano x2', status: 'preparing', time: '5 min' }
                ].map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.id} - {order.customer}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'ready' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {order.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Quick Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => setIsFeatureModalOpen(true)}>
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Terminal
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setIsFeatureModalOpen(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Kitchen Communication
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setIsFeatureModalOpen(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Reservations
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setIsFeatureModalOpen(true)}>
                <Coffee className="h-4 w-4 mr-2" />
                Menu Updates
              </Button>
            </CardContent>
          </Card>
        </div>

        <FeatureModal />
      </div>
    </RoleGuard>
  );
}
