'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit, Trash2, Phone, Mail, Calendar, Loader2, History } from 'lucide-react';
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

export function CustomerManagementSection() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isPurchaseHistoryOpen, setIsPurchaseHistoryOpen] = useState(false);
  const [historyCustomer, setHistoryCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const response = await customerAPI.getAllCustomers();
      if (response.success && response.data) {
        // Transform and enrich customer data
        const enrichedCustomers = await Promise.all(
          response.data.map(async (customer) => {
            const orderCountResponse = await purchaseHistoryAPI.getCustomerOrderCount(customer.id);
            const totalSpentResponse = await purchaseHistoryAPI.getCustomerTotalSpent(customer.id);
            
            return {
              ...customer,
              totalOrders: orderCountResponse.success ? orderCountResponse.data || 0 : 0,
              totalSpent: totalSpentResponse.success ? totalSpentResponse.data || 0 : 0,
            };
          })
        );
        setCustomers(enrichedCustomers);
      }
    } catch (error) {
      console.error('Failed to load customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return (
      fullName.includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phoneNumber.includes(searchTerm)
    );
  });

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
          await loadCustomers(); // Reload data
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
        await loadCustomers();
        setIsEditDialogOpen(false);
        setEditingCustomer(null);
      } catch (error) {
        console.error('Failed to update customer:', error);
      }
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
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
          <CardTitle>Customer Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      </motion.div>

      {/* Customer List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading customers...</span>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="text-center p-8 text-gray-500">
                No customers found
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{`${customer.firstName} ${customer.lastName}`}</h3>
                      <Badge className={getStatusColor(customer.isActive)}>
                        {customer.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
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
                        <span className="text-green-600 font-medium">
                          ${customer.totalSpent.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(customer)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewHistory(customer)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <History className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(customer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(customer.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

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
                  <p>{`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <Badge className={getStatusColor(selectedCustomer.isActive)}>
                    {selectedCustomer.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p>{selectedCustomer.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Phone</Label>
                  <p>{selectedCustomer.phoneNumber}</p>
                </div>
                <div>
                  <Label className="font-semibold">Registration Date</Label>
                  <p>{new Date(selectedCustomer.registrationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="font-semibold">Points</Label>
                  <p>{selectedCustomer.points}</p>
                </div>
                <div>
                  <Label className="font-semibold">Total Orders</Label>
                  <p>{selectedCustomer.totalOrders}</p>
                </div>
                <div>
                  <Label className="font-semibold">Total Spent</Label>
                  <p>${selectedCustomer.totalSpent.toFixed(2)}</p>
                </div>
                {selectedCustomer.lastPurchaseDate && (
                  <div className="col-span-2">
                    <Label className="font-semibold">Last Purchase</Label>
                    <p>{new Date(selectedCustomer.lastPurchaseDate).toLocaleDateString()}</p>
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
                  <p>{`${editingCustomer.firstName} ${editingCustomer.lastName}`}</p>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p>{editingCustomer.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Phone</Label>
                  <p>{editingCustomer.phoneNumber}</p>
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
      </motion.div>
    </div>
  );
}
