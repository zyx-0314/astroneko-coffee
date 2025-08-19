'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit, CheckCircle, Clock, AlertTriangle, DollarSign, Star, Calendar, TrendingUp } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  hireDate: string;
  hourlyRate: number;
  hoursWorked: number;
  grossPay: number;
  netPay: number;
  payPeriod: string;
  paymentStatus: 'pending' | 'paid' | 'processing';
  lastPayDate?: string;
  performanceScore: number;
  reviewStatus: 'pending' | 'completed' | 'overdue';
  reviewDueDate: string;
  lastReviewDate?: string;
  strengths?: string[];
  improvements?: string[];
  goals?: string[];
  notes?: string;
}

const mockEmployees: Employee[] = [
  {
    id: 'EMP-001',
    name: 'Sarah Johnson',
    role: 'Barista',
    department: 'Kitchen',
    hireDate: '2024-01-15',
    hourlyRate: 16.50,
    hoursWorked: 40,
    grossPay: 660.00,
    netPay: 528.00,
    payPeriod: '2024-08-12 to 2024-08-18',
    paymentStatus: 'paid',
    lastPayDate: '2024-08-20',
    performanceScore: 4.2,
    reviewStatus: 'completed',
    reviewDueDate: '2024-10-15',
    lastReviewDate: '2024-07-15',
    strengths: ['Excellent customer service', 'Fast preparation times', 'Team collaboration'],
    improvements: ['Time management during rush hours'],
    goals: ['Learn latte art techniques', 'Train new baristas']
  },
  {
    id: 'EMP-002',
    name: 'Mike Chen',
    role: 'Cook',
    department: 'Kitchen',
    hireDate: '2024-02-01',
    hourlyRate: 18.00,
    hoursWorked: 38,
    grossPay: 684.00,
    netPay: 547.20,
    payPeriod: '2024-08-12 to 2024-08-18',
    paymentStatus: 'pending',
    performanceScore: 4.5,
    reviewStatus: 'completed',
    reviewDueDate: '2024-11-01',
    lastReviewDate: '2024-08-01',
    strengths: ['Food quality consistency', 'Kitchen organization', 'Menu knowledge'],
    improvements: ['Communication with front staff'],
    goals: ['Develop new sandwich recipes', 'Improve prep efficiency']
  },
  {
    id: 'EMP-003',
    name: 'Emma Wilson',
    role: 'Cashier',
    department: 'Front Desk',
    hireDate: '2024-03-10',
    hourlyRate: 15.00,
    hoursWorked: 35,
    grossPay: 525.00,
    netPay: 420.00,
    payPeriod: '2024-08-12 to 2024-08-18',
    paymentStatus: 'processing',
    performanceScore: 3.8,
    reviewStatus: 'overdue',
    reviewDueDate: '2024-08-10',
    lastReviewDate: '2024-05-10',
    strengths: ['Friendly customer interaction', 'Cash handling accuracy'],
    improvements: ['Product knowledge', 'Upselling techniques'],
    goals: ['Complete product training', 'Increase average transaction value'],
    notes: 'Review is overdue - schedule meeting this week'
  },
  {
    id: 'EMP-004',
    name: 'David Rodriguez',
    role: 'Helper',
    department: 'Front Desk',
    hireDate: '2024-06-01',
    hourlyRate: 14.00,
    hoursWorked: 32,
    grossPay: 448.00,
    netPay: 358.40,
    payPeriod: '2024-08-12 to 2024-08-18',
    paymentStatus: 'pending',
    performanceScore: 4.0,
    reviewStatus: 'pending',
    reviewDueDate: '2024-09-01',
    strengths: ['Punctuality', 'Willingness to help', 'Quick learner'],
    improvements: ['Confidence in customer interactions'],
    goals: ['Complete 90-day training program', 'Learn all POS functions']
  }
];

