import React from "react";
import { MenuItem } from './menuItem.schema';

// Shell component interfaces
export interface StaffShellProps {
  user: any; // Will be replaced with User from user.schema
  children: React.ReactNode;
  currentPath?: string;
  className?: string;
}

export interface ClientShellProps {
  user: any; // Will be replaced with User from user.schema  
  children: React.ReactNode;
  className?: string;
}

// Navigation interfaces
export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
  external?: boolean;
}

// Table component interfaces
export interface StocksTableProps {
  searchQuery: string;
  sortBy: string;
  filterBy: string;
}

export interface OrdersTableProps {
  orders: any[]; // Will be replaced with Order[] from order.schema
  onStatusChange?: (orderId: string, newStatus: any[]) => void; // Will be typed properly
  showActions?: boolean;
  className?: string;
}

// Card component interfaces
export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  initials?: string;
  rating?: number;
  className?: string;
  delay?: number;
}

// Counter component interfaces
export interface UseStatsCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  end?: number;
  start?: number;
  decimals?: number;
}

// Carousel interfaces
export interface RecoCarouselProps {
  items: MenuItem[]; // MenuItem array from menuItem.schema
  className?: string;
}

// Form component interfaces
export interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// Modal/Dialog interfaces
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

// Menu component interfaces
export interface MenuHeaderSectionProps {
  title: string;
  subtitle: string;
}

export interface PromotionalSectionProps {
  onViewCombos: () => void;
  onViewPromos: () => void;
}

export interface ControlsSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  filterType: string;
  onFilterChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  itemCount: number;
  onClearSearch: () => void;
  onClearFilterType: () => void;
}

export interface MenuDisplaySectionProps {
  filteredItems: MenuItem[] | any[]; // Support both MenuItem and MenuItemResponse
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  searchQuery: string;
}

// Banner component interfaces
export interface ComboBannerProps {
  onViewCombos: () => void;
}

export interface UseComboBannerProps {
  onViewCombos: () => void;
}

export interface SaleBannersProps {
  onViewPromos: () => void;
}

export interface UseSaleBannersProps {
  onViewPromos: () => void;
}

// Control component interfaces
export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface UseSearchBarProps {
  onChange: (value: string) => void;
}

export interface SortFilterProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  filterType: string;
  onFilterChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export interface UseSortFilterProps {
  sortBy: string;
}

export interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  itemCount: number;
}

export interface UseViewToggleProps {
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export interface ActiveFiltersProps {
  searchQuery: string;
  filterType: string;
  onClearSearch: () => void;
  onClearFilterType: () => void;
}

export interface UseActiveFiltersProps {
  filterType: string;
}

// Menu Item Card interfaces
export interface MenuItemCardProps {
  item: MenuItem | any; // Support both MenuItem and MenuItemResponse from database
  index: number;
  viewMode: 'grid' | 'list';
  onAddToCart?: (item: MenuItem | any) => void;
}

export interface UseMenuItemCardProps {
  item: MenuItem | any; // Support both MenuItem and MenuItemResponse from database
  onAddToCart?: (item: MenuItem | any) => void;
}

// Dashboard section interfaces
export interface ProfileDisplaySectionProps {
  user: any; // Will be replaced with User from user.schema
}

export interface FavoritesDisplaySectionProps {
  items: MenuItem[];
  onQuickOrder?: (item: MenuItem) => void;
}

export interface RecommendationDisplaySectionProps {
  items: MenuItem[];
  onAddToCart?: (item: MenuItem) => void;
}

export interface OrderHistoryDisplaySectionProps {
  orders: any[]; // Will be replaced with Order[] from order.schema
}

// Generic component props
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

export interface BaseComponentProps extends WithClassName, WithChildren {
  id?: string;
}

// Auth components
export interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

// Gallery and feature components  
export interface GalleryCardProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  className?: string;
}

// FeatureCardProps moved to cards.schema.ts to avoid conflicts

// Staff components
export interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  shift: string;
  phone: string;
  lastActive: string;
  avatar?: string;
}

export interface StaffFormData {
  name: string;
  email: string;
  role: string;
  shift: string;
  phone: string;
  avatar?: File;
}

export interface StaffFormErrors {
  name?: string;
  email?: string;
  role?: string;
  shift?: string;
  phone?: string;
  avatar?: string;
}

export interface StaffFormProps {
  initialData?: Partial<StaffFormData>;
  onSubmit: (data: StaffFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

// Header components
export interface DynamicHeaderProps extends HeaderProps {
  variant?: 'default' | 'authenticated' | 'admin';
}

export interface AuthenticatedHeaderProps {
  user: User;
  onLogout?: () => void;
  className?: string;
  cartItemCount?: number;
}

// Stats counter components
export interface StatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  end?: number;
  start?: number;
  decimals?: number;
}

// UI Components
export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  className?: string;
}

// Animated component props moved to animatedComponents.schema.ts to avoid conflicts

// Import User type
import type { User } from './user.schema';
import type { HeaderProps } from './header.schema';
