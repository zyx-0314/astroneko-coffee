'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Star, 
  LogOut, 
  Gift, 
  Menu, 
  X, 
  Bell,
  User as UserIcon,
  Settings,
  CreditCard,
  Heart,
  MapPin,
  ChevronDown,
  FileText,
  HelpCircle,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User } from '@/schema/user.schema';
import { AuthenticatedHeaderProps } from '@/schema/components.schema';
import { useAuthenticatedHeaderState } from './Authenticated.hook';
import { CreateReportModal, CreateRequestModal } from '@/components/modals';

export default function AuthenticatedHeader({ 
  user, 
  className = '', 
  cartItemCount = 0 
}: AuthenticatedHeaderProps) {
  const { 
    isMobileMenuOpen, 
    isCartOpen, 
    isProfileMenuOpen,
    isMounted, 
    notifications,
    toggleMobileMenu,
    toggleCart,
    toggleProfileMenu
  } = useAuthenticatedHeaderState();

  // Modal states for Reports and Requests
  const [isCreateReportModalOpen, setIsCreateReportModalOpen] = useState(false);
  const [isCreateRequestModalOpen, setIsCreateRequestModalOpen] = useState(false);

  // Current promo data
  const currentPromo = {
    name: 'Milky Way',
    discount: '11% OFF',
    code: 'NEEKOGUST',
    originalPrice: 4.50,
    salePrice: 3.99
  };

  // Format user role for display
  const formatUserRole = (role: string): string => {
    switch (role) {
      case 'client':
        return 'Member';
      case 'cashier':
        return 'Front Desk Staff';
      case 'helper':
        return 'Front Desk Assistant';
      case 'cook':
        return 'Kitchen Staff';
      case 'barista':
        return 'Barista';
      case 'manager':
        return 'Manager';
      case 'owner':
        return 'Owner';
      default:
        return 'Team Member';
    }
  };

  // Check if user is a client (has access to shopping features)
  const isClient = user.role === 'client';
  
  // Check if user is an admin (staff member)
  const isAdmin = ['cashier', 'helper', 'cook', 'barista', 'manager', 'owner'].includes(user.role);

  return (
    <header className={`bg-[#D4EDEC] dark:bg-[#2CA6A4] text-gray-800 dark:text-white shadow-md sticky top-0 z-50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/main-logo/transparent.webp"
                  alt="Astroneko Coffee"
                  width={40}
                  height={40}
                  className="dark:hidden"
                  priority
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/main-logo/light-transparent.webp"
                  alt="Astroneko Coffee"
                  width={40}
                  height={40}
                  className="hidden dark:block"
                  priority
                />
              </motion.div>
              <motion.div 
                className="text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-gray-800 dark:text-white">Astroneko Coffee</span>
              </motion.div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200 font-medium relative group"
            >
              Dashboard
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E1B168] group-hover:w-full transition-all duration-300"
                layoutId="auth-underline"
              />
            </Link>
            <Link 
              href="/menu" 
              className="text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200 font-medium relative group"
            >
              Menu
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E1B168] group-hover:w-full transition-all duration-300"
                layoutId="auth-underline"
              />
            </Link>
            <Link 
              href="/order" 
              className="text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200 font-medium relative group"
            >
              Order
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E1B168] group-hover:w-full transition-all duration-300"
                layoutId="auth-underline"
              />
            </Link>
            
            {/* Dropdown menu for More */}
            <div className="relative group">
              <button className="text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200 font-medium flex items-center space-x-1">
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
              
              {/* Dropdown Content */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#D4EDEC] dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link 
                    href="/about" 
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    About Us
                  </Link>
                  <Link 
                    href="/mood-board" 
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Mood Board
                  </Link>
                  <Link 
                    href="/roadmap" 
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Roadmap
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Contact
                  </Link>
                  <Link 
                    href="/careers" 
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Careers
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Right side - Role-based features and User Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Client-only features */}
            {isClient && (
              <>
                {/* Promo Banner */}
                <motion.div 
                  className="hidden xl:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded-full text-xs font-semibold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Gift className="w-4 h-4" />
                  <Link href="/menu" className="hover:underline">
                    {currentPromo.discount} {currentPromo.name} - Use {currentPromo.code}
                  </Link>
                </motion.div>

                {/* Points Display */}
                <div className="hidden sm:flex items-center space-x-1 bg-[#E1B168] text-[#2D5A4A] px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  <span className="text-sm font-medium">{user.points || 0}</span>
                  <span className="text-xs">pts</span>
                </div>

                {/* Cart */}
                <div className="relative">
                  <AnimatedButton 
                    variant="ghost"
                    size="sm"
                    className="hidden sm:flex text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#1a3d2e] relative cart-button"
                    onClick={toggleCart}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isMounted && cartItemCount > 0 && (
                      <Badge 
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full"
                      >
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </Badge>
                    )}
                  </AnimatedButton>
                </div>
              </>
            )}

            {/* Notifications (for all users) */}
            <div className="relative">
              <AnimatedButton 
                variant="ghost"
                size="sm"
                className="hidden sm:flex text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#1a3d2e] relative"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full"
                  >
                    {notifications > 9 ? '9+' : notifications}
                  </Badge>
                )}
              </AnimatedButton>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="profile-button flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a3d2e] transition-colors"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage 
                    src={user.avatar || (user.sex === 'female' ? '/placeholder/user/Female.png' : '/placeholder/user/Male.png')} 
                  />
                  <AvatarFallback className="bg-[#E1B168] text-[#2D5A4A] font-semibold">
                    {user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{formatUserRole(user.role)}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400 hidden lg:block" />
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="profile-menu absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                  >
                    {/* Profile Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage 
                            src={user.avatar || (user.sex === 'female' ? '/placeholder/user/Female.png' : '/placeholder/user/Male.png')} 
                          />
                          <AvatarFallback className="bg-[#E1B168] text-[#2D5A4A] font-semibold">
                            {user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{formatUserRole(user.role)}</p>
                          {isClient && (
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">{user.points || 0} points</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {/* Common items for all users */}
                      <Link 
                        href={isAdmin ? "/admin/profile" : "/dashboard/profile"} 
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      
                      {/* Client-only items */}
                      {isClient && (
                        <>
                          <Link 
                            href="/dashboard/orders" 
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Order History</span>
                          </Link>
                          <Link 
                            href="/dashboard/favorites" 
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            <span>Favorites</span>
                          </Link>
                          <Link 
                            href="/dashboard/addresses" 
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <MapPin className="w-4 h-4" />
                            <span>Addresses</span>
                          </Link>
                          <Link 
                            href="/dashboard/payment" 
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>Payment Methods</span>
                          </Link>
                        </>
                      )}

                      {/* Admin-only items */}
                      {isAdmin && (
                        <>
                          <button 
                            onClick={() => {
                              setIsCreateReportModalOpen(true);
                              toggleProfileMenu();
                            }}
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Reports</span>
                          </button>
                          <Link 
                            href="/admin/help" 
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <HelpCircle className="w-4 h-4" />
                            <span>Help</span>
                          </Link>
                          <button 
                            onClick={() => {
                              setIsCreateRequestModalOpen(true);
                              toggleProfileMenu();
                            }}
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Requests</span>
                          </button>
                          <Link 
                            href="/admin/manual" 
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>Manual</span>
                          </Link>
                        </>
                      )}

                      {/* Settings for all users */}
                      <Link 
                        href={isAdmin ? "/admin/settings" : "/dashboard/settings"} 
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                      <Link 
                        href="/authentication" 
                        className="flex items-center space-x-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />

            {/* Mobile menu button */}
            <motion.button 
              onClick={toggleMobileMenu}
              className="mobile-menu-button lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#1a3d2e] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:focus:ring-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#A8D5D3] dark:bg-[#1a3d2e] mobile-menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/dashboard"
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/menu"
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                >
                  Menu
                </Link>
                <Link
                  href="/order"
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                >
                  Order
                </Link>
                
                {/* More Section */}
                <div className="px-3 py-2">
                  <div className="text-[#E1B168] font-medium mb-2">More</div>
                  <div className="pl-4 space-y-1">
                    <Link
                      href="/about"
                      className="block py-2 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/mood-board"
                      className="block py-2 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
                    >
                      Mood Board
                    </Link>
                    <Link
                      href="/roadmap"
                      className="block py-2 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
                    >
                      Roadmap
                    </Link>
                    <Link
                      href="/contact"
                      className="block py-2 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
                    >
                      Contact
                    </Link>
                    <Link
                      href="/careers"
                      className="block py-2 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
                    >
                      Careers
                    </Link>
                  </div>
                </div>
                
                {/* Mobile User Section */}
                <div className="border-t border-gray-300 dark:border-gray-600 pt-4 mt-4">
                  <div className="flex items-center px-3 py-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage 
                        src={user.avatar || (user.sex === 'female' ? '/placeholder/user/Female.png' : '/placeholder/user/Male.png')} 
                      />
                      <AvatarFallback className="bg-[#E1B168] text-[#2D5A4A] font-semibold">
                        {user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800 dark:text-white">{user.name}</div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">{formatUserRole(user.role)}</div>
                      {isClient && (
                        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span>{user.points || 0} points</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    {/* Common items for all users */}
                    <Link
                      href="/dashboard/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                    >
                      My Profile
                    </Link>

                    {/* Client-only items */}
                    {isClient && (
                      <>
                        <Link
                          href="/dashboard/orders"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                        >
                          Order History
                        </Link>
                        <Link
                          href="/dashboard/favorites"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                        >
                          Favorites
                        </Link>
                        <Link
                          href="/dashboard/addresses"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                        >
                          Addresses
                        </Link>
                        <Link
                          href="/dashboard/payment"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                        >
                          Payment Methods
                        </Link>
                      </>
                    )}

                    {/* Admin-only items */}
                    {isAdmin && (
                      <>
                        <Link
                          href="/admin/reports"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                        >
                          Reports
                        </Link>
                        <Link
                          href="/admin/help"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                        >
                          Help
                        </Link>
                        <Link
                          href="/admin/requests"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                        >
                          Requests
                        </Link>
                        <Link
                          href="/admin/manual"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                        >
                          Manual
                        </Link>
                      </>
                    )}

                    {/* Settings and Sign out for all users */}
                    <Link
                      href="/dashboard/settings"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#2a5d4e] transition-colors"
                    >
                      Settings
                    </Link>
                    <Link
                      href="/authentication"
                      className="block px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <CreateReportModal
        isOpen={isCreateReportModalOpen}
        onClose={() => setIsCreateReportModalOpen(false)}
        onSubmit={() => {
          // Handle report creation
          setIsCreateReportModalOpen(false);
        }}
      />
      
      <CreateRequestModal
        isOpen={isCreateRequestModalOpen}
        onClose={() => setIsCreateRequestModalOpen(false)}
        onSubmit={() => {
          // Handle request creation
          setIsCreateRequestModalOpen(false);
        }}
      />
    </header>
  );
}
