'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { HeaderProps } from '@/schema/header.schema';
import { useHeaderState } from './Default.hook';

export default function DefaultHeader({ className = '' }: HeaderProps) {
  const { isMobileMenuOpen, toggleMobileMenu } = useHeaderState();
  return (
    <header className={`bg-[#D4EDEC] dark:bg-[#1a3d2e] text-gray-800 dark:text-white shadow-md ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-xl font-bold">
                <span className="text-[#E1B168]">☕</span>
                <span className="ml-2">Astroneko Coffee</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              href="/menu" 
              className="text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200 font-medium"
            >
              Menu
            </Link>
            <Link 
              href="/mood-board" 
              className="text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200 font-medium"
            >
              Design
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

          {/* Right side - Order Button and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <Button 
              asChild
              className="bg-[#E1B168] hover:bg-[#d4a455] text-[#2D5A4A] font-semibold px-6 py-2 rounded-md transition-colors duration-200"
            >
              <Link href="/order">
                Order
              </Link>
            </Button>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="mobile-menu-button md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:text-[#E1B168] hover:bg-gray-100 dark:hover:bg-[#1a3d2e] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-[#0f2a1f]">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="block px-3 py-2 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
            >
              Menu
            </Link>
            <Link
              href="/mood-board"
              className="block px-3 py-2 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
            >
              Design
            </Link>
            <div className="px-3 py-2">
              <div className="text-[#E1B168] font-medium mb-2">More</div>
              <div className="pl-4 space-y-1">
                <Link
                  href="/about"
                  className="block py-1 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block py-1 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
                >
                  Contact
                </Link>
                <Link
                  href="/careers"
                  className="block py-1 text-gray-800 dark:text-white hover:text-[#E1B168] transition-colors duration-200"
                >
                  Careers
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
