import { z } from 'zod';

// Purchase History entity interface
export interface PurchaseHistory {
  id: number;
  orderId: string;
  customerId: number;
  customerName: string;
  totalAmount: number;
  itemsCount: number;
  orderDate: string;
  status: string;
  paymentMethod: string;
  pointsEarned?: number;
  pointsUsed?: number;
  notes?: string;
  items?: OrderHistoryItem[];
}

// Order history item interface
export interface OrderHistoryItem {
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  specialInstructions?: string;
}

// Customer statistics interface
export interface CustomerStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
}

// Generic paginated response interface
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Purchase history validation schemas
export const PurchaseHistoryValidationSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  customerId: z.number().positive('Customer ID must be positive'),
  customerName: z.string().min(1, 'Customer name is required'),
  totalAmount: z.number().positive('Total amount must be positive'),
  itemsCount: z.number().positive('Items count must be positive'),
  orderDate: z.string().min(1, 'Order date is required'),
  status: z.string().min(1, 'Status is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  pointsEarned: z.number().min(0, 'Points earned cannot be negative').optional(),
  pointsUsed: z.number().min(0, 'Points used cannot be negative').optional(),
  notes: z.string().optional(),
});

export const OrderHistoryItemValidationSchema = z.object({
  menuItemId: z.number().positive('Menu item ID must be positive'),
  menuItemName: z.string().min(1, 'Menu item name is required'),
  quantity: z.number().positive('Quantity must be positive'),
  unitPrice: z.number().positive('Unit price must be positive'),
  subtotal: z.number().positive('Subtotal must be positive'),
  specialInstructions: z.string().optional(),
});

export const CustomerStatsValidationSchema = z.object({
  totalOrders: z.number().min(0, 'Total orders cannot be negative'),
  totalSpent: z.number().min(0, 'Total spent cannot be negative'),
  averageOrderValue: z.number().min(0, 'Average order value cannot be negative'),
  lastOrderDate: z.string().optional(),
});

// Type exports for form data
export type PurchaseHistoryFormData = z.infer<typeof PurchaseHistoryValidationSchema>;
export type OrderHistoryItemFormData = z.infer<typeof OrderHistoryItemValidationSchema>;
export type CustomerStatsFormData = z.infer<typeof CustomerStatsValidationSchema>;

// Helper functions for purchase history
export const formatPurchaseDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

export const calculateOrderValue = (items: OrderHistoryItem[]): number => {
  return items.reduce((total, item) => total + item.subtotal, 0);
};

export const getPaymentMethodDisplayName = (method: string): string => {
  const methods: Record<string, string> = {
    'cash': 'Cash',
    'card': 'Credit/Debit Card',
    'digital': 'Digital Wallet',
    'points': 'Loyalty Points',
  };
  return methods[method.toLowerCase()] || method;
};
