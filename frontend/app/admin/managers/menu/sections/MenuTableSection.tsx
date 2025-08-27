"use client";

import { Coffee, Edit, Eye, MoreHorizontal, Plus, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { GenerateMenuItemPlaceholder } from '@/lib/placeholder-image-utils';
import { ItemType, MenuItemResponse } from '@/schema/menuItem.schema';

interface MenuTableSectionProps {
  totalItems: number;
  filteredItems: MenuItemResponse[];
  loading: boolean;
  onCreateItem: () => void;
  onViewItem: (item: MenuItemResponse) => void;
  onEditItem: (item: MenuItemResponse) => void;
  onDeleteItem: (item: MenuItemResponse) => void;
  onStockToggle: (item: MenuItemResponse) => void;
}

export default function MenuTableSection({
  totalItems,
  filteredItems,
  loading,
  onCreateItem,
  onViewItem,
  onEditItem,
  onDeleteItem,
  onStockToggle,
}: MenuTableSectionProps) {
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const getTypeColor = (type: ItemType) => {
    const colors = {
      COFFEE: "bg-orange-100 text-orange-800",
      PASTRIES: "bg-yellow-100 text-yellow-800",
      DRINKS: "bg-blue-100 text-blue-800",
      BUNDLES: "bg-purple-100 text-purple-800",
      VEGETARIAN: "bg-green-100 text-green-800",
      INSTANT: "bg-red-100 text-red-800",
      COMBO: "bg-indigo-100 text-indigo-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="bg-white dark:bg-gray-800 mb-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Menu Items ({totalItems})</span>
          <Badge variant="outline">{filteredItems.length} shown</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="border-[#6B4E37] border-b-2 rounded-full w-8 h-8 animate-spin"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-8 text-center">
            <Coffee className="mx-auto mb-4 w-12 h-12 text-gray-400" />
            <h3 className="mb-2 font-medium text-gray-900 dark:text-white text-lg">
              No menu items found
            </h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Get started by adding your first menu item
            </p>
            <Button
              onClick={onCreateItem}
              className="bg-[#6B4E37] hover:bg-[#5a3f2d] text-white"
            >
              <Plus className="mr-2 w-4 h-4" />
              Add Menu Item
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10">
                          <Image
                            src={
                              item.image
                                ? item.image
                                : GenerateMenuItemPlaceholder(item.type)
                            }
                            alt={item.name}
                            className="rounded-lg object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder/menu-item.jpg";
                            }}
                            fill
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </p>
                          <p className="max-w-[200px] text-gray-500 dark:text-gray-400 text-sm truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(item.type)}>
                        {item.type.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice &&
                          item.originalPrice > item.price && (
                            <span className="text-gray-500 text-sm line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={item.inStock ? "default" : "destructive"}
                        className="cursor-pointer"
                        onClick={() => onStockToggle(item)}
                      >
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{item.rating?.toFixed(1) || "0.0"}</span>
                        <span className="text-gray-500 text-sm">
                          ({item.reviewsCount || 0})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Week: {item.weeklyBuys || 0}</div>
                        <div className="text-gray-500">
                          Month: {item.monthlyBuys || 0}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewItem(item)}>
                            <Eye className="mr-2 w-4 h-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEditItem(item)}>
                            <Edit className="mr-2 w-4 h-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDeleteItem(item)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
