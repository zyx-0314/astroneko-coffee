import { MenuItemResponse, CreateMenuItemRequest, UpdateMenuItemRequest } from '@/schema/menuItem.schema';
import apiClient from './client';

// Public menu endpoints (for customer-facing features)
export const menuApi = {
  // Get paginated public menu
  getPublicMenu: async (params: {
    type?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
  } = {}): Promise<{
    content: MenuItemResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> => {
    const response = await apiClient.get('/api/v1/expose/menu', { params });
    return response.data;
  },

  // Get single menu item
  getMenuItem: async (id: number): Promise<MenuItemResponse> => {
    const response = await apiClient.get(`/api/v1/expose/menu/${id}`);
    return response.data;
  },

  // Get recommendations
  getRecommendations: async (limit: number = 6): Promise<MenuItemResponse[]> => {
    const response = await apiClient.get('/api/v1/expose/menu/recommendations', {
      params: { limit }
    });
    return response.data;
  },

  // Get favorites
  getFavorites: async (limit: number = 3): Promise<MenuItemResponse[]> => {
    const response = await apiClient.get('/api/v1/expose/menu/favorites', {
      params: { limit }
    });
    return response.data;
  },

  // Get promotions
  getPromotions: async (limit: number = 3): Promise<MenuItemResponse[]> => {
    const response = await apiClient.get('/api/v1/expose/menu/promotions', {
      params: { limit }
    });
    return response.data;
  },
};

// Admin menu endpoints (for staff management)
export const adminMenuApi = {
  // Get all menu items with filters (for admin/staff)
  getAllMenuItems: async (params: {
    type?: string;
    promoType?: string;
    inStock?: boolean;
    isOnSale?: boolean;
    isCombo?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
  } = {}): Promise<{
    content: MenuItemResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> => {
    const response = await apiClient.get('/api/v1/secure/menu', { params });
    return response.data;
  },

  // Get single menu item (admin view)
  getMenuItem: async (id: number): Promise<MenuItemResponse> => {
    const response = await apiClient.get(`/api/v1/secure/menu/${id}`);
    return response.data;
  },

  // Create new menu item
  createMenuItem: async (data: CreateMenuItemRequest): Promise<MenuItemResponse> => {
    const response = await apiClient.post('/api/v1/secure/menu', data);
    return response.data;
  },

  // Update menu item
  updateMenuItem: async (id: number, data: UpdateMenuItemRequest): Promise<MenuItemResponse> => {
    const response = await apiClient.put(`/api/v1/secure/menu/${id}`, data);
    return response.data;
  },

  // Update stock status
  updateStockStatus: async (id: number, inStock: boolean): Promise<MenuItemResponse> => {
    const response = await apiClient.patch(`/api/v1/secure/menu/${id}/stock`, { inStock });
    return response.data;
  },

  // Discontinue menu item
  discontinueMenuItem: async (id: number): Promise<void> => {
    await apiClient.patch(`/api/v1/secure/menu/${id}/discontinue`);
  },

  // Delete menu item
  deleteMenuItem: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/v1/secure/menu/${id}`);
  },

  // Get items by type
  getItemsByType: async (type: string): Promise<MenuItemResponse[]> => {
    const response = await apiClient.get(`/api/v1/secure/menu/by-type/${type}`);
    return response.data;
  },

  // Analytics endpoints
  getTopBoughtItems: async (limit: number = 10): Promise<MenuItemResponse[]> => {
    const response = await apiClient.get('/api/v1/secure/menu/analytics/top-bought', {
      params: { limit }
    });
    return response.data;
  },

  getTopRatedItems: async (limit: number = 10): Promise<MenuItemResponse[]> => {
    const response = await apiClient.get('/api/v1/secure/menu/analytics/top-rated', {
      params: { limit }
    });
    return response.data;
  },
};
