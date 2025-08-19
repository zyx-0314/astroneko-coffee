'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  Circle, 
  Users, 
  Coffee, 
  ShoppingCart, 
  BarChart3, 
  Package, 
  Settings, 
  Smartphone, 
  CreditCard,
  Bell,
  Shield,
  Database,
  Zap,
  Star,
  Calendar
} from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: 'authentication' | 'admin' | 'frontend' | 'backend' | 'mobile' | 'analytics';
  priority: 'high' | 'medium' | 'low';
  quarter: string;
  progress: number;
  features: string[];
}

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const roadmapData: RoadmapItem[] = [
    {
      id: '1',
      title: 'User Authentication System',
      description: 'Complete JWT-based authentication with role management',
      status: 'completed',
      category: 'authentication',
      priority: 'high',
      quarter: 'Q1 2024',
      progress: 100,
      features: ['JWT Token Management', 'Role-based Access Control', 'Login/Logout', 'Session Management']
    },
    {
      id: '2',
      title: 'Admin Dashboard Foundation',
      description: 'Core admin interface with navigation and layout systems',
      status: 'completed',
      category: 'admin',
      priority: 'high',
      quarter: 'Q1 2024',
      progress: 100,
      features: ['Admin Sidebar Navigation', 'Responsive Layout', 'Dark Mode Support', 'Role Guards']
    },
    {
      id: '3',
      title: 'Staff Management System',
      description: 'Complete CRUD operations for employee management',
      status: 'in-progress',
      category: 'admin',
      priority: 'high',
      quarter: 'Q1-Q2 2024',
      progress: 25,
      features: ['Staff CRUD Operations', 'Schedule Management', 'Performance Tracking', 'Attendance System']
    },
    {
      id: '4',
      title: 'Inventory Management',
      description: 'Real-time inventory tracking and management system',
      status: 'planned',
      category: 'admin',
      priority: 'high',
      quarter: 'Q2 2024',
      progress: 0,
      features: ['Stock Level Tracking', 'Auto Reorder Alerts', 'Supplier Management', 'Waste Tracking']
    },
    {
      id: '5',
      title: 'Menu Management System',
      description: 'Dynamic menu creation and management with pricing',
      status: 'in-progress',
      category: 'admin',
      priority: 'high',
      quarter: 'Q2 2024',
      progress: 40,
      features: ['Menu CRUD Operations', 'Category Management', 'Pricing Controls', 'Seasonal Menus']
    },
    {
      id: '6',
      title: 'Order Management System',
      description: 'End-to-end order processing and tracking',
      status: 'planned',
      category: 'backend',
      priority: 'high',
      quarter: 'Q2 2024',
      progress: 0,
      features: ['Order Processing', 'Payment Integration', 'Order Tracking', 'Customer Management']
    },
    {
      id: '7',
      title: 'Advanced Analytics & Reports',
      description: 'Comprehensive business intelligence and reporting',
      status: 'planned',
      category: 'analytics',
      priority: 'medium',
      quarter: 'Q3 2024',
      progress: 0,
      features: ['Sales Analytics', 'Staff Performance Reports', 'Inventory Reports', 'Financial Dashboards']
    },
    {
      id: '8',
      title: 'Customer Frontend Application',
      description: 'Customer-facing web application for ordering',
      status: 'planned',
      category: 'frontend',
      priority: 'medium',
      quarter: 'Q2-Q3 2024',
      progress: 0,
      features: ['Menu Browsing', 'Online Ordering', 'User Profiles', 'Order History']
    },
    {
      id: '9',
      title: 'Mobile Application',
      description: 'Native mobile apps for iOS and Android',
      status: 'planned',
      category: 'mobile',
      priority: 'low',
      quarter: 'Q4 2024',
      progress: 0,
      features: ['iOS App', 'Android App', 'Push Notifications', 'Offline Mode']
    },
    {
      id: '10',
      title: 'Payment Processing System',
      description: 'Integrated payment gateway with multiple options',
      status: 'planned',
      category: 'backend',
      priority: 'high',
      quarter: 'Q2 2024',
      progress: 0,
      features: ['Credit Card Processing', 'Digital Wallets', 'Split Payments', 'Refund Management']
    }
  ];

  const categories = [
    { key: 'all', label: 'All Categories', icon: Circle, color: 'text-gray-600' },
    { key: 'authentication', label: 'Authentication', icon: Shield, color: 'text-green-600' },
    { key: 'admin', label: 'Admin Panel', icon: Settings, color: 'text-[#6B4E37]' },
    { key: 'frontend', label: 'Frontend', icon: Smartphone, color: 'text-[#2CA6A4]' },
    { key: 'backend', label: 'Backend', icon: Database, color: 'text-[#E1B168]' },
    { key: 'mobile', label: 'Mobile', icon: Smartphone, color: 'text-purple-600' },
    { key: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-orange-600' }
  ];

  const statuses = [
    { key: 'all', label: 'All Status', icon: Circle },
    { key: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-green-600' },
    { key: 'in-progress', label: 'In Progress', icon: Clock, color: 'text-yellow-600' },
    { key: 'planned', label: 'Planned', icon: Circle, color: 'text-gray-400' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'planned': return <Circle className="h-5 w-5 text-gray-400" />;
      default: return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority.toUpperCase()}</Badge>;
  };

  const filteredItems = roadmapData.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const stats = {
    completed: roadmapData.filter(item => item.status === 'completed').length,
    inProgress: roadmapData.filter(item => item.status === 'in-progress').length,
    planned: roadmapData.filter(item => item.status === 'planned').length,
    total: roadmapData.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Astroneko Coffee Roadmap
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track our development progress and see what&apos;s coming next for the Astroneko Coffee management system.
            This roadmap is updated regularly to reflect our current priorities and development status.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">In Progress</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <Circle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.planned}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Planned</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-[#6B4E37] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Features</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Category:</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.key}
                      variant={selectedCategory === category.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.key)}
                      className={selectedCategory === category.key ? "bg-[#6B4E37] hover:bg-[#5a3f2d]" : ""}
                    >
                      <category.icon className={`h-4 w-4 mr-1 ${category.color || ''}`} />
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Status:</h3>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status.key}
                      variant={selectedStatus === status.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status.key)}
                      className={selectedStatus === status.key ? "bg-[#6B4E37] hover:bg-[#5a3f2d]" : ""}
                    >
                      <status.icon className={`h-4 w-4 mr-1 ${status.color || ''}`} />
                      {status.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roadmap Items */}
      <div className="space-y-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(item.priority)}
                    <Badge variant="outline">{item.quarter}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {item.status === 'in-progress' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        {item.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : item.status === 'in-progress' ? (
                          <Clock className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Circle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No items match your filters
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your category or status filters to see more items.
          </p>
        </div>
      )}

      {/* Footer Note */}
      <Card className="bg-white dark:bg-gray-800 mt-8">
        <CardContent className="p-6 text-center">
          <Calendar className="h-8 w-8 text-[#6B4E37] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Stay Updated
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            This roadmap is updated regularly. Timeline estimates are subject to change based on 
            development priorities and feedback. Want to suggest a feature or report an issue? 
            Contact our development team through the admin dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
