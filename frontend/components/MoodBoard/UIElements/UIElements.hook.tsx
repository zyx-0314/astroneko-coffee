"use client";

import { useState } from 'react';
import { ButtonExample, FormExample, CardExample } from '@/schema/uiElements.schema';

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

  return {
    activeTab,
    setActiveTab,
    buttonExamples,
    formExamples,
    cardExamples
  };
}
