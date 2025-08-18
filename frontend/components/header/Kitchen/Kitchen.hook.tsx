import { useState, useEffect } from 'react';

export const useKitchenHeaderState = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeOrders, setActiveOrders] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    // Close menu when clicking outside
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

  // Mock data for demonstration - replace with real data fetching
  useEffect(() => {
    // Simulate fetching kitchen metrics
    setActiveOrders(8);
    setCompletedToday(24);
  }, []);

  return {
    isMobileMenuOpen,
    activeOrders,
    completedToday,
    toggleMobileMenu,
    closeMobileMenu
  };
};
