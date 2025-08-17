"use client";

import { useState } from 'react';
import { 
  ButtonExample, 
  FormExample, 
  CardExample, 
  LogoExample, 
  StarRating, 
  ToggleExample, 
  BadgeExample 
} from '@/schema/uiElements.schema';

export function useUIElementsState() {
  const [activeTab, setActiveTab] = useState('buttons');

  const buttonExamples: ButtonExample[] = [
    { label: 'Order Now', variant: 'primary', size: 'md' },
    { label: 'Learn More', variant: 'secondary', size: 'md' },
    { label: 'View Menu', variant: 'outline', size: 'md' },
    { label: 'Small Button', variant: 'primary', size: 'sm' },
    { label: 'Large CTA', variant: 'primary', size: 'lg' }
  ];

  const formExamples: FormExample[] = [
    { type: 'input', placeholder: 'Enter your email', label: 'Email Address' },
    { type: 'input', placeholder: 'Your full name', label: 'Full Name' },
    { type: 'textarea', placeholder: 'Special instructions...', label: 'Order Notes' },
    { type: 'select', placeholder: 'Choose size', label: 'Cup Size' }
  ];

  const cardExamples: CardExample[] = [
    {
      title: 'Ethiopian Yirgacheffe',
      description: 'Bright and floral with notes of citrus and tea',
      variant: 'featured'
    },
    {
      title: 'Colombian Supremo',
      description: 'Rich and balanced with chocolate undertones',
      variant: 'default'
    },
    {
      title: 'Quick Order',
      description: 'Reorder your favorite',
      variant: 'compact'
    }
  ];

  const logoExamples: LogoExample[] = [
    { size: "medium", label: "Medium Logo" },
    { size: "small", label: "Small Logo Black" },
    { size: "small", label: "Small Logo White" },
    { size: "small", label: "Small Logo Normal" }
  ];

  const starRatings: StarRating[] = [
    { rating: 5, label: "Excellent" },
    { rating: 4, label: "Very Good" },
    { rating: 3, label: "Good" },
    { rating: 2, label: "Fair" },
    { rating: 1, label: "Poor" }
  ];

  const toggleExamples: ToggleExample[] = [
    { id: "notifications", label: "Notifications", checked: true },
    { id: "darkmode", label: "Dark Mode", checked: false },
    { id: "emailUpdates", label: "Email Updates", checked: true },
    { id: "soundEffects", label: "Sound Effects", checked: false }
  ];

  const badgeExamples: BadgeExample[] = [
    { label: "New", variant: "success", color: "#10B981" },
    { label: "Popular", variant: "primary", color: "#6B4E37" },
    { label: "Hot", variant: "danger", color: "#EF4444" },
    { label: "Limited", variant: "warning", color: "#F59E0B" },
    { label: "Sold Out", variant: "neutral", color: "#6B7280" }
  ];

  return {
    activeTab,
    setActiveTab,
    buttonExamples,
    formExamples,
    cardExamples,
    logoExamples,
    starRatings,
    toggleExamples,
    badgeExamples
  };
}
