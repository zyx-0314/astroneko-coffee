// Dashboard statistics and analytics interfaces

// Sales data for charts and analytics
export interface SalesData {
  date: string; // YYYY-MM-DD format
  sales: number;
  orders: number;
}

// Orders by hour data for time-based analytics
export interface OrdersByHour {
  hour: number; // 0-23
  orders: number;
}

// Category mix data for product performance
export interface CategoryMix {
  category: string;
  percentage: number;
  value: number;
}

// Main dashboard statistics
export interface DashboardStats {
  todaySales: number;
  ordersInQueue: number;
  avgPrepTime: number; // in minutes
  lowStockItems: number;
  staffOnDuty: number;
}

// Revenue analytics interface
export interface RevenueAnalytics {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  growth: {
    daily: number; // percentage
    weekly: number; // percentage
    monthly: number; // percentage
  };
}

// Performance metrics interface
export interface PerformanceMetrics {
  avgOrderValue: number;
  peakHours: number[]; // Array of hours (0-23)
  topSellingItems: string[]; // Array of menu item IDs
  customerSatisfaction: number; // 0-5 rating
  orderAccuracy: number; // percentage
}

// Time range type for analytics filtering
export type TimeRange = 'today' | 'week' | 'month' | 'quarter' | 'year';

// Chart data type for flexible chart rendering
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

// Analytics filter options
export interface AnalyticsFilters {
  timeRange: TimeRange;
  category?: string;
  staffMember?: string;
  dateFrom?: string; // ISO date string
  dateTo?: string; // ISO date string
}

// Business intelligence metrics
export interface BusinessMetrics {
  revenue: RevenueAnalytics;
  performance: PerformanceMetrics;
  inventory: {
    turnoverRate: number;
    stockoutDays: number;
    wastagePercentage: number;
  };
  staff: {
    productivity: number;
    attendance: number;
    customerServiceRating: number;
  };
}
