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

// Schema for creating a new menu item (without ID)
export interface CreateMenuItemRequest {
    name: string;
    price: number;
}

// Schema for updating a menu item
export interface UpdateMenuItemRequest {
    name: string;
    price: number;
}

// Schema for the backend response (with numeric price)
export interface MenuItemResponse {
    id: number;
    name: string;
    price: number;
}
