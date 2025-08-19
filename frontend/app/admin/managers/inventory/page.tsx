'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Package, Plus, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export default function InventoryManagementPage() {
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  const FeatureModal = () => (
    <Dialog open={isFeatureModalOpen} onOpenChange={setIsFeatureModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-[#6B4E37]" />
            Feature Under Development
          </DialogTitle>
          <DialogDescription>
            This inventory management feature is currently being developed. 
            It will include real-time stock tracking, automatic reorder alerts, 
            supplier management, and detailed inventory reports.
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
              Inventory Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track and manage your coffee shop inventory
            </p>
          </div>
          <Button 
            className="bg-[#6B4E37] hover:bg-[#5a3f2d] text-white"
            onClick={() => setIsFeatureModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">245</p>
              </div>
              <Package className="h-8 w-8 text-[#6B4E37]" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Low Stock</p>
                <p className="text-2xl font-bold text-red-600">12</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Stock Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$18,250</p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#2CA6A4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">-8.5%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-[#E1B168]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 text-[#6B4E37] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Stock Overview
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              View all inventory items and stock levels
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Low Stock Alerts
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Manage items running low on stock
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-[#2CA6A4] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Purchase Orders
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create and manage supplier orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table Placeholder */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Inventory Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Inventory table will be here
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Full inventory management system coming soon
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
