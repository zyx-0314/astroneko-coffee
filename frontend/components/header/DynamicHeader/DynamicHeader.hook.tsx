import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/provider/auth-provider';

export const useDynamicHeaderState = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Define routes that should use the AuthenticatedHeader (authenticated routes)
  const authenticatedRoutes = ['/dashboard', '/admin/dashboard', '/order', '/profile', '/settings'];
  
  // Check if current route requires authenticated header
  const isClientRoute = authenticatedRoutes.some(route => pathname.startsWith(route));
  
  // Check if user is actually authenticated
  const isAuthenticated = !!user;

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        closeMobileMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    isClientRoute,
    isAuthenticated,
    pathname
  };
};
