import { useState, useEffect } from 'react';

export const useAdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed
  
  useEffect(() => {
    // Check if we're on desktop and show sidebar by default
    const checkScreenSize = () => {
      if (typeof window !== 'undefined') {
        const isDesktop = window.innerWidth >= 768; // md breakpoint
        setIsCollapsed(!isDesktop); // Show on desktop, hide on mobile
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeSidebar = () => {
    setIsCollapsed(true);
  };

  return {
    isCollapsed,
    toggleSidebar,
    closeSidebar
  };
};
