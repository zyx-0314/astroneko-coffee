"use client"

import React, { useState } from 'react';
import { CreditCard, Clock, User, Package, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { OrdersTable } from '@/components/table/OrdersTable';
import { ErrorBanner, EmptyState } from '@/components/ui/empty-state';
import { Order, OrderItem, OrderStatus } from '@/schema/order.schema';
import { orders } from '@/lib/data/orders';
import { User as UserType } from '@/schema/user.schema';
import { users } from '@/lib/data/users';

// Mock current user - in real app this would come from auth context
const currentUser: UserType = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@astroneko.com',
  role: 'cashier',
  avatar: '/placeholder/avatars/alex.jpg',
  shift: { start: '08:00', clockInTime: '07:55' }
};

export default function FrontDeskDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showMaintenanceBanner, setShowMaintenanceBanner] = useState(true);
  
  // Filter orders that are not yet checked out (not COMPLETE)
  const activeOrders = orders.filter(order => !order.status.includes('COMPLETE'));
  const staff = users.filter(user => user.role !== 'client');

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCheckout = () => {
    if (selectedOrder) {
      // In real app, this would call API to process checkout
      alert(`Checkout processed for ${selectedOrder.customerName} - $${selectedOrder.total.toFixed(2)}`);
      setSelectedOrder(null);
    }
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Maintenance Banner */}
        {showMaintenanceBanner && (
          <ErrorBanner
            type="maintenance"
            onDismiss={() => setShowMaintenanceBanner(false)}
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Queue Length</CardTitle>
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{activeOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                Active orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Wait Time</CardTitle>
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">12m</div>
              <p className="text-xs text-muted-foreground">
                Average
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Today&apos;s Orders</CardTitle>
              <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">67</div>
              <p className="text-xs text-muted-foreground">
                +12% yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Issues</CardTitle>
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Attention needed
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Orders Queue */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Customer Queue</CardTitle>
                <CardDescription className="text-sm">
                  Orders awaiting checkout or completion
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                {activeOrders.length > 0 ? (
                  <OrdersTable
                    orders={activeOrders}
                    onOrderSelect={handleOrderSelect}
                    selectedOrderId={selectedOrder?.id}
                    showCustomer={true}
                    showTotal={true}
                    showAssignedTo={true}
                    staff={staff}
                    viewMode="front-desk"
                  />
                ) : (
                  <EmptyState
                    title="No Active Orders"
                    description="All orders have been completed. Great work!"
                    actionLabel="View Order History"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Board - Order Details */}
          <div className="xl:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Main Board</CardTitle>
                <CardDescription className="text-sm">
                  {selectedOrder ? 'Order details and checkout' : 'Select an order to view details'}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                {selectedOrder ? (
                  <div className="space-y-4">
                    {/* Customer Info */}
                    <div>
                      <h3 className="font-medium mb-2">Customer</h3>
                      <div className="flex items-center justify-between">
                        <span>{selectedOrder.customerName}</span>
                        {selectedOrder.customerId && (
                          <Badge variant="secondary">Member</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Queue #{selectedOrder.queueNo}
                      </div>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium mb-2">Order Items</h3>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item: OrderItem, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.quantity}x {item.menuItem.name}
                            </span>
                            <span>${(item.quantity * item.menuItem.price).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>

                    {/* Notes */}
                    {selectedOrder.notes && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Notes</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedOrder.notes}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Order Status */}
                    <div>
                      <h3 className="font-medium mb-2">Status</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedOrder.status.map((status: OrderStatus, index: number) => (
                          <Badge key={index} variant="outline">
                            {status.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button 
                        onClick={handleCheckout} 
                        className="w-full"
                        disabled={!selectedOrder.status.includes('READY')}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        {selectedOrder.status.includes('READY') 
                          ? 'Process Checkout' 
                          : 'Waiting for Kitchen'}
                      </Button>
                      <Button variant="outline" className="w-full">
                        Print Receipt
                      </Button>
                    </div>
                  </div>
                ) : (
                  <EmptyState
                    title="No Order Selected"
                    description="Click on an order from the queue to view details and process checkout."
                    actionLabel="View All Orders"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
