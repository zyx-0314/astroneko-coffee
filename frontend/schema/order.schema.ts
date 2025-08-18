import { z } from "zod";
import { MenuItem } from './menuItem.schema';

// Order status enumeration
export type OrderStatus = 
  | 'PENDING' 
  | 'IN_PROGRESS' 
  | 'READY' 
  | 'COMPLETE' 
  | 'HAS_PROBLEM' 
  | 'CANCELLED' 
  | 'RETURN' 
  | 'DELAYED';

// Order item interface (menu item + quantity + customizations)
export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

// Main order interface
export interface Order {
  id: string;
  queueNo: number;
  customerName: string;
  customerId?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus[];
  placedAt: string; // ISO string
  estimatedReady?: string; // ISO string
  assignedTo?: string; // Staff member ID
  completedBy?: string; // Staff member ID who completed the order
  notes?: string;
}

// Order filter types
export type OrderFilterType = 'all' | 'pending' | 'in-progress' | 'ready' | 'complete' | 'problems';

// Order sort options
export type OrderSortOption = 'newest' | 'oldest' | 'queue-asc' | 'queue-desc' | 'total-high' | 'total-low';

// Zod schema for order status validation
export const OrderStatusSchema = z.enum([
  'PENDING',
  'IN_PROGRESS', 
  'READY',
  'COMPLETE',
  'HAS_PROBLEM',
  'CANCELLED',
  'RETURN',
  'DELAYED'
]);

// Zod schema for order item validation
export const OrderItemValidationSchema = z.object({
  menuItemId: z.string().min(1, "Menu item is required"),
  quantity: z.number().min(1, "Quantity must be at least 1").max(10, "Maximum 10 items allowed"),
  specialInstructions: z.string().max(200, "Instructions must be less than 200 characters").optional()
});

// Zod schema for creating a new order
export const CreateOrderValidationSchema = z.object({
  customerName: z
    .string()
    .min(1, "Customer name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  customerId: z.string().optional(),
  items: z
    .array(OrderItemValidationSchema)
    .min(1, "At least one item is required")
    .max(20, "Maximum 20 items per order"),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional()
});

// Zod schema for updating order status
export const UpdateOrderStatusSchema = z.object({
  status: z.array(OrderStatusSchema).min(1, "At least one status is required"),
  assignedTo: z.string().optional(),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional()
});

// Type inference from Zod schemas
export type OrderItemFormData = z.infer<typeof OrderItemValidationSchema>;
export type CreateOrderFormData = z.infer<typeof CreateOrderValidationSchema>;
export type UpdateOrderStatusFormData = z.infer<typeof UpdateOrderStatusSchema>;

// Create order request (without ID and computed fields)
export interface CreateOrderRequest extends Omit<Order, 'id' | 'queueNo' | 'total' | 'placedAt' | 'status'> {}

// Update order request
export interface UpdateOrderRequest extends Partial<Omit<Order, 'id' | 'queueNo' | 'placedAt'>> {}
