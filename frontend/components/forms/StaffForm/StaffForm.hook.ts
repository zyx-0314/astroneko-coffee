import { useState, useEffect } from 'react';
import { StaffFormHookData, StaffFormHookErrors } from '@/schema/hooks.schema';

export const useStaffForm = (staffId?: string) => {
  const [formData, setFormData] = useState<StaffFormHookData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    shift: '',
    notes: ''
  });

  const [errors, setErrors] = useState<StaffFormHookErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (staffId) {
      // Simulate loading existing staff data for editing
      setIsLoading(true);
      setTimeout(() => {
        // Mock data for editing
        setFormData({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@astroneko.com',
          phone: '+1 (555) 123-4567',
          role: 'BARISTA',
          shift: '9:00 AM - 5:00 PM',
          notes: 'Experienced barista with latte art skills'
        });
        setIsLoading(false);
      }, 500);
    }
  }, [staffId]);

  const validateForm = (): boolean => {
    const newErrors: StaffFormHookErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.shift) {
      newErrors.shift = 'Please select a shift';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: StaffFormHookData) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof StaffFormHookErrors]) {
      setErrors((prev: StaffFormHookErrors) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: StaffFormHookData) => ({ ...prev, [name]: value }));
    
    // Clear error when user selects
    if (errors[name as keyof StaffFormHookErrors]) {
      setErrors((prev: StaffFormHookErrors) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Staff data submitted:', formData);
      
      // Reset form after successful submission
      if (!staffId) {
        resetForm();
      }
      
      // TODO: Show success message
      alert(staffId ? 'Staff member updated successfully!' : 'Staff member added successfully!');
      
    } catch (error) {
      console.error('Error submitting staff form:', error);
      // TODO: Show error message
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      shift: '',
      notes: ''
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    resetForm
  };
};
