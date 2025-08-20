'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, CreditCard, Package, Loader2, Eye } from 'lucide-react';
import { purchaseHistoryAPI, PurchaseHistory } from '@/lib/api/purchase-history.api';
import { formatDate, formatTime } from '@/lib/utils';

interface CustomerPurchaseHistoryProps {
  customerId: number;
  customerName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerPurchaseHistory({ 
  customerId, 
  customerName, 
  isOpen, 
  onClose 
}: CustomerPurchaseHistoryProps) {
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseHistory | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

  useEffect(() => {
    if (isOpen && customerId) {
      loadPurchaseHistory();
    }
  }, [isOpen, customerId]);

  const loadPurchaseHistory = async () => {
    setLoading(true);
    try {
      const response = await purchaseHistoryAPI.getPurchaseHistoryByCustomerId(customerId);
      if (response.success && response.data) {
        setPurchaseHistory(response.data);
      }
    } catch (error) {
      console.error('Failed to load purchase history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewOrder = (order: PurchaseHistory) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  const totalSpent = purchaseHistory.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrder = purchaseHistory.length > 0 ? totalSpent / purchaseHistory.length : 0;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Purchase History - {customerName}</DialogTitle>
          </DialogHeader>
          
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading purchase history...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{purchaseHistory.length}</p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">${totalSpent.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">${averageOrder.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Average Order</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Purchase History List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Order History</h3>
                {purchaseHistory.length === 0 ? (
                  <div className="text-center p-8 text-gray-500">
                    No purchase history found
                  </div>
                ) : (
                  <div className="space-y-3">
                    {purchaseHistory.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold">Order #{order.orderId}</h4>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(order.orderDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(order.orderDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Package className="h-3 w-3" />
                                {order.itemsCount} items
                              </div>
                              <div className="flex items-center gap-1">
                                <CreditCard className="h-3 w-3" />
                                {order.paymentMethod}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              ${order.totalAmount.toFixed(2)}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewOrder(order)}
                              className="mt-2"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Detail Dialog */}
      <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Order ID</Label>
                  <p>{selectedOrder.orderId}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <Label className="font-semibold">Order Date</Label>
                  <p>{formatDate(selectedOrder.orderDate)} at {formatTime(selectedOrder.orderDate)}</p>
                </div>
                <div>
                  <Label className="font-semibold">Payment Method</Label>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <Label className="font-semibold">Items Count</Label>
                  <p>{selectedOrder.itemsCount}</p>
                </div>
                <div>
                  <Label className="font-semibold">Total Amount</Label>
                  <p className="text-lg font-bold text-green-600">
                    ${selectedOrder.totalAmount.toFixed(2)}
                  </p>
                </div>
                {selectedOrder.pointsEarned && (
                  <div>
                    <Label className="font-semibold">Points Earned</Label>
                    <p className="text-blue-600">+{selectedOrder.pointsEarned}</p>
                  </div>
                )}
                {selectedOrder.pointsUsed && (
                  <div>
                    <Label className="font-semibold">Points Used</Label>
                    <p className="text-orange-600">-{selectedOrder.pointsUsed}</p>
                  </div>
                )}
                {selectedOrder.notes && (
                  <div className="col-span-2">
                    <Label className="font-semibold">Notes</Label>
                    <p>{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
