'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Coffee, Plus, Edit, Star, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MenuItemResponse, ItemType } from '@/schema/menuItem.schema';
import Image from 'next/image';

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
      COFFEE: 'bg-orange-100 text-orange-800',
      PASTRIES: 'bg-yellow-100 text-yellow-800',
      DRINKS: 'bg-blue-100 text-blue-800',
      BUNDLES: 'bg-purple-100 text-purple-800',
      VEGETARIAN: 'bg-green-100 text-green-800',
      INSTANT: 'bg-red-100 text-red-800',
      COMBO: 'bg-indigo-100 text-indigo-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const setPlaceholder = (type: string) => {
    switch (type) {
      case 'COFFEE':
        return '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png';
      case 'PASTRIES':
        return '/placeholder/product-services/Pastries_and_Treats.png';
      case 'DRINKS':
        return '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png';
      case 'BUNDLES':
        return '/placeholder/product-services/Special_Bundles_and_Services.png';
      case 'VEGETARIAN':
        return '/placeholder/product-services/Vegetarian_and_Light_Options.png';
      case 'INSTANT':
        return '/placeholder/product-services/Instant_and_Take_Home.png';
      case 'COMBO':
        return '/placeholder/product-services/Special_Bundles_and_Services.png';
      default:
        return '/placeholder/menu-item.jpg';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Menu Items ({totalItems})</span>
          <Badge variant="outline">{filteredItems.length} shown</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B4E37]"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-8">
            <Coffee className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No menu items found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Get started by adding your first menu item
            </p>
            <Button onClick={onCreateItem} className="bg-[#6B4E37] hover:bg-[#5a3f2d] text-white">
              <Plus className="h-4 w-4 mr-2" />
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
                        <div className="w-10 h-10 relative">
                          <Image
                            src={item.image ? item.image : setPlaceholder(item.type)}
                            alt={item.name}
                            className="rounded-lg object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder/menu-item.jpg';
                            }}
                            fill
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
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
                        <span className="font-medium">{formatPrice(item.price)}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
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
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{item.rating?.toFixed(1) || '0.0'}</span>
                        <span className="text-sm text-gray-500">({item.reviewsCount || 0})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Week: {item.weeklyBuys || 0}</div>
                        <div className="text-gray-500">Month: {item.monthlyBuys || 0}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewItem(item)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEditItem(item)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onDeleteItem(item)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
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
