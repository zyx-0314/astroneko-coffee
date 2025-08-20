'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface MenuHeaderSectionProps {
  onCreateItem: () => void;
}

export default function MenuHeaderSection({ onCreateItem }: MenuHeaderSectionProps) {
  return (
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
          onClick={onCreateItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </motion.div>
  );
}
