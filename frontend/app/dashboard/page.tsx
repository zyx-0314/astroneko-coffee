"use client"

import React from 'react';
import {
  getPromoItems,
  mockMenuItems as menuItems,
} from '@/lib/data/menu';
import { getOrdersByCustomer } from '@/lib/data/orders';
import { useAuth } from '@/provider/auth-provider';
import {
  ProfileDisplaySection,
  FavoritesDisplaySection,
  RecommendationDisplaySection,
  OrderHistoryDisplaySection,
} from './sections';

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
  const { user: currentUser, isLoading } = useAuth();
  
  // Show loading state if user is not loaded yet
  if (isLoading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B4E37] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const userOrderHistory = getOrdersByCustomer(currentUser.id);

  const handleQuickOrder = (item: unknown) => {
    console.log('Quick order for:', item);
    // Implement quick order functionality
  };

  const handleAddToCart = (item: unknown) => {
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
