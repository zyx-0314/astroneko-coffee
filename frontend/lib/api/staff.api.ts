import { CreateStaffRequest, UpdateStaffRequest, Staff, StaffListResponse, UserRole } from '@/schema/staff.schema';
import { tokenManager } from '@/lib/auth-cookies';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api/v1'
  : 'http://localhost:8083/api/v1';

// Helper function to create headers with auth token
const createHeaders = (includeAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = tokenManager.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const staffAPI = {
  // Create new staff member
  async createStaff(data: CreateStaffRequest): Promise<Staff> {
    const response = await fetch(`${API_BASE_URL}/secure/staff`, {
      method: 'POST',
      headers: createHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });

    return handleResponse<Staff>(response);
  },

  // Get all staff members
  async getAllStaff(activeOnly: boolean = false): Promise<Staff[]> {
    const url = activeOnly 
      ? `${API_BASE_URL}/secure/staff?active=true`
      : `${API_BASE_URL}/secure/staff`;
      
    const response = await fetch(url, {
      method: 'GET',
      headers: createHeaders(),
      credentials: 'include',
    });

    return handleResponse<Staff[]>(response);
  },

  // Get staff member by ID
  async getStaffById(id: number): Promise<Staff> {
    const response = await fetch(`${API_BASE_URL}/secure/staff/${id}`, {
      method: 'GET',
      headers: createHeaders(),
      credentials: 'include',
    });

    return handleResponse<Staff>(response);
  },

  // Get staff member by employee ID
  async getStaffByEmployeeId(employeeId: string): Promise<Staff> {
    const response = await fetch(`${API_BASE_URL}/secure/staff/employee/${employeeId}`, {
      method: 'GET',
      headers: createHeaders(),
      credentials: 'include',
    });

    return handleResponse<Staff>(response);
  },

  // Get staff member by user ID
  async getStaffByUserId(userId: number): Promise<Staff> {
    const response = await fetch(`${API_BASE_URL}/secure/staff/user/${userId}`, {
      method: 'GET',
      headers: createHeaders(),
      credentials: 'include',
    });

    return handleResponse<Staff>(response);
  },

  // Update staff member
  async updateStaff(id: number, data: UpdateStaffRequest): Promise<Staff> {
    const response = await fetch(`${API_BASE_URL}/secure/staff/${id}`, {
      method: 'PUT',
      headers: createHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });

    return handleResponse<Staff>(response);
  },

  // Delete staff member
  async deleteStaff(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/secure/staff/${id}`, {
      method: 'DELETE',
      headers: createHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
  },

  // Deactivate staff member
  async deactivateStaff(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/secure/staff/${id}/deactivate`, {
      method: 'PUT',
      headers: createHeaders(),
      credentials: 'include',
    });

    return handleResponse<{ message: string }>(response);
  },

  // Get staff by department
  async getStaffByDepartment(department: string): Promise<Staff[]> {
    const response = await fetch(`${API_BASE_URL}/secure/staff/department/${department}`, {
      method: 'GET',
      headers: createHeaders(),
      credentials: 'include',
    });

    return handleResponse<Staff[]>(response);
  },

  // Get staff by role
  async getStaffByRole(role: UserRole): Promise<Staff[]> {
    const response = await fetch(`${API_BASE_URL}/secure/staff/role/${role}`, {
      method: 'GET',
      headers: createHeaders(),
      credentials: 'include',
    });

    return handleResponse<Staff[]>(response);
  },
};

// Export individual functions for easier importing
export const {
  createStaff,
  getAllStaff,
  getStaffById,
  getStaffByEmployeeId,
  getStaffByUserId,
  updateStaff,
  deleteStaff,
  deactivateStaff,
  getStaffByDepartment,
  getStaffByRole,
} = staffAPI;
