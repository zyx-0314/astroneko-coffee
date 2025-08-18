'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Settings, Users, Package, AlertTriangle, DollarSign, Crown } from 'lucide-react';
import { HeaderProps } from '@/schema/header.schema';
import { useManagerHeaderState } from './Manager.hook';

export default function ManagerHeader({ className = '' }: HeaderProps) {
  const { 
    isMobileMenuOpen, 
    totalRevenue, 
    activeEmployees, 
    lowStockItems, 
    criticalAlerts,
    toggleMobileMenu 
  } = useManagerHeaderState();
  
  return (
    <header className={`bg-[#8B4513] dark:bg-[#6B3410] text-white shadow-md ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/admin/dashboard/managers" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Crown className="w-8 h-8 text-[#FFD700]" />
              </motion.div>
              <motion.div 
                className="text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white">Manager Portal</span>
              </motion.div>
            </Link>
          </div>

          {/* Manager Stats */}
          <div className="hidden xl:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-[#90EE90]" />
              <span className="text-sm font-medium">Revenue</span>
              <Badge variant="secondary" className="bg-[#90EE90] text-[#8B4513] font-semibold">
                ${totalRevenue.toLocaleString()}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Active Staff</span>
              <Badge variant="secondary" className="bg-white text-[#8B4513]">
                {activeEmployees}
              </Badge>
            </div>
            {lowStockItems > 0 && (
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4 text-[#FFA500]" />
                <span className="text-sm font-medium">Low Stock</span>
                <Badge variant="secondary" className="bg-[#FFA500] text-white">
                  {lowStockItems}
                </Badge>
              </div>
            )}
            {criticalAlerts > 0 && (
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-sm font-medium">Alerts</span>
                <Badge variant="destructive" className="bg-[#FF6B6B] text-white animate-pulse">
                  {criticalAlerts}
                </Badge>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              href="/admin/dashboard/managers" 
              className="text-white hover:text-[#D2B48C] transition-colors duration-200 font-medium relative group"
            >
              Dashboard
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D2B48C] group-hover:w-full transition-all duration-300"
                layoutId="manager-underline"
              />
            </Link>
            <Link 
              href="/admin/dashboard/managers/analytics" 
              className="text-white hover:text-[#D2B48C] transition-colors duration-200 font-medium relative group"
            >
              Analytics
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D2B48C] group-hover:w-full transition-all duration-300"
                layoutId="manager-underline"
              />
            </Link>
            <Link 
              href="/admin/dashboard/managers/employees" 
              className="text-white hover:text-[#D2B48C] transition-colors duration-200 font-medium relative group"
            >
              Staff
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D2B48C] group-hover:w-full transition-all duration-300"
                layoutId="manager-underline"
              />
            </Link>
            <Link 
              href="/admin/dashboard/managers/inventory" 
              className="text-white hover:text-[#D2B48C] transition-colors duration-200 font-medium relative group"
            >
              Inventory
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D2B48C] group-hover:w-full transition-all duration-300"
                layoutId="manager-underline"
              />
            </Link>
            
            {/* Dropdown for More */}
            <div className="relative group">
              <button className="text-white hover:text-[#D2B48C] transition-colors duration-200 font-medium flex items-center space-x-1">
                <span>More</span>
                <svg 
                  className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link href="/admin/dashboard/managers/reports" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Reports</Link>
                  <Link href="/admin/dashboard/managers/settings" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Settings</Link>
                  <Link href="/admin/dashboard/managers/clients" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Clients</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <AnimatedButton 
              variant="secondary" 
              size="sm"
              className="bg-[#FFD700] text-[#8B4513] hover:bg-[#FFC107] font-semibold"
            >
              <Settings className="w-4 h-4 mr-1" />
              Admin Panel
            </AnimatedButton>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-white hover:bg-[#6B3410] transition-colors mobile-menu-button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#6B3410] mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/admin/dashboard/managers"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#5A2C0D] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/dashboard/managers/analytics"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#5A2C0D] transition-colors"
              >
                Analytics
              </Link>
              <Link
                href="/admin/dashboard/managers/employees"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#5A2C0D] transition-colors"
              >
                Staff Management
              </Link>
              <Link
                href="/admin/dashboard/managers/inventory"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#5A2C0D] transition-colors"
              >
                Inventory
              </Link>
              <Link
                href="/admin/dashboard/managers/reports"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#5A2C0D] transition-colors"
              >
                Reports
              </Link>
              <Link
                href="/admin/dashboard/managers/settings"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#5A2C0D] transition-colors"
              >
                Settings
              </Link>
              
              {/* Mobile Stats */}
              <div className="px-3 py-2 border-t border-[#5A2C0D] mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Revenue</span>
                  <Badge variant="secondary" className="bg-[#90EE90] text-[#8B4513] font-semibold">
                    ${totalRevenue.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Staff</span>
                  <Badge variant="secondary" className="bg-white text-[#8B4513]">
                    {activeEmployees}
                  </Badge>
                </div>
                {lowStockItems > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Low Stock Items</span>
                    <Badge variant="secondary" className="bg-[#FFA500] text-white">
                      {lowStockItems}
                    </Badge>
                  </div>
                )}
                {criticalAlerts > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Critical Alerts</span>
                    <Badge variant="destructive" className="bg-[#FF6B6B] text-white animate-pulse">
                      {criticalAlerts}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
