import { ApiResponse } from '@/schema/api.schema';
import { Customer, CustomerResponse, PaginatedCustomerResponse } from '@/schema/customer.schema';
import apiClient, { handleApiResponse } from './client';

// Re-export the interfaces for easy access
export type { Customer, CustomerResponse, PaginatedCustomerResponse };

class CustomerAPI {
  async getAllCustomers(): Promise<ApiResponse<Customer[]>> {
    return handleApiResponse(() => 
      apiClient.get<Customer[]>('/api/v1/secure/customers')
    );
  }

  async getAllActiveCustomers(): Promise<ApiResponse<Customer[]>> {
    return handleApiResponse(() => 
      apiClient.get<Customer[]>('/api/v1/secure/customers/active')
    );
  }

  async getCustomerById(id: number): Promise<ApiResponse<Customer>> {
    return handleApiResponse(() => 
      apiClient.get<Customer>(`/api/v1/secure/customers/${id}`)
    );
  }

  async activateCustomer(id: number): Promise<ApiResponse<Customer>> {
    return handleApiResponse(() => 
      apiClient.put<Customer>(`/api/v1/secure/customers/${id}/activate`)
    );
  }

  async deactivateCustomer(id: number): Promise<ApiResponse<Customer>> {
    return handleApiResponse(() => 
      apiClient.put<Customer>(`/api/v1/secure/customers/${id}/deactivate`)
    );
  }

  async getCustomerStats(id: number): Promise<ApiResponse<{
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    lastOrderDate?: string;
  }>> {
    return handleApiResponse(() => 
      apiClient.get(`/api/v1/secure/customers/${id}/stats`)
    );
  }

  async getCustomersPaginated(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'firstName',
    sortDir: 'asc' | 'desc' = 'asc',
    active?: boolean,
    search?: string
  ): Promise<ApiResponse<PaginatedCustomerResponse>> {
    const params: Record<string, string | number | boolean> = {
      page,
      size,
      sortBy,
      sortDir,
    };

    if (active !== undefined) {
      params.active = active;
    }

    if (search && search.trim()) {
      params.search = search.trim();
    }

    return handleApiResponse(() => 
      apiClient.get<PaginatedCustomerResponse>('/api/v1/secure/customers/paginated', { params })
    );
  }
}

export const customerAPI = new CustomerAPI();
