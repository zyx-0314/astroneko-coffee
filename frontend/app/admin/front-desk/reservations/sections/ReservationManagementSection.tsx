'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit, Calendar, Clock, Users, Phone, Mail, MapPin } from 'lucide-react';

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  partySize: number;
  date: string;
  time: string;
  duration: number; // in minutes
  tableNumber?: string;
  status: 'confirmed' | 'pending' | 'seated' | 'completed' | 'cancelled' | 'no-show';
  specialRequests?: string;
  notes?: string;
  createdAt: string;
  occasion?: string;
}

const mockReservations: Reservation[] = [
  {
    id: 'RES-001',
    customerName: 'John Smith',
    customerPhone: '+1234567890',
    customerEmail: 'john.smith@email.com',
    partySize: 4,
    date: '2024-08-21',
    time: '19:00',
    duration: 120,
    tableNumber: '12',
    status: 'confirmed',
    specialRequests: 'Window seat preferred',
    notes: 'Anniversary dinner',
    createdAt: '2024-08-20T10:30:00',
    occasion: 'Anniversary'
  },
  {
    id: 'RES-002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1234567891',
    customerEmail: 'sarah.j@email.com',
    partySize: 2,
    date: '2024-08-21',
    time: '18:30',
    duration: 90,
    status: 'pending',
    specialRequests: 'Quiet area please',
    createdAt: '2024-08-20T14:15:00'
  },
  {
    id: 'RES-003',
    customerName: 'Mike Wilson',
    customerPhone: '+1234567892',
    partySize: 6,
    date: '2024-08-21',
    time: '20:00',
    duration: 150,
    tableNumber: '8',
    status: 'seated',
    notes: 'Business dinner',
    createdAt: '2024-08-20T09:45:00',
    occasion: 'Business'
  },
  {
    id: 'RES-004',
    customerName: 'Emma Davis',
    customerPhone: '+1234567893',
    customerEmail: 'emma.davis@email.com',
    partySize: 3,
    date: '2024-08-20',
    time: '19:30',
    duration: 90,
    status: 'no-show',
    notes: 'Did not arrive',
    createdAt: '2024-08-19T16:20:00'
  }
];

