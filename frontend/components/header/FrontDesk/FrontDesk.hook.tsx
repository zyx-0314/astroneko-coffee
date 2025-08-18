import { useState, useEffect } from 'react';

export const useFrontDeskHeaderState = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [queueLength, setQueueLength] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [totalSalesToday, setTotalSalesToday] = useState(0);

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
    // Simulate fetching front desk metrics
    setQueueLength(5);
    setPendingRequests(3);
    setTotalSalesToday(1250);
  }, []);

  return {
    isMobileMenuOpen,
    queueLength,
    pendingRequests,
    totalSalesToday,
    toggleMobileMenu,
    closeMobileMenu
  };
};
