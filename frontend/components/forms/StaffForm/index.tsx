'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useStaffForm } from './StaffForm.hook';
import { UserPlus, Save, X } from 'lucide-react';

interface StaffFormProps {
  onClose?: () => void;
  staffId?: string; // For editing existing staff
}

export default function StaffForm({ onClose, staffId }: StaffFormProps) {
  const {
    formData,
    isLoading,
    errors,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    resetForm
  } = useStaffForm(staffId);

  const isEditing = !!staffId;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-[#6B4E37]" />
            {isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`border-gray-300 dark:border-gray-600 ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`border-gray-300 dark:border-gray-600 ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`border-gray-300 dark:border-gray-600 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`border-gray-300 dark:border-gray-600 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Work Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">
                    Role *
                  </Label>
                  <Select value={formData.role} onValueChange={(value) => handleSelectChange('role', value)}>
                    <SelectTrigger className="border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                      <SelectItem value="FRONT_DESK">Front Desk</SelectItem>
                      <SelectItem value="KITCHEN">Kitchen Staff</SelectItem>
                      <SelectItem value="BARISTA">Barista</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.role}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shift" className="text-gray-700 dark:text-gray-300">
                    Shift *
                  </Label>
                  <Select value={formData.shift} onValueChange={(value) => handleSelectChange('shift', value)}>
                    <SelectTrigger className="border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select shift hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5:00 AM - 1:00 PM">Early (5:00 AM - 1:00 PM)</SelectItem>
                      <SelectItem value="6:00 AM - 2:00 PM">Morning (6:00 AM - 2:00 PM)</SelectItem>
                      <SelectItem value="9:00 AM - 5:00 PM">Day (9:00 AM - 5:00 PM)</SelectItem>
                      <SelectItem value="2:00 PM - 10:00 PM">Evening (2:00 PM - 10:00 PM)</SelectItem>
                      <SelectItem value="4:00 PM - 12:00 AM">Night (4:00 PM - 12:00 AM)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.shift && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.shift}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes about the staff member..."
                  className="border-gray-300 dark:border-gray-600 min-h-[80px]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#6B4E37] hover:bg-[#5a3f2d] text-white flex-1"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {isEditing ? 'Updating...' : 'Adding...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {isEditing ? 'Update Staff' : 'Add Staff'}
                  </div>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isLoading}
                className="border-gray-300 dark:border-gray-600"
              >
                Reset
              </Button>
              
              {onClose && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