export function PerformanceSection() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const canUpdate = true; // Role check handled by parent RoleGuard

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'payment-pending' && emp.paymentStatus === 'pending') ||
                         (statusFilter === 'review-overdue' && emp.reviewStatus === 'overdue') ||
                         (statusFilter === 'review-pending' && emp.reviewStatus === 'pending');
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee({ ...employee });
    setIsEditDialogOpen(true);
  };

  const handleUpdatePaymentStatus = (employeeId: string, newStatus: Employee['paymentStatus']) => {
    if (!canUpdate) return;
    
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? { 
            ...emp, 
            paymentStatus: newStatus,
            lastPayDate: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : emp.lastPayDate
          } 
        : emp
    ));
  };

  const handleUpdateReviewStatus = (employeeId: string, newStatus: Employee['reviewStatus']) => {
    if (!canUpdate) return;
    
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? { 
            ...emp, 
            reviewStatus: newStatus,
            lastReviewDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : emp.lastReviewDate,
            reviewDueDate: newStatus === 'completed' ? 
              new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
              emp.reviewDueDate
          } 
        : emp
    ));
  };

  const handleSaveEdit = () => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? editingEmployee : emp
      ));
      setIsEditDialogOpen(false);
      setEditingEmployee(null);
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReviewStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const pendingPayments = employees.filter(emp => emp.paymentStatus === 'pending');
  const overdueReviews = employees.filter(emp => emp.reviewStatus === 'overdue');
  const totalPayroll = employees.reduce((sum, emp) => sum + emp.netPay, 0);
  const avgPerformanceScore = employees.reduce((sum, emp) => sum + emp.performanceScore, 0) / employees.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingPayments.length}</p>
                <p className="text-xs text-gray-500">Need processing</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue Reviews</p>
                <p className="text-2xl font-bold text-red-600">{overdueReviews.length}</p>
                <p className="text-xs text-gray-500">Need attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Performance</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(avgPerformanceScore)}`}>
                  {avgPerformanceScore.toFixed(1)}
                </p>
                <p className="text-xs text-gray-500">Out of 5.0</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Kitchen">Kitchen</SelectItem>
                <SelectItem value="Front Desk">Front Desk</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="payment-pending">Payment Pending</SelectItem>
                <SelectItem value="review-overdue">Review Overdue</SelectItem>
                <SelectItem value="review-pending">Review Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Performance & Payroll ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{employee.name}</h3>
                      <Badge variant="outline">{employee.role}</Badge>
                      <Badge variant="outline">{employee.department}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Performance:</span>
                        <div className="flex items-center gap-1">
                          <span className={`font-bold ${getPerformanceColor(employee.performanceScore)}`}>
                            {employee.performanceScore.toFixed(1)}
                          </span>
                          <Star className="h-3 w-3 text-yellow-500" />
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Hourly Rate:</span>
                        <p className="font-semibold">{formatCurrency(employee.hourlyRate)}</p>
                      </div>
                      <div>
                        <span className="font-medium">Hours Worked:</span>
                        <p>{employee.hoursWorked}h</p>
                      </div>
                      <div>
                        <span className="font-medium">Net Pay:</span>
                        <p className="font-semibold text-green-600">{formatCurrency(employee.netPay)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <Badge className={getPaymentStatusColor(employee.paymentStatus)}>
                        Payment: {employee.paymentStatus}
                      </Badge>
                      <Badge className={getReviewStatusColor(employee.reviewStatus)}>
                        Review: {employee.reviewStatus}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">
                      Pay Period: {employee.payPeriod}
                    </div>
                  </div>
                </div>

                {(employee.reviewStatus === 'overdue' || employee.paymentStatus === 'pending') && (
                  <div className="mb-3 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <p className="text-sm font-medium text-yellow-800">Action Required:</p>
                    <div className="text-sm text-yellow-700">
                      {employee.reviewStatus === 'overdue' && (
                        <p>• Performance review overdue (Due: {new Date(employee.reviewDueDate).toLocaleDateString()})</p>
                      )}
                      {employee.paymentStatus === 'pending' && (
                        <p>• Payment pending for {employee.payPeriod}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewEmployee(employee)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  
                  {canUpdate && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEmployee(employee)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      
                      {employee.paymentStatus === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdatePaymentStatus(employee.id, 'paid')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark Paid
                        </Button>
                      )}
                      
                      {employee.reviewStatus !== 'completed' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateReviewStatus(employee.id, 'completed')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete Review
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Employee Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Employee Details - {selectedEmployee?.name}</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Employee Information</Label>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedEmployee.name}</p>
                    <p><span className="font-medium">Role:</span> {selectedEmployee.role}</p>
                    <p><span className="font-medium">Department:</span> {selectedEmployee.department}</p>
                    <p><span className="font-medium">Hire Date:</span> {new Date(selectedEmployee.hireDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Performance</Label>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Score:</span> 
                      <span className={`ml-1 font-bold ${getPerformanceColor(selectedEmployee.performanceScore)}`}>
                        {selectedEmployee.performanceScore.toFixed(1)}/5.0
                      </span>
                    </p>
                    <p><span className="font-medium">Review Status:</span> 
                      <Badge className={`ml-1 ${getReviewStatusColor(selectedEmployee.reviewStatus)}`}>
                        {selectedEmployee.reviewStatus}
                      </Badge>
                    </p>
                    <p><span className="font-medium">Due Date:</span> {new Date(selectedEmployee.reviewDueDate).toLocaleDateString()}</p>
                    {selectedEmployee.lastReviewDate && (
                      <p><span className="font-medium">Last Review:</span> {new Date(selectedEmployee.lastReviewDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payroll Info */}
              <div>
                <Label className="font-semibold">Payroll Information</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Hourly Rate:</span> {formatCurrency(selectedEmployee.hourlyRate)}</p>
                    <p><span className="font-medium">Hours Worked:</span> {selectedEmployee.hoursWorked}</p>
                    <p><span className="font-medium">Gross Pay:</span> {formatCurrency(selectedEmployee.grossPay)}</p>
                    <p><span className="font-medium">Net Pay:</span> {formatCurrency(selectedEmployee.netPay)}</p>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Pay Period:</span> {selectedEmployee.payPeriod}</p>
                    <p><span className="font-medium">Payment Status:</span> 
                      <Badge className={`ml-1 ${getPaymentStatusColor(selectedEmployee.paymentStatus)}`}>
                        {selectedEmployee.paymentStatus}
                      </Badge>
                    </p>
                    {selectedEmployee.lastPayDate && (
                      <p><span className="font-medium">Last Paid:</span> {new Date(selectedEmployee.lastPayDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Performance Details */}
              {(selectedEmployee.strengths || selectedEmployee.improvements || selectedEmployee.goals) && (
                <div className="space-y-4">
                  {selectedEmployee.strengths && (
                    <div>
                      <Label className="font-semibold">Strengths</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedEmployee.strengths.map((strength, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800">{strength}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEmployee.improvements && (
                    <div>
                      <Label className="font-semibold">Areas for Improvement</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedEmployee.improvements.map((improvement, index) => (
                          <Badge key={index} className="bg-yellow-100 text-yellow-800">{improvement}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEmployee.goals && (
                    <div>
                      <Label className="font-semibold">Goals</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedEmployee.goals.map((goal, index) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800">{goal}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedEmployee.notes && (
                <div>
                  <Label className="font-semibold">Notes</Label>
                  <p className="text-sm bg-gray-50 p-2 rounded mt-1">{selectedEmployee.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Employee - {editingEmployee?.name}</DialogTitle>
          </DialogHeader>
          {editingEmployee && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select
                    value={editingEmployee.paymentStatus}
                    onValueChange={(value: Employee['paymentStatus']) =>
                      setEditingEmployee({ ...editingEmployee, paymentStatus: value })
                    }
                    disabled={!canUpdate}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reviewStatus">Review Status</Label>
                  <Select
                    value={editingEmployee.reviewStatus}
                    onValueChange={(value: Employee['reviewStatus']) =>
                      setEditingEmployee({ ...editingEmployee, reviewStatus: value })
                    }
                    disabled={!canUpdate}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="performanceScore">Performance Score (1-5)</Label>
                  <Input
                    id="performanceScore"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={editingEmployee.performanceScore}
                    onChange={(e) => setEditingEmployee({
                      ...editingEmployee,
                      performanceScore: Number(e.target.value)
                    })}
                    disabled={!canUpdate}
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    min="0"
                    step="0.25"
                    value={editingEmployee.hourlyRate}
                    onChange={(e) => setEditingEmployee({
                      ...editingEmployee,
                      hourlyRate: Number(e.target.value)
                    })}
                    disabled={!canUpdate}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={editingEmployee.notes || ''}
                  onChange={(e) => setEditingEmployee({
                    ...editingEmployee,
                    notes: e.target.value
                  })}
                  disabled={!canUpdate}
                  placeholder="Add performance notes, pay adjustments, etc..."
                />
              </div>
              
              {canUpdate && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payroll Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Payroll (Current Period)</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalPayroll)}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-600">
                {formatCurrency(pendingPayments.reduce((sum, emp) => sum + emp.netPay, 0))}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Average Performance</p>
              <p className={`text-2xl font-bold ${getPerformanceColor(avgPerformanceScore)}`}>
                {avgPerformanceScore.toFixed(1)}/5.0
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
