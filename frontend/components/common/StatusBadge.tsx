"use client"

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@/lib/data/orders';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<OrderStatus, { 
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className: string;
  label: string;
}> = {
  PENDING: {
    variant: 'outline',
    className: 'border-gray-300 text-gray-700',
    label: 'Pending'
  },
  IN_PROGRESS: {
    variant: 'default',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
    label: 'In Progress'
  },
  READY: {
    variant: 'default',
    className: 'bg-green-100 text-green-800 border-green-200',
    label: 'Ready'
  },
  COMPLETE: {
    variant: 'secondary',
    className: 'bg-gray-100 text-gray-600',
    label: 'Complete'
  },
  HAS_PROBLEM: {
    variant: 'destructive',
    className: 'bg-red-100 text-red-800 border-red-200',
    label: 'Problem'
  },
  CANCELLED: {
    variant: 'destructive',
    className: 'bg-red-100 text-red-800 border-red-200',
    label: 'Cancelled'
  },
  RETURN: {
    variant: 'outline',
    className: 'border-orange-300 text-orange-700 bg-orange-50',
    label: 'Return'
  },
  DELAYED: {
    variant: 'outline',
    className: 'border-yellow-300 text-yellow-700 bg-yellow-50',
    label: 'Delayed'
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, 'text-xs sm:text-sm', className)}
    >
      {config.label}
    </Badge>
  );
}

interface MultiStatusBadgeProps {
  statuses: OrderStatus[];
  className?: string;
}

export function MultiStatusBadge({ statuses, className }: MultiStatusBadgeProps) {
  if (statuses.length === 0) return null;
  
  // Show primary status first, then additional flags
  const primaryStatuses: OrderStatus[] = ['PENDING', 'IN_PROGRESS', 'READY', 'COMPLETE'];
  const primary = statuses.find(s => primaryStatuses.includes(s)) || statuses[0];
  const flags = statuses.filter(s => s !== primary);
  
  return (
    <div className={cn('flex flex-wrap gap-1 sm:gap-2', className)}>
      <StatusBadge status={primary} />
      {flags.map((flag, index) => (
        <StatusBadge key={index} status={flag} />
      ))}
    </div>
  );
}
