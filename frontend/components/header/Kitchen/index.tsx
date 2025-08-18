'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, CheckCircle } from 'lucide-react';
import { HeaderProps } from '@/schema/header.schema';
import { useKitchenHeaderState } from './Kitchen.hook';

export default function KitchenHeader({ className = '' }: HeaderProps) {
  const { isMobileMenuOpen, activeOrders, completedToday, toggleMobileMenu } = useKitchenHeaderState();
  
  return (
    <header className={`bg-[#FF6B35] dark:bg-[#CC5529] text-white shadow-md ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/admin/dashboard/kitchen" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ChefHat className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                className="text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white">Kitchen Dashboard</span>
              </motion.div>
            </Link>
          </div>

          {/* Kitchen Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Active Orders</span>
              <Badge variant="secondary" className="bg-white text-[#FF6B35]">
                {activeOrders}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Completed Today</span>
              <Badge variant="secondary" className="bg-white text-[#FF6B35]">
                {completedToday}
              </Badge>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/admin/dashboard/kitchen" 
              className="text-white hover:text-[#FFE5D9] transition-colors duration-200 font-medium relative group"
            >
              Dashboard
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFE5D9] group-hover:w-full transition-all duration-300"
                layoutId="kitchen-underline"
              />
            </Link>
            <Link 
              href="/admin/dashboard/kitchen/orders" 
              className="text-white hover:text-[#FFE5D9] transition-colors duration-200 font-medium relative group"
            >
              Orders
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFE5D9] group-hover:w-full transition-all duration-300"
                layoutId="kitchen-underline"
              />
            </Link>
            <Link 
              href="/admin/dashboard/kitchen/inventory" 
              className="text-white hover:text-[#FFE5D9] transition-colors duration-200 font-medium relative group"
            >
              Inventory
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFE5D9] group-hover:w-full transition-all duration-300"
                layoutId="kitchen-underline"
              />
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <AnimatedButton 
              variant="secondary" 
              size="sm"
              className="bg-white text-[#FF6B35] hover:bg-[#FFE5D9]"
            >
              Kitchen In
            </AnimatedButton>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-white hover:bg-[#CC5529] transition-colors mobile-menu-button"
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
            className="md:hidden bg-[#CC5529] mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/admin/dashboard/kitchen"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#A0441F] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/dashboard/kitchen/orders"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#A0441F] transition-colors"
              >
                Orders
              </Link>
              <Link
                href="/admin/dashboard/kitchen/inventory"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#A0441F] transition-colors"
              >
                Inventory
              </Link>
              <div className="px-3 py-2 border-t border-[#A0441F] mt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Active Orders</span>
                  <Badge variant="secondary" className="bg-white text-[#FF6B35]">
                    {activeOrders}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completed Today</span>
                  <Badge variant="secondary" className="bg-white text-[#FF6B35]">
                    {completedToday}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
