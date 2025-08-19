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
import { Package, AlertTriangle, CheckCircle, Edit, Truck, Wrench } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  type: 'coffee-machine' | 'pos-system' | 'printer' | 'display' | 'other';
  status: 'working' | 'maintenance' | 'broken' | 'replaced';
  location: string;
  lastMaintenance?: string;
  notes?: string;
}

interface Supply {
  id: string;
  name: string;
  category: 'packaging' | 'cleaning' | 'office' | 'other';
  currentStock: number;
  expectedStock: number;
  unit: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'incoming';
  lastReceived?: string;
  supplier?: string;
  notes?: string;
}

const mockEquipment: Equipment[] = [
  {
    id: 'EQ-001',
    name: 'POS Terminal #1',
    type: 'pos-system',
    status: 'working',
    location: 'Counter 1',
    lastMaintenance: '2024-07-15',
    notes: 'Regular cleaning done weekly'
  },
  {
    id: 'EQ-002',
    name: 'Receipt Printer #1',
    type: 'printer',
    status: 'maintenance',
    location: 'Counter 1',
    lastMaintenance: '2024-08-10',
    notes: 'Paper jam issue, needs service'
  },
  {
    id: 'EQ-003',
    name: 'Menu Display Screen',
    type: 'display',
    status: 'working',
    location: 'Above counter',
    lastMaintenance: '2024-06-01'
  }
];

const mockSupplies: Supply[] = [
  {
    id: 'SUP-001',
    name: 'Paper Cups (12oz)',
    category: 'packaging',
    currentStock: 250,
    expectedStock: 500,
    unit: 'pieces',
    status: 'low-stock',
    lastReceived: '2024-08-15',
    supplier: 'PackCorp',
    notes: 'Need to reorder soon'
  },
  {
    id: 'SUP-002',
    name: 'Napkins',
    category: 'packaging',
    currentStock: 1000,
    expectedStock: 1000,
    unit: 'pieces',
    status: 'in-stock',
    lastReceived: '2024-08-18',
    supplier: 'PackCorp'
  },
  {
    id: 'SUP-003',
    name: 'Cleaning Supplies',
    category: 'cleaning',
    currentStock: 0,
    expectedStock: 10,
    unit: 'bottles',
    status: 'incoming',
    supplier: 'CleanCo',
    notes: 'Delivery expected tomorrow'
  }
];

