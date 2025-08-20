import { z } from 'zod';

// Customer entity interface
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  points: number;
  registrationDate: string;
  lastPurchaseDate?: string;
  isActive: boolean;
}

// Customer API response interfaces
export interface CustomerResponse {
  customers: Customer[];
  total: number;
}

export interface PaginatedCustomerResponse {
  content: Customer[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Customer validation schemas
export const CustomerValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Invalid email format'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be less than 15 digits'),
  points: z.number().min(0, 'Points cannot be negative').optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const CreateCustomerSchema = CustomerValidationSchema.omit({ points: true });
export const UpdateCustomerSchema = CustomerValidationSchema.partial();

// Type exports for form data
export type CustomerFormData = z.infer<typeof CustomerValidationSchema>;
export type CreateCustomerFormData = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerFormData = z.infer<typeof UpdateCustomerSchema>;

// Helper functions for customer data
export const getCustomerFullName = (customer: Customer): string => {
  return `${customer.firstName} ${customer.lastName}`;
};

export const formatCustomerRegistrationDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

export const calculateCustomerLoyaltyTier = (points: number): 'Bronze' | 'Silver' | 'Gold' | 'Platinum' => {
  if (points >= 10000) return 'Platinum';
  if (points >= 5000) return 'Gold';
  if (points >= 2000) return 'Silver';
  return 'Bronze';
};
