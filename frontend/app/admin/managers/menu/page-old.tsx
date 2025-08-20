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
            onClick={() => setIsFeatureModalOpen(true)}
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
              <Edit className="h-8 w-8 text-[#2CA6A4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Popular Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <Coffee className="h-12 w-12 text-[#6B4E37] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Coffee Menu
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Manage coffee drinks and specialty beverages
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <Edit className="h-12 w-12 text-[#2CA6A4] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Food Items
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Add and edit pastries and food offerings
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsFeatureModalOpen(true)}>
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 text-[#E1B168] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Seasonal Menu
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create special seasonal offerings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Espresso Drinks', 'Cold Brew', 'Pastries', 'Sandwiches'].map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">{category}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setIsFeatureModalOpen(true)}
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setIsFeatureModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setIsFeatureModalOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Bulk Edit Prices
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setIsFeatureModalOpen(true)}
              >
                <Star className="h-4 w-4 mr-2" />
                Feature Items
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <FeatureModal />
    </div>
  );
}
