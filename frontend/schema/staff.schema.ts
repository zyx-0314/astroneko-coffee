import { z } from "zod";

// Enums for type safety
export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERN = 'INTERN'
}

export enum UserRole {
  CLIENT = 'CLIENT',
  CASHIER = 'CASHIER',  
  HELPER = 'HELPER',
  COOK = 'COOK',
  BARISTA = 'BARISTA',
  MANAGER = 'MANAGER',
  OWNER = 'OWNER'
}

export enum UserSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

// Staff interface (complete staff information)
export interface Staff {
  // Employee Information
  id: number;
  userId: number;
  employeeId: string;
  hireDate: string; // ISO date string
  employmentType: EmploymentType;
  salary?: number;
  hourlyRate?: number;
  emergencyContactName: string;
  emergencyContactPhone: string;
  address: string;
  phone: string;
  birthDate: string; // ISO date string
  socialSecurityNumber: string; // Masked in response
  bankAccountNumber: string; // Masked in response
  bankRoutingNumber: string; // Masked in response
  performanceRating?: number;
  lastPerformanceReview?: string; // ISO date string
  nextPerformanceReview?: string; // ISO date string
  notes?: string;
  position: string;
  department: string;
  shiftStart: string; // HH:mm format
  shiftEnd: string; // HH:mm format
  sickDaysTotal: number;
  sickDaysUsed: number;
  vacationDaysTotal: number;
  vacationDaysUsed: number;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  // User Information
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  sex: UserSex;
  avatar?: string;
  points: number;
  isUserActive: boolean;
}

// Staff summary for list views
export interface StaffSummary {
  id: number;
  employeeId: string;
  name: string; // firstName + lastName
  email: string;
  role: UserRole;
  status: 'active' | 'break' | 'offline';
  shift: string; // formatted shift time
  phone: string;
  lastActive: string;
  avatar?: string;
  department: string;
  position: string;
  isActive: boolean;
  sex: UserSex;
}

// Create staff request
export interface CreateStaffRequest {
  // User information
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  sex?: UserSex;
  avatar?: string;

  // Employee information
  employeeId: string;
  hireDate: string; // ISO date string
  employmentType: EmploymentType;
  salary?: number;
  hourlyRate?: number;
  emergencyContactName: string;
  emergencyContactPhone: string;
  address: string;
  phone: string;
  birthDate: string; // ISO date string
  socialSecurityNumber: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  performanceRating?: number;
  lastPerformanceReview?: string; // ISO date string
  nextPerformanceReview?: string; // ISO date string
  notes?: string;
  position: string;
  department: string;
  shiftStart: string; // HH:mm format
  shiftEnd: string; // HH:mm format
  sickDaysTotal?: number;
  vacationDaysTotal?: number;
}

// Update staff request (all fields optional)
export interface UpdateStaffRequest extends Partial<Omit<CreateStaffRequest, 'password'>> {
  sickDaysUsed?: number;
  vacationDaysUsed?: number;
  isActive?: boolean;
}

// Validation schemas
export const CreateStaffSchema = z.object({
  // User information
  firstName: z.string().min(1, "First name is required").max(50, "First name must not exceed 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must not exceed 50 characters"),
  username: z.string().min(1, "Username is required").max(50, "Username must not exceed 50 characters"),
  email: z.string().email("Invalid email format").max(100, "Email must not exceed 100 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.nativeEnum(UserRole),
  sex: z.nativeEnum(UserSex).optional(),
  avatar: z.string().optional(),

  // Employee information
  employeeId: z.string().min(1, "Employee ID is required").max(20, "Employee ID must not exceed 20 characters"),
  hireDate: z.string().min(1, "Hire date is required"),
  employmentType: z.nativeEnum(EmploymentType),
  salary: z.number().positive("Salary must be greater than 0").optional(),
  hourlyRate: z.number().positive("Hourly rate must be greater than 0").optional(),
  emergencyContactName: z.string().min(1, "Emergency contact name is required").max(100, "Emergency contact name must not exceed 100 characters"),
  emergencyContactPhone: z.string().min(1, "Emergency contact phone is required").max(20, "Emergency contact phone must not exceed 20 characters"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required").max(20, "Phone must not exceed 20 characters"),
  birthDate: z.string().min(1, "Birth date is required"),
  socialSecurityNumber: z.string().min(1, "Social security number is required").max(20, "SSN must not exceed 20 characters"),
  bankAccountNumber: z.string().min(1, "Bank account number is required").max(30, "Bank account number must not exceed 30 characters"),
  bankRoutingNumber: z.string().min(1, "Bank routing number is required").max(30, "Bank routing number must not exceed 30 characters"),
  performanceRating: z.number().min(0, "Performance rating must be at least 0").max(5, "Performance rating must not exceed 5").optional(),
  lastPerformanceReview: z.string().optional(),
  nextPerformanceReview: z.string().optional(),
  notes: z.string().optional(),
  position: z.string().min(1, "Position is required").max(50, "Position must not exceed 50 characters"),
  department: z.string().min(1, "Department is required").max(50, "Department must not exceed 50 characters"),
  shiftStart: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)"),
  shiftEnd: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)"),
  sickDaysTotal: z.number().min(0, "Sick days total must be non-negative").optional(),
  vacationDaysTotal: z.number().min(0, "Vacation days total must be non-negative").optional(),
});

