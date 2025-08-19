'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/schema/user.schema';
import { AuthContextType, AuthProviderProps } from '@/schema/auth.schema';
import { getAuthToken, removeAuthToken } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Function to fetch current user from backend using JWT token
  const fetchCurrentUser = async (): Promise<User | null> => {
    const token = getAuthToken();
    if (!token) return null;

    try {
      const response = await fetch('http://localhost:8083/api/v1/secure/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Token might be expired or invalid
        removeAuthToken();
        return null;
      }

      const userData = await response.json();
      
      // Convert backend response to frontend User type
      const user: User = {
        id: userData.id.toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role.toLowerCase(),
        points: userData.points || 0,
        sex: userData.sex ? userData.sex.toLowerCase() : undefined,
        isActive: userData.isActive !== false,
        avatar: userData.avatar
      };

      return user;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      removeAuthToken();
      return null;
    }
  };

  // Function to refresh user data
  const refreshUser = async () => {
    setIsLoading(true);
    const userData = await fetchCurrentUser();
    setUser(userData);
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    removeAuthToken();
    setUser(null);
    window.location.href = '/authentication';
  };

  // Check for existing token on mount
  useEffect(() => {
    refreshUser();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