export function FrontDeskInventorySection() {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [supplies, setSupplies] = useState<Supply[]>(mockSupplies);
  const [selectedItem, setSelectedItem] = useState<Equipment | Supply | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemType, setItemType] = useState<'equipment' | 'supply'>('equipment');
  const [receivingSupply, setReceivingSupply] = useState<string | null>(null);
  const [receivedQuantity, setReceivedQuantity] = useState<number>(0);

  const canUpdate = true; // Role check handled by parent RoleGuard

  const handleEditEquipment = (item: Equipment) => {
    setSelectedItem(item);
    setItemType('equipment');
    setIsDialogOpen(true);
  };

  const handleEditSupply = (item: Supply) => {
    setSelectedItem(item);
    setItemType('supply');
    setIsDialogOpen(true);
  };

  const handleUpdateEquipmentStatus = (equipmentId: string, newStatus: Equipment['status'], notes?: string) => {
    if (!canUpdate) return;
    
    setEquipment(equipment.map(eq => 
      eq.id === equipmentId 
        ? { 
            ...eq, 
            status: newStatus, 
            notes: notes || eq.notes,
            lastMaintenance: newStatus === 'maintenance' ? new Date().toISOString().split('T')[0] : eq.lastMaintenance
          } 
        : eq
    ));
  };

  const handleReceiveSupplies = (supplyId: string, quantity: number) => {
    if (!canUpdate) return;
    
    setSupplies(supplies.map(supply => 
      supply.id === supplyId 
        ? { 
            ...supply, 
            currentStock: supply.currentStock + quantity,
            status: supply.currentStock + quantity >= supply.expectedStock * 0.8 ? 'in-stock' : 
                   supply.currentStock + quantity > 0 ? 'low-stock' : 'out-of-stock',
            lastReceived: new Date().toISOString().split('T')[0]
          } 
        : supply
    ));
    
    setReceivingSupply(null);
    setReceivedQuantity(0);
  };

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'broken': return 'bg-red-100 text-red-800';
      case 'replaced': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSupplyStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'incoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEquipmentIcon = (type: string) => {
    switch (type) {
      case 'coffee-machine': return '☕';
      case 'pos-system': return '💳';
      case 'printer': return '🖨️';
      case 'display': return '📺';
      default: return '🔧';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Working Equipment</p>
                <p className="text-2xl font-bold text-green-600">
                  {equipment.filter(eq => eq.status === 'working').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Needs Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {equipment.filter(eq => eq.status === 'maintenance' || eq.status === 'broken').length}
                </p>
              </div>
              <Wrench className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-orange-600">
                  {supplies.filter(sup => sup.status === 'low-stock' || sup.status === 'out-of-stock').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Incoming Supplies</p>
                <p className="text-2xl font-bold text-blue-600">
                  {supplies.filter(sup => sup.status === 'incoming').length}
                </p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Equipment Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Equipment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipment.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getEquipmentIcon(item.type)}</span>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.location}</p>
                      </div>
                    </div>
                    <Badge className={getEquipmentStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  
                  {item.lastMaintenance && (
                    <p className="text-sm text-gray-600 mb-2">
                      Last Maintenance: {new Date(item.lastMaintenance).toLocaleDateString()}
                    </p>
                  )}
                  
                  {item.notes && (
                    <p className="text-sm bg-gray-50 p-2 rounded mb-2">{item.notes}</p>
                  )}

                  <div className="flex gap-2">
                    {canUpdate && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditEquipment(item)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Update
                        </Button>
                        
                        {item.status === 'working' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateEquipmentStatus(item.id, 'maintenance', 'Scheduled maintenance')}
                            className="text-yellow-600"
                          >
                            Mark for Maintenance
                          </Button>
                        )}
                        
                        {item.status === 'maintenance' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateEquipmentStatus(item.id, 'working', 'Maintenance completed')}
                            className="text-green-600"
                          >
                            Mark as Working
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

        {/* Supply Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Supply Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplies.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <Badge className={getSupplyStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm">
                      <span>Stock Level</span>
                      <span>{item.currentStock} / {item.expectedStock} {item.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          item.currentStock / item.expectedStock >= 0.8 ? 'bg-green-500' :
                          item.currentStock / item.expectedStock >= 0.3 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (item.currentStock / item.expectedStock) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {item.lastReceived && (
                    <p className="text-sm text-gray-600 mb-2">
                      Last Received: {new Date(item.lastReceived).toLocaleDateString()}
                    </p>
                  )}

                  {item.supplier && (
                    <p className="text-sm text-gray-600 mb-2">Supplier: {item.supplier}</p>
                  )}
                  
                  {item.notes && (
                    <p className="text-sm bg-gray-50 p-2 rounded mb-2">{item.notes}</p>
                  )}

                  <div className="flex gap-2">
                    {canUpdate && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSupply(item)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Update
                        </Button>
                        
                        {item.status === 'incoming' && (
                          <Button
                            size="sm"
                            onClick={() => setReceivingSupply(item.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Truck className="h-4 w-4 mr-1" />
                            Receive
                          </Button>
                        )}
                      </>
                    )}
                  </div>

                  {receivingSupply === item.id && (
                    <div className="mt-3 p-3 bg-blue-50 rounded border">
                      <Label htmlFor="quantity">Received Quantity</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="quantity"
                          type="number"
                          min="0"
                          value={receivedQuantity}
                          onChange={(e) => setReceivedQuantity(Number(e.target.value))}
                          placeholder="Enter quantity received"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleReceiveSupplies(item.id, receivedQuantity)}
                          disabled={receivedQuantity <= 0}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setReceivingSupply(null);
                            setReceivedQuantity(0);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Update {itemType === 'equipment' ? 'Equipment' : 'Supply'}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              {itemType === 'equipment' ? (
                <div className="space-y-3">
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={(selectedItem as Equipment).status}
                      onValueChange={(value: Equipment['status']) => {
                        setSelectedItem({ ...selectedItem, status: value } as Equipment);
                      }}
                      disabled={!canUpdate}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="working">Working</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="broken">Broken</SelectItem>
                        <SelectItem value="replaced">Replaced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Notes</Label>
                    <Textarea
                      value={(selectedItem as Equipment).notes || ''}
                      onChange={(e) => {
                        setSelectedItem({ ...selectedItem, notes: e.target.value } as Equipment);
                      }}
                      disabled={!canUpdate}
                      placeholder="Add maintenance notes..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label>Current Stock</Label>
                    <Input
                      type="number"
                      min="0"
                      value={(selectedItem as Supply).currentStock}
                      onChange={(e) => {
                        setSelectedItem({ 
                          ...selectedItem, 
                          currentStock: Number(e.target.value) 
                        } as Supply);
                      }}
                      disabled={!canUpdate}
                    />
                  </div>
                  
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={(selectedItem as Supply).status}
                      onValueChange={(value: Supply['status']) => {
                        setSelectedItem({ ...selectedItem, status: value } as Supply);
                      }}
                      disabled={!canUpdate}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="low-stock">Low Stock</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                        <SelectItem value="incoming">Incoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Notes</Label>
                    <Textarea
                      value={(selectedItem as Supply).notes || ''}
                      onChange={(e) => {
                        setSelectedItem({ ...selectedItem, notes: e.target.value } as Supply);
                      }}
                      disabled={!canUpdate}
                      placeholder="Add supply notes..."
                    />
                  </div>
                </div>
              )}
              
              {canUpdate && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (itemType === 'equipment') {
                        setEquipment(equipment.map(eq => 
                          eq.id === selectedItem.id ? selectedItem as Equipment : eq
                        ));
                      } else {
                        setSupplies(supplies.map(sup => 
                          sup.id === selectedItem.id ? selectedItem as Supply : sup
                        ));
                      }
                      setIsDialogOpen(false);
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
