'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Coffee, Wrench, Package, AlertTriangle, CheckCircle, Edit, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface KitchenEquipment {
  id: string;
  name: string;
  type: 'espresso-machine' | 'grinder' | 'blender' | 'oven' | 'refrigerator' | 'other';
  status: 'working' | 'maintenance' | 'broken' | 'replaced';
  location: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  notes?: string;
}

interface KitchenSupply {
  id: string;
  name: string;
  category: 'coffee-beans' | 'milk' | 'syrups' | 'food-ingredients' | 'other';
  currentStock: number;
  minimumStock: number;
  unit: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  expiryDate?: string;
  pullDate?: string;
  notes?: string;
}

const mockKitchenEquipment: KitchenEquipment[] = [
  {
    id: 'KEQ-001',
    name: 'Espresso Machine #1',
    type: 'espresso-machine',
    status: 'working',
    location: 'Main Bar',
    lastMaintenance: '2024-08-01',
    nextMaintenance: '2024-09-01',
    notes: 'Regular cleaning every week'
  },
  {
    id: 'KEQ-002',
    name: 'Coffee Grinder #1',
    type: 'grinder',
    status: 'maintenance',
    location: 'Main Bar',
    lastMaintenance: '2024-07-20',
    notes: 'Burr needs replacement'
  },
  {
    id: 'KEQ-003',
    name: 'Industrial Blender',
    type: 'blender',
    status: 'working',
    location: 'Prep Station',
    lastMaintenance: '2024-08-10'
  }
];

const mockKitchenSupplies: KitchenSupply[] = [
  {
    id: 'KSP-001',
    name: 'Arabica Coffee Beans',
    category: 'coffee-beans',
    currentStock: 5,
    minimumStock: 10,
    unit: 'kg',
    status: 'low-stock',
    expiryDate: '2024-12-01',
    notes: 'Ethiopian origin'
  },
  {
    id: 'KSP-002',
    name: 'Whole Milk',
    category: 'milk',
    currentStock: 12,
    minimumStock: 8,
    unit: 'liters',
    status: 'in-stock',
    expiryDate: '2024-08-25'
  },
  {
    id: 'KSP-003',
    name: 'Vanilla Syrup',
    category: 'syrups',
    currentStock: 0,
    minimumStock: 3,
    unit: 'bottles',
    status: 'out-of-stock',
    expiryDate: '2025-01-15',
    pullDate: '2024-08-19',
    notes: 'Pulled from inventory - will be used today'
  }
];

