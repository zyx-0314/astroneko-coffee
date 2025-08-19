'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Coffee, 
  Users, 
  ShoppingCart, 
  Package, 
  BarChart3,
  Settings,
  HelpCircle,
  Download,
  ExternalLink
} from 'lucide-react';

interface ManualSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'operations' | 'management' | 'technical' | 'policies';
  lastUpdated: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const manualSections: ManualSection[] = [
  // Operations
  {
    id: 'front-desk-operations',
    title: 'Front Desk Operations',
    description: 'Complete guide for cashiers and front desk staff on customer service and order processing.',
    icon: Users,
    category: 'operations',
    lastUpdated: '2025-08-15',
    difficulty: 'beginner'
  },
  {
    id: 'kitchen-operations',
    title: 'Kitchen Operations',
    description: 'Kitchen workflow, food preparation guidelines, and quality standards.',
    icon: Coffee,
    category: 'operations',
    lastUpdated: '2025-08-12',
    difficulty: 'intermediate'
  },
  {
    id: 'order-management',
    title: 'Order Management System',
    description: 'How to process, track, and fulfill customer orders efficiently.',
    icon: ShoppingCart,
    category: 'operations',
    lastUpdated: '2025-08-18',
    difficulty: 'beginner'
  },
  
  // Management
  {
    id: 'staff-management',
    title: 'Staff Management',
    description: 'Guidelines for hiring, training, scheduling, and performance management.',
    icon: Users,
    category: 'management',
    lastUpdated: '2025-08-10',
    difficulty: 'intermediate'
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management',
    description: 'Stock control, ordering procedures, and inventory tracking systems.',
    icon: Package,
    category: 'management',
    lastUpdated: '2025-08-14',
    difficulty: 'intermediate'
  },
  {
    id: 'reports-analytics',
    title: 'Reports & Analytics',
    description: 'Understanding business metrics, generating reports, and data analysis.',
    icon: BarChart3,
    category: 'management',
    lastUpdated: '2025-08-16',
    difficulty: 'advanced'
  },
  
  // Technical
  {
    id: 'system-administration',
    title: 'System Administration',
    description: 'Technical setup, maintenance, and troubleshooting guidelines.',
    icon: Settings,
    category: 'technical',
    lastUpdated: '2025-08-08',
    difficulty: 'advanced'
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting Guide',
    description: 'Common issues and their solutions for daily operations.',
    icon: HelpCircle,
    category: 'technical',
    lastUpdated: '2025-08-17',
    difficulty: 'intermediate'
  }
];

const categoryConfig = {
  operations: { title: 'Daily Operations', color: 'bg-green-500' },
  management: { title: 'Management', color: 'bg-blue-500' },
  technical: { title: 'Technical', color: 'bg-purple-500' },
  policies: { title: 'Policies', color: 'bg-orange-500' }
};

const difficultyConfig = {
  beginner: { title: 'Beginner', color: 'bg-green-100 text-green-800' },
  intermediate: { title: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
  advanced: { title: 'Advanced', color: 'bg-red-100 text-red-800' }
};

export default function ManualPage() {
  const groupedSections = manualSections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, ManualSection[]>);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-[#6B4E37] mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Operations Manual
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Comprehensive guides and documentation for Astroneko Coffee operations, 
          management procedures, and system administration.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Full Manual (PDF)
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Online Training Portal
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Manual Sections by Category */}
      <div className="space-y-8">
        {Object.entries(groupedSections).map(([category, sections], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + categoryIndex * 0.1 }}
          >
            <div className="flex items-center mb-6">
              <div className={`w-4 h-8 ${categoryConfig[category as keyof typeof categoryConfig].color} rounded-r-lg mr-4`} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {categoryConfig[category as keyof typeof categoryConfig].title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-[#6B4E37]">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <section.icon className="h-8 w-8 text-[#6B4E37] mb-2" />
                        <Badge 
                          variant="outline" 
                          className={difficultyConfig[section.difficulty].color}
                        >
                          {difficultyConfig[section.difficulty].title}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-semibold line-clamp-2">
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {section.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Updated: {section.lastUpdated}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Getting Started Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <Card className="bg-gradient-to-r from-[#6B4E37]/10 to-[#2CA6A4]/10 border-[#6B4E37]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#6B4E37]" />
              New to Astroneko Coffee?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start with these essential guides to get familiar with our operations and procedures.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-[#6B4E37] text-white">
                Front Desk Operations
              </Badge>
              <Badge variant="secondary" className="bg-[#2CA6A4] text-white">
                Order Management
              </Badge>
              <Badge variant="secondary" className="bg-gray-600 text-white">
                Troubleshooting Guide
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
