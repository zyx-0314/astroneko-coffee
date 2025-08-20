'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, User, Briefcase, Phone, MapPin, CreditCard, Star } from 'lucide-react';
import { CreateStaffSchema, CreateStaffFormData, EmploymentType, UserRole, UserSex } from '@/schema/staff.schema';
import { staffAPI } from '@/lib/api/staff.api';

interface CreateStaffModalProps {
  onStaffCreated?: () => void;
  trigger?: React.ReactNode;
}

export default function CreateStaffModal({ onStaffCreated, trigger }: CreateStaffModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateStaffFormData>({
    resolver: zodResolver(CreateStaffSchema),
    defaultValues: {
      role: UserRole.BARISTA,
      employmentType: EmploymentType.FULL_TIME,
      sickDaysTotal: 10,
      vacationDaysTotal: 15,
    },
  });

  const onSubmit = async (data: CreateStaffFormData) => {
    try {
      setIsSubmitting(true);
      await staffAPI.createStaff(data);
      
      alert('Staff member created successfully!');
      reset();
      setIsOpen(false);
      onStaffCreated?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create staff member';
      alert(`Error: ${errorMessage}`);
      console.error('Error creating staff:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button className="bg-[#6B4E37] hover:bg-[#5a3f2d] text-white">
      <UserPlus className="h-4 w-4 mr-2" />
      Add Staff Member
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-[#6B4E37]" />
            Add New Staff Member
          </DialogTitle>
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

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-[#6B4E37]" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      {...register('username')}
                      placeholder="Enter username"
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500">{errors.username.message}</p>
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
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register('password')}
                      placeholder="Enter password"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sex">Gender</Label>
                    <Select onValueChange={(value) => setValue('sex', value as UserSex)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserSex.MALE}>Male</SelectItem>
                        <SelectItem value={UserSex.FEMALE}>Female</SelectItem>
                        <SelectItem value={UserSex.OTHER}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="birthDate">Birth Date *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      {...register('birthDate')}
                    />
                    {errors.birthDate && (
                      <p className="text-sm text-red-500">{errors.birthDate.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-[#6B4E37]" />
                    Employment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID *</Label>
                    <Input
                      id="employeeId"
                      {...register('employeeId')}
                      placeholder="Enter employee ID"
                    />
                    {errors.employeeId && (
                      <p className="text-sm text-red-500">{errors.employeeId.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select onValueChange={(value) => setValue('role', value as UserRole)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserRole.BARISTA}>Barista</SelectItem>
                        <SelectItem value={UserRole.CASHIER}>Cashier</SelectItem>
                        <SelectItem value={UserRole.COOK}>Cook</SelectItem>
                        <SelectItem value={UserRole.HELPER}>Helper</SelectItem>
                        <SelectItem value={UserRole.MANAGER}>Manager</SelectItem>
                        <SelectItem value={UserRole.OWNER}>Owner</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-sm text-red-500">{errors.role.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      {...register('position')}
                      placeholder="Enter position title"
                    />
                    {errors.position && (
                      <p className="text-sm text-red-500">{errors.position.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      {...register('department')}
                      placeholder="Enter department"
                    />
                    {errors.department && (
                      <p className="text-sm text-red-500">{errors.department.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employmentType">Employment Type *</Label>
                    <Select onValueChange={(value) => setValue('employmentType', value as EmploymentType)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={EmploymentType.FULL_TIME}>Full Time</SelectItem>
                        <SelectItem value={EmploymentType.PART_TIME}>Part Time</SelectItem>
                        <SelectItem value={EmploymentType.CONTRACT}>Contract</SelectItem>
                        <SelectItem value={EmploymentType.INTERN}>Intern</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.employmentType && (
                      <p className="text-sm text-red-500">{errors.employmentType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hireDate">Hire Date *</Label>
                    <Input
                      id="hireDate"
                      type="date"
                      {...register('hireDate')}
                    />
                    {errors.hireDate && (
                      <p className="text-sm text-red-500">{errors.hireDate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shiftStart">Shift Start *</Label>
                    <Input
                      id="shiftStart"
                      type="time"
                      {...register('shiftStart')}
                    />
                    {errors.shiftStart && (
                      <p className="text-sm text-red-500">{errors.shiftStart.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shiftEnd">Shift End *</Label>
                    <Input
                      id="shiftEnd"
                      type="time"
                      {...register('shiftEnd')}
                    />
                    {errors.shiftEnd && (
                      <p className="text-sm text-red-500">{errors.shiftEnd.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sickDaysTotal">Sick Days Total</Label>
                    <Input
                      id="sickDaysTotal"
                      type="number"
                      {...register('sickDaysTotal', { valueAsNumber: true })}
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vacationDaysTotal">Vacation Days Total</Label>
                    <Input
                      id="vacationDaysTotal"
                      type="number"
                      {...register('vacationDaysTotal', { valueAsNumber: true })}
                      min="0"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#6B4E37]" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      {...register('address')}
                      placeholder="Enter full address"
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500">{errors.address.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#6B4E37]" />
                    Financial Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="socialSecurityNumber">Social Security Number *</Label>
                    <Input
                      id="socialSecurityNumber"
                      {...register('socialSecurityNumber')}
                      placeholder="Enter SSN"
                      type="password"
                    />
                    {errors.socialSecurityNumber && (
                      <p className="text-sm text-red-500">{errors.socialSecurityNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="performanceRating">Performance Rating</Label>
                    <Input
                      id="performanceRating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      {...register('performanceRating', { valueAsNumber: true })}
                      placeholder="0.0 - 5.0"
                    />
                    {errors.performanceRating && (
                      <p className="text-sm text-red-500">{errors.performanceRating.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankAccountNumber">Bank Account Number *</Label>
                    <Input
                      id="bankAccountNumber"
                      {...register('bankAccountNumber')}
                      placeholder="Enter bank account number"
                      type="password"
                    />
                    {errors.bankAccountNumber && (
                      <p className="text-sm text-red-500">{errors.bankAccountNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankRoutingNumber">Bank Routing Number *</Label>
                    <Input
                      id="bankRoutingNumber"
                      {...register('bankRoutingNumber')}
                      placeholder="Enter bank routing number"
                      type="password"
                    />
                    {errors.bankRoutingNumber && (
                      <p className="text-sm text-red-500">{errors.bankRoutingNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      {...register('notes')}
                      placeholder="Additional notes about the employee"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#6B4E37] hover:bg-[#5a3f2d]"
              >
                {isSubmitting ? 'Creating...' : 'Create Staff Member'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
