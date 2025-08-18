import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
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
import { EmptyState } from '@/components/common/EmptyState';
import { formatDate, formatTime } from '@/lib/date-utils';
import { Order } from '@/schema/order.schema';
import { OrderHistoryDisplaySectionProps } from '@/schema';

export default function OrderHistoryDisplaySection({ orders }: OrderHistoryDisplaySectionProps) {
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
            Order History
          </CardTitle>
          <CardDescription>
            Your recent coffee adventures
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id.slice(-6)}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        {order.items.map((item: any, index: number) => (
                          <div key={index} className="text-sm">
                            {item.quantity}x {item.menuItem.name}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatDate(order.placedAt)}</div>
                        <div className="text-muted-foreground">
                          {formatTime(order.placedAt)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status.includes('COMPLETE') 
                            ? 'default' 
                            : order.status.includes('CANCELLED') 
                            ? 'destructive' 
                            : 'secondary'
                        }
                      >
                        {order.status[0]?.charAt(0).toUpperCase() + order.status[0]?.slice(1).toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${order.total.toFixed(2)}
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
