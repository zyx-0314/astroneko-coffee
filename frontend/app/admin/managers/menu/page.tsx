"use client";

import { AlertTriangle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { CRUMenuItemModal } from '@/components/modals';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { adminMenuApi } from '@/lib/api/menu.api';
import {
    CreateMenuItemRequest, MenuItemResponse, UpdateMenuItemRequest
} from '@/schema/menuItem.schema';

import {
    MenuFiltersSection, MenuHeaderSection, MenuPaginationSection, MenuStatsSection, MenuTableSection
} from './sections';

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedItem, setSelectedItem] = useState<MenuItemResponse | null>(
    null
  );

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItemResponse | null>(
    null
  );

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
      const filters: Record<string, string | number | boolean> = {
        page: currentPage,
        size: pageSize,
        sortBy,
        sortDir,
      };

      if (typeFilter && typeFilter !== "all") filters.type = typeFilter;
      if (stockFilter === "in-stock") filters.inStock = true;
      if (stockFilter === "out-of-stock") filters.inStock = false;

      const response = await adminMenuApi.getAllMenuItems(filters);
      setMenuItems(response.content);
      setTotalItems(response.totalElements);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error loading menu items:", error);
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  // Load stats
  const loadStats = async () => {
    try {
      const allItems = await adminMenuApi.getAllMenuItems({ size: 1000 });
      const items = allItems.content;

      const categories = new Set(items.map((item) => item.type)).size;
      const popularItems = items.filter(
        (item) => (item.weeklyBuys || 0) > 10
      ).length;
      const avgRating =
        items.length > 0
          ? items.reduce((sum, item) => sum + (item.rating || 0), 0) /
            items.length
          : 0;

      setStats({
        totalItems: allItems.totalElements,
        categories,
        popularItems,
        avgRating: Number(avgRating.toFixed(1)),
      });
    } catch (error) {
      console.error("Error loading stats:", error);
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
    setDialogMode("create");
    setDialogOpen(true);
  };

  // Handle edit
  const handleEdit = (item: MenuItemResponse) => {
    setSelectedItem(item);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  // Handle view
  const handleView = (item: MenuItemResponse) => {
    setSelectedItem(item);
    setDialogMode("view");
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
      toast.success("Menu item deleted successfully");
      loadMenuItems();
      loadStats();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete menu item");
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  // Handle stock toggle
  const handleStockToggle = async (item: MenuItemResponse) => {
    try {
      await adminMenuApi.updateStockStatus(item.id, !item.inStock);
      toast.success(
        `Item marked as ${!item.inStock ? "in stock" : "out of stock"}`
      );
      loadMenuItems();
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("Failed to update stock status");
    }
  };

  // Handle form submission
  const handleFormSubmit = async (
    data: CreateMenuItemRequest | UpdateMenuItemRequest
  ) => {
    try {
      if (dialogMode === "create") {
        await adminMenuApi.createMenuItem(data as CreateMenuItemRequest);
        toast.success("Menu item created successfully");
      } else if (dialogMode === "edit" && selectedItem) {
        await adminMenuApi.updateMenuItem(
          selectedItem.id,
          data as UpdateMenuItemRequest
        );
        toast.success("Menu item updated successfully");
      }

      loadMenuItems();
      loadStats();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error(
        `Failed to ${dialogMode === "create" ? "create" : "update"} menu item`
      );
    }
  };

  // Filter by search term
  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sort changes
  const handleSortChange = (newSortBy: string, newSortDir: "asc" | "desc") => {
    setSortBy(newSortBy);
    setSortDir(newSortDir);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 dark:from-gray-900 via-white dark:via-gray-800 to-gray-100 dark:to-gray-900 p-6 min-h-screen">
      {/* Header */}
      <MenuHeaderSection onCreateItem={handleCreate} />

      {/* Quick Stats */}
      <MenuStatsSection stats={stats} />

      {/* Filters and Search */}
      <MenuFiltersSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        sortBy={sortBy}
        sortDir={sortDir}
        onSortChange={handleSortChange}
      />

      {/* Menu Items Table */}
      <MenuTableSection
        totalItems={totalItems}
        filteredItems={filteredItems}
        loading={loading}
        onCreateItem={handleCreate}
        onViewItem={handleView}
        onEditItem={handleEdit}
        onDeleteItem={handleDelete}
        onStockToggle={handleStockToggle}
      />

      {/* Pagination */}
      <MenuPaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      {/* Menu Item Dialog */}
      <CRUMenuItemModal
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
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Delete Menu Item
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{itemToDelete?.name}&quot;?
              This action cannot be undone and will remove the item from all
              orders and analytics.
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
