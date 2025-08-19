import { useState, useEffect } from 'react';

export const useAuthenticatedHeaderState = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        closeMobileMenu();
      }
      
      if (!target.closest('.cart-menu') && !target.closest('.cart-button')) {
        closeCart();
      }
      
      if (!target.closest('.profile-menu') && !target.closest('.profile-button')) {
        closeProfileMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Track mounting state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
    // Mock notification count - replace with real data
    setNotifications(3);
  }, []);

  return {
    isMobileMenuOpen,
    isCartOpen,
    isProfileMenuOpen,
    isMounted,
    notifications,
    toggleMobileMenu,
    toggleCart,
    toggleProfileMenu,
    closeMobileMenu,
    closeCart,
    closeProfileMenu
  };
};
