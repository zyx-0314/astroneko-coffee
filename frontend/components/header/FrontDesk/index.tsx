'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, Bell } from 'lucide-react';
import { HeaderProps } from '@/schema/header.schema';
import { useFrontDeskHeaderState } from './FrontDesk.hook';

export default function FrontDeskHeader({ className = '' }: HeaderProps) {
  const { 
    isMobileMenuOpen, 
    queueLength, 
    pendingRequests, 
    totalSalesToday, 
    toggleMobileMenu 
  } = useFrontDeskHeaderState();
  
  return (
    <header className={`bg-[#2CA6A4] dark:bg-[#1E7A78] text-white shadow-md ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/admin/dashboard/front-desk" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                className="text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white">Front Desk</span>
              </motion.div>
            </Link>
          </div>

          {/* Front Desk Stats */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Queue</span>
              <Badge variant="secondary" className="bg-white text-[#2CA6A4]">
                {queueLength}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Today</span>
              <Badge variant="secondary" className="bg-white text-[#2CA6A4]">
                ${totalSalesToday}
              </Badge>
            </div>
            {pendingRequests > 0 && (
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium">Requests</span>
                <Badge variant="destructive" className="bg-red-500 text-white">
                  {pendingRequests}
                </Badge>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/admin/dashboard/front-desk" 
              className="text-white hover:text-[#D4EDEC] transition-colors duration-200 font-medium relative group"
            >
              Dashboard
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4EDEC] group-hover:w-full transition-all duration-300"
                layoutId="frontdesk-underline"
              />
            </Link>
            <Link 
              href="/admin/dashboard/front-desk/queue" 
              className="text-white hover:text-[#D4EDEC] transition-colors duration-200 font-medium relative group"
            >
              Queue
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4EDEC] group-hover:w-full transition-all duration-300"
                layoutId="frontdesk-underline"
              />
            </Link>
            <Link 
              href="/menu" 
              className="text-white hover:text-[#D4EDEC] transition-colors duration-200 font-medium relative group"
            >
              Order Menu
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4EDEC] group-hover:w-full transition-all duration-300"
                layoutId="frontdesk-underline"
              />
            </Link>
            <Link 
              href="/admin/dashboard/front-desk/customers" 
              className="text-white hover:text-[#D4EDEC] transition-colors duration-200 font-medium relative group"
            >
              Customers
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4EDEC] group-hover:w-full transition-all duration-300"
                layoutId="frontdesk-underline"
              />
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <AnimatedButton 
              variant="secondary" 
              size="sm"
              className="bg-white text-[#2CA6A4] hover:bg-[#D4EDEC]"
            >
              New Order
            </AnimatedButton>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-white hover:bg-[#1E7A78] transition-colors mobile-menu-button"
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
            className="md:hidden bg-[#1E7A78] mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/admin/dashboard/front-desk"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#165A58] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/dashboard/front-desk/queue"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#165A58] transition-colors"
              >
                Queue
              </Link>
              <Link
                href="/menu"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#165A58] transition-colors"
              >
                Order Menu
              </Link>
              <Link
                href="/admin/dashboard/front-desk/customers"
                className="block px-3 py-2 rounded-md text-white hover:bg-[#165A58] transition-colors"
              >
                Customers
              </Link>
              <div className="px-3 py-2 border-t border-[#165A58] mt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Queue Length</span>
                  <Badge variant="secondary" className="bg-white text-[#2CA6A4]">
                    {queueLength}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Sales Today</span>
                  <Badge variant="secondary" className="bg-white text-[#2CA6A4]">
                    ${totalSalesToday}
                  </Badge>
                </div>
                {pendingRequests > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Requests</span>
                    <Badge variant="destructive" className="bg-red-500 text-white">
                      {pendingRequests}
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
