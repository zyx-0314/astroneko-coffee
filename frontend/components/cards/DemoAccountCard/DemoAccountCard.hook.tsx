import { useCallback } from 'react';

export const useDemoAccountCard = (onDemoLogin: (email: string) => void) => {
  const handleDemoLogin = useCallback((email: string) => {
    // Add visual feedback or additional logic here if needed
    onDemoLogin(email);
  }, [onDemoLogin]);

  return {
    handleDemoLogin
  };
};
