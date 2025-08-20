'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Coffee, 
  ChefHat, 
  UserCheck,
  Settings,
  LogOut,
  Menu,
  X,
  Package,
  ShoppingCart,
  User,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Clipboard,
  Box,
  BarChart2,
  BarChartBig,
  ChartColumnStacked,
  BadgeCheck
} from 'lucide-react';
import { useAuth } from '@/provider/auth-provider';
import { useAdminSidebar } from './AdminSidebar.hook';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useAdminSidebar();

  const menuItems = [
    // Role-specific dashboards
    {
      title: 'Managers Dashboard',
      href: '/admin/managers/dashboard',
      icon: LayoutDashboard,
      roles: ['owner', 'manager']
    },
    {
      title: 'Front Desk Dashboard',
      href: '/admin/front-desk/dashboard',
      icon: UserCheck,
      roles: ['cashier', 'helper']
    },
    {
      title: 'Orders Queue',
      href: '/admin/front-desk/orders',
      icon: ShoppingCart,
      roles: ['cashier', 'helper']
    },
    {
      title: 'Menu',
      href: '/menu',
      icon: Clipboard,
      roles: ['cashier', 'helper']
    },
    {
      title: 'Inventory',
      href: '/admin/front-desk/inventory',
      icon: Box,
      roles: ['cashier', 'helper']
    },
    {
      title: 'Reservations',
      href: '/admin/front-desk/reservations',
      icon: BadgeCheck,
      roles: ['cashier', 'helper']
    },
    {
      title: 'Kitchen Dashboard',
      href: '/admin/kitchen/dashboard',
      icon: ChefHat,
      roles: ['cook', 'barista']
    },
        {
      title: 'Menu',
      href: '/admin/kitchen/menu',
      icon: Clipboard,
      roles: ['cook', 'barista']
    },
    {
      title: 'Orders Queue',
      href: '/admin/kitchen/orders',
      icon: ShoppingCart,
      roles: ['cook', 'barista']
    },
    {
      title: 'Inventory',
      href: '/admin/kitchen/inventory',
      icon: Box,
      roles: ['cook', 'barista']
    },
    // Manager tools
    {
      title: 'Staff Management',
      href: '/admin/managers/staff',
      icon: Users,
      roles: ['owner', 'manager']
    },
    {
      title: 'Customer Management',
      href: '/admin/managers/customers',
      icon: User,
      roles: ['owner', 'manager']
    },
    {
      title: 'Inventory Management',
      href: '/admin/managers/inventory',
      icon: Package,
      roles: ['owner', 'manager']
    },
    {
      title: 'Orders Management',
      href: '/admin/managers/orders',
      icon: ShoppingCart,
      roles: ['owner', 'manager']
    },
    {
      title: 'Menu Management',
      href: '/admin/managers/menu',
      icon: Coffee,
      roles: ['owner', 'manager']
    },
    {
      title: 'Reports',
      href: '/admin/reports',
      icon: BarChart3,
      roles: ['owner', 'manager']
    },
    {
      title: 'Analytics',
      href: '/admin/managers/analytics',
      icon: ChartColumnStacked,
      roles: ['owner', 'manager']
    },
    {
      title: 'Performance',
      href: '/admin/managers/performance',
      icon: BarChart2,
      roles: ['owner', 'manager']
    },
    {
      title: 'Requests',
      href: '/admin/requests',
      icon: MessageSquare,
      roles: ['owner', 'manager']
    }
  ];

  const quickActions = [
    {
      title: 'Profile',
      href: '/admin/profile',
      icon: User
    },
    {
      title: 'Manual',
      href: '/admin/manual',
      icon: BookOpen
    },
    {
      title: 'Help',
      href: '/admin/help',
      icon: HelpCircle
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-800 shadow-lg"
      >
        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 0 : 280,
          opacity: isCollapsed ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed md:relative z-40 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden
          ${isCollapsed ? 'md:w-0' : 'md:w-70'}
        `}
        style={{
          display: isCollapsed ? 'none' : 'block'
        }}
      >
        <div className="flex flex-col h-full p-6 overflow-hidden">
           {/* User Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user && user.avatar ? user.avatar : user && user.sex === 'female' ? '/placeholder/user/Female.png' : '/placeholder/user/Male.png'} />
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name || 'User'}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary"
                    className="text-xs bg-[#2CA6A4] text-white"
                  >
                    {user?.role}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {filteredMenuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer
                      ${isActive 
                        ? 'bg-[#6B4E37] text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{item.title}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-2">
              Quick Actions
            </div>
            
            {quickActions.map((action) => {
              const isActive = pathname === action.href;
              return (
                <Link key={action.href} href={action.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm
                      ${isActive 
                        ? 'bg-[#6B4E37] text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <action.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium">{action.title}</span>
                  </motion.div>
                </Link>
              );
            })}

            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 mt-4"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