export const UpdateStaffSchema = z.object({
  // User information (all optional)
  firstName: z.string().max(50, "First name must not exceed 50 characters").optional(),
  lastName: z.string().max(50, "Last name must not exceed 50 characters").optional(),
  username: z.string().max(50, "Username must not exceed 50 characters").optional(),
  email: z.string().email("Invalid email format").max(100, "Email must not exceed 100 characters").optional(),
  role: z.nativeEnum(UserRole).optional(),
  sex: z.nativeEnum(UserSex).optional(),
  avatar: z.string().optional(),

  // Employee information (all optional)
  employeeId: z.string().max(20, "Employee ID must not exceed 20 characters").optional(),
  hireDate: z.string().optional(),
  employmentType: z.nativeEnum(EmploymentType).optional(),
  salary: z.number().positive("Salary must be greater than 0").optional(),
  hourlyRate: z.number().positive("Hourly rate must be greater than 0").optional(),
  emergencyContactName: z.string().max(100, "Emergency contact name must not exceed 100 characters").optional(),
  emergencyContactPhone: z.string().max(20, "Emergency contact phone must not exceed 20 characters").optional(),
  address: z.string().optional(),
  phone: z.string().max(20, "Phone must not exceed 20 characters").optional(),
  birthDate: z.string().optional(),
  socialSecurityNumber: z.string().max(20, "SSN must not exceed 20 characters").optional(),
  bankAccountNumber: z.string().max(30, "Bank account number must not exceed 30 characters").optional(),
  bankRoutingNumber: z.string().max(30, "Bank routing number must not exceed 30 characters").optional(),
  performanceRating: z.number().min(0, "Performance rating must be at least 0").max(5, "Performance rating must not exceed 5").optional(),
  lastPerformanceReview: z.string().optional(),
  nextPerformanceReview: z.string().optional(),
  notes: z.string().optional(),
  position: z.string().max(50, "Position must not exceed 50 characters").optional(),
  department: z.string().max(50, "Department must not exceed 50 characters").optional(),
  shiftStart: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)").optional(),
  shiftEnd: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)").optional(),
  sickDaysTotal: z.number().min(0, "Sick days total must be non-negative").optional(),
  sickDaysUsed: z.number().min(0, "Sick days used must be non-negative").optional(),
  vacationDaysTotal: z.number().min(0, "Vacation days total must be non-negative").optional(),
  vacationDaysUsed: z.number().min(0, "Vacation days used must be non-negative").optional(),
  isActive: z.boolean().optional(),
});

// Type inference from Zod schemas
export type CreateStaffFormData = z.infer<typeof CreateStaffSchema>;
export type UpdateStaffFormData = z.infer<typeof UpdateStaffSchema>;

// API Response types
export interface StaffResponse {
  message?: string;
  data?: Staff;
}

export interface StaffListResponse {
  data: Staff[];
  total?: number;
}

// Helper functions
export const formatShiftTime = (shiftStart: string, shiftEnd: string): string => {
  return `${shiftStart} - ${shiftEnd}`;
};

export const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

export const maskSensitiveData = (data: string, visibleChars: number = 4): string => {
  if (!data || data.length <= visibleChars) {
    return '*****';
  }
  const masked = '*'.repeat(data.length - visibleChars);
  return masked + data.substring(data.length - visibleChars);
};

export const getRoleBadgeColor = (role: UserRole): string => {
  const roleColors = {
    [UserRole.MANAGER]: 'bg-[#6B4E37] text-white',
    [UserRole.CASHIER]: 'bg-[#2CA6A4] text-white',
    [UserRole.COOK]: 'bg-[#E1B168] text-white',
    [UserRole.BARISTA]: 'bg-[#D4EDEC] text-gray-800',
    [UserRole.HELPER]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    [UserRole.OWNER]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    [UserRole.CLIENT]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  };
  
  return roleColors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
};

export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames = {
    [UserRole.MANAGER]: 'Manager',
    [UserRole.CASHIER]: 'Cashier',
    [UserRole.COOK]: 'Cook',
    [UserRole.BARISTA]: 'Barista',
    [UserRole.HELPER]: 'Helper',
    [UserRole.OWNER]: 'Owner',
    [UserRole.CLIENT]: 'Client'
  };
  
  return roleNames[role] || role;
};
