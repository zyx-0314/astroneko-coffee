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
import { Search, Coffee, Utensils, AlertTriangle, CheckCircle, Edit, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuItem {
  id: string;
  name: string;
  category: 'beverages' | 'food' | 'desserts' | 'snacks';
  price: number;
  description: string;
  ingredients: string[];
  preparationTime: number; // in minutes
  availability: 'available' | 'out-of-stock' | 'temporarily-unavailable';
  stockLevel?: number;
  minimumStock?: number;
  allergens?: string[];
  isPopular?: boolean;
  lastUpdated?: string;
  notes?: string;
}

const mockMenuItems: MenuItem[] = [
  {
    id: 'MENU-001',
    name: 'Cappuccino',
    category: 'beverages',
    price: 4.50,
    description: 'Classic Italian coffee with steamed milk and foam',
    ingredients: ['Espresso', 'Steamed Milk', 'Milk Foam'],
    preparationTime: 5,
    availability: 'available',
    stockLevel: 50,
    minimumStock: 10,
    allergens: ['Dairy'],
    isPopular: true,
    lastUpdated: '2024-08-20'
  },
  {
    id: 'MENU-002',
    name: 'Grilled Chicken Sandwich',
    category: 'food',
    price: 12.99,
    description: 'Grilled chicken breast with lettuce, tomato, and mayo',
    ingredients: ['Chicken Breast', 'Bread', 'Lettuce', 'Tomato', 'Mayo'],
    preparationTime: 15,
    availability: 'available',
    stockLevel: 25,
    minimumStock: 5,
    allergens: ['Gluten', 'Eggs'],
    lastUpdated: '2024-08-20'
  },
  {
    id: 'MENU-003',
    name: 'Chocolate Cake',
    category: 'desserts',
    price: 6.75,
    description: 'Rich chocolate cake with chocolate ganache',
    ingredients: ['Chocolate', 'Flour', 'Sugar', 'Eggs', 'Butter'],
    preparationTime: 3,
    availability: 'out-of-stock',
    stockLevel: 0,
    minimumStock: 5,
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    lastUpdated: '2024-08-19',
    notes: 'Ran out during lunch rush - need to prepare more'
  },
  {
    id: 'MENU-004',
    name: 'Vanilla Latte',
    category: 'beverages',
    price: 5.25,
    description: 'Espresso with steamed milk and vanilla syrup',
    ingredients: ['Espresso', 'Steamed Milk', 'Vanilla Syrup'],
    preparationTime: 5,
    availability: 'temporarily-unavailable',
    stockLevel: 8,
    minimumStock: 10,
    allergens: ['Dairy'],
    lastUpdated: '2024-08-20',
    notes: 'Vanilla syrup running low - temporarily unavailable'
  }
];

export function KitchenMenuSection() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const canUpdate = true; // Role check handled by parent RoleGuard

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesAvailability = availabilityFilter === 'all' || item.availability === availabilityFilter;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleViewItem = (item: MenuItem) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleUpdateAvailability = (itemId: string, newAvailability: MenuItem['availability'], notes?: string) => {
    if (!canUpdate) return;
    
    setMenuItems(menuItems.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            availability: newAvailability,
            notes: notes || item.notes,
            lastUpdated: new Date().toISOString().split('T')[0]
          } 
        : item
    ));
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id 
          ? { ...editingItem, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      ));
      setIsEditDialogOpen(false);
      setEditingItem(null);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'temporarily-unavailable': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'beverages': return <Coffee className="h-4 w-4" />;
      case 'food': return <Utensils className="h-4 w-4" />;
      case 'desserts': return '🧁';
      case 'snacks': return '🥨';
      default: return <Utensils className="h-4 w-4" />;
    }
  };

  const getStockStatus = (item: MenuItem) => {
    if (!item.stockLevel || !item.minimumStock) return null;
    if (item.stockLevel === 0) return 'out';
    if (item.stockLevel <= item.minimumStock) return 'low';
    return 'good';
  };

  const getStockColor = (status: string | null) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'low': return 'text-yellow-600';
      case 'out': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const availableItems = menuItems.filter(item => item.availability === 'available');
  const outOfStockItems = menuItems.filter(item => item.availability === 'out-of-stock');
  const unavailableItems = menuItems.filter(item => item.availability === 'temporarily-unavailable');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Items</p>
                <p className="text-2xl font-bold text-green-600">{availableItems.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockItems.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Temporarily Unavailable</p>
                <p className="text-2xl font-bold text-yellow-600">{unavailableItems.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Popular Items</p>
                <p className="text-2xl font-bold text-blue-600">
                  {menuItems.filter(item => item.isPopular).length}
                </p>
              </div>
              <Coffee className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                <SelectItem value="temporarily-unavailable">Temporarily Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.isPopular && (
                          <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Price:</span> ${item.price.toFixed(2)}
                        </div>
                        <div>
                          <span className="font-medium">Prep Time:</span> {item.preparationTime} min
                        </div>
                        {item.stockLevel !== undefined && item.minimumStock !== undefined && (
                          <div>
                            <span className="font-medium">Stock:</span> 
                            <span className={getStockColor(getStockStatus(item))}>
                              {' '}{item.stockLevel}/{item.minimumStock}
                            </span>
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Category:</span> {item.category}
                        </div>
                      </div>

                      {item.allergens && item.allergens.length > 0 && (
                        <div className="mt-2">
                          <span className="text-sm font-medium">Allergens: </span>
                          <span className="text-sm text-red-600">{item.allergens.join(', ')}</span>
                        </div>
                      )}

                      {item.notes && (
                        <div className="mt-2 p-2 bg-yellow-50 rounded text-sm">
                          <span className="font-medium">Notes: </span>{item.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getAvailabilityColor(item.availability)}>
                      {item.availability.replace('-', ' ')}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      Updated: {new Date(item.lastUpdated || '').toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewItem(item)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  
                  {canUpdate && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      
                      {item.availability === 'available' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateAvailability(item.id, 'out-of-stock', 'Marked as out of stock')}
                          className="text-red-600"
                        >
                          Mark Out of Stock
                        </Button>
                      )}
                      
                      {item.availability === 'out-of-stock' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateAvailability(item.id, 'available', 'Back in stock')}
                          className="text-green-600"
                        >
                          Mark Available
                        </Button>
                      )}
                      
                      {item.availability === 'temporarily-unavailable' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateAvailability(item.id, 'available', 'Issue resolved - available again')}
                          className="text-green-600"
                        >
                          Mark Available
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

      {/* View Item Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Menu Item Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Name</Label>
                  <p>{selectedItem.name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Category</Label>
                  <p>{selectedItem.category}</p>
                </div>
                <div>
                  <Label className="font-semibold">Price</Label>
                  <p>${selectedItem.price.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="font-semibold">Preparation Time</Label>
                  <p>{selectedItem.preparationTime} minutes</p>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Description</Label>
                <p>{selectedItem.description}</p>
              </div>

              <div>
                <Label className="font-semibold">Ingredients</Label>
                <div className="flex flex-wrap gap-1">
                  {selectedItem.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline">{ingredient}</Badge>
                  ))}
                </div>
              </div>

              {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                <div>
                  <Label className="font-semibold">Allergens</Label>
                  <div className="flex flex-wrap gap-1">
                    {selectedItem.allergens.map((allergen, index) => (
                      <Badge key={index} className="bg-red-100 text-red-800">{allergen}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Availability</Label>
                  <Badge className={getAvailabilityColor(selectedItem.availability)}>
                    {selectedItem.availability.replace('-', ' ')}
                  </Badge>
                </div>
                {selectedItem.stockLevel !== undefined && (
                  <div>
                    <Label className="font-semibold">Stock Level</Label>
                    <p className={getStockColor(getStockStatus(selectedItem))}>
                      {selectedItem.stockLevel} / {selectedItem.minimumStock} units
                    </p>
                  </div>
                )}
              </div>

              {selectedItem.notes && (
                <div>
                  <Label className="font-semibold">Notes</Label>
                  <p className="bg-gray-50 p-2 rounded">{selectedItem.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={editingItem.availability}
                    onValueChange={(value: MenuItem['availability']) =>
                      setEditingItem({ ...editingItem, availability: value })
                    }
                    disabled={!canUpdate}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      <SelectItem value="temporarily-unavailable">Temporarily Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {editingItem.stockLevel !== undefined && (
                  <div>
                    <Label htmlFor="stockLevel">Stock Level</Label>
                    <Input
                      id="stockLevel"
                      type="number"
                      min="0"
                      value={editingItem.stockLevel}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        stockLevel: Number(e.target.value)
                      })}
                      disabled={!canUpdate}
                    />
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={editingItem.notes || ''}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    notes: e.target.value
                  })}
                  disabled={!canUpdate}
                  placeholder="Add notes about availability, preparation, etc..."
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
    </div>
  );
}
