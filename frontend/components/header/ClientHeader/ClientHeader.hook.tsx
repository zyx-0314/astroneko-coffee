import { useState, useEffect } from 'react';

export const useClientHeaderState = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  // Close mobile menu and cart on route change
  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        closeMobileMenu();
      }
      if (!target.closest('.cart-menu') && !target.closest('.cart-button')) {
        closeCart();
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
  }, []);

  return {
    isMobileMenuOpen,
    isCartOpen,
    isMounted,
    toggleMobileMenu,
    closeMobileMenu,
    toggleCart,
    closeCart
  };
};
