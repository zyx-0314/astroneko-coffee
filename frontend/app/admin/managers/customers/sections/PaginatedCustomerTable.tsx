'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Search, Eye, Edit, Trash2, Phone, Mail, Calendar, Loader2, History, Filter } from 'lucide-react';
import { customerAPI, Customer as CustomerType } from '@/lib/api/customer.api';
import { purchaseHistoryAPI } from '@/lib/api/purchase-history.api';
import { CustomerPurchaseHistory } from '@/components/modals/CustomerPurchaseHistory';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  points: number;
  registrationDate: string;
  lastPurchaseDate?: string;
  isActive: boolean;
  totalOrders: number;
  totalSpent: number;
}

interface PaginatedCustomerTableProps {
  customers: Customer[];
  loading: boolean;
  onCustomerUpdate: () => void;
}

const ITEMS_PER_PAGE = 10;

export function PaginatedCustomerTable({ customers, loading, onCustomerUpdate }: PaginatedCustomerTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isPurchaseHistoryOpen, setIsPurchaseHistoryOpen] = useState(false);
  const [historyCustomer, setHistoryCustomer] = useState<Customer | null>(null);

  // Filter and search customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // Search filter
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = fullName.includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phoneNumber.includes(searchTerm);

      // Status filter
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && customer.isActive) ||
        (statusFilter === 'inactive' && !customer.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer({ ...customer });
    setIsEditDialogOpen(true);
  };

  const handleViewHistory = (customer: Customer) => {
    setHistoryCustomer(customer);
    setIsPurchaseHistoryOpen(true);
  };

  const handleDelete = async (customerId: number) => {
    if (confirm('Are you sure you want to deactivate this customer?')) {
      try {
        const response = await customerAPI.deactivateCustomer(customerId);
        if (response.success) {
          onCustomerUpdate();
        }
      } catch (error) {
        console.error('Failed to deactivate customer:', error);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (editingCustomer) {
      try {
        if (editingCustomer.isActive) {
          await customerAPI.activateCustomer(editingCustomer.id);
        } else {
          await customerAPI.deactivateCustomer(editingCustomer.id);
        }
        onCustomerUpdate();
        setIsEditDialogOpen(false);
        setEditingCustomer(null);
      } catch (error) {
        console.error('Failed to update customer:', error);
      }
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show ellipsis for large page counts
      const showLeftEllipsis = currentPage > 3;
      const showRightEllipsis = currentPage < totalPages - 2;

      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (showLeftEllipsis) {
        items.push(
          <PaginationItem key="ellipsis-left">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (showRightEllipsis) {
        items.push(
          <PaginationItem key="ellipsis-right">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              isActive={currentPage === totalPages}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Results summary */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Showing {currentCustomers.length} of {filteredCustomers.length} customers
              {searchTerm && ` matching "${searchTerm}"`}
              {statusFilter !== 'all' && ` (${statusFilter} only)`}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customer Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Customer List - Page {currentPage} of {totalPages}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading customers...</span>
                </div>
              ) : currentCustomers.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                  {filteredCustomers.length === 0 ? 'No customers found' : 'No customers on this page'}
                </div>
              ) : (
                currentCustomers.map((customer, index) => (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {`${customer.firstName} ${customer.lastName}`}
                        </h3>
                        <Badge className={getStatusColor(customer.isActive)}>
                          {customer.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {customer.phoneNumber}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Orders: {customer.totalOrders}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            ${customer.totalSpent.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(customer)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewHistory(customer)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        title="View Purchase History"
                      >
                        <History className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(customer)}
                        title="Edit Customer"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400"
                        title="Deactivate Customer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {renderPaginationItems()}
                    
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* View Customer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Name</Label>
                  <p className="text-gray-900 dark:text-white">{`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedCustomer.isActive)}>
                      {selectedCustomer.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p className="text-gray-900 dark:text-white">{selectedCustomer.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Phone</Label>
                  <p className="text-gray-900 dark:text-white">{selectedCustomer.phoneNumber}</p>
                </div>
                <div>
                  <Label className="font-semibold">Registration Date</Label>
                  <p className="text-gray-900 dark:text-white">{new Date(selectedCustomer.registrationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="font-semibold">Points</Label>
                  <p className="text-gray-900 dark:text-white">{selectedCustomer.points}</p>
                </div>
                <div>
                  <Label className="font-semibold">Total Orders</Label>
                  <p className="text-gray-900 dark:text-white">{selectedCustomer.totalOrders}</p>
                </div>
                <div>
                  <Label className="font-semibold">Total Spent</Label>
                  <p className="text-gray-900 dark:text-white">${selectedCustomer.totalSpent.toFixed(2)}</p>
                </div>
                {selectedCustomer.lastPurchaseDate && (
                  <div className="col-span-2">
                    <Label className="font-semibold">Last Purchase</Label>
                    <p className="text-gray-900 dark:text-white">{new Date(selectedCustomer.lastPurchaseDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {editingCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="font-semibold">Name</Label>
                  <p className="text-gray-900 dark:text-white">{`${editingCustomer.firstName} ${editingCustomer.lastName}`}</p>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p className="text-gray-900 dark:text-white">{editingCustomer.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Phone</Label>
                  <p className="text-gray-900 dark:text-white">{editingCustomer.phoneNumber}</p>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editingCustomer.isActive ? 'active' : 'inactive'}
                    onValueChange={(value: 'active' | 'inactive') =>
                      setEditingCustomer({
                        ...editingCustomer,
                        isActive: value === 'active'
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Purchase History Modal */}
      {historyCustomer && (
        <CustomerPurchaseHistory
          customerId={historyCustomer.id}
          customerName={`${historyCustomer.firstName} ${historyCustomer.lastName}`}
          isOpen={isPurchaseHistoryOpen}
          onClose={() => setIsPurchaseHistoryOpen(false)}
        />
      )}
    </div>
  );
}
