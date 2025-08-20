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
import { Coffee, Plus, Edit, Star, TrendingUp, Search, Filter, Eye, Trash2, MoreHorizontal, AlertTriangle, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { adminMenuApi } from '@/lib/api/menu.api';
import { MenuItemResponse, CreateMenuItemRequest, UpdateMenuItemRequest, ItemType } from '@/schema/menuItem.schema';
import MenuItemDialog from './components/MenuItemDialog';

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [stockFilter, setStockFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<MenuItemResponse | null>(null);
  
  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItemResponse | null>(null);

  // Stats
  const [stats, setStats] = useState({
    totalItems: 0,
    categories: 0,
    popularItems: 0,
    avgRating: 0,
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

      if (typeFilter) filters.type = typeFilter;
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

  // Load stats
  const loadStats = async () => {
    try {
      const allItems = await adminMenuApi.getAllMenuItems({ size: 1000 });
      const items = allItems.content;
      
      const categories = new Set(items.map(item => item.type)).size;
      const popularItems = items.filter(item => (item.weeklyBuys || 0) > 10).length;
      const avgRating = items.length > 0 
        ? items.reduce((sum, item) => sum + (item.rating || 0), 0) / items.length 
        : 0;

      setStats({
        totalItems: allItems.totalElements,
        categories,
        popularItems,
        avgRating: Number(avgRating.toFixed(1)),
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

  // Handle create
  const handleCreate = () => {
    setSelectedItem(null);
    setDialogMode('create');
    setDialogOpen(true);
  };

  // Handle edit
  const handleEdit = (item: MenuItemResponse) => {
    setSelectedItem(item);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  // Handle view
  const handleView = (item: MenuItemResponse) => {
    setSelectedItem(item);
    setDialogMode('view');
    setDialogOpen(true);
  };

  // Handle delete
  const handleDelete = (item: MenuItemResponse) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await adminMenuApi.deleteMenuItem(itemToDelete.id);
      toast.success('Menu item deleted successfully');
      loadMenuItems();
      loadStats();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete menu item');
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  // Handle stock toggle
  const handleStockToggle = async (item: MenuItemResponse) => {
    try {
      await adminMenuApi.updateStockStatus(item.id, !item.inStock);
      toast.success(`Item marked as ${!item.inStock ? 'in stock' : 'out of stock'}`);
      loadMenuItems();
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock status');
    }
  };

  // Handle form submission
  const handleFormSubmit = async (data: CreateMenuItemRequest | UpdateMenuItemRequest) => {
    try {
      if (dialogMode === 'create') {
        await adminMenuApi.createMenuItem(data as CreateMenuItemRequest);
        toast.success('Menu item created successfully');
      } else if (dialogMode === 'edit' && selectedItem) {
        await adminMenuApi.updateMenuItem(selectedItem.id, data as UpdateMenuItemRequest);
        toast.success('Menu item updated successfully');
      }
      
      loadMenuItems();
      loadStats();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error(`Failed to ${dialogMode === 'create' ? 'create' : 'update'} menu item`);
    }
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
              Menu Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Create and manage your coffee shop menu
            </p>
          </div>
          <Button 
            className="bg-[#6B4E37] hover:bg-[#5a3f2d] text-white"
            onClick={handleCreate}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Menu Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalItems}</p>
              </div>
              <Coffee className="h-8 w-8 text-[#6B4E37]" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Categories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.categories}</p>
              </div>
              <Package className="h-8 w-8 text-[#2CA6A4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Popular Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.popularItems}</p>
              </div>
              <Star className="h-8 w-8 text-[#E1B168]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgRating}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
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
                  <SelectItem value="">All Categories</SelectItem>
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
                  <SelectItem value="">All Items</SelectItem>
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
                  <SelectItem value="price-asc">Price Low-High</SelectItem>
                  <SelectItem value="price-desc">Price High-Low</SelectItem>
                  <SelectItem value="rating-desc">Rating High-Low</SelectItem>
                  <SelectItem value="createdAt-desc">Newest First</SelectItem>
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
                {searchTerm || typeFilter || stockFilter ? 'Try adjusting your filters' : 'Get started by adding your first menu item'}
              </p>
              <Button onClick={handleCreate} className="bg-[#6B4E37] hover:bg-[#5a3f2d] text-white">
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
                        <Badge 
                          variant={item.inStock ? "default" : "destructive"}
                          className="cursor-pointer"
                          onClick={() => handleStockToggle(item)}
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
                            <DropdownMenuItem onClick={() => handleView(item)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(item)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(item)}
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

      {/* Menu Item Dialog */}
      <MenuItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleFormSubmit}
        item={selectedItem}
        mode={dialogMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Menu Item
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{itemToDelete?.name}"? 
              This action cannot be undone and will remove the item from all orders and analytics.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Item
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
