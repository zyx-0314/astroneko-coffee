'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, User, Briefcase, Phone, CreditCard, Save } from 'lucide-react';
import { UpdateStaffSchema, UpdateStaffFormData, Staff, EmploymentType, UserRole, UserSex } from '@/schema/staff.schema';
import { staffAPI } from '@/lib/api/staff.api';

interface EditStaffModalProps {
  staffId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onStaffUpdated?: () => void;
}

export default function EditStaffModal({ staffId, isOpen, onClose, onStaffUpdated }: EditStaffModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
    watch,
  } = useForm<UpdateStaffFormData>({
    resolver: zodResolver(UpdateStaffSchema),
  });

  // Watch form values to keep Select components in sync
  const watchedValues = watch();

  useEffect(() => {
    if (staffId && isOpen) {
      fetchStaffDetails();
    } else if (!isOpen) {
      // Reset form when modal closes
      reset();
      setActiveTab('personal');
    }
  }, [staffId, isOpen, reset]);

  const fetchStaffDetails = async () => {
    if (!staffId) return;
    
    try {
      setIsLoading(true);
      const staff = await staffAPI.getStaffById(parseInt(staffId));
      
      // Reset form first to clear any previous data
      reset();
      
      // Populate form with existing data using reset with values
      reset({
        firstName: staff.firstName || '',
        lastName: staff.lastName || '',
        email: staff.email || '',
        role: staff.role,
        sex: staff.sex,
        employmentType: staff.employmentType,
        department: staff.department || '',
        position: staff.position || '',
        phone: staff.phone || '',
        emergencyContactName: staff.emergencyContactName || '',
        emergencyContactPhone: staff.emergencyContactPhone || '',
        address: staff.address || '',
        salary: staff.salary,
        hourlyRate: staff.hourlyRate,
        sickDaysTotal: staff.sickDaysTotal,
        vacationDaysTotal: staff.vacationDaysTotal,
      });
    } catch (err) {
      console.error('Error fetching staff details:', err);
      alert('Failed to load staff details');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: UpdateStaffFormData) => {
    if (!staffId) return;
    
    try {
      setIsSubmitting(true);
      await staffAPI.updateStaff(parseInt(staffId), data);
      
      alert('Staff member updated successfully!');
      onClose();
      onStaffUpdated?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update staff member';
      alert(`Error: ${errorMessage}`);
      console.error('Error updating staff:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
                <DialogTitle>
                    
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B4E37]"></div>
          </div>
            </DialogTitle>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Edit className="h-6 w-6 text-[#6B4E37]" />
            Edit Staff Member
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Update staff member information using the tabs below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="employment" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Employment
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Financial
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sex">Gender</Label>
                  <Select value={watchedValues.sex} onValueChange={(value) => setValue('sex', value as UserSex)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserSex.MALE}>Male</SelectItem>
                      <SelectItem value={UserSex.FEMALE}>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Employment Tab */}
            <TabsContent value="employment" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={watchedValues.role} onValueChange={(value) => setValue('role', value as UserRole)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.MANAGER}>Manager</SelectItem>
                      <SelectItem value={UserRole.CASHIER}>Cashier</SelectItem>
                      <SelectItem value={UserRole.HELPER}>Helper</SelectItem>
                      <SelectItem value={UserRole.COOK}>Cook</SelectItem>
                      <SelectItem value={UserRole.BARISTA}>Barista</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-red-500">{errors.role.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type *</Label>
                  <Select value={watchedValues.employmentType} onValueChange={(value) => setValue('employmentType', value as EmploymentType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={EmploymentType.FULL_TIME}>Full Time</SelectItem>
                      <SelectItem value={EmploymentType.PART_TIME}>Part Time</SelectItem>
                      <SelectItem value={EmploymentType.CONTRACT}>Contract</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employmentType && (
                    <p className="text-sm text-red-500">{errors.employmentType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    {...register('department')}
                    placeholder="Enter department"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    {...register('position')}
                    placeholder="Enter position"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContactName"
                    {...register('emergencyContactName')}
                    placeholder="Enter emergency contact name"
                  />
                  {errors.emergencyContactName && (
                    <p className="text-sm text-red-500">{errors.emergencyContactName.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                  <Input
                    id="emergencyContactPhone"
                    {...register('emergencyContactPhone')}
                    placeholder="Enter emergency contact phone"
                  />
                  {errors.emergencyContactPhone && (
                    <p className="text-sm text-red-500">{errors.emergencyContactPhone.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    {...register('address')}
                    placeholder="Enter full address"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    step="0.01"
                    {...register('salary', { valueAsNumber: true })}
                    placeholder="Enter annual salary"
                  />
                  {errors.salary && (
                    <p className="text-sm text-red-500">{errors.salary.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    step="0.01"
                    {...register('hourlyRate', { valueAsNumber: true })}
                    placeholder="Enter hourly rate"
                  />
                  {errors.hourlyRate && (
                    <p className="text-sm text-red-500">{errors.hourlyRate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sickDaysTotal">Sick Days Total</Label>
                  <Input
                    id="sickDaysTotal"
                    type="number"
                    {...register('sickDaysTotal', { valueAsNumber: true })}
                    placeholder="Total sick days allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vacationDaysTotal">Vacation Days Total</Label>
                  <Input
                    id="vacationDaysTotal"
                    type="number"
                    {...register('vacationDaysTotal', { valueAsNumber: true })}
                    placeholder="Total vacation days allowed"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#6B4E37] hover:bg-[#5a3f2d] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Staff
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
