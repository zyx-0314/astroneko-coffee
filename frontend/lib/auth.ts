import { User, AuthState } from '@/schema/user.schema';
import apiClient from './api/client';
import axios from 'axios';

// Role to route mapping
export const roleRouteMap: Record<User['role'], string> = {
  cashier: '/admin/front-desk/dashboard',
  helper: '/admin/front-desk/dashboard',
  cook: '/admin/kitchen/dashboard',
  barista: '/admin/kitchen/dashboard',
  manager: '/admin/managers/dashboard',
  owner: '/admin/managers/dashboard',
  client: '/dashboard'
};

// Staff roles that can access admin dashboards
export const staffRoles: User['role'][] = ['cashier', 'helper', 'cook', 'barista', 'manager', 'owner'];

// Kitchen roles
export const kitchenRoles: User['role'][] = ['cook', 'barista'];

// Front desk roles
export const frontDeskRoles: User['role'][] = ['cashier', 'helper'];

// Manager roles
export const managerRoles: User['role'][] = ['manager', 'owner'];

export function getRouteForRole(role: User['role']): string {
  return roleRouteMap[role] || '/auth/forbidden';
}

export function canAccessRoute(userRole: User['role'], route: string): boolean {
  const allowedRoute = getRouteForRole(userRole);
  return route === allowedRoute;
}

export function isStaffRole(role: User['role']): boolean {
  return staffRoles.includes(role);
}

export function canAccessFrontDesk(role: User['role']): boolean {
  return frontDeskRoles.includes(role);
}

export function canAccessKitchen(role: User['role']): boolean {
  return kitchenRoles.includes(role);
}

export function canAccessManagement(role: User['role']): boolean {
  return managerRoles.includes(role);
}

// Backend API configuration
const API_BASE_URL = 'http://localhost:8083/api/v1/expose/auth';

// Import authentication types from schema
import type { LoginRequest, SignUpRequest, AuthResponse } from '@/schema/auth.schema';
import { tokenManager } from './auth-cookies';

// Store JWT token using secure token manager
export function saveAuthToken(token: string): void {
  tokenManager.setToken(token);
}

// Get JWT token using secure token manager
export function getAuthToken(): string | null {
  return tokenManager.getToken();
}

// Remove JWT token using secure token manager  
export function removeAuthToken(): void {
  tokenManager.removeToken();
}// Fetch user profile from backend using JWT token
export async function fetchUserProfile(token?: string): Promise<User | null> {
  const authToken = token || getAuthToken();
  if (!authToken) return null;

  try {
    const response = await axios.get('http://localhost:8083/api/v1/secure/user/profile', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    const userData = response.data;
    
    // Convert backend response to frontend User type
    const user: User = {
      id: userData.id.toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role.toLowerCase() as User['role'],
      points: userData.points || 0,
      sex: userData.sex ? userData.sex.toLowerCase() : undefined,
      isActive: userData.isActive !== false,
      avatar: userData.avatar
    };

    return user;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Token expired or invalid
      removeAuthToken();
    }
    return null;
  }
}

// Real authentication functions that connect to backend
export async function signIn(email: string, password: string): Promise<User | null> {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, 
      { email, password } as LoginRequest
    );

    const authResponse: AuthResponse = response.data;
    
    // Save the JWT token
    saveAuthToken(authResponse.token);
    
    // Fetch complete user data after successful login
    const completeUser = await fetchUserProfile(authResponse.token);
    if (completeUser) {
      return completeUser;
    }

    // Fallback: Convert basic auth response to frontend User type
    const user: User = {
      id: authResponse.userId.toString(),
      name: authResponse.name,
      email: authResponse.email,
      role: authResponse.role as User['role'],
      points: 0,
      isActive: true
    };

    return user;
  } catch (error) {
    console.error('Sign In Error:', error);
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function signUp(firstName: string, lastName: string, email: string, phoneNumber: string, password: string, sex?: string): Promise<User | null> {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      firstName, 
      lastName,
      email, 
      phoneNumber,
      password, 
      sex: sex || 'OTHER' 
    } as SignUpRequest);

    const authResponse: AuthResponse = response.data;
    
    // Save the JWT token
    saveAuthToken(authResponse.token);
    
    // Fetch complete user data after successful signup
    const completeUser = await fetchUserProfile(authResponse.token);
    if (completeUser) {
      return completeUser;
    }

    // Fallback: Convert basic auth response to frontend User type
    const user: User = {
      id: authResponse.userId.toString(),
      name: authResponse.name,
      email: authResponse.email,
      role: authResponse.role as User['role'],
      points: 0,
      isActive: true
    };

    return user;
  } catch (error) {
    console.error('Sign Up Error:', error);
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

// Sign out function
export function signOut(): void {
  removeAuthToken();
  // Redirect to authentication page
  if (typeof window !== 'undefined') {
    window.location.href = '/authentication';
  }
}

// Legacy mock functions for backward compatibility
export function mockSignIn(email: string, password: string): Promise<User | null> {
  return signIn(email, password);
}

export function mockSignUp(firstName: string, lastName: string, email: string, phoneNumber: string, password: string): Promise<User | null> {
  return signUp(firstName, lastName, email, phoneNumber, password);
}

export function calculateWorkDuration(clockInTime: string): string {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  const [clockInHours, clockInMinutes] = clockInTime.split(':').map(Number);
  const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  
  const clockInTotalMinutes = clockInHours * 60 + clockInMinutes;
  const currentTotalMinutes = currentHours * 60 + currentMinutes;
  
  let diffMinutes = currentTotalMinutes - clockInTotalMinutes;
  
  // Handle negative case (next day)
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }
  
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  
  return `${hours}h ${minutes}m`;
}
