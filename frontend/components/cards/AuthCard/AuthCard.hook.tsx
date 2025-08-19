// AuthCard.hook.tsx
import { useState } from 'react';

export interface AuthCardState {
  isLoading: boolean;
  error: string;
  showPassword: boolean;
}

export const useAuthCard = () => {
  const [state, setState] = useState<AuthCardState>({
    isLoading: false,
    error: '',
    showPassword: false
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const setError = (error: string) => {
    setState(prev => ({ ...prev, error }));
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: '' }));
  };

  const togglePasswordVisibility = () => {
    setState(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const resetState = () => {
    setState({
      isLoading: false,
      error: '',
      showPassword: false
    });
  };

  return {
    ...state,
    setLoading,
    setError,
    clearError,
    togglePasswordVisibility,
    resetState
  };
};
