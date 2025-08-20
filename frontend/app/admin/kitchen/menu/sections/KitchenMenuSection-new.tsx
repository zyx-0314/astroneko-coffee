'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Coffee, Package, Search, Filter, Eye, ChevronLeft, ChevronRight, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { adminMenuApi } from '@/lib/api/menu.api';
import { MenuItemResponse, ItemType } from '@/schema/menuItem.schema';

export default function KitchenMenuSection() {
  const [menuItems, setMenuItems] = useState<MenuItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  
  // Dialog for viewing item details
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItemResponse | null>(null);

  // Kitchen stats
  const [stats, setStats] = useState({
    totalItems: 0,
    inStockItems: 0,
    outOfStockItems: 0,
    lowStockItems: 0,
  });

  // Load menu items
  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const filters: any = {
        page: currentPage,
        size: pageSize,
        sortBy,
        sortDir,
      };

      if (typeFilter && typeFilter !== 'all') filters.type = typeFilter;
      if (stockFilter === 'in-stock') filters.inStock = true;
      if (stockFilter === 'out-of-stock') filters.inStock = false;

      const response = await adminMenuApi.getAllMenuItems(filters);
      setMenuItems(response.content);
      setTotalItems(response.totalElements);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error loading menu items:', error);
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  // Load kitchen stats
  const loadStats = async () => {
    try {
      const allItems = await adminMenuApi.getAllMenuItems({ size: 1000 });
      const items = allItems.content;
      
      const inStockItems = items.filter(item => item.inStock).length;
      const outOfStockItems = items.filter(item => !item.inStock).length;
      const lowStockItems = items.filter(item => !item.inStock).length; // Simplified for now

      setStats({
        totalItems: allItems.totalElements,
        inStockItems,
        outOfStockItems,
        lowStockItems,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, [currentPage, pageSize, typeFilter, stockFilter, sortBy, sortDir]);

  useEffect(() => {
    loadStats();
  }, []);

  // Handle stock toggle
  const handleStockToggle = async (item: MenuItemResponse) => {
    try {
      await adminMenuApi.updateStockStatus(item.id, !item.inStock);
      toast.success(`${item.name} marked as ${!item.inStock ? 'in stock' : 'out of stock'}`);
      loadMenuItems();
      loadStats();
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock status');
    }
  };

  // Handle view details
  const handleViewDetails = (item: MenuItemResponse) => {
    setSelectedItem(item);
    setViewDialogOpen(true);
  };

  // Filter by search term
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getStockBadgeColor = (inStock: boolean) => {
    return inStock 
      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
      : 'bg-red-100 text-red-800 hover:bg-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Kitchen Menu Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage inventory and stock levels for kitchen operations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              Kitchen Staff
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Kitchen Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-[#6B4E37]" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">In Stock</p>
                <p className="text-2xl font-bold text-green-600">{stats.inStockItems}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{stats.outOfStockItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Needs Attention</p>
                <p className="text-2xl font-bold text-orange-600">{stats.lowStockItems}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white dark:bg-gray-800 mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="COFFEE">Coffee</SelectItem>
                  <SelectItem value="PASTRIES">Pastries</SelectItem>
                  <SelectItem value="DRINKS">Drinks</SelectItem>
                  <SelectItem value="BUNDLES">Bundles</SelectItem>
                  <SelectItem value="VEGETARIAN">Vegetarian</SelectItem>
                  <SelectItem value="INSTANT">Instant</SelectItem>
                  <SelectItem value="COMBO">Combo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Stock Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Select value={`${sortBy}-${sortDir}`} onValueChange={(value) => {
                const [field, direction] = value.split('-');
                setSortBy(field);
                setSortDir(direction as 'asc' | 'desc');
              }}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                  <SelectItem value="type-asc">Category A-Z</SelectItem>
                  <SelectItem value="price-asc">Price Low-High</SelectItem>
                  <SelectItem value="price-desc">Price High-Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Table */}
      <Card className="bg-white dark:bg-gray-800 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Kitchen Menu Items ({totalItems})</span>
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
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No menu items found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || typeFilter !== 'all' || stockFilter !== 'all' ? 'Try adjusting your filters' : 'No items available'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock Status</TableHead>
                    <TableHead>Quick Actions</TableHead>
                    <TableHead className="w-[100px]">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder/menu-item.jpg';
                            }}
                          />
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
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={`${getStockBadgeColor(item.inStock)} cursor-pointer transition-colors`}
                            onClick={() => handleStockToggle(item)}
                          >
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={item.inStock}
                            onCheckedChange={() => handleStockToggle(item)}
                          />
                          <span className="text-sm text-gray-500">
                            {item.inStock ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems} items
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(0, Math.min(totalPages - 5, currentPage - 2)) + i;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum + 1}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Item Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Item Details
            </DialogTitle>
            <DialogDescription>
              View complete information about this menu item
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              {/* Item Image and Basic Info */}
              <div className="flex gap-4">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-32 h-32 rounded-lg object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder/menu-item.jpg';
                  }}
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{selectedItem.name}</h3>
                    <Badge className={getStockBadgeColor(selectedItem.inStock)}>
                      {selectedItem.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{selectedItem.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(selectedItem.price)}
                    </span>
                    {selectedItem.originalPrice && selectedItem.originalPrice > selectedItem.price && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(selectedItem.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Item Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Category</h4>
                  <Badge className={getTypeColor(selectedItem.type)}>
                    {selectedItem.type}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Stock Status</h4>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={selectedItem.inStock}
                      onCheckedChange={() => {
                        handleStockToggle(selectedItem);
                        setViewDialogOpen(false);
                      }}
                    />
                    <span>{selectedItem.inStock ? 'Available' : 'Unavailable'}</span>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              {(selectedItem.rating || selectedItem.weeklyBuys || selectedItem.monthlyBuys) && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Performance</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedItem.rating && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {selectedItem.rating.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-500">Rating</div>
                      </div>
                    )}
                    {selectedItem.weeklyBuys && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedItem.weeklyBuys}
                        </div>
                        <div className="text-sm text-gray-500">Weekly Sales</div>
                      </div>
                    )}
                    {selectedItem.monthlyBuys && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedItem.monthlyBuys}
                        </div>
                        <div className="text-sm text-gray-500">Monthly Sales</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              {selectedItem.tags && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.split(',').map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
