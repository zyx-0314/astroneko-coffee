import React from 'react';

export interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: any; // Framer Motion Variants type
  staggerChildren?: number;
  delay?: number;
}

export interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  animation?: 'bounce' | 'pulse' | 'shake' | 'scale';
}

export interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export interface AnimatedBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  animation?: 'pulse' | 'bounce' | 'glow';
}

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