export function KitchenInventorySection() {
  const [equipment, setEquipment] = useState<KitchenEquipment[]>(mockKitchenEquipment);
  const [supplies, setSupplies] = useState<KitchenSupply[]>(mockKitchenSupplies);
  const [selectedItem, setSelectedItem] = useState<KitchenEquipment | KitchenSupply | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemType, setItemType] = useState<'equipment' | 'supply'>('equipment');
  const [pullQuantity, setPullQuantity] = useState<number>(0);
  const [pullingSupply, setPullingSupply] = useState<string | null>(null);

  const canUpdate = true; // Role check handled by parent RoleGuard

  const handleEditEquipment = (item: KitchenEquipment) => {
    setSelectedItem(item);
    setItemType('equipment');
    setIsDialogOpen(true);
  };

  const handleEditSupply = (item: KitchenSupply) => {
    setSelectedItem(item);
    setItemType('supply');
    setIsDialogOpen(true);
  };

  const handleUpdateEquipmentStatus = (equipmentId: string, newStatus: KitchenEquipment['status'], notes?: string) => {
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

  const handlePullSupply = (supplyId: string, quantity: number) => {
    if (!canUpdate) return;
    
    setSupplies(supplies.map(supply => 
      supply.id === supplyId 
        ? { 
            ...supply, 
            currentStock: Math.max(0, supply.currentStock - quantity),
            status: supply.currentStock - quantity <= 0 ? 'out-of-stock' :
                   supply.currentStock - quantity <= supply.minimumStock ? 'low-stock' : 'in-stock',
            pullDate: new Date().toISOString().split('T')[0]
          } 
        : supply
    ));
    
    setPullingSupply(null);
    setPullQuantity(0);
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
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEquipmentIcon = (type: string) => {
    switch (type) {
      case 'espresso-machine': return '☕';
      case 'grinder': return '⚙️';
      case 'blender': return '🥤';
      case 'oven': return '🔥';
      case 'refrigerator': return '❄️';
      default: return '🔧';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'coffee-beans': return '☕';
      case 'milk': return '🥛';
      case 'syrups': return '🍯';
      case 'food-ingredients': return '🥘';
      default: return '📦';
    }
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-red-600">
                  {supplies.filter(sup => isExpiringSoon(sup.expiryDate)).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kitchen Equipment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              Kitchen Equipment
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
                  
                  <div className="space-y-1 text-sm text-gray-600 mb-2">
                    {item.lastMaintenance && (
                      <p>Last Maintenance: {new Date(item.lastMaintenance).toLocaleDateString()}</p>
                    )}
                    {item.nextMaintenance && (
                      <p>Next Maintenance: {new Date(item.nextMaintenance).toLocaleDateString()}</p>
                    )}
                  </div>
                  
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

        {/* Kitchen Supplies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Kitchen Supplies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplies.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryIcon(item.category)}</span>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Badge className={getSupplyStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      {isExpiringSoon(item.expiryDate) && (
                        <Badge className="bg-red-100 text-red-800">
                          Expiring Soon
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm">
                      <span>Stock Level</span>
                      <span>{item.currentStock} / {item.minimumStock} {item.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          item.currentStock >= item.minimumStock ? 'bg-green-500' :
                          item.currentStock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (item.currentStock / item.minimumStock) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600 mb-2">
                    {item.expiryDate && (
                      <p>Expires: {new Date(item.expiryDate).toLocaleDateString()}</p>
                    )}
                    {item.pullDate && (
                      <p>Last Pulled: {new Date(item.pullDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  
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
                        
                        {item.currentStock > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPullingSupply(item.id)}
                            className="text-orange-600"
                          >
                            <Minus className="h-4 w-4 mr-1" />
                            Pull from Inventory
                          </Button>
                        )}
                      </>
                    )}
                  </div>

                  {pullingSupply === item.id && (
                    <div className="mt-3 p-3 bg-orange-50 rounded border">
                      <Label htmlFor="pullQuantity">Quantity to Pull</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="pullQuantity"
                          type="number"
                          min="1"
                          max={item.currentStock}
                          value={pullQuantity}
                          onChange={(e) => setPullQuantity(Number(e.target.value))}
                          placeholder="Enter quantity"
                        />
                        <Button
                          size="sm"
                          onClick={() => handlePullSupply(item.id, pullQuantity)}
                          disabled={pullQuantity <= 0 || pullQuantity > item.currentStock}
                        >
                          Pull
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setPullingSupply(null);
                            setPullQuantity(0);
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
      </div>

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
                      value={(selectedItem as KitchenEquipment).status}
                      onValueChange={(value: KitchenEquipment['status']) => {
                        setSelectedItem({ ...selectedItem, status: value } as KitchenEquipment);
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
                      value={(selectedItem as KitchenEquipment).notes || ''}
                      onChange={(e) => {
                        setSelectedItem({ ...selectedItem, notes: e.target.value } as KitchenEquipment);
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
                      value={(selectedItem as KitchenSupply).currentStock}
                      onChange={(e) => {
                        const newStock = Number(e.target.value);
                        const supply = selectedItem as KitchenSupply;
                        setSelectedItem({ 
                          ...selectedItem, 
                          currentStock: newStock,
                          status: newStock <= 0 ? 'out-of-stock' :
                                 newStock <= supply.minimumStock ? 'low-stock' : 'in-stock'
                        } as KitchenSupply);
                      }}
                      disabled={!canUpdate}
                    />
                  </div>
                  
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={(selectedItem as KitchenSupply).status}
                      onValueChange={(value: KitchenSupply['status']) => {
                        setSelectedItem({ ...selectedItem, status: value } as KitchenSupply);
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
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Notes</Label>
                    <Textarea
                      value={(selectedItem as KitchenSupply).notes || ''}
                      onChange={(e) => {
                        setSelectedItem({ ...selectedItem, notes: e.target.value } as KitchenSupply);
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
                          eq.id === selectedItem.id ? selectedItem as KitchenEquipment : eq
                        ));
                      } else {
                        setSupplies(supplies.map(sup => 
                          sup.id === selectedItem.id ? selectedItem as KitchenSupply : sup
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
