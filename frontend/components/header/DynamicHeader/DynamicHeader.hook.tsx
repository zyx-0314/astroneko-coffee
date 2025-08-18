import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useDynamicHeaderState = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Define routes that should use the ClientHeader (authenticated routes)
  const clientRoutes = ['/dashboard', '/order', '/profile', '/settings'];
  
  // Check if current route requires client header
  const isClientRoute = clientRoutes.some(route => pathname.startsWith(route));
  
  // For demo purposes, we'll assume user is authenticated if on client routes
  // In a real app, you'd check authentication state from context/session
  const isAuthenticated = isClientRoute;

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
