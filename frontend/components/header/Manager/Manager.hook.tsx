import { useState, useEffect } from 'react';

export const useManagerHeaderState = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [criticalAlerts, setCriticalAlerts] = useState(0);

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
    // Simulate fetching manager metrics
    setTotalRevenue(8750);
    setActiveEmployees(12);
    setLowStockItems(4);
    setCriticalAlerts(2);
  }, []);

  return {
    isMobileMenuOpen,
    totalRevenue,
    activeEmployees,
    lowStockItems,
    criticalAlerts,
    toggleMobileMenu,
    closeMobileMenu
  };
};
