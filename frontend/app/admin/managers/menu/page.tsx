'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Coffee, Plus, Edit, Star, TrendingUp } from 'lucide-react';

export default function MenuManagementPage() {
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
            This menu management system is currently being developed. 
            It will include item creation, pricing management, category organization, 
            seasonal menus, and nutritional information tracking.
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
              Menu Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Create and manage your coffee shop menu
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
                <p className="text-sm text-gray-600 dark:text-gray-300">Menu Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
              </div>
              <Coffee className="h-8 w-8 text-[#6B4E37]" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Categories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
              <Edit className="h-8 w-8 text-[#2CA6A4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Popular Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
              <Star className="h-8 w-8 text-[#E1B168]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
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
            <Coffee className="h-12 w-12 text-[#6B4E37] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Coffee Menu
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Manage coffee drinks and specialty beverages
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <Edit className="h-12 w-12 text-[#2CA6A4] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Food Items
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Add and edit pastries and food offerings
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 text-[#E1B168] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Seasonal Menu
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create special seasonal offerings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Espresso Drinks', 'Cold Brew', 'Pastries', 'Sandwiches'].map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">{category}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setIsFeatureModalOpen(true)}
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setIsFeatureModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setIsFeatureModalOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Bulk Edit Prices
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setIsFeatureModalOpen(true)}
              >
                <Star className="h-4 w-4 mr-2" />
                Feature Items
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <FeatureModal />
    </div>
  );
}
