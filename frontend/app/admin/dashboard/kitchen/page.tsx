"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Clock, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrdersTable } from '@/components/common/OrdersTable';
import { ErrorBanner, EmptyState } from '@/components/common/EmptyState';
import { Order, OrderStatus } from '@/schema/order.schema';
import { orders, getPrimaryStatus } from '@/lib/data/orders';
import { User as UserType } from '@/schema/user.schema';
import { users, getKitchenStaff } from '@/lib/data/users';

// Mock current user - in real app this would come from auth context
const currentUser: UserType = {
  id: '3',
  name: 'Mike Rodriguez',
  email: 'mike.rodriguez@astroneko.com',
  role: 'cook',
  avatar: '/placeholder/avatars/mike.jpg',
  shift: { start: '07:30', clockInTime: '07:25' },
  isActive: true
};

export default function KitchenDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [completedBy, setCompletedBy] = useState('');
  const [showFeatureBanner, setShowFeatureBanner] = useState(true);
  const [localOrders, setLocalOrders] = useState(orders);
  
  // Filter orders for kitchen view
  const activeOrders = localOrders.filter(order => 
    !order.status.includes('COMPLETE') && 
    !order.status.includes('CANCELLED')
  );
  
  const completedTodayOrders = localOrders.filter(order => 
    order.status.includes('COMPLETE') &&
    new Date(order.placedAt).toDateString() === new Date().toDateString()
  );
  
  const kitchenStaff = getKitchenStaff();
  const allStaff = users.filter(user => user.role !== 'client');

  const handleStatusChange = (orderId: string, newStatuses: OrderStatus[]) => {
    const primaryStatus = getPrimaryStatus(newStatuses);
    
    if (primaryStatus === 'COMPLETE') {
      const order = localOrders.find(o => o.id === orderId);
      if (order) {
        setSelectedOrder(order);
        setShowCompleteDialog(true);
        return;
      }
    }
    
    setLocalOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatuses, assignedTo: currentUser.id }
        : order
    ));
  };

  const handleCompleteOrder = () => {
    if (selectedOrder && completedBy) {
      setLocalOrders(prev => prev.map(order => 
        order.id === selectedOrder.id 
          ? { 
              ...order, 
              status: ['COMPLETE'],
              completedBy,
              assignedTo: currentUser.id
            }
          : order
      ));
      
      setShowCompleteDialog(false);
      setSelectedOrder(null);
      setCompletedBy('');
    }
  };

  const toggleOrderFlag = (orderId: string, flag: OrderStatus) => {
    setLocalOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const currentStatuses = order.status;
        const hasFlag = currentStatuses.includes(flag);
        
        if (hasFlag) {
          // Remove the flag
          return { ...order, status: currentStatuses.filter(s => s !== flag) };
        } else {
          // Add the flag
          return { ...order, status: [...currentStatuses, flag] };
        }
      }
      return order;
    }));
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Feature Banner */}
        {showFeatureBanner && (
          <ErrorBanner
            type="feature-progress"
            onDismiss={() => setShowFeatureBanner(false)}
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Active Orders</CardTitle>
              <ChefHat className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{activeOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                In prep
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Prep Time</CardTitle>
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">8m</div>
              <p className="text-xs text-muted-foreground">
                Target: 10m
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{completedTodayOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                Today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Staff</CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{kitchenStaff.length}</div>
              <p className="text-xs text-muted-foreground">
                Active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed Today</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Orders to Prepare</CardTitle>
                <CardDescription>
                  Tap orders to update status and manage preparation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeOrders.length > 0 ? (
                  <div className="space-y-4">
                    <OrdersTable
                      orders={activeOrders}
                      onOrderSelect={(order) => setSelectedOrder(order)}
                      selectedOrderId={selectedOrder?.id}
                      showCustomer={true}
                      showTotal={false}
                      showAssignedTo={true}
                      staff={allStaff}
                      viewMode="kitchen"
                      onStatusChange={handleStatusChange}
                    />

                    {/* Order Flags Section */}
                        {selectedOrder && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 sm:mt-6 p-3 sm:p-4 bg-accent/50 rounded-lg"
                      >
                        <h3 className="font-medium mb-3 text-sm sm:text-base">
                          Order #{selectedOrder.queueNo} - Additional Flags
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(['HAS_PROBLEM', 'CANCELLED', 'RETURN', 'DELAYED'] as OrderStatus[]).map((flag) => (
                            <Button
                              key={flag}
                              variant={selectedOrder.status.includes(flag) ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => toggleOrderFlag(selectedOrder.id, flag)}
                              className="text-xs sm:text-sm"
                            >
                              {flag.replace('_', ' ')}
                            </Button>
                          ))}
                        </div>                        {selectedOrder.status.includes('HAS_PROBLEM') && (
                          <div className="mt-3 p-3 bg-destructive/10 rounded border border-destructive/20">
                            <div className="flex items-center space-x-2 text-destructive">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-medium">Problem Flagged</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              This order requires attention. Please check with management or front desk.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <EmptyState
                    title="No Active Orders"
                    description="All orders have been completed. Take a break or prep for the next rush!"
                    actionLabel="View Completed Orders"
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Orders Today</CardTitle>
                <CardDescription>
                  Orders finished by the kitchen team today
                </CardDescription>
              </CardHeader>
              <CardContent>
                {completedTodayOrders.length > 0 ? (
                  <OrdersTable
                    orders={completedTodayOrders}
                    showCustomer={true}
                    showTotal={true}
                    showAssignedTo={true}
                    staff={allStaff}
                    viewMode="kitchen"
                  />
                ) : (
                  <EmptyState
                    title="No Completed Orders"
                    description="No orders have been completed today yet."
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Complete Order Dialog */}
        <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Order</DialogTitle>
              <DialogDescription>
                Who completed this order? This information will be recorded for tracking.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <label className="text-sm font-medium mb-2 block">
                Completed by
              </label>
              <Select value={completedBy} onValueChange={setCompletedBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {kitchenStaff.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name} ({staff.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCompleteOrder} disabled={!completedBy}>
                Mark Complete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
