import { User, UserRole, AuthState } from '@/schema/user.schema';

// Role to route mapping
export const roleRouteMap: Record<UserRole, string> = {
  cashier: '/admin/dashboard/front-desk',
  helper: '/admin/dashboard/front-desk',
  cook: '/admin/dashboard/kitchen',
  barista: '/admin/dashboard/kitchen',
  manager: '/admin/dashboard/managers',
  owner: '/admin/dashboard/managers',
  client: '/dashboard'
};

// Staff roles that can access admin dashboards
export const staffRoles: UserRole[] = ['cashier', 'helper', 'cook', 'barista', 'manager', 'owner'];

// Kitchen roles
export const kitchenRoles: UserRole[] = ['cook', 'barista'];

// Front desk roles
export const frontDeskRoles: UserRole[] = ['cashier', 'helper'];

// Manager roles
export const managerRoles: UserRole[] = ['manager', 'owner'];

export function getRouteForRole(role: UserRole): string {
  return roleRouteMap[role] || '/auth/forbidden';
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const allowedRoute = getRouteForRole(userRole);
  return route === allowedRoute;
}

export function isStaffRole(role: UserRole): boolean {
  return staffRoles.includes(role);
}

export function canAccessFrontDesk(role: UserRole): boolean {
  return frontDeskRoles.includes(role);
}

export function canAccessKitchen(role: UserRole): boolean {
  return kitchenRoles.includes(role);
}

export function canAccessManagement(role: UserRole): boolean {
  return managerRoles.includes(role);
}

// Backend API configuration
const API_BASE_URL = 'http://localhost:8083/api/v1/expose/auth';

// Authentication API types
interface LoginRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  sex?: string;
}

interface AuthResponse {
  token: string;
  type: string;
  userId: number;
  email: string;
  name: string;
  role: string;
}

// Store JWT token in localStorage
export function saveAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

// Get JWT token from localStorage
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

// Remove JWT token from localStorage
export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

// Fetch user profile from backend using JWT token
export async function fetchUserProfile(token?: string): Promise<User | null> {
  const authToken = token || getAuthToken();
  if (!authToken) return null;

  try {
    const response = await fetch('http://localhost:8083/api/v1/secure/user/profile', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        removeAuthToken();
      }
      return null;
    }

    const userData = await response.json();
    
    // Convert backend response to frontend User type
    const user: User = {
      id: userData.id.toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role.toLowerCase() as UserRole,
      points: userData.points || 0,
      sex: userData.sex ? userData.sex.toLowerCase() : undefined,
      isActive: userData.isActive !== false,
      avatar: userData.avatar
    };

    return user;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
}

// Real authentication functions that connect to backend
export async function signIn(email: string, password: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password } as LoginRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const authResponse: AuthResponse = await response.json();
    
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
      role: authResponse.role as UserRole,
      points: 0,
      isActive: true
    };

    return user;
  } catch (error) {
    console.error('Sign In Error:', error);
    throw error;
  }
}

export async function signUp(name: string, email: string, password: string, sex?: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name, 
        email, 
        password, 
        sex: sex || 'OTHER' 
      } as SignUpRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Sign up failed');
    }

    const authResponse: AuthResponse = await response.json();
    
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
      role: authResponse.role as UserRole,
      points: 0,
      isActive: true
    };

    return user;
  } catch (error) {
    console.error('Sign Up Error:', error);
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

export function mockSignUp(name: string, email: string, password: string): Promise<User | null> {
  return signUp(name, email, password);
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
