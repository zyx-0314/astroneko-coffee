"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { 
  MenuItem, 
  CreateMenuItemRequest, 
  UpdateMenuItemRequest, 
  MenuItemResponse 
} from "@/schema/menuItem.schema";
import { 
  MenuItemFormSchema, 
  type MenuItemFormInput 
} from "@/schema/menuItemValidation.schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8083/api/v1";

export function MenuCrudTableHook() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Fetch all menu items
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/expose/menu`);
      // Convert the backend response to match our schema
      const items: MenuItem[] = response.data.map((item: MenuItemResponse) => ({
        id: item.id?.toString() || "",
        name: item.name || "",
        price: item.price?.toString() || "0",
      }));
      setMenuItems(items);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setError("Failed to load menu items");
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Validate form data
  const validateFormData = (data: MenuItemFormInput) => {
    try {
      setValidationErrors({});
      MenuItemFormSchema.parse(data);
      return true;
    } catch (error: any) {
      const errors: Record<string, string> = {};
      if (error.errors) {
        error.errors.forEach((err: any) => {
          if (err.path.length > 0) {
            errors[err.path[0]] = err.message;
          }
        });
      }
      setValidationErrors(errors);
      return false;
    }
  };

  // Create a new menu item
  const createMenuItem = async (data: { name: string; price: string }) => {
    try {
      setError(null);
      
      // Validate the form data
      if (!validateFormData(data)) {
        throw new Error("Please fix validation errors");
      }
      
      const payload: CreateMenuItemRequest = {
        name: data.name.trim(),
        price: parseFloat(data.price) || 0,
      };
      
      const response = await axios.post(`${API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/secure/menu`, payload);
      
      // Add the new item to the local state
      const newItem: MenuItem = {
        id: response.data.id?.toString() || Date.now().toString(),
        name: response.data.name || data.name,
        price: response.data.price?.toString() || data.price,
      };
      
      setMenuItems(prev => [...prev, newItem]);
    } catch (err) {
      console.error("Error creating menu item:", err);
      setError("Failed to create menu item");
      throw err;
    }
  };

  // Update an existing menu item
  const updateMenuItem = async (id: string, data: { name: string; price: string }) => {
    try {
      setError(null);
      
      // Validate the form data
      if (!validateFormData(data)) {
        throw new Error("Please fix validation errors");
      }
      
      const payload: UpdateMenuItemRequest = {
        name: data.name.trim(),
        price: parseFloat(data.price) || 0,
      };
      
      const response = await axios.put(`${API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/secure/menu/${id}`, payload);
      
      // Update the item in local state
      setMenuItems(prev =>
        prev.map(item =>
          item.id === id
            ? {
                ...item,
                name: response.data.name || data.name,
                price: response.data.price?.toString() || data.price,
              }
            : item
        )
      );
    } catch (err) {
      console.error("Error updating menu item:", err);
      setError("Failed to update menu item");
      throw err;
    }
  };

  // Delete a menu item
  const deleteMenuItem = async (id: string) => {
    try {
      setError(null);
      await axios.delete(`${API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/secure/menu/${id}`);
      
      // Remove the item from local state
      setMenuItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting menu item:", err);
      setError("Failed to delete menu item");
      throw err;
    }
  };

  // Load menu items on component mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  return {
    menuItems,
    loading,
    error,
    validationErrors,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refreshMenuItems: fetchMenuItems,
    validateFormData,
  };
}
