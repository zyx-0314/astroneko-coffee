import { z } from 'zod';

// Item type enum to match backend
export type ItemType =
  | "COFFEE"
  | "PASTRIES"
  | "DRINKS"
  | "BUNDLES"
  | "VEGETARIAN"
  | "INSTANT"
  | "COMBO";

// Zod enum for ItemType
export const ItemTypeEnum = z.enum([
  "COFFEE",
  "PASTRIES",
  "DRINKS",
  "BUNDLES",
  "VEGETARIAN",
  "INSTANT",
  "COMBO",
]);

// Promo type is now a string to allow any text input
export type PromoType = string | null;

// Main MenuItem interface for the menu page
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For sale items
  type:
    | "coffee"
    | "pastries"
    | "drinks"
    | "bundles"
    | "vegetarian"
    | "instant"
    | "combo";
  image: string;
  rating: number;
  reviewsCount: number;
  weeklyReviews: number;
  monthlyReviews: number;
  weeklyBuys: number;
  monthlyBuys: number;
  positiveReviewsWeekly: number;
  positiveReviewsMonthly: number;
  tags: string[];
  inStock: boolean;
  isOnSale?: boolean;
  isCombo?: boolean;
  promoType?: string | null;
}

// Sorting options type
export type SortOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

// Schema for creating a new menu item (matches backend CreateMenuItemRequest)
export interface CreateMenuItemRequest {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  type: ItemType;
  image: string;
  tags?: string;
  inStock?: boolean;
  isOnSale?: boolean;
  isCombo?: boolean;
  promoType?: PromoType;
}

// Schema for updating a menu item (matches backend UpdateMenuItemRequest)
export interface UpdateMenuItemRequest {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  type: ItemType;
  image: string;
  tags?: string;
  inStock?: boolean;
  isOnSale?: boolean;
  isCombo?: boolean;
  promoType?: PromoType;
}

// Schema for the backend response (matches backend MenuItemResponse)
export interface MenuItemResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  type: ItemType;
  image: string;
  rating?: number;
  reviewsCount?: number;
  weeklyReviews?: number;
  monthlyReviews?: number;
  weeklyBuys?: number;
  monthlyBuys?: number;
  positiveReviewsWeekly?: number;
  positiveReviewsMonthly?: number;
  tags?: string;
  inStock: boolean;
  isOnSale?: boolean;
  isCombo?: boolean;
  promoType?: PromoType;
  createdAt?: string;
  updatedAt?: string;
}

export interface CRUMenuItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    data: CreateMenuItemRequest | UpdateMenuItemRequest
  ) => Promise<void>;
  item?: MenuItemResponse | null;
  mode: "create" | "edit" | "view";
}

// Zod schemas for validation
export const CreateMenuItemSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  originalPrice: z.number().min(0).optional(),
  type: ItemTypeEnum,
  image: z.string().url("Must be a valid URL").or(z.string().length(0)),
  tags: z.string().optional(),
  inStock: z.boolean().default(true),
  isOnSale: z.boolean().default(false),
  isCombo: z.boolean().default(false),
  promoType: z.string().nullable().optional(),
});

export const UpdateMenuItemSchema = CreateMenuItemSchema;

export type CreateMenuItemFormData = z.infer<typeof CreateMenuItemSchema>;
export type UpdateMenuItemFormData = z.infer<typeof UpdateMenuItemSchema>;
