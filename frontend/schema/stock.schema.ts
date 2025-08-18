import { z } from "zod";

// Stock item interface for inventory management
export interface StockItem {
  id: string;
  name: string;
  category: 'beans' | 'milk' | 'syrups' | 'pastries' | 'supplies' | 'ingredients';
  currentQty: number;
  threshold: number;
  unit: string;
  supplier: string;
  lastRestocked: string; // ISO string
  cost: number;
}

// Stock category type for filtering
export type StockCategory = StockItem['category'];

// Stock status based on quantity vs threshold
export type StockStatus = 'danger' | 'warning' | 'ok';

// Stock filter and sort options
export type StockFilterType = 'all' | StockCategory | 'low-stock' | 'out-of-stock';
export type StockSortOption = 'name-asc' | 'name-desc' | 'qty-low' | 'qty-high' | 'category' | 'supplier';

// Zod schema for stock category validation
export const StockCategorySchema = z.enum(['beans', 'milk', 'syrups', 'pastries', 'supplies', 'ingredients']);

// Zod schema for stock item validation
export const StockItemValidationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  category: StockCategorySchema,
  currentQty: z
    .number()
    .min(0, "Current quantity cannot be negative"),
  threshold: z
    .number()
    .min(1, "Threshold must be at least 1"),
  unit: z
    .string()
    .min(1, "Unit is required")
    .max(20, "Unit must be less than 20 characters")
    .trim(),
  supplier: z
    .string()
    .min(1, "Supplier is required")
    .max(100, "Supplier name must be less than 100 characters")
    .trim(),
  cost: z
    .number()
    .min(0.01, "Cost must be greater than 0")
});

// Zod schema for restocking items
export const RestockValidationSchema = z.object({
  quantity: z
    .number()
    .min(1, "Restock quantity must be at least 1")
    .max(1000, "Maximum 1000 units per restock"),
  cost: z
    .number()
    .min(0.01, "Cost must be greater than 0")
    .optional(), // If not provided, use existing cost
  supplier: z
    .string()
    .max(100, "Supplier name must be less than 100 characters")
    .optional() // If not provided, use existing supplier
});

// Type inference from Zod schemas
export type StockItemFormData = z.infer<typeof StockItemValidationSchema>;
export type RestockFormData = z.infer<typeof RestockValidationSchema>;

// Create stock item request (without ID and lastRestocked)
export interface CreateStockItemRequest extends Omit<StockItem, 'id' | 'lastRestocked'> {}

// Update stock item request
export interface UpdateStockItemRequest extends Partial<Omit<StockItem, 'id' | 'lastRestocked'>> {}

// Restock request
export interface RestockRequest {
  itemId: string;
  quantity: number;
  cost?: number;
  supplier?: string;
}
