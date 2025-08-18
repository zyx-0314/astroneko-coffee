"use client"

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, Filter, Grid3X3, List, Star, TrendingUp, Calendar, ShoppingCart, DollarSign, Coffee, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MenuItem, SortOption as SortOptionType } from '@/schema/menuItem.schema';
import { 
  fadeInContainer, 
  slideUpContainer, 
  cardFadeUp, 
  cardScale 
} from '@/framer';

// Mock data - in production this would come from API
const mockMenuItems: MenuItem[] = [
  // Cosmic Coffee Creations (Signature Blends)
  {
    id: '1',
    name: 'Milky Way',
    description: 'White coffee base, creamy and light with stellar smoothness',
    price: 3.99,
    originalPrice: 4.50,
    type: 'coffee',
    image: '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png',
    rating: 4.8,
    reviewsCount: 245,
    weeklyReviews: 18,
    monthlyReviews: 67,
    weeklyBuys: 89,
    monthlyBuys: 312,
    positiveReviewsWeekly: 16,
    positiveReviewsMonthly: 59,
    tags: ['signature', 'bestseller', 'creamy'],
    inStock: true,
    isOnSale: true,
    promoType: 'neekogust'
  },
  {
    id: '2',
    name: 'Dark Matter',
    description: 'Chocolate-infused rich coffee with cosmic depths',
    price: 5.25,
    type: 'coffee',
    image: '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png',
    rating: 4.9,
    reviewsCount: 312,
    weeklyReviews: 25,
    monthlyReviews: 89,
    weeklyBuys: 145,
    monthlyBuys: 567,
    positiveReviewsWeekly: 23,
    positiveReviewsMonthly: 82,
    tags: ['chocolate', 'rich', 'bestseller'],
    inStock: true
  },
  {
    id: '3',
    name: 'Cormas Nebula',
    description: 'Cookies & cream coffee blend with stellar cookie crumbles',
    price: 4.75,
    type: 'coffee',
    image: '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png',
    rating: 4.7,
    reviewsCount: 189,
    weeklyReviews: 12,
    monthlyReviews: 43,
    weeklyBuys: 67,
    monthlyBuys: 234,
    positiveReviewsWeekly: 11,
    positiveReviewsMonthly: 38,
    tags: ['cookies', 'cream', 'sweet'],
    inStock: true
  },
  {
    id: '4',
    name: 'Cosmos Blend',
    description: 'Merkat coffee bean specialty with interstellar aroma',
    price: 5.50,
    type: 'coffee',
    image: '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png',
    rating: 4.6,
    reviewsCount: 156,
    weeklyReviews: 14,
    monthlyReviews: 52,
    weeklyBuys: 78,
    monthlyBuys: 289,
    positiveReviewsWeekly: 12,
    positiveReviewsMonthly: 47,
    tags: ['specialty', 'premium', 'signature'],
    inStock: false
  },
  {
    id: '5',
    name: 'Starlight Latte',
    description: 'Vanilla latte with galaxy art, a visual and taste masterpiece',
    price: 4.25,
    originalPrice: 5.00,
    type: 'coffee',
    image: '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png',
    rating: 4.8,
    reviewsCount: 278,
    weeklyReviews: 22,
    monthlyReviews: 78,
    weeklyBuys: 134,
    monthlyBuys: 456,
    positiveReviewsWeekly: 20,
    positiveReviewsMonthly: 71,
    tags: ['vanilla', 'latte art', 'instagram worthy'],
    inStock: true,
    isOnSale: true,
    promoType: 'welcome-back-school'
  },
  {
    id: '6',
    name: 'Black Hole Brew',
    description: 'Extra-strong dark roast that pulls you into its depth',
    price: 4.00,
    type: 'coffee',
    image: '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png',
    rating: 4.5,
    reviewsCount: 167,
    weeklyReviews: 16,
    monthlyReviews: 58,
    weeklyBuys: 92,
    monthlyBuys: 334,
    positiveReviewsWeekly: 14,
    positiveReviewsMonthly: 52,
    tags: ['strong', 'dark roast', 'intense'],
    inStock: true
  },
  {
    id: '7',
    name: 'Solar Flare Espresso',
    description: 'Intense, citrusy espresso shot with explosive flavor',
    price: 3.50,
    type: 'coffee',
    image: '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png',
    rating: 4.4,
    reviewsCount: 134,
    weeklyReviews: 9,
    monthlyReviews: 32,
    weeklyBuys: 56,
    monthlyBuys: 198,
    positiveReviewsWeekly: 8,
    positiveReviewsMonthly: 28,
    tags: ['espresso', 'citrus', 'intense'],
    inStock: true
  },
  {
    id: '8',
    name: 'Supernova Mocha',
    description: 'Mocha with caramel drizzle that explodes with flavor',
    price: 5.75,
    type: 'coffee',
    image: '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png',
    rating: 4.7,
    reviewsCount: 201,
    weeklyReviews: 18,
    monthlyReviews: 64,
    weeklyBuys: 98,
    monthlyBuys: 367,
    positiveReviewsWeekly: 16,
    positiveReviewsMonthly: 58,
    tags: ['mocha', 'caramel', 'sweet'],
    inStock: true
  },
  {
    id: '9',
    name: 'Nebula Nitro Cold Brew',
    description: 'Smooth nitrogen-infused coffee with cosmic bubbles',
    price: 4.99,
    type: 'coffee',
    image: '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png',
    rating: 4.6,
    reviewsCount: 145,
    weeklyReviews: 11,
    monthlyReviews: 41,
    weeklyBuys: 73,
    monthlyBuys: 267,
    positiveReviewsWeekly: 10,
    positiveReviewsMonthly: 37,
    tags: ['cold brew', 'nitrogen', 'smooth'],
    inStock: true
  },
  {
    id: '10',
    name: 'Galactic Cappuccino',
    description: 'Classic cappuccino with stardust sprinkle and cosmic foam art',
    price: 4.25,
    type: 'coffee',
    image: '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png',
    rating: 4.5,
    reviewsCount: 178,
    weeklyReviews: 13,
    monthlyReviews: 48,
    weeklyBuys: 85,
    monthlyBuys: 301,
    positiveReviewsWeekly: 12,
    positiveReviewsMonthly: 43,
    tags: ['cappuccino', 'classic', 'foam art'],
    inStock: true
  },

  // Non-Coffee Galactic Drinks
  {
    id: '11',
    name: 'Aurora Matcha Latte',
    description: 'Bright green matcha fusion with cosmic energy',
    price: 4.50,
    type: 'drinks',
    image: '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png',
    rating: 4.7,
    reviewsCount: 98,
    weeklyReviews: 8,
    monthlyReviews: 29,
    weeklyBuys: 45,
    monthlyBuys: 167,
    positiveReviewsWeekly: 7,
    positiveReviewsMonthly: 26,
    tags: ['matcha', 'healthy', 'green tea'],
    inStock: true
  },
  {
    id: '12',
    name: 'Stardust Chai',
    description: 'Spiced chai latte with cosmic foam and stellar spices',
    price: 4.25,
    originalPrice: 4.75,
    type: 'drinks',
    image: '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png',
    rating: 4.6,
    reviewsCount: 123,
    weeklyReviews: 10,
    monthlyReviews: 35,
    weeklyBuys: 62,
    monthlyBuys: 221,
    positiveReviewsWeekly: 9,
    positiveReviewsMonthly: 31,
    tags: ['chai', 'spiced', 'warm'],
    inStock: true,
    isOnSale: true,
    promoType: 'neekogust'
  },
  {
    id: '13',
    name: 'Planetary Milk Tea',
    description: 'Bubble milk tea with galaxy pearls and cosmic sweetness',
    price: 5.25,
    type: 'drinks',
    image: '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png',
    rating: 4.8,
    reviewsCount: 267,
    weeklyReviews: 24,
    monthlyReviews: 86,
    weeklyBuys: 142,
    monthlyBuys: 534,
    positiveReviewsWeekly: 22,
    positiveReviewsMonthly: 79,
    tags: ['bubble tea', 'pearls', 'sweet'],
    inStock: true
  },
  {
    id: '14',
    name: 'Cosmic Rose Latte',
    description: 'Rose-infused milk latte with floral cosmic essence',
    price: 4.75,
    type: 'drinks',
    image: '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png',
    rating: 4.4,
    reviewsCount: 89,
    weeklyReviews: 7,
    monthlyReviews: 25,
    weeklyBuys: 38,
    monthlyBuys: 142,
    positiveReviewsWeekly: 6,
    positiveReviewsMonthly: 22,
    tags: ['rose', 'floral', 'unique'],
    inStock: false
  },
  {
    id: '15',
    name: 'Zero-Gravity Lemonade',
    description: 'Sparkling citrus cooler that lifts your spirits',
    price: 3.75,
    type: 'drinks',
    image: '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png',
    rating: 4.3,
    reviewsCount: 112,
    weeklyReviews: 9,
    monthlyReviews: 34,
    weeklyBuys: 67,
    monthlyBuys: 245,
    positiveReviewsWeekly: 8,
    positiveReviewsMonthly: 30,
    tags: ['lemonade', 'sparkling', 'refreshing'],
    inStock: true
  },
  {
    id: '16',
    name: 'Meteorite Strawberry Shake',
    description: 'Thick strawberry cream shake from outer space',
    price: 5.50,
    type: 'drinks',
    image: '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png',
    rating: 4.6,
    reviewsCount: 156,
    weeklyReviews: 12,
    monthlyReviews: 44,
    weeklyBuys: 78,
    monthlyBuys: 289,
    positiveReviewsWeekly: 11,
    positiveReviewsMonthly: 39,
    tags: ['shake', 'strawberry', 'thick'],
    inStock: true
  },
  {
    id: '17',
    name: 'Blue Moon Taro Drink',
    description: 'Sweet taro and milk blend with cosmic purple hues',
    price: 4.99,
    type: 'drinks',
    image: '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png',
    rating: 4.5,
    reviewsCount: 134,
    weeklyReviews: 11,
    monthlyReviews: 38,
    weeklyBuys: 65,
    monthlyBuys: 234,
    positiveReviewsWeekly: 10,
    positiveReviewsMonthly: 34,
    tags: ['taro', 'purple', 'sweet'],
    inStock: true
  },
  {
    id: '18',
    name: 'Galactic Hibiscus Tea',
    description: 'Floral and fruity iced tea with cosmic refreshment',
    price: 3.99,
    type: 'drinks',
    image: '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png',
    rating: 4.2,
    reviewsCount: 87,
    weeklyReviews: 6,
    monthlyReviews: 23,
    weeklyBuys: 42,
    monthlyBuys: 156,
    positiveReviewsWeekly: 5,
    positiveReviewsMonthly: 20,
    tags: ['hibiscus', 'floral', 'iced tea'],
    inStock: true
  },
  {
    id: '19',
    name: 'Orbit Oolong',
    description: 'Premium oolong tea with celestial sophistication',
    price: 4.25,
    type: 'drinks',
    image: '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png',
    rating: 4.4,
    reviewsCount: 98,
    weeklyReviews: 8,
    monthlyReviews: 28,
    weeklyBuys: 51,
    monthlyBuys: 187,
    positiveReviewsWeekly: 7,
    positiveReviewsMonthly: 25,
    tags: ['oolong', 'premium', 'tea'],
    inStock: true
  },
  {
    id: '20',
    name: 'Saturn\'s Peach Iced Tea',
    description: 'Fruity and refreshing peach tea from Saturn\'s rings',
    price: 4.00,
    type: 'drinks',
    image: '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png',
    rating: 4.5,
    reviewsCount: 145,
    weeklyReviews: 12,
    monthlyReviews: 41,
    weeklyBuys: 73,
    monthlyBuys: 267,
    positiveReviewsWeekly: 11,
    positiveReviewsMonthly: 37,
    tags: ['peach', 'fruity', 'iced tea'],
    inStock: true
  },

  // Pastries & Treats
  {
    id: '21',
    name: 'Astro Croissant',
    description: 'Buttery, flaky croissant baked fresh in our space kitchen',
    price: 3.25,
    type: 'pastries',
    image: '/placeholder/product-services/Pastries_and_Treats.png',
    rating: 4.6,
    reviewsCount: 234,
    weeklyReviews: 19,
    monthlyReviews: 67,
    weeklyBuys: 156,
    monthlyBuys: 578,
    positiveReviewsWeekly: 17,
    positiveReviewsMonthly: 61,
    tags: ['croissant', 'buttery', 'fresh'],
    inStock: true
  },
  {
    id: '22',
    name: 'Meteor Muffins',
    description: 'Blueberry or chocolate chip muffins from meteor dust',
    price: 2.75,
    originalPrice: 3.25,
    type: 'pastries',
    image: '/placeholder/product-services/Pastries_and_Treats.png',
    rating: 4.4,
    reviewsCount: 187,
    weeklyReviews: 15,
    monthlyReviews: 52,
    weeklyBuys: 123,
    monthlyBuys: 445,
    positiveReviewsWeekly: 14,
    positiveReviewsMonthly: 47,
    tags: ['muffin', 'blueberry', 'chocolate chip'],
    inStock: true,
    isOnSale: true,
    promoType: 'welcome-back-school'
  },
  {
    id: '23',
    name: 'Lunar Cheesecake',
    description: 'Creamy cheesecake slice as smooth as moon surface',
    price: 4.50,
    type: 'pastries',
    image: '/placeholder/product-services/Pastries_and_Treats.png',
    rating: 4.8,
    reviewsCount: 312,
    weeklyReviews: 26,
    monthlyReviews: 89,
    weeklyBuys: 167,
    monthlyBuys: 623,
    positiveReviewsWeekly: 24,
    positiveReviewsMonthly: 82,
    tags: ['cheesecake', 'creamy', 'dessert'],
    inStock: true
  },
  {
    id: '24',
    name: 'Black Hole Brownies',
    description: 'Dense chocolate brownies that absorb all light and flavor',
    price: 3.75,
    type: 'pastries',
    image: '/placeholder/product-services/Pastries_and_Treats.png',
    rating: 4.7,
    reviewsCount: 267,
    weeklyReviews: 22,
    monthlyReviews: 78,
    weeklyBuys: 145,
    monthlyBuys: 534,
    positiveReviewsWeekly: 20,
    positiveReviewsMonthly: 71,
    tags: ['brownies', 'chocolate', 'dense'],
    inStock: true
  },
  {
    id: '25',
    name: 'Cosmic Cookies',
    description: 'Star-shaped sugar cookies with galactic decorations',
    price: 2.50,
    type: 'pastries',
    image: '/placeholder/product-services/Pastries_and_Treats.png',
    rating: 4.3,
    reviewsCount: 156,
    weeklyReviews: 13,
    monthlyReviews: 45,
    weeklyBuys: 89,
    monthlyBuys: 323,
    positiveReviewsWeekly: 12,
    positiveReviewsMonthly: 41,
    tags: ['cookies', 'star shaped', 'sugar'],
    inStock: true
  },
  {
    id: '26',
    name: 'Galaxy Macarons',
    description: 'Assorted pastel cosmic shells with stellar fillings',
    price: 5.25,
    type: 'pastries',
    image: '/placeholder/product-services/Pastries_and_Treats.png',
    rating: 4.9,
    reviewsCount: 189,
    weeklyReviews: 16,
    monthlyReviews: 56,
    weeklyBuys: 98,
    monthlyBuys: 356,
    positiveReviewsWeekly: 15,
    positiveReviewsMonthly: 52,
    tags: ['macarons', 'pastel', 'premium'],
    inStock: false
  },
  {
    id: '27',
    name: 'Starlight Cinnamon Roll',
    description: 'Swirled pastry with glaze that sparkles like starlight',
    price: 3.99,
    type: 'pastries',
    image: '/placeholder/product-services/Pastries_and_Treats.png',
    rating: 4.6,
    reviewsCount: 234,
    weeklyReviews: 19,
    monthlyReviews: 67,
    weeklyBuys: 134,
    monthlyBuys: 489,
    positiveReviewsWeekly: 17,
    positiveReviewsMonthly: 61,
    tags: ['cinnamon roll', 'glazed', 'swirled'],
    inStock: true
  },
  {
    id: '28',
    name: 'Orbit Donuts',
    description: 'Assorted filled donuts orbiting with cosmic flavors',
    price: 3.50,
    type: 'pastries',
    image: '/placeholder/product-services/Pastries_and_Treats.png',
    rating: 4.5,
    reviewsCount: 201,
    weeklyReviews: 17,
    monthlyReviews: 58,
    weeklyBuys: 112,
    monthlyBuys: 412,
    positiveReviewsWeekly: 15,
    positiveReviewsMonthly: 52,
    tags: ['donuts', 'filled', 'assorted'],
    inStock: true
  },
  {
    id: '29',
    name: 'Comet Tarts',
    description: 'Fruit-filled mini tarts with comet tail decorations',
    price: 4.25,
    type: 'pastries',
    image: '/placeholder/product-services/Pastries_and_Treats.png',
    rating: 4.4,
    reviewsCount: 134,
    weeklyReviews: 11,
    monthlyReviews: 38,
    weeklyBuys: 67,
    monthlyBuys: 245,
    positiveReviewsWeekly: 10,
    positiveReviewsMonthly: 34,
    tags: ['tarts', 'fruit filled', 'mini'],
    inStock: true
  },
  {
    id: '30',
    name: 'Nebula Parfait',
    description: 'Yogurt, granola, and layered fruits in nebula colors',
    price: 4.75,
    type: 'pastries',
    image: '/placeholder/product-services/Pastries_and_Treats.png',
    rating: 4.3,
    reviewsCount: 98,
    weeklyReviews: 8,
    monthlyReviews: 28,
    weeklyBuys: 52,
    monthlyBuys: 189,
    positiveReviewsWeekly: 7,
    positiveReviewsMonthly: 25,
    tags: ['parfait', 'yogurt', 'healthy'],
    inStock: true
  },

  // Vegetarian & Light Options
  {
    id: '31',
    name: 'Veggie Quasar Wrap',
    description: 'Spinach, hummus, and roasted veggies wrapped in cosmic energy',
    price: 7.50,
    type: 'vegetarian',
    image: '/placeholder/product-services/Vegetarian_and_Light_Options.png',
    rating: 4.5,
    reviewsCount: 145,
    weeklyReviews: 12,
    monthlyReviews: 41,
    weeklyBuys: 73,
    monthlyBuys: 267,
    positiveReviewsWeekly: 11,
    positiveReviewsMonthly: 37,
    tags: ['wrap', 'vegetarian', 'healthy'],
    inStock: true
  },
  {
    id: '32',
    name: 'Stellar Salad Bowl',
    description: 'Fresh greens with cosmic dressing from distant galaxies',
    price: 8.50,
    type: 'vegetarian',
    image: '/placeholder/product-services/Vegetarian_and_Light_Options.png',
    rating: 4.3,
    reviewsCount: 134,
    weeklyReviews: 9,
    monthlyReviews: 32,
    weeklyBuys: 56,
    monthlyBuys: 198,
    positiveReviewsWeekly: 8,
    positiveReviewsMonthly: 28,
    tags: ['salad', 'fresh', 'vegetarian'],
    inStock: false
  },
  {
    id: '33',
    name: 'Astro Avocado Toast',
    description: 'Multigrain toast with avocado mash and stellar seasonings',
    price: 6.75,
    type: 'vegetarian',
    image: '/placeholder/product-services/Vegetarian_and_Light_Options.png',
    rating: 4.6,
    reviewsCount: 189,
    weeklyReviews: 15,
    monthlyReviews: 53,
    weeklyBuys: 98,
    monthlyBuys: 356,
    positiveReviewsWeekly: 14,
    positiveReviewsMonthly: 48,
    tags: ['avocado', 'toast', 'healthy'],
    inStock: true,
    promoType: 'welcome-back-school'
  },
  {
    id: '34',
    name: 'Planet Power Bowl',
    description: 'Quinoa, chickpeas, and roasted veggies for cosmic energy',
    price: 9.25,
    type: 'vegetarian',
    image: '/placeholder/product-services/Vegetarian_and_Light_Options.png',
    rating: 4.7,
    reviewsCount: 167,
    weeklyReviews: 14,
    monthlyReviews: 48,
    weeklyBuys: 89,
    monthlyBuys: 323,
    positiveReviewsWeekly: 13,
    positiveReviewsMonthly: 44,
    tags: ['power bowl', 'quinoa', 'protein'],
    inStock: true
  },
  {
    id: '35',
    name: 'Lunar Smoothie Bowl',
    description: 'Mixed berries, granola, and seeds in a cosmic bowl',
    price: 7.99,
    type: 'vegetarian',
    image: '/placeholder/product-services/Vegetarian_and_Light_Options.png',
    rating: 4.4,
    reviewsCount: 123,
    weeklyReviews: 10,
    monthlyReviews: 35,
    weeklyBuys: 62,
    monthlyBuys: 221,
    positiveReviewsWeekly: 9,
    positiveReviewsMonthly: 31,
    tags: ['smoothie bowl', 'berries', 'granola'],
    inStock: true
  },

  // Instant & Take-Home
  {
    id: '36',
    name: 'Astroneko Instant Coffee Pack',
    description: '3-in-1 cosmic mix for instant space coffee at home',
    price: 12.99,
    type: 'instant',
    image: '/placeholder/product-services/Instant_and_Take_Home.png',
    rating: 4.2,
    reviewsCount: 89,
    weeklyReviews: 7,
    monthlyReviews: 25,
    weeklyBuys: 34,
    monthlyBuys: 125,
    positiveReviewsWeekly: 6,
    positiveReviewsMonthly: 22,
    tags: ['instant', '3-in-1', 'take home'],
    inStock: true
  },
  {
    id: '37',
    name: 'Meteorite Drip Bags',
    description: 'Single-serve drip coffee bags for cosmic brewing',
    price: 15.50,
    type: 'instant',
    image: '/placeholder/product-services/Instant_and_Take_Home.png',
    rating: 4.5,
    reviewsCount: 134,
    weeklyReviews: 11,
    monthlyReviews: 38,
    weeklyBuys: 67,
    monthlyBuys: 245,
    positiveReviewsWeekly: 10,
    positiveReviewsMonthly: 34,
    tags: ['drip bags', 'single serve', 'convenient'],
    inStock: true
  },
  {
    id: '38',
    name: 'Cosmic Beans (250g)',
    description: 'Packaged roasted beans from distant coffee galaxies',
    price: 18.99,
    type: 'instant',
    image: '/placeholder/product-services/Instant_and_Take_Home.png',
    rating: 4.7,
    reviewsCount: 167,
    weeklyReviews: 14,
    monthlyReviews: 48,
    weeklyBuys: 45,
    monthlyBuys: 167,
    positiveReviewsWeekly: 13,
    positiveReviewsMonthly: 44,
    tags: ['beans', 'roasted', '250g'],
    inStock: true
  },
  {
    id: '39',
    name: 'Astroneko Coffee Capsules',
    description: 'Nespresso-compatible capsules for space-grade coffee',
    price: 22.99,
    type: 'instant',
    image: '/placeholder/product-services/Instant_and_Take_Home.png',
    rating: 4.4,
    reviewsCount: 98,
    weeklyReviews: 8,
    monthlyReviews: 28,
    weeklyBuys: 32,
    monthlyBuys: 118,
    positiveReviewsWeekly: 7,
    positiveReviewsMonthly: 25,
    tags: ['capsules', 'nespresso', 'compatible'],
    inStock: false
  },
  {
    id: '40',
    name: 'DIY Galactic Latte Kit',
    description: 'Milk frother and beans bundle for cosmic home brewing',
    price: 45.99,
    type: 'instant',
    image: '/placeholder/product-services/Instant_and_Take_Home.png',
    rating: 4.6,
    reviewsCount: 56,
    weeklyReviews: 5,
    monthlyReviews: 18,
    weeklyBuys: 23,
    monthlyBuys: 87,
    positiveReviewsWeekly: 5,
    positiveReviewsMonthly: 16,
    tags: ['DIY kit', 'frother', 'bundle'],
    inStock: true
  },

  // Special Bundles & Services
  {
    id: '41',
    name: 'Birthday Star Package',
    description: 'Cake and drinks for groups celebrating among the stars',
    price: 35.99,
    type: 'bundles',
    image: '/placeholder/product-services/Special_Bundles_and_Services.png',
    rating: 4.8,
    reviewsCount: 78,
    weeklyReviews: 6,
    monthlyReviews: 22,
    weeklyBuys: 12,
    monthlyBuys: 45,
    positiveReviewsWeekly: 6,
    positiveReviewsMonthly: 20,
    tags: ['birthday', 'cake', 'group'],
    inStock: true
  },
  {
    id: '42',
    name: 'Tea Time with Astroneko',
    description: 'Afternoon tea set with cosmic pastries and stellar teas',
    price: 28.99,
    type: 'bundles',
    image: '/placeholder/product-services/Special_Bundles_and_Services.png',
    rating: 4.5,
    reviewsCount: 67,
    weeklyReviews: 5,
    monthlyReviews: 19,
    weeklyBuys: 18,
    monthlyBuys: 67,
    positiveReviewsWeekly: 5,
    positiveReviewsMonthly: 17,
    tags: ['tea time', 'afternoon', 'set'],
    inStock: true
  },
  {
    id: '43',
    name: 'Cosmic Date Bundle',
    description: '2 drinks and 1 pastry sharing for romantic space dates',
    price: 16.99,
    originalPrice: 19.50,
    type: 'bundles',
    image: '/placeholder/product-services/Special_Bundles_and_Services.png',
    rating: 4.7,
    reviewsCount: 145,
    weeklyReviews: 12,
    monthlyReviews: 41,
    weeklyBuys: 73,
    monthlyBuys: 267,
    positiveReviewsWeekly: 11,
    positiveReviewsMonthly: 37,
    tags: ['date', 'romantic', 'sharing'],
    inStock: true,
    isOnSale: true,
    promoType: 'neekogust'
  },
  {
    id: '44',
    name: 'Nebula Office Pack',
    description: 'Box of 12 assorted drinks for cosmic office meetings',
    price: 52.99,
    type: 'bundles',
    image: '/placeholder/product-services/Special_Bundles_and_Services.png',
    rating: 4.3,
    reviewsCount: 34,
    weeklyReviews: 3,
    monthlyReviews: 12,
    weeklyBuys: 8,
    monthlyBuys: 29,
    positiveReviewsWeekly: 3,
    positiveReviewsMonthly: 11,
    tags: ['office', 'bulk', '12 drinks'],
    inStock: true
  },
  {
    id: '45',
    name: 'Galactic Pastry Box',
    description: '6 assorted pastries in a cosmic presentation box',
    price: 24.99,
    type: 'bundles',
    image: '/placeholder/product-services/Special_Bundles_and_Services.png',
    rating: 4.6,
    reviewsCount: 89,
    weeklyReviews: 7,
    monthlyReviews: 25,
    weeklyBuys: 34,
    monthlyBuys: 125,
    positiveReviewsWeekly: 6,
    positiveReviewsMonthly: 22,
    tags: ['pastry box', '6 pastries', 'assorted'],
    inStock: true
  },
  {
    id: '46',
    name: 'Starlight Kids Bundle',
    description: 'Chocolate drink and donut combo for little space explorers',
    price: 8.99,
    type: 'bundles',
    image: '/placeholder/product-services/Special_Bundles_and_Services.png',
    rating: 4.4,
    reviewsCount: 123,
    weeklyReviews: 10,
    monthlyReviews: 35,
    weeklyBuys: 62,
    monthlyBuys: 221,
    positiveReviewsWeekly: 9,
    positiveReviewsMonthly: 31,
    tags: ['kids', 'chocolate', 'donut'],
    inStock: true
  },

  // COMBO DEALS - New promotional items
  {
    id: 'COMBO1',
    name: 'Morning Star Combo',
    description: 'Any coffee + pastry + 20% off - Perfect way to start your cosmic day',
    price: 6.99,
    originalPrice: 8.75,
    type: 'combo',
    image: '/placeholder/product-services/Special_Bundles_and_Services.png',
    rating: 4.9,
    reviewsCount: 456,
    weeklyReviews: 38,
    monthlyReviews: 134,
    weeklyBuys: 234,
    monthlyBuys: 867,
    positiveReviewsWeekly: 36,
    positiveReviewsMonthly: 124,
    tags: ['combo', 'morning', 'bestseller', 'limited time'],
    inStock: true,
    isOnSale: true,
    isCombo: true
  },
  {
    id: 'COMBO2',
    name: 'Galactic Study Pack',
    description: 'Large coffee + healthy snack + free wifi - Fuel your brain for space missions',
    price: 9.99,
    originalPrice: 12.25,
    type: 'combo',
    image: '/placeholder/product-services/Special_Bundles_and_Services.png',
    rating: 4.7,
    reviewsCount: 289,
    weeklyReviews: 24,
    monthlyReviews: 87,
    weeklyBuys: 167,
    monthlyBuys: 612,
    positiveReviewsWeekly: 22,
    positiveReviewsMonthly: 79,
    tags: ['combo', 'study', 'wifi', 'student friendly'],
    inStock: true,
    isOnSale: true,
    isCombo: true
  },
  {
    id: 'COMBO3',
    name: 'Cosmic Afternoon Delight',
    description: 'Any 2 drinks + dessert sharing platter - Perfect for cosmic conversations',
    price: 14.99,
    originalPrice: 18.50,
    type: 'combo',
    image: '/placeholder/product-services/Special_Bundles_and_Services.png',
    rating: 4.8,
    reviewsCount: 178,
    weeklyReviews: 15,
    monthlyReviews: 56,
    weeklyBuys: 89,
    monthlyBuys: 334,
    positiveReviewsWeekly: 14,
    positiveReviewsMonthly: 51,
    tags: ['combo', 'afternoon', 'sharing', 'social'],
    inStock: true,
    isOnSale: true,
    isCombo: true
  }
];

