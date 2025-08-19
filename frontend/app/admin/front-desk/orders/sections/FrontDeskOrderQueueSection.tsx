'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, CheckCircle, AlertCircle, Eye, MessageSquare, Receipt, Truck } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  specifications?: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderTime: string;
  estimatedTime?: string;
  tableNumber?: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  customerQuery?: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerPhone: '+1234567890',
    items: [
      { id: '1', name: 'Cappuccino', quantity: 2, price: 4.50 },
      { id: '2', name: 'Croissant', quantity: 1, price: 3.25 }
    ],
    total: 12.25,
    status: 'ready',
    orderTime: '2024-08-20T10:30:00',
    estimatedTime: '10:45',
    tableNumber: '5',
    orderType: 'dine-in',
    paymentStatus: 'paid',
    notes: 'Extra hot cappuccino'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    customerPhone: '+1234567891',
    items: [
      { id: '3', name: 'Latte', quantity: 1, price: 4.75 },
      { id: '4', name: 'Sandwich', quantity: 1, price: 8.50 }
    ],
    total: 13.25,
    status: 'preparing',
    orderTime: '2024-08-20T10:45:00',
    estimatedTime: '11:00',
    orderType: 'takeaway',
    paymentStatus: 'paid',
    customerQuery: 'Can you make the latte with oat milk?'
  },
  {
    id: 'ORD-003',
    customerName: 'Bob Johnson',
    customerPhone: '+1234567892',
    items: [
      { id: '5', name: 'Americano', quantity: 3, price: 3.50 },
      { id: '6', name: 'Muffin', quantity: 2, price: 2.75 }
    ],
    total: 16.00,
    status: 'pending',
    orderTime: '2024-08-20T11:00:00',
    orderType: 'delivery',
    paymentStatus: 'pending',
    notes: 'Office delivery - 3rd floor'
  }
];

export function FrontDeskOrderQueueSection() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [isResponding, setIsResponding] = useState(false);

  const canUpdate = true; // Role check handled by parent RoleGuard

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    if (!canUpdate) return;
    
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDeliverFood = (orderId: string) => {
    if (!canUpdate) return;
    
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'delivered' } : order
    ));
  };

  const handleRespondToQuery = () => {
    if (!canUpdate || !selectedOrder || !responseText.trim()) return;
    
    // In a real app, this would send the response to the customer
    alert(`Response sent to ${selectedOrder.customerName}: ${responseText}`);
    setResponseText('');
    setIsResponding(false);
    setIsViewDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'preparing': return <AlertCircle className="h-4 w-4" />;
      case 'ready': return <CheckCircle className="h-4 w-4" />;
      case 'delivered': return <Truck className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const readyOrders = orders.filter(order => order.status === 'ready');
  const completedOrders = orders.filter(order => ['delivered', 'cancelled'].includes(order.status));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Preparing</p>
                <p className="text-2xl font-bold text-blue-600">{preparingOrders.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ready</p>
                <p className="text-2xl font-bold text-green-600">{readyOrders.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-600">{completedOrders.length}</p>
              </div>
              <Truck className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Order Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...pendingOrders, ...preparingOrders, ...readyOrders].map((order) => (
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
                      {order.customerQuery && (
                        <MessageSquare className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                    <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.customerPhone}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{order.orderType}</span>
                      {order.tableNumber && <span>Table {order.tableNumber}</span>}
                      <span>{new Date(order.orderTime).toLocaleTimeString()}</span>
                    </div>
                    <p className="font-semibold text-green-600">${order.total.toFixed(2)}</p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    {canUpdate && order.status === 'ready' && (
                      <Button
                        size="sm"
                        onClick={() => handleDeliverFood(order.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Truck className="h-4 w-4 mr-1" />
                        Mark Delivered
                      </Button>
                    )}
                    
                    {canUpdate && order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <Select
                        value={order.status}
                        onValueChange={(value: Order['status']) => 
                          handleStatusUpdate(order.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="preparing">Preparing</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="cancelled">Cancel</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <p className="text-sm font-semibold text-green-600">
                    ${order.total.toFixed(2)}
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
                  <p className="text-sm text-gray-600">{selectedOrder.customerPhone}</p>
                </div>
                <div>
                  <Label className="font-semibold">Order Details</Label>
                  <div className="flex gap-2 mb-1">
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                    <Badge className={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                      {selectedOrder.paymentStatus}
                    </Badge>
                  </div>
                  <p className="text-sm">{selectedOrder.orderType}</p>
                  {selectedOrder.tableNumber && (
                    <p className="text-sm">Table {selectedOrder.tableNumber}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="font-semibold">Items</Label>
                <div className="border rounded-lg p-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-1">
                      <div>
                        <span>{item.name}</span>
                        {item.specifications && (
                          <p className="text-sm text-gray-600">{item.specifications}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span>{item.quantity}x ${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <Label className="font-semibold">Notes</Label>
                  <p className="text-sm bg-gray-50 p-2 rounded">{selectedOrder.notes}</p>
                </div>
              )}

              {selectedOrder.customerQuery && (
                <div>
                  <Label className="font-semibold">Customer Query</Label>
                  <p className="text-sm bg-orange-50 p-2 rounded border-l-4 border-orange-400">
                    {selectedOrder.customerQuery}
                  </p>
                  
                  {canUpdate && (
                    <div className="mt-3">
                      {!isResponding ? (
                        <Button
                          variant="outline"
                          onClick={() => setIsResponding(true)}
                          className="text-orange-600"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Respond to Query
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Type your response to the customer..."
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={handleRespondToQuery}
                              disabled={!responseText.trim()}
                            >
                              Send Response
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setIsResponding(false);
                                setResponseText('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <p>Order Time: {new Date(selectedOrder.orderTime).toLocaleString()}</p>
                  {selectedOrder.estimatedTime && (
                    <p>Estimated Time: {selectedOrder.estimatedTime}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {canUpdate && (
                    <Button variant="outline" size="sm">
                      <Receipt className="h-4 w-4 mr-1" />
                      Print Bill
                    </Button>
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
