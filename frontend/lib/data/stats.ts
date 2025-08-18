import { SalesData, OrdersByHour, CategoryMix, DashboardStats } from '@/schema/stats.schema';

// Static data for charts
export const salesData: SalesData[] = [
  { date: '2025-08-12', sales: 1245.50, orders: 89 },
  { date: '2025-08-13', sales: 1567.25, orders: 112 },
  { date: '2025-08-14', sales: 1389.75, orders: 98 },
  { date: '2025-08-15', sales: 1678.00, orders: 125 },
  { date: '2025-08-16', sales: 1456.50, orders: 104 },
  { date: '2025-08-17', sales: 1789.25, orders: 134 },
  { date: '2025-08-18', sales: 892.75, orders: 67 } // Today (partial)
];

export const ordersByHour: OrdersByHour[] = [
  { hour: 6, orders: 2 },
  { hour: 7, orders: 8 },
  { hour: 8, orders: 15 },
  { hour: 9, orders: 23 },
  { hour: 10, orders: 18 },
  { hour: 11, orders: 12 },
  { hour: 12, orders: 28 },
  { hour: 13, orders: 22 },
  { hour: 14, orders: 16 },
  { hour: 15, orders: 14 },
  { hour: 16, orders: 19 },
  { hour: 17, orders: 25 },
  { hour: 18, orders: 20 },
  { hour: 19, orders: 8 },
  { hour: 20, orders: 5 },
  { hour: 21, orders: 3 }
];

export const categoryMix: CategoryMix[] = [
  { category: 'Coffee', percentage: 42, value: 374.75 },
  { category: 'Tea', percentage: 15, value: 133.95 },
  { category: 'Pastries', percentage: 28, value: 249.95 },
  { category: 'Sandwiches', percentage: 8, value: 71.42 },
  { category: 'Desserts', percentage: 5, value: 44.64 },
  { category: 'Beverages', percentage: 2, value: 17.86 }
];

// Today's stats (static)
export const dashboardStats: DashboardStats = {
  todaySales: 892.75,
  ordersInQueue: 5,
  avgPrepTime: 6.2,
  lowStockItems: 3,
  staffOnDuty: 6
};

export function getTodaysOrders(): number {
  const today = salesData[salesData.length - 1];
  return today ? today.orders : 0;
}

export function getWeeklySales(): number {
  return salesData.slice(-7).reduce((sum, day) => sum + day.sales, 0);
}

export function getPeakHour(): OrdersByHour {
  return ordersByHour.reduce((peak, current) => 
    current.orders > peak.orders ? current : peak
  );
}
