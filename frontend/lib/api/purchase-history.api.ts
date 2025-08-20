import { ApiResponse } from '@/lib/utils';
import { tokenManager } from '@/lib/auth-cookies';

export interface PurchaseHistory {
  id: number;
  orderId: string;
  customerId: number;
  customerName: string;
  totalAmount: number;
  itemsCount: number;
  orderDate: string;
  status: string;
  paymentMethod: string;
  pointsEarned?: number;
  pointsUsed?: number;
  notes?: string;
  // Additional order-related data that might be available
  items?: OrderHistoryItem[];
}

export interface OrderHistoryItem {
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  specialInstructions?: string;
}

export interface CustomerStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083';

class PurchaseHistoryAPI {
  private getAuthHeaders(): HeadersInit {
    const token = tokenManager.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: data.message || 'An error occurred',
        status: response.status
      };
    }

    return {
      success: true,
      data,
      error: null,
      status: response.status
    };
  }

  async getAllPurchaseHistory(): Promise<ApiResponse<PurchaseHistory[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/purchase-history`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<PurchaseHistory[]>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getPurchaseHistoryByCustomerId(customerId: number): Promise<ApiResponse<PurchaseHistory[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/purchase-history/customer/${customerId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<PurchaseHistory[]>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getPaginatedPurchaseHistoryByCustomerId(
    customerId: number, 
    page: number = 0, 
    size: number = 10
  ): Promise<ApiResponse<PaginatedResponse<PurchaseHistory>>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/secure/purchase-history/customer/${customerId}/paginated?page=${page}&size=${size}`, 
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
        }
      );

      return await this.handleResponse<PaginatedResponse<PurchaseHistory>>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getPurchaseHistoryById(id: number): Promise<ApiResponse<PurchaseHistory>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/purchase-history/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<PurchaseHistory>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getPurchaseHistoryByOrderId(orderId: string): Promise<ApiResponse<PurchaseHistory[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/purchase-history/order/${orderId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<PurchaseHistory[]>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getCustomerOrderCount(customerId: number): Promise<ApiResponse<number>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/purchase-history/customer/${customerId}/stats/count`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<number>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getCustomerTotalSpent(customerId: number): Promise<ApiResponse<number>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/purchase-history/customer/${customerId}/stats/total-spent`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<number>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getPurchaseHistoryByDateRange(startDate: string, endDate: string): Promise<ApiResponse<PurchaseHistory[]>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/secure/purchase-history/date-range?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
        }
      );

      return await this.handleResponse<PurchaseHistory[]>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getPurchaseHistoryByCustomerAndDateRange(
    customerId: number, 
    startDate: string, 
    endDate: string
  ): Promise<ApiResponse<PurchaseHistory[]>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/secure/purchase-history/customer/${customerId}/date-range?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
        }
      );

      return await this.handleResponse<PurchaseHistory[]>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }
}

export const purchaseHistoryAPI = new PurchaseHistoryAPI();
