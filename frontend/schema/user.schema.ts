import { z } from "zod";

// User interface for all user types (staff and clients)
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'cashier' | 'helper' | 'cook' | 'barista' | 'manager' | 'owner' | 'client';
  avatar?: string;
  shift?: {
    start: string; // HH:mm format
    clockInTime?: string; // HH:mm format
  };
  points?: number; // For clients
  isActive?: boolean; // For kitchen staff
  sex?: 'male' | 'female' | 'other';
}

// User role type for type safety
export type UserRole = User['role'];

// Staff roles specifically
export type StaffRole = Exclude<UserRole, 'client'>;

// Client role specifically  
export type ClientRole = Extract<UserRole, 'client'>;

// User shift interface
export interface UserShift {
  start: string; // HH:mm format
  clockInTime?: string; // HH:mm format
}

// Zod schema for user validation
export const UserValidationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  role: z.enum(['cashier', 'helper', 'cook', 'barista', 'manager', 'owner', 'client']),
  avatar: z.string().url().optional(),
  shift: z.object({
    start: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)"),
    clockInTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)").optional()
  }).optional(),
  points: z.number().min(0).optional(),
  isActive: z.boolean().optional()
});

// Type inference from Zod schema
export type UserFormData = z.infer<typeof UserValidationSchema>;

// Create user request (without ID)
export interface CreateUserRequest extends Omit<User, 'id'> {}

// Update user request
export interface UpdateUserRequest extends Partial<Omit<User, 'id'>> {}
