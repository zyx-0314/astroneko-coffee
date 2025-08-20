'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ShoppingBag } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { formatDate, formatTime } from '@/lib/date-utils';
import { PurchaseHistory, purchaseHistoryAPI } from '@/lib/api/purchase-history.api';

interface PurchaseHistoryDisplaySectionProps {
  customerId: number;
}

export default function PurchaseHistoryDisplaySection({ customerId }: PurchaseHistoryDisplaySectionProps) {
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      if (!customerId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await purchaseHistoryAPI.getPurchaseHistoryByCustomerId(customerId);
        
        if (response.success && response.data) {
          // Sort by order date descending (most recent first)
          const sortedHistory = response.data.sort((a, b) => 
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
          setPurchaseHistory(sortedHistory);
        } else {
          setError(response.error || 'Failed to load purchase history');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Purchase history fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, [customerId]);

  const getStatusVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case 'SERVED':
      case 'COMPLETED':
        return 'default';
      case 'CANCELLED':
        return 'destructive';
      case 'PENDING':
      case 'PREPARING':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatPaymentMethod = (method: string) => {
    return method.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Purchase History
          </CardTitle>
          <CardDescription>
            Your recent coffee adventures
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B4E37]"></div>
              <span className="ml-2 text-gray-600 dark:text-gray-300">Loading purchase history...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400 mb-2">Error loading purchase history</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
            </div>
          ) : purchaseHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseHistory.slice(0, 5).map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell className="font-medium font-mono text-sm">
                      {purchase.orderId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <ShoppingBag className="w-4 h-4 mr-1 text-gray-500" />
                        {purchase.itemsCount} item{purchase.itemsCount !== 1 ? 's' : ''}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatDate(purchase.orderDate)}</div>
                        <div className="text-muted-foreground">
                          {formatTime(purchase.orderDate)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {formatPaymentMethod(purchase.paymentMethod)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(purchase.status)}>
                        {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1).toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${purchase.totalAmount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              icon={Clock}
              title="No orders yet"
              description="Your order history will appear here once you make your first purchase."
              actionLabel="Browse Menu"
              actionHref="/menu"
            />
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}
