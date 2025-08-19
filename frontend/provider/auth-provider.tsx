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
    const token = localStorage.getItem('authToken');
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
        localStorage.removeItem('authToken');
        return null;
      }
      throw new Error('Failed to fetch user profile');
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

  const refreshUser = async () => {
    setIsLoading(true);
    const currentUser = await fetchCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

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
