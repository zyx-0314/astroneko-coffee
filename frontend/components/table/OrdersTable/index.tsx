"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Order, OrderStatus, OrderItem } from '@/schema/order.schema';
import { User as UserType } from '@/schema/user.schema';
import { MultiStatusBadge } from '@/components/ui/status-badge';
import { EmptyState } from '@/components/ui/empty-state';
import { formatTime } from '@/lib/date-utils';

interface OrdersTableProps {
  orders: Order[];
  onOrderSelect?: (order: Order) => void;
  selectedOrderId?: string;
  showCustomer?: boolean;
  showTotal?: boolean;
  showAssignedTo?: boolean;
  staff?: UserType[];
  viewMode?: 'front-desk' | 'kitchen';
  onStatusChange?: (orderId: string, newStatus: OrderStatus[]) => void;
}

export function OrdersTable({
  orders,
  onOrderSelect,
  selectedOrderId,
  showCustomer = true,
  showTotal = true,
  showAssignedTo = false,
  staff = [],
  viewMode = 'front-desk',
  onStatusChange
}: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No Orders"
        description="There are currently no orders in the queue."
        actionLabel="Refresh"
      />
    );
  }

  const getStaffMember = (staffId: string) => {
    return staff.find(s => s.id === staffId);
  };

  const handleStatusClick = (order: Order, newPrimaryStatus: OrderStatus) => {
    if (!onStatusChange) return;
    
    const currentFlags = order.status.filter((s: OrderStatus) => 
      !['PENDING', 'IN_PROGRESS', 'READY', 'COMPLETE'].includes(s)
    );
    
    onStatusChange(order.id, [newPrimaryStatus, ...currentFlags]);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 p-4">
        {orders.map((order, index) => {
          const isSelected = selectedOrderId === order.id;
          const assignedStaff = order.assignedTo ? getStaffMember(order.assignedTo) : null;
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
                isSelected ? 'bg-accent border-primary' : ''
              }`}
              onClick={() => onOrderSelect?.(order)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {order.queueNo}
                    </span>
                  </div>
                  {showCustomer && (
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {order.customerName.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{order.customerName}</p>
                        {order.customerId && (
                          <p className="text-xs text-muted-foreground">Member</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="text-sm">{formatTime(order.placedAt)}</span>
                    </div>
                    {showTotal && (
                      <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium mb-1">Order Items:</h4>
                  <div className="space-y-1">
                    {order.items.slice(0, 2).map((item: OrderItem, i: number) => (
                      <div key={i} className="text-sm text-muted-foreground">
                        <span className="font-medium">{item.quantity}x</span>{' '}
                        <span>{item.menuItem.name}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{order.items.length - 2} more items
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <MultiStatusBadge statuses={order.status} />
                  
                  {viewMode === 'kitchen' && (
                    <div className="flex space-x-1">
                      {!order.status.includes('COMPLETE') && (
                        <>
                          {order.status.includes('PENDING') && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusClick(order, 'IN_PROGRESS');
                              }}
                            >
                              Start
                            </Button>
                          )}
                          {order.status.includes('IN_PROGRESS') && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusClick(order, 'READY');
                              }}
                            >
                              Ready
                            </Button>
                          )}
                          {order.status.includes('READY') && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusClick(order, 'COMPLETE');
                              }}
                            >
                              Complete
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                {showAssignedTo && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-1">Assigned to:</p>
                    {assignedStaff ? (
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={assignedStaff.avatar} />
                          <AvatarFallback className="text-xs">
                            {assignedStaff.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{assignedStaff.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Queue</TableHead>
              {showCustomer && <TableHead>Customer</TableHead>}
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              {showAssignedTo && <TableHead>Assigned To</TableHead>}
              <TableHead>Time</TableHead>
              {showTotal && <TableHead className="text-right">Total</TableHead>}
              {viewMode === 'kitchen' && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
        <TableBody>
          {orders.map((order, index) => {
            const isSelected = selectedOrderId === order.id;
            const assignedStaff = order.assignedTo ? getStaffMember(order.assignedTo) : null;
            
            return (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                  isSelected ? 'bg-accent' : ''
                }`}
                onClick={() => onOrderSelect?.(order)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {order.queueNo}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {showCustomer && (
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {order.customerName.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        {order.customerId && (
                          <p className="text-xs text-muted-foreground">Member</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                )}

                <TableCell>
                  <div className="space-y-1">
                    {order.items.slice(0, 2).map((item: OrderItem, i: number) => (
                      <div key={i} className="text-sm">
                        <span className="font-medium">{item.quantity}x</span>{' '}
                        <span>{item.menuItem.name}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{order.items.length - 2} more items
                      </p>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <MultiStatusBadge statuses={order.status} />
                </TableCell>

                {showAssignedTo && (
                  <TableCell>
                    {assignedStaff ? (
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={assignedStaff.avatar} />
                          <AvatarFallback className="text-xs">
                            {assignedStaff.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{assignedStaff.name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                )}

                <TableCell>
                  <div className="text-sm">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(order.placedAt)}</span>
                    </div>
                    {order.estimatedReady && (
                      <div className="text-xs text-green-600 mt-1">
                        Est. {formatTime(order.estimatedReady)}
                      </div>
                    )}
                  </div>
                </TableCell>

                {showTotal && (
                  <TableCell className="text-right font-medium">
                    ${order.total.toFixed(2)}
                  </TableCell>
                )}

                {viewMode === 'kitchen' && (
                  <TableCell>
                    <div className="flex space-x-1">
                      {!order.status.includes('COMPLETE') && (
                        <>
                          {order.status.includes('PENDING') && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusClick(order, 'IN_PROGRESS');
                              }}
                            >
                              Start
                            </Button>
                          )}
                          {order.status.includes('IN_PROGRESS') && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusClick(order, 'READY');
                              }}
                            >
                              Ready
                            </Button>
                          )}
                          {order.status.includes('READY') && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusClick(order, 'COMPLETE');
                              }}
                            >
                              Complete
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                )}
              </motion.tr>
            );
          })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
