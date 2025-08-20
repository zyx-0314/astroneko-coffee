'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Briefcase,
  Star,
  Heart
} from 'lucide-react';
import { Staff, getRoleBadgeColor, getRoleDisplayName } from '@/schema/staff.schema';
import { staffAPI } from '@/lib/api/staff.api';

interface ViewStaffModalProps {
  staffId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewStaffModal({ staffId, isOpen, onClose }: ViewStaffModalProps) {
  const [staff, setStaff] = useState<Staff | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (staffId && isOpen) {
      fetchStaffDetails();
    }
  }, [staffId, isOpen]);

  const fetchStaffDetails = async () => {
    if (!staffId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const staffData = await staffAPI.getStaffById(parseInt(staffId));
      setStaff(staffData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch staff details');
      console.error('Error fetching staff details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return 'Not set';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogTitle>

          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B4E37]"></div>
          </div>
                </DialogTitle>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="text-red-600 dark:text-red-400">{error}</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!staff) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <User className="h-6 w-6 text-[#6B4E37]" />
            Staff Details
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            View comprehensive staff member information and details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={staff.avatar || (staff.sex === 'FEMALE' ? '/placeholder/user/Female.png' : '/placeholder/user/Male.png')} />
                  <AvatarFallback className="bg-[#E1B168] text-[#2D5A4A] text-lg font-semibold">
                    {staff.firstName[0]}{staff.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {staff.firstName} {staff.lastName}
                    </h2>
                    <Badge className={getRoleBadgeColor(staff.role)}>
                      {getRoleDisplayName(staff.role)}
                    </Badge>
                    <Badge variant={staff.isActive && staff.isUserActive ? 'default' : 'secondary'}>
                      {staff.isActive && staff.isUserActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">Employee ID: {staff.employeeId}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{staff.department} • {staff.position}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#6B4E37]" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{staff.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{staff.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{staff.address || 'Not provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-[#6B4E37]" />
                  Employment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Hire Date</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(staff.hireDate)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Employment Type</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{staff.employmentType?.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Salary</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formatCurrency(staff.salary)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Hourly Rate</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formatCurrency(staff.hourlyRate)}/hr</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#6B4E37]" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{staff.emergencyContactName || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{staff.emergencyContactPhone || 'Not provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits & Leave */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#6B4E37]" />
                  Benefits & Leave
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Sick Days</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {staff.sickDaysUsed || 0} / {staff.sickDaysTotal || 0} used
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Vacation Days</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {staff.vacationDaysUsed || 0} / {staff.vacationDaysTotal || 0} used
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
