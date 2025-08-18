"use client"

import React, { useState } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Clock, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StocksTable } from '@/components/common/StocksTable';
import { ErrorBanner, EmptyState } from '@/components/common/EmptyState';
import { dashboardStats, salesData, ordersByHour, categoryMix } from '@/lib/data/stats';
import { stockItems, getLowStockItems } from '@/lib/data/stocks';
import { User as UserType } from '@/schema/user.schema';
import { users } from '@/lib/data/users';
import ManagerHeader from '@/components/header/Manager';

// Mock current user - in real app this would come from auth context
const currentUser: UserType = {
  id: '5',
  name: 'David Kim',
  email: 'david.kim@astroneko.com',
  role: 'manager',
  avatar: '/placeholder/avatars/david.jpg',
  shift: { start: '07:00', clockInTime: '06:55' }
};

// Simple chart components (static placeholders)
function SalesChart() {
  const maxSales = Math.max(...salesData.map(d => d.sales));
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Last 7 days</span>
        <span>Peak: ${maxSales.toLocaleString()}</span>
      </div>
      <div className="flex items-end space-x-2 h-32">
        {salesData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-2">
            <div 
              className="w-full bg-primary rounded-sm"
              style={{ 
                height: `${(data.sales / maxSales) * 100}%`,
                minHeight: '8px'
              }}
            />
            <span className="text-xs text-muted-foreground">
              {new Date(data.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersByHourChart() {
  const maxOrders = Math.max(...ordersByHour.map(d => d.orders));
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Today&apos;s hourly distribution</span>
        <span>Peak: {maxOrders} orders</span>
      </div>
      <div className="flex items-end space-x-1 h-32">
        {ordersByHour.filter(d => d.orders > 0).map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-2">
            <div 
              className="w-full bg-blue-500 rounded-sm"
              style={{ 
                height: `${(data.orders / maxOrders) * 100}%`,
                minHeight: '4px'
              }}
            />
            <span className="text-xs text-muted-foreground">
              {data.hour}:00
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryMixChart() {
  return (
    <div className="space-y-4">
      {categoryMix.map((category, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{category.category}</span>
            <span className="text-muted-foreground">{category.percentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-500"
              style={{ width: `${category.percentage}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground text-right">
            ${category.value.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ManagerDashboard() {
  const [showBackendBanner, setShowBackendBanner] = useState(true);
  
  const lowStockItems = getLowStockItems();
  const staffOnDuty = users.filter(user => 
    user.role !== 'client' && user.shift?.clockInTime
  );

  return (
    <div >
      <div className="space-y-6">
        {/* Backend Banner */}
        {showBackendBanner && (
          <ErrorBanner
            type="backend-down"
            onDismiss={() => setShowBackendBanner(false)}
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Sales</CardTitle>
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">${dashboardStats.todaySales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Queue</CardTitle>
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{dashboardStats.ordersInQueue}</div>
              <p className="text-xs text-muted-foreground">
                Active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Prep Time</CardTitle>
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{dashboardStats.avgPrepTime}m</div>
              <p className="text-xs text-green-600">
                -0.8m target
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-red-600">{dashboardStats.lowStockItems}</div>
              <p className="text-xs text-muted-foreground">
                Restock
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Staff</CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{dashboardStats.staffOnDuty}</div>
              <p className="text-xs text-muted-foreground">
                On duty
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Sales Trend</span>
              </CardTitle>
              <CardDescription className="text-sm">Revenue over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Orders by Hour</span>
              </CardTitle>
              <CardDescription className="text-sm">Today&apos;s distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersByHourChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <PieChart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Category Mix</span>
              </CardTitle>
              <CardDescription className="text-sm">Sales by category</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryMixChart />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* Low Stock Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600 text-base sm:text-lg">Critical Stock Levels</CardTitle>
                  <CardDescription className="text-sm">
                    Items that need immediate attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <StocksTable 
                    stocks={lowStockItems}
                    showSupplier={false}
                    showLastRestocked={true}
                    filterStatus="danger"
                  />
                </CardContent>
              </Card>

              {/* Full Inventory Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Inventory Overview</CardTitle>
                  <CardDescription className="text-sm">
                    Complete stock status across all categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <StocksTable 
                    stocks={stockItems.slice(0, 5)} 
                    showSupplier={true}
                    showLastRestocked={false}
                  />
                  <div className="mt-4 text-center">
                    <button className="text-sm text-primary hover:underline">
                      View All Items ({stockItems.length} total)
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle>Staff Overview</CardTitle>
                <CardDescription>
                  Current staff status and shift information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {staffOnDuty.map((staff) => (
                    <div key={staff.id} className="p-3 sm:p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs sm:text-sm font-medium">
                            {staff.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base font-medium truncate">{staff.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                            {staff.role}
                          </p>
                          {staff.shift && (
                            <p className="text-xs text-muted-foreground hidden sm:block">
                              Since {staff.shift.clockInTime}
                            </p>
                          )}
                        </div>
                        {staff.isActive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>
                    Detailed performance metrics and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmptyState
                    title="Analytics Coming Soon"
                    description="Advanced analytics dashboard with detailed reports, forecasting, and business insights will be available soon."
                    actionLabel="Request Early Access"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
