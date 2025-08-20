import { CreateStaffRequest, UpdateStaffRequest, Staff, StaffListResponse, UserRole } from '@/schema/staff.schema';
import apiClient from './client';

export const staffAPI = {
  // Create new staff member
  async createStaff(data: CreateStaffRequest): Promise<Staff> {
    const response = await apiClient.post('/api/v1/secure/staff', data);
    return response.data;
  },

  // Get all staff members
  async getAllStaff(activeOnly: boolean = false): Promise<Staff[]> {
    const response = await apiClient.get('/api/v1/secure/staff', {
      params: activeOnly ? { active: true } : {}
    });
    return response.data;
  },

  // Get staff member by ID
  async getStaffById(id: number): Promise<Staff> {
    const response = await apiClient.get(`/api/v1/secure/staff/${id}`);
    return response.data;
  },

  // Get staff member by employee ID
  async getStaffByEmployeeId(employeeId: string): Promise<Staff> {
    const response = await apiClient.get(`/api/v1/secure/staff/employee/${employeeId}`);
    return response.data;
  },

  // Get staff member by user ID
  async getStaffByUserId(userId: number): Promise<Staff> {
    const response = await apiClient.get(`/api/v1/secure/staff/user/${userId}`);
    return response.data;
  },

  // Update staff member
  async updateStaff(id: number, data: UpdateStaffRequest): Promise<Staff> {
    const response = await apiClient.put(`/api/v1/secure/staff/${id}`, data);
    return response.data;
  },

  // Delete staff member
  async deleteStaff(id: number): Promise<void> {
    await apiClient.delete(`/api/v1/secure/staff/${id}`);
  },

  // Deactivate staff member
  async deactivateStaff(id: number): Promise<{ message: string }> {
    const response = await apiClient.put(`/api/v1/secure/staff/${id}/deactivate`);
    return response.data;
  },

  // Get staff by department
  async getStaffByDepartment(department: string): Promise<Staff[]> {
    const response = await apiClient.get(`/api/v1/secure/staff/department/${department}`);
    return response.data;
  },

  // Get staff by role
  async getStaffByRole(role: UserRole): Promise<Staff[]> {
    const response = await apiClient.get(`/api/v1/secure/staff/role/${role}`);
    return response.data;
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
