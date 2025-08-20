import { ApiResponse } from '@/lib/utils';

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  points: number;
  registrationDate: string;
  lastPurchaseDate?: string;
  isActive: boolean;
}

export interface CustomerResponse {
  customers: Customer[];
  total: number;
}

export interface PaginatedCustomerResponse {
  content: Customer[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083';

class CustomerAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Only add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
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

  async getAllCustomers(): Promise<ApiResponse<Customer[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/customers`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<Customer[]>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getAllActiveCustomers(): Promise<ApiResponse<Customer[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/customers/active`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<Customer[]>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getCustomerById(id: number): Promise<ApiResponse<Customer>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/customers/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<Customer>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async activateCustomer(id: number): Promise<ApiResponse<Customer>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/customers/${id}/activate`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<Customer>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async deactivateCustomer(id: number): Promise<ApiResponse<Customer>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/customers/${id}/deactivate`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<Customer>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getCustomerStats(id: number): Promise<ApiResponse<{
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    lastOrderDate?: string;
  }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/secure/customers/${id}/stats`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<{
        totalOrders: number;
        totalSpent: number;
        averageOrderValue: number;
        lastOrderDate?: string;
      }>(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error occurred',
        status: 0
      };
    }
  }

  async getCustomersPaginated(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'firstName',
    sortDir: 'asc' | 'desc' = 'asc',
    active?: boolean
  ): Promise<ApiResponse<PaginatedCustomerResponse>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sortBy,
        sortDir
      });

      if (active !== undefined) {
        params.append('active', active.toString());
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/secure/customers/paginated?${params}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<PaginatedCustomerResponse>(response);
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

export const customerAPI = new CustomerAPI();
