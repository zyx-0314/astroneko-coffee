"use client"

import React from 'react';
import {
  getPromoItems,
  mockMenuItems as menuItems,
} from '@/lib/data/menu';
import { getOrdersByCustomer } from '@/lib/data/orders';
import { User } from '@/schema/user.schema';
import {
  ProfileDisplaySection,
  FavoritesDisplaySection,
  RecommendationDisplaySection,
  OrderHistoryDisplaySection,
} from './sections';

// Mock current user - in real app this would come from auth context
const currentUser: User = {
  id: '7',
  name: 'John Smith',
  email: 'john.smith@example.com',
  role: 'client',
  points: 1250,
  sex: 'male'
};

// Mock most bought items (would come from user's order history analysis)
const mostBoughtItems = [
  menuItems[0], // Milky Way
  menuItems[2], // Cosmic Latte
  menuItems[9]  // Meteor Brownie
];

// Prepare recommendations with promos first
const promoItems = getPromoItems();
const regularItems = menuItems.filter(item => !item.isOnSale && item.promoType === null).slice(0, 7);
const recommendationItems = [...promoItems, ...regularItems];

export default function ClientDashboard() {
  const userOrderHistory = getOrdersByCustomer(currentUser.id);

  const handleQuickOrder = (item: any) => {
    console.log('Quick order for:', item);
    // Implement quick order functionality
  };

  const handleAddToCart = (item: any) => {
    console.log('Add to cart:', item);
    // Implement add to cart functionality
  };

  return (
    <div className='container mx-auto px-3 sm:px-4 py-4 sm:py-6 min-h-[calc(100vh-80px)]'>
      <div className="space-y-8">
        {/* Profile Section */}
        <ProfileDisplaySection user={currentUser} />

        {/* Favorites Section */}
        <FavoritesDisplaySection 
          items={mostBoughtItems} 
          onQuickOrder={handleQuickOrder}
        />

        {/* Recommendations Section */}
        <RecommendationDisplaySection 
          items={recommendationItems}
          onAddToCart={handleAddToCart}
        />

        {/* Order History Section */}
        <OrderHistoryDisplaySection orders={userOrderHistory} />
      </div>
    </div>
  );
}
