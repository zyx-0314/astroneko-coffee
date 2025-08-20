// Item type enum to match backend
export type ItemType = 'COFFEE' | 'PASTRIES' | 'DRINKS' | 'BUNDLES' | 'VEGETARIAN' | 'INSTANT' | 'COMBO';

// Promo type enum to match backend
export type PromoType = 'NEEKOGUST' | 'WELCOME_BACK_SCHOOL' | null;

// Main MenuItem interface for the menu page
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For sale items
  type: 'coffee' | 'pastries' | 'drinks' | 'bundles' | 'vegetarian' | 'instant' | 'combo';
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
  promoType?: 'neekogust' | 'welcome-back-school' | null;
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
