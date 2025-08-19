'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit, Trash2, Phone, Mail, Calendar } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'blocked';
  loyaltyPoints: number;
  preferences?: string;
  notes?: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    address: '123 Main St, City, State',
    registrationDate: '2024-01-15',
    totalOrders: 45,
    totalSpent: 675.50,
    status: 'active',
    loyaltyPoints: 450,
    preferences: 'Prefers oat milk, no sugar',
    notes: 'Regular customer, comes every morning'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1234567891',
    address: '456 Oak Ave, City, State',
    registrationDate: '2024-02-20',
    totalOrders: 23,
    totalSpent: 345.75,
    status: 'active',
    loyaltyPoints: 230,
    preferences: 'Loves vanilla lattes',
    notes: 'Afternoon customer'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@email.com',
    phone: '+1234567892',
    address: '789 Pine Rd, City, State',
    registrationDate: '2024-03-10',
    totalOrders: 8,
    totalSpent: 120.25,
    status: 'inactive',
    loyaltyPoints: 80,
    notes: 'Has not visited in 2 months'
  }
];

export function CustomerManagementSection() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer({ ...customer });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (customerId: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== customerId));
    }
  };

  const handleSaveEdit = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c => 
        c.id === editingCustomer.id ? editingCustomer : c
      ));
      setIsEditDialogOpen(false);
      setEditingCustomer(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{customer.name}</h3>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
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
            ))}
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
                  <p>{selectedCustomer.name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <Badge className={getStatusColor(selectedCustomer.status)}>
                    {selectedCustomer.status}
                  </Badge>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p>{selectedCustomer.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Phone</Label>
                  <p>{selectedCustomer.phone}</p>
                </div>
                <div className="col-span-2">
                  <Label className="font-semibold">Address</Label>
                  <p>{selectedCustomer.address}</p>
                </div>
                <div>
                  <Label className="font-semibold">Registration Date</Label>
                  <p>{new Date(selectedCustomer.registrationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="font-semibold">Loyalty Points</Label>
                  <p>{selectedCustomer.loyaltyPoints}</p>
                </div>
                <div>
                  <Label className="font-semibold">Total Orders</Label>
                  <p>{selectedCustomer.totalOrders}</p>
                </div>
                <div>
                  <Label className="font-semibold">Total Spent</Label>
                  <p>${selectedCustomer.totalSpent.toFixed(2)}</p>
                </div>
                {selectedCustomer.preferences && (
                  <div className="col-span-2">
                    <Label className="font-semibold">Preferences</Label>
                    <p>{selectedCustomer.preferences}</p>
                  </div>
                )}
                {selectedCustomer.notes && (
                  <div className="col-span-2">
                    <Label className="font-semibold">Notes</Label>
                    <p>{selectedCustomer.notes}</p>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editingCustomer.name}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      name: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editingCustomer.status}
                    onValueChange={(value: 'active' | 'inactive' | 'blocked') =>
                      setEditingCustomer({
                        ...editingCustomer,
                        status: value
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingCustomer.email}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      email: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      phone: e.target.value
                    })}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={editingCustomer.address}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      address: e.target.value
                    })}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="preferences">Preferences</Label>
                  <Input
                    id="preferences"
                    value={editingCustomer.preferences || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      preferences: e.target.value
                    })}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={editingCustomer.notes || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      notes: e.target.value
                    })}
                  />
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
      </motion.div>
    </div>
  );
}
