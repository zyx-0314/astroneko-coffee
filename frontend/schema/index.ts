// Main schema exports for better organization

// Core business schemas
export * from './menuItem.schema';
export * from './menuItemValidation.schema';
export * from './user.schema';
// Export specific items from staff.schema to avoid UserRole conflict
export type { Staff, StaffSummary, CreateStaffRequest, UpdateStaffRequest, StaffResponse, StaffListResponse, CreateStaffFormData, UpdateStaffFormData } from './staff.schema';
export { EmploymentType, UserSex, StaffUserRole, CreateStaffSchema, UpdateStaffSchema, formatShiftTime, getFullName, maskSensitiveData, getRoleBadgeColor, getRoleDisplayName } from './staff.schema';
export * from './order.schema';
export * from './stock.schema';
export * from './stats.schema';

// Component and UI schemas
export * from './components.schema';
export * from './colors.schema';
export * from './uiElements.schema';
export * from './typography.schema';
export * from './header.schema';
export * from './animatedComponents.schema';
export * from './auth.schema';

// Card schemas (specific exports to avoid conflicts)
export type { 
  InfoCardProps, 
  ContentCardProps, 
  PlaceholderCardProps,
  FeatureCardProps as CardFeatureProps  // Renamed to avoid conflict
} from './cards.schema';
