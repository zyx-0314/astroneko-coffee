'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Coffee, Users, ShoppingCart, Target, Clock } from 'lucide-react';

interface RevenueData {
  period: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  profit: number;
  expenses: number;
}

interface CategorySales {
  category: string;
  revenue: number;
  orders: number;
  percentage: number;
}

interface HourlySales {
  hour: string;
  revenue: number;
  orders: number;
}

const mockRevenueData: RevenueData[] = [
  {
    period: 'Today',
    revenue: 1250.75,
    orders: 85,
    averageOrderValue: 14.71,
    profit: 625.38,
    expenses: 625.37
  },
  {
    period: 'Yesterday',
    revenue: 1180.50,
    orders: 78,
    averageOrderValue: 15.13,
    profit: 590.25,
    expenses: 590.25
  },
  {
    period: 'This Week',
    revenue: 8750.25,
    orders: 596,
    averageOrderValue: 14.68,
    profit: 4375.13,
    expenses: 4375.12
  },
  {
    period: 'Last Week',
    revenue: 8200.00,
    orders: 568,
    averageOrderValue: 14.44,
    profit: 4100.00,
    expenses: 4100.00
  },
  {
    period: 'This Month',
    revenue: 35250.80,
    orders: 2401,
    averageOrderValue: 14.68,
    profit: 17625.40,
    expenses: 17625.40
  },
  {
    period: 'Last Month',
    revenue: 33200.50,
    orders: 2280,
    averageOrderValue: 14.56,
    profit: 16600.25,
    expenses: 16600.25
  }
];

const mockCategorySales: CategorySales[] = [
  { category: 'Beverages', revenue: 18500.25, orders: 1420, percentage: 52.5 },
  { category: 'Food', revenue: 12750.50, orders: 680, percentage: 36.2 },
  { category: 'Desserts', revenue: 2850.75, orders: 185, percentage: 8.1 },
  { category: 'Snacks', revenue: 1149.30, orders: 116, percentage: 3.2 }
];

const mockHourlySales: HourlySales[] = [
  { hour: '06:00', revenue: 125.50, orders: 8 },
  { hour: '07:00', revenue: 485.75, orders: 32 },
  { hour: '08:00', revenue: 720.25, orders: 48 },
  { hour: '09:00', revenue: 615.80, orders: 41 },
  { hour: '10:00', revenue: 520.40, orders: 35 },
  { hour: '11:00', revenue: 680.90, orders: 45 },
  { hour: '12:00', revenue: 890.25, orders: 58 },
  { hour: '13:00', revenue: 1150.75, orders: 76 },
  { hour: '14:00', revenue: 945.30, orders: 63 },
  { hour: '15:00', revenue: 780.50, orders: 52 },
  { hour: '16:00', revenue: 650.25, orders: 43 },
  { hour: '17:00', revenue: 520.80, orders: 35 },
  { hour: '18:00', revenue: 385.40, orders: 26 },
  { hour: '19:00', revenue: 280.15, orders: 19 },
  { hour: '20:00', revenue: 165.75, orders: 11 }
];

const mockExpenseBreakdown = [
  { category: 'Ingredients & Supplies', amount: 8500.25, percentage: 48.2 },
  { category: 'Staff Wages', amount: 6200.80, percentage: 35.2 },
  { category: 'Utilities', amount: 1250.40, percentage: 7.1 },
  { category: 'Equipment Maintenance', amount: 850.60, percentage: 4.8 },
  { category: 'Marketing', amount: 450.75, percentage: 2.6 },
  { category: 'Other', amount: 372.20, percentage: 2.1 }
];

export function AnalyticsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [selectedView, setSelectedView] = useState('overview');

  const currentData = mockRevenueData.find(data => data.period === selectedPeriod) || mockRevenueData[4];
  const previousData = mockRevenueData.find(data => {
    const periodMap: { [key: string]: string } = {
      'Today': 'Yesterday',
      'This Week': 'Last Week',
      'This Month': 'Last Month'
    };
    return data.period === periodMap[selectedPeriod];
  });

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const revenueChange = previousData ? getPercentageChange(currentData.revenue, previousData.revenue) : 0;
  const ordersChange = previousData ? getPercentageChange(currentData.orders, previousData.orders) : 0;
  const profitChange = previousData ? getPercentageChange(currentData.profit, previousData.profit) : 0;

  const formatCurrency = (amount: number) => `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  const formatPercentage = (percentage: number) => `${percentage >= 0 ? '+' : ''}${percentage.toFixed(1)}%`;

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Financial Analytics</CardTitle>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="This Week">This Week</SelectItem>
                  <SelectItem value="This Month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(currentData.revenue)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {revenueChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(revenueChange)}
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{currentData.orders.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {ordersChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(ordersChange)}
                  </span>
                </div>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold">{formatCurrency(currentData.averageOrderValue)}</p>
                <p className="text-xs text-gray-500 mt-1">Per transaction</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold">{formatCurrency(currentData.profit)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {profitChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${profitChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(profitChange)}
                  </span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Sales Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCategorySales.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.category}</span>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(category.revenue)}</p>
                      <p className="text-xs text-gray-600">{category.orders} orders</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peak Hours Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Sales Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockHourlySales
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 8)
                .map((hour) => (
                <div key={hour.hour} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{hour.hour}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(hour.revenue)}</p>
                    <p className="text-xs text-gray-600">{hour.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedView === 'detailed' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockExpenseBreakdown.map((expense) => (
                  <div key={expense.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{expense.category}</span>
                      <span className="font-semibold">{formatCurrency(expense.amount)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${expense.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{expense.percentage}%</span>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3 mt-4">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Expenses</span>
                    <span>{formatCurrency(currentData.expenses)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profit Margin Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Profit Margin Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Gross Revenue</p>
                    <p className="text-xl font-bold text-blue-600">
                      {formatCurrency(currentData.revenue)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Expenses</p>
                    <p className="text-xl font-bold text-red-600">
                      {formatCurrency(currentData.expenses)}
                    </p>
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Net Profit</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(currentData.profit)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {((currentData.profit / currentData.revenue) * 100).toFixed(1)}% Margin
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Break-even Point</span>
                    <span className="font-medium">{formatCurrency(currentData.expenses)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit per Order</span>
                    <span className="font-medium">
                      {formatCurrency(currentData.profit / currentData.orders)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per Order</span>
                    <span className="font-medium">
                      {formatCurrency(currentData.expenses / currentData.orders)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Financial Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Goals & Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Monthly Revenue Target</p>
              <p className="text-xl font-bold">$40,000</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(currentData.revenue / 40000) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {((currentData.revenue / 40000) * 100).toFixed(1)}% achieved
                </p>
              </div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Monthly Orders Target</p>
              <p className="text-xl font-bold">2,500</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(currentData.orders / 2500) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {((currentData.orders / 2500) * 100).toFixed(1)}% achieved
                </p>
              </div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Profit Margin Target</p>
              <p className="text-xl font-bold">55%</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${((currentData.profit / currentData.revenue) * 100 / 55) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {((currentData.profit / currentData.revenue) * 100).toFixed(1)}% current
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
