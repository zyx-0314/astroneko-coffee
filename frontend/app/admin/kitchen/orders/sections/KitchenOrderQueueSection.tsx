'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, CheckCircle, AlertCircle, Eye, ChefHat, Coffee, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  specifications?: string;
  status: 'pending' | 'preparing' | 'ready';
  preparationTime?: number; // in minutes
  category: 'beverage' | 'food' | 'dessert';
}

interface KitchenOrder {
  id: string;
  customerName: string;
  tableNumber?: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  items: OrderItem[];
  status: 'received' | 'preparing' | 'ready' | 'delivered';
  orderTime: string;
  estimatedCompletionTime?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  specialRequests?: string;
  notes?: string;
}

const mockKitchenOrders: KitchenOrder[] = [
  {
    id: 'KO-001',
    customerName: 'John Doe',
    tableNumber: '5',
    orderType: 'dine-in',
    items: [
      { 
        id: '1', 
        name: 'Cappuccino', 
        quantity: 2, 
        specifications: 'Extra hot, oat milk',
        status: 'ready',
        preparationTime: 5,
        category: 'beverage'
      },
      { 
        id: '2', 
        name: 'Grilled Sandwich', 
        quantity: 1, 
        specifications: 'No tomatoes',
        status: 'preparing',
        preparationTime: 12,
        category: 'food'
      }
    ],
    status: 'preparing',
    orderTime: '2024-08-20T10:30:00',
    estimatedCompletionTime: '10:47',
    priority: 'normal',
    specialRequests: 'Customer has food allergies - no nuts'
  },
  {
    id: 'KO-002',
    customerName: 'Jane Smith',
    orderType: 'takeaway',
    items: [
      { 
        id: '3', 
        name: 'Latte', 
        quantity: 1, 
        specifications: 'Large size',
        status: 'preparing',
        preparationTime: 4,
        category: 'beverage'
      },
      { 
        id: '4', 
        name: 'Chocolate Muffin', 
        quantity: 2,
        status: 'pending',
        preparationTime: 2,
        category: 'dessert'
      }
    ],
    status: 'preparing',
    orderTime: '2024-08-20T10:45:00',
    estimatedCompletionTime: '10:51',
    priority: 'high'
  },
  {
    id: 'KO-003',
    customerName: 'Bob Johnson',
    orderType: 'delivery',
    items: [
      { 
        id: '5', 
        name: 'Americano', 
        quantity: 3,
        status: 'pending',
        preparationTime: 3,
        category: 'beverage'
      }
    ],
    status: 'received',
    orderTime: '2024-08-20T11:00:00',
    priority: 'urgent',
    notes: 'Rush order for office meeting'
  }
];

