import { Badge } from '@/components/ui/badge';
import { UseMenuItemCardProps } from '@/schema';

export const useMenuItemCard = ({ item, onAddToCart }: UseMenuItemCardProps) => {
  const getPromoTypeDisplay = () => {
    const badges = [];
    
    if (item.promoType === 'neekogust') {
      badges.push(
        <Badge key="neekogust" className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs">
          NEEKOGUST
        </Badge>
      );
    }
    
    if (item.promoType === 'welcome-back-school') {
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
    handleAddToCart
  };
};
