import { ApiResponse } from '@/schema/api.schema';
import { 
  PurchaseHistory, 
  OrderHistoryItem, 
  CustomerStats, 
  PaginatedResponse 
} from '@/schema/purchaseHistory.schema';
import apiClient, { handleApiResponse } from './client';

// Re-export the interfaces for easy access
export type { PurchaseHistory, OrderHistoryItem, CustomerStats, PaginatedResponse };

class PurchaseHistoryAPI {
  async getAllPurchaseHistory(): Promise<ApiResponse<PurchaseHistory[]>> {
    return handleApiResponse(() => 
      apiClient.get<PurchaseHistory[]>('/api/v1/secure/purchase-history')
    );
  }

  async getPurchaseHistoryByCustomerId(customerId: number): Promise<ApiResponse<PurchaseHistory[]>> {
    return handleApiResponse(() => 
      apiClient.get<PurchaseHistory[]>(`/api/v1/secure/purchase-history/customer/${customerId}`)
    );
  }

  async getPaginatedPurchaseHistoryByCustomerId(
    customerId: number, 
    page: number = 0, 
    size: number = 10
  ): Promise<ApiResponse<PaginatedResponse<PurchaseHistory>>> {
    return handleApiResponse(() => 
      apiClient.get<PaginatedResponse<PurchaseHistory>>(
        `/api/v1/secure/purchase-history/customer/${customerId}/paginated`,
        { params: { page, size } }
      )
    );
  }

  async getPurchaseHistoryById(id: number): Promise<ApiResponse<PurchaseHistory>> {
    return handleApiResponse(() => 
      apiClient.get<PurchaseHistory>(`/api/v1/secure/purchase-history/${id}`)
    );
  }

  async getPurchaseHistoryByOrderId(orderId: string): Promise<ApiResponse<PurchaseHistory[]>> {
    return handleApiResponse(() => 
      apiClient.get<PurchaseHistory[]>(`/api/v1/secure/purchase-history/order/${orderId}`)
    );
  }

  async getCustomerOrderCount(customerId: number): Promise<ApiResponse<number>> {
    return handleApiResponse(() => 
      apiClient.get<number>(`/api/v1/secure/purchase-history/customer/${customerId}/stats/count`)
    );
  }

  async getCustomerTotalSpent(customerId: number): Promise<ApiResponse<number>> {
    return handleApiResponse(() => 
      apiClient.get<number>(`/api/v1/secure/purchase-history/customer/${customerId}/stats/total-spent`)
    );
  }

  async getPurchaseHistoryByDateRange(startDate: string, endDate: string): Promise<ApiResponse<PurchaseHistory[]>> {
    return handleApiResponse(() => 
      apiClient.get<PurchaseHistory[]>('/api/v1/secure/purchase-history/date-range', {
        params: { 
          startDate: encodeURIComponent(startDate), 
          endDate: encodeURIComponent(endDate) 
        }
      })
    );
  }

  async getPurchaseHistoryByCustomerAndDateRange(
    customerId: number, 
    startDate: string, 
    endDate: string
  ): Promise<ApiResponse<PurchaseHistory[]>> {
    return handleApiResponse(() => 
      apiClient.get<PurchaseHistory[]>(`/api/v1/secure/purchase-history/customer/${customerId}/date-range`, {
        params: { 
          startDate: encodeURIComponent(startDate), 
          endDate: encodeURIComponent(endDate) 
        }
      })
    );
  }
}

export const purchaseHistoryAPI = new PurchaseHistoryAPI();