export function ReservationManagementSection() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.customerPhone.includes(searchTerm) ||
                         reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && reservation.date === new Date().toISOString().split('T')[0]) ||
                       (dateFilter === 'tomorrow' && reservation.date === new Date(Date.now() + 86400000).toISOString().split('T')[0]);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleViewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsViewDialogOpen(true);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setEditingReservation({ ...reservation });
    setIsEditDialogOpen(true);
  };

  const handleUpdateStatus = (reservationId: string, newStatus: Reservation['status']) => {
    setReservations(reservations.map(res => 
      res.id === reservationId ? { ...res, status: newStatus } : res
    ));
  };

  const handleSaveEdit = () => {
    if (editingReservation) {
      setReservations(reservations.map(res => 
        res.id === editingReservation.id ? editingReservation : res
      ));
      setIsEditDialogOpen(false);
      setEditingReservation(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'seated': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return '✓';
      case 'pending': return '⏳';
      case 'seated': return '🪑';
      case 'completed': return '✅';
      case 'cancelled': return '❌';
      case 'no-show': return '❌';
      default: return '❓';
    }
  };

  const todayReservations = reservations.filter(res => res.date === new Date().toISOString().split('T')[0]);
  const confirmedReservations = reservations.filter(res => res.status === 'confirmed');
  const pendingReservations = reservations.filter(res => res.status === 'pending');
  const seatedReservations = reservations.filter(res => res.status === 'seated');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today&apos;s Reservations</p>
                <p className="text-2xl font-bold text-blue-600">{todayReservations.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{confirmedReservations.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingReservations.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Currently Seated</p>
                <p className="text-2xl font-bold text-blue-600">{seatedReservations.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Reservation Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reservations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="seated">Seated</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reservations List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Reservations ({filteredReservations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReservations.map((reservation) => (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{reservation.customerName}</h3>
                        <Badge className={getStatusColor(reservation.status)}>
                          <span className="mr-1">{getStatusIcon(reservation.status)}</span>
                          {reservation.status}
                        </Badge>
                        {reservation.occasion && (
                          <Badge variant="outline">{reservation.occasion}</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(reservation.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {reservation.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {reservation.partySize} guests
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {reservation.customerPhone}
                        </div>
                      </div>

                      {reservation.tableNumber && (
                        <div className="mt-2">
                          <span className="text-sm font-medium">Table: </span>
                          <Badge variant="outline">Table {reservation.tableNumber}</Badge>
                        </div>
                      )}

                      {reservation.specialRequests && (
                        <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                          <span className="font-medium">Special Requests: </span>
                          {reservation.specialRequests}
                        </div>
                      )}

                      {reservation.notes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                          <span className="font-medium">Notes: </span>
                          {reservation.notes}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Created: {new Date(reservation.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewReservation(reservation)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditReservation(reservation)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    
                    {reservation.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(reservation.id, 'confirmed')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Confirm
                      </Button>
                    )}
                    
                    {reservation.status === 'confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(reservation.id, 'seated')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Mark Seated
                      </Button>
                    )}
                    
                    {reservation.status === 'seated' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(reservation.id, 'completed')}
                        className="bg-gray-600 hover:bg-gray-700"
                      >
                        Complete
                      </Button>
                    )}
                    
                    {['pending', 'confirmed'].includes(reservation.status) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateStatus(reservation.id, 'cancelled')}
                        className="text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* View Reservation Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reservation Details - {selectedReservation?.id}</DialogTitle>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Customer Information</Label>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedReservation.customerName}</p>
                    <p><span className="font-medium">Phone:</span> {selectedReservation.customerPhone}</p>
                    {selectedReservation.customerEmail && (
                      <p><span className="font-medium">Email:</span> {selectedReservation.customerEmail}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Reservation Details</Label>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Date:</span> {new Date(selectedReservation.date).toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {selectedReservation.time}</p>
                    <p><span className="font-medium">Party Size:</span> {selectedReservation.partySize} guests</p>
                    <p><span className="font-medium">Duration:</span> {selectedReservation.duration} minutes</p>
                    {selectedReservation.tableNumber && (
                      <p><span className="font-medium">Table:</span> {selectedReservation.tableNumber}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Status</Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(selectedReservation.status)}>
                    <span className="mr-1">{getStatusIcon(selectedReservation.status)}</span>
                    {selectedReservation.status}
                  </Badge>
                </div>
              </div>

              {selectedReservation.occasion && (
                <div>
                  <Label className="font-semibold">Occasion</Label>
                  <p className="text-sm">{selectedReservation.occasion}</p>
                </div>
              )}

              {selectedReservation.specialRequests && (
                <div>
                  <Label className="font-semibold">Special Requests</Label>
                  <p className="text-sm bg-blue-50 p-2 rounded">{selectedReservation.specialRequests}</p>
                </div>
              )}

              {selectedReservation.notes && (
                <div>
                  <Label className="font-semibold">Notes</Label>
                  <p className="text-sm bg-gray-50 p-2 rounded">{selectedReservation.notes}</p>
                </div>
              )}

              <div className="text-xs text-gray-500 pt-4 border-t">
                <p>Reservation ID: {selectedReservation.id}</p>
                <p>Created: {new Date(selectedReservation.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Reservation Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Reservation - {editingReservation?.id}</DialogTitle>
          </DialogHeader>
          {editingReservation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editingReservation.status}
                    onValueChange={(value: Reservation['status']) =>
                      setEditingReservation({ ...editingReservation, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="seated">Seated</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="no-show">No Show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tableNumber">Table Number</Label>
                  <Input
                    id="tableNumber"
                    value={editingReservation.tableNumber || ''}
                    onChange={(e) => setEditingReservation({
                      ...editingReservation,
                      tableNumber: e.target.value
                    })}
                    placeholder="Enter table number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="partySize">Party Size</Label>
                  <Input
                    id="partySize"
                    type="number"
                    min="1"
                    value={editingReservation.partySize}
                    onChange={(e) => setEditingReservation({
                      ...editingReservation,
                      partySize: Number(e.target.value)
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="30"
                    value={editingReservation.duration}
                    onChange={(e) => setEditingReservation({
                      ...editingReservation,
                      duration: Number(e.target.value)
                    })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  value={editingReservation.specialRequests || ''}
                  onChange={(e) => setEditingReservation({
                    ...editingReservation,
                    specialRequests: e.target.value
                  })}
                  placeholder="Any special requests from the customer..."
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={editingReservation.notes || ''}
                  onChange={(e) => setEditingReservation({
                    ...editingReservation,
                    notes: e.target.value
                  })}
                  placeholder="Internal notes about the reservation..."
                />
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
    </div>
  );
}
