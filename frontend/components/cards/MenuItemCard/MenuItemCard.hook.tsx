import { Badge } from '@/components/ui/badge';
import { UseMenuItemCardProps } from '@/schema';

export const useMenuItemCard = ({ item, onAddToCart }: UseMenuItemCardProps) => {
  // Helper function to parse tags from database response
  const getTags = () => {
    if (!item.tags) return [];
    
    // If tags is already an array, return it
    if (Array.isArray(item.tags)) {
      return item.tags;
    }
    
    // If tags is a string, parse it (assuming comma-separated)
    if (typeof item.tags === 'string') {
      return item.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
    }
    
    return [];
  };

  // Helper functions to safely access stats
  const getWeeklyBuys = () => item.weeklyBuys || 0;
  const getWeeklyReviews = () => item.weeklyReviews || 0;
  const getMonthlyBuys = () => item.monthlyBuys || 0;
  const getMonthlyReviews = () => item.monthlyReviews || 0;
  const getRating = () => item.rating || 0;
  const getReviewsCount = () => item.reviewsCount || 0;

  const getPromoTypeDisplay = () => {
    const badges = [];
    
    // Handle both frontend and database promo type formats
    const promoType = item.promoType?.toLowerCase();
    
    if (promoType === 'neekogust') {
      badges.push(
        <Badge key="neekogust" className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs">
          NEEKOGUST
        </Badge>
      );
    }
    
    if (promoType === 'welcome-back-school' || promoType === 'welcome_back_school') {
      badges.push(
        <Badge key="school" className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-xs">
          SCHOOL SPECIAL
        </Badge>
      );
    }
    
    if (item.isOnSale && item.originalPrice && !item.promoType) {
      badges.push(
        <Badge key="sale" className="bg-gradient-to-r from-pink-500 to-purple-400 text-white text-xs">
          PROMO
        </Badge>
      );
    }
    
    if (item.isCombo) {
      badges.push(
        <Badge key="combo" className="bg-[#2CA6A4] text-white text-xs">
          COMBO
        </Badge>
      );
    }
    
    return badges;
  };

  const handleAddToCart = () => {
    if (onAddToCart && item.inStock) {
      onAddToCart(item);
    }
  };

  return {
    getPromoTypeDisplay,
    handleAddToCart,
    getTags,
    getWeeklyBuys,
    getWeeklyReviews,
    getMonthlyBuys,
    getMonthlyReviews,
    getRating,
    getReviewsCount
  };
};