export function KitchenOrderQueueSection() {
  const [orders, setOrders] = useState<KitchenOrder[]>(mockKitchenOrders);
  const [selectedOrder, setSelectedOrder] = useState<KitchenOrder | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const canUpdate = true; // Role check handled by parent RoleGuard

  const handleViewOrder = (order: KitchenOrder) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: KitchenOrder['status']) => {
    if (!canUpdate) return;
    
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleUpdateItemStatus = (orderId: string, itemId: string, newStatus: OrderItem['status']) => {
    if (!canUpdate) return;
    
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const updatedItems = order.items.map(item => 
          item.id === itemId ? { ...item, status: newStatus } : item
        );
        
        // Auto-update order status based on item statuses
        const allReady = updatedItems.every(item => item.status === 'ready');
        const anyPreparing = updatedItems.some(item => item.status === 'preparing');
        
        let orderStatus: KitchenOrder['status'] = order.status;
        if (allReady) {
          orderStatus = 'ready';
        } else if (anyPreparing) {
          orderStatus = 'preparing';
        }
        
        return { ...order, items: updatedItems, status: orderStatus };
      }
      return order;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received': return <Clock className="h-4 w-4" />;
      case 'preparing': return <ChefHat className="h-4 w-4" />;
      case 'ready': return <CheckCircle className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'beverage': return <Coffee className="h-4 w-4" />;
      case 'food': return <Utensils className="h-4 w-4" />;
      case 'dessert': return '🧁';
      default: return <Utensils className="h-4 w-4" />;
    }
  };

  const activeOrders = orders.filter(order => ['received', 'preparing', 'ready'].includes(order.status));
  const completedOrders = orders.filter(order => order.status === 'delivered');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Orders</p>
                <p className="text-2xl font-bold text-blue-600">
                  {orders.filter(order => order.status === 'received').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Preparing</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(order => order.status === 'preparing').length}
                </p>
              </div>
              <ChefHat className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ready</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(order => order.status === 'ready').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgent Orders</p>
                <p className="text-2xl font-bold text-red-600">
                  {orders.filter(order => order.priority === 'urgent').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeOrders
                .sort((a, b) => {
                  // Sort by priority first, then by order time
                  const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
                  if (a.priority !== b.priority) {
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                  }
                  return new Date(a.orderTime).getTime() - new Date(b.orderTime).getTime();
                })
                .map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </Badge>
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(order.orderTime).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between">
                      <p className="font-medium">{order.customerName}</p>
                      <span className="text-sm text-gray-600">{order.orderType}</span>
                    </div>
                    {order.tableNumber && (
                      <p className="text-sm text-gray-600">Table {order.tableNumber}</p>
                    )}
                    {order.estimatedCompletionTime && (
                      <p className="text-sm text-gray-600">
                        EST: {order.estimatedCompletionTime}
                      </p>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 mb-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          <div>
                            <span className="text-sm font-medium">
                              {item.quantity}x {item.name}
                            </span>
                            {item.specifications && (
                              <p className="text-xs text-gray-600">{item.specifications}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          {canUpdate && item.status !== 'ready' && (
                            <Select
                              value={item.status}
                              onValueChange={(value: OrderItem['status']) => 
                                handleUpdateItemStatus(order.id, item.id, value)
                              }
                            >
                              <SelectTrigger className="w-24 h-6">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="preparing">Preparing</SelectItem>
                                <SelectItem value="ready">Ready</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.specialRequests && (
                    <div className="mb-3 p-2 bg-orange-50 rounded border-l-4 border-orange-400">
                      <p className="text-sm font-medium text-orange-800">Special Requests:</p>
                      <p className="text-sm text-orange-700">{order.specialRequests}</p>
                    </div>
                  )}

                  {order.notes && (
                    <div className="mb-3 p-2 bg-blue-50 rounded">
                      <p className="text-sm font-medium">Notes:</p>
                      <p className="text-sm">{order.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    
                    {canUpdate && order.status === 'ready' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Delivered
                      </Button>
                    )}
                    
                    {canUpdate && order.status === 'received' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        <ChefHat className="h-4 w-4 mr-1" />
                        Start Preparing
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedOrders.slice(0, 10).map((order) => (
                <div key={order.id} className="border rounded-lg p-4 opacity-75">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(order.orderTime).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{order.customerName}</p>
                  <p className="text-xs text-gray-600">
                    {order.items.length} item(s) • {order.orderType}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Customer</Label>
                  <p>{selectedOrder.customerName}</p>
                  {selectedOrder.tableNumber && (
                    <p className="text-sm text-gray-600">Table {selectedOrder.tableNumber}</p>
                  )}
                </div>
                <div>
                  <Label className="font-semibold">Order Details</Label>
                  <div className="flex gap-2 mb-1">
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                    <Badge className={getPriorityColor(selectedOrder.priority)}>
                      {selectedOrder.priority}
                    </Badge>
                  </div>
                  <p className="text-sm">{selectedOrder.orderType}</p>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Items</Label>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                      <div className="flex items-start gap-2">
                        {getCategoryIcon(item.category)}
                        <div>
                          <p className="font-medium">{item.quantity}x {item.name}</p>
                          {item.specifications && (
                            <p className="text-sm text-gray-600">{item.specifications}</p>
                          )}
                          {item.preparationTime && (
                            <p className="text-xs text-gray-500">~{item.preparationTime} min</p>
                          )}
                        </div>
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.specialRequests && (
                <div>
                  <Label className="font-semibold">Special Requests</Label>
                  <p className="text-sm bg-orange-50 p-2 rounded border-l-4 border-orange-400">
                    {selectedOrder.specialRequests}
                  </p>
                </div>
              )}

              {selectedOrder.notes && (
                <div>
                  <Label className="font-semibold">Notes</Label>
                  <p className="text-sm bg-blue-50 p-2 rounded">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <p>Order Time: {new Date(selectedOrder.orderTime).toLocaleString()}</p>
                  {selectedOrder.estimatedCompletionTime && (
                    <p>Estimated Completion: {selectedOrder.estimatedCompletionTime}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