// Sorting options
const sortOptions: SortOptionType[] = [
  { value: 'name-asc', label: 'Name (A-Z)', icon: <Coffee className="w-4 h-4" /> },
  { value: 'name-desc', label: 'Name (Z-A)', icon: <Coffee className="w-4 h-4" /> },
  { value: 'rating-desc', label: 'Highest Rated', icon: <Star className="w-4 h-4" /> },
  { value: 'rating-asc', label: 'Lowest Rated', icon: <Star className="w-4 h-4" /> },
  { value: 'reviews-month-desc', label: 'Most Reviews (Month)', icon: <Users className="w-4 h-4" /> },
  { value: 'reviews-week-desc', label: 'Most Reviews (Week)', icon: <Calendar className="w-4 h-4" /> },
  { value: 'buys-week-desc', label: 'Most Bought (Week)', icon: <TrendingUp className="w-4 h-4" /> },
  { value: 'buys-month-desc', label: 'Most Bought (Month)', icon: <ShoppingCart className="w-4 h-4" /> },
  { value: 'price-asc', label: 'Price (Low to High)', icon: <DollarSign className="w-4 h-4" /> },
  { value: 'price-desc', label: 'Price (High to Low)', icon: <DollarSign className="w-4 h-4" /> },
  { value: 'positive-month-desc', label: 'Most Positive (Month)', icon: <Star className="w-4 h-4" /> },
  { value: 'positive-week-desc', label: 'Most Positive (Week)', icon: <Star className="w-4 h-4" /> }
];

