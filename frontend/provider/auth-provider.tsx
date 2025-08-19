"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/schema';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

async function fetchCurrentUser(): Promise<User | null> {
  try {
    const { tokenManager } = await import('@/lib/auth-cookies');
    const token = tokenManager.getToken();
    if (!token) return null;

    const response = await fetch('http://localhost:8083/api/v1/secure/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid, remove it
        const { tokenManager } = await import('@/lib/auth-cookies');
        tokenManager.removeToken();
        throw new Error('401: Unauthorized');
      }
      throw new Error(`Failed to fetch user profile: ${response.status}`);
    }

    const userData = await response.json();
    
    // Convert backend user to frontend User type
    const user: User = {
      id: userData.id.toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role.toLowerCase() as any, // Convert CLIENT to client, etc.
      points: userData.points || 0,
      sex: userData.sex,
      avatar: userData.avatar,
      isActive: userData.isActive || true,
    };

    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const refreshUser = async () => {
    if (!isInitialized) setIsLoading(true);
    
    try {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error refreshing user:', error);
      // Only clear user if it's an authentication error, not network error
      if (error instanceof Error && error.message.includes('401')) {
        setUser(null);
      }
      // For network errors, keep existing user state
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  const logout = async () => {
    try {
      const { tokenManager } = await import('@/lib/auth-cookies');
      tokenManager.removeToken();
      setUser(null);
      
      // Redirect to authentication page
      if (typeof window !== 'undefined') {
        window.location.href = '/authentication';
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Initialize auth state on mount
  useEffect(() => {
    refreshUser();
  }, []);

  // Periodically refresh user data to keep session alive
  useEffect(() => {
    if (!user || !isInitialized) return;

    const interval = setInterval(() => {
      refreshUser();
    }, 10 * 60 * 1000); // Refresh every 10 minutes

    return () => clearInterval(interval);
  }, [user, isInitialized]);

  const value: AuthContextType = {
    user,
    setUser,
    refreshUser,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
