import { useState } from 'react';

export const useAdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed on mobile

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
