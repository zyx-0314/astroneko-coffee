import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { tokenManager } from '@/lib/auth-cookies';
import { ApiResponse, createSuccessResponse, createErrorResponse } from '@/schema/api.schema';

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses uniformly
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Token expired or invalid
      tokenManager.removeToken();
      // Redirect to login if needed
      if (typeof window !== 'undefined') {
        window.location.href = '/authentication';
      }
    }
    return Promise.reject(error);
  }
);

// Helper function to handle API responses consistently
export const handleApiResponse = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiCall();
    return createSuccessResponse(response.data, response.status);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      const status = error.response?.status || 500;
      return createErrorResponse(errorMessage, status);
    }
    
    return createErrorResponse(
      error instanceof Error ? error.message : 'Network error occurred',
      0
    );
  }
};

// Export the configured axios instance
export default apiClient;
