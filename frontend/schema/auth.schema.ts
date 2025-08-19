import { z } from "zod";

// Authentication API types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  sex?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  userId: number;
  email: string;
  name: string;
  role: string;
}

// Context types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

// Validation schemas
export const LoginRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const SignUpRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  sex: z.enum(['male', 'female', 'other']).optional()
});

// Type inference from Zod schemas
export type LoginFormData = z.infer<typeof LoginRequestSchema>;
export type SignUpFormData = z.infer<typeof SignUpRequestSchema>;

// Import User type from user schema
import type { User } from './user.schema';
