import { User } from './data/users';

export type UserRole = 'cashier' | 'helper' | 'cook' | 'barista' | 'manager' | 'owner' | 'client';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

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

// Mock authentication functions (no real backend calls)
export function mockSignIn(email: string, password: string): Promise<User | null> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // In a real app, this would validate credentials
      // For demo, we'll find user by email
      const users = [
        {
          id: '1',
          name: 'Alex Johnson',
          email: 'alex.johnson@astroneko.com',
          role: 'cashier' as const,
          avatar: '/placeholder/avatars/alex.jpg',
          shift: { start: '08:00', clockInTime: '07:55' }
        },
        {
          id: '7',
          name: 'John Smith',
          email: 'john.smith@example.com',
          role: 'client' as const,
          avatar: '/placeholder/avatars/john.jpg',
          points: 1250
        }
      ];
      
      const user = users.find(u => u.email === email);
      resolve(user || null);
    }, 1000);
  });
}

export function mockSignUp(name: string, email: string, password: string): Promise<User | null> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // For demo, create a new client user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'client',
        points: 0
      };
      resolve(newUser);
    }, 1000);
  });
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
