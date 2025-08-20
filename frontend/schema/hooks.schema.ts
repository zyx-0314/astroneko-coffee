import { z } from 'zod';
import { UserRole } from './user.schema';

// Role Guard interfaces
export interface UseRoleGuardProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export interface RoleGuardProps extends UseRoleGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Staff Statistics interface
export interface StaffStats {
  totalStaff: number;
  activeToday: number;
  onBreak: number;
  offDuty: number;
}

// Staff Form interfaces (for components)
export interface StaffFormHookData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  shift: string;
  notes: string;
}

export interface StaffFormHookErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  shift?: string;
}

// Hook validation schemas
export const UseRoleGuardValidationSchema = z.object({
  allowedRoles: z.array(z.string()),
  redirectTo: z.string().optional(),
});

export const StaffStatsValidationSchema = z.object({
  totalStaff: z.number().min(0, 'Total staff cannot be negative'),
  activeToday: z.number().min(0, 'Active today cannot be negative'),
  onBreak: z.number().min(0, 'On break cannot be negative'),
  offDuty: z.number().min(0, 'Off duty cannot be negative'),
});

export const StaffFormHookDataValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.string().min(1, 'Role is required'),
  shift: z.string().min(1, 'Shift is required'),
  notes: z.string().optional().default(''),
});

// Type exports for form data
export type UseRoleGuardFormData = z.infer<typeof UseRoleGuardValidationSchema>;
export type StaffStatsFormData = z.infer<typeof StaffStatsValidationSchema>;
export type StaffFormHookFormData = z.infer<typeof StaffFormHookDataValidationSchema>;

// Helper functions for guards and hooks
export const calculateStaffUtilization = (stats: StaffStats): number => {
  if (stats.totalStaff === 0) return 0;
  return (stats.activeToday / stats.totalStaff) * 100;
};

export const getStaffStatusColor = (status: 'active' | 'break' | 'off'): string => {
  const colors = {
    active: 'green',
    break: 'yellow',
    off: 'gray',
  };
  return colors[status];
};

export const isRoleAuthorized = (userRole: UserRole, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(userRole);
};
