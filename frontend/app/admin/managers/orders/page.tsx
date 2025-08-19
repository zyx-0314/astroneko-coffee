'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, TrendingUp, DollarSign, Clock, Package } from 'lucide-react';

export default function OrdersPage() {
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  const FeatureModal = () => (
    <Dialog open={isFeatureModalOpen} onOpenChange={setIsFeatureModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-[#6B4E37]" />
            Feature Under Development
          </DialogTitle>
          <DialogDescription>
            This orders management system is currently being developed. 
            It will include real-time order tracking, customer management, 
            payment processing, and detailed sales analytics.
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Orders Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track and manage customer orders
            </p>
          </div>
          <Button 
            className="bg-[#6B4E37] hover:bg-[#5a3f2d] text-white"
            onClick={() => setIsFeatureModalOpen(true)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Today's Orders</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-300">Pending</p>
                <p className="text-2xl font-bold text-orange-600">15</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$1,247</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#2CA6A4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Growth</p>
                <p className="text-2xl font-bold text-green-600">+12.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <ShoppingCart className="h-12 w-12 text-[#6B4E37] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Active Orders
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage current orders
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Order History
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse past orders and analytics
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <DollarSign className="h-12 w-12 text-[#2CA6A4] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Sales Reports
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Generate detailed sales reports
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table Placeholder */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Orders table will be here
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Complete order management system coming soon
            </p>
            <Button 
              className="mt-4 bg-[#6B4E37] hover:bg-[#5a3f2d] text-white"
              onClick={() => setIsFeatureModalOpen(true)}
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>

      <FeatureModal />
    </div>
  );
}
