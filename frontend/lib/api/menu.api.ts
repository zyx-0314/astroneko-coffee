import { MenuItemResponse, CreateMenuItemRequest, UpdateMenuItemRequest } from '@/schema/menuItem.schema';

const API_BASE_URL = 'http://localhost:8083/api/v1';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorData}`);
  }
  return response.json();
}

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
    const searchParams = new URLSearchParams();
    if (params.type) searchParams.append('type', params.type);
    if (params.page !== undefined) searchParams.append('page', params.page.toString());
    if (params.size !== undefined) searchParams.append('size', params.size.toString());
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.sortDir) searchParams.append('sortDir', params.sortDir);

    const response = await fetch(`${API_BASE_URL}/expose/menu?${searchParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return handleResponse(response);
  },

  // Get single menu item
  getMenuItem: async (id: number): Promise<MenuItemResponse> => {
    const response = await fetch(`${API_BASE_URL}/expose/menu/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return handleResponse(response);
  },

  // Get recommendations
  getRecommendations: async (limit: number = 6): Promise<MenuItemResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/expose/menu/recommendations?limit=${limit}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return handleResponse(response);
  },

  // Get favorites
  getFavorites: async (limit: number = 3): Promise<MenuItemResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/expose/menu/favorites?limit=${limit}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return handleResponse(response);
  },

  // Get promotions
  getPromotions: async (limit: number = 3): Promise<MenuItemResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/expose/menu/promotions?limit=${limit}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return handleResponse(response);
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
    const searchParams = new URLSearchParams();
    if (params.type) searchParams.append('type', params.type);
    if (params.promoType) searchParams.append('promoType', params.promoType);
    if (params.inStock !== undefined) searchParams.append('inStock', params.inStock.toString());
    if (params.isOnSale !== undefined) searchParams.append('isOnSale', params.isOnSale.toString());
    if (params.isCombo !== undefined) searchParams.append('isCombo', params.isCombo.toString());
    if (params.page !== undefined) searchParams.append('page', params.page.toString());
    if (params.size !== undefined) searchParams.append('size', params.size.toString());
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.sortDir) searchParams.append('sortDir', params.sortDir);

    const response = await fetch(`${API_BASE_URL}/secure/menu?${searchParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },

  // Get single menu item (admin view)
  getMenuItem: async (id: number): Promise<MenuItemResponse> => {
    const response = await fetch(`${API_BASE_URL}/secure/menu/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },

  // Create new menu item
  createMenuItem: async (data: CreateMenuItemRequest): Promise<MenuItemResponse> => {
    const response = await fetch(`${API_BASE_URL}/secure/menu`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  // Update menu item
  updateMenuItem: async (id: number, data: UpdateMenuItemRequest): Promise<MenuItemResponse> => {
    const response = await fetch(`${API_BASE_URL}/secure/menu/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  // Update stock status
  updateStockStatus: async (id: number, inStock: boolean): Promise<MenuItemResponse> => {
    const response = await fetch(`${API_BASE_URL}/secure/menu/${id}/stock`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ inStock }),
    });

    return handleResponse(response);
  },

  // Discontinue menu item
  discontinueMenuItem: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/secure/menu/${id}/discontinue`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorData}`);
    }
  },

  // Delete menu item
  deleteMenuItem: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/secure/menu/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorData}`);
    }
  },

  // Get items by type
  getItemsByType: async (type: string): Promise<MenuItemResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/secure/menu/by-type/${type}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },

  // Analytics endpoints
  getTopBoughtItems: async (limit: number = 10): Promise<MenuItemResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/secure/menu/analytics/top-bought?limit=${limit}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },

  getTopRatedItems: async (limit: number = 10): Promise<MenuItemResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/secure/menu/analytics/top-rated?limit=${limit}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },
};
