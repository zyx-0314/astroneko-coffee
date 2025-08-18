'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, LogOut, Gift, Menu, X } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User } from '@/schema/user.schema';
import { useClientHeaderState } from './ClientHeader.hook';

export interface ClientHeaderProps {
  user: User;
  className?: string;
  cartItemCount?: number;
}

export default function ClientHeader({ user, className = '', cartItemCount = 0 }: ClientHeaderProps) {
  const { isMobileMenuOpen, isCartOpen, isMounted, toggleMobileMenu } = useClientHeaderState();

  // First promo data (Neekogust - Milky Way)
  const firstPromo = {
    name: 'Milky Way',
    discount: '11% OFF',
    code: 'NEEKOGUST',
    originalPrice: 4.50,
    salePrice: 3.99
  };

  return (
    <header className={`bg-[#D4EDEC] dark:bg-[#2CA6A4] text-gray-800 dark:text-white shadow-md sticky top-0 z-50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-3">
              {/* Light mode logo */}
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
              {/* Dark mode logo */}
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
            <div>
              <Link 
                href="/dashboard" 
                className="text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200 font-medium relative group"
              >
                Dashboard
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E1B168] group-hover:w-full transition-all duration-300"
                  layoutId="underline"
                />
              </Link>
            </div>
            <div>
              <Link 
                href="/menu" 
                className="text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200 font-medium relative group"
              >
                Menu
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E1B168] group-hover:w-full transition-all duration-300"
                  layoutId="underline"
                />
              </Link>
            </div>
            <div>
              <Link 
                href="/order" 
                className="text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200 font-medium relative group"
              >
                Order
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E1B168] group-hover:w-full transition-all duration-300"
                  layoutId="underline"
                />
              </Link>
            </div>
          </nav>

          {/* Right side - Promo CTA, Cart, User Info, Theme Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Promo Call to Action */}
            <motion.div 
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded-full text-xs font-semibold"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Gift className="w-4 h-4" />
              <Link href="/menu" className="hover:underline">
                {firstPromo.discount} {firstPromo.name} - Use {firstPromo.code}
              </Link>
            </motion.div>

            {/* Points Display */}
            <div className="hidden sm:flex items-center space-x-1 bg-[#E1B168] text-[#2D5A4A] px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
              <span className="text-sm font-medium">{user.points || 0}</span>
              <span className="text-xs hidden md:inline">pts</span>
            </div>

            {/* User Avatar and Name */}
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage 
                  src={user.avatar || (user.sex === 'female' ? '/placeholder/user/Female.png' : '/placeholder/user/Male.png')} 
                />
                <AvatarFallback>
                  {user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Member</p>
              </div>
            </div>

            <ThemeToggle />
            
            {/* Cart */}
              <AnimatedButton 
                variant="ghost"
                size="sm"
                className="hidden sm:flex text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#1a3d2e] p-4"
              >
              <ShoppingCart className="w-5 h-5" />
              {isMounted && (
                <Badge 
                  className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full ${
                    cartItemCount > 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </Badge>
              )}
            </AnimatedButton>

            {/* Logout */}
            <Link href="/authentication">
              <AnimatedButton 
                variant="ghost"
                size="sm"
                className="hidden sm:flex text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#1a3d2e] p-4"
              >
                <LogOut className="" />
              </AnimatedButton>
            </Link>

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

        {/* Mobile Navigation */}
        <motion.div 
          className="mobile-menu lg:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0, 
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-[#1a3d2e] border-t border-gray-200 dark:border-gray-600">
            <Link 
              href="/dashboard" 
              className="block px-3 py-2 rounded-md text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/menu" 
              className="block px-3 py-2 rounded-md text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
            >
              Menu
            </Link>
            <Link 
              href="/order" 
              className="block px-3 py-2 rounded-md text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
            >
              Order
            </Link>
            
            {/* Mobile Promo CTA */}
            <div className="px-3 py-2">
              <Link 
                href="/menu"
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded-full text-sm font-semibold w-full justify-center"
              >
                <Gift className="w-4 h-4" />
                <span>{firstPromo.discount} {firstPromo.name} - Use {firstPromo.code}</span>
              </Link>
            </div>

            {/* Mobile Points Display */}
            <div className="px-3 py-2 sm:hidden">
              <div className="flex items-center space-x-2 bg-[#E1B168] text-[#2D5A4A] px-3 py-2 rounded-full w-fit">
                <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                <span className="text-sm font-medium">{user.points || 0} points</span>
              </div>
            </div>
            
            {/* Mobile Logout */}
            <div className="px-3 py-2 sm:hidden">
              <Link href="/authentication">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Cart Dropdown */}
        {isMounted && (
          <motion.div 
            className="cart-menu absolute right-4 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-600"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ 
              opacity: isCartOpen ? 1 : 0,
              y: isCartOpen ? 0 : -10,
              scale: isCartOpen ? 1 : 0.95,
              display: isCartOpen ? 'block' : 'none'
            }}
            transition={{ duration: 0.2 }}
          >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Shopping Cart</h3>
            
            <div className={cartItemCount === 0 ? "text-center py-8" : "hidden"}>
              <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
              <Link href="/menu">
                <Button className="mt-4 bg-[#E1B168] hover:bg-[#d4a455] text-[#2D5A4A]">
                  Browse Menu
                </Button>
              </Link>
            </div>
            <div className={cartItemCount > 0 ? "block" : "hidden"}>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {cartItemCount} item{cartItemCount !== 1 ? 's' : ''} in cart
              </p>
              <Link href="/order">
                <Button className="w-full bg-[#E1B168] hover:bg-[#d4a455] text-[#2D5A4A]">
                  View Cart & Checkout
                </Button>
              </Link>
            </div>
          </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
