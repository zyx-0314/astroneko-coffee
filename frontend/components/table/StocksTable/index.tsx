"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, TrendingDown, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StockItem, StockStatus } from '@/schema/stock.schema';
import { getStockStatus } from '@/lib/data/stocks';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { formatShortDate } from '@/lib/date-utils';

interface StocksTableProps {
  stocks: StockItem[];
  showSupplier?: boolean;
  showLastRestocked?: boolean;
  filterStatus?: StockStatus | 'all';
}

export function StocksTable({
  stocks,
  showSupplier = true,
  showLastRestocked = true,
  filterStatus = 'all'
}: StocksTableProps) {
  const filteredStocks = filterStatus === 'all' 
    ? stocks 
    : stocks.filter(stock => getStockStatus(stock) === filterStatus);

  if (filteredStocks.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No Stock Items"
        description={filterStatus === 'all' ? "No stock items found." : `No items with ${filterStatus} status.`}
        actionLabel="Manage Inventory"
      />
    );
  }

  const getStatusBadge = (status: StockStatus) => {
    switch (status) {
      case 'danger':
        return <Badge variant="destructive" className="flex items-center space-x-1">
          <AlertTriangle className="w-3 h-3" />
          <span>Low Stock</span>
        </Badge>;
      case 'warning':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">
          <TrendingDown className="w-3 h-3 mr-1" />
          Running Low
        </Badge>;
      case 'ok':
        return <Badge variant="secondary">In Stock</Badge>;
    }
  };

  const getStockPercentage = (item: StockItem) => {
    return Math.min((item.currentQty / (item.threshold * 2)) * 100, 100);
  };



  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 p-4">
        {filteredStocks.map((stock, index) => {
          const status = getStockStatus(stock);
          const percentage = getStockPercentage(stock);
          
          return (
            <motion.div
              key={stock.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border rounded-lg p-4 hover:bg-accent/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    status === 'danger' && "bg-red-500",
                    status === 'warning' && "bg-yellow-500", 
                    status === 'ok' && "bg-green-500"
                  )} />
                  <div>
                    <p className="font-medium">{stock.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {stock.currentQty} {stock.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${stock.cost.toFixed(2)}</p>
                  <Badge variant="outline" className="capitalize text-xs">
                    {stock.category}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Stock Level</span>
                    <span className="font-medium">
                      {stock.currentQty}/{stock.threshold * 2} {stock.unit}
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className={cn(
                      "h-2",
                      status === 'danger' && "[&>div]:bg-red-500",
                      status === 'warning' && "[&>div]:bg-yellow-500",
                      status === 'ok' && "[&>div]:bg-green-500"
                    )}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Threshold: {stock.threshold}</span>
                    <span>{Math.round(percentage)}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  {getStatusBadge(status)}
                  
                  <div className="text-right space-y-1">
                    {showSupplier && (
                      <p className="text-xs text-muted-foreground">
                        Supplier: {stock.supplier}
                      </p>
                    )}
                    {showLastRestocked && (
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Restocked {formatShortDate(stock.lastRestocked)}</span>
                      </div>
                    )}
                  </div>
                </div>
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
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Status</TableHead>
              {showSupplier && <TableHead>Supplier</TableHead>}
              {showLastRestocked && <TableHead>Last Restocked</TableHead>}
              <TableHead className="text-right">Unit Cost</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {filteredStocks.map((stock, index) => {
            const status = getStockStatus(stock);
            const percentage = getStockPercentage(stock);
            
            return (
              <motion.tr
                key={stock.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-accent/50"
              >
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      status === 'danger' && "bg-red-500",
                      status === 'warning' && "bg-yellow-500", 
                      status === 'ok' && "bg-green-500"
                    )} />
                    <div>
                      <p className="font-medium">{stock.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {stock.currentQty} {stock.unit}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {stock.category}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="space-y-2 min-w-32">
                    <div className="flex justify-between text-sm">
                      <span>Current</span>
                      <span className="font-medium">
                        {stock.currentQty}/{stock.threshold * 2} {stock.unit}
                      </span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className={cn(
                        "h-2",
                        status === 'danger' && "[&>div]:bg-red-500",
                        status === 'warning' && "[&>div]:bg-yellow-500",
                        status === 'ok' && "[&>div]:bg-green-500"
                      )}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Threshold: {stock.threshold}</span>
                      <span>{Math.round(percentage)}%</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {getStatusBadge(status)}
                </TableCell>

                {showSupplier && (
                  <TableCell>
                    <span className="text-sm">{stock.supplier}</span>
                  </TableCell>
                )}

                {showLastRestocked && (
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{formatShortDate(stock.lastRestocked)}</span>
                    </div>
                  </TableCell>
                )}

                <TableCell className="text-right font-medium">
                  ${stock.cost.toFixed(2)}
                </TableCell>
              </motion.tr>
            );
          })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