// Filter options
const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'pastries', label: 'Pastries' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'bundles', label: 'Bundles' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'instant', label: 'Instant' },
  { value: 'combo', label: 'Combo Deals' },
  { value: 'promo', label: 'Promos' }
];

export default function MenuPage() {
  // State for filters and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filtered and sorted menu items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = mockMenuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = filterType === 'all' || 
                         item.type === filterType || 
                         (filterType === 'promo' && (item.promoType === 'neekogust' || item.promoType === 'welcome-back-school'));
      
      return matchesSearch && matchesType;
    });

    // Sort the filtered items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating-desc':
          return b.rating - a.rating;
        case 'rating-asc':
          return a.rating - b.rating;
        case 'reviews-month-desc':
          return b.monthlyReviews - a.monthlyReviews;
        case 'reviews-week-desc':
          return b.weeklyReviews - a.weeklyReviews;
        case 'buys-week-desc':
          return b.weeklyBuys - a.weeklyBuys;
        case 'buys-month-desc':
          return b.monthlyBuys - a.monthlyBuys;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'positive-month-desc':
          return b.positiveReviewsMonthly - a.positiveReviewsMonthly;
        case 'positive-week-desc':
          return b.positiveReviewsWeekly - a.positiveReviewsWeekly;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, filterType]);

  const selectedSortOption = sortOptions.find(option => option.value === sortBy);

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors"
      initial="hidden"
      animate="visible"
      variants={fadeInContainer}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          className="mb-8"
          variants={slideUpContainer}
        >
          <div className="flex items-center justify-between mb-6">
            <motion.div variants={cardFadeUp}>
              <h1 className="text-4xl font-bold text-[#6B4E37] dark:text-[#E1B168] mb-2">
                Cosmic Menu
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover our intergalactic coffee creations and stellar treats
              </p>
            </motion.div>
          </div>

          {/* Promotional Banner: Combo */}
          <motion.div 
            className="mb-6"
            variants={cardFadeUp}
          >
            <div className="bg-gradient-to-r from-[#2CA6A4] to-[#E1B168] text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">🚀 Cosmic Combo Deals!</h3>
                  <p className="text-sm opacity-90">Save up to 20% on our special combination offers. Limited time only!</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-white text-white bg-transparent hover:text-[#2CA6A4]"
                  onClick={() => setFilterType('combo')}
                >
                  View Combos
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Promotional Banners: Sales*/}
          <motion.div 
            className="mb-6 flex flex-wrap md:flex-nowrap gap-4"
            variants={cardFadeUp}
            >
            {/* Neekogust Sale */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-lg shadow-lg flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">🎨 Neekogust Sale!</h3>
                  <p className="text-sm opacity-90">Artist appreciation month - Special discounts on creative favorites!</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-white text-white bg-transparent hover:bg-white hover:text-purple-600"
                  onClick={() => setFilterType('promo')}
                  >
                  View Promos
                </Button>
              </div>
            </div>
            {/* Welcome Back School Sale */}
            <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-4 rounded-lg shadow-lg flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">� Welcome Back School!</h3>
                  <p className="text-sm opacity-90">Student specials - Perfect fuel for your academic journey!</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
                  onClick={() => setFilterType('promo')}
                >
                  View Promos
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Search and Controls */}
          <motion.div 
            className="space-y-4"
            variants={cardFadeUp}
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search menu items, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Controls Row */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <div className="flex items-center gap-2">
                      {selectedSortOption?.icon}
                      <SelectValue placeholder="Sort by..." />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.icon}
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Type Filter */}
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? 'bg-[#2CA6A4] text-white' : ''}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex gap-2">
                {/* View Mode Toggle */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none border-l"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Results count */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md">
                  {filteredAndSortedItems.length} items
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || filterType !== 'all') && (
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>×</button>
                  </Badge>
                )}
                {filterType !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Type: {typeOptions.find(t => t.value === filterType)?.label}
                    <button onClick={() => setFilterType('all')}>×</button>
                  </Badge>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.header>

        {/* Menu Items Grid/List */}
        <motion.div
          variants={fadeInContainer}
          className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredAndSortedItems.length > 0 ? (
            filteredAndSortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={viewMode === 'grid' ? cardScale : cardFadeUp}
                custom={index}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`h-full ${!item.inStock ? 'opacity-60' : ''} ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}>
                  <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={200}
                        className={`w-full object-cover ${
                          viewMode === 'grid' ? 'h-48 rounded-t-lg' : 'h-full rounded-l-lg'
                        }`}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {item.promoType === 'neekogust' && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs">
                            NEEKOGUST
                          </Badge>
                        )}
                        {item.promoType === 'welcome-back-school' && (
                          <Badge className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-xs">
                            SCHOOL SPECIAL
                          </Badge>
                        )}
                        {item.isOnSale && item.originalPrice && !item.promoType && (
                          <Badge className="bg-red-500 text-white text-xs">
                            SALE
                          </Badge>
                        )}
                        {item.isCombo && (
                          <Badge className="bg-[#2CA6A4] text-white text-xs">
                            COMBO
                          </Badge>
                        )}
                        <div className="flex flex-col items-end">
                          {item.isOnSale && item.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <Badge className="bg-[#E1B168] text-[#6B4E37]">
                            ${item.price.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <CardHeader className={viewMode === 'list' ? 'pb-2' : ''}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-[#6B4E37] dark:text-[#E1B168] mb-1">
                            {item.name}
                          </CardTitle>
                          <CardDescription className="text-sm mb-2">
                            {item.description}
                          </CardDescription>
                          <div className="flex items-center gap-2 flex-wrap">
                            {item.promoType === 'neekogust' && (
                              <Badge className="text-xs bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                                NEEKOGUST SPECIAL
                              </Badge>
                            )}
                            {item.promoType === 'welcome-back-school' && (
                              <Badge className="text-xs bg-gradient-to-r from-blue-600 to-green-500 text-white">
                                SCHOOL SPECIAL
                              </Badge>
                            )}
                            {item.isOnSale && item.originalPrice && !item.promoType && (
                              <Badge variant="destructive" className="text-xs bg-red-500">
                                SALE
                              </Badge>
                            )}
                            {item.isCombo && (
                              <Badge className="text-xs bg-[#2CA6A4] text-white">
                                COMBO DEAL
                              </Badge>
                            )}
                            {!item.inStock && (
                              <Badge variant="outline" className="text-xs text-gray-500">
                                OUT OF STOCK
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 text-[#E1B168] mb-1">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">{item.rating}</span>
                            <span className="text-xs text-gray-500">({item.reviewsCount})</span>
                          </div>
                          <div className="text-right">
                            {item.isOnSale && item.originalPrice && (
                              <div className="text-xs text-gray-500 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </div>
                            )}
                            <div className="text-lg font-bold text-[#6B4E37] dark:text-[#E1B168]">
                              ${item.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className={viewMode === 'list' ? 'py-2' : ''}>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 w-full">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {item.weeklyBuys} weekly buys
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          <Calendar className="w-3 h-3" />
                          {item.weeklyReviews} reviews/week
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button 
                        className="w-full bg-[#2CA6A4] hover:bg-[#2CA6A4]/90 text-white cursor-pointer"
                        disabled={!item.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center py-16"
              variants={cardFadeUp}
            >
              <Coffee className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No items found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                }}
              >
                Clear all filters
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
